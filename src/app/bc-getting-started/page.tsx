import type { Metadata } from 'next';
import GettingStartedPage from '@/components/GettingStartedPage';

export const metadata: Metadata = {
  title: 'Brian Chongtoua | Private Soccer Specialist — Getting Started',
  description: 'Getting started guide for Brian Chongtoua players. Join Anytime Soccer Training with your team code and start training today.',
};

export default function BCGettingStartedPage() {
  return (
    <GettingStartedPage
      teamName="Brian Chongtoua | Private Soccer Specialist"
      teamCode="bctraining03182026"
    />
  );
}
