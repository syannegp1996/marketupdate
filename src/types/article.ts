export interface ArticleFrontmatter {
  title: string;
  date: string;
  category: string;
  summary: string;
  author?: string;
  cover?: string;
}

export interface ArticleMeta extends ArticleFrontmatter {
  slug: string;
}

export interface Article extends ArticleMeta {
  content: string;
}
