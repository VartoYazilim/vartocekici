import { useTranslations } from "next-intl";
import { Phone, MessageCircle } from "lucide-react";
import { business, telHref, whatsappHref } from "@/lib/business";
import { heroBackgroundSrcs } from "@/lib/gallery";
import { HeroBackground } from "./HeroBackground";

export function Hero({ locale }: { locale: "tr" | "en" }) {
  const t = useTranslations("hero");
  const bgAlt =
    locale === "tr"
      ? "Varto Çekici — şehir dışı çekme"
      : "Varto Çekici — intercity towing";

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-36"
    >
      {/* Background photo slideshow (crossfade) */}
      <HeroBackground images={heroBackgroundSrcs} alt={bgAlt} />
      {/* Dark overlays — guarantee text legibility over the photo.
          Left→right (text side darker) + bottom→top (anchor copy) + flat base. */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          background:
            "linear-gradient(90deg, rgba(15,17,21,0.94) 0%, rgba(15,17,21,0.80) 45%, rgba(15,17,21,0.55) 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-20"
        style={{
          background:
            "linear-gradient(0deg, rgba(15,17,21,0.95) 0%, rgba(15,17,21,0.30) 55%, rgba(15,17,21,0.45) 100%)",
        }}
        aria-hidden="true"
      />
      {/* Subtle grid + lime glow on top of the darkened photo */}
      <div className="absolute inset-0 -z-10 bg-grid opacity-60" aria-hidden="true" />
      <div
        className="absolute left-1/2 top-0 -z-10 h-[600px] w-[1200px] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(163,230,53,0.12) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-ink-50 [text-shadow:0_2px_24px_rgba(0,0,0,0.5)]">
            {t("title")}
          </h1>

          <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-ink-200 [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
            {t("subtitle")}
          </p>

          <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
            <a
              href={telHref}
              className="btn btn-primary text-base px-6 py-3.5"
              data-cta="hero-call"
            >
              <Phone size={18} strokeWidth={2.5} />
              <span>{t("callCta")}</span>
              <span className="hidden sm:inline opacity-80">·</span>
              <span className="hidden sm:inline font-mono text-sm">
                {business.phone.display}
              </span>
            </a>
            <a
              href={whatsappHref(locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp text-base px-6 py-3.5"
              data-cta="hero-whatsapp"
            >
              <MessageCircle size={18} strokeWidth={2.5} />
              <span>{t("whatsappCta")}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
