import React from 'react';
import { render, screen } from '@testing-library/react';
import { Deck } from '../src/Deck';
import { Slide } from '../src/Slide';
import { PresenterConsole } from '../src/PresenterConsole';
import { Notes } from '../src/notes';

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

  it('shows speaker notes in presenter console', () => {
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
    expect(screen.getByText(/Remember to demo/i)).toBeInTheDocument();
  });
});

