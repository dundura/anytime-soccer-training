import type { Metadata } from 'next';
import AdminTable from './AdminTable';
import pagesData from '@/data/pages.json';
import postsData from '@/data/posts.json';

export const metadata: Metadata = {
  title: 'Admin - All Pages',
  robots: { index: false, follow: false },
};

const STATIC_ROUTES = [
  { title: 'Home', slug: '/' },
  { title: 'Pricing', slug: '/pricing' },
  { title: 'How It Works', slug: '/how-it-works' },
  { title: 'For Coaches', slug: '/for-coaches' },
  { title: 'Blog', slug: '/blog' },
  { title: 'FAQ', slug: '/faq' },
  { title: 'Club Partnership', slug: '/club-partnership' },
  { title: 'Coach Onboarding', slug: '/coach-onboarding' },
  { title: 'Compare', slug: '/compare' },
  { title: 'Creating an Account', slug: '/creating-an-account' },
  { title: 'Dribbling Program', slug: '/dribbling-program' },
  { title: 'Free Resource Hub', slug: '/free-resource-hub' },
  { title: 'Free Soccer Drills for Kids', slug: '/free-soccer-drills-for-kids' },
  { title: 'Guest Playing Guide', slug: '/guest-playing-guide' },
  { title: 'Homework', slug: '/homework' },
  { title: 'Merch', slug: '/merch' },
  { title: 'Must-Have Guide for Soccer Parents', slug: '/must-have-guide-for-serious-soccer-parents' },
  { title: 'Our Picks', slug: '/our-picks' },
  { title: 'Podcast', slug: '/podcast' },
  { title: 'Rec Coach Guide', slug: '/rec-coach-guide' },
  { title: 'Resources', slug: '/resources' },
  { title: 'Team Demo Request', slug: '/team-demo-request-anytime-soccer-training' },
  { title: 'Ball Mastery Program', slug: '/programs/ball-mastery' },
  { title: 'Juggling Program', slug: '/programs/juggling' },
  { title: 'Dribbling', slug: '/programs/dribbling' },
  { title: '1v1 Finishing', slug: '/programs/1v1-finishing' },
  { title: 'Wall Passing', slug: '/programs/wall-passing' },
];

interface AdminPageEntry {
  type: 'Static' | 'Page' | 'Blog';
  title: string;
  url: string;
  date: string;
}

export default function AdminPage() {
  const entries: AdminPageEntry[] = [
    ...STATIC_ROUTES.map((r) => ({
      type: 'Static' as const,
      title: r.title,
      url: r.slug,
      date: '',
    })),
    ...(pagesData as { title: string; slug: string; date: string }[]).map((p) => ({
      type: 'Page' as const,
      title: p.title,
      url: `/${p.slug}`,
      date: p.date || '',
    })),
    ...(postsData as { title: string; slug: string; date: string }[]).map((p) => ({
      type: 'Blog' as const,
      title: p.title,
      url: `/blog/${p.slug}`,
      date: p.date || '',
    })),
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-navy mb-2">All Pages</h1>
        <p className="text-gray mb-6">{entries.length} total pages across the site</p>
        <AdminTable entries={entries} />
      </div>
    </div>
  );
}
