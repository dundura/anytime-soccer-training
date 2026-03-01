"use client";

import { useState } from "react";
import Link from "next/link";

const TABS = [
  { label: "For Clubs", icon: "\u{26BD}", videoId: "HsoTlfJn-RA", caption: "Assign homework and track progress." },
  { label: "For Players", icon: "\u{1F3C3}", videoId: "qL5twf5dycE", caption: "Thousands of follow-along sessions like this one." },
  { label: "For Parents", icon: "\u{1F46A}", videoId: "89WWaQ46OcE", caption: "No soccer experience needed." },
];

export default function WhoIsAstFor() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  return (
    <section className="pt-0 pb-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-[0_4px_20px_rgba(15,49,84,0.08)]">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-center max-w-5xl mx-auto">
            {/* Left - Vertical Tab List */}
            <div className="flex md:flex-col gap-2 md:w-[280px] flex-shrink-0 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
              {TABS.map((t, i) => (
                <button
                  key={t.label}
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all flex-shrink-0 w-full ${
                    active === i
                      ? "bg-[#f5f7fa] border-l-4 border-red"
                      : "bg-transparent border-l-4 border-transparent hover:bg-[#f5f7fa]"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${
                      active === i ? "bg-red text-white" : "bg-[#f5f7fa] text-gray"
                    }`}
                  >
                    {t.icon}
                  </div>
                  <div>
                    <span
                      className={`font-bold text-base whitespace-nowrap block ${
                        active === i ? "text-navy" : "text-gray"
                      }`}
                    >
                      {t.label}
                    </span>
                    <span className={`text-sm ${active === i ? "text-gray" : "text-gray/60"}`}>
                      {t.caption}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Right - Heading + Video Player */}
            <div className="flex-1 w-full max-w-[680px]">
              <div className="text-center mb-6">
                <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-3">
                  Who Is Anytime Soccer Training <span className="text-red">For?</span>
                </h2>
                <p className="text-gray text-lg max-w-xl mx-auto">
                  Whether you&rsquo;re a club, a player, or a parent &mdash; we have a plan for you.
                </p>
              </div>
              <div className="aspect-video rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(15,49,84,0.12)]">
                <iframe
                  key={tab.videoId}
                  src={`https://www.youtube.com/embed/${tab.videoId}?rel=0&modestbranding=1`}
                  title={tab.label}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              {/* CTA */}
              <div className="text-center mt-8">
                <Link
                  href="/pricing"
                  className="bg-red hover:bg-red-dark text-white px-10 py-4 rounded-full font-bold text-lg transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(220,55,62,0.35)] hover:shadow-[0_6px_25px_rgba(220,55,62,0.45)] inline-flex items-center gap-2"
                >
                  Start Training Free &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
