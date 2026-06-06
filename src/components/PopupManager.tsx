'use client';

import { useState, useEffect } from 'react';

const VARIANTS = {
  '7day': {
    image: 'https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1780777965295-ngesx2.png',
    alt: 'Free 7-Day Soccer Training Plan',
    href: '/free-soccer-drills-for-kids',
  },
  'plan-builder': {
    image: 'https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1780778473127-vnm6a6.png',
    alt: 'Free Soccer Training Plan Builder',
    href: '/free-training-plan',
  },
};

export default function PopupManager() {
  const [show, setShow] = useState(false);
  const [variant, setVariant] = useState<'7day' | 'plan-builder'>('7day');

  useEffect(() => {
    if (sessionStorage.getItem('ast-popup-dismissed')) return;
    setVariant(Math.random() < 0.5 ? '7day' : 'plan-builder');
    const timer = setTimeout(() => setShow(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setShow(false);
    sessionStorage.setItem('ast-popup-dismissed', '1');
  };

  if (!show) return null;

  const v = VARIANTS[variant];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={dismiss}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div
        className="relative max-w-[580px] w-full rounded-2xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.3)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={dismiss}
          className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-navy/10 hover:bg-navy/20 text-navy text-xl font-bold transition-colors cursor-pointer"
          aria-label="Close"
        >
          &times;
        </button>
        <a href={v.href} onClick={dismiss}>
          <img
            src={v.image}
            alt={v.alt}
            className="w-full block"
          />
        </a>
      </div>
    </div>
  );
}
