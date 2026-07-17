import type { Metadata } from 'next';
import OnboardingPortal from '@/components/OnboardingPortal';

export const metadata: Metadata = {
  title: 'Onboarding Portal | Anytime Soccer Training',
  description: 'Sign in and work through your team onboarding step by step.',
  robots: { index: false, follow: false },
};

export default function OnboardingPortalPage() {
  return <OnboardingPortal />;
}
