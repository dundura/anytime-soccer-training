'use client';

import { useState } from 'react';

const SKILL_AREAS = [
  { label: 'Ball Mastery', icon: '⚽' },
  { label: 'Dribbling & Turns', icon: '🏃' },
  { label: 'Passing, Wall & Receiving', icon: '🎯' },
  { label: 'Juggling & Aerial Control', icon: '🤹' },
  { label: '1v1 Moves & Dribbling', icon: '⚔️' },
  { label: 'Clinical Finishing', icon: '🥅' },
  { label: 'Fitness & Agility', icon: '💪' },
  { label: 'Dynamic Warm-ups', icon: '🔥' },
];

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red/30 focus:border-red bg-white';

type Step = 1 | 2 | 3;

export default function TrainingPlanBuilder() {
  const [step, setStep] = useState<Step>(1);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [skillAreas, setSkillAreas] = useState<string[]>(['Ball Mastery', 'Dribbling & Turns']);
  const [weeks, setWeeks] = useState(4);
  const [sessionsPerDay, setSessionsPerDay] = useState(1);
  const [restDays, setRestDays] = useState<string[]>(['Sunday']);

  function toggleSkill(label: string) {
    setSkillAreas(prev =>
      prev.includes(label) ? prev.filter(s => s !== label) : [...prev, label]
    );
  }

  function toggleRestDay(day: string) {
    setRestDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  }

  async function handleSubmit() {
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('https://api.anytime-soccer.com/api/public/build-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, skillAreas, weeks, sessionsPerDay, restDays }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Something went wrong');
      }
      setDone(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="text-center py-12 px-6">
        <div className="text-5xl mb-4">📬</div>
        <h3 className="text-2xl font-bold text-navy mb-3">Check your inbox!</h3>
        <p className="text-gray-500 text-base max-w-md mx-auto leading-relaxed">
          Your {weeks}-week training plan PDF is on its way to <strong>{email}</strong>. It includes your full schedule, tips, and a sample session from each skill area.
        </p>
        <p className="text-sm text-gray-400 mt-4">
          Want to actually follow the plan?{' '}
          <a href="https://app.anytime-soccer.com/auth/register" className="text-red font-semibold underline">
            Start your free account →
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      {/* Step indicators */}
      <div className="flex items-center gap-2 mb-8">
        {([1, 2, 3] as Step[]).map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                step === s
                  ? 'bg-red text-white'
                  : step > s
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-400'
              }`}
            >
              {step > s ? '✓' : s}
            </div>
            <span className={`text-sm font-medium hidden sm:inline ${step === s ? 'text-navy' : 'text-gray-400'}`}>
              {s === 1 ? 'Your Info' : s === 2 ? 'Skill Areas' : 'Preferences'}
            </span>
            {i < 2 && <div className="flex-1 h-px bg-gray-200 w-8" />}
          </div>
        ))}
      </div>

      {/* Step 1: Name + Email */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold text-navy mb-1">Who is this plan for?</h3>
            <p className="text-sm text-gray-500">We&apos;ll email the PDF directly to you.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1">
              Player&apos;s name <span className="text-red">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className={inputClass}
              placeholder="e.g. Alex"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1">
              Your email <span className="text-red">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={inputClass}
              placeholder="you@example.com"
            />
          </div>
          <button
            onClick={() => {
              if (!name.trim() || !email.trim()) {
                setError('Please fill in both fields.');
                return;
              }
              setError('');
              setStep(2);
            }}
            className="w-full py-3 rounded-xl bg-red text-white font-bold text-sm hover:bg-red-dark transition-colors"
          >
            Next: Pick Skill Areas →
          </button>
          {error && <p className="text-red text-sm text-center">{error}</p>}
        </div>
      )}

      {/* Step 2: Skill Areas */}
      {step === 2 && (
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold text-navy mb-1">What should {name} work on?</h3>
            <p className="text-sm text-gray-500">Pick as many as you want. We recommend 2–4 for a focused plan.</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {SKILL_AREAS.map(({ label, icon }) => {
              const selected = skillAreas.includes(label);
              return (
                <button
                  key={label}
                  onClick={() => toggleSkill(label)}
                  className={`flex items-center gap-2 px-3 py-3 rounded-xl border-2 text-sm font-semibold text-left transition-all ${
                    selected
                      ? 'border-red bg-red/5 text-navy'
                      : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
                  }`}
                >
                  <span className="text-base">{icon}</span>
                  <span className="leading-tight">{label}</span>
                </button>
              );
            })}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setStep(1)}
              className="flex-1 py-3 rounded-xl border border-gray-200 text-navy text-sm font-semibold hover:bg-gray-50 transition-colors"
            >
              ← Back
            </button>
            <button
              onClick={() => {
                if (!skillAreas.length) {
                  setError('Pick at least one skill area.');
                  return;
                }
                setError('');
                setStep(3);
              }}
              className="flex-1 py-3 rounded-xl bg-red text-white font-bold text-sm hover:bg-red-dark transition-colors"
            >
              Next: Customize →
            </button>
          </div>
          {error && <p className="text-red text-sm text-center">{error}</p>}
        </div>
      )}

      {/* Step 3: Preferences */}
      {step === 3 && (
        <div className="space-y-5">
          <div>
            <h3 className="text-xl font-bold text-navy mb-1">Customize the plan</h3>
            <p className="text-sm text-gray-500">Keep it realistic — consistency beats intensity every time.</p>
          </div>

          {/* Plan length */}
          <div>
            <label className="block text-sm font-medium text-navy mb-2">Plan length</label>
            <div className="flex gap-2">
              {[4, 8, 12].map(w => (
                <button
                  key={w}
                  onClick={() => setWeeks(w)}
                  className={`flex-1 py-2.5 rounded-xl border-2 text-sm font-bold transition-all ${
                    weeks === w ? 'border-red bg-red/5 text-red' : 'border-gray-200 text-gray-500 hover:border-gray-300'
                  }`}
                >
                  {w} weeks
                </button>
              ))}
            </div>
          </div>

          {/* Sessions per day */}
          <div>
            <label className="block text-sm font-medium text-navy mb-2">Sessions per training day</label>
            <div className="flex gap-2">
              {[1, 2].map(s => (
                <button
                  key={s}
                  onClick={() => setSessionsPerDay(s)}
                  className={`flex-1 py-2.5 rounded-xl border-2 text-sm font-bold transition-all ${
                    sessionsPerDay === s ? 'border-red bg-red/5 text-red' : 'border-gray-200 text-gray-500 hover:border-gray-300'
                  }`}
                >
                  {s} {s === 1 ? 'session' : 'sessions'}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-1">Each session is ~15–20 minutes.</p>
          </div>

          {/* Rest days */}
          <div>
            <label className="block text-sm font-medium text-navy mb-2">Rest days</label>
            <div className="flex flex-wrap gap-2">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                <button
                  key={day}
                  onClick={() => toggleRestDay(day)}
                  className={`px-3 py-1.5 rounded-full border-2 text-xs font-bold transition-all ${
                    restDays.includes(day)
                      ? 'border-gray-400 bg-gray-100 text-gray-600'
                      : 'border-gray-200 text-gray-400 hover:border-gray-300'
                  }`}
                >
                  {day.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>

          {/* Plan summary */}
          <div className="bg-navy/5 rounded-xl p-4 text-sm text-navy">
            <div className="font-bold mb-1">📋 Your plan</div>
            <div className="text-gray-600 space-y-0.5">
              <div>{weeks} weeks · {sessionsPerDay} session{sessionsPerDay > 1 ? 's' : ''}/day{restDays.length ? ` · Rest: ${restDays.map(d => d.slice(0, 3)).join(', ')}` : ''}</div>
              <div>{skillAreas.join(', ')}</div>
            </div>
          </div>

          {error && <p className="text-red text-sm text-center">{error}</p>}

          <div className="flex gap-3">
            <button
              onClick={() => setStep(2)}
              className="flex-1 py-3 rounded-xl border border-gray-200 text-navy text-sm font-semibold hover:bg-gray-50 transition-colors"
            >
              ← Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex-1 py-3 rounded-xl bg-red text-white font-bold text-sm hover:bg-red-dark transition-colors disabled:opacity-60"
            >
              {submitting ? 'Building...' : '⚽ Send My Plan'}
            </button>
          </div>
          <p className="text-xs text-center text-gray-400">
            We&apos;ll email your personalized PDF — no account needed.
          </p>
        </div>
      )}
    </div>
  );
}
