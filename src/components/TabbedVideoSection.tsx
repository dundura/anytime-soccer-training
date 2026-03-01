"use client";

import { useState } from "react";
import Link from "next/link";

const TABS = [
  { label: "Ball Mastery", videoId: "qL5twf5dycE", start: 28, end: 58 },
  { label: "Dribbling", videoId: "jKlUqKMDrK0", start: 56, end: 86 },
  { label: "Juggling", videoId: "89WWaQ46OcE", start: 33, end: 63 },
  { label: "Passing", videoId: "VITiT66kqb4", start: 51, end: 81 },
  { label: "1v1", videoId: "4cDchwSw1Ig", start: 109, end: 139 },
];

function Thumbnail({ videoId }: { videoId: string }) {
  return (
    <img
      src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
      alt=""
      className="w-20 h-12 rounded-lg object-cover flex-shrink-0"
    />
  );
}

export default function TabbedVideoSection() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  return (
    <section className="py-20" style={{ background: "#1a1a1a" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            Get Your Free <span className="text-red">7-Day Training Plan</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            One week. Five skills. Follow along and watch your player improve.
          </p>
        </div>

        {/* Layout: sidebar tabs + video */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Left - Vertical Tab List */}
          <div className="flex md:flex-col gap-2 md:w-[260px] flex-shrink-0 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
            {TABS.map((t, i) => (
              <button
                key={t.label}
                onClick={() => setActive(i)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all flex-shrink-0 w-full ${
                  active === i
                    ? "bg-white/10 border-l-4 border-red"
                    : "bg-transparent border-l-4 border-transparent hover:bg-white/5"
                }`}
              >
                <Thumbnail videoId={t.videoId} />
                <span
                  className={`font-bold text-sm whitespace-nowrap ${
                    active === i ? "text-white" : "text-white/50"
                  }`}
                >
                  {t.label}
                </span>
              </button>
            ))}
          </div>

          {/* Right - Video Player */}
          <div className="flex-1 w-full">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <iframe
                key={tab.videoId + tab.start}
                src={`https://www.youtube.com/embed/${tab.videoId}?rel=0&autoplay=1&mute=1&loop=1&start=${tab.start}&end=${tab.end}&playlist=${tab.videoId}`}
                title={tab.label}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/free-soccer-drills-for-kids"
            className="bg-red hover:bg-red-dark text-white px-10 py-4 rounded-full font-bold text-lg transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(220,55,62,0.35)] hover:shadow-[0_6px_25px_rgba(220,55,62,0.45)] inline-flex items-center gap-2"
          >
            Get the Free 7-Day Plan &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
