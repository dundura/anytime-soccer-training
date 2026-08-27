'use client';

import { useEffect, useState } from 'react';
import TabbedVideoSection from '@/components/TabbedVideoSection';
import HeroVideo from '@/components/HeroVideo';
import PartnerClaimForm from '@/components/PartnerClaimForm';

/**
 * Where a partner's link lands.
 *
 * Deliberately short: a recommendation, one promise, two buttons and the
 * videos. Somebody arriving here has been sent by a person they trust — they
 * need confirming, not convincing, and every extra section is a chance to
 * leave.
 *
 * The discount lives in a popup rather than on the page. It is being traded for
 * an email, so putting it inline would either give it away or push the two
 * buttons that matter below the fold.
 */

type Partner = { found: boolean; name?: string | null; organization?: string | null; hasDiscount?: boolean; percent?: number };

export default function PartnerLanding({ partner, code }: { partner: Partner; code: string }) {
  const [open, setOpen] = useState(false);
  // Which button they pressed. A coach and a parent want different next
  // steps, and knowing which arrived is worth more than any field on the form.
  const [intent, setIntent] = useState<'team' | 'player' | null>(null);
  const ask = (audience: 'team' | 'player' | null) => { setIntent(audience); setOpen(true); };

  // The offer opens itself. The visitor was sent here for a discount, so making
  // them hunt for it wastes the referral - and the email is what makes the
  // attribution survive a different device months later.
  //
  // Once per visitor, per partner: a popup that reappears on every visit stops
  // being an offer and starts being an obstacle. Remembered in localStorage,
  // which can throw in private mode, so the whole thing is guarded.
  useEffect(() => {
    if (!partner.hasDiscount || !code) return undefined;
    const key = 'ast_offer_seen_' + code;
    try {
      if (window.localStorage.getItem(key)) return undefined;
    } catch {
      // Storage blocked. Show it - once now is better than never.
    }
    // A beat, so it lands after the page rather than on top of it.
    const t = setTimeout(() => {
      setOpen(true);
      try { window.localStorage.setItem(key, '1'); } catch { /* nothing to do */ }
    }, 900);
    return () => clearTimeout(t);
  }, [partner.hasDiscount, code]);

  const who = partner.organization || partner.name || '';
  const percent = partner.percent || 10;
  const ref = code ? `?ref=${code}` : '';
  const demo = `/team-demo-request-anytime-soccer-training${ref}`;
  const pricing = `/pricing${ref}`;

  return (
    <>
      {/* Hero: the same navy card the homepage uses — rounded panel on the light
          background, copy left, the product playing on the right. A referred
          visitor should land somewhere that looks like the company they were
          just told about, not a one-off page. */}
      <section className="pt-6 pb-12 md:pt-8 md:pb-10 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy rounded-3xl px-6 py-14 md:px-12 md:py-16 relative overflow-hidden">
            <div className="absolute -top-1/2 -right-1/5 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(220,55,62,0.12)_0%,transparent_70%)] pointer-events-none" />
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
              <div className="relative z-10">
                {who && (
                  <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-5">
                    <span className="text-[#7ec8e3] font-bold">&#10003;</span>
                    <span className="text-sm font-semibold text-white">Recommended by {who}</span>
                  </div>
                )}

                <h1 className="text-[38px] md:text-[52px] font-extrabold text-white uppercase tracking-wide leading-[1.05] mb-5">
                  Train Smarter.<br /><span className="text-[#7ec8e3]">Anytime.</span>
                </h1>
                <p className="text-xl text-white/80 mb-8 max-w-[480px]">
                  {who ? `${who} just partnered with Anytime Soccer Training.` : 'One of our partners sent you here.'} Easy follow-along video sessions your player can do right at home &mdash; just a ball and the drive to improve.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Both CTAs go through the offer first. They were sent here
                      for a discount, so leaving without it wastes the referral -
                      and the email is the only attribution that survives a
                      different device months later. The links themselves live
                      inside the popup, so nobody is trapped. */}
                  <button onClick={() => ask('team')} className="bg-red hover:bg-red-dark text-white px-6 py-3.5 rounded-full font-bold text-[15px] transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(220,55,62,0.35)] inline-flex items-center justify-center gap-2 text-center whitespace-nowrap">
                    I&rsquo;m interested for my team &rarr;
                  </button>
                  <button onClick={() => ask('player')} className="bg-transparent text-white border-2 border-white/60 px-6 py-3.5 rounded-full font-bold text-[15px] transition-all hover:bg-white hover:text-navy inline-flex items-center justify-center gap-2 text-center whitespace-nowrap">
                    I&rsquo;m interested for my player
                  </button>
                </div>

                {partner.hasDiscount && code && (
                  <button onClick={() => ask(null)} className="mt-5 text-sm font-bold text-[#7ec8e3] underline underline-offset-4 hover:no-underline">
                    Get your {percent}% off code &rarr;
                  </button>
                )}
              </div>

              <div className="relative">
                <HeroVideo />
                <div className="flex items-center gap-5 pt-6 border-t border-white/15 flex-wrap mt-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4].map((i) => (
                        <span key={i} className="inline-flex items-center justify-center w-6 h-6 bg-[#00b67a] text-white text-xs rounded-[3px]">&#9733;</span>
                      ))}
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-gradient-to-r from-[#00b67a] from-50% to-[#dcdce6] to-50% text-white text-xs rounded-[3px]">&#9733;</span>
                    </div>
                    <span className="text-sm font-semibold text-white">4.9 (9,651)</span>
                  </div>
                  <div className="w-px h-8 bg-white/20 hidden sm:block" />
                  <div className="text-sm text-white/60">
                    <strong className="text-white block">Trusted by 50,000+ players</strong>
                    in 80+ countries worldwide
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plans. The popup gates every button, so without this the price is only
          discoverable by giving up an email, which is a reason to leave. */}
      <section className="bg-background px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto">
         <div className="bg-navy rounded-3xl px-6 py-12 md:px-12 md:py-14 max-w-[980px] mx-auto">
          <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#7ec8e3] text-center mb-2">Choose the right path</p>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white text-center mb-3">For your team &mdash; or your player.</h2>
          <p className="text-white/60 text-center mb-10 max-w-[520px] mx-auto">
            The same training library covers coach-led homework and families training on their own.
          </p>

          <div className="grid md:grid-cols-2 gap-5">
            <article className="bg-white rounded-2xl p-7">
              <span className="inline-block text-[10px] font-extrabold uppercase tracking-wide text-[#c80b3d] mb-3">For coaches, teams and clubs</span>
              <h3 className="text-xl font-extrabold text-navy mb-3">Team Training</h3>
              <div className="flex items-end gap-2 mb-5">
                <strong className="text-4xl font-extrabold text-navy leading-none">$10</strong>
                <span className="text-sm text-gray leading-tight">per player<br />per year</span>
              </div>
              <ul className="space-y-2 mb-6">
                {['Every coach account is free', 'Assign team or individual homework', 'See who actually completed it', 'Challenges, contests and leaderboards', '20% off at five or more teams'].map((li) => (
                  <li key={li} className="flex gap-2 text-sm text-gray"><span className="text-[#c80b3d] font-bold">&#10003;</span>{li}</li>
                ))}
              </ul>
              <button onClick={() => ask('team')} className="w-full bg-[#c80b3d] text-white font-bold text-sm py-3.5 rounded-lg hover:bg-red-dark transition-colors">
                Book my free demo &rarr;
              </button>
            </article>

            <article className="bg-white rounded-2xl p-7">
              <span className="inline-block text-[10px] font-extrabold uppercase tracking-wide text-navy/50 mb-3">For individual players and families</span>
              <h3 className="text-xl font-extrabold text-navy mb-3">Individual Training</h3>
              <div className="flex items-end gap-2 mb-5">
                <strong className="text-4xl font-extrabold text-navy leading-none">Free</strong>
                <span className="text-sm text-gray leading-tight">plan available<br />start today</span>
              </div>
              <ul className="space-y-2 mb-6">
                {['Follow-along training for ages 6-17', 'Ball mastery, dribbling, passing and more', 'Personalised sessions and progress tracking', 'Streaks, badges and rewards', 'Upgrade only when you are ready'].map((li) => (
                  <li key={li} className="flex gap-2 text-sm text-gray"><span className="text-[#c80b3d] font-bold">&#10003;</span>{li}</li>
                ))}
              </ul>
              <button onClick={() => ask('player')} className="w-full bg-white border-2 border-navy text-navy font-bold text-sm py-3.5 rounded-lg hover:bg-navy hover:text-white transition-colors">
                Start training free &rarr;
              </button>
            </article>
          </div>
         </div>
        </div>
      </section>

      <TabbedVideoSection
        title="Pick a Session and Follow Along"
        subtitle="See what your player will be doing. Real sessions. Real results."
        hideCta
      />

      {/* The questions a referred visitor actually has, including the one only
          this page provokes: does the link cost me anything. */}
      <section className="bg-white px-5 py-14">
        <div className="max-w-[820px] mx-auto">
          <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#c80b3d] mb-2">Questions before you start</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-navy mb-8">Frequently asked questions</h2>
          <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
            {[
              ['What age is this for?', 'Ages 6 to 17. Sessions are grouped by skill and difficulty, so a beginner and an experienced player can both use it.'],
              ['How much should a player train?', 'Ten to fifteen minutes a day is enough to see a difference. The plans are built around that, not around hour-long sessions nobody finishes.'],
              ['Do we need special equipment?', 'A ball and a few feet of space. Some sessions use cones or a goal, but anything works as a marker and most drills need neither.'],
              ['Can an individual player join without a team?', 'Yes. Families sign up on their own and get the full library. A coach or club is not required.'],
              ['How does homework work?', 'A coach assigns a folder or a session, the player sees it when they open the app, and the coach sees who completed it.'],
            ].map(([q, a]) => (
              <details key={q} className="group py-4">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-bold text-navy text-[15px]">
                  {q}
                  <span className="text-[#c80b3d] text-lg shrink-0 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="text-sm text-gray leading-relaxed mt-2.5">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* One last capture point at the bottom of the scroll. */}
      <section className="bg-background px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-[980px] mx-auto bg-[#c80b3d] rounded-3xl px-6 py-12 md:px-12 grid md:grid-cols-[1.3fr_1fr] gap-8 items-center">
          <div>
            <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-white/70 mb-2">Start with the path that fits</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight mb-2">
              Give your player more chances to improve.
            </h2>
            <p className="text-white/80 text-sm">
              Train independently today, or see how Anytime Soccer Training works for your entire team.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={() => ask('team')} className="bg-white text-[#c80b3d] font-bold text-sm px-6 py-3.5 rounded-lg hover:bg-white/90 transition-colors">
              Request team demo &rarr;
            </button>
            <button onClick={() => ask('player')} className="bg-transparent border-2 border-white text-white font-bold text-sm px-6 py-3.5 rounded-lg hover:bg-white hover:text-[#c80b3d] transition-colors">
              Start individual training &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* The discount, behind a click. */}
      {open && partner.hasDiscount && code && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl w-full max-w-md p-6 sm:p-7 relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-3 right-4 text-gray-400 text-2xl leading-none hover:text-navy"
            >
              &times;
            </button>
            <PartnerClaimForm code={code} percent={percent} who={who} demo={demo} pricing={pricing} intent={intent} />
          </div>
        </div>
      )}
    </>
  );
}
