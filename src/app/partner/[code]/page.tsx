import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Anytime Soccer Training — Recommended for your team',
  description: 'Assign training, see who actually does it, and keep players developing between practices. $10 per player, per year — coaches free.',
};

export const dynamic = 'force-dynamic';

/**
 * Where a partner's link lands.
 *
 * Not the homepage: somebody arriving from a partner has been recommended by a
 * person they trust, and a general homepage throws that away. This page says
 * one thing, asks for one thing, and keeps the ref in the URL so the code is
 * still on the browser when they eventually buy.
 */
const BENEFITS = [
  { icon: '📋', title: 'Assign homework in a minute', desc: 'Send a session to the whole team or to one player, from a library of 5,000+ videos.' },
  { icon: '📊', title: 'See who actually trained', desc: 'Real numbers on who is putting the work in at home — not who says they are.' },
  { icon: '🏆', title: 'Competitions that keep them going', desc: 'Leaderboards, streaks, challenges and badges. Players come back because they want to.' },
  { icon: '⚽', title: 'Works with what you already do', desc: 'Nothing to install for you. Parents get an invite, players open it on a phone.' },
];

export default async function PartnerLandingPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const safe = /^[A-Za-z0-9]{1,48}$/.test(code || '') ? code : '';
  const withRef = (path: string) => (safe ? `${path}${path.includes('?') ? '&' : '?'}ref=${safe}` : path);

  return (
    <div className="bg-gradient-to-br from-[#0f2642] via-[#1a3a5c] to-[#0f2642] py-16 px-5" style={{ fontFamily: "'Source Sans Pro', sans-serif" }}>
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/80 text-sm">
            You were recommended to us
          </span>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-white text-[clamp(2.2rem,5vw,3.2rem)] tracking-[2px] mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            GIVE YOUR TEAM <span className="text-[#c80b3d]">THE EDGE</span>
          </h1>
          <p className="text-white/80 text-xl max-w-[560px] mx-auto">
            Players develop between practices, not at them. Anytime Soccer Training is how coaches make that happen — and how they see who did it.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
          {BENEFITS.map((b) => (
            <div key={b.title} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-white text-lg font-bold mb-2 flex items-center gap-3">
                <span className="w-10 h-10 bg-[#c80b3d] rounded-full flex items-center justify-center text-xl flex-shrink-0">{b.icon}</span>
                {b.title}
              </h3>
              <p className="text-white/70 pl-[52px]">{b.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 sm:p-10 text-center shadow-[0_25px_50px_rgba(0,0,0,0.3)] max-w-[640px] mx-auto">
          <h2 className="text-[#0f2642] text-3xl mb-2 tracking-[1px]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            $10 PER PLAYER, PER YEAR
          </h2>
          <p className="text-gray-500 mb-1">Every coach account is free. 20% off for clubs with 5 or more teams.</p>
          <p className="text-gray-400 text-sm mb-7">See it first — fifteen minutes, no obligation.</p>

          <Link
            href={withRef('/team-demo-request-anytime-soccer-training')}
            className="inline-block w-full sm:w-auto px-10 py-4 rounded-lg bg-[#c80b3d] text-white text-lg tracking-[1px] transition-colors hover:bg-[#a80932]"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            BOOK MY FREE DEMO
          </Link>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-gray-500 text-sm mb-2">Just one player rather than a team?</p>
            <Link href={withRef('/pricing')} className="text-[#c80b3d] font-bold hover:underline">
              See individual memberships →
            </Link>
          </div>
        </div>

        <p className="text-center text-white/40 text-sm mt-8">
          Questions? Call Neil on <a href="tel:+18034311082" className="text-white/70 font-bold">803-431-1082</a>
        </p>
      </div>
    </div>
  );
}
