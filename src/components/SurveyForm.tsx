'use client';

import { useState } from 'react';

const LEVELS = [
  { group: 'Recreational', options: ['Recreational / Local rec', 'AYSO'] },
  { group: 'Travel / Competitive', options: ['USYS State League', 'US Club Soccer', 'NPL (National Premier League)', 'ECNL Regional League (ECRL)', 'ECNL', 'MLS Next', 'USL Academy'] },
  { group: 'High School', options: ['High School varsity'] },
  { group: 'Other', options: ['Other'] },
];

const SLIDER_STEPS = [
  { id: 'outdoor',      section: 'Train', label: 'Team training (outdoor)', sub: 'Organized sessions on an outdoor field' },
  { id: 'indoor',       section: 'Train', label: 'Team training (indoor)', sub: 'Gym, indoor turf, or bubble' },
  { id: 'futsal',       section: 'Train', label: 'Futsal', sub: 'Futsal sessions or league' },
  { id: 'private',      section: 'Train', label: 'Private / 1-on-1 coaching', sub: 'Individual sessions with a trainer' },
  { id: 'privateGroup', section: 'Train', label: 'Private group training', sub: 'Small group sessions (2–8 players)' },
  { id: 'self',         section: 'Train', label: 'Self-training at home', sub: 'Solo work — ball mastery, wall passing, juggling' },
  { id: 'games',        section: 'Play',  label: 'Games', sub: 'Competitive matches (league, tournament, friendly)' },
  { id: 'freePlay',     section: 'Play',  label: 'Free play', sub: 'Pick-up, backyard, street soccer — no coaching' },
];

const STEPS = [
  ...SLIDER_STEPS.map(s => ({ ...s, type: 'slider' as const })),
  { id: 'beforeSchool',    type: 'yesno'    as const, label: 'Does your child ever train before school?', sub: 'Morning sessions before the school day starts' },
  { id: 'beforePractice',  type: 'yesno'    as const, label: 'Does your child ever train before team practice?', sub: 'Extra work on top of scheduled team sessions' },
  { id: 'homeschooled',    type: 'yesno'    as const, label: 'Is your child homeschooled?', sub: '' },
  { id: 'age',             type: 'age'      as const, label: 'How old is your child?', sub: '' },
  { id: 'level',           type: 'dropdown' as const, label: 'What level do they play?', sub: 'Select their current primary league or program' },
  { id: 'contact',         type: 'contact'  as const, label: 'Get your personalized report', sub: "We'll email you a PDF showing how your child compares to others their age." },
];

type Answers = Record<string, number | string | boolean>;

