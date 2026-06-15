#!/usr/bin/env node
// Generates branded PWA icons: a gradient sphere on a black, full-bleed
// background (matching the hero on the site). Outputs:
//   public/logo512.png, public/logo192.png  – manifest / install icons
//   public/favicon.ico                       – PNG-wrapped 64px favicon
// Pure Node (zlib only), so no extra dependencies.
import { deflateSync } from 'node:zlib';
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const publicDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');

// ---- gradient sphere pixel rendering ----
const STOPS = [
  [0.0, [250, 250, 250]], // #fafafa
  [0.45, [163, 163, 163]], // #a3a3a3
  [1.0, [64, 64, 64]], // #404040
];

const lerp = (a, b, t) => a + (b - a) * t;

function gradientColor(t) {
  t = Math.max(0, Math.min(1, t));
  for (let i = 1; i < STOPS.length; i++) {
    const [p0, c0] = STOPS[i - 1];
    const [p1, c1] = STOPS[i];
    if (t <= p1) {
      const f = (t - p0) / (p1 - p0);
      return [lerp(c0[0], c1[0], f), lerp(c0[1], c1[1], f), lerp(c0[2], c1[2], f)];
    }
  }
  return STOPS[STOPS.length - 1][1];
}

function renderSphere(size) {
  const d = size * 0.64; // sphere diameter (leaves maskable safe margin)
  const r = d / 2;
  const cx = size / 2;
  const cy = size / 2;
  const fx = cx - r + d * 0.35; // highlight focal point (35% / 30%)
  const fy = cy - r + d * 0.3;
  const rgba = Buffer.alloc(size * size * 4);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const px = x + 0.5;
      const py = y + 0.5;
      const distCenter = Math.hypot(px - cx, py - cy);
      // anti-aliased coverage at the sphere edge
      const coverage = Math.max(0, Math.min(1, r - distCenter + 0.5));
      let R = 0;
      let G = 0;
      let B = 0;
      if (coverage > 0) {
        const t = Math.hypot(px - fx, py - fy) / (r * 1.05);
        [R, G, B] = gradientColor(t);
      }
      const i = (y * size + x) * 4;
      rgba[i] = Math.round(R * coverage); // over black background
      rgba[i + 1] = Math.round(G * coverage);
      rgba[i + 2] = Math.round(B * coverage);
      rgba[i + 3] = 255; // opaque (black where outside the sphere)
    }
  }
  return rgba;
}

// ---- minimal PNG encoder (8-bit RGBA) ----
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function encodePng(size, rgba) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  // 10,11,12 = compression/filter/interlace = 0
  const stride = size * 4;
  const raw = Buffer.alloc((stride + 1) * size);
  for (let y = 0; y < size; y++) {
    raw[y * (stride + 1)] = 0; // filter type 0
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, y * stride + stride);
  }
  const idat = deflateSync(raw, { level: 9 });
  return Buffer.concat([sig, chunk('IHDR', ihdr), chunk('IDAT', idat), chunk('IEND', Buffer.alloc(0))]);
}

// ---- PNG-wrapped ICO ----
function encodeIco(size, pngBuf) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // image count
  const entry = Buffer.alloc(16);
  entry[0] = size >= 256 ? 0 : size; // width
  entry[1] = size >= 256 ? 0 : size; // height
  entry[2] = 0; // palette
  entry[3] = 0; // reserved
  entry.writeUInt16LE(1, 4); // color planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(pngBuf.length, 8); // data size
  entry.writeUInt32LE(6 + 16, 12); // data offset
  return Buffer.concat([header, entry, pngBuf]);
}

for (const size of [512, 192]) {
  const png = encodePng(size, renderSphere(size));
  writeFileSync(join(publicDir, `logo${size}.png`), png);
  console.log(`✓ logo${size}.png`);
}

const fav = encodePng(64, renderSphere(64));
writeFileSync(join(publicDir, 'favicon.ico'), encodeIco(64, fav));
console.log('✓ favicon.ico');
