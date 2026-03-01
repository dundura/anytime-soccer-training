import postsData from '@/data/posts.json';
import categoriesData from '@/data/categories.json';

export interface Post {
  id: string;
  title: string;
  slug: string;
  date: string;
  content: string;
  excerpt: string;
  categories: string[];
  tags: string[];
  thumbnailId: string;
  featuredImage: string;
}

export function getAllPosts(): Post[] {
  return postsData as Post[];
}

export function getPostBySlug(slug: string): Post | undefined {
  return (postsData as Post[]).find((p) => p.slug === slug);
}

export function getPostsByCategory(category: string): Post[] {
  return (postsData as Post[]).filter((p) => p.categories.includes(category));
}

export function getAllCategories(): string[] {
  return categoriesData as string[];
}

export function getAllSlugs(): string[] {
  return (postsData as Post[]).map((p) => p.slug);
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getExcerpt(content: string, maxLength = 160): string {
  const cleaned = content
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, '')
    .replace(/\[[\w_]+[^\]]*\][\s\S]*?\[\/[\w_]+\]/g, '')
    .replace(/\[[\w_]+[^\]]*\/?\]/g, '')
    .replace(/\/\/<!\[CDATA\[[\s\S]*?\]\]>/g, '')
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (!cleaned) return '';
  if (cleaned.length <= maxLength) return cleaned;
  return cleaned.substring(0, maxLength).replace(/\s\S*$/, '') + '...';
}
