# Varto Çekici — vartocekici.com

7/24 yol yardım ve oto kurtarma — Muş Varto ve çevre bölge.

Tek-sayfa, SEO odaklı, Türkçe + İngilizce, Vercel üzerinde yayınlanacak Next.js 15 sitesi.

## Teknoloji

- **Next.js 15** (App Router, SSG)
- **React 19**
- **TypeScript** (strict)
- **Tailwind CSS v4** (`@theme` ile token sistemi)
- **next-intl** (TR varsayılan, EN ikincil)
- **@vercel/analytics** + **@vercel/speed-insights**
- **lucide-react** (ikonlar)

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

# 4. tip kontrolü
npm run typecheck

# 5. prod build
npm run build
npm run start
```

## Proje yapısı

```
app/
├── layout.tsx              # pass-through (Next.js gereği)
├── icon.svg                # favicon
├── apple-icon.svg
├── globals.css             # Tailwind v4 + token tanımları
├── robots.ts
├── sitemap.ts
└── [locale]/
    ├── layout.tsx          # asıl <html>, metadata, font, Analytics
    ├── page.tsx            # tek sayfa — bütün section'lar
    └── opengraph-image.tsx # PNG OG üretici (1200x630)

components/
├── Header.tsx              # sticky, mobile menu, lang switch
├── Hero.tsx                # H1 + CTA + dekoratif SVG
├── Services.tsx            # 8 hizmet kartı
├── ServiceArea.tsx         # bölge listesi + Maps embed
├── About.tsx               # 4 değer önerisi
├── Contact.tsx             # tel, WhatsApp, e-posta, Instagram, saat, adres
├── Footer.tsx              # quick links + legal modal tetikleyiciler
├── FloatingCTA.tsx         # mobile alt sabit "Ara / WhatsApp"
├── LegalModal.tsx          # KVKK + Çerez modali (Esc, focus-trap, scroll-lock)
├── LanguageSwitcher.tsx    # TR / EN toggle
├── Logo.tsx                # SVG mark + wordmark
└── JsonLd.tsx              # Schema.org AutomotiveBusiness

i18n/
├── routing.ts              # locales, default, prefix mode
└── request.ts              # mesaj yükleme

messages/
├── tr.json
└── en.json

lib/
└── business.ts             # tek doğru kaynak: tel, adres, hizmet bölgeleri
                             #   buradaki değer her yere yansır

proxy.ts                     # next-intl locale routing (Next 16 "proxy" convention)
public/
├── logo-mark.svg
├── logo-lockup.svg
└── og-image.svg            # statik fallback (PNG, opengraph-image.tsx'tan üretilir)
```

## İçeriği değiştirmek

İşletme bilgileri (telefon, adres, hizmet bölgeleri) `lib/business.ts` içinde toplandı. **Buradaki değişiklik header, hero, contact, footer, JSON-LD, sitemap — her yere yansır.**

Metin içerikleri:
- Türkçe → `messages/tr.json`
- İngilizce → `messages/en.json`

## Vercel'e deploy

```bash
# 1. GitHub'a push et (zaten bir repo: VartoYazilim/vartocekici)
git add .
git commit -m "feat: ilk yayın - varto cekici v1"
git push

# 2. vercel.com → New Project → repoyu import et
#    Framework Preset: Next.js (otomatik algılar)
#    Build: npm run build
#    Output: .next (otomatik)
```

### Vercel ortam değişkenleri (Project → Settings → Environment Variables)

| Anahtar | Değer | Zorunlu? |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://vartocekici.com` | ✅ Evet |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Google Search Console doğrulama token'ı | İsteğe bağlı |
| `NEXT_PUBLIC_MAPS_QUERY` | GBP pin'i oluştuğunda Maps embed query'si | İsteğe bağlı |

### Domain bağlama

Vercel → Project → Settings → Domains → `vartocekici.com` ekle. DNS kayıtlarını Vercel'in gösterdiği gibi (A `76.76.21.21` veya CNAME) ayarla.

## Deploy sonrası kontrol listesi 📋

Sıralı olarak yap:

1. **Google Search Console** (kritik — yerel SEO'nun temeli)
   - https://search.google.com/search-console adresine git
   - `vartocekici.com` mülkünü ekle
   - "URL prefix" yöntemini seç → doğrulama tag'ini al
   - Token'ı `NEXT_PUBLIC_GSC_VERIFICATION` ortam değişkenine koy ve yeniden deploy et
   - **Sitemap gönder**: `https://vartocekici.com/sitemap.xml`

2. **Google Business Profile** (yerel aramaların %70'i buradan gelir — bunu yapmazsak SEO yarım kalır)
   - https://www.google.com/business adresinden açın
   - Adres: `Erzurum Caddesi, Varto / Muş`
   - Kategori: **"Çekici Hizmeti"** (Tow truck service)
   - Hizmet alanları: Varto, Hınıs, Muş, Bulanık, Karlıova
   - Telefon: `0 553 181 57 91`
   - Çalışma saatleri: **7 gün 24 saat**
   - Web sitesi: `https://vartocekici.com`
   - Fotoğraf yükle (logo + araç fotoğrafları gelince mutlaka ekle)
   - Doğrulama posta kartını isteyin ve tamamlayın

3. **Bing Webmaster Tools** (5 dakikalık iş, ek trafik kanalı)
   - https://www.bing.com/webmasters → site ekle → sitemap gönder

4. **Google Maps konum güncelleme**
   - GBP doğrulandıktan sonra `lib/business.ts` içindeki `geo.latitude` ve `geo.longitude` değerlerini Maps'in verdiği gerçek koordinatlarla güncelle
   - `NEXT_PUBLIC_MAPS_QUERY` ortam değişkenini `Varto+Çekici` veya GBP'nin `place_id`'si ile doldur
   - Yeniden deploy et — Maps embed gerçek pin'i gösterecek

5. **Sosyal medya bio güncelle**
   - Instagram bio'ya `vartocekici.com` ekle (linkin geri yansıması SEO'ya yardım eder)

6. **Lighthouse ve PageSpeed**
   - https://pagespeed.web.dev/?url=https://vartocekici.com
   - Hedef: Performance / SEO / Best Practices / Accessibility hepsi 95+

## SEO mimari özeti

- **LocalBusiness + AutomotiveBusiness** JSON-LD (her sayfa)
- **OfferCatalog** içinde tüm hizmetler tek tek listeleniyor
- **areaServed** ile her hizmet bölgesi `City` olarak işaretli
- Türkçe + İngilizce için **hreflang** alternates
- Otomatik `sitemap.xml` ve `robots.txt`
- **OG image** her dil için ayrı dinamik PNG (1200×630)
- **Geist tabanlı Inter Tight + Inter** ile self-hosted font (CLS = 0)
- Statik prerender (`generateStaticParams`) — TTFB minimum
- Server-side rendering ile JS bundle ufak — `lucide-react` tree-shake'li

## Yerel SEO için anahtar kelime stratejisi

Site otomatik olarak şu kelimelerde sıralanacak (zaman içinde):

**Ana hedefler:**
- Varto çekici
- Muş Varto çekici
- Varto oto kurtarma
- Varto yol yardım

**Uzun kuyruk:**
- 7/24 çekici Muş Varto
- Hınıs çekici hizmeti
- Erzurum Muş karayolu çekici
- Off road kurtarma Varto

GBP + GSC bağlandığında ve birkaç organik trafik geldiğinde rankings stabilize olur (4-8 hafta).

## Lisans

İşletmeye özel proje. Tüm hakları Varto Çekici'ye aittir.
