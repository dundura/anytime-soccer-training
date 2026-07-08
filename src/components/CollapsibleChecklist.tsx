'use client';

import { useState } from 'react';
import Link from 'next/link';

type ChecklistItem = { label: string; href?: string };

export default function CollapsibleChecklist({
  heading,
  items,
}: {
  heading: string;
  items: ChecklistItem[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-6">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-left"
      >
        <h2 className="text-sm font-bold uppercase tracking-wide text-red">{heading}</h2>
        <span className={`text-red transition-transform ${open ? 'rotate-180' : ''}`}>▼</span>
      </button>

      {open && (
        <ol className="space-y-5 mt-4">
          {items.map((item, i) => (
            <li key={item.label} className="flex gap-4">
              <span className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-navy text-white font-bold text-sm">
                {i + 1}
              </span>
              {item.href ? (
                <Link href={item.href} className="font-semibold text-navy hover:underline">
                  {item.label}
                </Link>
              ) : (
                <p className="font-semibold text-navy">{item.label}</p>
              )}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
