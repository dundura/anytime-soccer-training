import type { Metadata } from 'next';

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
              We&rsquo;re about to get started! You&rsquo;ll complete your onboarding through our step-by-step onboarding site. In the meantime, here&rsquo;s what to expect:
            </p>

            <ol className="space-y-5 mb-8">
              <li className="flex gap-4">
                <span className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-navy text-white font-bold text-sm">1</span>
                <div>
                  <p className="font-semibold text-navy">Send us your roster.</p>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    Fill in the roster template below and email it to <strong className="text-navy font-semibold">Megan Chambers</strong>. We&rsquo;ll use the player names and emails to invite parents &mdash; but we don&rsquo;t send any information to parents until you confirm you&rsquo;ve notified them.
                  </p>
                  <a
                    href="https://drive.google.com/drive/u/1/folders/1UPIjsWN0pkbryFxMselsTOs3Gs2voNqa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-red hover:bg-red-dark text-white text-sm font-semibold px-4 py-2 rounded-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Roster Template
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-navy text-white font-bold text-sm">2</span>
                <div>
                  <p className="font-semibold text-navy">Pay your invoice.</p>
                  <p className="text-gray-700 leading-relaxed">
                    Once we receive your roster, we&rsquo;ll generate your invoice. As soon as it&rsquo;s paid, onboarding begins &mdash; starting with the Coaching Plan Survey.
                  </p>
                </div>
              </li>
            </ol>

            <p className="text-gray-700 leading-relaxed mb-8 bg-gray-light border-l-4 border-red px-4 py-3 rounded">
              <strong className="text-navy">Parents don&rsquo;t pay anything.</strong> Each player is given a code that gives them full access to the program for 365 days.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4 font-semibold">
              Here&rsquo;s the full onboarding process, so you know what&rsquo;s ahead:
            </p>

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
