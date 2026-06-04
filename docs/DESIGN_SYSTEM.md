# Varto Çekici — Design System

**Tema adı:** Carbon Lime
**Felsefe:** Hi-vis güvenlik yeleği enerjisi. Lime yeşili (`#A3E635`) karbon siyah (`#0F1115`) üzerine. Tipik SaaS/AI sitelerinden bilinçli olarak ayrışır — gece görünürlüğü, aciliyet ve "iş yapan" hissi verir.

> Bütün token'lar `app/globals.css` içindeki Tailwind v4 `@theme` bloğunda tanımlı. Burada gösterilen değerler koddan birebir çıkarılmıştır.

---

## 1. Renk Sistemi

### Brand — Lime (vurgu / aksiyon)

| Token | Hex | Kullanım |
|---|---|---|
| `brand-50` | `#F7FEE7` | En açık ton (nadir) |
| `brand-100` | `#ECFCCB` | |
| `brand-200` | `#D9F99D` | |
| `brand-300` | `#BEF264` | |
| `brand-400` | `#BEF264` | **Soft accent** — hover, focus ring, kicker metni |
| **`brand-500`** | **`#A3E635`** | **PRIMARY** — butonlar, logo, ana vurgular |
| `brand-600` | `#84CC16` | |
| `brand-700` | `#65A30D` | **Dark lime** — açık zeminde metin/ikon için |
| `brand-800` | `#4D7C0F` | |
| `brand-900` | `#365314` | En koyu ton |

### Ink — Carbon (zinc tabanlı griler)

> Slate'ten daha soğuk/siyah. Mavi tonu yok.

| Token | Hex | Kullanım |
|---|---|---|
| `ink-50` | `#FAFAFA` | Başlıklar, en yüksek kontrast metin |
| `ink-100` | `#F4F4F5` | Body metin (varsayılan) |
| `ink-200` | `#E4E4E7` | |
| `ink-300` | `#D4D4D8` | İkincil metin, altyazılar |
| `ink-400` | `#A1A1AA` | Üçüncül metin, placeholder |
| `ink-500` | `#71717A` | Footer küçük metin, devre dışı |
| `ink-600` | `#52525B` | |
| `ink-700` | `#3F3F46` | Border (kart kenarları) |
| `ink-800` | `#27272A` | Border (koyu), ayraçlar |
| `ink-900` | `#18181B` | Yüzey arka planları |
| **`ink-950`** | **`#0F1115`** | **CARBON** — sayfa arka planı, buton metni |

### Semantik

| Token | Hex | Kullanım |
|---|---|---|
| `success-500` | `#10B981` | (yedek — şu an kullanımda değil) |
| `emergency-500` | `#DC2626` | (yedek — acil vurgu için) |
| WhatsApp | `#25D366` / hover `#20BA5A` | `.btn-whatsapp` |

### Temel atamalar

```
Sayfa arka planı   → ink-950 (#0F1115)
Body metin         → ink-100 (#F4F4F5)
Başlık             → ink-50  (#FAFAFA)
Vurgu / aksiyon    → brand-500 (#A3E635)
Seçim (::selection)→ bg brand-500, metin ink-950
Focus ring         → brand-400, 2px outline, 2px offset
themeColor (meta)  → #0F1115
```

---

## 2. Tipografi

Dört aile, hepsi `next/font/google` ile self-hosted (CLS = 0):

| Token | Font | Ağırlık | Kullanım |
|---|---|---|---|
| `--font-sans` | **Inter** | 400–900 | Body, paragraf, buton, varsayılan |
| `--font-display` | **Inter Tight** | 600–900 | Başlıklar (`h1`, `.section-title`) |
| `--font-numeric` | **Anton** | 400 | "7/24" logo mark — uzun/dar display |
| `--font-mono` | **JetBrains Mono** | 500, 700 | Kicker, küçük etiketler, telefon, logo caption |

**OpenType:** body'de `font-feature-settings: "cv11", "ss01", "ss03"` aktif.

### Tip ölçeği (gözlemlenen)

| Eleman | Sınıflar | Boyut (mobil → masaüstü) |
|---|---|---|
| Hero `h1` | `text-4xl sm:text-5xl md:text-6xl lg:text-7xl` font-extrabold | 36 → 72px |
| `.section-title` | `text-3xl sm:text-4xl md:text-5xl` font-extrabold | 30 → 48px |
| `.section-subtitle` | `text-base sm:text-lg` | 16 → 18px |
| Kicker | `text-xs` font-bold uppercase, tracking `0.18em` | 12px |
| Body | `text-base` / `text-sm` | 16 / 14px |
| Footer mikro | `text-xs` | 12px |

---

## 3. Spacing & Radius

### Radius token'ları

| Token | Değer |
|---|---|
| `radius-sm` | `0.375rem` (6px) |
| `radius-md` | `0.625rem` (10px) |
| `radius-lg` | `0.875rem` (14px) — buton varsayılanı |
| `radius-xl` | `1.25rem` (20px) — kartlar |

Kart köşeleri pratikte `rounded-2xl` (16px) ve `rounded-xl` (12px) kullanır.

### Bölüm ritmi

```
Section padding   → py-20 sm:py-28   (80 → 112px)
Section ayracı    → border-t border-ink-800/50
Container         → max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
İçerik genişliği  → max-w-2xl / max-w-3xl (metin blokları)
Anchor offset     → scroll-margin-top: 5rem (sticky header için)
```

---

## 4. Gölgeler

