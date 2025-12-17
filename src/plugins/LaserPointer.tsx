import React, { useEffect, useState } from 'react';

export const LaserPointer = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY });
    const handleDown = () => setActive(true);
    const handleUp = () => setActive(false);

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
    };
  }, []);

  if (!active) return null;

  return (
    <div style={{
      position: 'fixed',
      top: position.y - 10,
      left: position.x - 10,
      width: 20,
      height: 20,
      background: 'red',
      borderRadius: '50%',
      boxShadow: '0 0 10px red',
      pointerEvents: 'none',
      zIndex: 9999
    }} />
  );
};

