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

const PLAYERS: FaqEntry[] = [
  {
    audience: 'players',
    topic: 'Getting Started',
    question: 'How do I get started?',
    answer:
      '<p>Start with the <strong>Quick Start</strong> section, the fastest way to learn how the program works. From the Player Dashboard, click <strong>My Training</strong>, then click <strong>Start</strong> next to Quick Start.</p><p>Quick Start is made up of ball mastery videos. Every one has a slow-motion demonstration, a timer, and is 100% follow-along. We recommend completing at least 3 or 4 of them, then deciding what to do next.</p>',
    video: '1cSvyAa8C8I',
    article: {
      label: 'Quick Start Guide for Parents',
      url: 'https://www.soccer-near-me.com/posts/how-to-get-started-with-anytime-soccer-training-quick-start',
    },
  },
  {
    audience: 'players',
    topic: 'Getting Started',
    question: 'What age is this for?',
    answer: '<p>Our training sessions are designed for players ages 6-19, from complete beginners to advanced players.</p>',
  },
  {
    audience: 'players',
    topic: 'Getting Started',
    question: 'Do I need soccer experience to help my child?',
    answer: '<p>Not at all. Every video is 100% follow-along. Your child just presses play and trains. No coaching experience required.</p>',
  },
  {
    audience: 'players',
    topic: 'Getting Started',
    question: 'What equipment do I need?',
    answer: '<p>Just a soccer ball, a wall, and a small space. Some sessions use cones, goals, and agility equipment, but they are optional.</p>',
  },
  {
    audience: 'players',
    topic: 'Getting Started',
    question: 'How long are the training sessions?',
    answer:
      '<p>The average session is just 5 minutes, short enough to fit into any schedule and easy to stay consistent. Your player can train every day without it feeling like a chore.</p>',
  },
  {
    audience: 'players',
    topic: 'Training & Progress',
    question: "I finished a video but it doesn't show as done. What should I do?",
    answer:
      '<p>Sometimes it takes a moment for a video to show as done, so give it a minute before doing it again. If it still isn\'t marked done, send us a message on the <strong>Help Line</strong> in the app and tell us which video it was. We\'ll fix it and give you credit.</p>',
  },
  {
    audience: 'players',
    topic: 'Training & Progress',
    question: 'If I reset a plan, will the videos I already did stay green?',
    answer:
      '<p>Yes. Green shows the videos your player has already watched, and resetting a plan keeps them green. To clear one video, use the <strong>Reset</strong> button on that video.</p>',
  },
  {
    audience: 'players',
    topic: 'Training & Progress',
    question: 'How do I ask a question?',
    answer:
      '<p>Use the <strong>Help Line</strong> in the app. Your question comes straight to our team, and we answer you there.</p>',
  },
  {
    audience: 'players',
    topic: 'Accounts & Pricing',
    question: 'Is Anytime Soccer Training really free?',
    answer:
      '<p>Yes! You can join for free and access free training sessions forever. Premium plans start at just $59.98/year for individuals and $10/player/year for teams.</p>',
  },
  fromOnboarding('What if I have more than one child using the program?', 'players', 'Accounts & Pricing'),
  fromOnboarding(
    "What's the difference between the login email and the contact email, and how do I update them?",
    'players',
    'Accounts & Pricing',
  ),
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
