# Source Layout (react-slidify)

This folder contains the runtime library that powers both the classic JSX API and the new JSON-first v2 API. Everything is authored in TypeScript/React and bundled via `tsup` from `src/index.ts`.

## Top-Level Files
- `index.ts` — Public entry point. Exports Deck/Slide primitives, hooks, layout blocks, plugins, themes map, and the v2 JSON helpers (`JsonDeck`, `SlideFactory`, schema types).
- `theme.ts` — Core theme shape (`DeckTheme`) plus `defaultTheme`.
- `themes.ts` — Preset theme map (`light`, `dark`, `cyber`, `corporate`) used by JSON mode.
- `schema.ts` — v2 contract: `LayoutType`, `SlideData`, `DeckData`.
- `hooks.ts` — `useAutoScaling` (16:9 fit) and `useStep` (in-slide step tracking).
- `types.ts` — Shared lightweight types (e.g., `Plugin`).
- `notes.tsx` — Presenter-only notes component.
- `index.ts` is the sole build input for `tsup` (see `tsup.config.ts`).

## Core Runtime
- `Deck.tsx` — Root provider and viewport. Handles scaling, navigation (next/prev/arrow keys), step counting, fullscreen, print mode, and plugin overlays. Exposes context values to children.
- `DeckContext.tsx` — React context definition plus `useDeck` hook.
- `Slide.tsx` — Single-slide wrapper with Framer Motion transitions and static rendering mode for print.
- `DeckControls.tsx` — UI overlay (progress, arrows, fullscreen) rendered outside the scaled viewport.
- `PresenterConsole.tsx` — Presenter view (not a plugin). Uses context to show current/next slides and notes.
- `plugins/LaserPointer.tsx` — Example overlay plugin, demonstrating how plugins mount above slides.

## Layouts and Blocks
- `layouts/SlideLayout.tsx` — Safe padded grid shell for custom slides (v1-style authoring).
- `layouts/Split.tsx` — Classic 2-column flexible split (used in v1 JSX workflows).
- `layouts/TitleSlide.tsx` — v2 hardened title slide.
- `layouts/SectionSlide.tsx` — v2 section divider slide.
- `layouts/SplitSlide.tsx` — v2 rigid 50/50 split (text left, media right) with step-aware bullets.
- `layouts/BulletsSlide.tsx` — v2 bullet layout with scroll-safe container and step reveals.
- `layouts/CodeSlide.tsx` — v2 code layout with syntax highlighting via `blocks/Code`.
- `blocks/Code.tsx` — Prism-powered code highlighter with line numbers.

## JSON-first Engine (v2)
- `JsonDeck.tsx` — High-level entry point: accepts `DeckData`, applies preset theme, renders slides, and hides presenter notes (`data-notes`).
- `components/SlideFactory.tsx` — Routes `SlideData` to hardened layouts and provides a safe fallback on unknown layouts.

## How things connect
- `JsonDeck` → wraps `Deck` → renders `Slide` children → each `Slide` renders `SlideFactory(slide)`.
- `SlideFactory` consumes `schema.ts` shapes to select a layout (`Title`, `Section`, `Split`, `Bullets`, `Code`).
- Layouts that reveal content (`SplitSlide`, `BulletsSlide`) use `useStep` so the parent `Deck` knows how many steps exist before advancing slides.
- Themes flow from `themes.ts` → `Deck` → CSS variables (`--slide-*`) consumed by all layouts.

## Testing Notes
- Vitest + React Testing Library with `tests/setup.ts` (jsdom, BroadcastChannel and fullscreen mocks, matchMedia for print, ResizeObserver shim).
- New v2 coverage lives in `tests/json-mode.test.tsx` and `tests/layouts-v2.test.tsx`.

