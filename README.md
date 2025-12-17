# react-slidify ⚡️

A lightweight, AI-ready React presentation engine.

[![npm version](https://img.shields.io/npm/v/react-slidify.svg)](https://www.npmjs.com/package/react-slidify)  
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

![react-slidify demo](https://via.placeholder.com/800x400?text=Insert+GIF+Here)

Drop this micro-library into any React project to create smooth, scalable slide decks with animations, step-by-step reveals, theming, plugins, presenter mode, and PDF support.

Designed specifically for **AI Agents** and **LLMs** to generate reliable slide decks without complex CSS or state management.

## Features

- 📏 **Auto-scaling**: Automatically scales to 16:9 aspect ratio on any screen size (mobile to 4K).
- 🎬 **Smooth animations**: Powered by Framer Motion for cinema-grade transitions.
- 🪜 **Step management**: Built-in hooks for revealing bullet points one by one.
- 🕹 **Modern UI**: Hover-to-reveal control bar with progress, arrows, and fullscreen toggle.
- 🎨 **Theming**: Zero-config CSS variables for instant AI "skinning".
- 🔌 **Plugins**: Drop-in overlay system (Laser Pointer, Live Polls, etc.).
- 🎙 **Presenter Mode**: Dual-screen sync via `BroadcastChannel` (no server required).
- 🖨 **PDF / Print**: One-click vertical rendering for export.
- 🤖 **Smart Layouts**: Pre-built components like `<Split>` so AI doesn't break the layout.
- 📝 **Speaker Notes**: Dedicated `<Notes>` component that only appears in Presenter View.

## Installation

```bash
npm install react-slidify
npm install react react-dom framer-motion
```

## Quick Start

### 1) The Presentation (`App.tsx`)

```tsx
import React from 'react';
import { Deck, Slide, useStep, defaultTheme, LaserPointer, Split, Notes } from 'react-slidify';

// 1. Define a Theme
const cyberTheme = {
  ...defaultTheme,
  colors: {
    background: '#0f172a',
    text: '#f8fafc',
    primary: '#22d3ee', // Cyan
    secondary: '#94a3b8'
  },
  fonts: {
    heading: '"Roboto Mono", monospace',
    body: '"Inter", sans-serif'
  }
};

// 2. Create a "Stepped" Component
const BulletPoints = () => {
  const { isActive } = useStep(3); // Register 3 steps

  return (
    <div className="space-y-4">
      <p style={{ opacity: isActive(0) ? 1 : 0.2 }}>👉 Step 1: Define the Problem</p>
      <p style={{ opacity: isActive(1) ? 1 : 0.2 }}>👉 Step 2: Build the Solution</p>
      <p style={{ opacity: isActive(2) ? 1 : 0.2 }}>👉 Step 3: Profit</p>
    </div>
  );
};

export default function App() {
  return (
    <Deck theme={cyberTheme} plugins={[LaserPointer]}>
      
      {/* Slide 1 */}
      <Slide className="flex items-center justify-center">
        <h1 style={{ color: 'var(--slide-primary)' }}>Welcome to react-slidify</h1>
      </Slide>

      {/* Slide 2: Complex Layout */}
      <Slide className="p-20">
        <Split
          ratio={0.4}
          left={
            <>
              <h2>Quarterly Results</h2>
              <BulletPoints />
            </>
          }
          right={<img src="/chart.png" className="rounded-xl shadow-lg" />}
        />
        {/* These notes only show in Presenter Mode */}
        <Notes>Don't forget to mention the Q2 spike in revenue.</Notes>
      </Slide>
    </Deck>
  );
}
```

### 2) The Presenter Console (`Presenter.tsx`)

Create a separate route (e.g., `/presenter`) that renders this component. Open it on your laptop while projecting the main deck.

```tsx
import { Deck, PresenterConsole } from 'react-slidify';

export default function Presenter() {
  return (
    <Deck>
      <PresenterConsole />
    </Deck>
  );
}
```

## API Reference

### `<Deck>`

The root provider.

| Prop | Type | Description |
| :--- | :--- | :--- |
| theme | DeckTheme | Object defining colors and fonts. |
| plugins | Plugin[] | Array of overlay components (e.g. LaserPointer). |
| printMode | boolean | If true, renders vertically for PDF export. |

### `<Slide>`

Wrapper for content. Handles entry/exit animations automatically.

| Prop | Type | Description |
| :--- | :--- | :--- |
| className | string | Tailwind or CSS class. |
| transition | object | Framer Motion transition override. |

### `useStep(count)`

Hook to create "builds" inside a slide.

```tsx
const { isActive, currentStep } = useStep(3);
```

### `useDeck()`

Hook to access deck context (advanced usage).

**Returns:** `slideIndex`, `stepIndex`, `direction`, `next`, `prev`, `goToSlide`, `registerSteps`, `toggleFullscreen`, `isFullscreen`, `totalSlides`, `slides`.

## Presenter Mode (Dual Screen)

Uses the browser's `BroadcastChannel` API to sync state between tabs without a server.

1. Open your app on the projector (`/`).
2. Open the presenter route (`/presenter`) on your laptop.
3. Controlling the presenter view controls the projector.

Presenter console shows live slide, next slide preview, speaker notes (via `<Notes>`), and a timer. State changes propagate automatically between tabs.

## Print / PDF

Pass `<Deck printMode={true} />` or simply use browser print (Ctrl/Cmd + P). In print mode all slides render vertically with one slide per page; controls/plugins are hidden automatically.

```tsx
<Deck printMode>
  {/* slides */}
</Deck>
```

## Smart Layouts

Don't let AI struggle with CSS. Use `<Split>` for perfect 2-column layouts.

```tsx
<Split left={<h1>Text</h1>} right={<img src="..." />} ratio={0.5} />
```

## Code Highlighting

Developer-friendly code blocks powered by `prism-react-renderer`:

```tsx
<Code language="tsx" code={`const hello = 'world';`} />
```

## Why is this "AI-Ready"?

- Safety: The AI generates semantic `<Slide>` blocks, not fragile HTML.
- Consistency: `<Split>` and `useAutoScaling` ensure the deck looks perfect on any device.
- Theming: The AI only needs to generate a JSON theme object to completely restyle the deck.

## License

MIT © Adam Elshafei
