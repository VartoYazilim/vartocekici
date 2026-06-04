/**
 * Central source of truth for business info.
 * Change a value here and it propagates to UI, metadata, JSON-LD, sitemap, etc.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://vartocekici.com"
).replace(/\/$/, "");

export const business = {
  name: "Varto Çekici",
  legalName: "Varto Çekici Oto Kurtarma",
  // İşletmenin sahada/araçlarda kullandığı alternatif adı — JSON-LD alternateName.
  alternateName: "Can Yol Yardım",
  tagline: {
    tr: "7/24 Yol Yardım ve Oto Kurtarma",
    en: "24/7 Roadside Assistance & Towing",
  },
  phone: {
    display: "0 553 181 57 91",
    e164: "+905531815791",
    raw: "905531815791",
  },
  whatsapp: {
    raw: "905531815791",
    presetMessage: {
      tr: "Merhaba, yol yardımına ihtiyacım var.",
      en: "Hello, I need roadside assistance.",
    },
  },
  email: "cekicivarto@gmail.com",
  address: {
    streetAddress: "Erzurum Caddesi",
    locality: "Varto",
    region: "Muş",
    country: "TR",
    countryName: "Türkiye",
    postalCode: "49600",
  },
  hours: {
    tr: "7/24 Açık",
    en: "Open 24/7",
  },
  geo: {
    // Varto town center (approximate). Update once a Google Business Profile
    // location is pinned and we have the precise coordinates.
    latitude: 39.1772,
    longitude: 41.4533,
    // Effective service radius in kilometers — used in JSON-LD GeoCircle.
    // Covers all named serviceAreas plus wider region (Erzurum, Bingöl,
    // Tatvan, Erzincan, Van merkez tarafı dahil).
    serviceRadiusKm: 250,
  },
  serviceAreas: [
    "Varto",
    "Karlıova",
    "Hınıs",
    "Muş Merkez",
    "Bulanık",
    "Varto-Karlıova Karayolu",
    "Erzurum-Muş D300 Karayolu",
    "Varto-Hınıs Karayolu",
  ],
  social: {
    instagram: {
      handle: "@vartocanyolyardim",
      url: "https://instagram.com/vartocanyolyardim",
    },
  },
  founded: 2024,
} as const;

/** Developer/agency credit shown in the footer. */
export const developer = {
  name: "Varto Yazılım",
  url: "https://vartoyazilim.com",
} as const;

/**
 * 3rd-party analytics IDs. Set to empty string to disable.
 * Vercel Analytics + Speed Insights are wired separately in the layout.
 */
export const analytics = {
  /** Google Analytics 4 measurement ID (G-XXXXXXXXXX). */
  googleAnalyticsId: "G-RTZBBQ7ZYP",
} as const;

// Gallery images are now auto-detected from `public/galeri/` by `lib/gallery.ts`.

export const telHref = `tel:${business.phone.e164}`;

export function whatsappHref(locale: "tr" | "en"): string {
  const text = encodeURIComponent(business.whatsapp.presetMessage[locale]);
  return `https://wa.me/${business.whatsapp.raw}?text=${text}`;
}

export function mapsEmbedSrc(): string {
  const query =
    process.env.NEXT_PUBLIC_MAPS_QUERY ??
    `${business.address.streetAddress}, ${business.address.locality}, ${business.address.region}`;
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}
