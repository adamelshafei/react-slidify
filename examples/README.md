## Examples

This folder contains minimal, AI-authored demos of `react-slidify`. They depend on the local workspace build (`react-slidify` is referenced via `file:../..`), so you can iterate on the library and see changes live.

### examples/basic

A Vite + React + TS starter that shows:
- Theme + Split layout + step-by-step bullets
- Plugins (`LaserPointer`)
- Presenter console (open `/src/Presenter.tsx` as a separate entry point)

Run it:
```bash
cd examples/basic
npm install
npm run dev
```

To use the presenter view, either create a second entry/route in Vite or import `Presenter` in a separate page and open it in another tab while the main app shows the deck. Broadcasting uses `BroadcastChannel`, so both tabs sync slide changes automatically.

### examples/advanced

A more comprehensive demo (still minimal) that includes:
- Neon theme + Split layout + multi-step roadmap
- `Notes`, `LaserPointer`, code highlighting via `<Code>`
- PresenterConsole loaded as a plugin (open a second tab to see live/next + notes)

Run it:
```bash
cd examples/advanced
npm install
npm run dev
```

