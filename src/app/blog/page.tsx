'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import postsData from '@/data/posts.json';
import categoriesData from '@/data/categories.json';

interface Post {
  id: string;
  title: string;
  slug: string;
  date: string;
  content: string;
  excerpt: string;
  categories: string[];
  tags: string[];
  featuredImage: string;
}

const CARD_COLORS = [
  '#0F3154', // navy
  '#DC373E', // red
  '#1a4a7a', // navy-light
  '#2d6a4f', // forest green
  '#7b2d8e', // purple
  '#b85c1f', // burnt orange
  '#1b7a8a', // teal
  '#8b1a2b', // burgundy
];

function getCardColor(index: number) {
  return CARD_COLORS[index % CARD_COLORS.length];
}

function getExcerpt(content: string, maxLength = 140): string {
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

function getReadTime(content: string): string {
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} min`;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function BlogPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const POSTS_PER_PAGE = 12;

  const posts = postsData as Post[];
  const categories = (categoriesData as string[]).sort();

  const filtered = useMemo(() => {
    setPage(1);
    return posts.filter((p) => {
      if (category && !p.categories.includes(category)) return false;
      if (search) {
        const q = search.toLowerCase();
        const excerpt = getExcerpt(p.excerpt || p.content);
        if (
          !p.title.toLowerCase().includes(q) &&
          !excerpt.toLowerCase().includes(q) &&
          !p.categories.some((c) => c.toLowerCase().includes(q))
        ) return false;
      }
      return true;
    });
  }, [search, category, posts]);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const displayPosts = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  return (
    <>
      {/* Hero */}
      <div className="bg-navy text-white py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Blog</h1>
          <p className="text-white/70 max-w-2xl text-lg mb-6">
            Tips, drills, and advice for soccer players, parents, and coaches.
          </p>
          <div className="bg-white rounded-2xl shadow-lg p-2 flex flex-col sm:flex-row gap-2 max-w-3xl">
            <div className="relative flex-1">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-3.5 rounded-xl text-navy text-base placeholder:text-gray focus:outline-none"
              />
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-3.5 rounded-xl border border-gray-200 text-sm font-medium text-navy bg-background focus:outline-none cursor-pointer sm:w-52"
            >
              <option value="">All Categories</option>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          {search && (
            <p className="text-white/60 text-sm mt-3">{filtered.length} result{filtered.length !== 1 ? 's' : ''} for &ldquo;{search}&rdquo;</p>
          )}
          {filtered.length > POSTS_PER_PAGE && (
            <p className="text-white/60 text-sm mt-3">Page {page} of {totalPages}</p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-4">&#128269;</p>
            <p className="text-gray text-lg">No articles match your filters.</p>
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayPosts.map((post, i) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group block bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  <div
                    className="relative h-44 flex flex-col justify-end p-4"
                    style={{ backgroundColor: getCardColor((page - 1) * POSTS_PER_PAGE + i) }}
                  >
                    <span className="text-xs font-bold text-white bg-white/20 px-2 py-0.5 rounded w-fit">{post.categories[0]}</span>
                    <h3 className="text-base font-bold mt-1.5 text-white leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                  </div>
                  <div className="p-4 pt-3">
                    <p className="text-gray text-sm line-clamp-2">{getExcerpt(post.excerpt || post.content) || post.title}</p>
                    <div className="flex items-center gap-3 text-xs text-gray mt-2">
                      <span>{formatDate(post.date)}</span>
                      <span>&middot;</span>
                      <span>{getReadTime(post.content)} read</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-12">
                <button
                  onClick={() => { setPage(p => p - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  disabled={page === 1}
                  className="px-5 py-2.5 rounded-full font-semibold text-sm border-2 border-navy text-navy hover:bg-navy hover:text-white transition-all disabled:opacity-30 disabled:pointer-events-none"
                >
                  &larr; Previous
                </button>
                <span className="text-sm font-medium text-navy">
                  {page} / {totalPages}
                </span>
                <button
                  onClick={() => { setPage(p => p + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  disabled={page === totalPages}
                  className="px-5 py-2.5 rounded-full font-semibold text-sm border-2 border-navy text-navy hover:bg-navy hover:text-white transition-all disabled:opacity-30 disabled:pointer-events-none"
                >
                  Next &rarr;
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
