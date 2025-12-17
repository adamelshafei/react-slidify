export type DeckTheme = {
  colors: {
    background: string;
    text: string;
    primary: string; // Accent color (links, bullets)
    secondary: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
};

export const defaultTheme: DeckTheme = {
  colors: {
    background: '#ffffff',
    text: '#1a1a1a',
    primary: '#3b82f6', // Bright Blue
    secondary: '#64748b',
  },
  fonts: {
    heading: '"Inter", sans-serif',
    body: '"Inter", sans-serif',
  }
};

