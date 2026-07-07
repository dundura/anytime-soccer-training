import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pre Onboarding | Anytime Soccer Training',
  description: "Before you start onboarding: send us your roster and pay your invoice.",
};

const FULL_ONBOARDING_CHECKLIST = [
  'Take the Coach Engagement Survey',
  'Create your account and add player profiles',
  'Create your team inside the app',
  'Reply to Megan with your team name',
  'Let Megan know once parents have been informed',
  "We'll invite your parents to join the team",
  "We'll send you and your parents helpful getting-started information",
  'Neil will give you a call to walk through homework and other team features',
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
            <p className="text-gray-700 leading-relaxed mb-6">
              Welcome to <strong className="text-navy font-semibold">Anytime Soccer Training</strong>! We&rsquo;re so glad to have you on board.
              <br />
              You&rsquo;ll complete your onboarding through our step-by-step onboarding site. Here&rsquo;s what to expect:
            </p>

            <h2 className="text-sm font-bold uppercase tracking-wide text-red mb-4">Phase 1</h2>

            <ol className="space-y-5 mb-8">
              <li className="flex gap-4">
                <span className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-navy text-white font-bold text-sm">1</span>
                <p className="font-semibold text-navy">Send us your roster.</p>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-navy text-white font-bold text-sm">2</span>
                <p className="font-semibold text-navy">Pay your invoice.</p>
              </li>
            </ol>

            <h2 className="text-sm font-bold uppercase tracking-wide text-red mb-4">Phase 2</h2>

            <ol className="space-y-3">
              {FULL_ONBOARDING_CHECKLIST.map((item, i) => (
                <li key={item} className="flex items-start gap-3 text-gray-700">
                  <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-red text-white font-bold text-xs mt-0.5">
                    {i + 1}
                  </span>
                  <span>{item}</span>
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
