import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NPSL — Getting Started with Anytime Soccer Training',
  description: 'NPSL players: create your free account, enter your team code, and start training with Anytime Soccer Training.',
  openGraph: {
    title: 'NPSL — Getting Started with Anytime Soccer Training',
    description: 'Create your free account, enter your team code, and start training today.',
    images: [{ url: 'https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1774959685241-1scke0.png', width: 1200, height: 630 }],
  },
};

const accountSteps = [
  {
    title: 'Go to anytime-soccer.com & Join for Free',
    content: (
      <>Visit <a href="https://anytime-soccer.com" target="_blank" rel="noopener noreferrer" className="text-red font-semibold no-underline hover:underline">anytime-soccer.com</a> and click <span className="text-red font-semibold">&ldquo;Join for Free&rdquo;</span> to create your account.</>
    ),
  },
  {
    title: 'Enter Your Team Code',
    content: (
      <>During registration, enter the team code <span className="bg-navy/10 text-navy font-bold px-2 py-0.5 rounded">npsl04012025</span> to join your team.</>
    ),
  },
  {
    title: 'Add a Player Profile',
    content: (
      <>Add a <span className="text-red font-semibold">player profile</span> for your child. You can add up to 4 players per account.</>
    ),
  },
  {
    title: 'Verify Your Email',
    content: (
      <>Open the <span className="text-red font-semibold">Welcome Email</span> and click <span className="text-red font-semibold">&ldquo;Verify Address&rdquo;</span>.</>
    ),
    tip: "Don't see it? Check your spam or junk folder!",
  },
  {
    title: 'Log In & Start Training',
    content: (
      <>Log in with <span className="text-red font-semibold">Single Sign-On</span> using your email and password.</>
    ),
  },
];

export default function NPSLGettingStartedPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-6 pb-6 md:pt-8 md:pb-8 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy rounded-3xl px-6 py-12 md:px-12 md:py-16 relative overflow-hidden text-center">
            <div className="absolute -top-1/2 -right-1/5 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(220,55,62,0.12)_0%,transparent_70%)] pointer-events-none" />
            <div className="relative z-10">
              <h1 className="text-[clamp(28px,5vw,44px)] font-extrabold leading-[1.1] text-white mb-4">
                NPSL — Getting Started
              </h1>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">Follow these simple steps to create your account and join your team.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM CODE */}
      <section className="pb-4 bg-background">
        <div className="max-w-[700px] mx-auto px-4">
          <div className="bg-[#f0fdf4] border-2 border-[#86efac] rounded-2xl p-6 text-center">
            <p className="text-[#166534] text-sm font-semibold mb-1">Your Team Code</p>
            <p className="text-[#166534] text-3xl font-extrabold tracking-widest mb-1">npsl04012025</p>
            <p className="text-[#166534] text-xs">Enter this code during registration</p>
          </div>
        </div>
      </section>

      {/* VIDEO */}
      <section className="pb-4 bg-background">
        <div className="max-w-[700px] mx-auto px-4">
          <div className="rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(15,49,84,0.1)] bg-black">
            <iframe
              src="https://www.youtube.com/embed/Vd2IkI3bQdM"
              title="Getting Started with Anytime Soccer Training"
              className="w-full aspect-video border-none block"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="pb-12 bg-background">
        <div className="max-w-[700px] mx-auto px-4">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_4px_20px_rgba(15,49,84,0.08)]">
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

            <div className="text-center mt-4">
              <a
                href="https://anytime-soccer.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-red hover:bg-red-dark text-white px-8 py-4 rounded-full font-bold text-base transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(220,55,62,0.35)] no-underline"
              >
                Get Started Free &rarr;
              </a>
            </div>
          </div>

          <div className="text-center mt-6 text-[#6b7280] text-[15px]">
            Questions? Email <a href="mailto:megan@anytime-soccer.com" className="text-red font-semibold no-underline">megan@anytime-soccer.com</a> or call <a href="tel:803-431-1082" className="text-red font-semibold no-underline">803-431-1082</a>
          </div>
        </div>
      </section>
    </>
  );
}
