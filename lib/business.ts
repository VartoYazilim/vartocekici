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
