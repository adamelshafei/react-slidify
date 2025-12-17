import React from 'react';
import { useStep } from '../hooks';

type SplitSlideProps = {
  title?: string;
  bullets?: string[];
  image?: string;
  accent?: string;
};

// Rigid 50/50 grid to keep text and imagery isolated
export const SplitSlide = ({ title, bullets, image, accent }: SplitSlideProps) => {
  const { isActive } = useStep(bullets?.length || 0);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: 'auto 1fr',
        height: '100%',
        padding: '60px',
        gap: '40px',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ gridColumn: '1 / -1', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '3.5rem', lineHeight: 1.1, margin: 0, color: accent || 'var(--slide-primary)' }}>
          {title}
        </h2>
      </div>

      <div style={{ alignSelf: 'center' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {bullets?.map((text, i) => (
            <li
              key={i}
              style={{
                opacity: isActive(i) ? 1 : 0.2,
                transition: 'opacity 0.5s',
                marginBottom: '1rem',
                fontSize: '1.8rem',
                lineHeight: 1.4,
              }}
            >
              <span style={{ color: accent || 'var(--slide-primary)', marginRight: '0.5rem' }}>•</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div
        style={{
          position: 'relative',
          height: '100%',
          width: '100%',
          borderRadius: 16,
          overflow: 'hidden',
          background: '#333',
        }}
      >
        {image && (
          <img
            src={image}
            alt="Slide Visual"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        )}
      </div>
    </div>
  );
};

