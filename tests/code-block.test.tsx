import React from 'react';
import { render, screen } from '@testing-library/react';
import { Code } from '../src/blocks/Code';

describe('Code block', () => {
  it('renders code with line numbers', () => {
    render(<Code code={`const a = 1;\nconsole.log(a);`} language="tsx" />);

    // tokens are split; assert key tokens and line numbers exist
    expect(screen.getByText(/const/i)).toBeInTheDocument();
    expect(screen.getByText(/console/i)).toBeInTheDocument();
    expect(screen.getByText(/log/i)).toBeInTheDocument();
    expect(screen.getAllByText('1').length).toBeGreaterThan(0); // line number appears
    expect(screen.getAllByText('2').length).toBeGreaterThan(0); // line number appears
  });
});

