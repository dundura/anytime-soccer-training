"use client";

import { useState } from "react";
import Link from "next/link";

const TABS = [
  { label: "Ball Mastery", videoId: "qL5twf5dycE", start: 28, end: 58, mp4: "https://vz-61d41acf-acf.b-cdn.net/207aad0d-a703-42a8-a6a4-3974a27be429/play_720p.mp4" },
  { label: "Dribbling", videoId: "jKlUqKMDrK0", start: 56, end: 86, mp4: "https://vz-61d41acf-acf.b-cdn.net/fdc38f95-1a3d-48ee-ac06-0aef5c925e1d/play_720p.mp4" },
  { label: "Juggling", videoId: "89WWaQ46OcE", start: 33, end: 63, mp4: "https://vz-61d41acf-acf.b-cdn.net/686e7576-4a74-4d42-af05-2a4f73aa362a/play_720p.mp4" },
  { label: "Passing", videoId: "VITiT66kqb4", start: 51, end: 81, mp4: "https://vz-61d41acf-acf.b-cdn.net/d3a89428-ecab-493f-a16e-2fb4b87970c5/play_720p.mp4" },
  { label: "1v1", videoId: "4cDchwSw1Ig", start: 109, end: 139, mp4: "https://vz-61d41acf-acf.b-cdn.net/ab40df6d-b4dc-4825-a632-ad8a5f02f764/play_720p.mp4" },
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

export default function TabbedVideoSection({ title, subtitle, hideCta, compact }: { title?: string; subtitle?: string; hideCta?: boolean; compact?: boolean } = {}) {
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  return (
    <section className={compact ? "pt-0 pb-0" : "pt-0 pb-10 bg-background"}>
      <div className={compact ? "" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"}>
        <div className={compact ? "" : "bg-white rounded-2xl p-8 md:p-12 shadow-[0_4px_20px_rgba(15,49,84,0.08)]"}>
          {/* Mobile: heading + 2-col grid tabs */}
          <div className="md:hidden mb-6">
            {title !== '' && (
              <div className="text-center mb-6">
                <h2 className="text-3xl font-extrabold text-navy mb-3 uppercase tracking-tight">
                  {title || <>Get Your Free <span className="text-red">7-Day Training Plan</span></>}
                </h2>
                {subtitle !== undefined ? (
                  subtitle && <p className="text-gray text-lg max-w-xl mx-auto">{subtitle}</p>
                ) : (
                  <p className="text-gray text-lg max-w-xl mx-auto">Follow along and watch your player improve.</p>
                )}
              </div>
            )}
            <div className="grid grid-cols-2 gap-2">
              {TABS.map((t, i) => (
                <button
                  key={t.label}
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-2 px-3 py-3 rounded-xl text-left transition-all ${
                    i === TABS.length - 1 ? "col-span-2 max-w-[50%] mx-auto w-full" : ""
                  } ${
                    active === i
                      ? "bg-[#f5f7fa] border-2 border-red"
                      : "bg-[#f5f7fa] border-2 border-transparent"
                  }`}
                >
                  <Thumbnail videoId={t.videoId} />
                  <span className={`font-bold ${t.label === "Dribbling" || t.label === "Juggling" ? "text-[11px]" : "text-xs"} ${active === i ? "text-navy" : "text-gray"}`}>
                    {t.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Layout: sidebar tabs + (heading + video), centered */}
          <div className={compact ? "max-w-5xl mx-auto" : "flex flex-col md:flex-row gap-6 items-center justify-center max-w-5xl mx-auto"}>
            {/* Left - Vertical Tab List (desktop only, non-compact) */}
            {!compact && (
              <div className="hidden md:flex flex-col gap-2 md:w-[280px] flex-shrink-0">
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
                    <Thumbnail videoId={t.videoId} />
                    <span className={`font-bold text-base whitespace-nowrap ${active === i ? "text-navy" : "text-gray"}`}>
                      {t.label}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Right - Heading + Video Player */}
            <div className="flex-1 w-full max-w-[680px]">
              {title !== '' && (
                <div className="text-center mb-6 hidden md:block">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-3 uppercase tracking-tight">
                    {title || <>Get Your Free <span className="text-red">7-Day Training Plan</span></>}
                  </h2>
                  {subtitle !== undefined ? (
                    subtitle && <p className="text-gray text-lg max-w-xl mx-auto">{subtitle}</p>
                  ) : (
                    <p className="text-gray text-lg max-w-xl mx-auto">Follow along and watch your player improve.</p>
                  )}
                </div>
              )}

              {/* Compact: horizontal pill tabs above video */}
              {compact && (
                <div className="hidden md:block mb-4">
                  <h3 className="text-3xl font-black text-navy mb-3">What&apos;s Inside</h3>
                  <div className="flex flex-wrap gap-2">
                  {TABS.map((t, i) => (
                    <button
                      key={t.label}
                      onClick={() => setActive(i)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border-2 ${
                        active === i
                          ? "border-red bg-red/5 text-navy"
                          : "border-gray-200 text-gray-500 hover:border-gray-300"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                  </div>
                </div>
              )}
              <div className="aspect-video rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(15,49,84,0.12)] relative">
                {tab.mp4 ? (
                  <video
                    key={tab.label}
                    src={tab.mp4}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <>
                    <iframe
                      key={tab.videoId + tab.start}
                      src={`https://www.youtube.com/embed/${tab.videoId}?rel=0&autoplay=1&mute=1&loop=1&start=${tab.start}&end=${tab.end}&playlist=${tab.videoId}&modestbranding=1&controls=0&showinfo=0&disablekb=1&iv_load_policy=3`}
                      title={tab.label}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    {/* Transparent overlay to block YouTube link clicks */}
                    <div className="absolute inset-0" />
                  </>
                )}
              </div>
              {/* CTA */}
              {!hideCta && (
                <div className="text-center mt-8">
                  <Link
                    href="/free-soccer-drills-for-kids"
                    className="bg-red hover:bg-red-dark text-white px-10 py-4 rounded-full font-bold text-lg transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(220,55,62,0.35)] hover:shadow-[0_6px_25px_rgba(220,55,62,0.45)] inline-flex items-center gap-2"
                  >
                    Get the Free 7-Day Plan &rarr;
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
