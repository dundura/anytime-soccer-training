'use client';

import { useState } from 'react';

/**
 * Phase one of getting a team on, and deliberately not called onboarding.
 *
 * A coach here has not been onboarded and has not paid for anything. Asking
 * them to create a portal password before they can tell us how many players
 * they have is the friction this replaces — so there is no sign-in, no
 * checklist, and nothing to come back to.
 *
 * Two branches, both ending in the same place: an invoice, and a link they can
 * share with their team. Then it stops. Everything else waits until the
 * invoice is paid, because until a coach has paid for something they have no
 * reason to finish anything.
 */

const API = 'https://api.anytime-soccer.com';

type Choice = 'roster' | 'estimate';

export default function SendRosterForm() {
  const [choice, setChoice] = useState<Choice | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', teamName: '', estimatedPlayers: '' });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy || !choice) return;
    setError('');
    if (!form.email.trim()) { setError('We need an email to send the invoice to.'); return; }
    if (choice === 'estimate' && !(Number(form.estimatedPlayers) > 0)) {
      setError('Roughly how many players are you expecting?');
      return;
    }
    setBusy(true);
    try {
      const res = await fetch(`${API}/roster-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, choice, estimatedPlayers: Number(form.estimatedPlayers) || null }),
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) { setError(d.error || 'Could not send that. Please try again.'); return; }
      setDone(true);
    } catch {
      setError('Could not send that. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <main className="min-h-screen bg-[#f4f6f9] px-5 py-16">
        <div className="mx-auto max-w-[560px] rounded-2xl bg-white p-8 shadow-sm sm:p-12 text-center">
          <div className="mb-4 text-4xl">✅</div>
          <h1 className="mb-3 text-2xl font-extrabold text-[#0f2642]">That&rsquo;s everything we need</h1>
          <p className="mb-6 text-[15px] leading-relaxed text-gray-700">
            {choice === 'roster'
              ? <>The template is on its way to your inbox. Fill in what you have and send it back to <a href="mailto:megan@anytime-soccer.com" className="font-semibold text-[#DC373E] hover:underline">megan@anytime-soccer.com</a> &mdash; you don&rsquo;t need every player to start.</>
              : <>Megan will send your invoice, along with a link you can share with your team.</>}
          </p>
          <p className="text-sm leading-relaxed text-gray-500">
            Once the invoice is paid we&rsquo;ll set your team up and send you the next step.
            Nothing else to do until then.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4f6f9] px-5 py-12 sm:py-16">
      <div className="mx-auto max-w-[620px]">
        <div className="rounded-2xl bg-gradient-to-br from-[#0f2642] to-[#1e3a5f] p-8 text-white sm:p-10">
          <h1 className="mb-3 text-[clamp(24px,4vw,32px)] font-extrabold leading-tight">
            Download the roster template
          </h1>
          <p className="text-[15px] leading-relaxed text-white/75">
            Tell us who&rsquo;s on the team &mdash; or roughly how many &mdash; and we&rsquo;ll
            send your invoice and a link you can share with your players.
          </p>
        </div>

        <div className="rounded-b-2xl bg-white p-8 shadow-sm sm:p-10">
          <p className="mb-5 text-[13px] font-bold uppercase tracking-wide text-gray-500">
            Which suits you?
          </p>

          <div className="mb-8 grid gap-3">
            {([
              {
                value: 'roster' as Choice,
                icon: '📋',
                label: 'Send me the roster template',
                hint: 'We&rsquo;ll email you the template. Fill it in and send it back to megan@anytime-soccer.com',
              },
              {
                value: 'estimate' as Choice,
                icon: '🔗',
                label: 'I&rsquo;d rather share a link with my team',
                hint: 'Tell us roughly how many players and we&rsquo;ll invoice on that. Parents sign themselves up.',
              },
            ]).map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => { setChoice(opt.value); setError(''); }}
                className={`flex w-full items-start gap-4 rounded-xl border-2 p-5 text-left transition-colors ${
                  choice === opt.value ? 'border-[#0f2642] bg-blue-50' : 'border-gray-200 bg-white hover:border-[#0f2642]'
                }`}
              >
                <span className="text-2xl leading-none">{opt.icon}</span>
                <span>
                  <span className="block font-bold text-[#0f2642]" dangerouslySetInnerHTML={{ __html: opt.label }} />
                  <span className="mt-1 block text-sm leading-relaxed text-gray-600" dangerouslySetInnerHTML={{ __html: opt.hint }} />
                </span>
              </button>
            ))}
          </div>

          {choice && (
            <form onSubmit={submit} className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-[13px] font-bold text-[#0f2642]">Your name</span>
                  <input value={form.name} onChange={set('name')} autoComplete="name"
                    className="w-full rounded-lg border-2 border-gray-200 px-3 py-2.5 text-[15px] focus:border-[#0f2642] focus:outline-none" />
                </label>
                <label className="block">
                  <span className="mb-1 block text-[13px] font-bold text-[#0f2642]">Email</span>
                  <input value={form.email} onChange={set('email')} type="email" required autoComplete="email"
                    className="w-full rounded-lg border-2 border-gray-200 px-3 py-2.5 text-[15px] focus:border-[#0f2642] focus:outline-none" />
                </label>
                <label className="block">
                  <span className="mb-1 block text-[13px] font-bold text-[#0f2642]">Phone</span>
                  <input value={form.phone} onChange={set('phone')} type="tel" autoComplete="tel"
                    className="w-full rounded-lg border-2 border-gray-200 px-3 py-2.5 text-[15px] focus:border-[#0f2642] focus:outline-none" />
                </label>
                <label className="block">
                  <span className="mb-1 block text-[13px] font-bold text-[#0f2642]">Team</span>
                  <input value={form.teamName} onChange={set('teamName')}
                    className="w-full rounded-lg border-2 border-gray-200 px-3 py-2.5 text-[15px] focus:border-[#0f2642] focus:outline-none" />
                </label>
              </div>

              {choice === 'estimate' && (
                <label className="block">
                  <span className="mb-1 block text-[13px] font-bold text-[#0f2642]">
                    Roughly how many players?
                  </span>
                  <input value={form.estimatedPlayers} onChange={set('estimatedPlayers')} type="number" min={1} max={500}
                    className="w-full max-w-[160px] rounded-lg border-2 border-gray-200 px-3 py-2.5 text-[15px] focus:border-[#0f2642] focus:outline-none" />
                  <span className="mt-1 block text-[13px] leading-relaxed text-gray-500">
                    An estimate is fine &mdash; it&rsquo;s what we invoice on. The coach&rsquo;s own account is free.
                  </span>
                </label>
              )}

              {error && <p className="text-sm font-semibold text-[#DC373E]">{error}</p>}

              <button type="submit" disabled={busy}
                className="rounded-full bg-[#DC373E] px-8 py-3.5 text-[15px] font-bold text-white hover:bg-[#c0302f] disabled:opacity-60">
                {busy ? 'Sending…' : choice === 'roster' ? 'Request the roster template →' : 'Send my invoice →'}
              </button>

              <p className="text-center text-[13px] leading-relaxed text-gray-500">
                We&rsquo;ll set your team up once the invoice is paid, then send you the next step.
              </p>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
