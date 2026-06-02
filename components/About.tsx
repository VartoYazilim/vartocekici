import { useTranslations } from "next-intl";
import { MapPinned, Timer, HandCoins, CloudSnow } from "lucide-react";
import type { ReactNode } from "react";

const items = [
  { key: "local", icon: <MapPinned size={22} strokeWidth={1.75} /> },
  { key: "fast", icon: <Timer size={22} strokeWidth={1.75} /> },
  { key: "honest", icon: <HandCoins size={22} strokeWidth={1.75} /> },
  { key: "ready", icon: <CloudSnow size={22} strokeWidth={1.75} /> },
] as const;

export function About() {
  const t = useTranslations("about");

  return (
    <section
      id="hakkimizda"
      className="relative py-20 sm:py-28 border-t border-ink-800/50"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="kicker">{t("kicker")}</span>
          <h2 className="section-title mt-4">{t("title")}</h2>
          <p className="section-subtitle">{t("subtitle")}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map(({ key, icon }) => (
            <AboutCard
              key={key}
              icon={icon}
              title={t(`items.${key}.title`)}
              description={t(`items.${key}.description`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="relative rounded-xl border border-ink-800 bg-gradient-to-b from-ink-900/80 to-ink-950 p-6">
      <div className="absolute -top-3 left-6 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500 text-ink-950 shadow-[0_8px_24px_-8px_rgba(245,158,11,0.6)]">
        {icon}
      </div>
      <h3 className="mt-6 font-display text-lg font-bold text-ink-50 leading-snug">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-400">{description}</p>
    </div>
  );
}
