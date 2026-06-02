import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
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
  const t = await getTranslations({ locale, namespace: "hero" });

  const subtitle =
    locale === "tr"
      ? "Muş Varto · Hınıs · ve tüm çevre bölgeler"
      : "Muş Varto · Hınıs · and surrounding region";
  const kicker =
    locale === "tr" ? "7/24 YOL YARDIM" : "24/7 ROADSIDE ASSISTANCE";
  const serviceLine =
    locale === "tr"
      ? "Oto Kurtarma · Off-Road · Akü · Lastik · Yakıt · Kilit"
      : "Recovery · Off-Road · Battery · Tire · Fuel · Lockout";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "linear-gradient(135deg, #0B1220 0%, #0F172A 100%)",
          padding: "80px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: -200,
            left: 200,
            width: 800,
            height: 800,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(245,158,11,0.20) 0%, transparent 70%)",
          }}
        />

        {/* Header row */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {/* Mark */}
          <svg width="180" height="180" viewBox="0 0 64 64">
            <path
              d="M20 4 L44 4 L60 20 L60 44 L44 60 L20 60 L4 44 L4 20 Z"
              fill="#F59E0B"
              stroke="#0B1220"
              strokeWidth={2}
              strokeLinejoin="round"
            />
            <path
              d="M16 20 L32 42 L48 20"
              fill="none"
              stroke="#0B1220"
              strokeWidth={5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M32 42 Q32 50 38 50 Q44 50 44 46"
              fill="none"
              stroke="#0B1220"
              strokeWidth={5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                color: "#FBBF24",
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: 4,
                marginBottom: 8,
              }}
            >
              <div style={{ width: 32, height: 3, background: "#F59E0B" }} />
              {kicker}
            </div>
            <div
              style={{
                color: "#F8FAFC",
                fontSize: 96,
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: -2,
              }}
            >
              VARTO ÇEKİCİ
            </div>
          </div>
        </div>

        {/* Subtitle */}
        <div
          style={{
            marginTop: 36,
            color: "#CBD5E1",
            fontSize: 36,
            fontWeight: 500,
          }}
        >
          {subtitle}
        </div>

        {/* Service strip */}
        <div
          style={{
            marginTop: 16,
            color: "#94A3B8",
            fontSize: 24,
            fontWeight: 500,
          }}
        >
          {serviceLine}
        </div>

        {/* Phone CTA */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "auto",
            background: "#F59E0B",
            color: "#0B1220",
            padding: "20px 40px",
            borderRadius: 18,
            fontSize: 48,
            fontWeight: 900,
            letterSpacing: 1,
            alignSelf: "flex-start",
            boxShadow: "0 12px 32px -8px rgba(245,158,11,0.5)",
          }}
        >
          {business.phone.display}
        </div>
      </div>
    ),
    size,
  );
}
