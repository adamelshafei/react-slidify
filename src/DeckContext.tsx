import { createContext, useContext } from 'react';

export type DeckContextType = {
  slideIndex: number;
  stepIndex: number; // For revealing bullet points 1-by-1
  direction: 1 | -1; // For animation direction
  totalSlides: number;
  slides: React.ReactNode[];
  goToSlide: (index: number) => void;
  next: () => void;
  prev: () => void;
  registerSteps: (count: number) => void; // How slides tell the deck "I have animations"
  toggleFullscreen: () => void;
  isFullscreen: boolean;
};

export const DeckContext = createContext<DeckContextType | null>(null);

export const useDeck = () => {
  const context = useContext(DeckContext);
  if (!context) throw new Error("useDeck must be used within a Deck");
  return context;
};