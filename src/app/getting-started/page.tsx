import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Getting Started with Anytime Soccer Training',
  description: 'Create your account, add a player profile, and join your team — the whole setup on one page.',
  openGraph: {
    title: 'Getting Started with Anytime Soccer Training',
    description: 'Create your free account, add your player, join your team, and start training today.',
    images: [{ url: 'https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1774959685241-1scke0.png', width: 1200, height: 630 }],
  },
};

/**
 * The whole setup, on one page.
 *
 * This replaces three separate guides — create an account, add a player
 * profile, join a team — that were each a page of their own. They are one
 * sitting for a parent, and splitting them meant somebody could finish the
 * first, close the tab, and never learn the other two existed.
 */

type Step = { title: string; content: React.ReactNode; tip?: string; pill?: string };

const SECTIONS: { id: string; heading: string; accent: 'red' | 'navy'; steps: Step[] }[] = [
  {
    id: 'create-account',
    heading: 'Create your account',
    accent: 'red',
    steps: [
      {
        title: 'Join for free',
        content: (
          <>
            Go to{' '}
            <a
              href="https://anytime-soccer.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red font-semibold no-underline hover:underline"
            >
              anytime-soccer.com
            </a>{' '}
            and click <span className="text-red font-semibold">Join for Free</span>.
          </>
        ),
      },
      {
        title: 'Enter your team code',
        pill: 'Optional',
        content: <>If your coach gave you one, enter it during signup.</>,
      },
      {
        title: 'Verify your email',
        content: (
          <>
            Open the welcome email and click <span className="text-red font-semibold">Verify Address</span>.
          </>
        ),
        tip: 'Not there? Check spam or promotions.',
      },
    ],
  },
  {
    id: 'add-player',
    heading: 'Add your player',
    accent: 'navy',
    steps: [
      {
        title: 'Click Add Profile',
        content: (
          <>
            Log in, then click <span className="text-red font-semibold">Add Profile</span> on your dashboard.
          </>
        ),
      },
      {
        title: 'Fill in their details',
        content: <>Name, age, and the rest. Up to four players on one account, all on the same email.</>,
        tip: 'Add only your own children — coaches included.',
      },
    ],
  },
  {
    id: 'join-team',
    heading: 'Join your team',
    accent: 'red',
    steps: [
      {
        title: 'Open My Teams',
        content: (
          <>
            Click <span className="text-red font-semibold">Login</span> next to your player, then{' '}
            <span className="text-red font-semibold">My Teams</span>.
          </>
        ),
      },
      {
        title: 'Search and request',
        content: (
          <>
            Click <span className="text-red font-semibold">Join Team</span>, type your team name, and click{' '}
            <span className="text-red font-semibold">Request to Join</span>. Your coach is notified.
          </>
        ),
        tip: "Can't find it? Search part of the name, or ask your coach for the exact one.",
      },
    ],
  },
];

export default function GettingStartedPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-6 pb-8 md:pt-8 md:pb-10 bg-background">
        {/* Same 700px column as the steps below, so the hero does not run wider
            than the content it introduces. */}
        <div className="max-w-[700px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy rounded-3xl px-6 py-10 md:px-10 md:py-12 relative overflow-hidden text-center">
            <div className="absolute -top-1/2 -right-1/5 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(220,55,62,0.12)_0%,transparent_70%)] pointer-events-none" />
            <div className="relative z-10">
              <h1 className="text-[clamp(28px,5vw,44px)] font-extrabold leading-[1.1] text-white mb-4">
                Getting Started
              </h1>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                Three steps, about five minutes. Account, player, team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="pb-12 bg-background">
        <div className="max-w-[700px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {SECTIONS.map((section, sectionIndex) => (
            <details
              key={section.id}
              id={section.id}
              className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(15,49,84,0.08)] overflow-hidden scroll-mt-6 group"
            >
              <summary className="p-6 md:p-8 cursor-pointer list-none flex items-center justify-between">
                <h2 className="text-xl font-extrabold text-navy m-0">
                  <span className="text-red">{sectionIndex + 1}.</span> {section.heading}
                </h2>
                <span className="text-navy text-lg group-open:rotate-180 transition-transform">&#9662;</span>
              </summary>
              <div className="px-6 md:px-8 pb-6 md:pb-8">
              {section.steps.map((step, i) => (
                <div
                  key={step.title}
                  className={i < section.steps.length - 1 ? 'mb-5 pb-5 border-b border-[#ECF1F7]' : ''}
                >
                  <div className="flex items-center gap-3 mb-1.5">
                    <span
                      className={`w-7 h-7 ${
                        section.accent === 'red' ? 'bg-red' : 'bg-navy'
                      } text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0`}
                    >
                      {i + 1}
                    </span>
                    <h3 className="text-base font-bold text-navy m-0">{step.title}</h3>
                    {step.pill && (
                      <span className="text-[10px] font-bold uppercase tracking-wide text-[#5a7089] bg-[#ECF1F7] rounded-full px-2 py-0.5">
                        {step.pill}
                      </span>
                    )}
                  </div>
                  <div className="ml-10 text-[#5a7089] text-sm">
                    {step.content}
                    {step.tip && (
                      <div className="bg-red/[0.08] border-l-[3px] border-red py-2.5 px-3 rounded-r-lg mt-2">
                        <p className="text-navy text-xs m-0">{step.tip}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              </div>
            </details>
          ))}

          {/* Already a member — the one case the three steps do not cover */}
          <div className="bg-[#dbeafe] rounded-2xl p-5 md:p-6 flex gap-4 items-start">
            <span className="text-2xl flex-shrink-0">&#128161;</span>
            <div>
              <p className="text-navy font-bold text-sm m-0 mb-1">Already have an account?</p>
              <p className="text-navy/80 text-sm m-0">
                Log in, go to <span className="font-semibold">Account Management</span>, and enter your team code
                there.
              </p>
            </div>
          </div>

          <div className="text-center pt-2">
            <a
              href="https://anytime-soccer.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-red hover:bg-red-dark text-white px-8 py-4 rounded-full font-bold text-base transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(220,55,62,0.35)] no-underline"
            >
              Get Started Free &rarr;
            </a>
          </div>

          <div className="text-center mt-6 text-[#6b7280] text-[15px]">
            Questions? Email{' '}
            <a href="mailto:megan@anytime-soccer.com" className="text-red font-semibold no-underline">
              megan@anytime-soccer.com
            </a>{' '}
            or call{' '}
            <a href="tel:803-431-1082" className="text-red font-semibold no-underline">
              803-431-1082
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
