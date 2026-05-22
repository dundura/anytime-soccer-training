import type { Metadata } from 'next';
import MemorialDaySaleClient from './MemorialDaySaleClient';

export const metadata: Metadata = {
  title: 'Memorial Day Sale — 50% Off',
  description: 'Memorial Day Weekend Sale — get 50% off Anytime Soccer Training. 5,000+ follow-along soccer videos. Join free, upgrade and save.',
};

export default function MemorialDaySalePage() {
  return <MemorialDaySaleClient />;
}
