import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Getting Started Guide for Parents — Anytime Soccer Training',
  description: 'A step-by-step guide for parents to set up a training plan, add player profiles, and get the most out of Anytime Soccer Training.',
  openGraph: {
    title: 'Getting Started Guide for Parents — Anytime Soccer Training',
    description: 'Set up a full training plan for your child and start tracking progress today.',
    images: [{ url: 'https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1774959685241-1scke0.png', width: 1200, height: 630 }],
  },
};

const accountSteps = [
  {
    title: 'Create a Free Account',
    content: (
      <>
        Visit{' '}
        <a href="https://anytime-soccer.com" target="_blank" rel="noopener noreferrer" className="text-red font-semibold no-underline hover:underline">
          anytime-soccer.com
        </a>{' '}
        and click <span className="text-red font-semibold">&ldquo;Join for Free&rdquo;</span> to create your parent account.
      </>
    ),
    tip: 'Have a team code from your coach? Enter it during sign-up to unlock your team\'s assigned videos instantly.',
  },
  {
    title: 'Add a Player Profile',
    content: (
      <>
        After signing up, add a <span className="text-red font-semibold">player profile</span> for your child — name, age, and position. You can add up to 4 players under one account.
      </>
    ),
  },
  {
    title: 'Verify Your Email',
    content: (
      <>
        Check your inbox for a <span className="text-red font-semibold">Welcome Email</span> and click <span className="text-red font-semibold">&ldquo;Verify Address&rdquo;</span> to activate your account.
      </>
    ),
    tip: "Don't see it? Check your spam or junk folder.",
  },
  {
    title: 'Log In',
    content: (
      <>
        Log in at{' '}
        <a href="https://app.anytime-soccer.com" target="_blank" rel="noopener noreferrer" className="text-red font-semibold no-underline hover:underline">
          app.anytime-soccer.com
        </a>{' '}
        using your email and password.
      </>
    ),
  },
];

const planSteps = [
  {
    title: 'Open the Training Plan',
    content: (
      <>
        From the player dashboard, click <span className="text-red font-semibold">&ldquo;Training Plan&rdquo;</span> in the navigation. This is where your child&apos;s full schedule lives.
      </>
    ),
  },
  {
    title: 'Choose a Curriculum',
    content: (
      <>
        Select a <span className="text-red font-semibold">skill area</span> (Ball Mastery, Dribbling, 1v1 Finishing, etc.) and pick the number of weeks. The app automatically builds a day-by-day plan.
      </>
    ),
    tip: 'Not sure where to start? Ball Mastery is the best foundation for players of any age or level.',
  },
  {
    title: 'Start Training',
    content: (
      <>
        Each day shows a short video session. Your child follows along, logs their session, and earns{' '}
        <span className="text-red font-semibold">XP points</span> to climb the leaderboard.
      </>
    ),
  },
  {
    title: 'Track Progress',
    content: (
      <>
        Check the <span className="text-red font-semibold">Progress</span> tab any time to see completed sessions, streaks, and total training hours — a great motivator for kids.
      </>
    ),
  },
];

const allProgramsSteps = [
  {
    title: 'Go to "All Programs"',
    content: (
      <>
        From the dashboard, tap <span className="text-red font-semibold">&ldquo;All Programs&rdquo;</span> to browse every available skill section — hundreds of videos organized by category and difficulty.
      </>
    ),
  },
  {
    title: 'Pick a Skill & Session',
    content: (
      <>
        Choose any skill area, then select a session that fits the time you have — from <span className="text-red font-semibold">10-minute</span> quick reps to <span className="text-red font-semibold">45-minute</span> full sessions.
      </>
    ),
    tip: 'This is great for off-days, warm-ups before a game, or when your child wants to work on something specific.',
  },
  {
    title: 'Log the Session',
    content: (
      <>
        After completing a video, your child can <span className="text-red font-semibold">mark it done</span> to keep their progress streak going and earn XP toward the leaderboard.
      </>
    ),
  },
];

