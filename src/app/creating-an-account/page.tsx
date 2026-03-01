import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Creating an Anytime Soccer Training Account',
  description: 'Step-by-step guide to creating your Anytime Soccer Training account. Join for free, apply your team code, and start training.',
};

const steps = [
  {
    title: 'Go to anytime-soccer.com',
    content: (
      <>Visit <a href="https://anytime-soccer.com" target="_blank" rel="noopener noreferrer" className="text-red font-semibold no-underline hover:underline">anytime-soccer.com</a> to get started.</>
    ),
  },
  {
    title: 'Click "Join for Free"',
    content: (
      <>Click the <span className="text-red font-semibold">&ldquo;Join for Free&rdquo;</span> button and fill out the registration form.</>
    ),
  },
  {
    title: 'Apply Your Team Code',
    content: (
      <>Enter your <span className="text-red font-semibold">team code</span> during signup. Check your email from your coach for the code.</>
    ),
  },
  {
    title: 'Open the Welcome Email',
    content: (
      <>Check your inbox for the <span className="text-red font-semibold">Welcome Email</span> from us.</>
    ),
    tip: "Don't see it? Check your spam or junk folder!",
  },
  {
    title: 'Verify Your Email Address',
    content: (
      <>Click the <span className="text-red font-semibold">&ldquo;Verify Address&rdquo;</span> button in your welcome email.</>
    ),
  },
  {
    title: 'Log In with Single Sign-On',
    content: (
      <>Log in using <span className="text-red font-semibold">Single Sign-On</span> with your email and password. You&apos;re all set!</>
    ),
  },
];

export default function CreatingAnAccountPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-6 pb-16 md:pt-8 md:pb-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy rounded-3xl px-6 py-16 md:px-12 md:py-20 relative overflow-hidden text-center">
            <div className="absolute -top-1/2 -right-1/5 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(220,55,62,0.12)_0%,transparent_70%)] pointer-events-none" />
            <div className="relative z-10">
              <h1 className="text-[clamp(32px,5vw,48px)] font-extrabold leading-[1.1] text-white mb-4">
                Creating an Anytime Soccer Training Account
              </h1>
              <p className="text-xl text-red font-semibold">Welcome to Anytime Soccer Training</p>
            </div>
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
                href="https://anytime-soccer.com"
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
            Questions? Call <a href="tel:803-431-1082" className="text-red font-semibold no-underline">803-431-1082</a> or email <a href="mailto:megan@anytime-soccer.com" className="text-red font-semibold no-underline">megan@anytime-soccer.com</a>
          </div>
        </div>
      </section>
    </>
  );
}
