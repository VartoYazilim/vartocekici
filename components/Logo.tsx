type LogoProps = {
  className?: string;
  showWordmark?: boolean;
  ariaLabel?: string;
};

export function Logo({
  className = "h-9 w-auto",
  showWordmark = true,
  ariaLabel = "Varto Çekici",
}: LogoProps) {
  if (!showWordmark) {
    return (
      <svg
        viewBox="0 0 64 64"
        className={className}
        role="img"
        aria-label={ariaLabel}
        fill="none"
      >
        <path
          d="M20 4 L44 4 L60 20 L60 44 L44 60 L20 60 L4 44 L4 20 Z"
          fill="url(#logo-grad-mark)"
          stroke="#0B1220"
          strokeWidth={2}
          strokeLinejoin="round"
        />
        <g
          fill="none"
          stroke="#0B1220"
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 20 L32 42 L48 20" />
          <path d="M32 42 Q32 50 38 50 Q44 50 44 46" />
        </g>
        <defs>
          <linearGradient id="logo-grad-mark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 64 64"
        className="h-full w-auto shrink-0"
        role="img"
        aria-label={ariaLabel}
        fill="none"
      >
        <path
          d="M20 4 L44 4 L60 20 L60 44 L44 60 L20 60 L4 44 L4 20 Z"
          fill="url(#logo-grad-lockup)"
          stroke="#0B1220"
          strokeWidth={2}
          strokeLinejoin="round"
        />
        <g
          fill="none"
          stroke="#0B1220"
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 20 L32 42 L48 20" />
          <path d="M32 42 Q32 50 38 50 Q44 50 44 46" />
        </g>
        <defs>
          <linearGradient id="logo-grad-lockup" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>
      </svg>
      <div className="flex flex-col leading-none">
        <span
          className="font-display text-base sm:text-lg font-extrabold tracking-tight text-ink-50"
          style={{ letterSpacing: "0.02em" }}
        >
          VARTO
        </span>
        <span
          className="font-display text-base sm:text-lg font-extrabold tracking-tight"
          style={{ color: "var(--color-brand-500)", letterSpacing: "0.02em" }}
        >
          ÇEKİCİ
        </span>
      </div>
    </div>
  );
}
