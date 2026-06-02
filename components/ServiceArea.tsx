import { useTranslations } from "next-intl";
import { MapPin, CircleCheck } from "lucide-react";
import { business, mapsEmbedSrc } from "@/lib/business";

export function ServiceArea() {
  const t = useTranslations("area");

  return (
    <section
      id="bolge"
      className="relative py-20 sm:py-28 border-t border-ink-800/50 bg-ink-900/40"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <span className="kicker">{t("kicker")}</span>
            <h2 className="section-title mt-4">{t("title")}</h2>
            <p className="section-subtitle">{t("subtitle")}</p>

            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {business.serviceAreas.map((area) => (
                <li
                  key={area}
                  className="flex items-center gap-2.5 rounded-lg border border-ink-800 bg-ink-900/60 px-3.5 py-2.5 text-sm font-medium text-ink-100"
                >
                  <CircleCheck size={16} className="text-brand-400 shrink-0" />
                  <span>{area}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-start gap-3 rounded-lg border border-brand-500/30 bg-brand-500/5 p-4">
              <MapPin
                size={18}
                className="text-brand-400 shrink-0 mt-0.5"
                strokeWidth={2}
              />
              <p className="text-sm leading-relaxed text-ink-200">
                {t("callout")}
              </p>
            </div>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-ink-800 bg-ink-900 shadow-2xl">
            <iframe
              title="Varto Çekici — Hizmet Bölgesi"
              src={mapsEmbedSrc()}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
              style={{ filter: "grayscale(0.2) contrast(1.05) brightness(0.95)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
