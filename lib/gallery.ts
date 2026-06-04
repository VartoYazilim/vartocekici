// Server-only — `node:fs` import below makes this module impossible to bundle
// for the client, which is the desired safety. Do NOT import from "use client"
// files; use it only in server components like components/Gallery.tsx.

import fs from "node:fs";
import path from "node:path";

const GALERI_DIR = path.join(process.cwd(), "public", "galeri");
const IMAGE_EXTS = [".jpg", ".jpeg", ".png", ".webp", ".avif"];

/**
 * Scan public/galeri/ for image files. Returns sorted public URLs.
 * If the folder doesn't exist or is empty, returns [].
 */
function detectLocalGallery(): string[] {
  try {
    if (!fs.existsSync(GALERI_DIR)) return [];
    return fs
      .readdirSync(GALERI_DIR)
      .filter((f) => IMAGE_EXTS.includes(path.extname(f).toLowerCase()))
      .sort((a, b) => a.localeCompare(b, "en", { numeric: true }))
      .map((f) => `/galeri/${encodeURIComponent(f)}`);
  } catch {
    return [];
  }
}

/** Picsum placeholders shown when no real photos are present yet. */
const PLACEHOLDERS = Array.from(
  { length: 6 },
  (_, i) => `https://picsum.photos/seed/varto-cekici-${i + 1}/1200/900`,
);

export type GalleryImage = {
  src: string;
  width: number;
  height: number;
  isPlaceholder: boolean;
};

const localImages = detectLocalGallery();
const sources = localImages.length > 0 ? localImages : PLACEHOLDERS;
const usingPlaceholders = localImages.length === 0;

export const galleryImages: GalleryImage[] = sources.map((src) => ({
  src,
  width: 1200,
  height: 900,
  isPlaceholder: usingPlaceholders,
}));

export const isUsingPlaceholders = usingPlaceholders;

/**
 * Image sources for the hero background slideshow.
 * Uses up to the first 4 gallery images (kept small for bandwidth/LCP).
 * Add/remove photos in public/galeri/ and this updates automatically.
 */
export const heroBackgroundSrcs: string[] = galleryImages
  .slice(0, 4)
  .map((img) => img.src);
