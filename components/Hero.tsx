import { useTranslations } from "next-intl";
import { Phone, MessageCircle } from "lucide-react";
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
            "radial-gradient(ellipse at center, rgba(163,230,53,0.18) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            {/* Status badge with live pulse */}
            <span className="inline-flex items-center gap-2.5 rounded-full border border-brand-500/40 bg-brand-500/10 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-brand-300 font-mono uppercase tracking-wider">
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

          </div>

          {/* Decorative visual */}
          <div className="relative hidden lg:block w-[420px] xl:w-[480px] shrink-0">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
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
          <stop offset="0%" stopColor="#27272A" />
          <stop offset="100%" stopColor="#18181B" />
        </linearGradient>
        <radialGradient id="heroVisualGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#A3E635" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#A3E635" stopOpacity="0" />
        </radialGradient>
        <pattern id="heroVisualGrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0 L0 0 0 20" fill="none" stroke="#27272A" strokeWidth="0.5" opacity="0.6"/>
        </pattern>
      </defs>

      {/* Outer glow */}
      <circle cx="240" cy="240" r="220" fill="url(#heroVisualGlow)" />

      {/* Dashed outer ring */}
      <circle
        cx="240"
        cy="240"
        r="180"
        fill="none"
        stroke="#3F3F46"
        strokeWidth="1"
        strokeDasharray="2 6"
      />

      {/* Inner badge */}
      <circle
        cx="240"
        cy="240"
        r="140"
        fill="url(#heroVisualBg)"
        stroke="#3F3F46"
        strokeWidth="1"
      />
      <circle
        cx="240"
        cy="240"
        r="140"
        fill="url(#heroVisualGrid)"
        opacity="0.5"
      />

      {/* "7/24" numeric mark at center */}
      <g>
        <text
          x="172"
          y="266"
          fontFamily="'Arial Black', 'Helvetica Neue', sans-serif"
          fontSize="98"
          fontWeight="900"
          fill="#A3E635"
          letterSpacing="-4"
        >
          7
        </text>
        <line
          x1="216"
          y1="284"
          x2="244"
          y2="186"
          stroke="#A3E635"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <text
          x="236"
          y="266"
          fontFamily="'Arial Black', 'Helvetica Neue', sans-serif"
          fontSize="98"
          fontWeight="900"
          fill="#A3E635"
          letterSpacing="-4"
        >
          24
        </text>
        <text
          x="240"
          y="306"
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontSize="11"
          fontWeight="800"
          fill="#FAFAFA"
          letterSpacing="3.5"
        >
          VARTO ÇEKİCİ
        </text>
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
        stroke="#A3E635"
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
        fill="#18181B"
        stroke="#3F3F46"
        strokeWidth="1"
      />
      <text
        x={cx}
        y={cy + 5}
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill="#BEF264"
        fontFamily="ui-monospace, monospace"
        letterSpacing="1.5"
      >
        {label}
      </text>
    </g>
  );
}
