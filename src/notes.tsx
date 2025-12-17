import React from 'react';

export const Notes: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;

export const extractNotes = (node: React.ReactNode): React.ReactNode | null => {
  if (!node) return null;

  if (Array.isArray(node)) {
    for (const child of node) {
      const found = extractNotes(child);
      if (found) return found;
    }
    return null;
  }

  if (React.isValidElement(node)) {
    if (node.type === Notes) {
      return node.props.children ?? null;
    }

    const children = node.props?.children;
    if (!children) return null;

    const childArray = React.Children.toArray(children);
    for (const child of childArray) {
      const found = extractNotes(child);
      if (found) return found;
    }
  }

  return null;
};

