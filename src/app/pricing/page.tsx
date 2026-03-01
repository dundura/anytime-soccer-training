import type { Metadata } from 'next';
import PricingContent from './PricingContent';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Anytime Soccer Training pricing plans. Free Forever, All Access, and Teams plans available.',
};

export default function PricingPage() {
  return <PricingContent />;
}
