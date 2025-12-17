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

// matchMedia mock for print detection with a toggle
const matchMediaListeners = new Set<(e: MediaQueryListEvent) => void>();
let printMatches = false;

const mockMql = {
  get matches() {
    return printMatches;
  },
  media: 'print',
  addEventListener: (_: string, cb: (e: MediaQueryListEvent) => void) => matchMediaListeners.add(cb),
  removeEventListener: (_: string, cb: (e: MediaQueryListEvent) => void) => matchMediaListeners.delete(cb),
  addListener: (cb: (e: MediaQueryListEvent) => void) => matchMediaListeners.add(cb),
  removeListener: (cb: (e: MediaQueryListEvent) => void) => matchMediaListeners.delete(cb),
  onchange: null as any,
  dispatchEvent: () => false,
};

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => {
    if (query === 'print') return mockMql;
    return {
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      onchange: null,
      dispatchEvent: () => false,
    };
  },
});

(globalThis as any).__setPrintMatches = (value: boolean) => {
  printMatches = value;
  matchMediaListeners.forEach((cb) => cb({ matches: value } as MediaQueryListEvent));
};

// Resize observer not needed but silence potential access
if (!(window as any).ResizeObserver) {
  (window as any).ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

