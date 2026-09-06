import type { Metadata } from 'next';
import PartnerLanding from '@/components/PartnerLanding';
import { PARTNER_OG_IMAGES } from '@/lib/partnerBrand';

const API = 'https://api.anytime-soccer.com';

const SITE = 'https://www.anytime-soccer.com';
const TITLE = 'Anytime Soccer Training — Recommended for your player';
const DESCRIPTION =
  'Short, structured soccer sessions players follow at home, plus the tools coaches need to assign work and see who did it.';

/**
 * The share card is the partner's own badge where they have one.
 *
 * A referred link is nearly always pasted into a group chat or a post by the
 * partner themselves, so the preview should be the thing their audience
 * recognises. The card is a pre-built 1200x630 rather than the square logo:
 * platforms crop toward that shape, and a square mark dropped in raw loses its
 * edges.
 */
export async function generateMetadata({ params }: { params: Promise<{ code: string }> }): Promise<Metadata> {
  const { code } = await params;
  const key = /^[A-Za-z0-9]{1,48}$/.test(code || '') ? code.toUpperCase() : '';
  const og = PARTNER_OG_IMAGES[key];

  return {
    title: TITLE,
    description: DESCRIPTION,
    robots: { index: false, follow: false },
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      type: 'website',
      ...(og ? { images: [{ url: SITE + og, width: 1200, height: 630, alt: TITLE }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: TITLE,
      description: DESCRIPTION,
      ...(og ? { images: [SITE + og] } : {}),
    },
  };
}

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
