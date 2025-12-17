import React from 'react';

type TitleSlideProps = {
  title?: string;
  subtitle?: string;
  accent?: string;
};

export const TitleSlide = ({ title, subtitle, accent }: TitleSlideProps) => {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'grid',
        placeItems: 'center',
        padding: '80px',
        boxSizing: 'border-box',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: 960 }}>
        <h1
          style={{
            margin: 0,
            fontSize: '4.5rem',
            lineHeight: 1.05,
            color: accent || 'var(--slide-primary)',
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p style={{ marginTop: '24px', fontSize: '1.8rem', color: 'var(--slide-secondary)' }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

