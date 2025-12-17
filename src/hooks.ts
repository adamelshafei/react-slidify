import { useState, useEffect, useLayoutEffect } from 'react';
import { useDeck } from './DeckContext';

// --- Hook for 16:9 Auto-Scaling ---
export const useAutoScaling = (targetWidth = 1920, targetHeight = 1080) => {
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      // Calculate scale based on the smaller dimension to ensure fit
      const scaleX = windowWidth / targetWidth;
      const scaleY = windowHeight / targetHeight;
      const newScale = Math.min(scaleX, scaleY);
      
      setScale(newScale);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial calculation

    return () => window.removeEventListener('resize', handleResize);
  }, [targetWidth, targetHeight]);

  return scale;
};

// --- Hook for Internal Slide Steps ---
export const useStep = (stepCount: number) => {
  const { stepIndex, registerSteps } = useDeck();

  // Register these steps with the parent deck
  useEffect(() => {
    registerSteps(stepCount);
  }, [stepCount, registerSteps]);

  return {
    isActive: (index: number) => stepIndex >= index,
    currentStep: stepIndex
  };
};