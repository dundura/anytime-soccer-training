"use client";

import { useState, useEffect, useMemo } from "react";

interface Post {
  slug: string;
  title: string;
  date: string;
  categories: string[];
  excerpt: string;
}

interface Status {
  posted: boolean;
  postedAt: string | null;
}

export default function BlogPostsAdmin({ posts }: { posts: Post[] }) {
  const [statuses, setStatuses] = useState<Record<string, Status>>({});
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "posted" | "unposted">("all");
  const [toggling, setToggling] = useState<string | null>(null);

  const STORAGE_KEY = "ast_blog_post_statuses";

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setStatuses(JSON.parse(saved));
    } catch {}
  }, []);

  const toggle = (slug: string) => {
    const current = statuses[slug]?.posted ?? false;
    setToggling(slug);
    const updated = { ...statuses, [slug]: { posted: !current, postedAt: !current ? new Date().toISOString() : null } };
    setStatuses(updated);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch {}
    setToggling(null);
  };

  const filtered = useMemo(() => {
    let list = posts;
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p => p.title.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q));
    }
    if (filter === "posted") list = list.filter(p => statuses[p.slug]?.posted);
    if (filter === "unposted") list = list.filter(p => !statuses[p.slug]?.posted);
    return list;
  }, [posts, search, filter, statuses]);

  const postedCount = posts.filter(p => statuses[p.slug]?.posted).length;

  return (
    <div style={{ marginTop: 48 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0F3154", margin: 0 }}>Blog Posts</h2>
          <p style={{ fontSize: 13, color: "#94a3b8", margin: "4px 0 0" }}>
            {postedCount} posted · {posts.length - postedCount} unposted · {posts.length} total
          </p>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search posts…"
            style={{ border: "1px solid #E1E8EF", borderRadius: 8, padding: "7px 12px", fontSize: 13, outline: "none", color: "#0F3154", width: 200 }}
          />
          {(["all", "posted", "unposted"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ padding: "7px 14px", borderRadius: 8, border: "1px solid #E1E8EF", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                background: filter === f ? "#0F3154" : "#fff", color: filter === f ? "#fff" : "#64748b" }}>
              {f === "all" ? "All" : f === "posted" ? "✓ Posted" : "○ Unposted"}
            </button>
          ))}
        </div>
      </div>

      <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E1E8EF", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8fafc", borderBottom: "1px solid #E1E8EF" }}>
              <th style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em" }}>Status</th>
              <th style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em" }}>Title</th>
              <th style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em" }}>Date</th>
              <th style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em" }}>Posted At</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={4} style={{ padding: "32px 16px", textAlign: "center", color: "#94a3b8", fontSize: 14 }}>No posts match.</td></tr>
            ) : filtered.map((p, i) => {
              const s = statuses[p.slug];
              const isPosted = s?.posted ?? false;
              return (
                <tr key={p.slug} style={{ borderBottom: i < filtered.length - 1 ? "1px solid #f1f5f9" : "none" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#fafafa")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                >
                  <td style={{ padding: "10px 16px" }}>
                    <button
                      onClick={() => toggle(p.slug)}
                      disabled={toggling === p.slug}
                      style={{
                        padding: "5px 14px", borderRadius: 20, border: "none", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                        background: isPosted ? "#f0fdf4" : "#f1f5f9",
                        color: isPosted ? "#16a34a" : "#94a3b8",
                        opacity: toggling === p.slug ? 0.6 : 1,
                        minWidth: 80,
                      }}
                    >
                      {isPosted ? "✓ Posted" : "Mark Posted"}
                    </button>
                  </td>
                  <td style={{ padding: "10px 16px" }}>
                    <a href={`/blog/${p.slug}`} target="_blank" rel="noopener noreferrer"
                      style={{ fontSize: 13, fontWeight: 600, color: "#0F3154", textDecoration: "none" }}
                      onMouseEnter={e => ((e.target as HTMLElement).style.textDecoration = "underline")}
                      onMouseLeave={e => ((e.target as HTMLElement).style.textDecoration = "none")}
                    >
                      {p.title}
                    </a>
                  </td>
                  <td style={{ padding: "10px 16px", fontSize: 12, color: "#64748b", whiteSpace: "nowrap" }}>
                    {p.date ? new Date(p.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"}
                  </td>
                  <td style={{ padding: "10px 16px", fontSize: 12, color: "#94a3b8", whiteSpace: "nowrap" }}>
                    {s?.postedAt ? new Date(s.postedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
