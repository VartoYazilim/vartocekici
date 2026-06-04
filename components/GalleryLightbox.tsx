"use client";

import Image from "next/image";
import { useEffect, useRef, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryImage } from "@/lib/gallery";

export function GalleryLightbox({
  images,
  captions,
  index,
  onClose,
  onNavigate,
  closeLabel,
  prevLabel,
  nextLabel,
}: {
  images: GalleryImage[];
  captions: string[];
  index: number;
  onClose: () => void;
  onNavigate: (next: number) => void;
  closeLabel: string;
  prevLabel: string;
  nextLabel: string;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const count = images.length;

  const goPrev = useCallback(
    () => onNavigate((index - 1 + count) % count),
    [index, count, onNavigate],
  );
  const goNext = useCallback(
    () => onNavigate((index + 1) % count),
    [index, count, onNavigate],
  );

  // Body scroll lock
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Keyboard: Esc closes, arrows navigate, Tab traps focus
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      } else if (e.key === "Tab") {
        const dialog = dialogRef.current;
        if (!dialog) return;
        const focusables = Array.from(
          dialog.querySelectorAll<HTMLElement>("button, a[href]"),
        ).filter((el) => el.offsetParent !== null);
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey && (active === first || !dialog.contains(active))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (active === last || !dialog.contains(active))) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, goPrev, goNext]);

  // Focus the close button on open; restore focus on close
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    requestAnimationFrame(() => {
      dialogRef.current
        ?.querySelector<HTMLButtonElement>("[data-autofocus]")
        ?.focus();
    });
    return () => previouslyFocused?.focus?.();
  }, []);

  const img = images[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={captions[index] ?? "Galeri"}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label={closeLabel}
        onClick={onClose}
        className="absolute inset-0 bg-ink-950/92 backdrop-blur-sm"
      />

      <div ref={dialogRef} className="relative z-10 w-full max-w-5xl">
        {/* Image */}
        <div className="relative mx-auto aspect-[4/3] w-full overflow-hidden rounded-xl border border-ink-800 bg-ink-900">
          <Image
            src={img.src}
            alt={captions[index] ?? ""}
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-contain"
            priority
          />
        </div>

        {/* Caption + counter */}
        <div className="mt-3 flex items-center justify-between gap-4">
          <p className="text-sm font-semibold text-ink-100">
            {captions[index]}
          </p>
          <span className="font-mono text-xs text-ink-400">
            {index + 1} / {count}
          </span>
        </div>

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          data-autofocus
          aria-label={closeLabel}
          className="absolute -top-3 -right-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-700 bg-ink-900 text-ink-100 shadow-lg hover:bg-ink-800 hover:text-brand-400 transition"
        >
          <X size={18} />
        </button>

        {/* Prev / Next */}
        {count > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label={prevLabel}
              className="absolute left-2 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink-700 bg-ink-950/70 text-ink-100 backdrop-blur hover:bg-ink-800 hover:text-brand-400 transition"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label={nextLabel}
              className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink-700 bg-ink-950/70 text-ink-100 backdrop-blur hover:bg-ink-800 hover:text-brand-400 transition"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
