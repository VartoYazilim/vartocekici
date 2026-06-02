import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/business";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = routing.locales.map((locale) => {
    const path = locale === routing.defaultLocale ? "/" : `/${locale}`;
    return {
      url: `${SITE_URL}${path === "/" ? "" : path}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: locale === routing.defaultLocale ? 1 : 0.8,
      alternates: {
        languages: {
          tr: `${SITE_URL}/`,
          en: `${SITE_URL}/en`,
          "x-default": `${SITE_URL}/`,
        },
      },
    };
  });
  return entries;
}
