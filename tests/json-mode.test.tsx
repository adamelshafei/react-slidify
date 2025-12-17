import React from 'react';
import { render, screen } from '@testing-library/react';
import { JsonDeck } from '../src/JsonDeck';
import { DeckData } from '../src/schema';
import { themes } from '../src/themes';

describe('JSON mode v2', () => {
  const baseSlides: DeckData['slides'] = [
    { id: 't', layout: 'Title', title: 'Hello', subtitle: 'World', content: {} },
    { id: 's', layout: 'Section', title: 'Section Break', subtitle: 'Overview', content: {} },
    {
      id: 'sp',
      layout: 'Split',
      title: 'Split Title',
      content: {
        bullets: ['Left text', 'More text'],
        image: 'https://example.com/img.png',
      },
    },
    {
      id: 'b',
      layout: 'Bullets',
      title: 'Bullet Title',
      subtitle: 'Details',
      content: { bullets: ['One', 'Two'], accent: '#ff00aa' },
    },
    {
      id: 'c',
      layout: 'Code',
      title: 'Code Sample',
      subtitle: 'ts example',
      content: { code: 'const a = 1;', language: 'ts' },
    },
  ];

  it('renders all supported layouts from JSON', () => {
    const data: DeckData = {
      title: 'Demo Deck',
      theme: 'dark',
      slides: baseSlides,
    };

    render(<JsonDeck data={data} printMode />);

    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Section Break')).toBeInTheDocument();
    expect(screen.getByText('Split Title')).toBeInTheDocument();
    expect(screen.getByText('Bullet Title')).toBeInTheDocument();
    expect(screen.getByText('Code Sample')).toBeInTheDocument();

    const pre = document.querySelector('pre');
    expect(pre?.textContent?.replace(/\s+/g, ' ').includes('const a = 1')).toBe(true);
  });

  it('falls back gracefully on unknown layouts', () => {
    const data: DeckData = {
      title: 'Oops',
      theme: 'dark',
      slides: [
        {
          id: 'bad',
          // @ts-expect-error intentional bad layout to validate fallback
          layout: 'CrazyLayout',
          title: 'Should fallback',
          content: {},
        },
      ],
    };

    render(<JsonDeck data={data} />);
    expect(screen.getByText(/Unknown Layout: CrazyLayout/)).toBeInTheDocument();
  });

  it('applies preset theme variables to the deck viewport', () => {
    const data: DeckData = {
      title: 'Theme Deck',
      theme: 'cyber',
      slides: [{ id: 'only', layout: 'Title', title: 'Themed', content: {} }],
    };

    render(<JsonDeck data={data} />);

    const viewport = document.querySelector('.deck-viewport') as HTMLElement;
    expect(viewport).toBeTruthy();
    expect(viewport.style.getPropertyValue('--slide-primary')).toBe(themes.cyber.colors.primary);
    expect(viewport.style.getPropertyValue('--slide-bg')).toBe(themes.cyber.colors.background);
  });

  it('renders hidden speaker notes with data-notes marker', () => {
    const data: DeckData = {
      title: 'Notes Deck',
      theme: 'light',
      slides: [
        {
          id: 'n',
          layout: 'Title',
          title: 'Note slide',
          content: {},
          notes: 'Speaker only content',
        },
      ],
    };

    render(<JsonDeck data={data} />);
    const notes = document.querySelector('[data-notes]') as HTMLElement;
    expect(notes).toBeTruthy();
    expect(notes.style.display).toBe('none');
    expect(notes.textContent).toContain('Speaker only content');
  });
});

