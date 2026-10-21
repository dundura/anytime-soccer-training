'use client';

import { useState } from 'react';
import Link from 'next/link';

type Audience = 'players' | 'parents' | 'coaches';
type Filter = 'all' | Audience;

type Item = {
  title: string;
  description: string;
  href: string;
  cta: string;
  kind: string;
  for: Audience[];
  image?: string;
  tile?: { big: string; small: string };
  external?: boolean;
};

const TRAIN: Item[] = [
  {
    title: '7-Day Training Plan',
    description: 'Short daily sessions your player can do in 10 minutes or less.',
    href: '/blog/free-7-day-soccer-skills-challenge',
    cta: 'Get it',
    kind: 'Plan',
    for: ['players', 'parents'],
    tile: { big: '7', small: 'days' },
  },
  {
    title: '100+ YouTube Video Library',
    description: 'Curated drills organized by age group, U6 to Advanced. Just click and train.',
    href: '/free-soccer-training-videos-100-youtube-drills-by-age-group',
    cta: 'Download',
    kind: 'Videos',
    for: ['players', 'coaches'],
    tile: { big: '100+', small: 'videos' },
  },
];

const GUIDES: Item[] = [
  {
    title: 'The Most Important Skill Never Taught',
    description: 'A simple tip that will change your child’s game.',
    href: '/the-most-important-skill-in-youth-soccer',
    cta: 'Read',
    kind: 'Guide',
    for: ['parents'],
    image: 'https://media.anytime-soccer.com/wp-content/uploads/2021/01/ast_facebook_image_3.jpg',
  },
  {
    title: 'Must-Have Guide to In-Home Training',
    description: 'Everything you need to start training at home effectively.',
    href: '/must-have-guide-for-serious-soccer-parents',
    cta: 'Read',
    kind: 'Guide',
    for: ['parents'],
    image: 'https://media.anytime-soccer.com/wp-content/themes/anytime/images/home/bg-1.png',
  },
  {
    title: '20 Questions for Every Club',
    description: 'Essential questions to ask before joining any youth soccer club.',
    href: '/20-questions-every-parent-should-ask',
    cta: 'Read',
    kind: 'Guide',
    for: ['parents'],
    image: 'https://media.anytime-soccer.com/wp-content/themes/anytime/images/ebook/ebook-1.png',
  },
  {
    title: 'Become a Rec Coach SuperHero',
    description: 'Practical tips and strategies to transform your rec coaching.',
    href: '/become-a-rec-coach-superhero',
    cta: 'Get guide',
    kind: 'Guide',
    for: ['coaches'],
    image: 'https://media.anytime-soccer.com/wp-content/themes/anytime/images/ebook/ebook-2.png',
  },
  {
    title: 'Everything About Guest Playing',
    description: 'Navigate guest playing opportunities like a pro.',
    href: '/everything-you-need-to-know-about-guest-playing',
    cta: 'Read',
    kind: 'Guide',
    for: ['parents'],
    image: 'https://media.anytime-soccer.com/wp-content/themes/anytime/images/ebook/ebook-3.png',
  },
  {
    title: 'Player Cards Guide',
    description: 'Know the eligibility rules and avoid missed tournament opportunities.',
    href: '/everything-you-need-to-know-about-player-cards',
    cta: 'Read',
    kind: 'Guide',
    for: ['parents'],
    image: 'https://media.anytime-soccer.com/wp-content/uploads/2024/11/pro-tips-for-college-showcases-1.png',
  },
  {
    title: 'The Parent Trainer’s Playbook',
    description: '20 unconventional tips for raising a competitive soccer player, from one soccer dad.',
    href: '/the-parent-trainers-playbook',
    cta: 'Read',
    kind: 'Ebook',
    for: ['parents', 'coaches'],
    image: 'https://media.anytime-soccer.com/wp-content/uploads/2024/08/the-playbook-20-unconventional-tips-for-raising-a-compeitive-soccer-player-thus-far-1024x789.png',
  },
  {
    title: 'Monopoly: Issues Facing US Youth Soccer',
    description: 'A candid look at what holds back American soccer, from one parent’s view.',
    href: '/monopoly-addressing-issues-facing-youth-soccer-ebook',
    cta: 'Read',
    kind: 'Ebook',
    for: ['parents', 'coaches'],
    image: 'https://media.anytime-soccer.com/wp-content/uploads/2024/07/us_soccer-768x596.png',
  },
];

