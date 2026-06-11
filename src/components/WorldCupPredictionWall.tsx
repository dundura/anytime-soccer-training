'use client';

import { Fragment, useEffect, useState } from 'react';
import { ALL_TEAMS } from '@/data/worldCup2026';
import Flag from '@/components/Flag';

type PickStatus = 'correct' | 'wrong' | 'pending';

type Detail = {
  groups: { letter: string; pick: string; status: PickStatus }[];
  semis: { team: string; status: PickStatus }[];
  finalists: { team: string; status: PickStatus }[];
  champion: { team: string; status: PickStatus };
};

type Entry = {
  name: string;
  champion: string;
  finalScore: string | null;
  boldness: number;
  points: number | null;
  wins: number | null;
  losses: number | null;
  detail: Detail;
  createdAt: string;
};

type Board = {
  actualsSet: boolean;
  total: number;
  entries: Entry[];
};

const bebas = { fontFamily: "'Bebas Neue', sans-serif" };

const STATUS_STYLES: Record<PickStatus, string> = {
  correct: 'border-green-300 bg-green-50 text-green-800',
  wrong: 'border-red/40 bg-red/5 text-red line-through',
  pending: 'border-gray-200 bg-white text-navy/70',
};

function StatusIcon({ status }: { status: PickStatus }) {
  if (status === 'correct') return <span className="text-green-600">✓</span>;
  if (status === 'wrong') return <span className="text-red">✗</span>;
  return null;
}

