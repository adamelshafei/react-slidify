import React from 'react';
import { Deck } from './Deck';
import { Slide } from './Slide';
import { SlideFactory } from './components/SlideFactory';
import { DeckData } from './schema';
import { themes } from './themes';
import { defaultTheme } from './theme';

type JsonDeckProps = {
  data: DeckData;
  printMode?: boolean;
};

// High-level entry point: render a deck from JSON data
export const JsonDeck = ({ data, printMode = false }: JsonDeckProps) => {
  const selectedTheme = themes[data.theme] || themes.light || defaultTheme;

  return (
    <Deck theme={selectedTheme} printMode={printMode}>
      {data.slides.map(slide => (
        <Slide key={slide.id}>
          <SlideFactory slide={slide} />

          {slide.notes && (
            <div data-notes style={{ display: 'none' }}>
              {slide.notes}
            </div>
          )}
        </Slide>
      ))}
    </Deck>
  );
};

