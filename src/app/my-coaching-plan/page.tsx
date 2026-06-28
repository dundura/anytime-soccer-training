import EngagementPredictor from '@/components/EngagementPredictor';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Coaching Plan | Anytime Soccer Training',
  description: 'Select the coaching tasks you commit to and get your personalized coaching plan.',
};

export default function EngagementPredictorPage() {
  return <EngagementPredictor />;
}