export default function ParentsGettingStartedPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-6 pb-8 md:pt-8 md:pb-10 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy rounded-3xl px-6 py-12 md:px-12 md:py-16 relative overflow-hidden text-center">
            <div className="absolute -top-1/2 -right-1/5 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(220,55,62,0.12)_0%,transparent_70%)] pointer-events-none" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-red/20 text-red border border-red/30 rounded-full px-4 py-1.5 text-sm font-semibold mb-5">
                👨‍👩‍👧 For Parents
              </div>
              <h1 className="text-[clamp(28px,5vw,44px)] font-extrabold leading-[1.1] text-white mb-4">
                Getting Started Guide for Parents
              </h1>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                Everything you need to set up your child&apos;s training plan and start seeing real progress — in under 10 minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[700px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-16 bg-background">

        {/* VIDEO 1 */}
        <div>
          <div className="mb-3">
            <p className="text-xs font-bold text-red uppercase tracking-widest mb-1">Video 1</p>
            <h2 className="text-xl font-extrabold text-navy leading-snug">
              Setting up a Full Training Plan Using the Full Curriculum
            </h2>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(15,49,84,0.12)] bg-black">
            <iframe
              src="https://www.youtube.com/embed/hYRoOMLeiD8"
              title="Setting up a Full Training Plan Using the Full Curriculum"
              className="w-full aspect-video border-none block"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* VIDEO 2 */}
        <div>
          <div className="mb-3">
            <p className="text-xs font-bold text-red uppercase tracking-widest mb-1">Video 2</p>
            <h2 className="text-xl font-extrabold text-navy leading-snug">
              How to Use the All Programs Section to Build Your Player&apos;s Training Session
            </h2>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(15,49,84,0.12)] bg-black">
            <iframe
              src="https://www.youtube.com/embed/Kpx_pv6HYyQ"
              title="How to Use the All Programs Section to Build Your Player's Training Session"
              className="w-full aspect-video border-none block"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Tip callout */}
        <div className="bg-[#dbeafe] rounded-2xl p-5 md:p-6 flex gap-4 items-start">
          <span className="text-2xl flex-shrink-0">&#128161;</span>
          <div>
            <p className="text-navy font-bold text-sm m-0 mb-1">Already have an account?</p>
            <p className="text-navy/80 text-sm m-0">
              If your coach gave you a team code, log in, go to{' '}
              <span className="text-navy font-semibold underline">Account Management</span>, and enter the code to unlock your team&apos;s full video library.
            </p>
          </div>
        </div>

        {/* STEPS */}
        <div className="space-y-4">

          {/* Section 1: Create Account */}
          <details open className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(15,49,84,0.08)] overflow-hidden">
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

          {/* Section 2: Set Up Training Plan */}
          <details open className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(15,49,84,0.08)] overflow-hidden">
            <summary className="p-6 md:p-8 pb-0 md:pb-0 cursor-pointer list-none flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-navy m-0">Step 2: Set Up a Training Plan</h2>
              <span className="text-navy text-lg">&#9662;</span>
            </summary>
            <div className="p-6 md:p-8 pt-4 md:pt-4">
              {planSteps.map((step, i) => (
                <div key={step.title} className={`${i < planSteps.length - 1 ? 'mb-5 pb-5 border-b border-[#ECF1F7]' : ''}`}>
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

          {/* Section 3: All Programs */}
          <details className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(15,49,84,0.08)] overflow-hidden">
            <summary className="p-6 md:p-8 pb-0 md:pb-0 cursor-pointer list-none flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-navy m-0">Step 3: Explore All Programs</h2>
              <span className="text-navy text-lg">&#9662;</span>
            </summary>
            <div className="p-6 md:p-8 pt-4 md:pt-4">
              {allProgramsSteps.map((step, i) => (
                <div key={step.title} className={`${i < allProgramsSteps.length - 1 ? 'mb-5 pb-5 border-b border-[#ECF1F7]' : ''}`}>
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

          {/* CTA card */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_4px_20px_rgba(15,49,84,0.08)] text-center">
            <h3 className="text-lg font-extrabold text-navy mb-2">Ready to get started?</h3>
            <p className="text-[#5a7089] text-sm mb-5">Create a free account and start your child&apos;s first training session today.</p>
            <a
              href="https://anytime-soccer.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-red hover:bg-red-dark text-white px-8 py-4 rounded-full font-bold text-base transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(220,55,62,0.35)] no-underline"
            >
              Get Started Free &rarr;
            </a>
          </div>

          {/* Contact */}
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
      </div>
    </>
  );
}
