import Link from "next/link";
import type { ArticleMeta } from "@/types/article";

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <Link
      href={`/artikel/${article.slug}`}
      className="block rounded-lg border border-slate-800 bg-brand-panel p-5 hover:border-brand-accent/60 transition-colors"
    >
      <span className="inline-block rounded-full bg-brand-accent/10 text-brand-accent text-xs font-semibold px-3 py-1 mb-3">
        {article.category}
      </span>
      <h2 className="text-lg font-semibold text-white mb-2">{article.title}</h2>
      <p className="text-sm text-slate-400 mb-3 line-clamp-3">{article.summary}</p>
      <time className="text-xs text-slate-500" dateTime={article.date}>
        {formatDate(article.date)}
      </time>
    </Link>
  );
}
