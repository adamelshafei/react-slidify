# react-slidify

A lightweight React presentation engine for AI builders. Drop this micro-library into any React project to create smooth, scalable slide decks with animations, step-by-step reveals, theming, plugins, presenter mode, print/PDF support, and a polished control bar.

## Features

- **Auto-scaling**: Automatically scales to 16:9 aspect ratio on any screen size
- **Smooth animations**: Powered by Framer Motion for professional transitions
- **Step management**: Built-in support for revealing bullet points or elements step-by-step
- **Keyboard navigation**: Arrow keys to navigate slides and steps
- **Modern frame**: Hover-to-reveal control bar with progress, arrows, fullscreen
- **Theming**: CSS variable-driven theme object (colors + fonts)
- **Plugins**: Drop-in overlay components (e.g., Laser Pointer, Notes)
- **Presenter mode**: BroadcastChannel-powered dual-screen presenter console
- **Print/PDF mode**: One-click print-ready vertical rendering
- **Smart layouts**: Built-in Split layout for AI-friendly slide composition
- **Code highlighting**: Prism-based `<Code>` block for developers
- **TypeScript support**: Fully typed for better developer experience
- **Micro-library**: Minimal bundle size, no bloat

## Installation

```bash
npm install react-slidify
```

### Peer Dependencies

Make sure you have these installed in your project:

```bash
npm install react react-dom framer-motion
```

## Quick Start

```tsx
import React from 'react';
import { Deck, Slide, useStep, defaultTheme, LaserPointer, PresenterConsole, Notes, Split, Code } from 'react-slidify';

const cyberTheme = {
  ...defaultTheme,
  colors: {
    background: '#0f172a',
    text: '#f8fafc',
    primary: '#22d3ee',
    secondary: '#94a3b8'
  },
  fonts: {
    heading: '"Roboto Mono", monospace',
    body: '"Inter", sans-serif'
  }
};

const BulletPoints = () => {
  const { isActive } = useStep(3); // 3 steps to reveal

  return (
    <div>
      <p style={{ opacity: isActive(0) ? 1 : 0.2 }}>👉 Step 1: Define the Problem</p>
      <p style={{ opacity: isActive(1) ? 1 : 0.2 }}>👉 Step 2: Build the Solution</p>
      <p style={{ opacity: isActive(2) ? 1 : 0.2 }}>👉 Step 3: Profit</p>
    </div>
  );
};

export default function App() {
  return (
    <Deck theme={cyberTheme} plugins={[LaserPointer]}>
      <Slide className="flex items-center justify-center">
        <h1 style={{ color: 'var(--slide-primary)' }}>Welcome to react-slidify</h1>
      </Slide>

      <Slide className="p-20">
        <h2 style={{ fontFamily: 'var(--slide-font-head)' }}>The Roadmap</h2>
        <BulletPoints />
        <Notes>Remember to call out Q2 spike.</Notes>
      </Slide>

      <Slide className="p-0">
        <Split
          ratio={0.4}
          left={
            <>
              <h1>Quarterly Review</h1>
              <ul><li>Q1 was slow</li><li>Q2 exploded</li></ul>
            </>
          }
          right={<img src="/chart.png" alt="Chart" />}
        />
      </Slide>

      <Slide className="flex items-center justify-center" style={{ background: 'black', color: 'white' }}>
        <h1>Thank You</h1>
      </Slide>
    </Deck>
  );
}
```

Presenter console (open in another tab/window and point at the same app):

```tsx
export function Presenter() {
  return (
    <Deck>
      {/* slides */}
      <PresenterConsole />
    </Deck>
  );
}
```

## API Reference

### `<Deck>`

The root component that manages the presentation state.

**Props:**
- `children`: React.ReactNode - The slide components
- `theme?`: `DeckTheme` - Colors + fonts applied as CSS variables
- `plugins?`: `Plugin[]` - Overlay components rendered above the slide
- `printMode?`: boolean - Renders all slides vertically for print/PDF

### `<Slide>`

A wrapper for individual slides with automatic entry/exit animations.

**Props:**
- `children`: React.ReactNode - The slide content
- `className?`: string - Optional CSS classes

### `useStep(count: number)`

Hook for managing step-by-step reveals within a slide.

**Parameters:**
- `count`: number - Number of steps in this slide

**Returns:**
- `isActive(index: number)`: boolean - Whether the step at index is active
- `currentStep`: number - Current step index

### `useAutoScaling(targetWidth?, targetHeight?)`

Hook for manual scaling (automatically used by Deck).

**Parameters:**
- `targetWidth`: number (default: 1920)
- `targetHeight`: number (default: 1080)

**Returns:**
- `scale`: number - Scale factor for CSS transform

### `useDeck()`

Hook to access deck context (advanced usage).

**Returns:**
- `slideIndex`: number
- `stepIndex`: number
- `direction`: 1 | -1
- `next()`: () => void
- `prev()`: () => void
- `goToSlide(index: number)`: () => void
- `registerSteps(count: number)`: () => void
- `toggleFullscreen()`: () => void
- `isFullscreen`: boolean
- `totalSlides`: number
- `slides`: React.ReactNode[] - Array of slide elements

## Navigation

- **Right Arrow**: Next slide or next step
- **Left Arrow**: Previous slide or previous step

## Presenter Mode (Dual Screen)

Deck syncs across tabs using `BroadcastChannel`. Open one tab as the projector (slides) and another as the presenter console:

```tsx
<Deck plugins={[LaserPointer]}>
  {/* slides */}
  <PresenterConsole />
</Deck>
```

Presenter console shows live slide, next slide preview, speaker notes (via `<Notes>`), and a timer. State changes propagate automatically between tabs.

## Print / PDF Mode

Pass `printMode` or simply use browser print (Ctrl+P). In print mode all slides render vertically with one slide per page; controls/plugins are hidden automatically.

```tsx
<Deck printMode>
  {/* slides */}
</Deck>
```

## Smart Layouts

Use `<Split>` for fast, structured layouts without custom CSS:

```tsx
<Slide>
  <Split
    ratio={0.4}
    left={<h2>Quarterly Review</h2>}
    right={<img src="/chart.png" alt="Chart" />}
  />
</Slide>
```

## Code Highlighting

Developer-friendly code blocks powered by `prism-react-renderer`:

```tsx
<Code language="tsx" code={`const hello = 'world';`} />
```

## Theming

Provide a `DeckTheme` to the `Deck`. Colors and fonts become CSS variables available inside slides: `var(--slide-bg)`, `var(--slide-text)`, `var(--slide-primary)`, `var(--slide-secondary)`, `var(--slide-font-head)`, `var(--slide-font-body)`.

## Plugins

Plugins are simple React components that render in the overlay layer. Example:

```tsx
import { Plugin } from 'react-slidify';
import { useDeck } from 'react-slidify';

export const ClockPlugin: Plugin = () => {
  const { slideIndex } = useDeck();
  return (
    <div style={{ position: 'absolute', top: 16, right: 24, color: 'white' }}>
      Slide {slideIndex + 1}
    </div>
  );
};
```

Pass plugins via `plugins={[ClockPlugin]}`.

## Why AI-Ready?

This library is designed for AI builders because:
- Simple, predictable API
- No complex state calculations
- Standard React patterns
- Automatic scaling prevents layout issues
- Minimal abstraction - just wrap components in `<Slide>`

## License

ISC

