'use client';

import { useEffect, useState } from 'react';
import WorldCupPredictor from '@/components/WorldCupPredictor';
import WorldCupPredictionWall from '@/components/WorldCupPredictionWall';

type Tab = 'predict' | 'board';

export default function WorldCupTabs() {
  const [tab, setTab] = useState<Tab>('predict');

  useEffect(() => {
    const applyHash = () => {
      if (window.location.hash === '#leaderboard') setTab('board');
      else if (window.location.hash === '#predictor') setTab('predict');
    };
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, []);

  return (
    <div id="leaderboard" className="scroll-mt-6">
      <div className="flex justify-center gap-2 mb-6">
        <button
          type="button"
          onClick={() => setTab('predict')}
          className={`px-6 py-3 rounded-full font-bold text-sm sm:text-base transition-all ${
            tab === 'predict'
              ? 'bg-navy text-white shadow-md'
              : 'bg-white text-navy border border-gray-200 hover:border-navy/40'
          }`}
        >
          🏆 My Prediction
        </button>
        <button
          type="button"
          onClick={() => setTab('board')}
          className={`px-6 py-3 rounded-full font-bold text-sm sm:text-base transition-all ${
            tab === 'board'
              ? 'bg-navy text-white shadow-md'
              : 'bg-white text-navy border border-gray-200 hover:border-navy/40'
          }`}
        >
          🏅 Live Leaderboard
        </button>
      </div>

      {/* Keep both mounted so in-progress picks survive tab switches */}
      <div className={tab === 'predict' ? '' : 'hidden'}>
        <WorldCupPredictor />
      </div>
      <div className={tab === 'board' ? '' : 'hidden'}>
        <WorldCupPredictionWall />
      </div>
    </div>
  );
}
