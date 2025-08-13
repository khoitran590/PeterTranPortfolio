// src/components/Settings.jsx
import React, { useEffect, useMemo, useState } from 'react';

const palettes = [
  {
    id: 'blue',
    label: 'Blue',
    srgb: {
      a1: '#38bdf8', a2: '#2563eb', a3: '#4f46e5', strong: '#2563eb', soft: 'rgba(37,99,235,0.12)'
    },
    p3: {
      a1: 'color(display-p3 0.29 0.72 0.98)',
      a2: 'color(display-p3 0.15 0.39 0.93)',
      a3: 'color(display-p3 0.31 0.27 0.88)',
      strong: 'color(display-p3 0.15 0.39 0.93)',
      soft: 'color(display-p3 0.15 0.39 0.93 / 0.12)'
    }
  },
  {
    id: 'emerald',
    label: 'Emerald',
    srgb: {
      a1: '#34d399', a2: '#10b981', a3: '#059669', strong: '#10b981', soft: 'rgba(16,185,129,0.12)'
    },
    p3: {
      a1: 'color(display-p3 0.30 0.79 0.56)',
      a2: 'color(display-p3 0.17 0.73 0.51)',
      a3: 'color(display-p3 0.11 0.59 0.43)',
      strong: 'color(display-p3 0.17 0.73 0.51)',
      soft: 'color(display-p3 0.17 0.73 0.51 / 0.12)'
    }
  },
  {
    id: 'fuchsia',
    label: 'Fuchsia',
    srgb: {
      a1: '#e879f9', a2: '#d946ef', a3: '#c026d3', strong: '#d946ef', soft: 'rgba(217,70,239,0.12)'
    },
    p3: {
      a1: 'color(display-p3 0.90 0.48 0.97)',
      a2: 'color(display-p3 0.84 0.33 0.94)',
      a3: 'color(display-p3 0.76 0.22 0.83)',
      strong: 'color(display-p3 0.84 0.33 0.94)',
      soft: 'color(display-p3 0.84 0.33 0.94 / 0.12)'
    }
  },
  {
    id: 'amber',
    label: 'Amber',
    srgb: {
      a1: '#fbbf24', a2: '#f59e0b', a3: '#d97706', strong: '#f59e0b', soft: 'rgba(245,158,11,0.12)'
    },
    p3: {
      a1: 'color(display-p3 0.98 0.75 0.14)',
      a2: 'color(display-p3 0.96 0.62 0.09)',
      a3: 'color(display-p3 0.85 0.52 0.05)',
      strong: 'color(display-p3 0.96 0.62 0.09)',
      soft: 'color(display-p3 0.96 0.62 0.09 / 0.12)'
    }
  },
  {
    id: 'purple',
    label: 'Purple',
    srgb: {
      a1: '#a78bfa', a2: '#8b5cf6', a3: '#7c3aed', strong: '#8b5cf6', soft: 'rgba(139,92,246,0.12)'
    },
    p3: {
      a1: 'color(display-p3 0.67 0.55 0.98)',
      a2: 'color(display-p3 0.55 0.36 0.96)',
      a3: 'color(display-p3 0.49 0.23 0.92)',
      strong: 'color(display-p3 0.55 0.36 0.96)',
      soft: 'color(display-p3 0.55 0.36 0.96 / 0.12)'
    }
  }
];

