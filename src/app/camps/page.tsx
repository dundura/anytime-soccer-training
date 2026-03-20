import type { Metadata } from 'next';
import CampsContent from './CampsContent';

export const metadata: Metadata = {
  title: 'Summer Camp Program | Anytime Soccer Training',
  description: 'Give your campers free access to 5,000+ follow-along soccer training videos. Manage their experience during camp and keep them training all year.',
};

export default function CampsPage() {
  return <CampsContent />;
}
