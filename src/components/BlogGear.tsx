import Image from 'next/image';
import Link from 'next/link';

/**
 * The gear block that sits at the foot of every blog post.
 *
 * Only 46 of 441 posts carried an Amazon link, so the whole affiliate income
 * rode on those few ranking. This puts three tagged products under every post
 * instead — written once here rather than pasted into 441 bodies, so a dead
 * link or a changed tag is one edit.
 *
 * Chosen by what the post is about, not at random: a post about rebounders
 * gets rebounders. A post that matches nothing gets the three things every
 * player training at home needs anyway, which is a better guess than nothing.
 *
 * The disclosure is part of the block rather than a line in the footer,
 * because Amazon requires it next to the links and a reader deserves it in the
 * same breath as the recommendation.
 */

type Product = {
  title: string;
  image: string;
  href: string;
  keywords: string[];
};

// Every href is an amzn.to short link created under anytimeamazon-20, so the
// tag travels with it and cannot be dropped by a copy/paste.
const PRODUCTS: Product[] = [
  {
    title: 'Adidas MLS Training Soccer Ball',
    image: 'https://media.anytime-soccer.com/wp-content/uploads/2026/01/adidas-mls-soccer-ball.jpg',
    href: 'https://amzn.to/4q6yUY3',
    keywords: ['ball', 'juggling', 'juggle', 'touch', 'mastery', 'dribbl', 'shooting', 'first touch'],
  },
  {
    title: 'Disc Training Cones (Set of 40)',
    image: 'https://media.anytime-soccer.com/wp-content/uploads/2026/01/training-cones.jpg',
    href: 'https://amzn.to/4soWKzv',
    keywords: ['cone', 'dribbl', 'drill', 'agility', 'practice', 'session', 'backyard', 'at-home', 'at home'],
  },
  {
    title: 'PUGG Pop-Up Soccer Goals (Set of 2)',
    image: 'https://media.anytime-soccer.com/wp-content/uploads/2026/01/popup-goals.jpg',
    href: 'https://amzn.to/4qA1Kj9',
    keywords: ['goal', 'shooting', 'finish', 'score', 'small sided', 'backyard', 'game'],
  },
  {
    title: 'Soccer Rebounder',
    image: 'https://media.anytime-soccer.com/wp-content/uploads/2026/01/soccer-rebounder.jpg',
    href: 'https://amzn.to/4qFkfD1',
    keywords: ['rebound', 'passing', 'pass', 'wall', 'alone', 'solo', 'by yourself'],
  },
  {
    title: 'QuickPlay REPLAY Station',
    image: 'https://media.anytime-soccer.com/wp-content/uploads/2025/09/replay-station-xl-best-rebound-board-soccer_1482x1482.webp',
    href: 'https://amzn.to/4mQFcsT',
    keywords: ['rebound', 'rebounder', 'wall', 'passing'],
  },
  {
    title: 'Agility Ladder Set',
    image: 'https://media.anytime-soccer.com/wp-content/uploads/2026/01/soccer_agility_ladder.jpg',
    href: 'https://amzn.to/4spLHX1',
    keywords: ['agility', 'speed', 'quick', 'footwork', 'fitness', 'conditioning', 'faster'],
  },
  {
    title: 'Size One Soccer Ball',
    image: 'https://media.anytime-soccer.com/wp-content/uploads/2026/01/size_one-soccer-balls.jpg',
    href: 'https://amzn.to/4aM3st9',
    keywords: ['young', 'u6', 'u7', 'u8', 'toddler', 'beginner', 'first', 'little', 'age'],
  },
  {
    title: 'Portable Ball Pump',
    image: 'https://media.anytime-soccer.com/wp-content/uploads/2026/01/portable_ball_pump.jpg',
    href: 'https://amzn.to/3YZtSQU',
    keywords: ['pump', 'equipment', 'gear', 'bag', 'kit'],
  },
  {
    title: 'Bluetooth Speaker',
    image: 'https://media.anytime-soccer.com/wp-content/uploads/2026/01/blue_tooth_speaker.jpg',
    href: 'https://amzn.to/4sGL2Rc',
    keywords: ['music', 'motivation', 'fun', 'bored', 'boring'],
  },
];

// What a player training at home needs whatever the post was about.
const FALLBACK = ['Adidas MLS Training Soccer Ball', 'Disc Training Cones (Set of 40)', 'Soccer Rebounder'];

function pick(title: string): Product[] {
  const haystack = title.toLowerCase();
  const scored = PRODUCTS.map((p) => ({
    p,
    score: p.keywords.reduce((n, k) => (haystack.includes(k) ? n + 1 : n), 0),
  }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.p);

  const out: Product[] = [];
  for (const p of scored) {
    if (out.length === 3) break;
    if (!out.some((o) => o.title === p.title)) out.push(p);
  }
  for (const name of FALLBACK) {
    if (out.length === 3) break;
    const p = PRODUCTS.find((x) => x.title === name);
    if (p && !out.some((o) => o.title === p.title)) out.push(p);
  }
  return out;
}

export default function BlogGear({ title }: { title: string }) {
  const products = pick(title);

  return (
    <section className="mt-10 border border-gray-200 rounded-2xl overflow-hidden">
      <div className="bg-background px-5 py-4 border-b border-gray-200">
        <h2 className="text-lg font-bold text-navy m-0">Gear we use for this</h2>
        <p className="text-sm text-gray-600 mt-1 mb-0">
          The kit our own players train with at home.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5">
        {products.map((p) => (
          <a
            key={p.title}
            href={p.href}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="group block no-underline"
          >
            <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-white border border-gray-200">
              <Image
                src={p.image}
                alt={p.title}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-contain p-3"
              />
            </div>
            <p className="mt-2 text-sm font-semibold text-navy leading-snug group-hover:text-red transition-colors">
              {p.title}
            </p>
            <span className="text-xs font-bold text-red">View on Amazon →</span>
          </a>
        ))}
      </div>

      <div className="px-5 pb-5 flex flex-wrap items-center gap-x-4 gap-y-2">
        <Link href="/our-picks" className="text-sm font-bold text-navy underline">
          See everything we recommend
        </Link>
        <p className="text-xs text-gray-500 m-0">
          As an Amazon Associate we earn from qualifying purchases, at no extra cost to you.
        </p>
      </div>
    </section>
  );
}
