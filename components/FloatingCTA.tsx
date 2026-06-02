"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Phone, MessageCircle } from "lucide-react";
import { telHref, whatsappHref } from "@/lib/business";

export function FloatingCTA({ locale }: { locale: "tr" | "en" }) {
  const t = useTranslations("floatingCta");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 360);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 pb-[env(safe-area-inset-bottom)] lg:hidden transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
      aria-hidden={!visible}
    >
      <div className="mx-3 mb-3 grid grid-cols-2 gap-2 rounded-2xl border border-ink-800 bg-ink-950/95 p-2 backdrop-blur-xl shadow-2xl">
        <a
          href={telHref}
          className="btn btn-primary py-3 text-sm"
          data-cta="floating-call"
        >
          <Phone size={16} strokeWidth={2.5} />
          {t("call")}
        </a>
        <a
          href={whatsappHref(locale)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-whatsapp py-3 text-sm"
          data-cta="floating-whatsapp"
        >
          <MessageCircle size={16} strokeWidth={2.5} />
          {t("whatsapp")}
        </a>
      </div>
    </div>
  );
}
