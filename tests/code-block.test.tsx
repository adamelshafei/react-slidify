import React from 'react';
import { render, screen } from '@testing-library/react';
import { Code } from '../src/blocks/Code';

describe('Code block', () => {
  it('renders code with line numbers', () => {
    render(<Code code={`const a = 1;\nconsole.log(a);`} language="tsx" />);

    expect(screen.getByText(/const a = 1/)).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});

