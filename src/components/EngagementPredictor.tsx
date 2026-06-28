'use client';

import { useState, useEffect } from 'react';

const SESSION_KEY = 'coaching-plan-state';

function loadState() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch { return null; }
}

function saveState(step: number, form: Record<string, string>, selected: string[]) {
  try { sessionStorage.setItem(SESSION_KEY, JSON.stringify({ step, form, selected })); } catch {}
}

const TASKS = [
  { id: 'assign-homework', label: 'Assign Homework', desc: 'Assign homework folders and/or assign a recurring training plan' },
  { id: 'send-email', label: 'Send Email Reminder', desc: 'Keep players motivated with timely reminders' },
  { id: 'demo-app', label: 'Demo App In-Person', desc: 'Walk through the app with your team at practice' },
  { id: 'set-goals', label: 'Set Player Goals', desc: 'Give each player a personal training target' },
  { id: 'coach-challenge', label: "Create Coach's Challenge", desc: 'Set a team-wide challenge for extra motivation' },
  { id: 'personal-challenge', label: 'Create a Personal Challenge', desc: 'Design individual challenges for specific players' },
  { id: 'team-contest', label: 'Create a Team Contest', desc: 'Run a leaderboard-based competition' },
  { id: 'team-goal', label: 'Set Team Level Goal', desc: 'Set a collective goal for the whole squad' },
  { id: 'recognition', label: 'Give Player Recognition in Practice', desc: 'Highlight player achievements on the field' },
  { id: 'mvp', label: 'Nominate an MVP', desc: 'Recognize your most improved or dedicated player' },
];

const navyBlue = '#0f2642';
const red = '#DC373E';

function getScoreColor(score: number) {
  if (score >= 80) return '#1D9E75';
  if (score >= 60) return '#378ADD';
  if (score >= 40) return '#f59e0b';
  return '#DC373E';
}

function getScoreLabel(score: number) {
  if (score === 100) return 'Elite Coach';
  if (score >= 80) return 'High Engagement';
  if (score >= 60) return 'On Track';
  if (score >= 40) return 'Getting Started';
  return 'Needs Focus';
}

function ScoreCircle({ score }: { score: number }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = getScoreColor(score);
  const label = getScoreLabel(score);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={r} fill="none" stroke="#e5e7eb" strokeWidth="12" />
        <circle
          cx="70" cy="70" r={r} fill="none" stroke={color} strokeWidth="12"
          strokeDasharray={circ.toFixed(1)}
          strokeDashoffset={offset.toFixed(1)}
          strokeLinecap="round"
          transform="rotate(-90 70 70)"
          style={{ transition: 'stroke-dashoffset 0.4s ease' }}
        />
        <text x="70" y="65" textAnchor="middle" fontSize="32" fontWeight="800" fill={color} fontFamily="system-ui, Arial">{score}</text>
        <text x="70" y="83" textAnchor="middle" fontSize="13" fill="#9ca3af" fontFamily="system-ui, Arial">/ 100</text>
      </svg>
      <span style={{
        background: color + '20', border: `1px solid ${color}50`, color,
        borderRadius: 20, padding: '4px 16px', fontSize: 13, fontWeight: 700
      }}>{label}</span>
    </div>
  );
}

