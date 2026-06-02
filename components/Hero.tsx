import { useTranslations } from "next-intl";
import { Phone, MessageCircle, Clock, Zap, MapPin } from "lucide-react";
import { business, telHref, whatsappHref } from "@/lib/business";

export function Hero({ locale }: { locale: "tr" | "en" }) {
  const t = useTranslations("hero");

  return (
    <section id="top" className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-32">
      {/* Background grid */}
      <div className="absolute inset-0 -z-10 bg-grid" aria-hidden="true" />
      {/* Radial glow */}
      <div
        className="absolute left-1/2 top-0 -z-10 h-[600px] w-[1200px] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(245,158,11,0.18) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            {/* Status badge with live pulse */}
            <span className="inline-flex items-center gap-2.5 rounded-full border border-brand-500/30 bg-brand-500/10 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-brand-300">
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-70 animate-ping-soft" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-400 animate-pulse-soft" />
              </span>
              {t("badge")}
            </span>

            <h1 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-ink-50">
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

            <dl className="mt-10 grid grid-cols-3 gap-4 sm:gap-8 max-w-md">
              <StatItem
                icon={<Clock size={18} className="text-brand-400" />}
                label={t("stats.availability")}
                value="7/24"
              />
              <StatItem
                icon={<Zap size={18} className="text-brand-400" />}
                label={t("stats.response")}
                value="⚡"
                isSymbol
              />
              <StatItem
                icon={<MapPin size={18} className="text-brand-400" />}
                label={t("stats.coverage")}
                value="Muş+"
              />
            </dl>
          </div>

          {/* Decorative visual — stylized recovery scene */}
          <div className="relative hidden lg:block w-[420px] xl:w-[480px] shrink-0">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatItem({
  icon,
  label,
  value,
  isSymbol = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  isSymbol?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1.5">{icon}</div>
      <dt className="text-xs sm:text-sm text-ink-400">{label}</dt>
      <dd
        className={`font-display font-extrabold text-ink-50 ${
          isSymbol ? "text-2xl" : "text-xl sm:text-2xl"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}

function HeroVisual() {
  return (
    <svg
      viewBox="0 0 480 480"
      className="w-full h-auto drop-shadow-2xl"
      role="img"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="heroVisualBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        <linearGradient id="heroVisualAccent" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <radialGradient id="heroVisualGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background ring */}
      <circle cx="240" cy="240" r="220" fill="url(#heroVisualGlow)" />
      <circle
        cx="240"
        cy="240"
        r="180"
        fill="none"
        stroke="#1E293B"
        strokeWidth="1"
        strokeDasharray="2 6"
      />
      <circle
        cx="240"
        cy="240"
        r="140"
        fill="url(#heroVisualBg)"
        stroke="#334155"
        strokeWidth="1"
      />

      {/* Center mark */}
      <g transform="translate(168 168) scale(1.875)">
        <path
          d="M20 4 L44 4 L60 20 L60 44 L44 60 L20 60 L4 44 L4 20 Z"
          fill="url(#heroVisualAccent)"
          stroke="#0B1220"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <g
          fill="none"
          stroke="#0B1220"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 20 L32 42 L48 20" />
          <path d="M32 42 Q32 50 38 50 Q44 50 44 46" />
        </g>
      </g>

      {/* Orbital tags */}
      <g>
        <OrbitalTag cx={240} cy={60} label="VARTO" />
        <OrbitalTag cx={420} cy={240} label="HINIS" />
        <OrbitalTag cx={240} cy={420} label="MUŞ" />
        <OrbitalTag cx={60} cy={240} label="D300" />
      </g>

      {/* Pulse ring */}
      <circle
        cx="240"
        cy="240"
        r="200"
        fill="none"
        stroke="#F59E0B"
        strokeWidth="2"
        opacity="0.25"
      >
        <animate
          attributeName="r"
          values="200;230;200"
          dur="3s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.4;0;0.4"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}

function OrbitalTag({ cx, cy, label }: { cx: number; cy: number; label: string }) {
  const textW = label.length * 9 + 20;
  return (
    <g>
      <rect
        x={cx - textW / 2}
        y={cy - 14}
        width={textW}
        height={28}
        rx={14}
        fill="#0F172A"
        stroke="#334155"
        strokeWidth="1"
      />
      <text
        x={cx}
        y={cy + 5}
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill="#FBBF24"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        letterSpacing="1"
      >
        {label}
      </text>
    </g>
  );
}
