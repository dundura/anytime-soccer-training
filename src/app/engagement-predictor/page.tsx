import EngagementPredictor from '@/components/EngagementPredictor';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Coach Engagement Predictor | Anytime Soccer Training',
  description: 'Select the engagement tasks you commit to and get your predicted coaching engagement score.',
};

export default function EngagementPredictorPage() {
  return <EngagementPredictor />;
}
