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

const PER_PAGE = 10;

const CARD_COLORS = [
  '#0F3154', '#DC373E', '#1a4a7a', '#2d6a4f', '#7b2d8e', '#b85c1f', '#1b7a8a', '#8b1a2b',
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
  const [viewAll, setViewAll] = useState(false);

  const posts = postsData as Post[];
  const categories = (categoriesData as string[]).sort();

  const filtered = useMemo(() => {
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

  const topCards = filtered.slice(0, 3);
  const topCardIds = new Set(topCards.map((p) => p.id));
  const remaining = filtered.filter((p) => !topCardIds.has(p.id));
  const totalPages = Math.ceil(remaining.length / PER_PAGE);
  const visibleRemaining = viewAll ? remaining : remaining.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>
      {/* ====== HERO SECTION ====== */}
      <div className="relative bg-navy overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-navy-light opacity-90" />
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ height: '60px' }}>
          <path fill="var(--color-background, #ECF1F7)" d="M0,60 C360,120 1080,0 1440,60 L1440,120 L0,120 Z" />
        </svg>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold text-white uppercase tracking-tight leading-tight mb-4">
            Soccer Blog
          </h1>
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto mb-10">
            Tips, drills, and advice for soccer players, parents, and coaches.
          </p>

          <div className="bg-white rounded-2xl sm:rounded-full shadow-2xl p-2 max-w-3xl mx-auto inline-flex flex-col sm:flex-row items-stretch">
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search articles..."
              className="px-5 py-3 sm:rounded-l-full text-sm text-navy placeholder:text-gray focus:outline-none min-w-0 flex-1 sm:border-r border-gray-200"
            />
            <select
              value={category}
              onChange={(e) => { setCategory(e.target.value); setPage(1); }}
              className="px-5 py-3 text-sm font-medium text-navy bg-transparent focus:outline-none cursor-pointer border-t sm:border-t-0 sm:border-r border-gray-200"
            >
              <option value="">All Categories</option>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <button
              type="button"
              className="px-8 py-3 rounded-xl sm:rounded-r-full sm:rounded-l-none bg-red text-white font-bold text-sm uppercase tracking-wide hover:bg-red-dark transition-colors whitespace-nowrap mt-1 sm:mt-0"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* ====== CONTENT ====== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-4">&#128269;</p>
            <p className="text-gray text-lg">No articles match your search.</p>
          </div>
        ) : (
          <>
            {/* ====== TOP 3 CARDS ====== */}
            {page === 1 && topCards.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-bold text-navy mb-3 uppercase tracking-wide flex items-center gap-2">
                  <span className="text-amber-500">&#9733;</span> Featured Articles
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {topCards.map((post, i) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="group flex flex-col bg-white rounded-2xl border border-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:shadow-[0_0_30px_rgba(59,130,246,0.25)] ring-1 ring-blue-200/50 overflow-hidden hover:-translate-y-0.5 transition-all duration-200 h-full"
                    >
                      <div
                        className="relative h-[200px] overflow-hidden flex flex-col justify-end p-4 bg-cover bg-top"
                        style={{
                          backgroundImage: post.featuredImage ? `linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 100%), url(${post.featuredImage})` : undefined,
                          backgroundColor: post.featuredImage ? undefined : getCardColor(i),
                        }}
                      >
                        <span className="text-xs font-bold text-white bg-white/20 px-2.5 py-1 rounded-full w-fit">{post.categories[0]}</span>
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="text-lg font-extrabold text-navy uppercase tracking-tight group-hover:text-red transition-colors mb-2 min-h-[3rem] line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-sm text-navy/70 line-clamp-2 mb-3 leading-relaxed">{getExcerpt(post.excerpt || post.content)}</p>
                        <div className="flex items-center gap-3 text-xs text-gray mt-auto">
                          <span>{formatDate(post.date)}</span>
                          <span>&middot;</span>
                          <span>{getReadTime(post.content)} read</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* ====== RESULTS COUNT ====== */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray font-medium">
                {remaining.length} article{remaining.length !== 1 ? 's' : ''} found
                {!viewAll && totalPages > 1 && <> &middot; Page {page} of {totalPages}</>}
              </p>
              {remaining.length > PER_PAGE && (
                <button
                  onClick={() => { setViewAll(!viewAll); setPage(1); }}
                  className="text-sm font-semibold text-red hover:text-red-dark transition-colors"
                >
                  {viewAll ? 'Show Pages' : 'View All'}
                </button>
              )}
            </div>

            {/* ====== NON-FEATURED ROWS ====== */}
            <div className="space-y-3">
              {visibleRemaining.map((post, i) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex bg-white rounded-xl border border-gray-200 hover:border-red/30 hover:shadow-lg transition-all overflow-hidden"
                >
                  <div className="w-1.5 bg-red self-stretch flex-shrink-0 rounded-l-xl" />
                  <div className="flex items-center justify-center flex-shrink-0 p-2 sm:p-4">
                    <div
                      className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-lg overflow-hidden flex items-center justify-center bg-cover bg-center"
                      style={{
                        backgroundImage: post.featuredImage ? `url(${post.featuredImage})` : undefined,
                        backgroundColor: post.featuredImage ? undefined : getCardColor(i),
                      }}
                    >
                      {!post.featuredImage && (
                        <svg className="w-8 h-8 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start gap-5 sm:gap-6 flex-1 min-w-0 p-5 sm:p-6">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 mb-2">
                        <span className="px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-semibold">{post.categories[0]}</span>
                        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray text-xs font-medium">{getReadTime(post.content)} read</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl md:text-[1.75rem] font-extrabold text-navy uppercase tracking-tight leading-tight group-hover:text-red transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-xs text-gray mt-1">{formatDate(post.date)}</p>
                      <p className="text-sm text-navy mt-2.5 line-clamp-2 hidden sm:block leading-relaxed">
                        {getExcerpt(post.excerpt || post.content, 200)}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center justify-center w-14 md:w-16 flex-shrink-0 bg-navy group-hover:bg-red transition-colors self-stretch rounded-r-xl">
                    <span className="text-white text-2xl font-light">&#8250;</span>
                  </div>
                </Link>
              ))}
            </div>

            {/* ====== PAGINATION ====== */}
            {!viewAll && totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => { setPage(Math.max(1, page - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  &larr; Prev
                </button>
                {(() => {
                  const start = Math.max(1, Math.min(page - 4, totalPages - 9));
                  const end = Math.min(totalPages, start + 9);
                  return Array.from({ length: end - start + 1 }, (_, i) => start + i).map((p) => (
                    <button
                      key={p}
                      onClick={() => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className={`w-10 h-10 rounded-xl text-sm font-medium transition-colors ${
                        p === page ? 'bg-navy text-white' : 'border border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {p}
                    </button>
                  ));
                })()}
                <button
                  onClick={() => { setPage(Math.min(totalPages, page + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
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
