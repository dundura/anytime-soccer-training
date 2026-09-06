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

/**
 * Partner marks, keyed by referral code.
 *
 * A map rather than a bare `/partners/${code}.png` path: most partners have no
 * logo, and guessing at a filename would 404 into a broken image on every one
 * of them. One line per partner, and the file lives in public/partners.
 *
 * If this grows past a dozen it is worth a logoUrl column on the partner
 * record so it can be set from the Partners tab instead of a deploy.
 */
const PARTNER_LOGOS: Record<string, string> = {
  BLKSOCCERGROUP: '/partners/BLKSOCCERGROUP.png',
};

/**
 * Hero palette per partner, so the panel behind their badge belongs to them
 * rather than to us. Absent, the hero stays navy and nothing else changes.
 *
 * `panel` is deliberately not pure black for Black Soccer Group: their shield
 * has a black outer ring, and on #000 it loses its silhouette entirely.
 */
type PartnerTheme = { panel: string; glow: string; accent: string };

const PARTNER_THEMES: Record<string, PartnerTheme> = {
  // Sampled from the shield: red #D00020, green #00A040, gold #F0D010.
  BLKSOCCERGROUP: { panel: '#131313', glow: 'rgba(0,160,64,0.20)', accent: '#F0D010' },
};

export default function PartnerLanding({ partner, code }: { partner: Partner; code: string }) {
  const [open, setOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
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
  const logo = PARTNER_LOGOS[(code || '').toUpperCase()] || null;
  const theme = PARTNER_THEMES[(code || '').toUpperCase()] || null;
  const accent = theme ? theme.accent : '#7ec8e3';
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
      <section className="pt-6 pb-3 md:pt-8 md:pb-3 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`rounded-3xl px-6 py-14 md:px-12 md:py-16 relative overflow-hidden${theme ? '' : ' bg-navy'}`}
            style={theme ? { backgroundColor: theme.panel } : undefined}
          >
            <div
              className={`absolute -top-1/2 -right-1/5 w-[800px] h-[800px] pointer-events-none${theme ? '' : ' bg-[radial-gradient(circle,rgba(220,55,62,0.12)_0%,transparent_70%)]'}`}
              style={theme ? { backgroundImage: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)` } : undefined}
            />
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
              <div className="relative z-10">
                {who && (
                  <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-5">
                    <span className="font-bold" style={{ color: accent }}>&#10003;</span>
                    <span className="text-sm font-semibold text-white">Recommended by {who}</span>
                  </div>
                )}

                <h1 className="text-[38px] md:text-[52px] font-extrabold text-white uppercase tracking-wide leading-[1.05] mb-5">
                  Train Smarter.<br /><span style={{ color: accent }}>Anytime.</span>
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

                {/* Both are text links, not buttons: the two things above are
                    the ask, and a third solid button would compete with them. */}
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 justify-center sm:justify-start">
                  {partner.hasDiscount && code && (
                    <button
                      onClick={() => ask(null)}
                      className="text-sm font-bold underline underline-offset-4 hover:no-underline"
                      style={{ color: accent }}
                    >
                      Get your {percent}% off code &rarr;
                    </button>
                  )}
                  <button
                    onClick={() => setVideoOpen(true)}
                    className="text-sm font-bold text-white/75 underline underline-offset-4 hover:no-underline hover:text-white"
                  >
                    Learn more
                  </button>
                </div>
              </div>

              <div className="relative">
                {logo ? (
                  <div className="flex flex-col items-center">
                    {/* The partner's mark takes the slot the demo video had.
                        Somebody arriving from their link needs confirming, and
                        the thing that confirms it is their badge, not our
                        product reel. The reel moves behind a button below. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={logo}
                      alt={who ? `${who} logo` : 'Partner logo'}
                      className="w-full max-w-[440px] h-auto drop-shadow-[0_18px_50px_rgba(0,0,0,0.45)]"
                    />
                  </div>
                ) : (
                  <HeroVideo />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plans. The popup gates every button, so without this the price is only
          discoverable by giving up an email, which is a reason to leave. */}
      <section className="bg-background pt-2 pb-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="bg-navy rounded-3xl px-6 pt-7 pb-9 md:px-10 md:pt-7 md:pb-10">
          <h2 className="text-2xl md:text-[32px] font-extrabold text-white text-center mb-2">For your team &mdash; or your player.</h2>
          <p className="text-white/60 text-center mb-7 max-w-[520px] mx-auto">
            The same training library covers coach-led homework and families training on their own.
          </p>

          {/* The panel keeps the full width; the cards inside do not. A pricing
              card stretched to the edge makes a five-item list look like a
              spreadsheet row. */}
          <div className="grid md:grid-cols-2 gap-5 max-w-[820px] mx-auto">
            <article className="bg-white rounded-2xl p-6">
              <span className="inline-block text-[10px] font-extrabold uppercase tracking-wide text-[#c80b3d] mb-2">For coaches, teams and clubs</span>
              <h3 className="text-xl font-extrabold text-navy mb-3">Team Training</h3>
              <div className="flex items-end gap-2 mb-4">
                <strong className="text-4xl font-extrabold text-navy leading-none">$10</strong>
                <span className="text-sm text-gray leading-tight">per player<br />per year</span>
              </div>
              <ul className="space-y-1.5 mb-5">
                {['Every coach account is free', 'Assign team or individual homework', 'See who actually completed it', 'Challenges, contests and leaderboards', '20% off at five or more teams'].map((li) => (
                  <li key={li} className="flex gap-2 text-sm text-gray"><span className="text-[#c80b3d] font-bold">&#10003;</span>{li}</li>
                ))}
              </ul>
              <button onClick={() => ask('team')} className="w-full bg-[#c80b3d] text-white font-bold text-sm py-3.5 rounded-lg hover:bg-red-dark transition-colors">
                Book my free demo &rarr;
              </button>
            </article>

            <article className="bg-white rounded-2xl p-6">
              <span className="inline-block text-[10px] font-extrabold uppercase tracking-wide text-navy/50 mb-2">For individual players and families</span>
              <h3 className="text-xl font-extrabold text-navy mb-3">Individual Training</h3>
              <div className="flex items-end gap-2 mb-4">
                <strong className="text-4xl font-extrabold text-navy leading-none">Free</strong>
                <span className="text-sm text-gray leading-tight">plan available<br />start today</span>
              </div>
              <ul className="space-y-1.5 mb-5">
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
      <section className="bg-background pt-3 pb-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="bg-white border border-gray-200 rounded-3xl px-6 pt-7 pb-9 md:px-10 md:pb-10">
          <div className="max-w-[820px] mx-auto">
          <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#c80b3d] mb-2">Questions before you start</p>
          <h2 className="text-2xl md:text-[32px] font-extrabold text-navy mb-6">Frequently asked questions</h2>
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
         </div>
        </div>
      </section>

      {/* One last capture point at the bottom of the scroll. */}
      <section className="bg-background pt-3 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="bg-[#c80b3d] rounded-3xl px-6 py-10 md:px-10">
          <div className="max-w-[820px] mx-auto grid md:grid-cols-[1.3fr_1fr] gap-8 items-center">
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

      {/* The demo reel, moved out of the hero so the partner's badge can hold
          that slot. Mounted only while open, which is also what stops it
          autoplaying behind the page. */}
      {videoOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={() => setVideoOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Anytime Soccer Training demo"
        >
          <div className="w-full max-w-3xl relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setVideoOpen(false)}
              aria-label="Close"
              className="absolute -top-10 right-0 text-white/80 text-3xl leading-none hover:text-white"
            >
              &times;
            </button>
            <HeroVideo />
          </div>
        </div>
      )}
    </>
  );
}
