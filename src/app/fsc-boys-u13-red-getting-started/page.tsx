import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FSC Boys U13 Red — Getting Started with Anytime Soccer Training',
  description: 'Welcome FSC Boys U13 Red! Follow these simple steps to create your account and join your team on Anytime Soccer Training.',
  openGraph: {
    title: 'FSC Boys U13 Red — Getting Started with Anytime Soccer Training',
    description: 'Create your free account, enter your team code, and start training today.',
    images: [{ url: 'https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1774959685241-1scke0.png', width: 1200, height: 630 }],
  },
};

const TEAM_NAME = 'FSC Boys U13 Red';
const TEAM_CODE = 'fsc06292026';

const accountSteps = [
  {
    title: 'Go to anytime-soccer.com & Join for Free',
    content: (
      <>Visit <a href="https://anytime-soccer.com" target="_blank" rel="noopener noreferrer" className="text-red font-semibold no-underline hover:underline">anytime-soccer.com</a> and click <span className="text-red font-semibold">&ldquo;Join for Free&rdquo;</span> to create your account.</>
    ),
    tip: `When asked for a team code, enter ${TEAM_CODE} to connect to your team right away.`,
  },
  {
    title: 'Verify Your Email',
    content: (
      <>Open the <span className="text-red font-semibold">Welcome Email</span> and click <span className="text-red font-semibold">&ldquo;Verify Address&rdquo;</span>.</>
    ),
    tip: "Don't see it? Check your spam or junk folder!",
  },
  {
    title: 'Log In',
    content: (
      <>Log in using your <span className="text-red font-semibold">email and password</span>.</>
    ),
  },
  {
    title: 'Add a Player Profile',
    content: (
      <>Add a <span className="text-red font-semibold">player profile</span> for your child. You can add up to 4 players per account.</>
    ),
  },
];

const teamSteps = [
  {
    title: 'Go to My Teams',
    content: (
      <>From the dashboard, click on <span className="text-red font-semibold">&ldquo;My Teams&rdquo;</span> in the navigation menu.</>
    ),
  },
  {
    title: 'Click "Join Team"',
    content: (
      <>Click the <span className="text-red font-semibold">&ldquo;Join Team&rdquo;</span> button to search for your team.</>
    ),
  },
  {
    title: 'Search & Send a Join Request',
    content: (
      <>Type <span className="text-red font-semibold">FSC Boys U13 Red</span> in the search box, select it, and click <span className="text-red font-semibold">&ldquo;Request to Join&rdquo;</span>. Your coach will be notified.</>
    ),
    tip: "Can't find your team? Try searching \"FSC\" or ask your coach for the exact team name.",
  },
];

