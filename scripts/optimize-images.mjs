#!/usr/bin/env node
// Generates gallery-ready image variants in public/assets/opt/.
// Drop full-size photos in public/assets/gallery/ and run this. For each
// source image it produces:
//   <name>_full.jpg  – up to 2048px wide, quality 82 (modal view)
//   <name>_thumb.jpg – up to 1100px wide, quality 72 (grid view)
// Variants are never upscaled past the source width.
//
// After running, add an entry to `mediaItems` in src/components/Gallery.jsx
// referencing /assets/opt/<name>_full.jpg and /assets/opt/<name>_thumb.jpg.
//
// Usage:
//   npm run optimize-images          # only build missing variants
//   npm run optimize-images -- --force   # rebuild everything
//
// Uses macOS's built-in `sips`, so no extra dependencies are needed.
import { execFileSync } from 'node:child_process';
import { readdirSync, existsSync, mkdirSync } from 'node:fs';
import { join, extname, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = join(root, 'public', 'assets', 'gallery');
const optDir = join(root, 'public', 'assets', 'opt');

const FULL = { suffix: 'full', width: 2048, quality: 82 };
const THUMB = { suffix: 'thumb', width: 1100, quality: 72 };

const force = process.argv.includes('--force');
const exts = new Set(['.jpg', '.jpeg', '.png']);

if (!existsSync(srcDir)) {
  console.error(`No source folder at ${srcDir}. Put full-size gallery photos there first.`);
  process.exit(1);
}
if (!existsSync(optDir)) mkdirSync(optDir, { recursive: true });

const sips = (args) => execFileSync('sips', args, { stdio: ['ignore', 'pipe', 'ignore'] }).toString();
const pixelWidth = (file) => {
  const out = sips(['-g', 'pixelWidth', file]);
  return parseInt(out.match(/pixelWidth:\s*(\d+)/)?.[1] ?? '0', 10);
};

const sources = readdirSync(srcDir).filter((f) => exts.has(extname(f).toLowerCase()));
let built = 0;
let skipped = 0;

for (const file of sources) {
  const name = basename(file, extname(file));
  const srcPath = join(srcDir, file);
  const srcWidth = pixelWidth(srcPath);
  if (!srcWidth) {
    console.warn(`! could not read ${file}, skipping`);
    continue;
  }

  for (const variant of [FULL, THUMB]) {
    const outName = `${name}_${variant.suffix}.jpg`;
    const outPath = join(optDir, outName);
    if (!force && existsSync(outPath)) {
      skipped++;
      continue;
    }
    const width = Math.min(variant.width, srcWidth);
    sips([
      '-s', 'format', 'jpeg',
      '-s', 'formatOptions', String(variant.quality),
      '--resampleWidth', String(width),
      srcPath,
      '--out', outPath,
    ]);
    console.log(`✓ ${outName} (${width}px)`);
    built++;
  }
}

console.log(`\nDone — ${built} built, ${skipped} already up to date.`);
