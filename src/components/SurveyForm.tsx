'use client';

import { useState } from 'react';

const LEVELS = [
  { group: 'Recreational', options: ['Recreational / Local rec', 'AYSO'] },
  { group: 'Travel / Competitive', options: ['USYS State League', 'US Club Soccer', 'NPL (National Premier League)', 'ECNL Regional League (ECRL)', 'ECNL', 'MLS Next', 'USL Academy'] },
  { group: 'High School', options: ['High School varsity'] },
  { group: 'Other', options: ['Other'] },
];

const inputStyle = { width: '100%', fontSize: '14px', border: '1px solid #d1d5db', borderRadius: '8px', padding: '8px 12px', background: '#fff', color: '#111', outline: 'none' };
const cardStyle = { background: '#fff', border: '1px solid #e5e7eb', borderTop: 'none', borderRadius: '0 0 12px 12px', padding: '0.75rem 1rem', marginBottom: '12px' };
const rowStyle = { display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: '1px solid #f0f0f0' as const };
const labelStyle = { flex: 1, fontSize: '14px', color: '#111' };
const subStyle = { fontSize: '12px', color: '#888', marginTop: '2px' };
const sectionLabelStyle = { fontSize: '11px', fontWeight: '600' as const, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#9ca3af', margin: '0 0 8px' };

function SectionHeader({ label, open, onToggle }: { label: string; open?: boolean; onToggle?: () => void }) {
  if (!onToggle) {
    return (
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px 12px 0 0', padding: '12px 16px', marginBottom: 0 }}>
        <span style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6b7280' }}>{label}</span>
      </div>
    );
  }
  return (
    <button onClick={onToggle}
      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', background: '#fff', border: '1px solid #e5e7eb', borderRadius: open ? '12px 12px 0 0' : '12px', cursor: 'pointer', padding: '12px 16px', textAlign: 'left', marginBottom: open ? '0' : '12px' }}>
      <span style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6b7280' }}>{label}</span>
      <span style={{ fontSize: '14px', color: '#9ca3af', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', display: 'inline-block' }}>▾</span>
    </button>
  );
}

function HrsRow({ label, sub, value, onChange }: { label: string; sub?: string; value: string; onChange: (v: string) => void }) {
  return (
    <div style={rowStyle}>
      <div style={labelStyle}>
        <div>{label}</div>
        {sub && <div style={subStyle}>{sub}</div>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
        <input type="number" inputMode="decimal" value={value} placeholder="0" min="0" max="40" step="0.5"
          onChange={e => onChange(e.target.value)}
          style={{ width: '72px', textAlign: 'right', fontSize: '14px', border: '1px solid #d1d5db', borderRadius: '8px', padding: '6px 8px', background: '#fff', color: '#111', outline: 'none' }} />
        <span style={{ fontSize: '12px', color: '#9ca3af', whiteSpace: 'nowrap' }}>hrs/wk</span>
      </div>
    </div>
  );
}

function YesNoRow({ label, sub, value, onChange }: { label: string; sub?: string; value: boolean | null; onChange: (v: boolean) => void }) {
  return (
    <div style={rowStyle}>
      <div style={labelStyle}>
        <div>{label}</div>
        {sub && <div style={subStyle}>{sub}</div>}
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        {[{ label: 'Yes', val: true }, { label: 'No', val: false }].map(opt => (
          <button key={opt.label} onClick={() => onChange(opt.val)}
            style={{ padding: '6px 16px', fontSize: '13px', fontWeight: '600', borderRadius: '8px', border: `2px solid ${value === opt.val ? '#DC373E' : '#e5e7eb'}`, background: value === opt.val ? '#DC373E' : '#fff', color: value === opt.val ? '#fff' : '#374151', cursor: 'pointer', transition: 'all 0.15s' }}>
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function SurveyForm() {
  const [outdoor, setOutdoor] = useState('');
  const [indoor, setIndoor] = useState('');
  const [futsal, setFutsal] = useState('');
  const [priv, setPriv] = useState('');
  const [privateGroup, setPrivateGroup] = useState('');
  const [self, setSelf] = useState('');
  const [games, setGames] = useState('');
  const [freePlay, setFreePlay] = useState('');
  const [beforeSchool, setBeforeSchool] = useState<boolean | null>(null);
  const [beforePractice, setBeforePractice] = useState<boolean | null>(null);
  const [homeschooled, setHomeschooled] = useState<boolean | null>(null);
  const [age, setAge] = useState(10);
  const [level, setLevel] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle');

  const [playOpen, setPlayOpen] = useState(false);
  const [questionsOpen, setQuestionsOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);

  const canSubmit = email.includes('@') && !!name;

  const submit = async () => {
    if (!canSubmit || status === 'loading') return;
    setStatus('loading');
    try {
      const res = await fetch('/api/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email,
          answers: { outdoor: parseFloat(outdoor)||0, indoor: parseFloat(indoor)||0, futsal: parseFloat(futsal)||0, private: parseFloat(priv)||0, privateGroup: parseFloat(privateGroup)||0, self: parseFloat(self)||0, games: parseFloat(games)||0, freePlay: parseFloat(freePlay)||0, beforeSchool, beforePractice, homeschooled, age, level },
        }),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch { setStatus('error'); }
  };

  if (status === 'sent') {
    return (
      <div style={{ maxWidth: '680px', margin: '60px auto', padding: '3rem 1.5rem', textAlign: 'center', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <div style={{ fontSize: '56px', marginBottom: '16px' }}>✅</div>
        <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#0f2642', marginBottom: '10px' }}>Report on its way!</h2>
        <p style={{ fontSize: '15px', color: '#6b7280' }}>Check your inbox — we've sent your personalized training comparison PDF.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '1.5rem 1rem 4rem', fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* Train */}
      <SectionHeader label="Train — hours per week" />
      <div style={cardStyle}>
        <div style={{ ...rowStyle, flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ ...labelStyle }}>
            <div>Team training</div>
            <div style={subStyle}>Organized team sessions</div>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontSize: '11px', color: '#9ca3af' }}>Outdoor</span>
              <input type="number" inputMode="decimal" value={outdoor} placeholder="0" min="0" max="40" step="0.5"
                onChange={e => setOutdoor(e.target.value)}
                style={{ width: '56px', textAlign: 'right', fontSize: '14px', border: '1px solid #d1d5db', borderRadius: '8px', padding: '6px 8px', background: '#fff', color: '#111', outline: 'none' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontSize: '11px', color: '#9ca3af' }}>Indoor</span>
              <input type="number" inputMode="decimal" value={indoor} placeholder="0" min="0" max="40" step="0.5"
                onChange={e => setIndoor(e.target.value)}
                style={{ width: '56px', textAlign: 'right', fontSize: '14px', border: '1px solid #d1d5db', borderRadius: '8px', padding: '6px 8px', background: '#fff', color: '#111', outline: 'none' }} />
            </div>
            <span style={{ fontSize: '12px', color: '#9ca3af', whiteSpace: 'nowrap' }}>hrs/wk</span>
          </div>
        </div>
        <HrsRow label="Futsal" sub="Futsal sessions or league" value={futsal} onChange={setFutsal} />
        <HrsRow label="Private / 1-on-1 coaching" sub="Individual sessions with a trainer" value={priv} onChange={setPriv} />
        <HrsRow label="Private group training" sub="Small group sessions (2–8 players)" value={privateGroup} onChange={setPrivateGroup} />
        <HrsRow label="Self-training at home" sub="Solo ball work, wall passing, juggling" value={self} onChange={setSelf} />
      </div>

      {/* Play */}
      <SectionHeader label="Play — hours per week" open={playOpen} onToggle={() => setPlayOpen(o => !o)} />
      {playOpen && <div style={cardStyle}>
        <HrsRow label="Games" sub="Competitive matches — league, tournament, friendly" value={games} onChange={setGames} />
        <HrsRow label="Free play" sub="Pick-up, backyard, street soccer — no coaching" value={freePlay} onChange={setFreePlay} />
      </div>}

      {/* Questions */}
      <SectionHeader label="A few more questions" open={questionsOpen} onToggle={() => setQuestionsOpen(o => !o)} />
      {questionsOpen && <div style={cardStyle}>
        <YesNoRow label="Does your child ever train before school?" value={beforeSchool} onChange={setBeforeSchool} />
        <YesNoRow label="Does your child ever train before team practice?" value={beforePractice} onChange={setBeforePractice} />
        <YesNoRow label="Is your child homeschooled?" value={homeschooled} onChange={setHomeschooled} />

        {/* Age */}
        <div style={rowStyle}>
          <div style={labelStyle}>How old is your child?</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <input type="number" inputMode="numeric" value={age === 0 ? '' : age} placeholder="10" min="4" max="18"
              onChange={e => setAge(parseInt(e.target.value) || 10)}
              style={{ width: '64px', textAlign: 'right', fontSize: '14px', border: '1px solid #d1d5db', borderRadius: '8px', padding: '6px 8px', background: '#fff', color: '#111', outline: 'none' }} />
            <span style={{ fontSize: '12px', color: '#9ca3af' }}>yrs old</span>
          </div>
        </div>

        {/* Level */}
        <div style={rowStyle}>
          <div style={labelStyle}>What level do they play?</div>
          <select value={level} onChange={e => setLevel(e.target.value)}
            style={{ ...inputStyle, width: '220px', cursor: 'pointer' }}>
            <option value="">Select level...</option>
            {LEVELS.map(g => (
              <optgroup key={g.group} label={g.group}>
                {g.options.map(o => <option key={o} value={o}>{o}</option>)}
              </optgroup>
            ))}
          </select>
        </div>
      </div>}

      {/* Email capture */}
      <SectionHeader label="Get your free report" open={reportOpen} onToggle={() => setReportOpen(o => !o)} />
      {reportOpen && <div style={cardStyle}>
        <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '12px' }}>
          Enter your name and email — we'll send a free PDF showing how your child compares to other players their age.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} style={inputStyle} />
          <input type="email" placeholder="your@email.com" value={email} onChange={e => { setEmail(e.target.value); if (status === 'error') setStatus('idle'); }} style={inputStyle} />
          <button onClick={submit} disabled={!canSubmit || status === 'loading'}
            style={{ fontSize: '15px', fontWeight: '700', background: canSubmit ? '#DC373E' : '#d1d5db', color: '#fff', border: 'none', borderRadius: '10px', padding: '12px', cursor: canSubmit ? 'pointer' : 'not-allowed', transition: 'background 0.15s', alignSelf: 'flex-start', minWidth: '180px' }}>
            {status === 'loading' ? 'Sending…' : 'Send My Report →'}
          </button>
          {status === 'error' && <p style={{ fontSize: '12px', color: '#DC373E' }}>Something went wrong — please try again.</p>}
        </div>
      </div>}

    </div>
  );
}
