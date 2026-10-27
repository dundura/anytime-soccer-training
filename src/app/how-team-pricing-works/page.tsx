import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Team Pricing Works | Anytime Soccer Training',
  description: 'How a team gets started: pay one invoice, we add the slots, you share the link with families, and each player you add gets 365 days of free access.',
};

// Same palette as the pricing email: blue header, orange rule, blue callouts on a slate page.
const pill = 'rounded-full border border-[#bfdbfe] bg-[#eff6ff] px-3.5 py-1.5 text-sm font-bold text-[#1e40af] no-underline hover:bg-[#dbeafe]';
const PILLS = [
  ['how', 'How it works'],
  ['apply', 'Upgrading players'],
];
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
          <div className="flex flex-wrap justify-center gap-2">
            {PILLS.map(([id, label]) => (
              <a key={id} href={'#' + id} className={pill}>{label}</a>
            ))}
          </div>
          <p>
            You pay the invoice, we apply the slots to your account, and you grant 365 days of access to your players as they join your team. Parents never provide payment information.
          </p>
          <div id="price" className={callout + ' scroll-mt-4'}>
            <strong>$10 per player, per year</strong>
            <br />
            Every player gets full access to the app, on any device.
          </div>
          <div id="club" className={callout + ' scroll-mt-4'}>
            <strong>Club discount: $8 per player, per year</strong>
            <br />
            Clubs and associations with 75 or more players get the lower price.
          </div>
          <div id="coaches" className={callout + ' scroll-mt-4'}>
            <strong>Coaches are free</strong>
            <br />
            Each team gets one coach account at no charge.
          </div>
          <p>
            The minimum purchase is 10 slots, and you pay for the rest as you go, so <strong>you only pay for the players who actually use the program.</strong>
          </p>
          <div id="how" className={callout + ' scroll-mt-4'}>
            <strong>How it works</strong>
            <ol className="mt-2 list-decimal space-y-1 pl-5">
              <li>We send you an invoice.</li>
              <li>You pay it once, in advance, for the year.</li>
              <li>We add the slots to your team.</li>
              <li>Once you pay the first invoice, we send you a link that you can share with families.</li>
            </ol>
          </div>
          <p>
            When a player joins your team, you apply a slot to their account. That gives them <strong>365 days of free access</strong>.
          </p>
          <div id="apply" className={callout + ' scroll-mt-4'}>
            <strong>To apply a slot to a player</strong>
            <ol className="mt-2 list-decimal space-y-1 pl-5">
              <li>Go to your team.</li>
              <li>Click Coach Tools.</li>
              <li>Click Upgrade Players.</li>
              <li>Find the player and click Upgrade.</li>
              <li>Click Yes, upgrade.</li>
            </ol>
          </div>
          <p>
            Questions? Email <a href="mailto:megan@anytime-soccer.com" className="font-bold text-[#DC373E] no-underline">megan@anytime-soccer.com</a>
          </p>
        </div>
      </div>
    </section>
  );
}
