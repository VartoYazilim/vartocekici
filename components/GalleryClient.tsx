"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Info, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryImage } from "@/lib/gallery";
import { GalleryLightbox } from "./GalleryLightbox";

const AUTO_MS = 3500;

export function GalleryClient({
  images,
  usingPlaceholders,
}: {
  images: GalleryImage[];
  usingPlaceholders: boolean;
}) {
  const t = useTranslations("gallery");
  const captions = t.raw("items") as string[];

  const scrollerRef = useRef<HTMLUListElement>(null);
  const currentRef = useRef(0);
  const pausedRef = useRef(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const scrollToIndex = useCallback((index: number) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const items =
      scroller.querySelectorAll<HTMLElement>("[data-slide]");
    const target = items[index];
    if (!target) return;
    scroller.scrollTo({
      left: target.offsetLeft - scroller.offsetLeft,
      behavior: "smooth",
    });
  }, []);

  const advance = useCallback(
    (dir: 1 | -1) => {
      const count = images.length;
      let next = currentRef.current + dir;
      if (next >= count) next = 0;
      if (next < 0) next = count - 1;
      currentRef.current = next;
      scrollToIndex(next);
    },
    [scrollToIndex, images.length],
  );

  // Auto-advance (right-to-left visually: scrolls forward through items)
  useEffect(() => {
    if (images.length <= 1) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;
    const id = setInterval(() => {
      if (pausedRef.current || lightboxIndex !== null) return;
      advance(1);
    }, AUTO_MS);
    return () => clearInterval(id);
  }, [advance, lightboxIndex, images.length]);

  // Track nearest slide on manual scroll/swipe
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const onScroll = () => {
      const items =
        scroller.querySelectorAll<HTMLElement>("[data-slide]");
      let closest = 0;
      let min = Infinity;
      items.forEach((it, i) => {
        const d = Math.abs(
          it.offsetLeft - scroller.offsetLeft - scroller.scrollLeft,
        );
        if (d < min) {
          min = d;
          closest = i;
        }
      });
      currentRef.current = closest;
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="galeri"
      className="relative py-20 sm:py-28 border-t border-ink-800/50"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 max-w-5xl">
          <div>
            <span className="kicker">{t("kicker")}</span>
            <h2 className="section-title mt-4">{t("title")}</h2>
            <p className="section-subtitle">{t("subtitle")}</p>
          </div>
          <div className="flex items-center gap-3">
            {usingPlaceholders && (
              <p className="inline-flex items-center gap-2 text-xs text-ink-500 sm:max-w-[14rem]">
                <Info size={14} className="shrink-0" />
                <span>{t("note")}</span>
              </p>
            )}
            {/* Desktop arrows */}
            {images.length > 1 && (
              <div className="hidden sm:flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => advance(-1)}
                  aria-label={t("prev")}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-700 bg-ink-900/60 text-ink-200 hover:bg-ink-800 hover:text-brand-400 transition"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => advance(1)}
                  aria-label={t("next")}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-700 bg-ink-900/60 text-ink-200 hover:bg-ink-800 hover:text-brand-400 transition"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Carousel */}
        <ul
          ref={scrollerRef}
          className="no-scrollbar mt-10 flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2"
          onPointerEnter={() => {
            pausedRef.current = true;
          }}
          onPointerLeave={() => {
            pausedRef.current = false;
          }}
          onTouchStart={() => {
            pausedRef.current = true;
          }}
        >
          {images.map((img, i) => (
            <li
              key={img.src}
              data-slide
              className="snap-start shrink-0 w-[82%] sm:w-[46%] lg:w-[31.5%]"
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(i)}
                aria-label={`${captions[i] ?? ""} — ${t("open")}`}
                className="group relative block w-full overflow-hidden rounded-xl border border-ink-800 bg-ink-900 aspect-[4/3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
              >
                <Image
                  src={img.src}
                  alt={captions[i] ?? `Varto Çekici — ${i + 1}`}
                  width={img.width}
                  height={img.height}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 82vw, (max-width: 1024px) 46vw, 31vw"
                  draggable={false}
                />
                {/* Dark overlay */}
                <div
                  className="absolute inset-0 mix-blend-multiply"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(15,17,21,0.2) 0%, rgba(15,17,21,0.8) 100%)",
                  }}
                  aria-hidden="true"
                />
                {/* Caption */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-left">
                  <div className="flex items-center gap-2">
                    <span className="h-1 w-6 rounded-full bg-brand-500" />
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-brand-300">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-1.5 font-display text-base sm:text-lg font-bold text-ink-50">
                    {captions[i] ?? ""}
                  </h3>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {lightboxIndex !== null && (
        <GalleryLightbox
          images={images}
          captions={captions}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
          closeLabel={t("close")}
          prevLabel={t("prev")}
          nextLabel={t("next")}
        />
      )}
    </section>
  );
}
