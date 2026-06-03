import { ImageResponse } from "next/og";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { business } from "@/lib/business";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export const alt = "Varto Çekici — 7/24 Yol Yardım";

export default async function OpengraphImage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = hasLocale(routing.locales, params.locale)
    ? params.locale
    : routing.defaultLocale;

  const kicker = locale === "tr" ? "YOL YARDIM · 7/24" : "ROADSIDE · 24/7";
  const headline1 = locale === "tr" ? "Muş Varto" : "Muş Varto";
  const headline2 = locale === "tr" ? "Oto Kurtarma" : "Auto Recovery";
  const coverage = "Hınıs · Bulanık · Karlıova · D300";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(135deg, #0F1115 0%, #1A1D24 100%)",
          padding: 64,
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Lime glow upper-left */}
        <div
          style={{
            position: "absolute",
            top: -260,
            left: -120,
            width: 760,
            height: 760,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(163,230,53,0.20) 0%, transparent 70%)",
          }}
        />
        {/* Hi-vis stripe */}
        <div
          style={{
            position: "absolute",
            left: -100,
            right: -100,
            bottom: 40,
            height: 24,
            background: "#A3E635",
            opacity: 0.18,
            transform: "rotate(-1.5deg)",
          }}
        />

        {/* Left: 7/24 mark */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingRight: 40,
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              fontFamily: "'Helvetica Neue', 'Arial Black', sans-serif",
              fontWeight: 900,
              fontSize: 240,
              color: "#A3E635",
              lineHeight: 0.9,
              letterSpacing: -10,
            }}
          >
            <span>7</span>
            <div
              style={{
                width: 18,
                height: 240,
                background: "#A3E635",
                margin: "0 -2px",
                transform: "skewX(-22deg) translateY(-8px)",
                borderRadius: 4,
              }}
            />
            <span>24</span>
          </div>
          <div
            style={{
              marginTop: 12,
              color: "#FAFAFA",
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: 6,
            }}
          >
            VARTO ÇEKİCİ
          </div>
        </div>

        {/* Right column: brand info + phone */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            marginLeft: 32,
          }}
        >
          {/* Kicker */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              color: "#BEF264",
              fontSize: 20,
              fontWeight: 800,
              letterSpacing: 4,
            }}
          >
            <div style={{ width: 32, height: 3, background: "#A3E635" }} />
            {kicker}
          </div>

          {/* Headline */}
          <div
            style={{
              marginTop: 22,
              color: "#FAFAFA",
              fontSize: 72,
              fontWeight: 900,
              letterSpacing: -1.5,
              lineHeight: 0.95,
            }}
          >
            {headline1}
          </div>
          <div
            style={{
              color: "#FAFAFA",
              fontSize: 72,
              fontWeight: 900,
              letterSpacing: -1.5,
              lineHeight: 0.95,
            }}
          >
            {headline2}
          </div>

          {/* Coverage */}
          <div
            style={{
              marginTop: 24,
              color: "#A1A1AA",
              fontSize: 24,
              fontWeight: 500,
            }}
          >
            {coverage}
          </div>

          {/* Phone CTA */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 32,
              background: "#A3E635",
              color: "#0F1115",
              padding: "20px 34px",
              borderRadius: 16,
              fontSize: 40,
              fontWeight: 900,
              letterSpacing: 0.5,
              alignSelf: "flex-start",
              boxShadow: "0 12px 32px -8px rgba(163,230,53,0.5)",
            }}
          >
            {business.phone.display}
          </div>

          {/* Domain */}
          <div
            style={{
              marginTop: 22,
              color: "#71717A",
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: 3,
            }}
          >
            VARTOCEKICI.COM
          </div>
        </div>
      </div>
    ),
    size,
  );
}
