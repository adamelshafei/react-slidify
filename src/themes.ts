import { DeckTheme, defaultTheme } from './theme';

// Preset themes for JSON-driven decks
export const themes: Record<'dark' | 'light' | 'cyber' | 'corporate', DeckTheme> = {
  light: defaultTheme,
  dark: {
    ...defaultTheme,
    colors: {
      background: '#0b1224',
      text: '#e2e8f0',
      primary: '#22d3ee',
      secondary: '#94a3b8',
    },
    fonts: {
      heading: '"Inter", sans-serif',
      body: '"Inter", sans-serif',
    },
  },
  cyber: {
    ...defaultTheme,
    colors: {
      background: '#050816',
      text: '#e5e7eb',
      primary: '#8b5cf6',
      secondary: '#22d3ee',
    },
    fonts: {
      heading: '"JetBrains Mono", monospace',
      body: '"Inter", sans-serif',
    },
  },
  corporate: {
    ...defaultTheme,
    colors: {
      background: '#f8fafc',
      text: '#0f172a',
      primary: '#2563eb',
      secondary: '#475569',
    },
    fonts: {
      heading: '"Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif',
      body: '"Inter", sans-serif',
    },
  },
};

