import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { DeckContext } from './DeckContext';
import { useAutoScaling } from './hooks';
import { DeckControls } from './DeckControls';
import { DeckTheme, defaultTheme } from './theme';
import { Plugin } from './types';

interface DeckProps {
  children: React.ReactNode;
  theme?: DeckTheme;
  plugins?: Plugin[];
  printMode?: boolean;
}

export const Deck = ({ children, theme = defaultTheme, plugins = [], printMode = false }: DeckProps) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [slideStepCounts, setSlideStepCounts] = useState<Record<number, number>>({});
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mediaPrintActive, setMediaPrintActive] = useState(false);
  const channelRef = useRef<BroadcastChannel | null>(null);

  const slides = React.Children.toArray(children);
  const totalSlides = slides.length;
  const autoScale = useAutoScaling();
  const effectivePrintMode = printMode || mediaPrintActive;
  const scale = effectivePrintMode ? 1 : autoScale;

  // How many sub-steps does the current slide have?
  const currentSlideSteps = slideStepCounts[slideIndex] || 0;

  const broadcastChange = useCallback((index: number) => {
    if (channelRef.current) {
      channelRef.current.postMessage({ type: 'GOTO', index });
    }
  }, []);

  const next = useCallback(() => {
    // If there are remaining steps in this slide, advance step
    if (stepIndex < currentSlideSteps) {
      setStepIndex(prev => prev + 1);
    } else if (slideIndex < slides.length - 1) {
      // Otherwise, go to next slide
      setDirection(1);
      setSlideIndex(prev => {
        const nextIndex = prev + 1;
        broadcastChange(nextIndex);
        return nextIndex;
      });
      setStepIndex(0); // Reset steps for new slide
    }
  }, [stepIndex, currentSlideSteps, slideIndex, slides.length, broadcastChange]);

  const prev = useCallback(() => {
    if (stepIndex > 0) {
      setStepIndex(prev => prev - 1);
    } else if (slideIndex > 0) {
      setDirection(-1);
      setSlideIndex(prev => {
        const nextIndex = prev - 1;
        broadcastChange(nextIndex);
        return nextIndex;
      });
      // We don't know the max steps of the previous slide immediately 
      // without more complex state, so we reset to 0 (start of slide)
      setStepIndex(0); 
    }
  }, [stepIndex, slideIndex, broadcastChange]);

  const goToSlide = useCallback((index: number) => {
    if (index < 0 || index >= totalSlides) return;
    setDirection(index > slideIndex ? 1 : -1);
    setSlideIndex(index);
    setStepIndex(0);
    broadcastChange(index);
  }, [slideIndex, totalSlides, broadcastChange]);

  const registerSteps = useCallback((count: number) => {
    setSlideStepCounts(prev => ({ ...prev, [slideIndex]: count }));
  }, [slideIndex]);

  const themeStyle = useMemo(() => ({
    '--slide-bg': theme.colors.background,
    '--slide-text': theme.colors.text,
    '--slide-primary': theme.colors.primary,
    '--slide-secondary': theme.colors.secondary,
    '--slide-font-head': theme.fonts.heading,
    '--slide-font-body': theme.fonts.body,
  }) as React.CSSProperties, [theme]);

  const toggleFullscreen = useCallback(() => {
    const root = document.documentElement;
    if (!document.fullscreenElement) {
      root.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }, []);

  // Keep fullscreen state in sync (covers ESC exit)
  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // BroadcastChannel sync
  useEffect(() => {
    if (typeof BroadcastChannel === 'undefined') return;
    const channel = new BroadcastChannel('deck-sync');
    channelRef.current = channel;
    channel.onmessage = (event) => {
      if (event.data?.type === 'GOTO' && typeof event.data.index === 'number') {
        setDirection(event.data.index > slideIndex ? 1 : -1);
        setSlideIndex(event.data.index);
        setStepIndex(0);
      }
    };
    return () => channel.close();
  }, [slideIndex]);

  // Print media detection (Ctrl+P)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mql = window.matchMedia('print');
    const handler = (e: MediaQueryListEvent) => setMediaPrintActive(e.matches);
    mql.addEventListener('change', handler);
    const before = () => setMediaPrintActive(true);
    const after = () => setMediaPrintActive(false);
    window.addEventListener('beforeprint', before);
    window.addEventListener('afterprint', after);
    return () => {
      mql.removeEventListener('change', handler);
      window.removeEventListener('beforeprint', before);
      window.removeEventListener('afterprint', after);
    };
  }, []);

  // Inject print styles once
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const existing = document.getElementById('react-slidify-print-styles');
    if (existing) return;
    const style = document.createElement('style');
    style.id = 'react-slidify-print-styles';
    style.innerHTML = `
@media print {
  .deck-controls-layer, .deck-plugins { 
    display: none !important; 
  }
  .deck-viewport {
    height: auto !important;
    overflow: visible !important;
    background: white !important;
  }
  .slide-wrapper {
    position: relative !important;
    opacity: 1 !important;
    transform: none !important;
    page-break-after: always;
    width: 100% !important;
    height: 100vh !important;
  }
}`;
    document.head.appendChild(style);
  }, []);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, prev]);

  const renderStaticSlide = (slide: React.ReactNode, key: number) => {
    if (React.isValidElement(slide)) {
      return React.cloneElement(slide as React.ReactElement, { staticRender: true, key });
    }
    return (
      <div
        key={key}
        className="slide-wrapper"
        style={{ width: '100%', minHeight: '100%', background: 'var(--slide-bg)', color: 'var(--slide-text)' }}
      >
        {slide}
      </div>
    );
  };

  const content = effectivePrintMode ? (
    slides.map((slide, i) => renderStaticSlide(slide, i))
  ) : (
    <AnimatePresence initial={false} custom={direction} mode='popLayout'>
      {/* We key by slideIndex so framer-motion knows when to swap */}
      <React.Fragment key={slideIndex}>
        {slides[slideIndex]}
      </React.Fragment>
    </AnimatePresence>
  );

  return (
    <DeckContext.Provider value={{ slideIndex, stepIndex, direction, next, prev, goToSlide, registerSteps, totalSlides, toggleFullscreen, isFullscreen, slides }}>
      {/* Black background for "cinema mode" */}
      <div className="deck-root" style={{ width: '100vw', height: effectivePrintMode ? 'auto' : '100vh', background: '#000', overflow: effectivePrintMode ? 'visible' : 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        
        {/* Scaled Container (1920x1080) */}
        <div className="deck-viewport" style={{ 
          width: effectivePrintMode ? '100%' : 1920, 
          height: effectivePrintMode ? 'auto' : 1080, 
          transform: effectivePrintMode ? 'none' : `scale(${scale})`, 
          transformOrigin: 'center center',
          background: 'var(--slide-bg)', 
          color: 'var(--slide-text)',
          fontFamily: 'var(--slide-font-body)',
          position: 'relative',
          overflow: effectivePrintMode ? 'visible' : 'hidden',
          boxShadow: effectivePrintMode ? undefined : '0 0 50px rgba(0,0,0,0.5)',
          ...themeStyle 
        }}>
          <div className="layer-background" style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

          <div className="layer-slide" style={{ position: 'relative', zIndex: 10, width: '100%', height: '100%' }}>
            {content}
          </div>
          
          {/* Plugin Overlay Layer */}
          {!effectivePrintMode && (
            <div className="layer-plugins deck-plugins" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 20 }}>
              {plugins.map((PluginComponent, i) => (
                <div key={i} style={{ pointerEvents: 'auto' }}>
                  <PluginComponent />
                </div>
              ))}
            </div>
          )}
        </div>
      
        {/* Control Bar (renders outside scaled area to stay crisp) */}
        {!effectivePrintMode && (
          <div className="layer-controls" style={{ position: 'absolute', inset: 0, zIndex: 30, pointerEvents: 'none' }}>
            <DeckControls />
          </div>
        )}
      </div>
    </DeckContext.Provider>
  );
};