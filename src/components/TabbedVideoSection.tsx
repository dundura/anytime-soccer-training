"use client";

import { useState } from "react";
import Link from "next/link";

const TABS = [
  { label: "Ball Mastery", icon: "⚽", videoId: "qL5twf5dycE" },
  { label: "Dribbling", icon: "🏃", videoId: "jKlUqKMDrK0" },
  { label: "Juggling", icon: "🎯", videoId: "89WWaQ46OcE" },
  { label: "Passing", icon: "🎯", videoId: "VITiT66kqb4" },
  { label: "1v1", icon: "⚡", videoId: "4cDchwSw1Ig" },
];

export default function TabbedVideoSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-20 bg-navy">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
          Get Your Free <span className="text-red">7-Day Training Plan</span>
        </h2>
        <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
          One week. Five skills. Follow along and watch your player improve.
        </p>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {TABS.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActive(i)}
              className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all ${
                active === i
                  ? "bg-red text-white shadow-[0_4px_20px_rgba(220,55,62,0.4)]"
                  : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Video Player */}
        <div className="aspect-video rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)] mb-10">
          <iframe
            key={TABS[active].videoId}
            src={`https://www.youtube.com/embed/${TABS[active].videoId}?rel=0`}
            title={TABS[active].label}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* CTA */}
        <Link
          href="/free-soccer-drills-for-kids"
          className="bg-red hover:bg-red-dark text-white px-10 py-4 rounded-full font-bold text-lg transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(220,55,62,0.35)] hover:shadow-[0_6px_25px_rgba(220,55,62,0.45)] inline-flex items-center gap-2"
        >
          Get the Free 7-Day Plan &rarr;
        </Link>
      </div>
    </section>
  );
}
