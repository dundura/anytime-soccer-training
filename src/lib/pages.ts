import pagesData from '@/data/pages.json';

export interface WPPage {
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

// Slugs that have dedicated routes — excluded from catch-all
const DEDICATED_ROUTES = new Set([
  'home-page',
  'pricing',
  'how-it-works',
  'our-programs',
  'program-page', // ball mastery
  'juggling',
  'dribbling',
  '1v1-finishing',
  'wall-passing',
  'resources',
  'the-inside-scoop-podcast-youth-soccer-tips-for-parents-coaches',
]);

export function getAllPages(): WPPage[] {
  return pagesData as WPPage[];
}

export function getCatchAllPages(): WPPage[] {
  return (pagesData as WPPage[]).filter((p) => !DEDICATED_ROUTES.has(p.slug));
}

export function getPageBySlug(slug: string): WPPage | undefined {
  return (pagesData as WPPage[]).find((p) => p.slug === slug);
}

export function getCatchAllSlugs(): string[] {
  return getCatchAllPages().map((p) => p.slug);
}