const COMMUNITIES: Item[] = [
  {
    title: 'Anytime Soccer Training Group',
    description: 'A safe space for soccer parents to ask questions, share wins and support each other.',
    href: 'https://www.facebook.com/groups/anytimesoccerparents',
    cta: 'Join',
    kind: 'Facebook',
    for: ['parents', 'players'],
    image: 'https://media.anytime-soccer.com/wp-content/uploads/2021/04/anytime_facebook_group_770_445.jpg',
    external: true,
  },
  {
    title: 'Youth Soccer Coach Group',
    description: 'Tips, resources and support for youth coaches at every level.',
    href: 'https://www.facebook.com/groups/youthsoccercoach',
    cta: 'Join',
    kind: 'Facebook',
    for: ['coaches'],
    image: 'https://media.anytime-soccer.com/wp-content/uploads/2021/04/youth_soccer_coach_770_445.jpg',
    external: true,
  },
  {
    title: 'Guest Player Opportunities',
    description: 'Find and post guest playing opportunities. Get your player on the field.',
    href: 'https://www.facebook.com/groups/guestplayers',
    cta: 'Join',
    kind: 'Facebook',
    for: ['parents', 'players', 'coaches'],
    image: 'https://media.anytime-soccer.com/wp-content/uploads/2021/04/youth_soccer_guest_players_770_445.jpg',
    external: true,
  },
];

const CHIPS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'Everyone' },
  { id: 'players', label: 'Players' },
  { id: 'parents', label: 'Parents' },
  { id: 'coaches', label: 'Coaches' },
];

const show = (item: Item, f: Filter) => f === 'all' || item.for.includes(f as Audience);

function Card({ item }: { item: Item }) {
  const body = (
    <>
      <div className="shrink-0 w-[64px] h-[84px] sm:w-[76px] sm:h-[96px] rounded-[10px] overflow-hidden bg-[#dfe9f5] flex items-center justify-center">
        {item.image ? (
          <img src={item.image} alt="" className="w-full h-full object-cover" loading="lazy" />
        ) : item.tile ? (
          <div className="w-full h-full bg-navy text-white flex flex-col items-center justify-center">
            <span className="text-[26px] sm:text-[30px] font-extrabold leading-none">{item.tile.big}</span>
            <span className="text-[9px] font-bold uppercase tracking-[1.5px] opacity-75 mt-1">{item.tile.small}</span>
          </div>
        ) : null}
      </div>
      <div className="min-w-0 flex flex-col">
        <h3 className="text-[17px] font-bold text-navy leading-snug">{item.title}</h3>
        <p className="mt-1.5 text-[14.5px] text-gray">{item.description}</p>
        <div className="mt-auto pt-3 flex items-center gap-2">
          <span className="rounded-full bg-[#dfe9f5] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[1px] text-navy">{item.kind}</span>
          <span className="ml-auto text-sm font-bold text-red">{item.cta} &rarr;</span>
        </div>
      </div>
    </>
  );
  const cls = 'flex gap-4 bg-white border border-[#d6e0ec] rounded-2xl p-4 min-w-0 transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(15,49,84,0.12)]';
  return item.external ? (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className={cls}>{body}</a>
  ) : (
    <Link href={item.href} className={cls}>{body}</Link>
  );
}

function Block({ id, title, hint, items, filter, children }: { id: string; title: string; hint: string; items: Item[]; filter: Filter; children?: React.ReactNode }) {
  const shown = items.filter((i) => show(i, filter));
  if (!shown.length && !children) return null;
  return (
    <section id={id} className="pt-6 pb-2 scroll-mt-36">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 mb-4">
        <h2 className="text-2xl font-extrabold text-navy">{title}</h2>
        <span className="text-sm text-gray">{hint}</span>
      </div>
      {shown.length > 0 && (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((i) => <Card key={i.title} item={i} />)}
        </div>
      )}
      {children}
    </section>
  );
}

