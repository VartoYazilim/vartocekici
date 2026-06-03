# Varto Çekici — vartocekici.com

7/24 yol yardım ve oto kurtarma — Muş Varto ve çevre bölge.

Tek-sayfa, SEO odaklı, Türkçe + İngilizce, Vercel üzerinde yayınlanan Next.js sitesi.

## Teknoloji

- **Next.js 16** (App Router, SSG, "proxy" middleware convention)
- **React 19**
- **TypeScript** (strict)
- **Tailwind CSS v4** (`@theme` ile token sistemi — Carbon + Lime paleti)
- **next-intl 4** (TR varsayılan, EN ikincil)
- **@vercel/analytics** + **@vercel/speed-insights**
- **lucide-react** (ikonlar)
- **ESLint 9** (flat config, eslint-config-next 16 native)

## Çalıştırma

```bash
# 1. bağımlılıklar
npm install

# 2. ortam değişkenlerini ayarla
cp .env.example .env.local
#   .env.local içinde NEXT_PUBLIC_SITE_URL'i prod URL'in ile değiştir

# 3. geliştirme sunucusu
npm run dev
# → http://localhost:3000  (TR)
# → http://localhost:3000/en  (EN)

# 4. tip kontrolü + lint
npm run typecheck
npm run lint

# 5. prod build
npm run build
npm run start
```

## Proje yapısı

```
app/
├── layout.tsx              # pass-through (Next.js root layout gereği)
├── icon.svg                # favicon ("7/24" stacked diagonal)
├── apple-icon.svg          # apple touch icon (180×180)
├── globals.css             # Tailwind v4 + Carbon Lime token tanımları
├── robots.ts
├── sitemap.ts              # stable lastModified, hreflang alternates
└── [locale]/
    ├── layout.tsx          # asıl <html>, metadata, font, Analytics
    ├── page.tsx            # tek sayfa — bütün section'lar
    └── opengraph-image.tsx # dinamik PNG OG üretici (1200×630)

components/
├── Header.tsx              # sticky, mobile menü, dil switcher
├── Hero.tsx                # H1 + CTA + dekoratif SVG (orbital tags)
├── Services.tsx            # 8 hizmet kartı
├── Gallery.tsx              # 5 gerçek araç fotoğrafı (auto-detect)
├── ServiceArea.tsx          # bölge listesi + Google Maps embed
├── About.tsx                # 4 değer önerisi
├── Contact.tsx              # tel, WhatsApp, e-posta, Instagram, saat, adres
├── Footer.tsx               # quick links + legal modal + Varto Yazılım credit
├── FloatingCTA.tsx          # mobile alt sabit "Ara / WhatsApp"
├── LegalModal.tsx           # KVKK + Çerez modal (Esc, focus-trap, scroll-lock)
├── LanguageSwitcher.tsx     # TR / EN toggle (next-intl router)
├── Logo.tsx                 # "7/24" Anton numerik mark + mono wordmark
└── JsonLd.tsx               # Schema.org AutomotiveBusiness + image array

i18n/
├── routing.ts              # locales, default, prefix mode
├── request.ts              # mesaj yükleme
└── navigation.ts           # createNavigation — useRouter/usePathname (locale-aware)

messages/
├── tr.json
└── en.json

lib/
├── business.ts             # işletme bilgisi (tel, adres, geo, sosyal, developer)
└── gallery.ts              # public/galeri/ tarayan server-only modül

public/
├── galeri/                  # gerçek araç fotoğrafları (auto-detect)
├── logo-mark.svg           # JSON-LD logo URL'i için
├── logo-lockup.svg
└── og-image.svg            # OG fallback (PNG opengraph-image.tsx'tan üretilir)

proxy.ts                    # next-intl locale routing (Next 16 "proxy" convention)
eslint.config.mjs           # ESLint 9 flat config
```

## İçeriği değiştirmek

### İşletme bilgileri (telefon, adres, vb.)
`lib/business.ts` — buradaki değişiklik header, hero, contact, footer, JSON-LD, sitemap, OG image, her yere yansır.

### Metinler (başlık, açıklama, hizmet adları)
- Türkçe → `messages/tr.json`
- İngilizce → `messages/en.json`

### Galeri fotoğrafları
`public/galeri/` klasörüne dosya (jpg/png/webp/avif) at — `lib/gallery.ts` otomatik tarar, alfabetik (numeric-aware) sıralar, galeri bölümüne ekler. Caption'lar `messages/{locale}.json` → `gallery.items` array'inden gelir (index sırası).

Placeholder devre dışı kalır: gerçek dosya varsa picsum URL'leri kullanılmaz; "Demo görseller" bilgi notu otomatik gizlenir.

