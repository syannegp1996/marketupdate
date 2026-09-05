import ArticleCard from "@/components/ArticleCard";
import { getAllArticles } from "@/lib/articles";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Artikel",
  description: "Kumpulan artikel analisis dan berita pasar crypto serta forex.",
  path: "/artikel",
});

export default function ArtikelListPage() {
  const articles = getAllArticles();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">Semua Artikel</h1>
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <p className="text-slate-500">
          Belum ada artikel. Tambahkan file .md atau .mdx di folder{" "}
          <code className="text-slate-300">content/articles</code>.
        </p>
      )}
    </div>
  );
}
