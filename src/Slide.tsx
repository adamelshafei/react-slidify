import React from 'react';
import { motion } from 'framer-motion';
import { useDeck } from './DeckContext';

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    position: 'absolute' as const // TypeScript cast
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    position: 'absolute' as const
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    position: 'absolute' as const
  })
};

export const Slide = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const { direction } = useDeck();

  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }}
      style={{ width: '100%', height: '100%', top: 0, left: 0 }}
      className={`slide-wrapper ${className}`.trim()}
    >
      {children}
    </motion.div>
  );
};