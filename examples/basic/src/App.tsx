import { Deck, Slide, useStep, defaultTheme, Split, Notes, LaserPointer } from 'react-slidify';

const cyberTheme = {
  ...defaultTheme,
  colors: {
    background: '#0f172a',
    text: '#f8fafc',
    primary: '#22d3ee',
    secondary: '#94a3b8',
  },
  fonts: {
    heading: '"Roboto Mono", monospace',
    body: '"Inter", sans-serif',
  },
};

const Bullets = () => {
  const { isActive } = useStep(3);
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <p style={{ opacity: isActive(0) ? 1 : 0.2 }}>👉 Step 1: Define the Problem</p>
      <p style={{ opacity: isActive(1) ? 1 : 0.2 }}>👉 Step 2: Build the Solution</p>
      <p style={{ opacity: isActive(2) ? 1 : 0.2 }}>👉 Step 3: Profit</p>
    </div>
  );
};

export default function App() {
  return (
    <Deck theme={cyberTheme} plugins={[LaserPointer]}>
      <Slide className="flex items-center justify-center">
        <h1 style={{ color: 'var(--slide-primary)' }}>Welcome to react-slidify</h1>
      </Slide>

      <Slide className="p-20">
        <Split
          ratio={0.4}
          left={
            <>
              <h2 style={{ fontFamily: 'var(--slide-font-head)' }}>Quarterly Results</h2>
              <Bullets />
              <Notes>Remember to call out the Q2 spike.</Notes>
            </>
          }
          right={<img src="https://via.placeholder.com/800x500" alt="Chart" style={{ borderRadius: 12 }} />}
        />
      </Slide>
    </Deck>
  );
}

