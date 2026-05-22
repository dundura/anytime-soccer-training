'use client';

import { useState } from 'react';

export default function HeroPdfCta() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle');

  const handleSend = async () => {
    if (!email || status === 'loading') return;
    setStatus('loading');
    try {
      const res = await fetch('/api/send-budget-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email, name,
          inputs: { players: 20, numTeams: 1, totalPlayers: 20, fee: 150, months: 10, fundraising: 0, numCoaches: 2, headCoach: 3000, specialty: 800, offseasonMonths: 2, fieldHr: 120, sessions: 3, hrs: 1.5, weeks: 40, gamesField: 2400, league: 4000, insurance: 2500, equipment: 3000, admin: 500, software: 150, marketing: 1200 },
          results: { revenue: 30000, playerFees: 30000, fundraising: 0, coaching: 60000, offseason: 6000, specialtyAnn: 8000, fieldTraining: 21600, gamesField: 2400, league: 4000, insurance: 2500, equipment: 3000, adminAnn: 6500, marketing: 1200, totalCosts: 115200, net: -85200, cph: 320, costPP: 5760, totalHrs: 180 },
        }),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div className="mt-6 text-white/80 text-[14px]">
        ✓ Check your inbox — we sent a sample report.
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
