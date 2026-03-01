"use client";

import { useState } from "react";
import Link from "next/link";

const TABS = [
  { label: "Assign Homework", videoId: "HsoTlfJn-RA", start: 0 },
  { label: "Track Progress", videoId: "HsoTlfJn-RA", start: 30 },
  { label: "Team Leaderboard", videoId: "HsoTlfJn-RA", start: 60 },
  { label: "Auto Reminders", videoId: "HsoTlfJn-RA", start: 90 },
  { label: "Team Reports", videoId: "HsoTlfJn-RA", start: 120 },
];

function TabIcon({ index, active }: { index: number; active: boolean }) {
  const icons = ["\u{1F4CB}", "\u{1F4CA}", "\u{1F3C6}", "\u{1F514}", "\u{1F4C4}"];
  return (
    <div
      className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${
        active ? "bg-red text-white" : "bg-[#f5f7fa] text-gray"
      }`}
    >
      {icons[index]}
    </div>
  );
}

export default function CoachTabbedSection() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  return (
    <section className="pt-0 pb-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading above the dark card */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-3">
            Your Players Are Going Home With <span className="text-red">No Plan</span>
          </h2>
          <p className="text-gray text-lg max-w-2xl mx-auto">
            Give every player structured homework, real accountability, and a reason to train &mdash; without adding a single minute to your practice schedule.
          </p>
        </div>

        {/* White card with tabbed layout */}
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
                  <TabIcon index={i} active={active === i} />
                  <span
                    className={`font-bold text-base whitespace-nowrap ${
                      active === i ? "text-navy" : "text-gray"
                    }`}
                  >
                    {t.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Right - Video Player */}
            <div className="flex-1 w-full max-w-[680px]">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(15,49,84,0.12)]">
                <iframe
                  key={tab.videoId + tab.start}
                  src={`https://www.youtube.com/embed/${tab.videoId}?si=qaaiddui_N00_9rT&start=${tab.start}`}
                  title={tab.label}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              {/* CTA */}
              <div className="text-center mt-8">
                <Link
                  href="/team-demo-request-anytime-soccer-training"
                  className="bg-red hover:bg-red-dark text-white px-10 py-4 rounded-full font-bold text-lg transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(220,55,62,0.35)] hover:shadow-[0_6px_25px_rgba(220,55,62,0.45)] inline-flex items-center gap-2"
                >
                  Request Team Demo &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
