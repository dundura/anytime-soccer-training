'use client';

/**
 * Content that is live on the site but no longer promoted anywhere, so it is
 * not forgotten. The pages themselves still work; only the cards that pointed
 * at them were taken down.
 */

const SITE = 'https://www.anytime-soccer.com';

const ITEMS = [
  {
    kind: 'Calculator',
    title: 'Free Age Group Calculator',
    blurb: 'Find the correct U6, U8, U10 age group for any season. Instant results for all three formation cycles.',
    path: '/calculator',
    note: 'Removed from the Free Resource Hub 2026-09-14',
  },
  {
    kind: 'Calculator',
    title: 'Free Club Budget Calculator',
    blurb: 'What it costs to run a youth soccer club -- coaching, facilities, insurance and more. Free PDF report.',
    path: '/soccer-club-cost-calculator',
    note: 'Removed from the Free Resource Hub 2026-09-14',
  },
];

export default function AllContent() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-navy mb-1">All content</h2>
      <p className="text-sm text-gray mb-6">Pages that are still live but not linked from the site. Each opens in a new tab.</p>
      <div className="space-y-3">
        {ITEMS.map((item) => (
          <a
            key={item.path}
            href={SITE + item.path}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl border border-gray-200 p-4 hover:border-navy hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-xs font-bold uppercase tracking-[2px] text-red">{item.kind}</span>
              <span className="text-xs text-gray">{item.note}</span>
            </div>
            <div className="text-base font-bold text-navy mt-1">{item.title} &#8599;</div>
            <div className="text-sm text-gray mt-1">{item.blurb}</div>
            <div className="text-xs text-gray mt-2 break-all">{SITE + item.path}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
