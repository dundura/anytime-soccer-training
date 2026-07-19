import type { Metadata } from 'next';
import PlayerPortal from '@/components/PlayerPortal';

export const metadata: Metadata = {
  title: 'Player Portal | Anytime Soccer Training',
  description: 'Get started with Anytime Soccer Training — everything you need to start training from day one.',
};

export default function PlayerPortalPage() {
  return <PlayerPortal />;
}
