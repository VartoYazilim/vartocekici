"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Phone, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { business, telHref } from "@/lib/business";

const sections = ["services", "gallery", "area", "about", "contact"] as const;

export function Header({ locale }: { locale: "tr" | "en" }) {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const sectionIds: Record<(typeof sections)[number], string> = {
    services: "hizmetler",
    gallery: "galeri",
    area: "bolge",
    about: "hakkimizda",
    contact: "iletisim",
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-200 ${
        scrolled
          ? "bg-ink-950/85 backdrop-blur-xl border-b border-ink-800/60"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a
          href="#top"
          aria-label={business.name}
          className="flex items-center"
        >
          <Logo className="h-9" variant="horizontal" />
        </a>

        <nav
          className="hidden lg:flex items-center gap-1"
          aria-label={locale === "tr" ? "Ana menü" : "Main menu"}
        >
          {sections.map((s) => (
            <a
              key={s}
              href={`#${sectionIds[s]}`}
              className="rounded-md px-3 py-2 text-sm font-medium text-ink-200 transition hover:text-ink-50 hover:bg-ink-800/50"
            >
              {t(s)}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <LanguageSwitcher />
          <a href={telHref} className="btn btn-primary" data-cta="header-call">
            <Phone size={16} strokeWidth={2.5} />
            <span>{t("callNow")}</span>
          </a>
        </div>

        <button
          type="button"
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-ink-50 border border-ink-800 bg-ink-900/60 backdrop-blur"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? (locale === "tr" ? "Menüyü kapat" : "Close menu") : (locale === "tr" ? "Menüyü aç" : "Open menu")}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden absolute inset-x-0 top-full border-t border-ink-800 bg-ink-950/95 backdrop-blur-xl"
        >
          <nav className="flex flex-col p-4 gap-1" aria-label={locale === "tr" ? "Mobil menü" : "Mobile menu"}>
            {sections.map((s) => (
              <a
                key={s}
                href={`#${sectionIds[s]}`}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-base font-medium text-ink-100 transition hover:bg-ink-800/60"
              >
                {t(s)}
              </a>
            ))}
            <div className="flex items-center justify-between pt-3 mt-2 border-t border-ink-800">
              <LanguageSwitcher />
              <a
                href={telHref}
                onClick={() => setMenuOpen(false)}
                className="btn btn-primary"
                data-cta="mobile-menu-call"
              >
                <Phone size={16} strokeWidth={2.5} />
                <span>{t("callNow")}</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