export default function EngagementPredictor() {
  const [form, setForm] = useState(() => {
    const s = loadState(); return s?.form || { coachName: '', teamName: '', phone: '', email: '' };
  });
  const [selected, setSelected] = useState<Set<string>>(() => {
    const s = loadState(); return new Set(s?.selected || []);
  });
  const [step, setStep] = useState(() => {
    const s = loadState(); return s?.step || 1;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    saveState(step, form, Array.from(selected));
  }, [step, form, selected]);

  const score = selected.size * 10;
  const color = getScoreColor(score);

  const toggleTask = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleContactNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.coachName.trim() || !form.teamName.trim() || !form.email.trim() || !form.phone.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const selectedTasks = TASKS.filter(t => selected.has(t.id)).map(t => t.label);
      const res = await fetch('https://api.anytime-soccer.com/api/public/engagement-predictor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          coachName: form.coachName,
          teamName: form.teamName,
          phone: form.phone,
          email: form.email,
          selectedTasks,
        }),
      });
      if (!res.ok) throw new Error('Request failed');
      try { sessionStorage.removeItem(SESSION_KEY); } catch {}
      setStep(3);
      window.scrollTo(0, 0);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 14px', border: '1.5px solid #e5e7eb',
    borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box',
    fontFamily: 'inherit',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f0f2f5', fontFamily: 'system-ui, -apple-system, Arial, sans-serif' }}>

      {/* Hero */}
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '32px 16px 0' }}>
        <div style={{ background: navyBlue, borderRadius: 12, padding: '16px 24px' }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>Step 1: Confirm Contact Info</div>
        </div>
      </div>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '12px 16px 32px' }}>

        {/* Step 1: Contact info */}
        {step === 1 && (
          <div style={{ background: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <h2 style={{ margin: '0 0 6px', fontSize: 22, fontWeight: 800, color: navyBlue }}>Let&apos;s get started</h2>
            <p style={{ margin: '0 0 24px', fontSize: 14, color: '#6b7280', lineHeight: 1.6 }}>
              We will check in during the onboarding process to make sure you are set up for success.
            </p>
            <form onSubmit={handleContactNext}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6 }}>First Name *</label>
                  <input type="text" value={form.coachName} onChange={e => setForm(f => ({ ...f, coachName: e.target.value }))} placeholder="Jane" style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Team Name *</label>
                  <input type="text" value={form.teamName} onChange={e => setForm(f => ({ ...f, teamName: e.target.value }))} placeholder="FC Eagles U12" style={inputStyle} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Email *</label>
                  <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="jane@example.com" style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Phone *</label>
                  <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="(555) 000-0000" style={inputStyle} />
                </div>
              </div>
              {error && <div style={{ color: red, fontSize: 13, marginBottom: 16 }}>{error}</div>}
              <button type="submit" style={{
                background: navyBlue, color: '#fff', fontWeight: 700, fontSize: 15,
                border: 'none', borderRadius: 10, padding: '13px 32px', cursor: 'pointer', width: '100%',
                fontFamily: 'inherit',
              }}>
                Continue →
              </button>
            </form>
          </div>
        )}

        {/* Step 2: Tasks + live score */}
        {step === 2 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: 20, alignItems: 'start' }}>

            <div>
              <div style={{ background: '#fff', borderRadius: 16, padding: 28, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <h2 style={{ margin: '0 0 6px', fontSize: 20, fontWeight: 800, color: navyBlue }}>Which tasks will you commit to?</h2>
                <p style={{ margin: '0 0 20px', fontSize: 13, color: '#6b7280' }}>Check every task you plan to do. Each one adds 10 points to your predicted engagement score.</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {TASKS.map(task => {
                    const checked = selected.has(task.id);
                    return (
                      <div
                        key={task.id}
                        onClick={() => toggleTask(task.id)}
                        style={{
                          display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 16px',
                          borderRadius: 10, cursor: 'pointer', transition: 'all 0.15s',
                          border: `1.5px solid ${checked ? color : '#e5e7eb'}`,
                          background: checked ? color + '08' : '#fafafa',
                        }}
                      >
                        <div style={{
                          width: 22, height: 22, borderRadius: 6, border: `2px solid ${checked ? color : '#d1d5db'}`,
                          background: checked ? color : '#fff', flexShrink: 0, marginTop: 1,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s',
                        }}>
                          {checked && <span style={{ color: '#fff', fontSize: 13, fontWeight: 800 }}>✓</span>}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 14, fontWeight: checked ? 700 : 500, color: checked ? navyBlue : '#374151' }}>{task.label}</div>
                          <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{task.desc}</div>
                        </div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: checked ? color : '#d1d5db', flexShrink: 0, paddingTop: 2 }}>10 pts</div>
                      </div>
                    );
                  })}
                </div>

                {error && <div style={{ color: red, fontSize: 13, marginTop: 16 }}>{error}</div>}

                <button
                  onClick={handleSubmit}
                  disabled={loading || selected.size === 0}
                  style={{
                    marginTop: 24, width: '100%',
                    background: selected.size === 0 ? '#d1d5db' : navyBlue,
                    color: '#fff', fontWeight: 700, fontSize: 15, border: 'none',
                    borderRadius: 10, padding: '13px 32px',
                    cursor: selected.size === 0 ? 'default' : 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  {loading ? 'Generating report…' : 'Get My Commitment Report →'}
                </button>
              </div>
            </div>

            {/* Sticky score sidebar */}
            <div style={{ position: 'sticky', top: 24 }}>
              <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', textAlign: 'center' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: 12 }}>Predicted Score</div>
                <ScoreCircle score={score} />
                <div style={{ marginTop: 20, background: '#e8edf3', borderRadius: 10, padding: '14px 12px', textAlign: 'left' }}>
                  <div style={{ fontSize: 10, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Tasks Committed</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: navyBlue }}>
                    {selected.size}<span style={{ fontSize: 13, fontWeight: 400, color: '#9ca3af' }}> / 10</span>
                  </div>
                  <div style={{ marginTop: 8, background: 'rgba(0,0,0,0.08)', borderRadius: 4, height: 6, overflow: 'hidden' }}>
                    <div style={{ height: '100%', borderRadius: 4, background: color, width: `${score}%`, transition: 'width 0.3s ease' }} />
                  </div>
                </div>
                <div style={{ marginTop: 12, fontSize: 11, color: '#9ca3af', lineHeight: 1.5 }}>
                  {selected.size === 0 ? 'Select tasks to see your predicted score' : `${10 - selected.size} task${10 - selected.size !== 1 ? 's' : ''} away from a perfect score`}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div style={{ background: '#fff', borderRadius: 16, padding: 48, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
            <h2 style={{ margin: '0 0 10px', fontSize: 24, fontWeight: 800, color: navyBlue }}>Your report is on its way!</h2>
            <p style={{ margin: '0 0 24px', fontSize: 15, color: '#6b7280', lineHeight: 1.7 }}>
              We sent your Engagement Commitment Report to <strong>{form.email}</strong>.<br />
              Your predicted score is <strong style={{ color }}>{score}/100</strong>.
            </p>
            <ScoreCircle score={score} />
            <p style={{ margin: '24px 0 0', fontSize: 13, color: '#9ca3af' }}>
              Our team will be in touch to help you get started.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
