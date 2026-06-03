"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Phone, MessageCircle, Mail, Instagram } from "lucide-react";
import { Logo } from "./Logo";
import { LegalModal } from "./LegalModal";
import { business, telHref } from "@/lib/business";

export function Footer() {
  const t = useTranslations("footer");
  const navT = useTranslations("nav");
  const [open, setOpen] = useState<"kvkk" | "cookies" | null>(null);

  const year = 2026;

  return (
    <footer className="relative border-t border-ink-800/70 bg-ink-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-2">
            <Logo variant="lockup" />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-400">
              {t("tagline")}
            </p>
            <a
              href={telHref}
              className="mt-5 inline-flex items-center gap-2 font-display text-2xl font-extrabold text-brand-400 hover:text-brand-300 transition"
              data-cta="footer-phone"
            >
              <Phone size={20} strokeWidth={2.5} />
              {business.phone.display}
            </a>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-400">
              {t("quickLinks")}
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href="#hizmetler" className="text-ink-200 hover:text-brand-400 transition">
                  {navT("services")}
                </a>
              </li>
              <li>
                <a href="#galeri" className="text-ink-200 hover:text-brand-400 transition">
                  {navT("gallery")}
                </a>
              </li>
              <li>
                <a href="#bolge" className="text-ink-200 hover:text-brand-400 transition">
                  {navT("area")}
                </a>
              </li>
              <li>
                <a href="#hakkimizda" className="text-ink-200 hover:text-brand-400 transition">
                  {navT("about")}
                </a>
              </li>
              <li>
                <a href="#iletisim" className="text-ink-200 hover:text-brand-400 transition">
                  {navT("contact")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-400">
              {t("contact")}
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${business.email}`}
                  className="inline-flex items-center gap-2 text-ink-200 hover:text-brand-400 transition"
                >
                  <Mail size={14} />
                  {business.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${business.whatsapp.raw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-ink-200 hover:text-brand-400 transition"
                >
                  <MessageCircle size={14} />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={business.social.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-ink-200 hover:text-brand-400 transition"
                >
                  <Instagram size={14} />
                  {business.social.instagram.handle}
                </a>
              </li>
            </ul>
            <h4 className="mt-6 text-xs font-bold uppercase tracking-wider text-ink-400">
              {t("legal")}
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => setOpen("kvkk")}
                  className="text-ink-300 hover:text-brand-400 transition underline-offset-4 hover:underline"
                >
                  {t("kvkk")}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setOpen("cookies")}
                  className="text-ink-300 hover:text-brand-400 transition underline-offset-4 hover:underline"
                >
                  {t("cookies")}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-ink-800/70 pt-6 text-xs text-ink-500">
          <p>
            © {year} {business.legalName}. {t("rights")}
          </p>
        </div>
      </div>

      <LegalModal
        kind={open}
        onClose={() => setOpen(null)}
      />
    </footer>
  );
}
