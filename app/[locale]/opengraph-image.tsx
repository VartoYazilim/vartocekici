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
  const coverage =
    locale === "tr"
      ? "Muş Varto · Hınıs · Bulanık · Karlıova"
      : "Muş Varto · Hınıs · Bulanık · Karlıova";
  const services =
    locale === "tr"
      ? "Çekici · Off-Road · Akü · Lastik · Yakıt · Kilit"
      : "Towing · Off-Road · Battery · Tire · Fuel · Lockout";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(135deg, #0F1115 0%, #1A1D24 100%)",
          padding: 80,
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Soft lime glow upper-left */}
        <div
          style={{
            position: "absolute",
            top: -240,
            left: -100,
            width: 800,
            height: 800,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(163,230,53,0.20) 0%, transparent 70%)",
          }}
        />
        {/* Hi-vis stripe at bottom */}
        <div
          style={{
            position: "absolute",
            left: -100,
            right: -100,
            bottom: 32,
            height: 22,
            background: "#A3E635",
            opacity: 0.18,
            transform: "rotate(-1.5deg)",
          }}
        />

        {/* Left column — 7/24 mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 520,
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontFamily: "'Helvetica Neue', 'Arial Black', sans-serif",
              fontWeight: 900,
              fontSize: 320,
              color: "#A3E635",
              lineHeight: 0.9,
              letterSpacing: -12,
            }}
          >
            <span>7</span>
            <div
              style={{
                width: 22,
                height: 320,
                background: "#A3E635",
                margin: "0 -10px",
                transform: "skewX(-22deg) translateY(-14px)",
                borderRadius: 4,
              }}
            />
            <span>24</span>
          </div>
        </div>

        {/* Right column — wordmark + phone CTA */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: 48,
            justifyContent: "center",
            flex: 1,
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

          {/* Brand name */}
          <div
            style={{
              marginTop: 18,
              color: "#FAFAFA",
              fontSize: 84,
              fontWeight: 900,
              letterSpacing: -2,
              lineHeight: 1,
            }}
          >
            VARTO ÇEKİCİ
          </div>

          {/* Coverage */}
          <div
            style={{
              marginTop: 24,
              color: "#D4D4D8",
              fontSize: 28,
              fontWeight: 500,
            }}
          >
            {coverage}
          </div>
          <div
            style={{
              marginTop: 6,
              color: "#A1A1AA",
              fontSize: 22,
              fontWeight: 500,
            }}
          >
            {services}
          </div>

          {/* Phone CTA */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 36,
              background: "#A3E635",
              color: "#0F1115",
              padding: "22px 36px",
              borderRadius: 16,
              fontSize: 42,
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
              marginTop: 26,
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
