import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { getAllArticles } from "@/lib/articles";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "MarketUpdate",
  description:
    "Pantau harga crypto dan forex secara real-time, lengkap dengan artikel analisis pasar terbaru.",
  path: "/",
});

export default function HomePage() {
  const articles = getAllArticles().slice(0, 3);

  return (
    <div className="space-y-12">
      <section className="text-center py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Update Pasar Crypto &amp; Forex Real-Time
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Pantau pergerakan harga Bitcoin, Ethereum, dan mata uang dunia langsung
          dari header, serta baca analisis pasar terbaru dari tim kami.
        </p>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Artikel Terbaru</h2>
          <Link href="/artikel" className="text-sm text-brand-accent hover:underline">
            Lihat semua &rarr;
          </Link>
        </div>
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <p className="text-slate-500">Belum ada artikel.</p>
        )}
      </section>
    </div>
  );
}
