import React from 'react';

type SlideLayoutProps = {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  align?: 'left' | 'center';
};

export const SlideLayout = ({ title, subtitle, children, align = 'left' }: SlideLayoutProps) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        padding: '60px 80px',
        boxSizing: 'border-box',
        display: 'grid',
        gridTemplateRows: 'auto auto 1fr',
        gap: '32px',
        textAlign: align,
        justifyItems: align === 'center' ? 'center' : 'start',
      }}
    >
      {title && (
        <h1 style={{ margin: 0, fontSize: '4.5rem', lineHeight: 1.1, fontWeight: 700 }}>
          {title}
        </h1>
      )}

      {subtitle && (
        <h2 style={{ margin: 0, fontSize: '2rem', color: 'var(--slide-secondary)', fontWeight: 400 }}>
          {subtitle}
        </h2>
      )}

      <div
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: align === 'center' ? 'center' : 'flex-start',
        }}
      >
        {children}
      </div>
    </div>
  );
};

