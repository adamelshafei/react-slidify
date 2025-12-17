import React from 'react';

type SplitProps = {
  left: React.ReactNode;
  right: React.ReactNode;
  ratio?: number;
};

export const Split = ({ left, right, ratio = 0.5 }: SplitProps) => {
  const leftRatio = Math.min(Math.max(ratio, 0.1), 0.9);
  const rightRatio = 1 - leftRatio;

  const renderRight = () => {
    if (React.isValidElement(right) && (right as any).type === 'img') {
      return React.cloneElement(right as any, {
        style: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
      });
    }
    return right;
  };

  return (
    <div style={{ display: 'flex', height: '100%', width: '100%' }}>
      <div style={{ flex: leftRatio, padding: 60, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12 }}>
        {left}
      </div>
      <div style={{ flex: rightRatio, height: '100%', overflow: 'hidden' }}>
        {renderRight()}
      </div>
    </div>
  );
};

