import type { Metadata } from "next";
import Header from "@/components/Header";
import { buildMetadata } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = buildMetadata({
  title: "MarketUpdate",
  description:
    "Update harga crypto, forex, dan berita pasar terkini secara real-time.",
  path: "/",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-brand-bg text-slate-100 antialiased">
        <Header />
        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
        <footer className="border-t border-slate-800 mt-16">
          <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-slate-500 text-center">
            © {new Date().getFullYear()} MarketUpdate. Data crypto dari CoinGecko,
            data forex dari fawazahmed0/currency-api.
          </div>
        </footer>
      </body>
    </html>
  );
}
