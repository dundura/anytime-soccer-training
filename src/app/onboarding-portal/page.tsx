import type { Metadata } from 'next';
import OnboardingPortal from '@/components/OnboardingPortal';

const OG_IMAGE = 'https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1784474398158-pbjc26.png';

export const metadata: Metadata = {
  title: 'Onboarding Portal | Anytime Soccer Training',
  description: 'Sign in and work through your team onboarding step by step.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Onboarding Portal | Anytime Soccer Training',
    description: 'Sign in and work through your team onboarding step by step.',
    images: [{ url: OG_IMAGE, width: 1731, height: 909 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [OG_IMAGE],
  },
};

export default function OnboardingPortalPage() {
  return <OnboardingPortal />;
}
