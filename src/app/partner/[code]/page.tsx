import type { Metadata } from 'next';
import TabbedVideoSection from '@/components/TabbedVideoSection';
import PartnerClaimForm from '@/components/PartnerClaimForm';

const API = 'https://api.anytime-soccer.com';

export const metadata: Metadata = {
  title: 'Partner Discount — Anytime Soccer Training',
  description: 'A partner discount on Anytime Soccer Training. Train at home with 5,000+ follow-along video sessions.',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

type Landing = { found: boolean; name?: string | null; organization?: string | null; hasDiscount?: boolean; percent?: number };

/**
 * Where a partner's link lands, built on the shape of the Fusion page.
 *
 * The difference from Fusion is the code. Fusion prints FUSION2026 on the page
 * because it is one club and Neil built it by hand; here the code is what is
 * being exchanged for an email, so it is never rendered — the visitor types
 * their address and it arrives in their inbox. That email is the attribution
 * that survives a different device three months later.
 */
export default async function PartnerLandingPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const safe = /^[A-Za-z0-9]{1,48}$/.test(code || '') ? code : '';

  let partner: Landing = { found: false };
  if (safe) {
    try {
      const res = await fetch(`${API}/partner-program/landing/${safe}`, { cache: 'no-store' });
      if (res.ok) partner = await res.json();
    } catch {
      // The page still works without it — it just loses the partner's name.
    }
  }

  const who = partner.organization || partner.name || '';
  const percent = partner.percent || 10;
  const offer = partner.hasDiscount ? `${percent}% Off All Plans` : 'Exclusive Partner Offer';
  const demo = `/team-demo-request-anytime-soccer-training${safe ? `?ref=${safe}` : ''}`;
  const pricing = `/pricing${safe ? `?ref=${safe}` : ''}`;

  return (
    <>
      {/* BANNER */}
      <div className="bg-[#7ec8e3] text-[#1a2a3a] text-center py-2.5 px-4 text-sm font-semibold">
        Free to join &middot; {partner.hasDiscount ? <><span className="font-extrabold">{percent}% off</span> annual upgrades{who ? <> &mdash; with thanks to <span className="font-extrabold">{who}</span></> : null}</> : 'train at home with 5,000+ sessions'}
      </div>

      {/* HERO */}
      <section className="py-6 md:py-8 bg-[#f0f4f8]">
        <div className="max-w-[900px] mx-auto px-4">
          <div className="bg-[#1a2a3a] rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.25)]">
            <div className="bg-[#7ec8e3] px-7 py-2.5 text-xs font-bold tracking-widest uppercase text-[#1a2a3a] flex items-center gap-2 flex-wrap">
              &#9917; {who ? <>Recommended by {who}</> : 'Exclusive Member Offer'} &middot; <span className="font-extrabold">{offer}</span>
            </div>

            <div className="px-6 py-8 md:px-10 md:py-9">
              <div className="flex flex-wrap items-center gap-4 mb-7">
                {who && (
                  <>
                    <div className="bg-white/[0.08] border border-white/[0.12] rounded-lg px-3 py-2">
                      <span className="text-[13px] font-bold text-white tracking-wide uppercase">{who}</span>
                    </div>
                    <span className="text-lg text-white/30 font-light">&times;</span>
                  </>
                )}
                <div className="bg-white/[0.08] border border-white/[0.12] rounded-lg px-3 py-2 flex items-center gap-2.5">
                  <img src="https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1774958366003-w9xngw.png" alt="AST" className="w-7 h-7 rounded object-contain" />
                  <span className="text-[13px] font-bold text-white tracking-wide uppercase">Anytime Soccer Training</span>
                </div>
              </div>

              <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#7ec8e3] mb-2.5">You were recommended to us</p>
              <h1 className="text-[32px] md:text-[36px] font-extrabold text-white leading-[1.15] uppercase tracking-wide mb-3">
                Train Smarter.<br /><span className="text-[#7ec8e3]">Anytime.</span>
              </h1>
              <p className="text-[15px] text-white leading-relaxed mb-7 max-w-[520px]">
                {who ? `${who} sent you here.` : 'You were sent here by one of our partners.'} Easy follow-along video sessions your player can do right at home &mdash; just a ball and the drive to improve.
              </p>

              <hr className="border-white/10 mb-6" />

              <div className="grid grid-cols-2 gap-1.5 mb-7">
                {[
                  '5,000+ training videos',
                  'Ball mastery, dribbling & more',
                  'Personalized training plans',
                  'Train anywhere, anytime',
                  'Built for all skill levels',
                  'Ages 6–18',
                  'Coach homework tools',
                  'Progress tracking & badges',
                ].map((perk) => (
                  <div key={perk} className="flex items-center gap-2 text-[12px] text-white/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#7ec8e3] shrink-0" />
                    <span className="text-white">{perk}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                <a href={demo} className="bg-[#7ec8e3] text-[#1a2a3a] text-sm font-extrabold uppercase tracking-wider px-7 py-3 rounded-lg no-underline hover:brightness-110 transition-all">
                  Book Free Demo
                </a>
                <span className="text-xs text-white/50">
                  {partner.hasDiscount ? `Free to join, ${percent}% off annual upgrades.` : 'Fifteen minutes, no obligation.'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-8 px-5 bg-[#e8f4f8]">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#1a2a3a] text-center mb-8">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              ['Claim Your Code', partner.hasDiscount ? `Enter your email below and we send your ${percent}% off code.` : 'Book a free demo and we will show you around.'],
              ['Create a Free Account', "Sign up at anytime-soccer.com — it's free to get started."],
              ['Start Training', 'Hit play and follow along. Your player trains at their own pace.'],
            ].map(([title, body], i) => (
              <div key={title} className="text-center">
                <div className="w-10 h-10 bg-[#7ec8e3] text-[#1a2a3a] rounded-full flex items-center justify-center font-extrabold text-lg mx-auto mb-3">{i + 1}</div>
                <h3 className="font-bold text-[#1a2a3a] mb-1">{title}</h3>
                <p className="text-sm text-gray">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE OFFER — the code is behind the form, not printed on the page */}
      <section className="py-8 px-5 bg-white">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-navy mb-2">
            {partner.hasDiscount ? `Your ${percent}% Discount` : 'See It For Yourself'}
          </h2>
          <p className="text-gray text-base mb-4">
            {partner.hasDiscount
              ? `${who || 'Our partner'} gets you ${percent}% off any plan — team or individual.`
              : 'Book a free demo and see how coaches use it with their teams.'}
          </p>

          {partner.hasDiscount && safe && (
            <div className="bg-[#e8f4f8] border-2 border-[#7ec8e3]/30 rounded-2xl p-6 sm:p-8 mb-6 text-left">
              <PartnerClaimForm code={safe} percent={percent} who={who} />
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden text-center">
              <img src="https://images.squarespace-cdn.com/content/v1/5e4a87984b1e7c77342e7371/1746821495147-NKBKSCPAM28BSNTF0Z4A/1098-DSC07129+%282%29.jpg?format=1000w" alt="Team Training" className="w-full h-48 object-[center_30%]" />
              <div className="p-4">
                <h3 className="text-sm font-bold text-navy mb-1">Team Plans</h3>
                <p className="text-xs text-gray mb-3">Assign homework, track progress, run team training.</p>
                <a href={demo} className="inline-block bg-navy text-white text-xs font-bold px-5 py-2 rounded-lg no-underline hover:bg-navy/90 transition-colors">Book Free Demo</a>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden text-center">
              <img src="https://d2vm0l3c6tu9qp.cloudfront.net/Anytime-soccer-camp.webp" alt="Individual Training" className="w-full h-48 object-[center_30%]" />
              <div className="p-4">
                <h3 className="text-sm font-bold text-navy mb-1">Individual Plans</h3>
                <p className="text-xs text-gray mb-3">Unlimited videos, progress tracking, and badges.</p>
                <a href={pricing} className="inline-block bg-red text-white text-xs font-bold px-5 py-2 rounded-lg no-underline hover:bg-red-dark transition-colors">Join for Free</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TabbedVideoSection title="A Look Inside the Program" subtitle="See what your player will be doing. Real sessions. Real results." hideCta />

      <section className="px-5 pb-12 bg-background text-center">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-2">Give your players the extra edge.</h2>
          <p className="text-gray text-base mb-4">Join thousands of players already training with Anytime Soccer Training.</p>
          <a href={demo} className="bg-red text-white font-bold text-lg py-4 px-10 rounded-full no-underline hover:bg-red-dark transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(220,55,62,0.35)] inline-block">
            Book Your Free Demo &rarr;
          </a>
          <p className="text-sm text-gray mt-6">
            Questions? <a href="mailto:megan@anytime-soccer.com" className="text-red font-semibold no-underline">megan@anytime-soccer.com</a> &middot;{' '}
            <a href="tel:803-431-1082" className="text-red font-semibold no-underline">803-431-1082</a>
          </p>
        </div>
      </section>
    </>
  );
}
