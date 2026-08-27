import type { Metadata } from 'next';
import PartnerDashboard from '@/components/PartnerDashboard';

export const metadata: Metadata = {
  title: 'Partner Dashboard',
  // Nobody should find this in a search result: the token in the URL is the
  // only thing protecting one partner's numbers from another's.
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function Page({ searchParams }: { searchParams: Promise<{ t?: string }> }) {
  const { t } = await searchParams;
  return <PartnerDashboard token={t || ''} />;
}
