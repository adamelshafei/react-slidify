import React, { PropsWithChildren, useEffect } from 'react';
import { render, act, screen, fireEvent, renderHook, waitFor } from '@testing-library/react';
import { Deck } from '../src/Deck';
import { Slide } from '../src/Slide';
import { useDeck } from '../src/DeckContext';
import { useStep } from '../src/hooks';

describe('Deck navigation and steps', () => {
  it('advances steps before moving to next slide and broadcasts slide changes', async () => {
    let ctx: ReturnType<typeof useDeck> | null = null;
    const Probe = () => {
      ctx = useDeck();
      return null;
    };

    const StepSlide = () => {
      useStep(1);
      return <div>Step slide</div>;
    };

    render(
      <Deck>
        <Slide><StepSlide /><Probe /></Slide>
        <Slide><div>Slide 2</div></Slide>
        <Slide><div>Slide 3</div></Slide>
      </Deck>
    );

    await act(async () => {}); // flush useStep registration

    expect(ctx?.slideIndex).toBe(0);
    expect(ctx?.stepIndex).toBe(0);

    await act(() => ctx?.next());
    expect(ctx?.slideIndex).toBe(0);
    expect(ctx?.stepIndex).toBe(1); // stepped inside slide

    await act(() => ctx?.next());
    expect(ctx?.slideIndex).toBe(1);
    expect(ctx?.stepIndex).toBe(0);

    await act(() => ctx?.prev());
    expect(ctx?.slideIndex).toBe(0);
  });

  it('goToSlide sets direction and resets stepIndex', async () => {
    let ctx: ReturnType<typeof useDeck> | null = null;
    const Probe = () => {
      ctx = useDeck();
      return null;
    };

    render(
      <Deck>
        <Slide><div>Slide 1</div><Probe /></Slide>
        <Slide><div>Slide 2</div></Slide>
      </Deck>
    );

    expect(ctx?.direction).toBe(1);
    expect(ctx?.stepIndex).toBe(0);

    await act(() => ctx?.goToSlide(1));
    expect(ctx?.slideIndex).toBe(1);
    expect(ctx?.stepIndex).toBe(0);
    expect(ctx?.direction).toBe(1);

    await act(() => ctx?.goToSlide(0));
    expect(ctx?.slideIndex).toBe(0);
    expect(ctx?.direction).toBe(-1);
  });

  it('navigates to next slide on ArrowRight keydown', () => {
    let ctx: ReturnType<typeof useDeck> | null = null;
    const Probe = () => {
      ctx = useDeck();
      return null;
    };

    render(
      <Deck>
        <Slide>1<Probe /></Slide>
        <Slide>2</Slide>
      </Deck>
    );

    expect(ctx?.slideIndex).toBe(0);

    // Simulate User Pressing Right Arrow
    fireEvent.keyDown(window, { key: 'ArrowRight' });

    expect(ctx?.slideIndex).toBe(1);
  });

  it('completes all steps before moving to next slide', () => {
    const StepSlide = ({ label }: { label: string }) => {
      useStep(2); // steps 0,1
      return <div>{label}</div>;
    };

    let ctx: ReturnType<typeof useDeck> | null = null;
    const Probe = () => {
      ctx = useDeck();
      return null;
    };

    render(
      <Deck>
        <Slide><StepSlide label="Step slide" /><Probe /></Slide>
        <Slide><div>Second</div></Slide>
      </Deck>
    );

    act(() => {});

    // Step through both steps (0 -> 1 -> 2) before slide advances
    act(() => ctx?.next()); // step 1
    expect(ctx?.slideIndex).toBe(0);
    expect(ctx?.stepIndex).toBe(1);

    act(() => ctx?.next()); // step 2 (still on slide 0 because stepIndex < currentSlideSteps)
    expect(ctx?.slideIndex).toBe(0);
    expect(ctx?.stepIndex).toBe(2);

    act(() => ctx?.next()); // now advance slide
    expect(ctx?.slideIndex).toBe(1);
    expect(ctx?.stepIndex).toBe(0);
  });
});