function SliderStep({ step, value, onChange }: { step: typeof STEPS[0]; value: number; onChange: (v: number) => void }) {
  const display = value === 0 ? 'None' : value === 20 ? '20+ hrs/wk' : `${value} hr${value === 1 ? '' : 's'}/wk`;
  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        {'section' in step && <div style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#DC373E', marginBottom: '12px' }}>{step.section}</div>}
        <h2 style={{ fontSize: 'clamp(22px,4vw,32px)', fontWeight: '800', color: '#0f2642', marginBottom: '8px', lineHeight: 1.2 }}>{step.label}</h2>
        {step.sub && <p style={{ fontSize: '15px', color: '#6b7280' }}>{step.sub}</p>}
      </div>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <span style={{ fontSize: '48px', fontWeight: '800', color: value === 0 ? '#d1d5db' : '#0f2642' }}>{display}</span>
      </div>
      <input type="range" min="0" max="20" step="0.5" value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        style={{ width: '100%', accentColor: '#DC373E', cursor: 'pointer', height: '6px' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#9ca3af', marginTop: '8px' }}>
        <span>None</span><span>20+ hrs/wk</span>
      </div>
    </div>
  );
}

function YesNoStep({ step, value, onChange }: { step: typeof STEPS[0]; value: boolean | null; onChange: (v: boolean) => void }) {
  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: 'clamp(22px,4vw,32px)', fontWeight: '800', color: '#0f2642', marginBottom: '8px', lineHeight: 1.3 }}>{step.label}</h2>
        {step.sub && <p style={{ fontSize: '15px', color: '#6b7280' }}>{step.sub}</p>}
      </div>
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
        {[{ label: 'Yes', val: true }, { label: 'No', val: false }].map(opt => (
          <button key={opt.label} onClick={() => onChange(opt.val)}
            style={{ flex: 1, maxWidth: '160px', padding: '20px', fontSize: '20px', fontWeight: '700', borderRadius: '16px', border: `3px solid ${value === opt.val ? '#DC373E' : '#e5e7eb'}`, background: value === opt.val ? '#DC373E' : '#fff', color: value === opt.val ? '#fff' : '#374151', cursor: 'pointer', transition: 'all 0.15s' }}>
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function AgeStep({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: 'clamp(22px,4vw,32px)', fontWeight: '800', color: '#0f2642', marginBottom: '8px' }}>How old is your child?</h2>
      </div>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <span style={{ fontSize: '64px', fontWeight: '800', color: '#0f2642' }}>{value}</span>
        <span style={{ fontSize: '24px', color: '#9ca3af', marginLeft: '8px' }}>yrs old</span>
      </div>
      <input type="range" min="4" max="18" step="1" value={value}
        onChange={e => onChange(parseInt(e.target.value))}
        style={{ width: '100%', accentColor: '#DC373E', cursor: 'pointer', height: '6px' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#9ca3af', marginTop: '8px' }}>
        <span>4</span><span>18</span>
      </div>
    </div>
  );
}

function DropdownStep({ step, value, onChange }: { step: typeof STEPS[0]; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: 'clamp(22px,4vw,32px)', fontWeight: '800', color: '#0f2642', marginBottom: '8px' }}>{step.label}</h2>
        {step.sub && <p style={{ fontSize: '15px', color: '#6b7280' }}>{step.sub}</p>}
      </div>
      <select value={value} onChange={e => onChange(e.target.value)}
        style={{ width: '100%', fontSize: '16px', padding: '14px 16px', border: '2px solid #e5e7eb', borderRadius: '12px', color: value ? '#111' : '#9ca3af', background: '#fff', cursor: 'pointer', outline: 'none' }}>
        <option value="">Select level...</option>
        {LEVELS.map(g => (
          <optgroup key={g.group} label={g.group}>
            {g.options.map(o => <option key={o} value={o}>{o}</option>)}
          </optgroup>
        ))}
      </select>
    </div>
  );
}

function ContactStep({ name, setName, email, setEmail, status }: { name: string; setName: (v: string) => void; email: string; setEmail: (v: string) => void; status: string }) {
  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ fontSize: '40px', marginBottom: '12px' }}>📊</div>
        <h2 style={{ fontSize: 'clamp(22px,4vw,30px)', fontWeight: '800', color: '#0f2642', marginBottom: '8px' }}>Get your personalized report</h2>
        <p style={{ fontSize: '15px', color: '#6b7280', maxWidth: '360px', margin: '0 auto' }}>We'll email you a free PDF showing how your child compares to others their age.</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '380px', margin: '0 auto' }}>
        <input type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)}
          style={{ fontSize: '16px', padding: '14px 16px', border: '2px solid #e5e7eb', borderRadius: '12px', color: '#111', outline: 'none' }} />
        <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)}
          style={{ fontSize: '16px', padding: '14px 16px', border: '2px solid #e5e7eb', borderRadius: '12px', color: '#111', outline: 'none' }} />
      </div>
    </div>
  );
}

