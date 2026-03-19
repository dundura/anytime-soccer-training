import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Brian Chongtoua | Private Soccer Specialist — Getting Started',
  description: 'Getting started guide for Brian Chongtoua players. Join Anytime Soccer Training with your team code and start training today.',
};

const steps = [
  {
    title: 'Go to app.anytime-soccer.com',
    content: (
      <>Visit <a href="https://app.anytime-soccer.com" target="_blank" rel="noopener noreferrer" className="text-red font-semibold no-underline hover:underline">app.anytime-soccer.com</a> to get started.</>
    ),
  },
  {
    title: 'Click "Join for Free"',
    content: (
      <>Click the <span className="text-red font-semibold">&ldquo;Join for Free&rdquo;</span> button and fill out the registration form with your player&apos;s information.</>
    ),
  },
  {
    title: 'Enter Your Team Code',
    content: (
      <>When prompted, enter your team code: <span className="bg-navy text-white font-mono font-bold px-3 py-1.5 rounded-lg text-base tracking-wider select-all">bctraining03182026</span></>
    ),
    tip: 'Copy and paste the code exactly as shown above.',
  },
  {
    title: 'Open the Welcome Email',
    content: (
      <>Check your inbox for the <span className="text-red font-semibold">Welcome Email</span> from Anytime Soccer Training.</>
    ),
    tip: "Don't see it? Check your spam or junk folder!",
  },
  {
    title: 'Verify Your Email Address',
    content: (
      <>Click the <span className="text-red font-semibold">&ldquo;Verify Address&rdquo;</span> button in your welcome email to activate your account.</>
    ),
  },
  {
    title: 'Log In and Start Training',
    content: (
      <>Log in at <a href="https://app.anytime-soccer.com" target="_blank" rel="noopener noreferrer" className="text-red font-semibold no-underline hover:underline">app.anytime-soccer.com</a> with your email and password. You&apos;re all set!</>
    ),
  },
];

export default function BrianChongouaGettingStartedPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-6 pb-16 md:pt-8 md:pb-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy rounded-3xl px-6 py-16 md:px-12 md:py-20 relative overflow-hidden text-center">
            <div className="absolute -top-1/2 -right-1/5 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(220,55,62,0.12)_0%,transparent_70%)] pointer-events-none" />
            <div className="relative z-10">
              <h1 className="text-[clamp(28px,5vw,44px)] font-extrabold leading-[1.1] text-white mb-4">
                Brian Chongtoua | Private Soccer Specialist
              </h1>
              <p className="text-xl text-red font-semibold">Getting Started with Anytime Soccer Training</p>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM CODE HIGHLIGHT */}
      <section className="pb-8 bg-background">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(15,49,84,0.08)] text-center">
            <p className="text-gray text-sm mb-2">Your Team Code</p>
            <p className="text-3xl font-mono font-bold text-navy tracking-wider select-all">bctraining03182026</p>
          </div>
        </div>
      </section>

      {/* VIDEO + STEPS */}
      <section className="pb-20 bg-background">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Video */}
          <div className="rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(15,49,84,0.1)] bg-black mb-10">
            <iframe
              src="https://www.youtube.com/embed/Vd2IkI3bQdM"
              title="Creating an Account with Anytime Soccer Training"
              className="w-full aspect-video border-none block"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Steps */}
          <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(15,49,84,0.08)]">
            {steps.map((step, i) => (
              <div key={step.title} className={`${i < steps.length - 1 ? 'mb-7 pb-7 border-b border-[#ECF1F7]' : ''}`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-7 h-7 bg-red text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {i + 1}
                  </span>
                  <h3 className="text-lg font-bold text-navy m-0">{step.title}</h3>
                </div>
                <div className="ml-10 text-[#5a7089] text-[15px]">
                  {step.content}
                  {step.tip && (
                    <div className="bg-red/[0.08] border-l-[3px] border-red py-4 px-4 rounded-r-lg mt-3">
                      <p className="text-navy text-sm m-0">{step.tip}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* CTA */}
            <div className="text-center mt-8">
              <a
                href="https://app.anytime-soccer.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-red hover:bg-red-dark text-white px-8 py-4 rounded-full font-bold text-base transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(220,55,62,0.35)] no-underline"
              >
                Get Started &rarr;
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center mt-6 text-[#6b7280] text-[15px]">
            Questions? Email <a href="mailto:neil@anytime-soccer.com" className="text-red font-semibold no-underline">neil@anytime-soccer.com</a>
          </div>
        </div>
      </section>
    </>
  );
}
