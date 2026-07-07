import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pre Onboarding | Anytime Soccer Training',
  description: "Before you start onboarding: send us your roster and pay your invoice.",
};

type ChecklistItem = { label: string; href?: string };

const PHASE_1_ITEMS: ChecklistItem[] = [
  { label: 'Book a demo.', href: '/get-started-steps/1' },
  { label: 'Send us your roster.', href: '/get-started-steps/2' },
  { label: 'Pay your invoice.', href: '/get-started-steps/3' },
];

const PHASE_2_ITEMS: ChecklistItem[] = [
  { label: 'Take the Coach Engagement Survey', href: '/get-started-steps/4' },
  { label: 'Create your account and add player profiles', href: '/get-started-steps/5' },
  { label: 'Create your team inside the app' },
  { label: 'Reply to Megan with your team name' },
  { label: 'Let Megan know once parents have been informed' },
  { label: "We'll invite your parents to join the team" },
  { label: "We'll send you and your parents helpful getting-started information" },
  { label: 'Neil will give you a call to walk through homework and other team features' },
];

export default function PreOnboardingPage() {
  return (
    <section className="py-16 bg-background min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-navy px-8 py-6">
            <span className="inline-block bg-red text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full mb-3">
              Pre Onboarding
            </span>
            <h1 className="text-white text-2xl font-extrabold">Pre Onboarding</h1>
          </div>

          <div className="px-8 py-8">
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to <strong className="text-navy font-semibold">Anytime Soccer Training</strong>! We&rsquo;re excited to get your team set up.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our onboarding site walks you through a streamlined process &mdash; answering questions along the way and setting your team up for strong engagement from day one.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Click <strong className="text-navy font-semibold">Next</strong> or the links to begin.
            </p>

            <h2 className="text-sm font-bold uppercase tracking-wide text-red mb-4">Pre Onboarding</h2>

            <ol className="space-y-5 mb-8">
              {PHASE_1_ITEMS.map((item, i) => (
                <li key={item.label} className="flex gap-4">
                  <span className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-navy text-white font-bold text-sm">
                    {i + 1}
                  </span>
                  {item.href ? (
                    <Link href={item.href} className="font-semibold text-navy hover:underline">
                      {item.label}
                    </Link>
                  ) : (
                    <p className="font-semibold text-navy">{item.label}</p>
                  )}
                </li>
              ))}
            </ol>

            <h2 className="text-sm font-bold uppercase tracking-wide text-red mb-4">Onboarding</h2>

            <ol className="space-y-5">
              {PHASE_2_ITEMS.map((item, i) => (
                <li key={item.label} className="flex gap-4">
                  <span className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-navy text-white font-bold text-sm">
                    {i + 1}
                  </span>
                  {item.href ? (
                    <Link href={item.href} className="font-semibold text-navy hover:underline">
                      {item.label}
                    </Link>
                  ) : (
                    <p className="font-semibold text-navy">{item.label}</p>
                  )}
                </li>
              ))}
            </ol>

            <div className="flex justify-center mt-8">
              <Link
                href="/get-started-steps/1"
                className="inline-block bg-navy hover:bg-navy-light text-white font-bold py-2.5 px-8 rounded-xl transition-colors"
              >
                Next →
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
