import type { Metadata } from 'next';
import GettingStartedPage from '@/components/GettingStartedPage';

export const metadata: Metadata = {
  title: 'PFC Tsunami 14G – Getting Started with Anytime Soccer Training',
  description: 'Step-by-step guide for PFC Tsunami 14G players and parents to create an account, enter your team code, and start training.',
};

export default function PFCTsunami14GGettingStarted() {
  return (
    <GettingStartedPage
      teamName="PFC Tsunami 14G"
      teamCode="pacificfc06062026"
    />
  );
}
