"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import postsData from "@/data/posts.json";
import categoriesData from "@/data/categories.json";

const CARD_COLORS = [
  "#0F3154", "#DC373E", "#1a4a7a", "#2d6a4f", "#7b2d8e", "#b85c1f", "#1b7a8a", "#8b1a2b",
];

interface Post {
  slug: string;
  title: string;
  date: string;
  categories: string[];
  featuredImage: string;
  content: string;
  excerpt: string;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default function HomeBlogSection() {
  const [category, setCategory] = useState("");

  const allPosts = (postsData as Post[])
    .filter((p) => p.title && p.date)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const categories = (categoriesData as string[]).sort();

  const displayPosts = useMemo(() => {
    const filtered = category
      ? allPosts.filter((p) => p.categories.includes(category))
      : allPosts;
    return filtered.slice(0, 3);
  }, [category, allPosts]);

  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12 flex-wrap gap-4">
          <h2 className="text-3xl md:text-4xl font-bold text-navy">Latest From The Blog</h2>
          <div className="flex items-center gap-4">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm font-medium text-navy bg-white focus:outline-none focus:border-navy cursor-pointer"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <Link href="/blog" className="text-red hover:text-red-dark font-semibold text-sm transition-colors hidden sm:block">
              View All Posts &rarr;
            </Link>
          </div>
        </div>
        {displayPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray text-lg">No posts in this category yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {displayPosts.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(15,49,84,0.08)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(15,49,84,0.12)] transition-all block group"
              >
                <div
                  className="w-full h-44 flex items-end p-4"
                  style={{ backgroundColor: CARD_COLORS[i % CARD_COLORS.length] }}
                >
                  {post.categories?.[0] && (
                    <span className="text-xs font-bold text-white bg-white/20 px-2 py-0.5 rounded">{post.categories[0]}</span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-navy text-lg mb-2 group-hover:text-red transition-colors line-clamp-2">{post.title}</h3>
                  <p className="text-xs text-gray mb-3">{formatDate(post.date)}</p>
                  <span className="text-red font-semibold text-sm">Read More &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        )}
        <div className="text-center mt-8 sm:hidden">
          <Link href="/blog" className="text-red hover:text-red-dark font-semibold text-sm transition-colors">
            View All Posts &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
