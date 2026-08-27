import type { Metadata } from 'next';
import PartnerLanding from '@/components/PartnerLanding';

const API = 'https://api.anytime-soccer.com';

export const metadata: Metadata = {
  title: 'Anytime Soccer Training — Recommended for your player',
  description: 'Short, structured soccer sessions players follow at home, plus the tools coaches need to assign work and see who did it.',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

type Landing = { found: boolean; name?: string | null; organization?: string | null; hasDiscount?: boolean; percent?: number };

export default async function PartnerLandingPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const safe = /^[A-Za-z0-9]{1,48}$/.test(code || '') ? code : '';

  let partner: Landing = { found: false };
  if (safe) {
    try {
      const res = await fetch(`${API}/partner-program/landing/${safe}`, { cache: 'no-store' });
      if (res.ok) partner = await res.json();
    } catch {
      // The page still works without it — it just loses the partner's name.
    }
  }

  return <PartnerLanding partner={partner} code={safe} />;
}