| Token | Değer | Kullanım |
|---|---|---|
| `shadow-brand` | `0 8px 32px -8px rgb(163 230 53 / 0.4)` | Primary buton (lime glow) |
| `shadow-card` | `inset highlight + 0 8px 24px -12px rgb(0 0 0 / 0.6)` | `.surface-card` |

---

## 5. Bileşen Desenleri

Hepsi `@layer components` içinde tanımlı, projede sınıf olarak kullanılır.

### `.btn` — Buton tabanı
```
inline-flex items-center justify-center gap-2
rounded-lg px-5 py-3 font-semibold
text-sm sm:text-base
transition-all duration-150
```

**Varyantlar:**
- `.btn-primary` → lime bg, carbon metin, `shadow-brand`, hover'da `brand-400` + `translateY(-1px)`
- `.btn-secondary` → şeffaf, ink-50 metin, ince border, `backdrop-blur`
- `.btn-whatsapp` → `#25D366` bg, beyaz metin, hover `#20BA5A`

### `.kicker` — Bölüm üst etiketi
```
inline-flex, text-xs font-bold uppercase
tracking-[0.18em], brand-400, mono font
::before → 24×2px lime çizgi (önekte)
```
Örnek: `─── HİZMETLER`

### `.section-title` — Bölüm başlığı
```
text-3xl→5xl font-extrabold, Inter Tight
leading-[1.1] tracking-tight, ink-50
```

### `.section-subtitle`
```
mt-4 text-base sm:text-lg, max-w-2xl, ink-300
```

### `.surface-card` — Yüzey kartı
```
bg: linear-gradient(180deg, ink-800/60%, ink-900/80%)
border: 1px ink-700/60%
box-shadow: shadow-card
```
Hover deseni (kartlarda): `hover:-translate-y-1 hover:border-brand-500/40`

### Kart üst-vurgu (hover glow)
Hizmet kartlarında üst kenarda görünen lime çizgi:
```
linear-gradient(90deg, transparent, rgba(163,230,53,0.7), transparent)
opacity 0 → 100 (group-hover)
```

---

## 6. Görsel Efektler

### `.bg-grid` — Hero arka plan ızgarası
```
48×48px grid, ink-100 @ 4% opacity çizgiler
mask: radial-gradient(ellipse 60% 60% at 50% 30%) — kenarlar solar
```

### Radial glow (Hero)
```
radial-gradient(ellipse, rgba(163,230,53,0.18) 0%, transparent 60%)
```

### Galeri görsel overlay'leri
```
Dark katman → linear-gradient(180deg, ink-950/25% → ink-950/85%), mix-blend-multiply
Lime wash   → radial üst-sol, #A3E635 @ opacity-20, mix-blend-overlay
```

---

## 7. Hareket (Motion)

```
Buton/transition → duration-150, ease (translateY -1px hover)
Kart hover       → duration-200, -translate-y-1
Galeri zoom      → duration-500 ease-out, scale-105 (group-hover)
Smooth scroll    → html { scroll-behavior: smooth }
```

**Erişilebilirlik:** `prefers-reduced-motion: reduce` → tüm animasyon/transition `0.01ms`'e iner, smooth-scroll kapanır.

---

## 8. Erişilebilirlik (a11y)

- Tek `h1`, semantik `h2` her bölümde
- `*:focus-visible` → 2px lime outline, 2px offset
- Tap target ≥ 44×44px (CTA butonları)
- `::selection` yüksek kontrast (lime/carbon)
- LegalModal: gerçek focus-trap (Tab/Shift+Tab wrap), Escape, scroll-lock, focus restore
- Mobil menüde `aria-expanded` + `aria-controls`
- `prefers-reduced-motion` tam destek

---

## 9. İkonografi

- Kütüphane: **lucide-react** (tree-shake'li)
- Varsayılan: `size={18}`, `strokeWidth={2.5}` (butonlarda), `1.75` (kart ikonlarında)
- İkon rengi: bağlama göre `brand-400` veya `currentColor`

---

## 10. Logo

- **Mark:** "7/24" — Anton font, lime, slash özel SVG çizim (currentColor)
- **Varyantlar:** `lockup` (dikey: 7/24 + "VARTO ÇEKİCİ" mono caption), `horizontal` (yatay), `mark` (sadece 7/24)
- HTML inline-flex layout → SVG viewBox clipping yok, her ölçekte tam görünür
- Caption: JetBrains Mono, uppercase, tracking `0.22em`–`0.28em`

---

## 11. Ses & Ton (İçerik)

- **Dil:** TR birincil, EN ikincil
- **Ton:** Kısa, doğrudan, abartısız. Pazarlama klişesi yok.
- **Yasak kalıplar:** "Yolda yalnız bırakmıyoruz", "büyük ihtimalle geliriz", "buralıyız" gibi slogan-vari ifadeler kullanılmaz.
- **CTA dili:** "Hemen Ara", "WhatsApp" — fiil + net aksiyon.

---

## Hızlı Referans — Kopyala/Yapıştır

```css
/* Ana renkler */
--lime:   #A3E635;  /* primary */
--carbon: #0F1115;  /* bg */
--text:   #F4F4F5;  /* body */
--head:   #FAFAFA;  /* başlık */

/* Fontlar */
Inter           → body
Inter Tight     → başlık
Anton           → 7/24 mark
JetBrains Mono  → etiket/telefon/kicker

/* Birincil buton */
bg #A3E635 · metin #0F1115 · rounded-lg · shadow 0 8px 32px -8px rgb(163 230 53 / .4)
```
