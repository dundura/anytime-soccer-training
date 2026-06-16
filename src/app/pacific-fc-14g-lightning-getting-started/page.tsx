import type { Metadata } from 'next';
import GettingStartedPage from '@/components/GettingStartedPage';

export const metadata: Metadata = {
  title: 'Pacific FC 14G Lightning – Getting Started with Anytime Soccer Training',
  description: 'Step-by-step guide for Pacific FC 14G Lightning players and parents to create an account, enter your team code, and start training.',
};

export default function PacificFC14GLightningGettingStarted() {
  return (
    <GettingStartedPage
      teamName="Pacific FC 14G Lightning"
      teamCode="pacificfc06062026"
    />
  );
}
