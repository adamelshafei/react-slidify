import React from 'react';

type SectionSlideProps = {
  title?: string;
  subtitle?: string;
  accent?: string;
};

// Section breaker slide with bold, centered text
export const SectionSlide = ({ title, subtitle, accent }: SectionSlideProps) => {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'grid',
        placeItems: 'center',
        padding: '60px',
        boxSizing: 'border-box',
        background:
          'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.05), transparent 35%), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.04), transparent 40%)',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: 900 }}>
        <h2
          style={{
            margin: 0,
            fontSize: '4rem',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: accent || 'var(--slide-primary)',
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p style={{ marginTop: '18px', fontSize: '1.6rem', color: 'var(--slide-secondary)' }}>{subtitle}</p>
        )}
      </div>
    </div>
  );
};

