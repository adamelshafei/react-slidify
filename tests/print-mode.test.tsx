import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { Deck } from '../src/Deck';
import { Slide } from '../src/Slide';

describe('Print mode rendering', () => {
  it('renders all slides statically and hides controls/plugins in print mode', () => {
    render(
      <Deck printMode>
        <Slide><div>First</div></Slide>
        <Slide><div>Second</div></Slide>
      </Deck>
    );

    const slides = screen.getAllByText(/First|Second/);
    expect(slides.length).toBe(2);
    expect(document.querySelector('.deck-controls-layer')).toBeNull();
    expect(document.querySelector('.deck-plugins')).toBeNull();
  });

  it('responds to print media query toggle', () => {
    const { rerender } = render(
      <Deck>
        <Slide><div>Alpha</div></Slide>
        <Slide><div>Beta</div></Slide>
      </Deck>
    );

    // Simulate print media query
    act(() => {
      (globalThis as any).__setPrintMatches(true);
    });

    // Re-render to allow Deck to pick up media change
    rerender(
      <Deck>
        <Slide><div>Alpha</div></Slide>
        <Slide><div>Beta</div></Slide>
      </Deck>
    );

    const slides = screen.getAllByText(/Alpha|Beta/);
    expect(slides.length).toBe(2);
  });
});

