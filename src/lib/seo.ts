import type { Metadata } from "next";

const SITE_NAME = "MarketUpdate";
const SITE_DESCRIPTION =
  "Update harga crypto, forex, dan berita pasar terkini secara real-time.";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://marketupdate.example.com";

interface BuildMetadataOptions {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  keywords?: string[];
}

export function buildMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = "/",
  image,
  type = "website",
  publishedTime,
  keywords,
}: BuildMetadataOptions): Metadata {
  const url = new URL(path, SITE_URL).toString();
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type,
      ...(publishedTime ? { publishedTime } : {}),
      ...(image ? { images: [{ url: new URL(image, SITE_URL).toString() }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(image ? { images: [new URL(image, SITE_URL).toString()] } : {}),
    },
  };
}

export { SITE_NAME, SITE_DESCRIPTION };
