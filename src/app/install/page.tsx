import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Install the App | Anytime Soccer Training',
  description: 'Install Anytime Soccer Training on your phone, tablet, or computer. No app store needed — add it to your home screen in seconds.',
};

const steps = [
  {
    device: 'iPhone & iPad',
    browser: 'Safari',
    icon: (
      <svg className="w-10 h-10 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    instructions: [
      'Open app.anytime-soccer.com in Safari (not Chrome)',
      'Tap the Share button (square with an arrow pointing up)',
      'Scroll down and tap "Add to Home Screen"',
      'Tap "Add" in the top right to confirm',
    ],
  },
  {
    device: 'Android',
    browser: 'Chrome',
    icon: (
      <svg className="w-10 h-10 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    instructions: [
      'Open app.anytime-soccer.com in Chrome',
      'Tap the three-dot menu in the top right corner',
      'Tap "Add to Home Screen" or "Install App"',
      'Tap "Add" to confirm',
    ],
  },
  {
    device: 'Desktop',
    browser: 'Chrome or Edge',
    icon: (
      <svg className="w-10 h-10 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    instructions: [
      'Open app.anytime-soccer.com in Chrome or Edge',
      'Look for the install icon in the address bar (a monitor with a down arrow)',
      'Click "Install" when prompted',
      'The app will open in its own window — pin it to your taskbar or dock',
    ],
  },
];

export default function InstallPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-6 pb-16 md:pt-8 md:pb-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy rounded-3xl px-6 py-16 md:px-12 md:py-20 relative overflow-hidden text-center">
            <div className="absolute -top-1/2 -right-1/5 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(220,55,62,0.12)_0%,transparent_70%)] pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm font-semibold mb-6 text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
                </svg>
                No App Store Required
              </div>
              <h1 className="text-[clamp(36px,5vw,52px)] font-extrabold leading-[1.1] mb-5 text-white">
                Install the App on <span className="text-red">Any Device</span>
              </h1>
              <p className="text-xl text-white/80 mb-4 max-w-xl mx-auto">
                Add Anytime Soccer Training to your home screen for instant access — just like a regular app. Works on phones, tablets, and computers.
              </p>
              <p className="text-base text-white/60 mb-8">
                You&apos;ll need to create a free account first, then follow the steps below for your device.
              </p>
              <Link
                href="https://app.anytime-soccer.com/auth/register"
                className="bg-red hover:bg-red-dark text-white px-8 py-4 rounded-full font-bold text-base transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(220,55,62,0.35)] hover:shadow-[0_6px_25px_rgba(220,55,62,0.45)] inline-flex items-center justify-center gap-2"
              >
                Create Free Account &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INSTALL INSTRUCTIONS */}
      <section className="bg-background pb-16 md:pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[clamp(28px,4vw,38px)] font-extrabold text-navy text-center mb-4">
            Choose Your Device
          </h2>
          <p className="text-center text-navy/70 mb-12 max-w-xl mx-auto">
            Follow the steps below for your device. It only takes a few seconds.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div
                key={step.device}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_4px_20px_rgba(15,49,84,0.08)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(15,49,84,0.12)] transition-all"
              >
                <div className="flex items-center gap-3 mb-5">
                  {step.icon}
                  <div>
                    <h3 className="text-lg font-bold text-navy">{step.device}</h3>
                    <p className="text-sm text-navy/60">{step.browser}</p>
                  </div>
                </div>
                <ol className="space-y-3">
                  {step.instructions.map((instruction, i) => (
                    <li key={i} className="flex gap-3 text-[15px] text-navy">
                      <span className="flex-shrink-0 w-6 h-6 bg-red/10 text-red rounded-full flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </span>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMING SOON + CTA */}
      <section className="bg-background pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-navy/5 border border-navy/10 rounded-2xl p-8 md:p-10">
            <h3 className="text-2xl font-bold text-navy mb-3">
              Coming Soon to App Stores
            </h3>
            <p className="text-navy/70 mb-6 max-w-lg mx-auto">
              We&apos;re working on bringing Anytime Soccer Training to the Apple App Store and Google Play Store. In the meantime, installing from your browser gives you the same great experience.
            </p>
            <div className="flex items-center justify-center gap-6 mb-8 opacity-40">
              <div className="flex items-center gap-2 text-navy font-semibold">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                App Store
              </div>
              <div className="flex items-center gap-2 text-navy font-semibold">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.18 23.76c.17.09.37.13.57.13.22 0 .44-.06.64-.17l8.28-4.79-2.6-1.51-6.89 3.99c-.5.29-.5 1.06 0 1.35zM1.57 2.35c-.1.24-.16.5-.16.78v17.74c0 .28.06.54.16.78l9.2-9.65L1.57 2.35zm20.86 8.14l-3.65-2.11-2.87 2.63 2.87 2.63 3.65-2.11c.74-.43.74-1.61 0-2.04zM4.39.24L17.74 7.96l-2.87 2.63L3.75.24c-.25-.14-.52-.18-.78-.14.08-.01.15-.03.23-.03.22 0 .44.06.64.17l.55.0z" />
                </svg>
                Google Play
              </div>
            </div>
            <Link
              href="https://app.anytime-soccer.com/auth/register"
              className="bg-red hover:bg-red-dark text-white px-8 py-4 rounded-full font-bold text-base transition-all hover:-translate-y-0.5 inline-flex items-center justify-center gap-2"
            >
              Get Started Free &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
