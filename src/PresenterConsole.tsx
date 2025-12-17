import React, { useEffect, useMemo, useState } from 'react';
import { useDeck } from './DeckContext';
import { extractNotes } from './notes';

export const PresenterConsole = () => {
  const { slideIndex, slides, next, prev } = useDeck();
  const currentSlide = slides[slideIndex];
  const nextSlide = slides[slideIndex + 1];
  const notes = useMemo(() => extractNotes(currentSlide), [currentSlide]);

  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const id = window.setInterval(() => setElapsed(Math.floor((Date.now() - start) / 1000)), 1000);
    return () => window.clearInterval(id);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: '1fr 1fr',
      gap: 16,
      background: '#0f172a',
      minHeight: '100vh',
      padding: 16,
      color: 'white',
      fontFamily: 'var(--slide-font-body, Inter, sans-serif)',
    }}>
      <div style={{ border: '1px solid #22c55e', padding: 12, background: '#0b1220', overflow: 'hidden' }}>
        <div style={{ fontWeight: 700, marginBottom: 8, color: '#22c55e' }}>Live</div>
        <div style={{ transform: 'scale(0.5)', transformOrigin: 'top left', width: '200%', height: '200%', pointerEvents: 'none', overflow: 'hidden' }}>
          {currentSlide}
        </div>
      </div>

      <div style={{ border: '1px solid #475569', padding: 12, background: '#0b1220', opacity: 0.8, overflow: 'hidden' }}>
        <div style={{ fontWeight: 700, marginBottom: 8, color: '#cbd5e1' }}>Up Next</div>
        <div style={{ transform: 'scale(0.5)', transformOrigin: 'top left', width: '200%', height: '200%', pointerEvents: 'none', overflow: 'hidden' }}>
          {nextSlide || <div style={{ color: '#64748b' }}>End of deck</div>}
        </div>
      </div>

      <div style={{ gridColumn: '1 / span 2', background: '#0b1220', border: '1px solid #334155', borderRadius: 8, padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#fbbf24', marginBottom: 6 }}>Speaker Notes</div>
          <div style={{ fontSize: 18, lineHeight: 1.4, color: '#e2e8f0' }}>
            {notes || <span style={{ color: '#64748b' }}>No notes for this slide.</span>}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 32, fontWeight: 800, color: '#22d3ee', minWidth: 100, textAlign: 'right' }}>
            {formatTime(elapsed)}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={prev} style={buttonStyle}>← Prev</button>
            <button onClick={next} style={buttonStyle}>Next →</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const buttonStyle: React.CSSProperties = {
  background: '#1e293b',
  border: '1px solid #475569',
  color: '#e2e8f0',
  padding: '8px 12px',
  borderRadius: 6,
  cursor: 'pointer',
  fontWeight: 700,
};

