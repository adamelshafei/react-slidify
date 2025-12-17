import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { Deck } from '../src/Deck';
import { Slide } from '../src/Slide';
import { PresenterConsole } from '../src/PresenterConsole';
import { Notes } from '../src/notes';
import { useDeck } from '../src/DeckContext';

describe('Plugins and presenter console', () => {
  it('renders plugins overlay components', () => {
    const Plugin = () => <div data-testid="plugin">Overlay</div>;

    render(
      <Deck plugins={[Plugin]}>
        <Slide><div>One</div></Slide>
      </Deck>
    );

    expect(screen.getByTestId('plugin')).toBeInTheDocument();
  });

  it('renders presenter console (standalone, not plugin) and shows notes', () => {
    render(
      <Deck>
        <Slide>
          <div>Slide A</div>
          <Notes>Remember to demo</Notes>
        </Slide>
        <Slide><div>Slide B</div></Slide>
        <PresenterConsole />
      </Deck>
    );

    expect(screen.getByText(/Speaker Notes/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Remember to demo/i).length).toBeGreaterThan(0);
  });

  it('syncs slides across presenter and projector via BroadcastChannel', () => {
    let projectorCtx: ReturnType<typeof useDeck> | null = null;
    const ProjectorProbe = () => {
      projectorCtx = useDeck();
      return null;
    };

    let presenterCtx: ReturnType<typeof useDeck> | null = null;
    const PresenterProbe = () => {
      presenterCtx = useDeck();
      return null;
    };

    render(
      <>
        {/* Projector */}
        <Deck>
          <Slide><div>Projector Slide A</div><ProjectorProbe /></Slide>
          <Slide><div>Projector Slide B</div></Slide>
        </Deck>

        {/* Presenter controlling projector */}
        <Deck>
          <Slide><div>Presenter Slide A</div><PresenterProbe /></Slide>
          <Slide><div>Presenter Slide B</div></Slide>
        </Deck>
      </>
    );

    expect(projectorCtx?.slideIndex).toBe(0);
    expect(presenterCtx?.slideIndex).toBe(0);

    // Advance presenter; projector should receive via channel
    act(() => presenterCtx?.next());

    expect(presenterCtx?.slideIndex).toBe(1);
    expect(projectorCtx?.slideIndex).toBe(1);
  });
});

