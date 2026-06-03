import { useTranslations } from "next-intl";
import {
  Truck,
  Mountain,
  BatteryCharging,
  Disc3,
  Fuel,
  KeyRound,
  AlertTriangle,
  Car,
} from "lucide-react";
import type { ReactNode } from "react";

const items = [
  { key: "tow", icon: <Truck size={26} strokeWidth={1.75} /> },
  { key: "offroad", icon: <Mountain size={26} strokeWidth={1.75} /> },
  { key: "battery", icon: <BatteryCharging size={26} strokeWidth={1.75} /> },
  { key: "tire", icon: <Disc3 size={26} strokeWidth={1.75} /> },
  { key: "fuel", icon: <Fuel size={26} strokeWidth={1.75} /> },
  { key: "lockout", icon: <KeyRound size={26} strokeWidth={1.75} /> },
  { key: "accident", icon: <AlertTriangle size={26} strokeWidth={1.75} /> },
  { key: "heavy", icon: <Car size={26} strokeWidth={1.75} /> },
] as const;

export function Services() {
  const t = useTranslations("services");

  return (
    <section
      id="hizmetler"
      className="relative py-20 sm:py-28 border-t border-ink-800/50"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="kicker">{t("kicker")}</span>
          <h2 className="section-title mt-4">{t("title")}</h2>
          <p className="section-subtitle">{t("subtitle")}</p>
        </div>

        <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {items.map(({ key, icon }) => (
            <ServiceCard
              key={key}
              icon={icon}
              title={t(`items.${key}.title`)}
              description={t(`items.${key}.description`)}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

function ServiceCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <li className="surface-card group relative overflow-hidden rounded-xl p-6 transition-all duration-200 hover:-translate-y-1 hover:border-brand-500/40">
      {/* Hover accent glow */}
      <div
        className="absolute inset-x-0 top-0 h-px opacity-0 transition-opacity group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(163,230,53,0.7), transparent)",
        }}
        aria-hidden="true"
      />
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400 ring-1 ring-brand-500/20">
        {icon}
      </div>
      <h3 className="mt-4 font-display text-lg font-bold text-ink-50 leading-snug">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-400">{description}</p>
    </li>
  );
}
