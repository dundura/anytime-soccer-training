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

const COVER_IMAGES = [
  'https://anytime-soccer.com/wp-content/uploads/2026/02/news_soccer08_16-9-ratio.webp',
  'https://anytime-soccer.com/wp-content/uploads/2026/02/ecln_boys.jpg',
  'https://anytime-soccer.com/wp-content/uploads/2026/02/ecnl_girls.jpg',
  'https://anytime-soccer.com/wp-content/uploads/2026/01/idf.webp',
  'https://anytime-soccer.com/wp-content/uploads/2026/02/futsal-scaled.jpg',
];

function getCover(featuredImage: string | undefined, index: number) {
  return featuredImage || COVER_IMAGES[index % COVER_IMAGES.length];
}

function getExcerpt(content: string, maxLength = 140): string {
  const stripped = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  if (stripped.length <= maxLength) return stripped;
  return stripped.substring(0, maxLength).replace(/\s\S*$/, '') + '...';
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
  const [showAll, setShowAll] = useState(false);

  const posts = postsData as Post[];
  const categories = (categoriesData as string[]).sort();

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      if (category && !p.categories.includes(category)) return false;
      if (search) {
        const q = search.toLowerCase();
        const excerpt = p.excerpt || getExcerpt(p.content);
        if (
          !p.title.toLowerCase().includes(q) &&
          !excerpt.toLowerCase().includes(q) &&
          !p.categories.some((c) => c.toLowerCase().includes(q))
        ) return false;
      }
      return true;
    });
  }, [search, category, posts]);

  const displayPosts = showAll ? filtered : filtered.slice(0, 12);

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
          {filtered.length > 12 && (
            <div className="mt-4">
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-sm font-semibold text-white/80 hover:text-white transition-colors"
              >
                {showAll ? '← Show Less' : 'View All Articles →'}
              </button>
            </div>
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
        ) : showAll ? (
          <div className="divide-y divide-gray-200">
            {filtered.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex items-center gap-4 py-4 hover:bg-background/50 transition-colors -mx-2 px-2 rounded-lg"
              >
                {post.featuredImage && (
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-20 h-14 rounded-lg object-cover shrink-0 hidden sm:block"
                    loading="lazy"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-white bg-red px-2 py-0.5 rounded">{post.categories[0]}</span>
                    <span className="text-xs text-gray">{formatDate(post.date)}</span>
                    <span className="text-xs text-gray">&middot;</span>
                    <span className="text-xs text-gray">{getReadTime(post.content)}</span>
                  </div>
                  <h3 className="text-sm font-bold text-navy group-hover:text-red transition-colors truncate">
                    {post.title}
                  </h3>
                  <p className="text-gray text-xs line-clamp-1 mt-0.5 hidden sm:block">{post.excerpt || getExcerpt(post.content)}</p>
                </div>
                <svg className="w-4 h-4 text-gray group-hover:text-red transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayPosts.map((post, i) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group block bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <div className="relative">
                  <img
                    src={getCover(post.featuredImage, i)}
                    alt={post.title}
                    className="w-full h-44 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="text-xs font-bold text-white bg-red px-2 py-0.5 rounded">{post.categories[0]}</span>
                    <h3 className="text-base font-bold mt-1.5 text-white leading-snug line-clamp-2 drop-shadow-sm">
                      {post.title}
                    </h3>
                  </div>
                </div>
                <div className="p-4 pt-3">
                  <p className="text-gray text-sm line-clamp-2">{post.excerpt || getExcerpt(post.content)}</p>
                  <div className="flex items-center gap-3 text-xs text-gray mt-2">
                    <span>{formatDate(post.date)}</span>
                    <span>&middot;</span>
                    <span>{getReadTime(post.content)} read</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
