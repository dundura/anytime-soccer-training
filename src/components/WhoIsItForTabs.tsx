"use client";

import { useState } from "react";

const tabs = [
  {
    icon: "\u{26BD}",
    title: "For Clubs",
    description: "Assign homework and track progress.",
    videoSrc: "https://www.youtube.com/embed/HsoTlfJn-RA?si=CkvGY5nj_4FmNERN",
  },
  {
    icon: "\u{1F3C3}",
    title: "For Players",
    description: "Thousands of follow-along sessions like this one.",
    videoSrc: "https://www.youtube.com/embed/9f262gP1Bvw?si=EvUXGSicHrppE9j8",
  },
  {
    icon: "\u{1F46A}",
    title: "For Parents",
    description: "No soccer experience needed.",
    videoSrc: "https://www.youtube.com/embed/SWEwb1UVoFk?si=6z-Gr77Ibdy0QpEP",
  },
];

export default function WhoIsItForTabs() {
  const [active, setActive] = useState(0);

  return (
    <section className="pt-0 pb-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-[0_4px_20px_rgba(15,49,84,0.08)]">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-[2px] text-red block mb-3">Who Is It For</span>
            <h2 className="text-[clamp(24px,4vw,36px)] font-bold text-navy leading-tight max-w-3xl mx-auto">
              Who Is Anytime Soccer Training <span className="text-red">For?</span>
            </h2>
            <p className="text-lg text-[#64748b] mt-4 max-w-2xl mx-auto">
              Whether you&rsquo;re a club, a player, or a parent &mdash; we have a plan for you.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_1.6fr] gap-8 items-start">
            {/* Tabs */}
            <div className="flex flex-col gap-3">
              {tabs.map((tab, i) => (
                <button
                  key={tab.title}
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-4 text-left px-5 py-4 rounded-xl transition-all cursor-pointer border-2 ${
                    active === i
                      ? "bg-navy text-white border-navy shadow-[0_4px_20px_rgba(15,49,84,0.2)]"
                      : "bg-[#f5f7fa] text-navy border-transparent hover:border-navy/20"
                  }`}
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                    active === i ? "bg-white/15" : "bg-white"
                  }`}>
                    {tab.icon}
                  </div>
                  <div>
                    <div className="font-bold text-[15px]">{tab.title}</div>
                    <div className={`text-sm ${active === i ? "text-white/70" : "text-[#64748b]"}`}>
                      {tab.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Video Player */}
            <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(15,49,84,0.15)] bg-navy">
              <iframe
                key={tabs[active].videoSrc}
                src={tabs[active].videoSrc}
                className="w-full aspect-video border-none block"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={tabs[active].title}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
