'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ALL_TEAMS,
  BOOKIE_FAVORITES,
  FINAL_SCORES,
  GROUPS,
  boldnessLabel,
  boldnessScore,
} from '@/data/worldCup2026';

type Stage = 'groups' | 'semis' | 'final' | 'champion' | 'lockin' | 'results';

const STAGES: { key: Stage; label: string }[] = [
  { key: 'groups', label: 'Groups' },
  { key: 'semis', label: 'Semis' },
  { key: 'final', label: 'Final' },
  { key: 'champion', label: 'Champion' },
  { key: 'lockin', label: 'Lock In' },
];

const bebas = { fontFamily: "'Bebas Neue', sans-serif" };

const stepMotion = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.3, ease: 'easeOut' as const },
};

export default function WorldCupPredictor() {
  const [stage, setStage] = useState<Stage>('groups');
  const [groupPicks, setGroupPicks] = useState<Record<string, string>>({});
  const [semis, setSemis] = useState<string[]>([]);
  const [finalists, setFinalists] = useState<string[]>([]);
  const [champion, setChampion] = useState<string>('');
  const [finalScore, setFinalScore] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const winners = useMemo(
    () => GROUPS.map((g) => groupPicks[g.letter]).filter(Boolean),
    [groupPicks]
  );
  const stageIndex = STAGES.findIndex((s) => s.key === stage);

  const pickGroupWinner = (letter: string, team: string) => {
    const previous = groupPicks[letter];
    setGroupPicks({ ...groupPicks, [letter]: team });
    if (previous && previous !== team) {
      setSemis((s) => s.filter((t) => t !== previous));
      setFinalists((f) => f.filter((t) => t !== previous));
      if (champion === previous) setChampion('');
    }
  };

  const toggleSemi = (team: string) => {
    if (semis.includes(team)) {
      setSemis(semis.filter((t) => t !== team));
      setFinalists((f) => f.filter((t) => t !== team));
      if (champion === team) setChampion('');
    } else if (semis.length < 4) {
      setSemis([...semis, team]);
    }
  };

  const toggleFinalist = (team: string) => {
    if (finalists.includes(team)) {
      setFinalists(finalists.filter((t) => t !== team));
      if (champion === team) setChampion('');
    } else if (finalists.length < 2) {
      setFinalists([...finalists, team]);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) {
      setStage('results');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      const championSlug = champion.toLowerCase().replace(/[^a-z]+/g, '-');
      const res = await fetch('/api/ghl-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          tags: ['world-cup-predictor-2026', `wc26-champion-${championSlug}`],
        }),
      });
      if (!res.ok) throw new Error();
      setStage('results');
    } catch {
      setError('Something went wrong — please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const score = champion
    ? boldnessScore(winners, semis, finalists, champion)
    : 0;
  const runnerUp = finalists.find((t) => t !== champion);

  const shareText = champion
    ? `I just predicted the 2026 World Cup 🏆 My champion: ${ALL_TEAMS[champion].flag} ${champion}${runnerUp ? ` over ${ALL_TEAMS[runnerUp].flag} ${runnerUp}` : ''} in the final. Make your prediction:`
    : '';
  const shareUrl = 'https://www.anytime-soccer.com/world-cup-predictor';

  return (
    <div
      id="predictor"
      className="relative bg-navy rounded-3xl overflow-hidden border border-white/10"
    >
      {/* Stadium atmosphere: pitch lines + floodlight glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-1/3 -right-1/4 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(220,55,62,0.14)_0%,transparent_70%)]" />
        <div className="absolute -bottom-1/3 -left-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(244,192,77,0.08)_0%,transparent_70%)]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full border border-white/[0.05]" />
        <div className="absolute left-0 right-0 top-1/2 h-px bg-white/[0.05]" />
      </div>

      <div className="relative z-10 px-4 py-8 sm:px-8 md:px-12 md:py-12">
        {/* Stage rail */}
        {stage !== 'results' && (
          <div className="flex items-center justify-center gap-1 sm:gap-2 mb-10 select-none">
            {STAGES.map((s, i) => {
              const done = i < stageIndex;
              const active = i === stageIndex;
              return (
                <div key={s.key} className="flex items-center gap-1 sm:gap-2">
                  {i > 0 && (
                    <div className={`w-4 sm:w-8 h-px ${done || active ? 'bg-red' : 'bg-white/15'}`} />
                  )}
                  <button
                    type="button"
                    onClick={() => done && setStage(s.key)}
                    disabled={!done}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-colors ${
                      active
                        ? 'bg-red text-white'
                        : done
                          ? 'bg-white/10 text-white/80 hover:bg-white/20 cursor-pointer'
                          : 'bg-white/5 text-white/30'
                    }`}
                  >
                    <span style={bebas} className="text-sm leading-none">{done ? '✓' : i + 1}</span>
                    <span className="hidden sm:inline">{s.label}</span>
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* ───────────────── STAGE 1: GROUP WINNERS ───────────────── */}
          {stage === 'groups' && (
            <motion.div key="groups" {...stepMotion}>
              <StageHeading
                kicker="Round one"
                title="Who wins each group?"
                sub="Tap your winner in all 12 groups."
              />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {GROUPS.map((g) => (
                  <div
                    key={g.letter}
                    className={`rounded-2xl p-4 border transition-colors ${
                      groupPicks[g.letter]
                        ? 'border-red/50 bg-white/[0.06]'
                        : 'border-white/10 bg-white/[0.03]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span style={bebas} className="text-white/90 text-xl tracking-[2px]">
                        Group {g.letter}
                      </span>
                      {groupPicks[g.letter] && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-red">
                          Picked
                        </span>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      {g.teams.map((t) => {
                        const picked = groupPicks[g.letter] === t.name;
                        return (
                          <button
                            key={t.name}
                            type="button"
                            onClick={() => pickGroupWinner(g.letter, t.name)}
                            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-sm font-semibold transition-all ${
                              picked
                                ? 'bg-red text-white shadow-[0_2px_12px_rgba(220,55,62,0.4)]'
                                : 'bg-white/[0.04] text-white/75 hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            <span className="text-lg leading-none">{t.flag}</span>
                            <span className="truncate">{t.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <StickyBar
                progress={`${winners.length}/12 groups picked`}
                ready={winners.length === 12}
                cta="Pick My Semifinalists →"
                onNext={() => setStage('semis')}
              />
            </motion.div>
          )}

          {/* ───────────────── STAGE 2: SEMIFINALISTS ───────────────── */}
          {stage === 'semis' && (
            <motion.div key="semis" {...stepMotion}>
              <StageHeading
                kicker="The knockouts"
                title="Pick your final four"
                sub="From your 12 group winners, who survives to the semifinals?"
              />
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-w-3xl mx-auto">
                {winners.map((team) => {
                  const t = ALL_TEAMS[team];
                  const picked = semis.includes(team);
                  const full = semis.length >= 4 && !picked;
                  return (
                    <button
                      key={team}
                      type="button"
                      onClick={() => toggleSemi(team)}
                      disabled={full}
                      className={`relative flex flex-col items-center gap-1.5 px-3 py-4 rounded-2xl border text-sm font-semibold transition-all ${
                        picked
                          ? 'border-[#F4C04D] bg-[#F4C04D]/10 text-white'
                          : full
                            ? 'border-white/5 bg-white/[0.02] text-white/25'
                            : 'border-white/10 bg-white/[0.04] text-white/75 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {picked && (
                        <span
                          style={bebas}
                          className="absolute -top-2 -right-2 bg-[#F4C04D] text-navy text-xs px-2 py-0.5 rounded-full tracking-wider"
                        >
                          SF
                        </span>
                      )}
                      <span className="text-3xl leading-none">{t.flag}</span>
                      <span className="text-center leading-tight">{team}</span>
                    </button>
                  );
                })}
              </div>
              <StickyBar
                progress={`${semis.length}/4 semifinalists`}
                ready={semis.length === 4}
                cta="Set Up the Final →"
                onNext={() => setStage('final')}
                onBack={() => setStage('groups')}
              />
            </motion.div>
          )}

          {/* ───────────────── STAGE 3: FINALISTS ───────────────── */}
          {stage === 'final' && (
            <motion.div key="final" {...stepMotion}>
              <StageHeading
                kicker="July 19 · MetLife Stadium"
                title="Who reaches the final?"
                sub="Pick the two teams playing for it all in New Jersey."
              />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
                {semis.map((team) => {
                  const t = ALL_TEAMS[team];
                  const picked = finalists.includes(team);
                  const full = finalists.length >= 2 && !picked;
                  return (
                    <button
                      key={team}
                      type="button"
                      onClick={() => toggleFinalist(team)}
                      disabled={full}
                      className={`relative flex flex-col items-center gap-2 px-3 py-6 rounded-2xl border text-sm font-semibold transition-all ${
                        picked
                          ? 'border-red bg-red/15 text-white shadow-[0_4px_20px_rgba(220,55,62,0.25)]'
                          : full
                            ? 'border-white/5 bg-white/[0.02] text-white/25'
                            : 'border-white/10 bg-white/[0.04] text-white/75 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {picked && (
                        <span
                          style={bebas}
                          className="absolute -top-2 -right-2 bg-red text-white text-xs px-2 py-0.5 rounded-full tracking-wider"
                        >
                          FINAL
                        </span>
                      )}
                      <span className="text-4xl leading-none">{t.flag}</span>
                      <span className="text-center leading-tight">{team}</span>
                    </button>
                  );
                })}
              </div>
              <StickyBar
                progress={`${finalists.length}/2 finalists`}
                ready={finalists.length === 2}
                cta="Crown a Champion →"
                onNext={() => setStage('champion')}
                onBack={() => setStage('semis')}
              />
            </motion.div>
          )}

          {/* ───────────────── STAGE 4: CHAMPION + SCORE ───────────────── */}
          {stage === 'champion' && (
            <motion.div key="champion" {...stepMotion}>
              <StageHeading
                kicker="The moment of truth"
                title="Who lifts the trophy?"
                sub="Tap your 2026 World Cup champion."
              />
              <div className="flex items-stretch justify-center gap-3 sm:gap-6 max-w-2xl mx-auto">
                {finalists.map((team, i) => {
                  const t = ALL_TEAMS[team];
                  const picked = champion === team;
                  return (
                    <div key={team} className="flex items-center gap-3 sm:gap-6 flex-1">
                      {i === 1 && (
                        <span style={bebas} className="text-white/30 text-2xl sm:text-3xl shrink-0">
                          VS
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => setChampion(team)}
                        className={`w-full flex flex-col items-center gap-3 px-4 py-8 rounded-3xl border-2 transition-all ${
                          picked
                            ? 'border-[#F4C04D] bg-[#F4C04D]/10 shadow-[0_8px_40px_rgba(244,192,77,0.25)] scale-[1.02]'
                            : 'border-white/10 bg-white/[0.04] hover:bg-white/10'
                        }`}
                      >
                        <span className={`text-2xl transition-opacity ${picked ? 'opacity-100' : 'opacity-0'}`}>
                          🏆
                        </span>
                        <span className="text-6xl leading-none">{t.flag}</span>
                        <span
                          style={bebas}
                          className={`text-2xl tracking-wider ${picked ? 'text-[#F4C04D]' : 'text-white/80'}`}
                        >
                          {team}
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>

              {champion && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-10 text-center"
                >
                  <p className="text-white/60 text-sm font-semibold uppercase tracking-wider mb-3">
                    Call the scoreline (optional)
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {FINAL_SCORES.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setFinalScore(finalScore === s ? '' : s)}
                        style={bebas}
                        className={`px-4 py-2 rounded-full text-lg tracking-wider border transition-all ${
                          finalScore === s
                            ? 'bg-red border-red text-white'
                            : 'border-white/15 text-white/60 hover:text-white hover:border-white/40'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              <StickyBar
                progress={champion ? `${ALL_TEAMS[champion].flag} ${champion} to win it all` : 'Pick your champion'}
                ready={!!champion}
                cta="Lock In My Prediction →"
                onNext={() => setStage('lockin')}
                onBack={() => setStage('final')}
              />
            </motion.div>
          )}

          {/* ───────────────── STAGE 5: NAME + EMAIL ───────────────── */}
          {stage === 'lockin' && (
            <motion.div key="lockin" {...stepMotion} className="max-w-md mx-auto">
              <div className="text-center mb-8">
                <div className="text-5xl mb-4">{champion ? ALL_TEAMS[champion].flag : '🏆'}</div>
                <h3 style={bebas} className="text-white text-4xl sm:text-5xl tracking-wide mb-3">
                  Lock in your prediction
                </h3>
                <p className="text-white/65 text-base">
                  Enter your name and email to seal your bracket and see your
                  Boldness Score. We&apos;ll also send you a free week-one World Cup
                  training session so your player can train like the pros they&apos;re
                  watching.
                </p>
              </div>
              <form onSubmit={submit} className="space-y-3">
                <input
                  type="text"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl bg-white/[0.07] border border-white/15 text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-red/40 focus:border-red"
                />
                <input
                  type="email"
                  required
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl bg-white/[0.07] border border-white/15 text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-red/40 focus:border-red"
                />
                {error && <p className="text-red text-sm font-semibold text-center">{error}</p>}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-red hover:bg-red-dark disabled:opacity-60 text-white px-8 py-4 rounded-full font-bold text-base transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(220,55,62,0.35)]"
                >
                  {submitting ? 'Sealing your bracket…' : 'Reveal My Results 🏆'}
                </button>
                <button
                  type="button"
                  onClick={() => setStage('champion')}
                  className="w-full text-white/50 hover:text-white text-sm font-semibold py-2 transition-colors"
                >
                  ← Back
                </button>
                <p className="text-white/35 text-xs text-center pt-1">
                  No spam — just your results and a few World Cup training ideas. Unsubscribe anytime.
                </p>
              </form>
            </motion.div>
          )}

          {/* ───────────────── RESULTS ───────────────── */}
          {stage === 'results' && champion && (
            <motion.div key="results" {...stepMotion}>
              <div className="text-center mb-10">
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }}
                  className="text-7xl mb-4"
                >
                  🏆
                </motion.div>
                <p className="text-[#F4C04D] text-xs font-bold uppercase tracking-[3px] mb-2">
                  {name ? `${name.split(' ')[0]}’s` : 'Your'} official prediction
                </p>
                <h3 style={bebas} className="text-white text-5xl sm:text-7xl tracking-wide leading-none">
                  {ALL_TEAMS[champion].flag} {champion}
                </h3>
                <p className="text-white/60 text-lg mt-2">
                  2026 World Cup Champions
                  {runnerUp && (
                    <>
                      {' '}— {finalScore ? `${finalScore} ` : ''}over {ALL_TEAMS[runnerUp].flag} {runnerUp}
                    </>
                  )}
                </p>
              </div>

              {/* Boldness meter */}
              <div className="max-w-lg mx-auto bg-white/[0.05] border border-white/10 rounded-2xl p-6 mb-8">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-white/60 text-xs font-bold uppercase tracking-wider">
                    Boldness Score
                  </span>
                  <span style={bebas} className="text-[#F4C04D] text-3xl tracking-wider">
                    {score}/100
                  </span>
                </div>
                <div className="h-2.5 bg-white/10 rounded-full overflow-hidden mb-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-red to-[#F4C04D]"
                  />
                </div>
                <p className="text-white font-bold">{boldnessLabel(score).label}</p>
                <p className="text-white/60 text-sm">{boldnessLabel(score).blurb}</p>
              </div>

              {/* Vs the bookies */}
              <div className="max-w-lg mx-auto mb-8">
                <p className="text-white/50 text-xs font-bold uppercase tracking-wider text-center mb-3">
                  What the bookies say
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {BOOKIE_FAVORITES.map((f) => (
                    <span
                      key={f.name}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold border ${
                        f.name === champion
                          ? 'bg-[#F4C04D]/15 border-[#F4C04D]/50 text-[#F4C04D]'
                          : 'border-white/10 text-white/50'
                      }`}
                    >
                      {ALL_TEAMS[f.name].flag} {f.name} {f.odds}
                    </span>
                  ))}
                </div>
                <p className="text-white/55 text-sm text-center mt-3">
                  {BOOKIE_FAVORITES.some((f) => f.name === champion)
                    ? `The oddsmakers agree — ${champion} are among the favorites.`
                    : `The bookies didn’t see ${champion} coming. Respect.`}
                </p>
              </div>

              {/* Full bracket recap */}
              <div className="max-w-2xl mx-auto mb-10">
                <p className="text-white/50 text-xs font-bold uppercase tracking-wider text-center mb-3">
                  Your final four
                </p>
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {semis.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 rounded-full text-sm font-semibold bg-white/[0.06] border border-white/10 text-white/80"
                    >
                      {ALL_TEAMS[t].flag} {t}
                    </span>
                  ))}
                </div>
                <p className="text-white/50 text-xs font-bold uppercase tracking-wider text-center mb-3">
                  Your group winners
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {GROUPS.map((g) => {
                    const t = ALL_TEAMS[groupPicks[g.letter]];
                    return (
                      <div
                        key={g.letter}
                        className="flex flex-col items-center gap-1 bg-white/[0.04] border border-white/10 rounded-xl px-2 py-3"
                      >
                        <span style={bebas} className="text-white/40 text-xs tracking-[2px]">
                          GRP {g.letter}
                        </span>
                        <span className="text-2xl leading-none">{t.flag}</span>
                        <span className="text-white/75 text-[11px] font-semibold text-center leading-tight">
                          {t.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Share */}
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-colors"
                >
                  Share on X
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-colors"
                >
                  Share on WhatsApp
                </a>
                <button
                  type="button"
                  onClick={() => navigator.clipboard?.writeText(`${shareText} ${shareUrl}`)}
                  className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-colors"
                >
                  Copy Link
                </button>
              </div>

              {/* CTA */}
              <div className="max-w-xl mx-auto text-center bg-white/[0.05] border border-white/10 rounded-3xl px-6 py-10">
                <h4 style={bebas} className="text-white text-3xl sm:text-4xl tracking-wide mb-3">
                  Don&apos;t just watch the World Cup.
                  <span className="text-red"> Train for the next one.</span>
                </h4>
                <p className="text-white/65 mb-6">
                  5,000+ follow-along training videos used by 50,000+ players in
                  80+ countries. Your player&apos;s World Cup era starts in the backyard.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <a
                    href="https://app.anytime-soccer.com/register"
                    className="bg-red hover:bg-red-dark text-white px-8 py-4 rounded-full font-bold text-base transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(220,55,62,0.35)]"
                  >
                    Start Training Free →
                  </a>
                  <a
                    href="/free-training-plan"
                    className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold text-base transition-colors"
                  >
                    Get a Free Training Plan
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function StageHeading({ kicker, title, sub }: { kicker: string; title: string; sub: string }) {
  return (
    <div className="text-center mb-8">
      <p className="text-red text-xs font-bold uppercase tracking-[3px] mb-2">{kicker}</p>
      <h3 style={bebas} className="text-white text-4xl sm:text-5xl tracking-wide mb-2">
        {title}
      </h3>
      <p className="text-white/60 text-base">{sub}</p>
    </div>
  );
}

function StickyBar({
  progress,
  ready,
  cta,
  onNext,
  onBack,
}: {
  progress: string;
  ready: boolean;
  cta: string;
  onNext: () => void;
  onBack?: () => void;
}) {
  return (
    <div className="sticky bottom-4 mt-8 z-20">
      <div className="max-w-xl mx-auto flex items-center gap-3 bg-[#0a2340]/95 backdrop-blur border border-white/15 rounded-2xl px-4 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="text-white/50 hover:text-white text-sm font-semibold px-2 transition-colors shrink-0"
          >
            ←
          </button>
        )}
        <span className="text-white/70 text-sm font-semibold flex-1 truncate">{progress}</span>
        <button
          type="button"
          onClick={onNext}
          disabled={!ready}
          className={`px-6 py-3 rounded-full font-bold text-sm transition-all shrink-0 ${
            ready
              ? 'bg-red hover:bg-red-dark text-white shadow-[0_4px_20px_rgba(220,55,62,0.35)] hover:-translate-y-0.5'
              : 'bg-white/10 text-white/35'
          }`}
        >
          {cta}
        </button>
      </div>
    </div>
  );
}
