import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllSlugs, getArticleBySlug } from "@/lib/articles";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) {
    return buildMetadata({ title: "Artikel tidak ditemukan", path: `/artikel/${slug}` });
  }

  return buildMetadata({
    title: article.title,
    description: article.summary,
    path: `/artikel/${article.slug}`,
    type: "article",
    publishedTime: article.date,
    keywords: [article.category],
    image: article.cover,
  });
}

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

export default async function ArtikelDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto">
      <span className="inline-block rounded-full bg-brand-accent/10 text-brand-accent text-xs font-semibold px-3 py-1 mb-4">
        {article.category}
      </span>
      <h1 className="text-3xl font-bold text-white mb-3">{article.title}</h1>
      <time className="text-sm text-slate-500" dateTime={article.date}>
        {formatDate(article.date)}
      </time>
      <p className="text-slate-400 mt-4 mb-8 border-l-2 border-brand-accent pl-4">
        {article.summary}
      </p>
      <div className="prose-article">
        <MDXRemote source={article.content} />
      </div>
    </article>
  );
}
