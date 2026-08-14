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
// Bento cards top out around 290px wide, so 640px still covers a 2x display.
// These were built at 1100px, which put ~3.5 MB of thumbnails on the gallery
// tab for images never drawn above a quarter of that.
const THUMB = { suffix: 'thumb', width: 640, quality: 72 };

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

// Project screenshots live directly in public/assets and are rendered in a
// ~390px-wide 16:9 card, so anything past 1200px is wasted bytes. PNG
// screenshots are re-encoded as JPEG, which is where the real saving is
// (weatherapp.png was 1.5 MB before this).
const SCREENSHOT_MAX_WIDTH = 1200;
const SCREENSHOT_QUALITY = 80;
const assetsDir = join(root, 'public', 'assets');
// Not screenshots: the hero portrait and the link-preview card are sized on purpose.
const skipAssets = new Set(['og-image.png', 'peter-portrait.jpg']);

const optimizeScreenshots = () => {
  let changed = 0;
  const files = readdirSync(assetsDir).filter(
    (f) => exts.has(extname(f).toLowerCase()) && !skipAssets.has(f)
  );

  for (const file of files) {
    const srcPath = join(assetsDir, file);
    const width = pixelWidth(srcPath);
    const isPng = extname(file).toLowerCase() === '.png';
    if (!width) continue;
    if (width <= SCREENSHOT_MAX_WIDTH && !isPng) continue;

    const outPath = isPng
      ? join(assetsDir, `${basename(file, extname(file))}.jpg`)
      : srcPath;

    sips([
      '-s', 'format', 'jpeg',
      '-s', 'formatOptions', String(SCREENSHOT_QUALITY),
      '--resampleWidth', String(Math.min(SCREENSHOT_MAX_WIDTH, width)),
      srcPath,
      '--out', outPath,
    ]);
    console.log(`✓ ${basename(outPath)} (${Math.min(SCREENSHOT_MAX_WIDTH, width)}px)${isPng ? ' — converted from PNG' : ''}`);
    if (isPng) console.log(`  update the image path in src/components/Projects.jsx, then delete ${file}`);
    changed++;
  }
  return changed;
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

const screenshots = optimizeScreenshots();

console.log(`\nDone — ${built} gallery variants built, ${skipped} already up to date, ${screenshots} screenshots optimized.`);
