'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Help Line for website visitors.
 *
 * The in-app version knows who it is talking to. Here nobody is signed in, so
 * the thread is keyed on an email address the visitor gives us — which is also
 * the only way to answer someone who closes the tab. Name and email are asked
 * for once, then remembered locally so a returning visitor picks up where they
 * left off rather than starting again.
 *
 * Questions land in the same admin inbox as in-app ones and email Neil and
 * Megan together.
 */

const API = 'https://api.anytime-soccer.com/public/help-line';
const STORE_KEY = 'ast_helpline_guest';
const NUDGE_KEY = 'ast_helpline_nudge_dismissed';

type Msg = { id: number; fromAdmin: number | boolean; body: string; createdAt: string };

export default function HelpLineWidget() {
  const [open, setOpen] = useState(false);
  const [nudge, setNudge] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [known, setKnown] = useState(false);
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState<Msg[]>([]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        const v = JSON.parse(raw);
        if (v?.email) { setEmail(v.email); setName(v.name || ''); setKnown(true); }
      }
      setNudge(localStorage.getItem(NUDGE_KEY) !== '1');
    } catch { setNudge(true); }
  }, []);

  const loadThread = useCallback(async (addr: string) => {
    try {
      const res = await fetch(`${API}?email=${encodeURIComponent(addr)}`);
      if (!res.ok) return;
      const data = await res.json();
      if (Array.isArray(data.messages)) setMessages(data.messages);
    } catch { /* leave whatever is on screen */ }
  }, []);

  // Only polls while open — a marketing page should not be chattering to an
  // API in the background on every visit.
  useEffect(() => {
    if (!open || !known || !email) return undefined;
    loadThread(email);
    const t = setInterval(() => loadThread(email), 20000);
    return () => clearInterval(t);
  }, [open, known, email, loadThread]);

  useEffect(() => {
    if (open && endRef.current) endRef.current.scrollIntoView({ block: 'end' });
  }, [open, messages.length]);

  const dismissNudge = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNudge(false);
    try { localStorage.setItem(NUDGE_KEY, '1'); } catch { /* private mode */ }
  };

  const send = async () => {
    const body = draft.trim();
    if (!body || sending) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setError('We need a valid email address to reply to.');
      return;
    }
    setSending(true);
    setError('');
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          body,
          context: typeof window !== 'undefined' ? window.location.pathname : null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Could not send that. Please try again.');

      setMessages((prev) => prev.concat(data.message));
      setDraft('');
      setSent(true);
      setKnown(true);
      try { localStorage.setItem(STORE_KEY, JSON.stringify({ name: name.trim(), email: email.trim() })); } catch { /* ignore */ }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not send that.');
    } finally {
      setSending(false);
    }
  };

  const field: React.CSSProperties = {
    width: '100%', border: '1px solid #DFE5EE', borderRadius: 9, padding: '9px 11px',
    fontSize: 13.5, fontFamily: 'inherit', color: '#0F2642', outline: 'none', marginBottom: 8,
  };

  return (
    <div style={{ position: 'fixed', right: 16, bottom: 16, zIndex: 2000, fontFamily: 'inherit' }}>
      {open && (
        <div style={{
          width: 'min(360px, calc(100vw - 32px))', maxHeight: 'min(560px, calc(100vh - 120px))',
          background: '#fff', borderRadius: 16, border: '1px solid #DFE5EE',
          boxShadow: '0 12px 34px rgba(15,38,66,0.22)', marginBottom: 10,
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}>
          <div style={{ background: '#0F2642', padding: '12px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ color: '#fff', fontSize: 14, fontWeight: 800 }}>Ask us anything</div>
              <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 11 }}>We usually reply within 24 hours</div>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close"
              style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.8)', fontSize: 20, cursor: 'pointer', lineHeight: 1, padding: 4 }}>
              ×
            </button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: 12 }}>
            {messages.length === 0 && !sent && (
              <p style={{ fontSize: 12.5, color: '#7E8DA0', margin: '4px 0 14px', lineHeight: 1.6 }}>
                Questions about training, teams or pricing — send them here and we will get back to you by email.
              </p>
            )}

            {messages.map((m) => {
              const mine = !m.fromAdmin;
              return (
                <div key={m.id} style={{ display: 'flex', justifyContent: mine ? 'flex-end' : 'flex-start', marginBottom: 8 }}>
                  <div style={{
                    maxWidth: '82%', background: mine ? '#0F2642' : '#EEF2F7', color: mine ? '#fff' : '#0F2642',
                    borderRadius: mine ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
                    padding: '8px 11px', fontSize: 13, lineHeight: 1.5, whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                  }}>
                    {m.body}
                  </div>
                </div>
              );
            })}

            {sent && (
              <p style={{ fontSize: 12, color: '#15803D', fontWeight: 700, margin: '10px 0 0', textAlign: 'center' }}>
                Sent — we will reply to {email}
              </p>
            )}
            <div ref={endRef} />
          </div>

          <div style={{ borderTop: '1px solid #EEF2F7', padding: 10 }}>
            {/* Asked once. A returning visitor is remembered, so the second
                question is just a message box. */}
            {!known && (
              <>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" style={field} />
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" type="email" style={field} />
              </>
            )}
            {error && <p style={{ color: '#b91c1c', fontSize: 12, margin: '0 0 8px' }}>{error}</p>}
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); send(); } }}
                placeholder="Type your question…"
                style={{ ...field, marginBottom: 0, flex: 1, minWidth: 0 }}
              />
              <button
                type="button"
                onClick={send}
                disabled={!draft.trim() || sending}
                style={{
                  border: 'none', borderRadius: 9, padding: '9px 14px', fontSize: 12.5, fontWeight: 800,
                  fontFamily: 'inherit', color: '#fff', flexShrink: 0,
                  background: !draft.trim() || sending ? '#C9D2DE' : '#DC373E',
                  cursor: !draft.trim() || sending ? 'default' : 'pointer',
                }}
              >
                {sending ? '…' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8 }}>
        {!open && nudge && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6, background: '#fff', border: '1px solid #DFE5EE',
            borderRadius: 20, padding: '7px 8px 7px 13px', boxShadow: '0 4px 14px rgba(15,38,66,0.14)',
            maxWidth: 'calc(100vw - 100px)',
          }}>
            <button type="button" onClick={() => setOpen(true)}
              style={{ background: 'none', border: 'none', padding: 0, fontFamily: 'inherit', fontSize: 12.5, fontWeight: 700, color: '#0F2642', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              Got a question? Ask us
            </button>
            <button type="button" onClick={dismissNudge} aria-label="Dismiss"
              style={{ background: 'none', border: 'none', color: '#9CA9B8', fontSize: 16, lineHeight: 1, cursor: 'pointer', padding: '0 4px' }}>
              ×
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Ask us a question"
          style={{
            width: 52, height: 52, borderRadius: '50%', border: 'none', background: '#DC373E', color: '#fff',
            fontSize: 23, cursor: 'pointer', boxShadow: '0 6px 18px rgba(220,55,62,0.42)', flexShrink: 0,
          }}
        >
          {open ? '×' : '💬'}
        </button>
      </div>
    </div>
  );
}
