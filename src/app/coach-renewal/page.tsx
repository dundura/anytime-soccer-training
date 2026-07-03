import type { Metadata } from 'next';
import CoachRenewalChecklist from '@/components/CoachRenewalChecklist';

export const metadata: Metadata = {
  title: 'Team Renewal Checklist | Anytime Soccer Training',
  description: 'Follow these steps to renew your team for another season with Anytime Soccer Training.',
};

export default function CoachRenewalPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-6 pb-16 md:pt-8 md:pb-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl px-6 pt-16 pb-2 md:px-12 md:pt-20 md:pb-2 relative overflow-hidden text-center shadow-[0_2px_12px_rgba(15,49,84,0.08)]">
            <div className="absolute -top-1/2 -right-1/5 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(220,55,62,0.08)_0%,transparent_70%)] pointer-events-none" />
            <div className="relative z-10">
              <h1 className="text-[clamp(32px,5vw,48px)] font-extrabold leading-[1.1] text-navy mb-4">
                Your Team Renewal <span className="text-red">Checklist</span>
              </h1>
              <p className="text-xl text-navy/70">
                Follow these steps to renew your team for another season with Anytime Soccer Training
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CHECKLIST */}
      <CoachRenewalChecklist />
    </>
  );
}
