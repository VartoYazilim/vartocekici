import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Inter, Inter_Tight } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { routing } from "@/i18n/routing";
import { SITE_URL, business } from "@/lib/business";
import { JsonLd } from "@/components/JsonLd";
import "../globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter-tight",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#0B1220",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });

  const path = locale === routing.defaultLocale ? "/" : `/${locale}`;
  const url = `${SITE_URL}${path}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    applicationName: business.name,
    authors: [{ name: business.name }],
    creator: business.name,
    publisher: business.name,
    alternates: {
      canonical: url,
      languages: {
        tr: `${SITE_URL}/`,
        en: `${SITE_URL}/en`,
        "x-default": `${SITE_URL}/`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "tr" ? "tr_TR" : "en_US",
      url,
      siteName: business.name,
      title: t("title"),
      description: t("description"),
      // Images are auto-injected from app/[locale]/opengraph-image.tsx
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      // Images are auto-injected from app/[locale]/twitter-image (falls back to opengraph-image)
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
      : undefined,
    formatDetection: {
      telephone: true,
      address: true,
      email: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${interTight.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
        <JsonLd locale={locale as "tr" | "en"} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
