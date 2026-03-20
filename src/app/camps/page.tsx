import type { Metadata } from 'next';
import CampsContent from './CampsContent';

export const metadata: Metadata = {
  title: 'Summer Camp Program | Anytime Soccer Training',
  description: 'Give your campers access to 5,000+ follow-along soccer training videos. $5/player. Manage their experience during camp and beyond.',
};

export default function CampsPage() {
  return <CampsContent />;
}
