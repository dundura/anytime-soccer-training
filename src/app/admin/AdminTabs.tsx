"use client";

import { useState } from "react";
import AdminTable from "./AdminTable";
import BlogPostsAdmin from "./BlogPostsAdmin";

type Entry = { type: "Static" | "Page" | "Blog"; title: string; url: string; date: string };
type Image = { url: string; sources: string[]; domain: string };
type Post = { slug: string; title: string; date: string; categories: string[]; excerpt: string };

const TAB_STYLE = (active: boolean): React.CSSProperties => ({
  padding: "10px 22px",
  fontSize: 14,
  fontWeight: active ? 700 : 500,
  color: active ? "#0F3154" : "#94a3b8",
  background: "none",
  border: "none",
  borderBottom: active ? "2px solid #0F3154" : "2px solid transparent",
  marginBottom: -2,
  cursor: "pointer",
  fontFamily: "inherit",
  whiteSpace: "nowrap",
});

export default function AdminTabs({ entries, images, posts }: { entries: Entry[]; images: Image[]; posts: Post[] }) {
  const [tab, setTab] = useState<"pages" | "blog">("pages");

  return (
    <>
      <div style={{ borderBottom: "2px solid #E1E8EF", marginBottom: 24, display: "flex" }}>
        <button style={TAB_STYLE(tab === "pages")} onClick={() => setTab("pages")}>
          Pages & Images
        </button>
        <button style={TAB_STYLE(tab === "blog")} onClick={() => setTab("blog")}>
          Blog Posts ({posts.length})
        </button>
      </div>

      {tab === "pages" && <AdminTable entries={entries} images={images} />}
      {tab === "blog" && <BlogPostsAdmin posts={posts} />}
    </>
  );
}
