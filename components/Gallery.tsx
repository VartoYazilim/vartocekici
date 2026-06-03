import Image from "next/image";
import { useTranslations } from "next-intl";
import { Info } from "lucide-react";
import { galleryImages, isUsingPlaceholders } from "@/lib/gallery";

export function Gallery() {
  const t = useTranslations("gallery");
  const captions = t.raw("items") as string[];

  return (
    <section
      id="galeri"
      className="relative py-20 sm:py-28 border-t border-ink-800/50"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 max-w-5xl">
          <div>
            <span className="kicker">{t("kicker")}</span>
            <h2 className="section-title mt-4">{t("title")}</h2>
            <p className="section-subtitle">{t("subtitle")}</p>
          </div>
          {isUsingPlaceholders && (
            <p className="inline-flex items-center gap-2 text-xs text-ink-500 sm:max-w-sm">
              <Info size={14} className="shrink-0" />
              <span>{t("note")}</span>
            </p>
          )}
        </div>

        <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {galleryImages.map((img, i) => (
            <li
              key={img.src}
              className="group relative overflow-hidden rounded-xl border border-ink-800 bg-ink-900 aspect-[4/3]"
            >
              <Image
                src={img.src}
                alt={captions[i] ?? `Varto Çekici — ${i + 1}`}
                width={img.width}
                height={img.height}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                placeholder="empty"
              />
              {/* Dark carbon overlay for brand cohesion */}
              <div
                className="absolute inset-0 mix-blend-multiply"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(15,17,21,0.25) 0%, rgba(15,17,21,0.85) 100%)",
                }}
                aria-hidden="true"
              />
              {/* Lime wash */}
              <div
                className="absolute inset-0 opacity-20 mix-blend-overlay"
                style={{
                  background:
                    "radial-gradient(ellipse at top left, #A3E635 0%, transparent 60%)",
                }}
                aria-hidden="true"
              />
              {/* Caption */}
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <div className="flex items-center gap-2">
                  <span className="h-1 w-6 rounded-full bg-brand-500" />
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-brand-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-1.5 font-display text-base sm:text-lg font-bold text-ink-50">
                  {captions[i] ?? ""}
                </h3>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
