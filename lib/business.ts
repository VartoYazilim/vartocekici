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
  email: "vartocekici@gmail.com",
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
  },
  serviceAreas: [
    "Varto",
    "Hınıs",
    "Muş Merkez",
    "Bulanık",
    "Karlıova",
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

/**
 * Gallery placeholder images.
 *
 * SWAP THESE for real photos as they come in:
 *   1. Drop photos into `public/galeri/01.jpg` ... `06.jpg`
 *   2. Change each `src` here to `/galeri/01.jpg` etc.
 *   3. Remove `picsum.photos` from `next.config.ts` → `images.remotePatterns`
 *
 * Captions are read from `messages/{locale}.json` → `gallery.items[i]`.
 */
export const galleryImages: { src: string; width: number; height: number }[] = [
  { src: "https://picsum.photos/seed/varto-cekici-1/1200/900", width: 1200, height: 900 },
  { src: "https://picsum.photos/seed/varto-cekici-2/1200/900", width: 1200, height: 900 },
  { src: "https://picsum.photos/seed/varto-cekici-3/1200/900", width: 1200, height: 900 },
  { src: "https://picsum.photos/seed/varto-cekici-4/1200/900", width: 1200, height: 900 },
  { src: "https://picsum.photos/seed/varto-cekici-5/1200/900", width: 1200, height: 900 },
  { src: "https://picsum.photos/seed/varto-cekici-6/1200/900", width: 1200, height: 900 },
];

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
