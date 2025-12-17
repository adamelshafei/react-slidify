import React from 'react';
import { render } from '@testing-library/react';
import { Split } from '../src/layouts/Split';

describe('Split layout', () => {
  it('applies cover styles when right is an image', () => {
    render(
      <Split
        ratio={0.4}
        left={<div>Left</div>}
        right={<img alt="Chart" src="/chart.png" data-testid="img" />}
      />
    );
    const img = document.querySelector('img[data-testid="img"]') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.style.objectFit).toBe('cover');
    expect(img.style.width).toBe('100%');
    expect(img.style.height).toBe('100%');
  });
});