export default function FscBoysU13RedGettingStartedPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-6 pb-8 md:pt-8 md:pb-10 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy rounded-3xl px-6 py-12 md:px-12 md:py-16 relative overflow-hidden text-center">
            <div className="absolute -top-1/2 -right-1/5 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(220,55,62,0.12)_0%,transparent_70%)] pointer-events-none" />
            <div className="relative z-10">
              <p className="text-[13px] font-bold tracking-widest uppercase text-red mb-3">Welcome</p>
              <h1 className="text-[clamp(26px,5vw,42px)] font-extrabold leading-[1.1] text-white mb-4">
                {TEAM_NAME}
              </h1>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">Follow these simple steps to create your account and start training.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM CODE CALLOUT */}
      <section className="pb-4 bg-background">
        <div className="max-w-[700px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0f2642] rounded-2xl p-5 md:p-6 text-center">
            <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">Your Team Code</p>
            <p className="text-white text-4xl font-black tracking-widest mb-2">{TEAM_CODE}</p>
            <p className="text-white/60 text-sm">Enter this during registration to join {TEAM_NAME}</p>
          </div>
        </div>
      </section>

      {/* TABLE OF CONTENTS */}
      <section className="pb-4 bg-background">
        <div className="max-w-[700px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="rounded-2xl border border-[#e2eaf2] bg-[#f8fafc] px-6 py-5">
            <p className="text-xs font-bold text-[#94a3b8] uppercase tracking-widest mb-3">In this guide</p>
            <ol className="space-y-2 list-none m-0 p-0">
              {[
                { num: '1', id: 'create-account', title: 'Step 1: Create Your Account' },
                { num: '2', id: 'join-team', title: 'Step 2: Join Your Team' },
              ].map(({ num, id, title }) => (
                <li key={id}>
                  <a href={`#${id}`} className="flex items-start gap-3 group no-underline">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red text-white text-xs font-bold flex items-center justify-center mt-0.5">
                      {num}
                    </span>
                    <span className="text-[#0f3154] text-[15px] font-medium group-hover:text-red transition-colors leading-snug">
                      {title}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      {/* Already have an account */}
      <section className="pb-4 bg-background">
        <div className="max-w-[700px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#dbeafe] rounded-2xl p-5 md:p-6 flex gap-4 items-start">
            <span className="text-2xl flex-shrink-0">&#128161;</span>
            <div>
              <p className="text-navy font-bold text-sm m-0 mb-1">Already have an account?</p>
              <p className="text-navy/80 text-sm m-0">
                Log in, go to <span className="text-navy font-semibold underline">Account Management</span>, and enter your team code <span className="font-bold">{TEAM_CODE}</span> there to unlock your team&apos;s training videos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="pb-12 bg-background">
        <div className="max-w-[700px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4">

          {/* Step 1: Create Account */}
          <details id="create-account" open className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(15,49,84,0.08)] overflow-hidden scroll-mt-6">
            <summary className="p-6 md:p-8 pb-0 md:pb-0 cursor-pointer list-none flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-navy m-0">Step 1: Create Your Account</h2>
              <span className="text-navy text-lg">&#9662;</span>
            </summary>
            <div className="p-6 md:p-8 pt-4 md:pt-4">
              {accountSteps.map((step, i) => (
                <div key={step.title} className={`${i < accountSteps.length - 1 ? 'mb-5 pb-5 border-b border-[#ECF1F7]' : ''}`}>
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="w-7 h-7 bg-red text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {i + 1}
                    </span>
                    <h3 className="text-base font-bold text-navy m-0">{step.title}</h3>
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

          {/* Step 2: Join Your Team */}
          <details id="join-team" open className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(15,49,84,0.08)] overflow-hidden scroll-mt-6">
            <summary className="p-6 md:p-8 pb-0 md:pb-0 cursor-pointer list-none flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-navy m-0">Step 2: Join Your Team</h2>
              <span className="text-navy text-lg">&#9662;</span>
            </summary>
            <div className="p-6 md:p-8 pt-4 md:pt-4">
              {teamSteps.map((step, i) => (
                <div key={step.title} className={`${i < teamSteps.length - 1 ? 'mb-5 pb-5 border-b border-[#ECF1F7]' : ''}`}>
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="w-7 h-7 bg-navy text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {i + 1}
                    </span>
                    <h3 className="text-base font-bold text-navy m-0">{step.title}</h3>
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

          {/* CTA */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_4px_20px_rgba(15,49,84,0.08)] text-center">
            <p className="text-navy font-bold text-base mb-4">Ready to get started?</p>
            <a
              href="https://anytime-soccer.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-red hover:bg-red-dark text-white px-8 py-4 rounded-full font-bold text-base transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(220,55,62,0.35)] no-underline"
            >
              Join for Free &rarr;
            </a>
            <p className="text-[#9ca3af] text-xs mt-3">Use code <span className="font-bold text-navy">{TEAM_CODE}</span> during registration</p>
          </div>

          {/* Contact */}
          <div className="text-center mt-6 text-[#6b7280] text-[15px]">
            Questions? Email <a href="mailto:megan@anytime-soccer.com" className="text-red font-semibold no-underline">megan@anytime-soccer.com</a> or call <a href="tel:803-431-1082" className="text-red font-semibold no-underline">803-431-1082</a>
          </div>

        </div>
      </section>
    </>
  );
}
