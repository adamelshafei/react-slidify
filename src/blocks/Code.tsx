import React from 'react';
import { Highlight, themes } from 'prism-react-renderer';

type CodeProps = {
  code: string;
  language?: string;
};

export const Code = ({ code, language = 'tsx' }: CodeProps) => (
  <Highlight theme={themes.vsDark} code={code} language={language as any}>
    {({ style, tokens, getLineProps, getTokenProps }) => (
      <pre
        style={{
          ...style,
          padding: '20px',
          borderRadius: '10px',
          fontSize: '18px',
          overflowX: 'auto',
          background: '#0f172a',
          color: '#e2e8f0',
        }}
      >
        {tokens.map((line, i) => (
          <div key={i} {...getLineProps({ line })}>
            <span style={{ display: 'inline-block', width: '2em', opacity: 0.45, userSelect: 'none' }}>
              {i + 1}
            </span>
            {line.map((token, key) => (
              <span key={key} {...getTokenProps({ token })} />
            ))}
          </div>
        ))}
      </pre>
    )}
  </Highlight>
);

