import React from 'react';
import { render, screen } from '@testing-library/react';
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
});

