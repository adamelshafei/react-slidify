import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock BroadcastChannel for jsdom with sibling fan-out
const channels = new Map<string, FakeBroadcastChannel[]>();

class FakeBroadcastChannel {
  name: string;
  onmessage: ((event: MessageEvent) => void) | null = null;

  constructor(name: string) {
    this.name = name;
    if (!channels.has(name)) channels.set(name, []);
    channels.get(name)!.push(this);
  }

  postMessage(data: any) {
    const siblings = channels.get(this.name) || [];
    siblings.forEach((channel) => {
      if (channel !== this && channel.onmessage) {
        channel.onmessage({ data } as MessageEvent);
      }
    });
  }

  close() {
    const siblings = channels.get(this.name) || [];
    channels.set(this.name, siblings.filter((c) => c !== this));
  }
}

// Provide globals expected by Deck/print logic
Object.defineProperty(globalThis, 'BroadcastChannel', { value: FakeBroadcastChannel });

// Fullscreen mocks
Object.defineProperty(document, 'fullscreenElement', {
  writable: true,
  value: null,
});

document.documentElement.requestFullscreen = vi.fn(async () => {
  (document as any).fullscreenElement = document.documentElement;
});
(document as any).exitFullscreen = vi.fn(async () => {
  (document as any).fullscreenElement = null;
});

// matchMedia mock for print detection
if (!window.matchMedia) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.matchMedia = () => ({
    matches: false,
    media: '',
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    onchange: null,
    dispatchEvent: () => false,
  });
}

// Resize observer not needed but silence potential access
if (!(window as any).ResizeObserver) {
  (window as any).ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

