'use client';

import { useState } from 'react';
import type { Metadata } from 'next';

interface Product {
  title: string;
  image: string;
  href: string;
  cta?: string;
}

interface Section {
  id: string;
  icon: string;
  title: string;
  description: string;
  products: Product[];
}

const SECTIONS: Section[] = [
  {
    id: 'essential-gear',
    icon: '\u26BD',
    title: 'Essential Training Gear',
    description: 'Everything your player needs to train at home and accelerate their development.',
    products: [
      { title: 'Adidas MLS Training Soccer Ball', image: 'https://anytime-soccer.com/wp-content/uploads/2026/01/adidas-mls-soccer-ball.jpg', href: 'https://amzn.to/4q6yUY3' },
      { title: 'Disc Training Cones (Set of 40)', image: 'https://anytime-soccer.com/wp-content/uploads/2026/01/training-cones.jpg', href: 'https://amzn.to/4soWKzv' },
      { title: 'PUGG Pop-Up Soccer Goals (Set of 2)', image: 'https://anytime-soccer.com/wp-content/uploads/2026/01/popup-goals.jpg', href: 'https://amzn.to/4qA1Kj9' },
      { title: 'Soccer Rebounder', image: 'https://anytime-soccer.com/wp-content/uploads/2026/01/soccer-rebounder.jpg', href: 'https://amzn.to/4qFkfD1' },
      { title: 'Bluetooth Speaker', image: 'https://anytime-soccer.com/wp-content/uploads/2026/01/blue_tooth_speaker.jpg', href: 'https://amzn.to/4sGL2Rc' },
      { title: 'Agility Ladder Set', image: 'https://anytime-soccer.com/wp-content/uploads/2026/01/soccer_agility_ladder.jpg', href: 'https://amzn.to/4spLHX1' },
      { title: 'Size One Soccer Ball', image: 'https://anytime-soccer.com/wp-content/uploads/2026/01/size_one-soccer-balls.jpg', href: 'https://amzn.to/4aM3st9' },
      { title: 'Portable Ball Pump', image: 'https://anytime-soccer.com/wp-content/uploads/2026/01/portable_ball_pump.jpg', href: 'https://amzn.to/3YZtSQU' },
    ],
  },
  {
    id: 'rebounders',
    icon: '\uD83C\uDFAF',
    title: 'Soccer Rebounders',
    description: 'Smart and budget-friendly rebounders for wall passing and first touch training.',
    products: [
      { title: 'A-Champs RebounderGo - Smart Training Rebounder with Lights & Sensors', image: 'https://anytime-soccer.com/wp-content/uploads/2025/07/a-champs_rebounder.webp', href: 'https://a-champs.com/collections/soccer-training-equipment?sca_ref=9165467.J8S7aW63u8&utm_source=uppromote&utm_medium=affiliate&utm_campaign=neil-crawford', cta: 'Buy Now - $269' },
      { title: 'QuickPlay REPLAY Station - Most Portable Rebounder', image: 'https://anytime-soccer.com/wp-content/uploads/2025/09/replay-station-xl-best-rebound-board-soccer_1482x1482.webp', href: 'https://amzn.to/4mQFcsT', cta: 'Buy Now - $89-$179' },
      { title: 'SteelRebound with HDPE Board - Best Budget Portable Rebounder', image: 'https://anytime-soccer.com/wp-content/uploads/2025/09/s-l1600-1.webp', href: 'https://amzn.to/4njgP73', cta: 'Buy Now - $119' },
      { title: 'Portable Rebound Net - Simple & Affordable', image: 'https://anytime-soccer.com/wp-content/uploads/2026/01/soccer-rebounder.jpg', href: 'https://amzn.to/465vYSw' },
    ],
  },
];

function CollapsibleSection({ section }: { section: Section }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 border-b-2 border-gray-200 text-left group"
      >
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-navy flex items-center gap-3 group-hover:text-red transition-colors">
            <span className="text-[28px]">{section.icon}</span> {section.title}
          </h2>
          <p className="text-gray text-base mt-2">{section.description}</p>
        </div>
        <span className={`text-2xl font-bold text-red transition-transform ml-4 shrink-0 ${open ? 'rotate-180' : ''}`}>
          &#9660;
        </span>
      </button>

      {open && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-10">
          {section.products.map((product) => (
            <a
              key={product.title}
              href={product.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(15,49,84,0.08)] hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(15,49,84,0.12)] transition-all flex flex-col"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full aspect-square object-contain bg-white p-4 border-b border-gray-100"
                loading="lazy"
              />
              <div className="p-4 flex flex-col flex-1">
                <p className="text-sm font-semibold text-navy leading-snug mb-3 flex-1">{product.title}</p>
                <span className="block w-full py-3 px-4 bg-red hover:bg-red-dark text-white text-center font-semibold text-sm rounded-lg transition-colors">
                  {product.cta || 'Buy Now'}
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function OurPicksPage() {
  return (
    <>
      {/* Header */}
      <div className="text-center pt-10 pb-14 bg-gradient-to-b from-background to-white">
        <h1 className="text-3xl md:text-[48px] font-bold text-navy mb-4">Soccer Gear We Recommend</h1>
        <p className="text-lg text-gray max-w-xl mx-auto px-4">
          Trusted equipment and resources to help your player train, recover, and perform at their best.
        </p>
      </div>

      {/* Sections */}
      {SECTIONS.map((section) => (
        <CollapsibleSection key={section.id} section={section} />
      ))}

      {/* Affiliate Disclosure */}
      <div className="text-center py-10 bg-gray-50 border-t border-gray-200 mt-8">
        <p className="text-sm text-gray/70 max-w-xl mx-auto px-4">
          <strong>Disclosure:</strong> As an Amazon Associate and affiliate partner, we earn from qualifying purchases. This helps support our site at no extra cost to you.
        </p>
      </div>
    </>
  );
}
