"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname(); // locale-stripped path from next-intl
  const t = useTranslations("language");
  const [isPending, startTransition] = useTransition();

  const switchTo = (next: (typeof routing.locales)[number]) => {
    if (next === locale) return;
    startTransition(() => {
      // next-intl's router accepts {locale} — it builds the right URL and
      // sets the NEXT_LOCALE cookie so subsequent navigations stay in sync.
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div
      role="group"
      aria-label={t("label")}
      className={`inline-flex items-center rounded-full border border-ink-700/60 bg-ink-900/60 p-0.5 ${
        compact ? "text-[11px]" : "text-xs"
      } font-bold backdrop-blur ${isPending ? "opacity-60" : ""}`}
    >
      {routing.locales.map((loc) => {
        const active = loc === locale;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => switchTo(loc)}
            aria-pressed={active}
            disabled={isPending}
            className={`rounded-full px-2.5 py-1 uppercase tracking-wider transition ${
              active
                ? "bg-brand-500 text-ink-950"
                : "text-ink-300 hover:text-ink-50"
            } disabled:cursor-not-allowed`}
          >
            {loc}
          </button>
        );
      })}
    </div>
  );
}
