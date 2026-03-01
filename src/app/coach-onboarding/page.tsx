import type { Metadata } from 'next';
import CoachOnboardingChecklist from '@/components/CoachOnboardingChecklist';

export const metadata: Metadata = {
  title: 'Coach Onboarding Checklist | Anytime Soccer Training',
  description: 'Follow these steps to get your team set up and training with Anytime Soccer Training.',
};

export default function CoachOnboardingPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-6 pb-16 md:pt-8 md:pb-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy rounded-3xl px-6 py-16 md:px-12 md:py-20 relative overflow-hidden text-center">
            <div className="absolute -top-1/2 -right-1/5 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(220,55,62,0.12)_0%,transparent_70%)] pointer-events-none" />
            <div className="relative z-10">
              <h1 className="text-[clamp(32px,5vw,48px)] font-extrabold leading-[1.1] text-white mb-4">
                Your Onboarding <span className="text-red">Checklist</span>
              </h1>
              <p className="text-xl text-white/80">
                Follow these steps to get your team set up and training with Anytime Soccer Training
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CHECKLIST */}
      <CoachOnboardingChecklist />
    </>
  );
}
