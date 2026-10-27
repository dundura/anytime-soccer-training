import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Team Pricing Works | Anytime Soccer Training',
  description: 'How a team gets started: pay one invoice, we add the slots, you share the link with families, and each player you add gets 365 days of free access.',
};

export default function HowTeamPricingWorksPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-6 pb-4 md:pt-8 md:pb-6 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl px-6 py-16 md:px-12 md:py-20 relative overflow-hidden text-center shadow-[0_2px_12px_rgba(15,49,84,0.08)]">
            <div className="absolute -top-1/2 -right-1/5 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(220,55,62,0.08)_0%,transparent_70%)] pointer-events-none" />
            <div className="relative z-10">
              <h1 className="text-[clamp(32px,5vw,48px)] font-extrabold leading-[1.1] text-navy mb-4">
                How Team Pricing <span className="text-red">Works</span>
              </h1>
              <p className="text-xl text-navy/70">Not sure how many players will join? No problem.</p>
            </div>
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="pb-12 md:pb-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4">
          <div className="bg-white rounded-2xl px-6 py-6 shadow-[0_2px_12px_rgba(15,49,84,0.08)]">
            <h2 className="text-xl font-extrabold text-navy mb-1">$10 per player, per year</h2>
            <p className="text-lg text-navy/80 leading-relaxed">Every player gets full access to the app, on any device.</p>
          </div>
          <div className="bg-white rounded-2xl px-6 py-6 shadow-[0_2px_12px_rgba(15,49,84,0.08)]">
            <h2 className="text-xl font-extrabold text-navy mb-1">Club discount: $8 per player, per year</h2>
            <p className="text-lg text-navy/80 leading-relaxed">Clubs and associations with 75 or more players get the lower price.</p>
          </div>
          <div className="bg-white rounded-2xl px-6 py-6 shadow-[0_2px_12px_rgba(15,49,84,0.08)]">
            <h2 className="text-xl font-extrabold text-navy mb-1">Coaches are free</h2>
            <p className="text-lg text-navy/80 leading-relaxed">Each team gets one coach account at no charge.</p>
          </div>
          <div className="bg-white rounded-2xl px-6 py-6 shadow-[0_2px_12px_rgba(15,49,84,0.08)] border-l-4 border-red">
            <p className="text-lg text-navy leading-relaxed">
              The minimum purchase is <strong>10 slots</strong>, and you pay for the rest as you go, so you only pay for the players who actually use the program.
            </p>
          </div>
          <div className="bg-white rounded-2xl px-6 py-6 shadow-[0_2px_12px_rgba(15,49,84,0.08)]">
            <h2 className="text-xl font-extrabold text-navy mb-2">How it works</h2>
            <p className="text-lg text-navy/80 leading-relaxed">
              We send you an invoice, you pay it once, in advance, for the year, and then we add the slots to your team. Once you pay the first invoice, we send you a link that you can share with families.
            </p>
          </div>
          <div className="bg-white rounded-2xl px-6 py-6 shadow-[0_2px_12px_rgba(15,49,84,0.08)]">
            <p className="text-lg text-navy/80 leading-relaxed">
              When a player joins your team, you apply a slot to their account. That gives them <strong>365 days of free access</strong>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
