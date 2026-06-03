import { business, SITE_URL } from "@/lib/business";
import { galleryImages } from "@/lib/gallery";

const localizedServices = {
  tr: [
    "Şehir İçi Çekici",
    "Şehir Dışı Çekici",
    "Off-Road Kurtarma",
    "Akü Takviyesi",
    "Lastik Değişimi",
    "Yakıt İkmali",
    "Kilit / Anahtar Hizmeti",
    "Kaza Sonrası Çekme",
    "Yol Yardım",
  ],
  en: [
    "City Towing",
    "Intercity Towing",
    "Off-Road Recovery",
    "Battery Boost",
    "Tire Change",
    "Fuel Delivery",
    "Lockout / Key Service",
    "Accident Recovery",
    "Roadside Assistance",
  ],
} as const;

export function JsonLd({ locale }: { locale: "tr" | "en" }) {
  const url = locale === "tr" ? SITE_URL : `${SITE_URL}/en`;
  const description =
    locale === "tr"
      ? "Varto, Hınıs, Muş ve civar bölgelerde 7 gün 24 saat çekici, oto kurtarma ve yol yardım hizmeti."
      : "24/7 towing, auto recovery and roadside assistance in Varto, Hınıs, Muş and surrounding regions of Eastern Turkey.";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AutomotiveBusiness",
        "@id": `${SITE_URL}/#business`,
        name: business.name,
        legalName: business.legalName,
        url,
        description,
        telephone: business.phone.e164,
        email: business.email,
        // Image array — OG + real gallery photos (placeholder picsum URLs filtered out)
        image: [
          `${SITE_URL}/og-image.svg`,
          ...galleryImages
            .filter((img) => !img.isPlaceholder)
            .map((img) =>
              img.src.startsWith("http") ? img.src : `${SITE_URL}${img.src}`,
            ),
        ],
        logo: `${SITE_URL}/logo-mark.svg`,
        priceRange: "$$",
        currenciesAccepted: "TRY",
        paymentAccepted: locale === "tr" ? "Nakit, Havale" : "Cash, Bank Transfer",
        foundingDate: String(business.founded),
        address: {
          "@type": "PostalAddress",
          streetAddress: business.address.streetAddress,
          addressLocality: business.address.locality,
          addressRegion: business.address.region,
          postalCode: business.address.postalCode,
          addressCountry: business.address.country,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: business.geo.latitude,
          longitude: business.geo.longitude,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: "00:00",
            closes: "23:59",
          },
        ],
        // Mix of named cities + a geographic circle. The named entries are
        // the strongest signal for Google's local pack; the GeoCircle catches
        // long-tail queries from points within radius that aren't named.
        areaServed: [
          ...business.serviceAreas.map((name) => ({
            "@type": "City",
            name,
          })),
          {
            "@type": "GeoCircle",
            geoMidpoint: {
              "@type": "GeoCoordinates",
              latitude: business.geo.latitude,
              longitude: business.geo.longitude,
            },
            // Schema.org expects geoRadius in meters when no unit suffix is set.
            geoRadius: business.geo.serviceRadiusKm * 1000,
          },
        ],
        sameAs: [business.social.instagram.url],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name:
            locale === "tr"
              ? "Çekici ve Yol Yardım Hizmetleri"
              : "Towing and Roadside Assistance Services",
          itemListElement: localizedServices[locale].map((service, idx) => ({
            "@type": "Offer",
            position: idx + 1,
            itemOffered: {
              "@type": "Service",
              name: service,
              areaServed: business.serviceAreas[0],
            },
          })),
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: business.phone.e164,
            contactType: locale === "tr" ? "müşteri hizmetleri" : "customer service",
            availableLanguage: ["Turkish", "English"],
            areaServed: "TR",
            hoursAvailable: "Mo-Su 00:00-23:59",
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: business.name,
        inLanguage: locale === "tr" ? "tr-TR" : "en-US",
        publisher: { "@id": `${SITE_URL}/#business` },
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: business.name,
        inLanguage: locale === "tr" ? "tr-TR" : "en-US",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#business` },
        description,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // dangerouslySetInnerHTML so the JSON is rendered verbatim, not as a React text node.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
