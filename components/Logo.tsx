type LogoProps = {
  className?: string;
  /** "lockup" (mark + wordmark stacked — default), "horizontal" (inline), "mark" (just 7/24) */
  variant?: "lockup" | "mark" | "horizontal";
  ariaLabel?: string;
};

/**
 * "7/24" mark using Anton font with a custom heavy diagonal slash.
 * Rendered with HTML inline-flex so width is determined by the actual text
 * metrics — no SVG viewBox clipping at small sizes.
 */
function NumericMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-baseline leading-none font-numeric ${className}`}
      style={{ letterSpacing: "-0.04em" }}
    >
      <span>7</span>
      {/* Custom heavy slash — visually consistent with the bold 7 and 24 */}
      <span
        aria-hidden="true"
        className="relative inline-block shrink-0"
        style={{ width: "0.30em", height: "0.92em", margin: "0 0.04em" }}
      >
        <svg
          viewBox="0 0 20 60"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <line
            x1="18"
            y1="6"
            x2="2"
            y2="54"
            stroke="currentColor"
            strokeWidth="7"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span>24</span>
    </span>
  );
}

export function Logo({
  className = "",
  variant = "lockup",
  ariaLabel = "Varto Çekici · 7/24 Yol Yardım",
}: LogoProps) {
  if (variant === "mark") {
    return (
      <span
        className={`inline-flex text-3xl text-brand-500 ${className}`}
        role="img"
        aria-label={ariaLabel}
      >
        <NumericMark />
      </span>
    );
  }

  if (variant === "horizontal") {
    return (
      <span
        className={`inline-flex items-center gap-3 ${className}`}
        role="img"
        aria-label={ariaLabel}
      >
        <NumericMark className="text-[28px] sm:text-[32px] text-brand-500" />
        <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-ink-100 whitespace-nowrap">
          Varto Çekici
        </span>
      </span>
    );
  }

  // lockup (default — vertical stack)
  return (
    <span
      className={`inline-flex flex-col items-start gap-1.5 ${className}`}
      role="img"
      aria-label={ariaLabel}
    >
      <NumericMark className="text-5xl text-brand-500" />
      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-ink-100 whitespace-nowrap">
        Varto Çekici
      </span>
    </span>
  );
}
