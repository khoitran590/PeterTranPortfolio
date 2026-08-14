// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Deliberately a plain function rather than a jest.fn: Create React App sets
// `resetMocks: true`, which strips the implementation off every mock before
// each test. As a jest.fn this returned undefined the moment a second test ran,
// and framer-motion's useReducedMotion crashed reading .addEventListener on it.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    // framer-motion probes the legacy pair on older browsers, so both APIs
    // are stubbed.
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
    onchange: null,
  }),
});

class IntersectionObserverMock {
  observe() {}
  disconnect() {}
  unobserve() {}
}

window.IntersectionObserver = IntersectionObserverMock;

// framer-motion measures layout for useScroll and shared layout animations.
class ResizeObserverMock {
  observe() {}
  disconnect() {}
  unobserve() {}
}

window.ResizeObserver = ResizeObserverMock;

// jsdom has no layout engine, so scrollTo is not implemented.
window.scrollTo = () => {};
