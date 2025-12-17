import React from 'react';
import { SlideData } from '../schema';
import { SplitSlide } from '../layouts/SplitSlide';
import { TitleSlide } from '../layouts/TitleSlide';
import { SectionSlide } from '../layouts/SectionSlide';
import { BulletsSlide } from '../layouts/BulletsSlide';
import { CodeSlide } from '../layouts/CodeSlide';

type SlideFactoryProps = {
  slide: SlideData;
};

// Routes JSON slide definitions to hardened layouts
export const SlideFactory = ({ slide }: SlideFactoryProps) => {
  const accent = slide.content.accent;

  switch (slide.layout) {
    case 'Title':
      return <TitleSlide title={slide.title} subtitle={slide.subtitle} accent={accent} />;
    case 'Section':
      return <SectionSlide title={slide.title} subtitle={slide.subtitle} accent={accent} />;
    case 'Split':
      return (
        <SplitSlide
          title={slide.title}
          bullets={slide.content.bullets}
          image={slide.content.image}
          accent={accent}
        />
      );
    case 'Bullets':
      return (
        <BulletsSlide
          title={slide.title}
          subtitle={slide.subtitle}
          bullets={slide.content.bullets}
          accent={accent}
        />
      );
    case 'Code':
      return (
        <CodeSlide
          title={slide.title}
          subtitle={slide.subtitle}
          code={slide.content.code}
          language={slide.content.language}
          accent={accent}
        />
      );
    default:
      return (
        <div style={{ color: 'red', padding: 50 }}>
          Unknown Layout: {slide.layout}
        </div>
      );
  }
};

