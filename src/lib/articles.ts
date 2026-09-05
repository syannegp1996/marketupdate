import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Article, ArticleFrontmatter, ArticleMeta } from "@/types/article";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");
const VALID_EXTENSIONS = [".md", ".mdx"];

function getArticleFilenames(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((file) => VALID_EXTENSIONS.includes(path.extname(file)));
}

function slugFromFilename(filename: string): string {
  return filename.replace(/\.mdx?$/, "");
}

export function getAllSlugs(): string[] {
  return getArticleFilenames().map(slugFromFilename);
}

export function getAllArticles(): ArticleMeta[] {
  const articles = getArticleFilenames().map((filename) => {
    const slug = slugFromFilename(filename);
    const fullPath = path.join(ARTICLES_DIR, filename);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(raw);
    const frontmatter = data as ArticleFrontmatter;

    return {
      slug,
      title: frontmatter.title ?? slug,
      date: frontmatter.date ?? "",
      category: frontmatter.category ?? "Umum",
      summary: frontmatter.summary ?? "",
      author: frontmatter.author,
      cover: frontmatter.cover,
    };
  });

  return articles.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticleBySlug(slug: string): Article | null {
  const mdPath = path.join(ARTICLES_DIR, `${slug}.md`);
  const mdxPath = path.join(ARTICLES_DIR, `${slug}.mdx`);
  const fullPath = fs.existsSync(mdxPath) ? mdxPath : mdPath;

  if (!fs.existsSync(fullPath)) return null;

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as ArticleFrontmatter;

  return {
    slug,
    title: frontmatter.title ?? slug,
    date: frontmatter.date ?? "",
    category: frontmatter.category ?? "Umum",
    summary: frontmatter.summary ?? "",
    author: frontmatter.author,
    cover: frontmatter.cover,
    content,
  };
}

export function getAllCategories(): string[] {
  const categories = new Set(getAllArticles().map((article) => article.category));
  return Array.from(categories);
}
