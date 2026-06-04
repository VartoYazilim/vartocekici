"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const INTERVAL_MS = 5000; // her fotoğraf bu kadar ekranda kalır
const FADE_MS = 1000; // crossfade süresi

/**
 * Hero background crossfade slideshow.
 *
 * Performance / a11y guarantees:
 * - First image renders immediately with `priority` → LCP element, no delay.
 * - Remaining images mount only AFTER hydration (useEffect), so the initial
 *   paint and LCP aren't blocked by extra downloads.
 * - `prefers-reduced-motion: reduce` → only the first image is shown, no
 *   interval, no fade.
 */
export function HeroBackground({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);
  const [extraMounted, setExtraMounted] = useState(false);

  useEffect(() => {
    if (images.length <= 1) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return; // tek foto sabit kalsın

    // Diğer fotoğrafları kısa gecikmeyle mount et — ilk paint LCP-only kalsın.
    // setTimeout (rAF değil) çünkü rAF, sekme/iframe görünür değilken fire etmez.
    const mountTimer = setTimeout(() => setExtraMounted(true), 100);
    const id = setInterval(() => {
      setActive((i) => (i + 1) % images.length);
    }, INTERVAL_MS);
    return () => {
      clearTimeout(mountTimer);
      clearInterval(id);
    };
  }, [images.length]);

  // İlk paint'te yalnızca LCP fotoğrafı; gerisi hidrasyon sonrası.
  const shown = extraMounted ? images : images.slice(0, 1);

  return (
    <div className="absolute inset-0 -z-30 overflow-hidden bg-ink-950">
      {shown.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={i === 0 ? alt : ""}
          fill
          priority={i === 0}
          sizes="100vw"
          className="object-cover object-center transition-opacity ease-in-out motion-reduce:transition-none"
          style={{
            opacity: i === active ? 1 : 0,
            transitionDuration: `${FADE_MS}ms`,
          }}
        />
      ))}
    </div>
  );
}
