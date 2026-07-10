'use client';

import { useMemo, useState } from 'react';
import CollapsibleFAQ from './CollapsibleFAQ';

type FAQItem = { question: string; answer: string };

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

      {filtered.length > 0 ? (
        <CollapsibleFAQ items={filtered} hideHeading />
      ) : (
        <p className="text-gray-700 text-sm">No questions match &ldquo;{query}&rdquo;.</p>
      )}
    </div>
  );
}
