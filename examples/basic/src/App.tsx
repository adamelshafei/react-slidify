import { Deck, Slide, useStep, defaultTheme, Split, Notes, LaserPointer, SlideLayout } from 'react-slidify';

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
      <Slide>
        <SlideLayout align="center" title={<span style={{ color: 'var(--slide-primary)' }}>Welcome to react-slidify</span>}>
          <div />
        </SlideLayout>
      </Slide>

      <Slide>
        <SlideLayout title="Quarterly Results" subtitle="Split layout + steps">
          <Split
            ratio={0.4}
            left={
              <>
                <Bullets />
                <Notes>Remember to call out the Q2 spike.</Notes>
              </>
            }
            right={<img src="https://via.placeholder.com/800x500" alt="Chart" style={{ borderRadius: 12 }} />}
          />
        </SlideLayout>
      </Slide>
    </Deck>
  );
}

