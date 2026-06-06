'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={dismiss}
    >
      <div className="absolute inset-0 bg-black/60" />

      <div
        className="relative bg-white rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.3)] max-w-[580px] w-full overflow-hidden flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={dismiss}
          className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-navy/10 hover:bg-navy/20 text-navy text-xl font-bold transition-colors cursor-pointer"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Left image */}
        <div className="hidden md:flex md:w-[40%] items-center justify-center overflow-hidden bg-gray-50">
          {variant === '7day' ? (
            <a href="https://www.anytime-soccer.com/free-soccer-drills-for-kids" onClick={dismiss}>
              <img
                src="https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1780777965295-ngesx2.png"
                alt="Anytime Soccer Training"
                className="w-full h-full object-cover"
              />
            </a>
          ) : (
            <img
              src="https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1780778473127-vnm6a6.png"
              alt="Free Training Plan"
              className="w-full h-full object-contain"
            />
          )}
        </div>

        {/* Right content */}
        <div className="w-full md:w-[55%] p-8 md:p-10 flex flex-col justify-center">
          {variant === '7day' ? (
            <>
              <p className="text-red text-xs font-bold uppercase tracking-[2px] mb-2">
                7-Day Training Plan
              </p>
              <p className="text-red text-sm font-semibold mb-4">
                Seven Free Training Sessions Delivered Each Day!
              </p>
              <div className="w-12 h-[3px] bg-red rounded-full mb-5" />
              <h2 className="text-2xl md:text-[28px] font-extrabold text-navy leading-tight mb-2">
                Your Player Is Falling Behind.
              </h2>
              <p className="text-gray text-[15px] mb-4">
                Every day without structure is a day other players are pulling ahead.
              </p>
              <p className="text-navy font-bold text-[15px] mb-1">
                Get <span className="text-red">5,000 quality</span> touches per day in less than 10 minutes.
              </p>
              <p className="text-gray text-sm mb-6">No guessing. Just press play.</p>
              <Link
                href="/free-soccer-drills-for-kids"
                onClick={dismiss}
                className="bg-red hover:bg-red-dark text-white text-center px-6 py-4 rounded-full font-bold text-base transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(220,55,62,0.35)] hover:shadow-[0_6px_25px_rgba(220,55,62,0.45)]"
              >
                Start My Free 7-Day Plan &rarr;
              </Link>
            </>
          ) : (
            <>
              <p className="text-red text-xs font-bold uppercase tracking-[2px] mb-2">
                Free — No Account Needed
              </p>
              <p className="text-red text-sm font-semibold mb-4">
                Build a personalized plan in 60 seconds!
              </p>
              <div className="w-12 h-[3px] bg-red rounded-full mb-5" />
              <h2 className="text-2xl md:text-[28px] font-extrabold text-navy leading-tight mb-2">
                Stop Guessing. Start Training.
              </h2>
              <p className="text-gray text-[15px] mb-4">
                Pick your player's skill areas, set the schedule, and get a free PDF plan emailed to you instantly.
              </p>
              <p className="text-navy font-bold text-[15px] mb-6">
                Built from <span className="text-red">5,000+ follow-along videos</span> used by 50,000+ players worldwide.
              </p>
              <Link
                href="/free-training-plan"
                onClick={dismiss}
                className="bg-red hover:bg-red-dark text-white text-center px-6 py-4 rounded-full font-bold text-base transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(220,55,62,0.35)] hover:shadow-[0_6px_25px_rgba(220,55,62,0.45)]"
              >
                Build My Free Plan &rarr;
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
