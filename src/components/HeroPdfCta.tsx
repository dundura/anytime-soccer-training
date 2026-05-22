'use client';

import { useState } from 'react';

const SAMPLE_INPUTS = { players: 16, numTeams: 1, totalPlayers: 16, fee: 4000, months: 10, fundraising: 0, numCoaches: 1, headCoach: 850, headCoachMonths: 10, specialty: 0, fieldHr: 120, sessions: 2, hrs: 1.5, weeks: 40, league: 4000, insurance: 1920, equipment: 2400, admin: 960, software: 960, marketing: 1440 };
const SAMPLE_RESULTS = { revenue: 64000, playerFees: 64000, fundraising: 0, otherRevenue: 0, coaching: 8500, assistantAnn: 0, specialtyAnn: 0, fieldTraining: 18000, league: 4000, insurance: 1920, equipment: 2400, adminAnn: 19200, marketing: 1440, totalCosts: 55460, net: 8540, cph: 17.27, costPP: 3466, totalHrs: 120 };

export default function HeroPdfCta() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle');

  const handleSend = async () => {
    if (!email || status === 'loading') return;
    setStatus('loading');
    try {
      // Try to use real calculator data from localStorage snapshot
      let inputs = SAMPLE_INPUTS;
      let results = SAMPLE_RESULTS;
      try {
        const snap = localStorage.getItem('calc_snapshot');
        if (snap) {
          const parsed = JSON.parse(snap);
          if (parsed.inputs && parsed.results) {
            inputs = parsed.inputs;
            results = parsed.results;
          }
        }
      } catch {}

      const res = await fetch('/api/send-budget-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, inputs, results }),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div className="mt-6 text-white text-[14px] font-medium">
        ✓ Check your inbox — your report is on its way.
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="text-white/50 text-[12px] mb-2 uppercase tracking-wider font-semibold">Get a PDF of your results</div>
      <div className="flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="flex-1 min-w-[130px] text-[14px] rounded-lg px-3 py-2 bg-white border border-white/20 text-[#111] placeholder-gray-400 outline-none"
        />
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={e => { setEmail(e.target.value); if (status === 'error') setStatus('idle'); }}
          className="flex-1 min-w-[180px] text-[14px] rounded-lg px-3 py-2 bg-white border border-white/20 text-[#111] placeholder-gray-400 outline-none"
        />
        <button
          onClick={handleSend}
          disabled={!email || status === 'loading'}
          className="text-[13px] font-semibold bg-[#DC373E] hover:bg-[#c42f35] text-white rounded-lg px-4 py-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {status === 'loading' ? 'Sending…' : 'Send PDF'}
        </button>
      </div>
      {status === 'error' && <div className="text-red-300 text-[12px] mt-2">Something went wrong — try again.</div>}
    </div>
  );
}
