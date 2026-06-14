const BASE = "https://www.anytime-soccer.com";

interface VideoEntry {
  path: string;
  videoId: string;
  title: string;
  description: string;
  uploadDate: string;
}

const VIDEOS: VideoEntry[] = [
  {
    path: "/how-it-works",
    videoId: "fkHIe88Cwqo",
    title: "How Anytime Soccer Training Works",
    description: "See how players use Anytime Soccer Training to follow structured programs at home. Set a goal, pin a plan, press play.",
    uploadDate: "2024-01-01",
  },
  {
    path: "/for-coaches",
    videoId: "LOv6Jbk8Bac",
    title: "Coach Review of Anytime Soccer Training",
    description: "A real coach's review of Anytime Soccer Training — how it helps teams assign homework, track progress, and develop players between practices.",
    uploadDate: "2024-01-01",
  },
  {
    path: "/compare",
    videoId: "0hjcAaHnUic",
    title: "Free Anytime Soccer Training Session",
    description: "Watch a full follow-along Anytime Soccer Training session. Unlike YouTube, every session includes timers, demos, and structured progression.",
    uploadDate: "2024-01-01",
  },
  {
    path: "/pricing",
    videoId: "HsoTlfJn-RA",
    title: "Anytime Soccer Training App Features",
    description: "Overview of what's included in Anytime Soccer Training — 5,000+ follow-along videos, coach tools, progress tracking, and structured plans.",
    uploadDate: "2024-01-01",
  },
  {
    path: "/creating-an-account",
    videoId: "Vd2IkI3bQdM",
    title: "How to Create an Anytime Soccer Training Account",
    description: "Step-by-step guide to creating your Anytime Soccer Training account and getting started with your first training plan.",
    uploadDate: "2024-01-01",
  },
  {
    path: "/dribbling-program",
    videoId: "ZnnUJgu4XJs",
    title: "Soccer Dribbling Training Program",
    description: "Structured follow-along dribbling program with 1v1 moves, cone drills, and freestyle skills for youth soccer players.",
    uploadDate: "2024-01-01",
  },
  {
    path: "/homework",
    videoId: "y16pec7IIFQ",
    title: "How Coaches Assign Soccer Homework",
    description: "See how coaches use Anytime Soccer Training to assign video homework, monitor completion, and track player progress.",
    uploadDate: "2024-01-01",
  },
  {
    path: "/getting-started-guide-for-parents-anytime-soccer-training",
    videoId: "hYRoOMLeiD8",
    title: "Getting Started Guide for Parents — Anytime Soccer Training",
    description: "A complete guide for parents on setting up Anytime Soccer Training for their player, choosing a plan, and tracking progress.",
    uploadDate: "2024-01-01",
  },
];

function escape(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function GET() {
  const entries = VIDEOS.map(
    (v) => `  <url>
    <loc>${BASE}${v.path}</loc>
    <video:video>
      <video:thumbnail_loc>https://img.youtube.com/vi/${v.videoId}/maxresdefault.jpg</video:thumbnail_loc>
      <video:title>${escape(v.title)}</video:title>
      <video:description>${escape(v.description)}</video:description>
      <video:player_loc>https://www.youtube.com/embed/${v.videoId}</video:player_loc>
      <video:publication_date>${v.uploadDate}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
    </video:video>
  </url>`
  ).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${entries}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