function applyPalette(paletteId) {
  const palette = palettes.find(p => p.id === paletteId) || palettes[0];
  const root = document.documentElement;
  const supportsP3 = typeof CSS !== 'undefined' && CSS.supports && CSS.supports('color', 'color(display-p3 1 0 0)');
  const src = supportsP3 && palette.p3 ? palette.p3 : palette.srgb;
  root.style.setProperty('--accent-1', src.a1);
  root.style.setProperty('--accent-2', src.a2);
  root.style.setProperty('--accent-3', src.a3);
  root.style.setProperty('--accent-strong', src.strong);
  root.style.setProperty('--accent-soft', src.soft);
  // background tints per palette (light shades)
  const bgMap = {
    blue: { b1: '#f0f9ff', b2: '#eff6ff', b3: '#eef2ff', p3: ['color(display-p3 0.93 0.97 1)','color(display-p3 0.93 0.96 1)','color(display-p3 0.93 0.94 1)'] },
    emerald: { b1: '#ecfdf5', b2: '#d1fae5', b3: '#a7f3d0', p3: ['color(display-p3 0.93 0.98 0.96)','color(display-p3 0.85 0.96 0.90)','color(display-p3 0.76 0.95 0.82)'] },
    fuchsia: { b1: '#fdf4ff', b2: '#fae8ff', b3: '#f5d0fe', p3: ['color(display-p3 0.99 0.96 1.00)','color(display-p3 0.98 0.92 1.00)','color(display-p3 0.96 0.83 0.99)'] },
    amber: { b1: '#fffbeb', b2: '#fef3c7', b3: '#fde68a', p3: ['color(display-p3 1.00 0.98 0.92)','color(display-p3 0.99 0.95 0.78)','color(display-p3 0.99 0.90 0.60)'] },
    purple: { b1: '#faf5ff', b2: '#f3e8ff', b3: '#e9d5ff', p3: ['color(display-p3 0.98 0.96 1.00)','color(display-p3 0.95 0.91 1.00)','color(display-p3 0.91 0.84 1.00)'] },
  };
  const bg = bgMap[paletteId] || bgMap.blue;
  const [g1,g2,g3] = (supportsP3 && bg.p3) ? bg.p3 : [bg.b1,bg.b2,bg.b3];
  root.style.setProperty('--bg-1', g1);
  root.style.setProperty('--bg-2', g2);
  root.style.setProperty('--bg-3', g3);
}

const Settings = () => {
  const [current, setCurrent] = useState(() => localStorage.getItem('accentPalette') || 'blue');
  const isDark = useMemo(() => document.documentElement.classList.contains('dark'), []);

  useEffect(() => {
    // Apply on mount if not dark
    if (!isDark) applyPalette(current);
  }, [current, isDark]);

  const onChoose = (id) => {
    setCurrent(id);
    localStorage.setItem('accentPalette', id);
    if (!document.documentElement.classList.contains('dark')) {
      applyPalette(id);
    }
  };

  const reset = () => {
    onChoose('blue');
  };

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800">
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">Settings</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">Choose an accent color for light mode. Dark mode keeps its default palette.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {palettes.map((p) => (
            <button
              key={p.id}
              onClick={() => onChoose(p.id)}
              className={`text-left relative rounded-2xl p-4 border border-black/5 dark:border-white/10 bg-white/70 dark:bg-gray-800/50 supports-[backdrop-filter]:backdrop-blur-md shadow-sm hover:shadow-md motion-safe:transition-shadow ${current === p.id ? 'ring-2 ring-[color:var(--accent-strong)]' : ''}`}
            >
              <div className="h-10 w-full rounded-xl overflow-hidden" style={{ backgroundImage: `linear-gradient(to right, ${p.srgb.a1}, ${p.srgb.a2}, ${p.srgb.a3})` }} />
              <div className="mt-3 flex items-center justify-between">
                <span className="font-medium text-gray-900 dark:text-white">{p.label}</span>
                {current === p.id && <span className="text-xs px-2 py-1 rounded-full bg-[color:var(--accent-soft)] text-[color:var(--accent-strong)]">Selected</span>}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button onClick={reset} className="px-5 py-2.5 rounded-full text-sm border border-black/5 dark:border-white/10 bg-white/80 dark:bg-gray-800/60 text-gray-800 dark:text-gray-200 shadow-sm hover:shadow motion-safe:transition">Reset to Default</button>
        </div>

        <p className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">P3 color is used when supported by your display and browser.</p>
      </div>
    </section>
  );
};

export default Settings;
