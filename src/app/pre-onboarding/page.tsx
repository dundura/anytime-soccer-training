import type { Metadata } from 'next';
import Link from 'next/link';
import CollapsibleChecklist from '@/components/CollapsibleChecklist';

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
  { label: 'Create your account and add profiles', href: '/get-started-steps/5' },
  { label: 'Create your team inside the app', href: '/get-started-steps/6' },
  { label: 'Making the most of your pricing', href: '/get-started-steps/7' },
  { label: 'Send parents the introduction email', href: '/get-started-steps/8' },
  { label: 'Reply to Megan with your team name', href: '/get-started-steps/9' },
  { label: 'Let Megan know once parents have been informed', href: '/get-started-steps/9' },
  { label: "We'll invite your parents to join the team", href: '/get-started-steps/10' },
  { label: "We'll send you and your parents helpful getting-started information", href: '/get-started-steps/10' },
  { label: 'Neil will give you a call to walk through homework and other team features', href: '/get-started-steps/10' },
];

const SELF_ONBOARDING_ITEMS: ChecklistItem[] = [
  { label: 'Create your account and add a profile for yourself and your child', href: '/get-started-steps/5' },
  { label: 'Create a team inside the app', href: '/get-started-steps/6' },
  { label: 'Click upgrade and purchase', href: '/get-started-steps/7' },
  { label: 'Complete the Coaching Plan Survey', href: '/get-started-steps/4' },
  { label: "We'll send you an invitation link to share with parents" },
  { label: 'Send parents the introduction email', href: '/get-started-steps/8' },
  { label: "We'll call to go over assigning homework and getting fully set up" },
];

const RENEWING_MEMBERS_ITEMS: ChecklistItem[] = [
  { label: 'Renewing members', href: '/get-started-steps/11' },
];

const FAQ_ITEMS: ChecklistItem[] = [
  { label: 'FAQ', href: '/get-started-faq' },
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

            <CollapsibleChecklist heading="Pre Onboarding" items={PHASE_1_ITEMS} />
            <CollapsibleChecklist heading="Onboarding" items={PHASE_2_ITEMS} />
            <CollapsibleChecklist heading="Self-Onboarding" items={SELF_ONBOARDING_ITEMS} />
            <CollapsibleChecklist heading="Renewing Members" items={RENEWING_MEMBERS_ITEMS} />
            <CollapsibleChecklist heading="Frequently Asked Questions" items={FAQ_ITEMS} />

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
