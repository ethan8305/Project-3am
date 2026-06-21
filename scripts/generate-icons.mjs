// Generates the PWA app icons in public/icons/ from an inline SVG.
// Run with `npm run icons`. Commit the resulting PNGs.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(here, "..", "public", "icons");

const BG = "#2b5160";
const MOON = "#c7dae3";

// `rounded` controls the corner radius. Maskable icons are full bleed (radius
// 0) so the platform can apply its own mask shape.
function svg({ rounded }) {
  const rx = rounded ? 96 : 0;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="${rx}" fill="${BG}"/>
  <circle cx="205" cy="175" r="66" fill="${MOON}"/>
  <circle cx="233" cy="158" r="56" fill="${BG}"/>
  <text x="256" y="360" font-family="Helvetica, Arial, sans-serif" font-size="146" font-weight="bold" fill="#ffffff" text-anchor="middle">3AM</text>
</svg>`;
}

const targets = [
  { file: "icon-192.png", size: 192, rounded: true },
  { file: "icon-512.png", size: 512, rounded: true },
  { file: "icon-512-maskable.png", size: 512, rounded: false },
  { file: "apple-touch-icon.png", size: 180, rounded: false },
];

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const target of targets) {
    await sharp(Buffer.from(svg({ rounded: target.rounded })))
      .resize(target.size, target.size)
      .png()
      .toFile(path.join(OUT_DIR, target.file));
    console.log("wrote", target.file);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
