import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/posts";
import { getCatchAllSlugs } from "@/lib/pages";

const BASE = "https://www.anytime-soccer.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogSlugs = getAllSlugs();
  const catchAllSlugs = getCatchAllSlugs();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    ...[
      "pricing", "how-it-works", "for-coaches", "compare",
    ].map((p) => ({
      url: `${BASE}/${p}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...[
      "programs/ball-mastery", "programs/juggling", "programs/dribbling",
      "programs/wall-passing", "programs/1v1-finishing",
    ].map((p) => ({
      url: `${BASE}/${p}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...[
      "blog", "camps", "contact", "faq", "podcast", "merch",
      "free-training-plan", "free-resource-hub", "free-soccer-drills-for-kids",
      "for-coaches-learn", "club-partnership", "getting-started",
      "getting-started-guide-for-parents-anytime-soccer-training",
      "coach-onboarding", "homework", "install", "our-picks",
      "guest-playing-guide", "dribbling-program", "elite-academy-report",
      "must-have-guide-for-serious-soccer-parents", "follow-us",
      "creating-an-account", "soccer-training-survey",
      "competitions-worksheet", "tournament-budget-worksheet",
      "soccer-club-cost-calculator", "coach-salary-schedule",
    ].map((p) => ({
      url: `${BASE}/${p}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const catchAllPages: MetadataRoute.Sitemap = catchAllSlugs.map((slug) => ({
    url: `${BASE}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticPages, ...blogPages, ...catchAllPages];
}
