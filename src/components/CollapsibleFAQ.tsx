'use client';

import { useState } from 'react';

type FAQItem = { question: string; answer: string };

export default function CollapsibleFAQ({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mb-6">
      <h2 className="text-sm font-bold uppercase tracking-wide text-red mb-4">FAQ</h2>
      <div className="space-y-2">
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={item.question} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex items-center justify-between w-full text-left px-4 py-3 bg-gray-light hover:bg-background transition-colors"
              >
                <span className="font-semibold text-navy text-sm">{item.question}</span>
                <span className={`text-red flex-shrink-0 ml-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {isOpen && (
                <div className="px-4 py-3 text-gray-700 text-sm leading-relaxed bg-white">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
