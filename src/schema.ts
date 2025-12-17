// Strongly-typed JSON contract for v2 decks
export type LayoutType = 'Title' | 'Section' | 'Split' | 'Bullets' | 'Code';

export interface SlideData {
  id: string;
  layout: LayoutType;
  title?: string;
  subtitle?: string;
  notes?: string;
  content: {
    bullets?: string[];
    image?: string;
    code?: string;
    language?: string;
    accent?: string;
  };
}

export interface DeckData {
  title: string;
  theme: 'dark' | 'light' | 'cyber' | 'corporate';
  slides: SlideData[];
}

