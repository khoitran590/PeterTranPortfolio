// src/components/ui/flip-disk-matrix.jsx
//
// Electromechanical flip-disk display. Ported from the TypeScript original to
// plain JSX for this Create React App project. Behavioural changes from the
// source, all deliberate:
//
//   1. The flip transform moved from an inline style to the --flip-angle custom
//      property (see .flip-disk-faces in index.css). Upstream set `transform`
//      inline *and* tried to override it with `hover:rotate-x-[90deg]`; an
//      inline style always wins, and `rotate-x-*` is a Tailwind v4 utility that
//      does not exist in the v3 used here, so the hover effect never fired.
//   2. Time and text modes derive their frame directly and run no animation
//      frame loop at all. Only wave and noise need one.
//   3. Noise ticks at 400ms rather than 250ms. A full-field random inversion at
//      4Hz sits above the three-flashes-per-second threshold in WCAG 2.3.1.
//   4. prefers-reduced-motion renders a single static frame instead of looping.
//   5. The grid carries role="img" with a live-updating label, so the display
//      is not a silent pile of 341 divs to a screen reader.
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const COLS = 31;
const ROWS = 11;
const GLYPH_W = 5;
const GLYPH_H = 7;

// Minimal 5x7 font definition
const GLYPHS = {
  '0': [0b01110, 0b10001, 0b10011, 0b10101, 0b11001, 0b10001, 0b01110],
  '1': [0b00100, 0b01100, 0b00100, 0b00100, 0b00100, 0b00100, 0b01110],
  '2': [0b01110, 0b10001, 0b00001, 0b00110, 0b01000, 0b10000, 0b11111],
  '3': [0b01110, 0b10001, 0b00001, 0b00110, 0b00001, 0b10001, 0b01110],
  '4': [0b00010, 0b00110, 0b01010, 0b10010, 0b11111, 0b00010, 0b00010],
  '5': [0b11111, 0b10000, 0b11110, 0b00001, 0b00001, 0b10001, 0b01110],
  '6': [0b00110, 0b01000, 0b10000, 0b11110, 0b10001, 0b10001, 0b01110],
  '7': [0b11111, 0b00001, 0b00010, 0b00100, 0b01000, 0b01000, 0b01000],
  '8': [0b01110, 0b10001, 0b10001, 0b01110, 0b10001, 0b10001, 0b01110],
  '9': [0b01110, 0b10001, 0b10001, 0b01111, 0b00001, 0b00010, 0b01100],
  ':': [0b00000, 0b00100, 0b00000, 0b00000, 0b00000, 0b00100, 0b00000],
  ' ': [0b00000, 0b00000, 0b00000, 0b00000, 0b00000, 0b00000, 0b00000],
  A: [0b01110, 0b10001, 0b10001, 0b11111, 0b10001, 0b10001, 0b10001],
  B: [0b11110, 0b10001, 0b10001, 0b11110, 0b10001, 0b10001, 0b11110],
  C: [0b01110, 0b10001, 0b10000, 0b10000, 0b10000, 0b10001, 0b01110],
  D: [0b11110, 0b10001, 0b10001, 0b10001, 0b10001, 0b10001, 0b11110],
  E: [0b11111, 0b10000, 0b10000, 0b11110, 0b10000, 0b10000, 0b11111],
  F: [0b11111, 0b10000, 0b10000, 0b11110, 0b10000, 0b10000, 0b10000],
  G: [0b01110, 0b10001, 0b10000, 0b10111, 0b10001, 0b10001, 0b01110],
  H: [0b10001, 0b10001, 0b10001, 0b11111, 0b10001, 0b10001, 0b10001],
  I: [0b01110, 0b00100, 0b00100, 0b00100, 0b00100, 0b00100, 0b01110],
  J: [0b00011, 0b00001, 0b00001, 0b00001, 0b10001, 0b10001, 0b01110],
  K: [0b10001, 0b10010, 0b10100, 0b11000, 0b10100, 0b10010, 0b10001],
  L: [0b10000, 0b10000, 0b10000, 0b10000, 0b10000, 0b10000, 0b11111],
  M: [0b10001, 0b11011, 0b10101, 0b10001, 0b10001, 0b10001, 0b10001],
  N: [0b10001, 0b11001, 0b10101, 0b10011, 0b10001, 0b10001, 0b10001],
  O: [0b01110, 0b10001, 0b10001, 0b10001, 0b10001, 0b10001, 0b01110],
  P: [0b11110, 0b10001, 0b10001, 0b11110, 0b10000, 0b10000, 0b10000],
  Q: [0b01110, 0b10001, 0b10001, 0b10001, 0b10101, 0b01110, 0b00001],
  R: [0b11110, 0b10001, 0b10001, 0b11110, 0b10100, 0b10010, 0b10001],
  S: [0b01110, 0b10001, 0b10000, 0b01110, 0b00001, 0b10001, 0b01110],
  T: [0b11111, 0b00100, 0b00100, 0b00100, 0b00100, 0b00100, 0b00100],
  U: [0b10001, 0b10001, 0b10001, 0b10001, 0b10001, 0b10001, 0b01110],
  V: [0b10001, 0b10001, 0b10001, 0b10001, 0b10001, 0b01010, 0b00100],
  W: [0b10001, 0b10001, 0b10001, 0b10101, 0b10101, 0b11011, 0b10001],
  X: [0b10001, 0b10001, 0b01010, 0b00100, 0b01010, 0b10001, 0b10001],
  Y: [0b10001, 0b10001, 0b01010, 0b00100, 0b00100, 0b00100, 0b00100],
  Z: [0b11111, 0b00001, 0b00010, 0b00100, 0b01000, 0b10000, 0b11111],
};

