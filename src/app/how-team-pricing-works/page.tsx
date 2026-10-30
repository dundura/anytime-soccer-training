import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Team Pricing Works | Anytime Soccer Training',
  description: 'How a team gets started: pay one invoice, we add the slots, you share the link with families, and each player you add gets 365 days of free access.',
};

// Same palette as the pricing email: blue header, orange rule, blue callouts on a slate page.
const callout = 'rounded-lg border border-[#bfdbfe] border-l-4 border-l-[#1e40af] bg-[#eff6ff] px-5 py-4 text-[#0f2642]';

export default function HowTeamPricingWorksPage() {
  return (
    <section className="bg-[#f1f5f9] px-3 py-7">
      <div className="mx-auto w-full max-w-[600px]">
        <div className="rounded-t-2xl bg-gradient-to-br from-[#1e3a8a] to-[#2563eb] px-9 py-8 text-center">
          <div className="mb-2.5 text-[11px] font-bold tracking-[3px] text-[#bfdbfe]">ANYTIME SOCCER TRAINING</div>
          <h1 className="text-[26px] font-extrabold leading-tight text-white">How Team Pricing Works</h1>
        </div>
        <div className="flex flex-col gap-4 rounded-b-2xl border-t-[5px] border-[#F97316] bg-white px-9 py-7 text-base leading-relaxed text-[#334155]">
          <p>
            This is how pricing and getting set up works.
          </p>
          <p>
            We send you an initial invoice. Once your invoice is paid, we add the slots to your account, and you grant each player 365 days of access as they join your team.
          </p>
          <p>
            The minimum purchase is 10 slots. If the minimum was waived, pay the invoice you received and purchase additional slots inside the app when players join your team.
          </p>
          <details className="group rounded-lg border border-[#bfdbfe]">
            <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg bg-[#1e3a8a] px-5 py-3 text-lg font-extrabold text-white [&::-webkit-details-marker]:hidden">
              Team Pricing
              <span className="text-sm transition-transform group-open:rotate-180">▾</span>
            </summary>
            <div className="flex flex-col gap-4 p-4">
            <div id="price" className={callout + ' scroll-mt-4'}>
              <strong>$10 per player, per year</strong>
              <br />
              Full access for 365 days.
            </div>
            <div id="coaches" className={callout + ' scroll-mt-4'}>
              <strong>Coaches are free</strong>
              <br />
              One free coach account per team.
            </div>
            <div id="club" className={callout + ' scroll-mt-4'}>
              <strong>Club discount: $8 per player, per year</strong>
              <br />
              Clubs and associations with 75 or more players.
            </div>
            </div>
          </details>
          <details id="how" className="group rounded-lg border border-[#bfdbfe] scroll-mt-4">
            <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg bg-[#1e3a8a] px-5 py-3 text-lg font-extrabold text-white [&::-webkit-details-marker]:hidden">
              How invoicing works
              <span className="text-sm transition-transform group-open:rotate-180">▾</span>
            </summary>
            <div className={callout + ' m-4'}>
              <ol className="list-decimal space-y-1 pl-5">
                <li>We send you an invoice.*</li>
                <li>After paying, we send you a link that you can share with families to join your team.</li>
                <li>We add the slots to your team.</li>
                <li>Share the link so your players join your team.</li>
                <li>You apply the slots to your players when they join your team.</li>
              </ol>
              <p className="mt-3 text-sm">
                *Initial slots can also be purchased inside the app, skipping the invoice. (Minimum team slots 10 players).
              </p>
            </div>
          </details>
          <details id="apply" className="group rounded-lg border border-[#bfdbfe] scroll-mt-4">
            <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg bg-[#1e3a8a] px-5 py-3 text-lg font-extrabold text-white [&::-webkit-details-marker]:hidden">
              To apply a slot to a player
              <span className="text-sm transition-transform group-open:rotate-180">▾</span>
            </summary>
            <div className={callout + ' m-4'}>
              <p>
                Apply a slot to each player who joins. It gives them <strong>365 days of access</strong>.
              </p>
              <ol className="mt-2 list-decimal space-y-1 pl-5">
                <li>Go to your team.</li>
                <li>Click Coach Tools.</li>
                <li>Click Upgrade Players.</li>
                <li>Find the player and click Upgrade.</li>
              </ol>
            </div>
          </details>
          <p>
            Questions? Email <a href="mailto:megan@anytime-soccer.com" className="font-bold text-[#DC373E] no-underline">megan@anytime-soccer.com</a>
          </p>
        </div>
      </div>
    </section>
  );
}
