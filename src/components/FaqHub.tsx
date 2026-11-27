'use client';

import { useEffect, useMemo, useState } from 'react';
import { FAQ_AUDIENCES, FAQ_ENTRIES, type FaqAudience, type FaqEntry } from '@/data/faqHub';

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ');
}

function score(e: FaqEntry, words: string[]) {
  const q = e.question.toLowerCase();
  const a = stripHtml(e.answer).toLowerCase();
  const t = e.topic.toLowerCase();
  let s = 0;
  for (const w of words) {
    if (q.includes(w)) s += 3;
    else if (t.includes(w)) s += 2;
    else if (a.includes(w)) s += 1;
    else return 0;
  }
  return s;
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

function VideoEmbed({ id, title }: { id: string; title: string }) {
  const [play, setPlay] = useState(false);
  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-navy mt-4">
      {play ? (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlay(true)}
          className="absolute inset-0 w-full h-full group"
          aria-label={`Play video: ${title}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" className="w-full h-full object-cover" loading="lazy" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-16 h-16 rounded-full bg-red text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}

function FaqItem({ e, showAudience, shade = 0 }: { e: FaqEntry; showAudience?: boolean; shade?: number }) {
  return (
    <details className={`group border-b border-[#e3ecf6] last:border-b-0 ${shade % 2 ? 'bg-[#f5f9ff]' : 'bg-white'}`}>
      <summary className="flex items-center justify-between gap-4 px-4 py-3 md:px-5 cursor-pointer font-semibold text-navy text-[15px] md:text-base list-none [&::-webkit-details-marker]:hidden">
        <span>
          {showAudience && (
            <span className="block text-[11px] font-bold uppercase tracking-[1.5px] text-red mb-1">
              {FAQ_AUDIENCES.find((a) => a.key === e.audience)?.label} · {e.topic}
            </span>
          )}
          {e.question}
          {e.video && (
            <span className="ml-2 inline-flex items-center gap-1 align-middle text-[11px] font-bold uppercase tracking-wide text-white bg-red rounded-full px-2 py-0.5">
              ▶ Video
            </span>
          )}
        </span>
        <svg className="w-5 h-5 text-red flex-shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <div className="px-4 md:px-5 pb-5 -mt-1 text-[15px] text-[#475569] leading-relaxed">
        <div className="faq-answer [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3 [&_li]:mb-1 [&_li]:marker:text-red [&_a]:text-red [&_a]:font-semibold" dangerouslySetInnerHTML={{ __html: e.answer }} />
        {e.video && <VideoEmbed id={e.video} title={e.question} />}
        {e.article && (
          <a
            href={e.article.url}
            className="inline-flex items-center gap-2 mt-4 font-bold text-sm text-navy! no-underline bg-[#ECF1F7] hover:bg-[#dfe7f1] rounded-full px-4 py-2 transition-colors"
          >
            📄 Read the article: {e.article.label} &rarr;
          </a>
        )}
      </div>
    </details>
  );
}

export default function FaqHub() {
  const [audience, setAudience] = useState<FaqAudience>('players');
  const [query, setQuery] = useState('');
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  // Allow linking straight to a tab: /faq?for=coaches
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get('for');
    if (p === 'players' || p === 'teams' || p === 'coaches') setAudience(p);
  }, []);

  const pickAudience = (a: FaqAudience) => {
    setAudience(a);
    setActiveTopic(null);
    const url = new URL(window.location.href);
    url.searchParams.set('for', a);
    window.history.replaceState(null, '', url.toString());
  };

  const entries = useMemo(() => FAQ_ENTRIES.filter((e) => e.audience === audience), [audience]);
  const topics = useMemo(() => [...new Set(entries.map((e) => e.topic))], [entries]);

  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  // Search looks across all three groups, so a coach typing "roster" still finds it.
  const results = useMemo(() => {
    if (!words.length) return [];
    return FAQ_ENTRIES.map((e) => ({ e, s: score(e, words) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .map((r) => r.e);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // Topic sections start collapsed; clicking a heading (or the side menu) opens it.
  const [openTopics, setOpenTopics] = useState<Set<string>>(new Set());
  // Side menu "Using the Program" list starts collapsed (Neil 2026-11-26).
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleTopic = (t: string) =>
    setOpenTopics((prev) => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t);
      else next.add(t);
      return next;
    });

  const goTopic = (t: string) => {
    setQuery('');
    setActiveTopic(t);
    setOpenTopics((prev) => new Set(prev).add(t));
    setTimeout(() => document.getElementById(`topic-${slug(t)}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };

  return (
    <div>
      {/* Simple table heading: title left, Players / Teams / Coaches pills right (Neil 2026-11-26) */}
      <div className="bg-white border border-[#dbe6f3] rounded-xl px-4 py-3 md:px-5 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-lg md:text-xl font-bold text-navy">Frequently Asked Questions</h1>
        <div className="flex gap-1.5 flex-wrap" role="tablist" aria-label="Who is asking">
          {FAQ_AUDIENCES.map((a) => (
            <button
              key={a.key}
              type="button"
              role="tab"
              aria-selected={audience === a.key}
              onClick={() => pickAudience(a.key)}
              className={`px-4 py-1.5 rounded-full font-semibold text-sm transition-colors ${
                audience === a.key ? 'bg-navy text-white' : 'bg-[#eff6ff] text-navy hover:bg-[#e3eefc]'
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-[260px_1fr] items-start">
        {/* Side menu */}
        <aside className="md:sticky md:top-24 bg-white rounded-2xl shadow-[0_4px_20px_rgba(15,49,84,0.08)] p-4">
          <div className="relative">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions..."
              aria-label="Search questions"
              className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2.5 text-sm text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red/30 focus:border-red"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="7" strokeWidth={2} />
              <path d="M20 20l-3.5-3.5" strokeWidth={2} strokeLinecap="round" />
            </svg>
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            className="w-full flex items-center justify-between text-[11px] font-bold uppercase tracking-[1.5px] text-gray-400 hover:text-navy mt-5 mb-2 px-2"
          >
            Using the Program
            <svg className={`w-3.5 h-3.5 transition-transform ${menuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <nav className={`${menuOpen ? 'flex' : 'hidden'} md:flex-col gap-1 overflow-x-auto md:overflow-visible -mx-1 px-1 pb-1 md:pb-0`}>
            {topics.map((t) => {
              const n = entries.filter((e) => e.topic === t).length;
              const on = activeTopic === t && !words.length;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => goTopic(t)}
                  className={`flex items-center justify-between gap-3 whitespace-nowrap text-left text-sm font-semibold rounded-lg px-3 py-2 transition-colors ${
                    on ? 'bg-navy text-white' : 'text-navy hover:bg-[#ECF1F7]'
                  }`}
                >
                  {t}
                  <span className={`text-xs ${on ? 'text-white/70' : 'text-gray-400'}`}>{n}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Questions */}
        <div className="min-w-0">
          {words.length ? (
            <>
              <p className="text-sm text-[#64748b] mb-4">
                {results.length} {results.length === 1 ? 'result' : 'results'} for &ldquo;{query.trim()}&rdquo;
              </p>
              {results.length === 0 ? (
                <div className="bg-white rounded-2xl p-6 text-[15px] text-[#64748b]">
                  No questions match. Try a different word, or <a href="mailto:neil@anytime-soccer.com" className="text-red font-semibold">email us</a>.
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-[#dbe6f3] overflow-hidden">
                  {results.map((e, i) => (
                    <FaqItem key={`${e.audience}-${e.question}-${i}`} e={e} showAudience shade={i} />
                  ))}
                </div>
              )}
            </>
          ) : (
            // One simple table: a light-blue row per topic, its questions in white / pale-blue rows (Neil 2026-11-26).
            <div className="bg-white rounded-xl border border-[#dbe6f3] overflow-hidden">
              {topics.map((t) => {
                const open = openTopics.has(t);
                const n = entries.filter((e) => e.topic === t).length;
                return (
                  <section key={t} id={`topic-${slug(t)}`} className="scroll-mt-24 border-b border-[#dbe6f3] last:border-b-0">
                    <h2>
                      <button
                        type="button"
                        onClick={() => toggleTopic(t)}
                        aria-expanded={open}
                        className="w-full flex items-center justify-between gap-3 bg-white text-navy px-4 py-3 md:px-5 text-left text-[15px] md:text-base font-bold hover:bg-[#f5f9ff] transition-colors"
                      >
                        <span>
                          {t} <span className="text-sm font-semibold text-[#64748b] ml-1">{n}</span>
                        </span>
                        <svg className={`w-4 h-4 flex-shrink-0 text-red transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </h2>
                    {open && (
                      <div className="border-t border-[#dbe6f3]">
                        {entries
                          .filter((e) => e.topic === t)
                          .map((e, i) => (
                            <FaqItem key={`${e.question}-${i}`} e={e} shade={i} />
                          ))}
                      </div>
                    )}
                  </section>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