const blankGrid = () => Array.from({ length: ROWS }, () => Array(COLS).fill(false));

function glyphBitmap(value) {
  const grid = blankGrid();
  const chars = value.toUpperCase().split('');
  const totalWidth = chars.length * (GLYPH_W + 1) - 1;

  let originX = Math.max(0, Math.floor((COLS - totalWidth) / 2));
  const originY = Math.max(0, Math.floor((ROWS - GLYPH_H) / 2));

  for (const char of chars) {
    const rowBits = GLYPHS[char] || GLYPHS[' '];
    for (let y = 0; y < GLYPH_H; y += 1) {
      for (let x = 0; x < GLYPH_W; x += 1) {
        if (originY + y < ROWS && originX + x < COLS) {
          grid[originY + y][originX + x] = Boolean(rowBits[y] & (1 << (GLYPH_W - 1 - x)));
        }
      }
    }
    originX += GLYPH_W + 1;
  }
  return grid;
}

const patternFrame = (mode, t) => {
  if (mode === 'wave') {
    return Array.from({ length: ROWS }, (_, y) =>
      Array.from({ length: COLS }, (_, x) => Math.sin(x * 0.2 + t * 3) * Math.cos(y * 0.3 + t * 2) > 0.2)
    );
  }
  return Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => Math.random() > 0.6));
};

// Returns the previous grid unchanged when nothing flipped, so the memoized
// disks below skip re-rendering entirely.
const reconcile = (prev, next) => {
  let changed = false;
  const merged = prev.map((row, y) =>
    row.map((cell, x) => {
      if (cell !== next[y][x]) changed = true;
      return next[y][x];
    })
  );
  return changed ? merged : prev;
};

const readClock = () =>
  new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });

const Disk = memo(function Disk({ on }) {
  return (
    <div className="flip-disk relative aspect-square w-full cursor-crosshair" style={{ perspective: '400px' }}>
      <div className="flip-disk-faces absolute inset-0 h-full w-full" style={{ '--flip-angle': on ? '180deg' : '0deg' }}>
        <div className="absolute inset-0 rounded-full border border-neutral-300 bg-neutral-200 shadow-[inset_0_1px_3px_rgba(0,0,0,0.15)] [backface-visibility:hidden] dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]" />
        <div className="absolute inset-0 rounded-full border border-neutral-700 bg-neutral-900 shadow-[inset_0_-1px_3px_rgba(0,0,0,0.4)] [backface-visibility:hidden] [transform:rotateX(180deg)] dark:border-[#c4db3f] dark:bg-[#E5FD52] dark:shadow-[inset_0_-2px_6px_rgba(0,0,0,0.2)]" />
      </div>
    </div>
  );
});

const MODES = ['time', 'text', 'wave', 'noise'];

