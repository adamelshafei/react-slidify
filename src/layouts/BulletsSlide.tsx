import React from 'react';
import { useStep } from '../hooks';

type BulletsSlideProps = {
  title?: string;
  subtitle?: string;
  bullets?: string[];
  accent?: string;
};

export const BulletsSlide = ({ title, subtitle, bullets, accent }: BulletsSlideProps) => {
  const { isActive } = useStep(bullets?.length || 0);

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        padding: '60px 80px',
        boxSizing: 'border-box',
        display: 'grid',
        gridTemplateRows: 'auto auto 1fr',
        gap: '24px',
      }}
    >
      {title && (
        <h2 style={{ margin: 0, fontSize: '3rem', lineHeight: 1.1, color: accent || 'var(--slide-primary)' }}>
          {title}
        </h2>
      )}
      {subtitle && (
        <p style={{ margin: 0, fontSize: '1.6rem', color: 'var(--slide-secondary)' }}>
          {subtitle}
        </p>
      )}

      <div style={{ overflowY: 'auto', paddingRight: '12px' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {bullets?.map((bullet, index) => (
            <li
              key={index}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                marginBottom: '16px',
                opacity: isActive(index) ? 1 : 0.25,
                transition: 'opacity 0.4s ease',
                fontSize: '1.6rem',
                lineHeight: 1.5,
              }}
            >
              <span style={{ color: accent || 'var(--slide-primary)', fontSize: '1.6rem' }}>•</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

