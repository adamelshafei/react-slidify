import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { Deck } from '../src/Deck';
import { Slide } from '../src/Slide';
import { SplitSlide } from '../src/layouts/SplitSlide';
import { BulletsSlide } from '../src/layouts/BulletsSlide';
import { CodeSlide } from '../src/layouts/CodeSlide';
import { TitleSlide } from '../src/layouts/TitleSlide';
import { SectionSlide } from '../src/layouts/SectionSlide';
import { useDeck } from '../src/DeckContext';

describe('Hardened layouts (v2)', () => {
  const renderInDeck = (node: React.ReactNode) => {
    let controls: ReturnType<typeof useDeck> | null = null;
    const Probe = () => {
      controls = useDeck();
      return null;
    };

    const view = render(
      <Deck>
        <Slide>
          {node}
          <Probe />
        </Slide>
      </Deck>
    );

    return { ...view, controls: controls! };
  };

  it('SplitSlide enforces 50/50 grid and reveals bullets step-by-step', () => {
    const { controls } = renderInDeck(
      <SplitSlide
        title="Split Title"
        bullets={['First point', 'Second point']}
        image="https://example.com/pic.png"
        accent="#00ffaa"
      />
    );

    const title = screen.getByText('Split Title');
    const grid = title.closest('div')?.parentElement as HTMLElement;
    expect(grid.style.display).toBe('grid');
    expect(grid.style.gridTemplateColumns).toBe('1fr 1fr');

    const first = screen.getByText(/First point/).closest('li') as HTMLElement;
    const second = screen.getByText(/Second point/).closest('li') as HTMLElement;
    expect(getComputedStyle(first).opacity).toBe('1');
    expect(getComputedStyle(second).opacity).toBe('0.2');

    act(() => controls.next()); // advance step
    expect(getComputedStyle(second).opacity).toBe('1');
  });

  it('BulletsSlide honors accent and scroll safety', () => {
    renderInDeck(
      <BulletsSlide title="Bullets" subtitle="Details" bullets={['A', 'B']} accent="#ff00aa" />
    );

    const bulletDot = screen.getAllByText('•')[0] as HTMLElement;
    expect(getComputedStyle(bulletDot).color).toBe('rgb(255, 0, 170)');
    const container = bulletDot.closest('div') as HTMLElement; // scroll container wraps the <ul>
    expect(getComputedStyle(container).overflowY).toBe('auto');
  });

  it('CodeSlide renders code with language', () => {
    renderInDeck(<CodeSlide title="Code" subtitle="Example" code={'const x = 1;'} language="ts" />);
    const pre = document.querySelector('pre');
    expect(pre?.textContent?.replace(/\s+/g, ' ').includes('const x = 1')).toBe(true);
    expect(screen.getByText('Code')).toBeInTheDocument();
  });

  it('TitleSlide and SectionSlide center content and respect accent', () => {
    renderInDeck(<TitleSlide title="Main Title" subtitle="Tagline" accent="#123456" />);
    const title = screen.getByText('Main Title') as HTMLElement;
    expect(getComputedStyle(title).color).toBe('rgb(18, 52, 86)');

    renderInDeck(<SectionSlide title="Section" subtitle="Break" accent="#abcdef" />);
    const sectionTitle = screen.getByText('Section') as HTMLElement;
    expect(getComputedStyle(sectionTitle).color).toBe('rgb(171, 205, 239)');
  });
});

