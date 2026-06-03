import Image from "next/image";
import { useTranslations } from "next-intl";
import { Phone, MessageCircle } from "lucide-react";
import { business, telHref, whatsappHref } from "@/lib/business";

export function Hero({ locale }: { locale: "tr" | "en" }) {
  const t = useTranslations("hero");
  const altText =
    locale === "tr"
      ? "Varto Çekici — şehir dışı çekme, karayolu"
      : "Varto Çekici — intercity towing on the highway";

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-32"
    >
      {/* Background grid */}
      <div className="absolute inset-0 -z-10 bg-grid" aria-hidden="true" />
      {/* Radial glow */}
      <div
        className="absolute left-1/2 top-0 -z-10 h-[600px] w-[1200px] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(163,230,53,0.18) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          {/* LEFT: text + CTA */}
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-ink-50">
              {t("title")}
            </h1>

            <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-ink-300">
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

          {/* RIGHT: real photo (intercity towing) */}
          <div className="relative w-full lg:w-[460px] xl:w-[520px] shrink-0">
            <div className="relative overflow-hidden rounded-2xl border border-ink-800 shadow-2xl aspect-[4/3]">
              <Image
                src="/galeri/01-karayolu-otomobil.jpg"
                alt={altText}
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 520px"
                className="object-cover"
              />
              {/* Carbon overlay for brand cohesion + text readability if overlaid later */}
              <div
                className="absolute inset-0 mix-blend-multiply"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(15,17,21,0.15) 0%, rgba(15,17,21,0.55) 100%)",
                }}
                aria-hidden="true"
              />
              {/* Lime accent wash, top-left */}
              <div
                className="absolute inset-0 opacity-25 mix-blend-overlay"
                style={{
                  background:
                    "radial-gradient(ellipse at top left, #A3E635 0%, transparent 55%)",
                }}
                aria-hidden="true"
              />
              {/* Hi-vis diagonal stripe accent (bottom right corner) */}
              <div
                className="absolute -bottom-4 -right-4 h-16 w-40 opacity-90"
                style={{
                  background:
                    "repeating-linear-gradient(135deg, #A3E635 0 14px, #0F1115 14px 28px)",
                  transform: "rotate(-6deg)",
                }}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
