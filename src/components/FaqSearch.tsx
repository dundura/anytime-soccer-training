'use client';

import { useMemo, useState } from 'react';
import CollapsibleFAQ from './CollapsibleFAQ';

type FAQItem = { question: string; answer: string; category?: string };

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, ' ');
}

function rankItem(item: FAQItem, words: string[]) {
  const question = item.question.toLowerCase();
  const answer = stripHtml(item.answer).toLowerCase();
  let score = 0;
  for (const word of words) {
    if (question.includes(word)) score += 2;
    else if (answer.includes(word)) score += 1;
    else return 0;
  }
  return score;
}

export default function FaqSearch({ items }: { items: FAQItem[] }) {
  const [query, setQuery] = useState('');
  // Sections are collapsed by default; this tracks the ones the user opened
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  const toggleSection = (cat: string) =>
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });

  const filtered = useMemo(() => {
    const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (words.length === 0) return items;
    return items
      .map((item) => ({ item, score: rankItem(item, words) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ item }) => item);
  }, [items, query]);

  return (
    <div>
      <div className="relative mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search questions..."
          className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm text-navy placeholder:text-gray focus:outline-none focus:ring-2 focus:ring-red/30 focus:border-red"
        />
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray">🔍</span>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-700 text-sm">No questions match &ldquo;{query}&rdquo;.</p>
      ) : query.trim() ? (
        <CollapsibleFAQ items={filtered} hideHeading />
      ) : (
        // No search: group questions under collapsible section headings (collapsed by default)
        (() => {
          const order: string[] = [];
          const groups = new Map<string, FAQItem[]>();
          for (const item of filtered) {
            const cat = item.category || 'General';
            if (!groups.has(cat)) {
              groups.set(cat, []);
              order.push(cat);
            }
            groups.get(cat)!.push(item);
          }
          return order.map((cat) => {
            const isOpen = openSections.has(cat);
            return (
              <div key={cat} className="mb-4">
                <button
                  type="button"
                  onClick={() => toggleSection(cat)}
                  className="flex items-center justify-between w-full text-left px-4 py-3 bg-navy rounded-lg hover:bg-navy-light transition-colors"
                >
                  <span className="text-sm font-bold uppercase tracking-wide text-white">{cat}</span>
                  <span className={`text-red flex-shrink-0 ml-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                </button>
                {isOpen && (
                  <div className="mt-2">
                    <CollapsibleFAQ items={groups.get(cat)!} hideHeading />
                  </div>
                )}
              </div>
            );
          });
        })()
      )}
    </div>
  );
}