export default function SurveyForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({
    outdoor: 0, indoor: 0, futsal: 0, private: 0, privateGroup: 0, self: 0,
    games: 0, freePlay: 0,
    beforeSchool: null, beforePractice: null, homeschooled: null,
    age: 10, level: '',
  });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle');

  const current = STEPS[step];
  const progress = Math.round((step / STEPS.length) * 100);

  const canAdvance = () => {
    if (current.type === 'yesno') return answers[current.id] !== null && answers[current.id] !== undefined;
    if (current.type === 'dropdown') return !!answers[current.id];
    if (current.type === 'contact') return !!name && email.includes('@');
    return true;
  };

  const next = () => { if (step < STEPS.length - 1) setStep(s => s + 1); };
  const back = () => { if (step > 0) setStep(s => s - 1); };

  const submit = async () => {
    setStatus('loading');
    try {
      const res = await fetch('/api/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, answers }),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch { setStatus('error'); }
  };

  if (status === 'sent') {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f2642 0%, #1a4270 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <div style={{ textAlign: 'center', maxWidth: '480px' }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>✅</div>
          <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#fff', marginBottom: '12px' }}>Report on its way!</h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', marginBottom: '24px' }}>Check your inbox — we've sent your personalized training comparison PDF.</p>
          <a href="/" style={{ display: 'inline-block', background: '#DC373E', color: '#fff', fontWeight: '700', padding: '14px 28px', borderRadius: '12px', textDecoration: 'none', fontSize: '15px' }}>Back to Anytime Soccer →</a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Progress bar */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '4px', background: '#e5e7eb', zIndex: 50 }}>
        <div style={{ height: '100%', background: '#DC373E', width: `${progress}%`, transition: 'width 0.3s ease' }} />
      </div>

      {/* Header */}
      <div style={{ background: '#0f2642', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }}>Anytime Soccer Training</div>
        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>{step + 1} / {STEPS.length}</div>
      </div>

      {/* Question area */}
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem 1.5rem 8rem' }}>

        {current.type === 'slider' && (
          <SliderStep step={current} value={answers[current.id] as number}
            onChange={v => setAnswers(a => ({ ...a, [current.id]: v }))} />
        )}
        {current.type === 'yesno' && (
          <YesNoStep step={current} value={answers[current.id] as boolean | null}
            onChange={v => { setAnswers(a => ({ ...a, [current.id]: v })); setTimeout(next, 300); }} />
        )}
        {current.type === 'age' && (
          <AgeStep value={answers.age as number} onChange={v => setAnswers(a => ({ ...a, age: v }))} />
        )}
        {current.type === 'dropdown' && (
          <DropdownStep step={current} value={answers[current.id] as string}
            onChange={v => setAnswers(a => ({ ...a, [current.id]: v }))} />
        )}
        {current.type === 'contact' && (
          <ContactStep name={name} setName={setName} email={email} setEmail={setEmail} status={status} />
        )}
      </div>

      {/* Bottom nav */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#fff', borderTop: '1px solid #e5e7eb', padding: '16px 24px', display: 'flex', gap: '12px', maxWidth: '600px', margin: '0 auto' }}>
        {step > 0 && (
          <button onClick={back}
            style={{ padding: '14px 24px', fontSize: '15px', fontWeight: '600', border: '2px solid #e5e7eb', borderRadius: '12px', background: '#fff', color: '#374151', cursor: 'pointer', width: '100px' }}>
            ← Back
          </button>
        )}
        {current.type !== 'yesno' && (
          current.type === 'contact' ? (
            <button onClick={submit} disabled={!canAdvance() || status === 'loading'}
              style={{ flex: 1, padding: '14px', fontSize: '15px', fontWeight: '700', border: 'none', borderRadius: '12px', background: canAdvance() ? '#DC373E' : '#d1d5db', color: '#fff', cursor: canAdvance() ? 'pointer' : 'not-allowed', transition: 'background 0.15s' }}>
              {status === 'loading' ? 'Sending…' : 'Send My Report →'}
            </button>
          ) : (
            <button onClick={next} disabled={!canAdvance()}
              style={{ flex: 1, padding: '14px', fontSize: '15px', fontWeight: '700', border: 'none', borderRadius: '12px', background: canAdvance() ? '#0f2642' : '#d1d5db', color: '#fff', cursor: canAdvance() ? 'pointer' : 'not-allowed', transition: 'background 0.15s' }}>
              Next →
            </button>
          )
        )}
      </div>
    </div>
  );
}
