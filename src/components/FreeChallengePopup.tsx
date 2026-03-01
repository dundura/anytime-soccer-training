"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function FreeChallengePopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("ast-popup-dismissed")) return;
    const timer = setTimeout(() => setShow(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setShow(false);
    sessionStorage.setItem("ast-popup-dismissed", "1");
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={dismiss}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.3)] max-w-[820px] w-full overflow-hidden flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={dismiss}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-navy text-lg font-bold transition-colors cursor-pointer"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Left - Phone mockup */}
        <div className="md:w-[45%] bg-[#ECF1F7] flex items-center justify-center p-8 md:p-10">
          <img
            src="https://anytime-soccer.com/wp-content/uploads/2026/03/simple_navigation_phone.png"
            alt="Anytime Soccer Training App"
            className="w-full max-w-[260px] -ml-5"
          />
        </div>

        {/* Right - Content */}
        <div className="md:w-[55%] p-8 md:p-10 flex flex-col justify-center">
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
          <p className="text-gray text-sm mb-6">
            No guessing. Just press play.
          </p>
          <Link
            href="/free-soccer-drills-for-kids"
            onClick={dismiss}
            className="bg-red hover:bg-red-dark text-white text-center px-6 py-4 rounded-full font-bold text-base transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(220,55,62,0.35)] hover:shadow-[0_6px_25px_rgba(220,55,62,0.45)]"
          >
            Start My Free 7-Day Plan &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
