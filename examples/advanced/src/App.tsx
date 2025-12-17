import { useMemo } from 'react';
import {
  Deck,
  Slide,
  useStep,
  defaultTheme,
  Split,
  Notes,
  LaserPointer,
  Code,
  SlideLayout,
} from 'react-slidify';

const neonTheme = {
  ...defaultTheme,
  colors: {
    background: '#0a0f1f',
    text: '#e2e8f0',
    primary: '#22d3ee',
    secondary: '#a855f7',
  },
  fonts: {
    heading: '"Sora", "Inter", sans-serif',
    body: '"Inter", system-ui, sans-serif',
  },
};

const Pill = ({ label }: { label: string }) => <span className="pill">{label}</span>;

const Roadmap = () => {
  const { isActive } = useStep(4);
  return (
    <div style={{ display: 'grid', gap: 14 }}>
      <div style={{ opacity: isActive(0) ? 1 : 0.25 }}><Pill label="Q1" /> Foundations & Scaling</div>
      <div style={{ opacity: isActive(1) ? 1 : 0.25 }}><Pill label="Q2" /> AI Templates & Plugins</div>
      <div style={{ opacity: isActive(2) ? 1 : 0.25 }}><Pill label="Q3" /> Presenter & Live Collab</div>
      <div style={{ opacity: isActive(3) ? 1 : 0.25 }}><Pill label="Q4" /> Export & Analytics</div>
    </div>
  );
};

const CodeSnippet = () => {
  const code = useMemo(
    () => `import { Deck, Slide, Notes } from 'react-slidify';

export default function DeckDemo() {
  return (
    <Deck>
      <Slide>
        <h1>Hello</h1>
        <Notes>Remind audience about Q3 launch.</Notes>
      </Slide>
    </Deck>
  );
}`,
    []
  );

  return <Code code={code} language="tsx" />;
};

export default function App() {
  return (
    <Deck theme={neonTheme} plugins={[LaserPointer]}>
      <Slide>
        <SlideLayout align="center" title={<span style={{ color: 'var(--slide-primary)' }}>react-slidify</span>} subtitle="AI-ready presentation engine">
          <div style={{ display: 'grid', gap: 12, justifyItems: 'center' }}>
            <Pill label="AI Ready" />
            <p style={{ color: '#94a3b8', maxWidth: 720, textAlign: 'center' }}>
              The minimal deck engine with theming, plugins, presenter mode, print, layouts, and code highlighting.
            </p>
          </div>
        </SlideLayout>
      </Slide>

      <Slide>
        <SlideLayout title="Roadmap" subtitle="Plugins, Presenter, Export" align="left">
          <Split
            ratio={0.42}
            left={
              <>
                <Roadmap />
                <Notes>Call out the Q2 plugins milestone and Q3 presenter launch.</Notes>
              </>
            }
            right={
              <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CodeSnippet />
              </div>
            }
          />
        </SlideLayout>
      </Slide>

      <Slide style={{ background: '#0b1220' }}>
        <SlideLayout align="center" title={<span style={{ color: 'var(--slide-primary)' }}>Presenter Console Built-In</span>} subtitle="Open another tab to see live/next, notes, timer, and controls.">
          <div />
        </SlideLayout>
      </Slide>
    </Deck>
  );
}

