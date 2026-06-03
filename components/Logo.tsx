type LogoProps = {
  className?: string;
  /** "lockup" (mark + wordmark — default), "mark" (just 7/24), "horizontal" (inline) */
  variant?: "lockup" | "mark" | "horizontal";
  ariaLabel?: string;
};

/**
 * Logo = "7/24" set in Anton (tall condensed) with the slash drawn as a tilted
 * line, and "VARTO ÇEKİCİ" set in JetBrains Mono with letter-spacing below.
 * The brand promise IS the mark.
 */
export function Logo({
  className = "h-10",
  variant = "lockup",
  ariaLabel = "Varto Çekici · 7/24 Yol Yardım",
}: LogoProps) {
  if (variant === "mark") {
    // Just the 7/24 — for tiny contexts. Square-ish.
    return (
      <svg
        viewBox="0 0 100 64"
        className={className}
        role="img"
        aria-label={ariaLabel}
        fill="none"
      >
        <text
          x="0"
          y="54"
          fontFamily="var(--font-anton), 'Arial Black', sans-serif"
          fontSize="62"
          fontWeight="400"
          fill="var(--color-brand-500, #A3E635)"
          letterSpacing="-1"
        >
          7
        </text>
        <line
          x1="36"
          y1="58"
          x2="50"
          y2="6"
          stroke="var(--color-brand-500, #A3E635)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <text
          x="50"
          y="54"
          fontFamily="var(--font-anton), 'Arial Black', sans-serif"
          fontSize="62"
          fontWeight="400"
          fill="var(--color-brand-500, #A3E635)"
          letterSpacing="-1"
        >
          24
        </text>
      </svg>
    );
  }

  if (variant === "horizontal") {
    // Single-line — 7/24 mark on left, wordmark right
    return (
      <div className={`inline-flex items-center gap-3 ${className}`}>
        <svg
          viewBox="0 0 100 64"
          className="h-full w-auto shrink-0"
          role="img"
          aria-label={ariaLabel}
          fill="none"
        >
          <text
            x="0"
            y="54"
            fontFamily="var(--font-anton), 'Arial Black', sans-serif"
            fontSize="62"
            fontWeight="400"
            fill="var(--color-brand-500, #A3E635)"
            letterSpacing="-1"
          >
            7
          </text>
          <line
            x1="36"
            y1="58"
            x2="50"
            y2="6"
            stroke="var(--color-brand-500, #A3E635)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <text
            x="50"
            y="54"
            fontFamily="var(--font-anton), 'Arial Black', sans-serif"
            fontSize="62"
            fontWeight="400"
            fill="var(--color-brand-500, #A3E635)"
            letterSpacing="-1"
          >
            24
          </text>
        </svg>
        <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-ink-100">
          Varto Çekici
        </span>
      </div>
    );
  }

  // Default: vertical lockup — 7/24 mark on top, "VARTO ÇEKİCİ" mono caption below
  return (
    <div className={`inline-flex flex-col items-start ${className}`}>
      <svg
        viewBox="0 0 100 50"
        className="h-[68%] w-auto"
        role="img"
        aria-label={ariaLabel}
        fill="none"
        preserveAspectRatio="xMinYMid meet"
      >
        <text
          x="0"
          y="42"
          fontFamily="var(--font-anton), 'Arial Black', sans-serif"
          fontSize="48"
          fontWeight="400"
          fill="var(--color-brand-500, #A3E635)"
          letterSpacing="-1"
        >
          7
        </text>
        <line
          x1="28"
          y1="46"
          x2="40"
          y2="6"
          stroke="var(--color-brand-500, #A3E635)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <text
          x="40"
          y="42"
          fontFamily="var(--font-anton), 'Arial Black', sans-serif"
          fontSize="48"
          fontWeight="400"
          fill="var(--color-brand-500, #A3E635)"
          letterSpacing="-1"
        >
          24
        </text>
      </svg>
      <span className="mt-0.5 font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.28em] text-ink-100 whitespace-nowrap">
        Varto Çekici
      </span>
    </div>
  );
}
