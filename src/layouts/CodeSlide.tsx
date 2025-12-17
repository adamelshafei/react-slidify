import React from 'react';
import { Code } from '../blocks/Code';

type CodeSlideProps = {
  title?: string;
  subtitle?: string;
  code?: string;
  language?: string;
  accent?: string;
};

export const CodeSlide = ({ title, subtitle, code = '', language, accent }: CodeSlideProps) => {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        padding: '60px 80px',
        boxSizing: 'border-box',
        display: 'grid',
        gridTemplateRows: 'auto auto 1fr',
        gap: '20px',
      }}
    >
      {title && (
        <h2 style={{ margin: 0, fontSize: '3rem', color: accent || 'var(--slide-primary)' }}>
          {title}
        </h2>
      )}
      {subtitle && (
        <p style={{ margin: 0, fontSize: '1.6rem', color: 'var(--slide-secondary)' }}>
          {subtitle}
        </p>
      )}

      <div style={{ overflow: 'hidden', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)' }}>
        <Code code={code} language={language} />
      </div>
    </div>
  );
};

