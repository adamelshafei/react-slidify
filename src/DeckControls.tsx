import React, { useMemo, useState } from 'react';
import { useDeck } from './DeckContext';

const buttonStyle: React.CSSProperties = {
  background: 'transparent',
  border: '1px solid rgba(255,255,255,0.2)',
  color: 'white',
  padding: '6px 12px',
  borderRadius: 6,
  cursor: 'pointer',
  fontSize: 14,
};

export const DeckControls = () => {
  const { slideIndex, totalSlides, next, prev, toggleFullscreen } = useDeck();
  const [hovered, setHovered] = useState(false);

  const progress = useMemo(() => {
    if (!totalSlides) return 0;
    return ((slideIndex + 1) / totalSlides) * 100;
  }, [slideIndex, totalSlides]);

  return (
    <div
      className="deck-controls-layer"
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        pointerEvents: 'none',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: '100%',
          maxWidth: 1180,
          pointerEvents: 'auto',
          padding: '12px 24px 16px',
          transition: 'opacity 0.3s ease',
          opacity: hovered ? 1 : 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        <div
          style={{
            height: 4,
            width: '100%',
            background: 'rgba(255,255,255,0.15)',
            borderRadius: 999,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              background: 'var(--slide-primary, #3b82f6)',
              transition: 'width 0.3s ease',
            }}
          />
        </div>

        <div
          style={{
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 10px 40px rgba(0,0,0,0.35)',
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: 'white',
            fontFamily: 'var(--slide-font-body, sans-serif)',
            borderRadius: 12,
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 700 }}>
            Slide {slideIndex + 1}{' '}
            <span style={{ opacity: 0.6 }}>/ {totalSlides}</span>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={prev} style={buttonStyle} aria-label="Previous slide">
              ←
            </button>
            <button onClick={next} style={buttonStyle} aria-label="Next slide">
              →
            </button>
            <button
              onClick={toggleFullscreen}
              style={buttonStyle}
              aria-label="Toggle fullscreen"
            >
              ⛶
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

