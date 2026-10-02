import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Getting Started — Elite Soccer Academy',
  description: 'Create your account, add a player profile, and join your team — the whole setup on one page.',
  openGraph: {
    title: 'Getting Started — Elite Soccer Academy',
    description: 'Create your free account, add your player, join your team, and start training today.',
    images: [{ url: 'https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1774959685241-1scke0.png', width: 1200, height: 630 }],
  },
};

/**
 * The whole setup, on one page — Elite Soccer Academy edition.
 *
 * Shared by two teams (WJFC GU11 CS, WJFC BU9 CS), so parents from either
 * roster can use the same link and just search their own team name when
 * joining. No team code anywhere on this page.
 */

const TEAMS = ['WJFC GU11 CS', 'WJFC BU9 CS'];

type Step = { title: string; content: React.ReactNode; tip?: string };

const SECTIONS: { id: string; heading: string; accent: 'red' | 'navy'; steps: Step[] }[] = [
  {
    id: 'create-account',
    heading: 'Create your account',
    accent: 'red',
    steps: [
      {
        title: 'Join for free',
        content: (
          <ul className="list-disc pl-4 space-y-1">
            <li>
              Go to{' '}
              <a
                href="https://app.anytime-soccer.com/auth/registerFree"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red font-semibold underline"
              >
                app.anytime-soccer.com
              </a>{' '}
              and click <span className="text-red font-semibold">Join for Free</span>.
            </li>
            <li>
              See the full{' '}
              <a
                href="https://www.anytime-soccer.com/how-to-create-your-anytime-soccer-training-account"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red font-semibold underline"
              >
                step-by-step guide
              </a>
              .
            </li>
          </ul>
        ),
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
          <ul className="list-disc pl-4 space-y-1">
            <li>
              Log in, then click <span className="text-red font-semibold">Add Profile</span> on your dashboard.
            </li>
            <li>
              See the full{' '}
              <a
                href="https://www.anytime-soccer.com/adding-an-anytime-soccer-training-player-profile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red font-semibold underline"
              >
                step-by-step guide
              </a>
              .
            </li>
          </ul>
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
          <ul className="list-disc pl-4 space-y-1">
            <li>
              Click <span className="text-red font-semibold">Login</span> next to your player, then{' '}
              <span className="text-red font-semibold">My Teams</span>.
            </li>
            <li>
              See the full{' '}
              <a
                href="https://www.anytime-soccer.com/joining-anytime-soccer-training-team"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red font-semibold underline"
              >
                step-by-step guide
              </a>
              .
            </li>
          </ul>
        ),
      },
      {
        title: 'Search and request',
        content: (
          <>
            Click <span className="text-red font-semibold">Join Team</span>, type <strong>your team&apos;s name</strong> (see below), and click{' '}
            <span className="text-red font-semibold">Request to Join</span>. Your coach is notified.
          </>
        ),
        tip: "Can't find it? Search part of the name, or ask your coach for the exact one.",
      },
    ],
  },
];

export default function EliteSoccerAcademy24GettingStartedPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-6 pb-8 md:pt-8 md:pb-10 bg-background">
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

      {/* TEAM INFO */}
      <section className="pb-4 bg-background">
        <div className="max-w-[700px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(15,49,84,0.08)] px-6 py-5 text-center">
            <p className="text-[11px] font-bold uppercase tracking-wide text-[#94a3b8] mb-2">Elite Soccer Academy Teams</p>
            <div className="flex flex-wrap justify-center gap-2">
              {TEAMS.map((team) => (
                <span
                  key={team}
                  className="inline-block bg-[#ECF1F7] text-navy font-bold text-sm rounded-full px-4 py-1.5"
                >
                  {team}
                </span>
              ))}
            </div>
            <p className="text-[#3d4f61] text-xs mt-3">
              When you get to Step 3 (join your team), search for whichever of these names matches your player.
            </p>
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
                  </div>
                  <div className="ml-10 text-[#3d4f61] text-sm leading-relaxed">
                    {step.content}
                    {step.tip && (
                      <div className="bg-red/[0.08] border-l-[3px] border-red py-2.5 px-3 rounded-r-lg mt-3">
                        <p className="text-navy text-xs m-0">{step.tip}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              </div>
            </details>
          ))}

          <div className="text-center pt-2">
            <a
              href="https://app.anytime-soccer.com/auth/registerFree"
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