export default function WorldCupPredictionWall() {
  const [board, setBoard] = useState<Board | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    fetch('https://api.anytime-soccer.com/api/public/world-cup-prediction/board')
      .then((res) => (res.ok ? res.json() : null))
      .then(setBoard)
      .catch(() => setBoard(null));
  }, []);

  if (!board) return null;

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm px-4 py-8 sm:px-8 md:px-12 md:py-12">
      <div className="text-center mb-8">
        <p className="text-red text-xs font-bold uppercase tracking-[3px] mb-2">
          Live leaderboard
        </p>
        <h2 style={bebas} className="text-navy text-4xl sm:text-5xl tracking-wide mb-2">
          Fan predictions
        </h2>
        <p className="text-gray text-base">
          {board.entries.length === 0
            ? 'No predictions yet — be the first to lock in a bracket!'
            : board.actualsSet
              ? `${board.total} fan${board.total === 1 ? '' : 's'} ranked by accuracy — tap a name to see every pick.`
              : `${board.total} fan${board.total === 1 ? '' : 's'} have locked in a bracket. Tap a name to see every pick — wins and losses update as real results come in.`}
        </p>
      </div>

      {board.entries.length > 0 && (
        <div className="max-w-3xl mx-auto overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-navy text-white">
                <th style={bebas} className="px-3 py-3 text-left text-base tracking-[2px] font-normal w-12">#</th>
                <th style={bebas} className="px-3 py-3 text-left text-base tracking-[2px] font-normal">Fan</th>
                <th style={bebas} className="px-3 py-3 text-left text-base tracking-[2px] font-normal">Champion &amp; predicted final</th>
                <th style={bebas} className="px-3 py-3 text-center text-base tracking-[2px] font-normal w-14">W</th>
                <th style={bebas} className="px-3 py-3 text-center text-base tracking-[2px] font-normal w-14">L</th>
                <th style={bebas} className="px-3 py-3 text-right text-base tracking-[2px] font-normal w-16">Pts</th>
              </tr>
            </thead>
            <tbody>
              {board.entries.slice(0, 25).map((e, i) => (
                <Fragment key={`${e.name}-${e.createdAt}`}>
                  <tr
                    className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} ${
                      board.actualsSet && i < 3 ? 'font-bold' : 'font-semibold'
                    }`}
                  >
                    <td
                      style={bebas}
                      className={`px-3 py-3 text-base ${board.actualsSet && i < 3 ? 'text-red' : 'text-gray-400'}`}
                    >
                      {board.actualsSet
                        ? i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1
                        : i + 1}
                    </td>
                    <td className="px-3 py-3 max-w-[140px]">
                      <button
                        type="button"
                        onClick={() => setExpanded(expanded === i ? null : i)}
                        className="text-navy underline decoration-red/50 underline-offset-2 hover:text-red transition-colors truncate"
                      >
                        {e.name} {expanded === i ? '▴' : '▾'}
                      </button>
                    </td>
                    <td className="px-3 py-3 text-navy whitespace-normal sm:whitespace-nowrap">
                      <Flag code={ALL_TEAMS[e.champion]?.code} size="sm" /> {e.champion}
                      {(() => {
                        const runnerUp = e.detail.finalists.find((f) => f.team !== e.champion)?.team;
                        return e.finalScore && runnerUp ? (
                          <span className="text-gray font-normal text-xs">
                            {' '}{e.finalScore} <Flag code={ALL_TEAMS[runnerUp]?.code} size="sm" />
                          </span>
                        ) : null;
                      })()}
                    </td>
                    <td className="px-3 py-3 text-center text-green-700">{e.wins ?? '—'}</td>
                    <td className="px-3 py-3 text-center text-red">{e.losses ?? '—'}</td>
                    <td style={bebas} className="px-3 py-3 text-right text-navy text-lg">
                      {e.points ?? '—'}
                    </td>
                  </tr>
                  {expanded === i && (
                    <tr>
                      <td colSpan={6} className="bg-[#F8FAFD] px-3 sm:px-4 py-5 border-t border-gray-100">
                        <div className="space-y-4 max-w-full">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-gray text-xs font-bold uppercase tracking-wider w-24 shrink-0">Champion</span>
                            <span className={`inline-flex items-center gap-1.5 border rounded-full px-3 py-1.5 text-sm font-bold ${STATUS_STYLES[e.detail.champion.status]}`}>
                              🏆 <Flag code={ALL_TEAMS[e.detail.champion.team]?.code} size="sm" /> {e.detail.champion.team}
                              <StatusIcon status={e.detail.champion.status} />
                            </span>
                            {e.finalScore && (
                              <span className="text-gray text-xs">predicted final: {e.finalScore}</span>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-gray text-xs font-bold uppercase tracking-wider w-24 shrink-0">The Final</span>
                            {e.detail.finalists.map((f) => (
                              <span key={f.team} className={`inline-flex items-center gap-1.5 border rounded-full px-3 py-1.5 text-sm font-semibold ${STATUS_STYLES[f.status]}`}>
                                <Flag code={ALL_TEAMS[f.team]?.code} size="sm" /> {f.team}
                                <StatusIcon status={f.status} />
                              </span>
                            ))}
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-gray text-xs font-bold uppercase tracking-wider w-24 shrink-0">Final Four</span>
                            {e.detail.semis.map((s) => (
                              <span key={s.team} className={`inline-flex items-center gap-1.5 border rounded-full px-3 py-1.5 text-sm font-semibold ${STATUS_STYLES[s.status]}`}>
                                <Flag code={ALL_TEAMS[s.team]?.code} size="sm" /> {s.team}
                                <StatusIcon status={s.status} />
                              </span>
                            ))}
                          </div>
                          <div className="flex flex-wrap items-start gap-2">
                            <span className="text-gray text-xs font-bold uppercase tracking-wider w-24 shrink-0 pt-1.5">Groups</span>
                            <div className="flex flex-wrap gap-1.5 flex-1">
                              {e.detail.groups.map((g) => (
                                <span key={g.letter} className={`inline-flex items-center gap-1 border rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[g.status]}`}>
                                  <span className="text-gray-400 font-bold">{g.letter}:</span>
                                  <Flag code={ALL_TEAMS[g.pick]?.code} size="sm" /> {g.pick}
                                  <StatusIcon status={g.status} />
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
