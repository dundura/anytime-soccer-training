'use client';

import { useEffect, useState } from 'react';
import Flag from '@/components/Flag';

type Round = { round: number; name: string; start: string; end: string; keep: number };
type Row = { childId: number; screenname: string; seedRank: number; mins: number; vids: number; country?: string | null; countryName?: string | null; teamName?: string | null };
type Eliminated = { childId: number; screenname: string; eliminatedRound: number; mins: number | null; vids: number | null; finishRank: number | null; country?: string | null; countryName?: string | null };

type Standings = {
  rounds: Round[];
  currentRound: number;
  complete: boolean;
  round: Round | null;
  standings: Row[];
  eliminated: Eliminated[];
  champion: { childId: number; screenname: string; mins: number; vids: number; country?: string | null; countryName?: string | null } | null;
  totalParticipants: number;
  activeParticipants: number;
};

const bebas = { fontFamily: "'Bebas Neue', sans-serif" };

const fmtDate = (d: string) =>
  new Date(`${d}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

export default function AstWorldCupBracket({ highlightChildId }: { highlightChildId?: number | null }) {
  const [data, setData] = useState<Standings | null>(null);
  const [error, setError] = useState(false);
  const [showRules, setShowRules] = useState(false);

  useEffect(() => {
    fetch('https://api.anytime-soccer.com/api/public/ast-world-cup/standings')
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then(setData)
      .catch(() => setError(true));
  }, []);

  if (error) return <p className="text-center text-gray py-12">Standings are warming up — check back in a minute.</p>;
  if (!data) return <p className="text-center text-gray py-12">Loading the bracket…</p>;

  const { rounds, currentRound, complete, round, standings, eliminated, champion } = data;
  const notStarted = round && new Date() < new Date(`${round.start}T00:00:00`) && currentRound === 0;
  const daysLeft = round ? Math.max(0, Math.ceil((new Date(`${round.end}T23:59:59`).getTime() - Date.now()) / 86400000)) : 0;

  const eliminatedByRound: Record<number, Eliminated[]> = {};
  for (const e of eliminated) {
    (eliminatedByRound[e.eliminatedRound] = eliminatedByRound[e.eliminatedRound] || []).push(e);
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm px-4 py-8 sm:px-8 md:px-12 md:py-12">
      {/* Round timeline */}
      <div className="flex flex-wrap justify-center gap-1.5 mb-8">
        {rounds.map((r) => {
          const done = currentRound > r.round || complete;
          const active = !complete && currentRound === r.round;
          return (
            <span
              key={r.round}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap ${
                active ? 'bg-red text-white' : done ? 'bg-navy/10 text-navy' : 'bg-gray-100 text-gray-400'
              }`}
            >
              {done ? '✓ ' : ''}{r.name}
            </span>
          );
        })}
      </div>

      {/* Rules modal */}
      {showRules && (
        <div
          onClick={() => setShowRules(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-lg w-full max-h-[88vh] overflow-y-auto shadow-2xl"
          >
            <div className="bg-navy rounded-t-3xl px-6 py-5 flex items-center justify-between sticky top-0">
              <h3 style={bebas} className="text-white text-2xl tracking-wide m-0">🏆 How the AST World Cup Works</h3>
              <button onClick={() => setShowRules(false)} className="text-white/70 hover:text-white text-2xl leading-none bg-transparent border-none cursor-pointer">×</button>
            </div>
            <div className="px-6 py-5">
              <p className="text-navy text-sm leading-relaxed mb-4">
                Every round, players are ranked by <strong className="text-red">minutes trained</strong> during
                that round&apos;s dates (videos completed breaks ties). <strong>Each round starts fresh from zero</strong> —
                past rounds don&apos;t carry over.
              </p>
              <div className="rounded-xl border border-gray-200 overflow-hidden mb-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-navy text-white">
                      <th className="px-3 py-2 text-left font-bold">Round</th>
                      <th className="px-3 py-2 text-left font-bold">Dates</th>
                      <th className="px-3 py-2 text-left font-bold">Who advances</th>
                    </tr>
                  </thead>
                  <tbody className="text-navy">
                    {[
                      ['Group Stage', 'June 15–28', 'Top 32 of the 150'],
                      ['Round of 32', 'June 29 – July 3', 'Top 16'],
                      ['Round of 16', 'July 4–7', 'Top 8'],
                      ['Quarterfinals', 'July 8–11', 'Top 4'],
                      ['Semifinals', 'July 12–15', 'Top 2'],
                      ['The Final', 'July 16–19', '🏆 Champion crowned July 19'],
                    ].map(([r, d, w], i) => (
                      <tr key={r} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-3 py-2 font-bold">{r}</td>
                        <td className="px-3 py-2">{d}</td>
                        <td className="px-3 py-2">{w}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-gray text-sm leading-relaxed mb-3">
                When a round ends, everyone below the cut line is eliminated and the survivors
                start the next round at zero. The standings update live — stay above the
                <span className="text-red font-bold"> ── top N advance ── </span> line to survive.
              </p>
              <p className="text-gray text-sm leading-relaxed mb-5">
                The last player standing is crowned <strong className="text-navy">AST World Cup Champion</strong> on
                July 19 and earns the permanent 🏆 Champion 2026 badge.
              </p>
              <div className="text-center pb-1">
                <button
                  onClick={() => setShowRules(false)}
                  className="bg-red hover:bg-red-dark text-white px-8 py-3 rounded-full font-bold text-sm border-none cursor-pointer"
                >
                  Got it — let&apos;s train
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Champion */}
      {complete && champion && (
        <div className="text-center mb-10">
          <div className="text-7xl mb-3">🏆</div>
          <p className="text-[#B8821F] text-xs font-bold uppercase tracking-[3px] mb-2">2026 AST World Cup Champion</p>
          <h3 style={bebas} className="text-navy text-5xl sm:text-7xl tracking-wide flex items-center justify-center gap-3 flex-wrap">{champion.country ? <Flag code={champion.country} size="xl" /> : null} {champion.screenname}</h3>
          <p className="text-gray mt-2">{champion.mins} minutes trained in the final</p>
        </div>
      )}

      {/* Current round */}
      {!complete && round && (
        <div className="text-center mb-8">
          <p className="text-red text-xs font-bold uppercase tracking-[3px] mb-2">
            {notStarted ? 'Kicks off June 15' : `${daysLeft} day${daysLeft === 1 ? '' : 's'} left in this round`}
          </p>
          <h3 style={bebas} className="text-navy text-4xl sm:text-5xl tracking-wide mb-1">{round.name}</h3>
          <p className="text-gray">
            {fmtDate(round.start)} – {fmtDate(round.end)} · ranked by minutes trained · top {round.keep} advance
          </p>
          <button
            type="button"
            onClick={() => setShowRules(true)}
            className="mt-2 text-red text-sm font-bold underline decoration-red/40 underline-offset-4 hover:decoration-red bg-transparent border-none cursor-pointer"
          >
            ❓ How it works
          </button>
        </div>
      )}

      {/* Standings */}
      {!complete && standings.length > 0 && (
        <div className="max-w-2xl mx-auto overflow-x-auto rounded-2xl border border-gray-200 mb-10">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-navy text-white">
                <th style={bebas} className="px-3 py-3 text-left text-base tracking-[2px] font-normal w-12">#</th>
                <th style={bebas} className="px-3 py-3 text-left text-base tracking-[2px] font-normal">Player</th>
                <th style={bebas} className="px-3 py-3 text-left text-base tracking-[2px] font-normal hidden sm:table-cell">Team</th>
                <th style={bebas} className="px-3 py-3 text-right text-base tracking-[2px] font-normal w-24">Minutes</th>
                <th style={bebas} className="px-3 py-3 text-right text-base tracking-[2px] font-normal w-20">Videos</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((s, i) => {
                const inside = round ? i < round.keep : true;
                const isMe = highlightChildId != null && s.childId === highlightChildId;
                return (
                  <>
                    <tr
                      key={s.childId}
                      className={`${isMe ? 'bg-[#FFF7E0]' : i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} ${inside ? '' : 'opacity-60'} font-semibold`}
                    >
                      <td style={bebas} className={`px-3 py-2.5 text-base ${i < 3 ? 'text-red' : 'text-gray-400'}`}>
                        {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}
                      </td>
                      <td className="px-3 py-2.5 text-navy truncate max-w-[200px]">
                        {s.country ? <span title={s.countryName || s.country}><Flag code={s.country} size="sm" /></span> : null} {s.screenname}{isMe ? ' (you)' : ''}
                      </td>
                      <td className="px-3 py-2.5 text-gray text-xs truncate max-w-[150px] hidden sm:table-cell">{s.teamName || ''}</td>
                      <td style={bebas} className="px-3 py-2.5 text-right text-navy text-lg">{s.mins}</td>
                      <td className="px-3 py-2.5 text-right text-gray">{s.vids}</td>
                    </tr>
                    {round && i === round.keep - 1 && i < standings.length - 1 && (
                      <tr key={`cut-${s.childId}`}>
                        <td colSpan={5} className="bg-red/10 text-red text-[11px] font-bold uppercase tracking-wider text-center py-1">
                          ── top {round.keep} advance ──
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Eliminated */}
      {eliminated.length > 0 && (
        <div className="max-w-2xl mx-auto">
          <p className="text-gray text-xs font-bold uppercase tracking-wider text-center mb-3">Eliminated</p>
          {Object.keys(eliminatedByRound)
            .map(Number)
            .sort((a, b) => b - a)
            .map((rn) => (
              <div key={rn} className="mb-4">
                <p className="text-navy/60 text-xs font-bold text-center mb-2">{rounds[rn]?.name}</p>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {eliminatedByRound[rn].map((e) => (
                    <span key={e.childId} className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray">
                      {e.country ? <Flag code={e.country} size="sm" /> : null} {e.screenname}{e.mins != null ? ` · ${e.mins}m` : ''}
                    </span>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
