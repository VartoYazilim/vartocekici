"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("language");

  const switchTo = (next: string) => {
    // pathname already starts with "/", might or might not include the locale.
    // Strip leading /<locale> if present, then prepend the new one (or none for default).
    let stripped = pathname;
    for (const loc of routing.locales) {
      if (pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)) {
        stripped = pathname.replace(new RegExp(`^/${loc}`), "") || "/";
        break;
      }
    }
    const target =
      next === routing.defaultLocale
        ? stripped
        : `/${next}${stripped === "/" ? "" : stripped}`;
    router.push(target);
    router.refresh();
  };

  return (
    <div
      role="group"
      aria-label={t("label")}
      className={`inline-flex items-center rounded-full border border-ink-700/60 bg-ink-900/60 p-0.5 ${
        compact ? "text-[11px]" : "text-xs"
      } font-bold backdrop-blur`}
    >
      {routing.locales.map((loc) => {
        const active = loc === locale;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => !active && switchTo(loc)}
            aria-pressed={active}
            className={`rounded-full px-2.5 py-1 uppercase tracking-wider transition ${
              active
                ? "bg-brand-500 text-ink-950"
                : "text-ink-300 hover:text-ink-50"
            }`}
          >
            {loc}
          </button>
        );
      })}
    </div>
  );
}