export default function FreeResourceHub() {
  const [filter, setFilter] = useState<Filter>('all');
  const total = TRAIN.length + GUIDES.length + COMMUNITIES.length;

  return (
    <>
      {/* Top: what this page is, and the one thing to do first */}
      <header className="bg-background pt-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-[2px] text-red block">Free resources</span>
          <h1 className="mt-2.5 text-[clamp(30px,5vw,46px)] font-extrabold text-navy leading-[1.1] max-w-[18ch]">
            Pick who it&rsquo;s for. Start training today.
          </h1>
          <p className="mt-3.5 text-lg text-navy/70 max-w-[52ch]">
            Plans, guides and communities for players, parents and coaches. All free. Nothing to buy.
          </p>

          <section aria-labelledby="start-here" className="mt-7 bg-navy text-white rounded-[20px] p-6 sm:p-7 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <div className="text-xs font-bold uppercase tracking-[2px] text-[#ffb3b6]">Start here</div>
              <h2 id="start-here" className="mt-2 text-[clamp(24px,3.4vw,32px)] font-extrabold leading-tight">The free 7-Day Training Plan</h2>
              <p className="mt-2.5 max-w-[54ch] text-white/90">
                Seven follow-along sessions your player can do at home in ten minutes or less. See the difference in one week.
              </p>
              <ul className="mt-3.5 flex flex-wrap gap-x-5 gap-y-1 text-sm font-semibold">
                <li><span className="text-[#7ee2a8]">&#10003;</span> Follow-along videos</li>
                <li><span className="text-[#7ee2a8]">&#10003;</span> No equipment needed</li>
                <li><span className="text-[#7ee2a8]">&#10003;</span> Yours forever</li>
              </ul>
            </div>
            <Link
              href="/blog/free-7-day-soccer-skills-challenge"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-full bg-red hover:bg-red-dark text-white font-bold whitespace-nowrap shadow-[0_4px_20px_rgba(220,55,62,0.35)] transition-colors"
            >
              Get the free plan &rarr;
            </Link>
          </section>
        </div>
      </header>

      {/* Who is this for: sorts everything below. Sticks under the site header. */}
      <div className="sticky top-16 z-30 bg-background pt-5 pb-3.5 mt-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p id="who-for" className="text-sm font-bold text-navy mb-2.5">I&rsquo;m looking for something for&hellip;</p>
          <div role="group" aria-labelledby="who-for" className="flex gap-2 overflow-x-auto sm:flex-wrap pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {CHIPS.map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={filter === c.id}
                onClick={() => setFilter(c.id)}
                className={`shrink-0 min-h-[44px] px-[18px] rounded-full border-2 text-[15px] font-semibold transition-colors ${
                  filter === c.id ? 'bg-navy border-navy text-white' : 'bg-white border-[#d6e0ec] text-navy hover:border-navy'
                }`}
              >
                {c.label}
                {c.id === 'all' && <span className="ml-1.5 text-sm font-normal opacity-70">({total})</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="bg-background pb-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Block id="plans" title="Train at home" hint="Videos and plans you can start right now" items={TRAIN} filter={filter} />

          <Block id="ebooks" title="Free guides and ebooks" hint="Short reads that answer one question each" items={GUIDES} filter={filter}>
            {(filter === 'all' || filter === 'parents') && (
              <div className="mt-5 flex flex-wrap items-center justify-between gap-5 bg-white border-2 border-navy rounded-[18px] px-6 py-5">
                <div>
                  <h3 className="text-xl font-extrabold text-navy">How does your child compare to the world&rsquo;s elite?</h3>
                  <p className="mt-1.5 max-w-[56ch] text-gray">
                    Take the free 2-minute survey and get a personalized PDF showing how your child&rsquo;s training compares.
                  </p>
                </div>
                <Link
                  href="/soccer-training-survey"
                  className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-full bg-red hover:bg-red-dark text-white font-bold whitespace-nowrap shadow-[0_4px_20px_rgba(220,55,62,0.35)] transition-colors"
                >
                  Take the survey &rarr;
                </Link>
              </div>
            )}
          </Block>

          <Block id="community" title="Join a free community" hint="Ask questions, share wins, find a team" items={COMMUNITIES} filter={filter} />
        </div>
      </main>
    </>
  );
}
