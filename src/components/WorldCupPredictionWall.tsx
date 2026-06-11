'use client';

import { useEffect, useState } from 'react';
import { ALL_TEAMS } from '@/data/worldCup2026';

type Entry = {
  name: string;
  champion: string;
  finalScore: string | null;
  boldness: number;
  points: number | null;
  createdAt: string;
};

type Board = {
  actualsSet: boolean;
  total: number;
  entries: Entry[];
};

const bebas = { fontFamily: "'Bebas Neue', sans-serif" };

export default function WorldCupPredictionWall() {
  const [board, setBoard] = useState<Board | null>(null);

  useEffect(() => {
    fetch('https://api.anytime-soccer.com/api/public/world-cup-prediction/board')
      .then((res) => (res.ok ? res.json() : null))
      .then(setBoard)
      .catch(() => setBoard(null));
  }, []);

  if (!board || board.entries.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm px-4 py-8 sm:px-8 md:px-12 md:py-12">
      <div className="text-center mb-8">
        <p className="text-red text-xs font-bold uppercase tracking-[3px] mb-2">
          {board.actualsSet ? 'Accuracy leaderboard' : 'The prediction wall'}
        </p>
        <h2 style={bebas} className="text-navy text-4xl sm:text-5xl tracking-wide mb-2">
          {board.actualsSet ? 'Who called it?' : 'Fan predictions'}
        </h2>
        <p className="text-gray text-base">
          {board.actualsSet
            ? `${board.total} fans made a prediction — ranked by accuracy as results come in.`
            : `${board.total} fan${board.total === 1 ? '' : 's'} have locked in a bracket. Accuracy scores appear here as real results come in.`}
        </p>
      </div>

      {board.actualsSet ? (
        <div className="max-w-2xl mx-auto overflow-hidden rounded-2xl border border-gray-200">
          {board.entries.slice(0, 20).map((e, i) => (
            <div
              key={`${e.name}-${e.createdAt}`}
              className={`flex items-center gap-3 px-4 py-3 text-sm ${
                i % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              } ${i < 3 ? 'font-bold' : 'font-semibold'}`}
            >
              <span style={bebas} className={`w-8 text-lg ${i < 3 ? 'text-red' : 'text-gray-400'}`}>
                {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}`}
              </span>
              <span className="flex-1 text-navy truncate">{e.name}</span>
              <span className="text-gray hidden sm:inline">
                {ALL_TEAMS[e.champion]?.flag} {e.champion}
              </span>
              <span style={bebas} className="text-navy text-lg w-16 text-right">
                {e.points} pts
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
          {board.entries.slice(0, 24).map((e) => (
            <span
              key={`${e.name}-${e.createdAt}`}
              className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-full px-3.5 py-2 text-sm font-semibold text-navy"
            >
              {e.name}: {ALL_TEAMS[e.champion]?.flag} {e.champion}
              {e.finalScore ? <span className="text-gray font-normal">({e.finalScore})</span> : null}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
