import type { Metadata } from 'next';
import Link from 'next/link';
import CollapsibleFAQ from '@/components/CollapsibleFAQ';
import { ONBOARDING_FAQ } from '@/data/onboardingFaq';

export const metadata: Metadata = {
  title: 'FAQ | Anytime Soccer Training',
  description: 'Frequently asked questions about onboarding your team with Anytime Soccer Training.',
};

export default function OnboardingFaqPage() {
  return (
    <section className="py-16 bg-background min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-navy px-8 py-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-block bg-red text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full">
                FAQ
              </span>
              <Link
                href="/pre-onboarding"
                className="inline-flex items-center gap-1 bg-red text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full hover:bg-red-dark transition-colors"
              >
                🏠 Home
              </Link>
            </div>
            <h1 className="text-white text-2xl font-extrabold">Frequently Asked Questions</h1>
          </div>

          <div className="px-8 py-8">
            {ONBOARDING_FAQ.length > 0 ? (
              <CollapsibleFAQ items={ONBOARDING_FAQ} />
            ) : (
              <p className="text-gray-700">More questions coming soon.</p>
            )}

            <div className="flex justify-center mt-8">
              <Link
                href="/pre-onboarding"
                className="inline-block bg-navy hover:bg-navy-light text-white font-bold py-2.5 px-8 rounded-xl transition-colors"
              >
                ← Back to Onboarding Portal
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-navy rounded-2xl px-8 py-8 text-center text-white">
          <h3 className="text-lg font-bold mb-4">Questions? We&rsquo;re Here to Help!</h3>
          <div className="flex flex-col items-center gap-2">
            <span className="font-semibold text-base">Megan Chambers</span>
            <span className="text-white/70 text-sm">Team Success Manager</span>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mt-3">
              <a href="mailto:megan@anytime-soccer.com" className="text-white/90 hover:text-white text-sm">
                megan@anytime-soccer.com
              </a>
              <a href="tel:803-431-1028" className="text-white/90 hover:text-white text-sm">
                (M) 803-431-1028
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
