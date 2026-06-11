// 2026 FIFA World Cup — official final draw (Dec 5, 2025, Washington D.C.)
// tier: 1 = title favorite, 2 = contender, 3 = dark horse, 4 = underdog
// Used for the Boldness Score on /world-cup-predictor.

export type Team = {
  name: string;
  code: string; // flagcdn.com country code
  flag: string;
  tier: 1 | 2 | 3 | 4;
};

export type Group = {
  letter: string;
  teams: Team[];
};

export const GROUPS: Group[] = [
  {
    letter: 'A',
    teams: [
      { name: 'Mexico', code: 'mx', flag: '🇲🇽', tier: 3 },
      { name: 'South Africa', code: 'za', flag: '🇿🇦', tier: 4 },
      { name: 'South Korea', code: 'kr', flag: '🇰🇷', tier: 3 },
      { name: 'Czechia', code: 'cz', flag: '🇨🇿', tier: 4 },
    ],
  },
  {
    letter: 'B',
    teams: [
      { name: 'Canada', code: 'ca', flag: '🇨🇦', tier: 3 },
      { name: 'Switzerland', code: 'ch', flag: '🇨🇭', tier: 3 },
      { name: 'Bosnia & Herzegovina', code: 'ba', flag: '🇧🇦', tier: 4 },
      { name: 'Qatar', code: 'qa', flag: '🇶🇦', tier: 4 },
    ],
  },
  {
    letter: 'C',
    teams: [
      { name: 'Brazil', code: 'br', flag: '🇧🇷', tier: 2 },
      { name: 'Morocco', code: 'ma', flag: '🇲🇦', tier: 3 },
      { name: 'Scotland', code: 'gb-sct', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', tier: 4 },
      { name: 'Haiti', code: 'ht', flag: '🇭🇹', tier: 4 },
    ],
  },
  {
    letter: 'D',
    teams: [
      { name: 'United States', code: 'us', flag: '🇺🇸', tier: 3 },
      { name: 'Türkiye', code: 'tr', flag: '🇹🇷', tier: 3 },
      { name: 'Paraguay', code: 'py', flag: '🇵🇾', tier: 4 },
      { name: 'Australia', code: 'au', flag: '🇦🇺', tier: 4 },
    ],
  },
  {
    letter: 'E',
    teams: [
      { name: 'Germany', code: 'de', flag: '🇩🇪', tier: 2 },
      { name: 'Ecuador', code: 'ec', flag: '🇪🇨', tier: 3 },
      { name: 'Ivory Coast', code: 'ci', flag: '🇨🇮', tier: 4 },
      { name: 'Curaçao', code: 'cw', flag: '🇨🇼', tier: 4 },
    ],
  },
  {
    letter: 'F',
    teams: [
      { name: 'Netherlands', code: 'nl', flag: '🇳🇱', tier: 2 },
      { name: 'Japan', code: 'jp', flag: '🇯🇵', tier: 3 },
      { name: 'Sweden', code: 'se', flag: '🇸🇪', tier: 4 },
      { name: 'Tunisia', code: 'tn', flag: '🇹🇳', tier: 4 },
    ],
  },
  {
    letter: 'G',
    teams: [
      { name: 'Belgium', code: 'be', flag: '🇧🇪', tier: 3 },
      { name: 'Egypt', code: 'eg', flag: '🇪🇬', tier: 4 },
      { name: 'Iran', code: 'ir', flag: '🇮🇷', tier: 4 },
      { name: 'New Zealand', code: 'nz', flag: '🇳🇿', tier: 4 },
    ],
  },
  {
    letter: 'H',
    teams: [
      { name: 'Spain', code: 'es', flag: '🇪🇸', tier: 1 },
      { name: 'Uruguay', code: 'uy', flag: '🇺🇾', tier: 3 },
      { name: 'Saudi Arabia', code: 'sa', flag: '🇸🇦', tier: 4 },
      { name: 'Cape Verde', code: 'cv', flag: '🇨🇻', tier: 4 },
    ],
  },
  {
    letter: 'I',
    teams: [
      { name: 'France', code: 'fr', flag: '🇫🇷', tier: 1 },
      { name: 'Norway', code: 'no', flag: '🇳🇴', tier: 3 },
      { name: 'Senegal', code: 'sn', flag: '🇸🇳', tier: 3 },
      { name: 'Iraq', code: 'iq', flag: '🇮🇶', tier: 4 },
    ],
  },
  {
    letter: 'J',
    teams: [
      { name: 'Argentina', code: 'ar', flag: '🇦🇷', tier: 2 },
      { name: 'Austria', code: 'at', flag: '🇦🇹', tier: 3 },
      { name: 'Algeria', code: 'dz', flag: '🇩🇿', tier: 4 },
      { name: 'Jordan', code: 'jo', flag: '🇯🇴', tier: 4 },
    ],
  },
  {
    letter: 'K',
    teams: [
      { name: 'Portugal', code: 'pt', flag: '🇵🇹', tier: 2 },
      { name: 'Colombia', code: 'co', flag: '🇨🇴', tier: 3 },
      { name: 'Uzbekistan', code: 'uz', flag: '🇺🇿', tier: 4 },
      { name: 'DR Congo', code: 'cd', flag: '🇨🇩', tier: 4 },
    ],
  },
  {
    letter: 'L',
    teams: [
      { name: 'England', code: 'gb-eng', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', tier: 1 },
      { name: 'Croatia', code: 'hr', flag: '🇭🇷', tier: 3 },
      { name: 'Ghana', code: 'gh', flag: '🇬🇭', tier: 4 },
      { name: 'Panama', code: 'pa', flag: '🇵🇦', tier: 4 },
    ],
  },
];

export const ALL_TEAMS: Record<string, Team> = Object.fromEntries(
  GROUPS.flatMap((g) => g.teams).map((t) => [t.name, t])
);

// Vegas title odds heading into kickoff (June 2026)
export const BOOKIE_FAVORITES = [
  { name: 'Spain', odds: '+450' },
  { name: 'France', odds: '+500' },
  { name: 'England', odds: '+650' },
  { name: 'Brazil', odds: '+850' },
  { name: 'Portugal', odds: '+850' },
];

export const FINAL_SCORES = ['1–0', '2–0', '2–1', '3–1', '3–2', '1–1 (pens)', '2–2 (pens)'];

const CHAMPION_POINTS: Record<Team['tier'], number> = { 1: 5, 2: 18, 3: 34, 4: 50 };
const RUNNER_UP_POINTS: Record<Team['tier'], number> = { 1: 2, 2: 7, 3: 12, 4: 18 };
const SEMI_POINTS: Record<Team['tier'], number> = { 1: 0, 2: 2, 3: 5, 4: 8 };
const GROUP_UPSET_POINTS: Record<Team['tier'], number> = { 1: 0, 2: 0, 3: 1, 4: 4 };

export function boldnessScore(
  groupWinners: string[],
  semifinalists: string[],
  finalists: string[],
  champion: string
): number {
  const runnerUp = finalists.find((t) => t !== champion);
  const otherSemis = semifinalists.filter((t) => !finalists.includes(t));

  let score = CHAMPION_POINTS[ALL_TEAMS[champion].tier];
  if (runnerUp) score += RUNNER_UP_POINTS[ALL_TEAMS[runnerUp].tier];
  for (const t of otherSemis) score += SEMI_POINTS[ALL_TEAMS[t].tier];

  const upsets = Math.min(
    16,
    groupWinners.reduce((sum, t) => sum + GROUP_UPSET_POINTS[ALL_TEAMS[t].tier], 0)
  );
  return Math.min(100, score + upsets);
}

export function boldnessLabel(score: number): { label: string; blurb: string } {
  if (score < 25)
    return {
      label: 'Playing the Percentages',
      blurb: 'You went with the favorites — smart, but where’s the fun in that?',
    };
  if (score < 50)
    return {
      label: 'Calculated Risk-Taker',
      blurb: 'Mostly chalk with a couple of live grenades. A bracket built to survive.',
    };
  if (score < 75)
    return {
      label: 'Bold Visionary',
      blurb: 'You see something the bookies don’t. If this hits, frame it.',
    };
  return {
    label: 'Heart Over Head',
    blurb: 'Pure chaos. Zero respect for the odds. We love it.',
  };
}
