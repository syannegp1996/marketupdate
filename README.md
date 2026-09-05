# MarketUpdate

Market Update Indonesia and Global — situs update harga crypto, forex, dan artikel analisis pasar.

## Fitur

- **Ticker pasar real-time**: komponen di header yang menampilkan harga crypto (dari
  [CoinGecko API](https://www.coingecko.com/en/api)) dan kurs forex (dari
  [@fawazahmed0/currency-api](https://github.com/fawazahmed0/exchange-api)) sebagai
  scrolling marquee, auto-refresh setiap 60 detik.
- **Artikel berbasis Markdown/MDX**: tulis artikel sebagai file `.md`/`.mdx` di
  `content/articles`, otomatis muncul di halaman daftar (`/artikel`) dan halaman
  detail (`/artikel/[slug]`).
- **SEO dasar**: setiap halaman punya title, description, canonical URL, Open Graph,
  dan Twitter card lewat helper `buildMetadata`, plus `sitemap.xml` dan `robots.txt`
  otomatis.

## Struktur Folder

```
content/
  articles/              # file .md / .mdx artikel (sumber konten)
src/
  app/
    layout.tsx           # root layout (Header, footer, global metadata)
    page.tsx             # halaman beranda
    sitemap.ts           # sitemap.xml
    robots.ts            # robots.txt
    artikel/
      page.tsx           # daftar semua artikel
      [slug]/page.tsx     # detail satu artikel
  components/
    Header.tsx           # header + navigasi, membungkus Ticker
    Ticker.tsx            # marquee ticker crypto & forex (client component)
    ArticleCard.tsx        # kartu artikel di halaman daftar/beranda
  lib/
    articles.ts           # baca & parse file markdown/mdx dari content/articles
    ticker.ts              # fetch & normalisasi data CoinGecko + forex
    seo.ts                 # helper buildMetadata untuk SEO tiap halaman
  types/
    article.ts             # tipe frontmatter & artikel
```

## Menambah Artikel Baru

Buat file `.md` atau `.mdx` baru di `content/articles/`, misalnya
`content/articles/nama-slug-artikel.mdx`, dengan frontmatter:

```md
---
title: "Judul Artikel"
date: "2026-09-05"
category: "Crypto"
summary: "Ringkasan singkat artikel untuk kartu & meta description."
author: "Nama Penulis"
---

Isi artikel dalam format Markdown/MDX di sini.
```

Artikel akan otomatis muncul di `/artikel` dan bisa diakses di `/artikel/nama-slug-artikel`.

## Menjalankan Proyek

```bash
npm install
npm run dev      # development server, http://localhost:3000
npm run build    # production build
npm run start    # jalankan hasil build
npm run lint     # eslint
```

## Konfigurasi

Set `NEXT_PUBLIC_SITE_URL` (mis. di `.env.local`) untuk URL production yang dipakai
pada metadata SEO, sitemap, dan Open Graph:

```
NEXT_PUBLIC_SITE_URL=https://domain-anda.com
```
