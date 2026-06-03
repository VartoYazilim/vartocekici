"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";

type Kind = "kvkk" | "cookies" | null;

type Section = { heading: string; text: string };

export function LegalModal({
  kind,
  onClose,
}: {
  kind: Kind;
  onClose: () => void;
}) {
  const t = useTranslations("legal");
  const dialogRef = useRef<HTMLDivElement>(null);
  const open = kind !== null;

  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Keep focus inside the dialog (Tab / Shift+Tab wrap) + Escape closes.
  // This is a real focus-trap, not just initial focus — required for WCAG 2.1.
  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;

    const getFocusables = (): HTMLElement[] => {
      if (!dialog) return [];
      return Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter(
        (el) =>
          !el.hasAttribute("disabled") &&
          el.getAttribute("aria-hidden") !== "true" &&
          el.offsetParent !== null,
      );
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = getFocusables();
      if (focusables.length === 0) {
        e.preventDefault();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey) {
        if (active === first || !dialog?.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last || !dialog?.contains(active)) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Initial focus on the close button when opening; remember the previously
  // focused element so we can restore focus after closing.
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    requestAnimationFrame(() => {
      dialogRef.current
        ?.querySelector<HTMLButtonElement>("[data-autofocus]")
        ?.focus();
    });
    return () => {
      previouslyFocused?.focus?.();
    };
  }, [open, kind]);

  if (!open || !kind) return null;

  const title = t(`${kind}.title`);
  const lastUpdated = t(`${kind}.lastUpdated`);
  const body = t.raw(`${kind}.body`) as Section[];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label={t("close")}
        onClick={onClose}
        className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm"
      />

      <div
        ref={dialogRef}
        className="relative z-10 flex max-h-[92vh] w-full sm:max-w-2xl flex-col overflow-hidden rounded-t-2xl sm:rounded-2xl border border-ink-800 bg-ink-900 shadow-2xl"
      >
        <header className="flex items-start justify-between gap-4 border-b border-ink-800 p-5 sm:p-6">
          <div>
            <h2
              id="legal-modal-title"
              className="font-display text-xl sm:text-2xl font-extrabold text-ink-50"
            >
              {title}
            </h2>
            <p className="mt-1 text-xs text-ink-400">{lastUpdated}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            data-autofocus
            aria-label={t("close")}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-ink-800 text-ink-300 hover:bg-ink-800 hover:text-ink-50 transition"
          >
            <X size={18} />
          </button>
        </header>

        <div className="overflow-y-auto p-5 sm:p-6 space-y-5 text-sm leading-relaxed text-ink-200">
          {body.map((section, i) => (
            <section key={i}>
              <h3 className="font-display text-base font-bold text-brand-400">
                {section.heading}
              </h3>
              <p className="mt-1.5 text-ink-300">{section.text}</p>
            </section>
          ))}
        </div>

        <footer className="border-t border-ink-800 p-4 sm:p-5 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-secondary"
          >
            {t("close")}
          </button>
        </footer>
      </div>
    </div>
  );
}
