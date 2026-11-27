import { ONBOARDING_FAQ } from './onboardingFaq';

// The /faq page: questions grouped by who is asking (Players, Teams, Coaches), then by topic.
// To add a "how-to" video to a question, set `video` to the YouTube video id.
// To link the full article, set `article` (label + url).
export type FaqAudience = 'players' | 'teams' | 'coaches';

export type FaqEntry = {
  audience: FaqAudience;
  topic: string;
  question: string;
  answer: string; // HTML
  video?: string; // YouTube video id
  article?: { label: string; url: string };
};

export const FAQ_AUDIENCES: { key: FaqAudience; label: string }[] = [
  { key: 'players', label: 'Players' },
  { key: 'teams', label: 'Teams' },
  { key: 'coaches', label: 'Coaches' },
];

// Pull an existing onboarding answer by its question (nth match, for repeated titles like "How to Assign").
function fromOnboarding(question: string, audience: FaqAudience, topic: string, nth = 0): FaqEntry {
  const matches = ONBOARDING_FAQ.filter((f) => f.question === question);
  const item = matches[nth];
  if (!item) throw new Error(`FAQ question not found in onboardingFaq: ${question}`);
  return { audience, topic, question: item.question, answer: item.answer };
}

// Players: walkthroughs of each app feature, one section per feature (Neil 2026-11-26). First: Quick Start.
const PLAYERS: FaqEntry[] = [
  {
    audience: 'players',
    topic: 'Quick Start',
    question: 'How do I get started using Quick Start?',
    answer:
      '<p>Quick Start is the fastest way to learn the program: short ball mastery videos with a slow-motion demo and a timer. Just follow along.</p><ul><li>Open the <strong>Player Dashboard</strong>.</li><li>Click <strong>My Training</strong>.</li><li>Click <strong>Start</strong> next to Quick Start.</li><li>Do 3 or 4 videos, then pick what to do next.</li></ul>',
    video: '1cSvyAa8C8I',
    article: {
      label: 'Quick Start Guide for Parents',
      url: 'https://www.soccer-near-me.com/posts/how-to-get-started-with-anytime-soccer-training-quick-start',
    },
  },
  {
    audience: 'players',
    topic: 'Quick Start',
    question: 'How do I add and remove skills in Quick Start?',
    answer:
      '<p>Quick Start comes filled with ball mastery videos. You can add or remove skills any time.</p><ul><li>Open the <strong>Player Dashboard</strong> and click <strong>My Training</strong>.</li><li>Click <strong>Start</strong> next to Quick Start.</li><li>Click <strong>Add Skills</strong>.</li><li>To add: pick the skills you want (start with the core skills, like Dribbling, 1v1 and Wall Passing).</li><li>To remove: choose the skill you want to remove.</li><li>Click <strong>Save</strong>. Your plan updates automatically.</li></ul>',
    video: 'DktHxodyANE',
  },
];

const TEAMS: FaqEntry[] = [
  {
    audience: 'teams',
    topic: 'Pricing',
    question: 'How much does it cost for a team?',
    answer:
      '<p>Team plans are $10 per player per year. Every player gets full access, and coaches can assign homework and track progress.</p><p><a href="/how-team-pricing-works">See how team pricing works &rarr;</a></p>',
  },
  {
    audience: 'teams',
    topic: 'Pricing',
    question: 'Can I see the program before signing up my team?',
    answer:
      '<p>Yes. Request a free team demo and we\'ll walk you through it.</p><p><a href="/team-demo-request-anytime-soccer-training">Request a free team demo &rarr;</a></p>',
  },
  fromOnboarding("Parents can't find our team — what should I do?", 'teams', 'Joining a Team'),
  fromOnboarding("Players have joined the app, but they're not on my team", 'teams', 'Joining a Team'),
  fromOnboarding('Coach Contact', 'teams', 'Roster'),
  fromOnboarding('Parent Emails & Roster', 'teams', 'Roster'),
  fromOnboarding('More on Emails', 'teams', 'Roster'),
  fromOnboarding('Adding Players Later', 'teams', 'Roster'),
  fromOnboarding('Player Turnover', 'teams', 'Roster'),
  fromOnboarding('How do I add players to my team?', 'teams', 'Managing Your Team'),
  fromOnboarding('How do I remove players from my team?', 'teams', 'Managing Your Team'),
  fromOnboarding('Do completed videos move with a player to a new team?', 'teams', 'Managing Your Team'),
  fromOnboarding('Can my team have multiple team managers?', 'teams', 'Managing Your Team'),
  fromOnboarding('How do I change my team name?', 'teams', 'Managing Your Team'),
];

const COACHES: FaqEntry[] = [
  fromOnboarding('What are your expectations?', 'coaches', 'Getting Started'),
  fromOnboarding('Which homework do you recommend I start with?', 'coaches', 'Getting Started'),
  fromOnboarding('What do successful coaches do differently?', 'coaches', 'Getting Started'),
  fromOnboarding('Coaches who struggle', 'coaches', 'Getting Started'),
  fromOnboarding('Do my players need equipment and a lot of space?', 'coaches', 'Getting Started'),
  fromOnboarding('What are the different training plans?', 'coaches', 'Training Plans'),
  fromOnboarding('What are the 30-day plans?', 'coaches', 'Training Plans'),
  fromOnboarding('What are weekly plans?', 'coaches', 'Training Plans'),
  fromOnboarding('What are custom plans?', 'coaches', 'Training Plans'),
  fromOnboarding('How do I assign homework?', 'coaches', 'Assigning Homework'),
  fromOnboarding('How to Assign', 'coaches', 'Assigning Homework', 0),
  fromOnboarding('How to Assign', 'coaches', 'Assigning Homework', 1),
  fromOnboarding('Assigning Program Folders', 'coaches', 'Assigning Homework'),
  fromOnboarding('Assigning recurring training plans', 'coaches', 'Assigning Homework'),
  fromOnboarding('What happens if kids skip videos?', 'coaches', 'Assigning Homework'),
  fromOnboarding(
    "I got an email that a homework folder is complete, but the player hasn't done the videos",
    'coaches',
    'Assigning Homework',
  ),
  fromOnboarding('My players are not using the program as much as I expected', 'coaches', 'Boosting Usage'),
  fromOnboarding(
    'My kids have not used the program as much as I expected. Any suggestions?',
    'coaches',
    'Boosting Usage',
  ),
  fromOnboarding('Start a team contest', 'coaches', 'Boosting Usage'),
  fromOnboarding('Set a personal goal for every player', 'coaches', 'Boosting Usage'),
  fromOnboarding('Demo the app in person', 'coaches', 'Boosting Usage'),
];

export const FAQ_ENTRIES: FaqEntry[] = [...PLAYERS, ...TEAMS, ...COACHES];