export function FlipDiskMatrix() {
  const reduceMotion = useReducedMotion();
  const [mode, setMode] = useState('time');
  const [text, setText] = useState('FLIP');
  const [clock, setClock] = useState(readClock);
  const [bits, setBits] = useState(blankGrid);

  // Only the two text-driven modes have something to spell out.
  const display = mode === 'time' ? clock : mode === 'text' ? text : null;

  useEffect(() => {
    if (mode !== 'time') return undefined;
    setClock(readClock());
    const id = window.setInterval(() => setClock(readClock()), 1000);
    return () => window.clearInterval(id);
  }, [mode]);

  const draw = useCallback((next) => setBits((prev) => reconcile(prev, next)), []);

  useEffect(() => {
    if (display !== null) {
      draw(glyphBitmap(display));
      return undefined;
    }

    draw(patternFrame(mode, 0));
    // A single frame is the whole animation when motion is reduced.
    if (reduceMotion) return undefined;

    const interval = mode === 'wave' ? 150 : 400;
    let frameId = 0;
    let last = 0;
    const loop = (now) => {
      if (now - last > interval) {
        last = now;
        draw(patternFrame(mode, now / 1000));
      }
      frameId = window.requestAnimationFrame(loop);
    };
    frameId = window.requestAnimationFrame(loop);
    return () => window.cancelAnimationFrame(frameId);
  }, [display, mode, reduceMotion, draw]);

  const label = useMemo(() => {
    if (mode === 'time') return `Flip-disk clock reading ${clock}`;
    if (mode === 'text') return `Flip-disk display spelling ${text || 'nothing'}`;
    if (mode === 'wave') return 'Flip-disk display showing a rolling wave pattern';
    return 'Flip-disk display showing a random speckle pattern';
  }, [mode, clock, text]);

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div
        className="flex items-center gap-1.5 rounded-lg border border-neutral-300 bg-neutral-200/70 p-1 dark:border-neutral-800 dark:bg-neutral-900"
        role="group"
        aria-label="Display mode"
      >
        {MODES.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setMode(option)}
            aria-pressed={mode === option}
            className={`min-h-[2.25rem] rounded-md px-3 py-1.5 font-mono text-xs uppercase transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)] ${
              mode === option
                ? 'bg-white font-semibold text-neutral-900 shadow-sm dark:bg-[#E5FD52] dark:text-black'
                : 'text-neutral-700 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {mode === 'text' ? (
        <div className="flex flex-col items-center gap-1.5">
          <label htmlFor="flip-disk-text" className="sr-only">
            Text to show on the display, up to four characters
          </label>
          <input
            id="flip-disk-text"
            type="text"
            value={text}
            maxLength={4}
            onChange={(event) => setText(event.target.value.toUpperCase().replace(/[^A-Z0-9: ]/g, ''))}
            placeholder="TYPE (MAX 4)"
            className="rounded-lg border border-neutral-400 bg-white px-4 py-2 text-center font-mono text-sm uppercase tracking-[0.3em] text-neutral-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--focus-ring)] dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          />
          <span className="font-mono text-[10px] tracking-wider text-neutral-600 dark:text-neutral-400">
            ONLY A–Z, 0–9, COLON &amp; SPACE
          </span>
        </div>
      ) : null}

      <div className="relative w-full max-w-4xl rounded-2xl border border-neutral-200 bg-white p-2 shadow-xl md:p-6 dark:border-neutral-800 dark:bg-[#0f0f0f] dark:shadow-[inset_0_4px_20px_rgba(0,0,0,0.8),_0_20px_40px_rgba(0,0,0,0.5)]">
        {/* Inner screen bezel */}
        <div className="relative rounded-lg bg-neutral-100 p-2 shadow-[inset_0_2px_8px_rgba(0,0,0,0.15)] md:p-4 dark:bg-black dark:shadow-[inset_0_2px_10px_rgba(0,0,0,1)]">
          <div
            role="img"
            aria-label={label}
            className="grid h-full w-full"
            style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`, gap: 'min(0.4vw, 3px)' }}
          >
            {bits.map((row, y) => row.map((on, x) => <Disk key={`${x}-${y}`} on={on} />))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlipDiskMatrix;
