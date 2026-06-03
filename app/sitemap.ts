import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/business";
import { routing } from "@/i18n/routing";

/**
 * Bumped manually when content changes meaningfully (new section, copy
 * rewrite, etc.). Using `new Date()` here would tell Google "everything was
 * modified at every build", which is misleading and weakens the freshness
 * signal. Update this value alongside content changes.
 */
const CONTENT_LAST_MODIFIED = new Date("2026-06-03");

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.map((locale) => {
    const path = locale === routing.defaultLocale ? "/" : `/${locale}`;
    return {
      url: `${SITE_URL}${path === "/" ? "" : path}`,
      lastModified: CONTENT_LAST_MODIFIED,
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
}
