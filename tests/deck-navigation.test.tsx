import React, { PropsWithChildren } from 'react';
import { render, act, screen, fireEvent, renderHook } from '@testing-library/react';
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
        <Slide><div>Slide 1</div><Probe /></Slide>
        <Slide><StepSlide /></Slide>
        <Slide><div>Slide 3</div></Slide>
      </Deck>
    );

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
    render(
      <Deck>
        <Slide>1</Slide>
        <Slide>2</Slide>
      </Deck>
    );

    // Initial state: Slide 1
    expect(screen.getByText('1')).toBeVisible();

    // Simulate User Pressing Right Arrow
    fireEvent.keyDown(window, { key: 'ArrowRight' });

    // Expect: Slide 2
    expect(screen.getByText('2')).toBeVisible();
  });

  it('completes all steps before moving to next slide', () => {
    const StepSlide = () => {
      useStep(2); // steps 0,1
      return <div>Step slide</div>;
    };

    const wrapper = ({ children }: PropsWithChildren) => (
      <Deck>
        <Slide><StepSlide /></Slide>
        <Slide><div>Second</div></Slide>
        {children}
      </Deck>
    );

    const { result } = renderHook(() => useDeck(), { wrapper });

    // Start at slide 0, step 0
    act(() => result.current.next());
    expect(result.current.slideIndex).toBe(0);
    expect(result.current.stepIndex).toBe(1);

    act(() => result.current.next());
    expect(result.current.slideIndex).toBe(1);
    expect(result.current.stepIndex).toBe(0);
  });
});