### Sitemap "lastModified"
`app/sitemap.ts` içinde `CONTENT_LAST_MODIFIED` sabiti var — içerik anlamlı değiştiğinde elle bump et. `new Date()` kullanmamamızın sebebi: her build'de tüm sayfaları "yeni güncellendi" diye Google'a yanlış sinyal vermemek.

## Vercel'e deploy

```bash
git add .
git commit -m "feat: ..."
git push

# vercel.com → New Project → repoyu import et
# Framework Preset: Next.js (otomatik)
```

### Vercel ortam değişkenleri

| Anahtar | Değer | Zorunlu? |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://vartocekici.com` | ✅ Evet |
| `NEXT_PUBLIC_GSC_VERIFICATION` | (DNS doğrulama kullanılıyorsa boş bırak) | İsteğe bağlı |
| `NEXT_PUBLIC_MAPS_QUERY` | GBP pin oluştuğunda Maps embed query'si | İsteğe bağlı |

### Domain

- `vartocekici.com` apex → primary (canonical)
- `www.vartocekici.com` → 308 → apex

## Deploy sonrası kontrol listesi 📋

1. **Google Search Console** (yerel SEO temeli)
   - DNS TXT ile doğrulandı (domain property, tüm subdomain'leri kapsar)
   - **Sitemap gönder**: `https://vartocekici.com/sitemap.xml`
   - URL Inspection → `/` ve `/en` için "Request Indexing"

2. **Google Business Profile** (yerel aramaların %70'i buradan)
   - https://www.google.com/business
   - Adres: `Erzurum Caddesi, Varto / Muş`
   - Kategori: **Çekici Hizmeti** (Tow truck service)
   - Hizmet alanları: Varto, Hınıs, Muş, Bulanık, Karlıova
   - Telefon: `0 553 181 57 91` (tek)
   - Çalışma saatleri: 7/24
   - Web sitesi: `https://vartocekici.com`
   - Fotoğraf yükle (`public/galeri/` içindekiler GBP'ye de eklenmeli)

3. **GBP doğrulandıktan sonra**
   - `lib/business.ts` → `geo.latitude/longitude` gerçek koordinatlarla güncelle
   - `NEXT_PUBLIC_MAPS_QUERY` ortam değişkenini GBP `place_id` veya `Varto+Çekici` ile doldur
   - Redeploy → Maps embed gerçek pin'i gösterecek

4. **Bing Webmaster Tools** (5 dk, ek trafik kanalı)

5. **Lighthouse / PageSpeed**
   - https://pagespeed.web.dev/?url=https://vartocekici.com
   - Hedef: Performance / SEO / Best Practices / Accessibility — 95+

## SEO mimari özeti

- **AutomotiveBusiness** JSON-LD (her sayfa, hem TR hem EN)
- `image` array içinde **OG + tüm gerçek galeri fotoğrafları** (placeholder filtrelenir)
- **OfferCatalog** içinde tüm hizmetler tek tek listeleniyor
- **areaServed** ile her hizmet bölgesi `City` olarak işaretli
- TR + EN için **hreflang** alternates
- Otomatik `sitemap.xml` + `robots.txt`, stable lastModified
- Dil başına dinamik **OG image PNG** (1200×630, `next/og`)
- Inter + Inter Tight + Anton + JetBrains Mono — hepsi `next/font/google` ile self-hosted (CLS = 0)
- Statik prerender (`generateStaticParams`) — TTFB minimum
- `lucide-react` tree-shake'li, server components, client-side JS minimum

## Erişilebilirlik (a11y)

- Tek H1, semantik H2'ler her section için
- Mobil menüde `aria-expanded` + `aria-controls`
- LegalModal: **gerçek focus-trap** (Tab + Shift+Tab wrap), Escape kapatır, body scroll-lock, açılışta close button'a focus, kapanışta önceki focus'a dönüş
- `focus-visible` outline (lime)
- `prefers-reduced-motion` desteği
- Tüm CTA butonları minimum 44×44 px tap target

## Yerel SEO için anahtar kelime stratejisi

**Ana hedefler:** Varto çekici · Muş Varto çekici · Varto oto kurtarma · Varto yol yardım

**Uzun kuyruk:** 7/24 çekici Muş Varto · Hınıs çekici hizmeti · Erzurum Muş karayolu çekici · Off road kurtarma Varto

GBP + GSC aktif olduğunda ve birkaç organik trafik geldiğinde rankings stabilize olur (4-8 hafta).

## Lisans

İşletmeye özel proje. Tüm hakları Varto Çekici'ye aittir.

Geliştirme: [Varto Yazılım](https://vartoyazilim.com)
