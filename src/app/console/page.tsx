import type { Metadata } from 'next';
import Console from '@/components/Console';

export const metadata: Metadata = {
  title: 'Console',
  description: 'Admin console.',
  robots: { index: false, follow: false },
};

export default function ConsolePage() {
  return <Console />;
}
