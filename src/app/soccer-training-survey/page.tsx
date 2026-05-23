import SurveyForm from '@/components/SurveyForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Much Does Your Child Train? | Anytime Soccer Training',
  description: 'Take our free 2-minute survey and find out how your child\'s soccer training compares to other players their age. Get a personalized PDF report.',
};

export default function SurveyPage() {
  return (
    <main>
      <SurveyForm />
    </main>
  );
}
