"use client";

import { useState } from "react";
import Link from "next/link";

const TABS = [
  { label: "Ball Mastery", videoId: "qL5twf5dycE", start: 28, end: 58, mp4: "https://player.vimeo.com/progressive_redirect/playback/1169251911/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&log_user=0&signature=454345d4a02d6620937239318c150798b6cf0e75d2903f30b26c1c4137b20693" },
  { label: "Dribbling", videoId: "jKlUqKMDrK0", start: 56, end: 86, mp4: "https://player.vimeo.com/progressive_redirect/playback/1169251905/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&log_user=0&signature=ee829d62eed3d0045bd4b11fc2ed7f144fa87439124fb5870a3db4c757dbed55" },
  { label: "Juggling", videoId: "89WWaQ46OcE", start: 33, end: 63, mp4: "https://player.vimeo.com/progressive_redirect/playback/1169251894/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&log_user=0&signature=feae5ad2df7c4f5414d2e19c076b147e83708023db78c3184f4131122bb9c675" },
  { label: "Passing", videoId: "VITiT66kqb4", start: 51, end: 81, mp4: "https://player.vimeo.com/progressive_redirect/playback/1169251868/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&log_user=0&signature=f4368d3f829c7e85e3250c6f4c27a1d1e827fe24261c1b6f59f031ae13b2841d" },
  { label: "1v1", videoId: "4cDchwSw1Ig", start: 109, end: 139, mp4: "https://player.vimeo.com/progressive_redirect/playback/1169251839/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&log_user=0&signature=d830cba85f2636bc209aaca55ac8d7a5a30e6900934b27162223c7e9b497a829" },
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
    <section className="pt-0 pb-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-[0_4px_20px_rgba(15,49,84,0.08)]">
          {/* Mobile: heading + 2-col grid tabs */}
          <div className="md:hidden mb-6">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-extrabold text-navy mb-3">
                Get Your Free <span className="text-red">7-Day Training Plan</span>
              </h2>
              <p className="text-gray text-lg max-w-xl mx-auto">
                One week. Seven skills. Follow along and watch your player improve.
              </p>
            </div>
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
                  <span className={`font-bold text-sm ${active === i ? "text-navy" : "text-gray"}`}>
                    {t.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Layout: sidebar tabs + (heading + video), centered */}
          <div className="flex flex-col md:flex-row gap-6 items-center justify-center max-w-5xl mx-auto">
            {/* Left - Vertical Tab List (desktop only) */}
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

            {/* Right - Heading + Video Player */}
            <div className="flex-1 w-full max-w-[680px]">
              <div className="text-center mb-6 hidden md:block">
                <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-3">
                  Get Your Free <span className="text-red">7-Day Training Plan</span>
                </h2>
                <p className="text-gray text-lg max-w-xl mx-auto">
                  One week. Seven skills. Follow along and watch your player improve.
                </p>
              </div>
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
              <div className="text-center mt-8">
                <Link
                  href="/free-soccer-drills-for-kids"
                  className="bg-red hover:bg-red-dark text-white px-10 py-4 rounded-full font-bold text-lg transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(220,55,62,0.35)] hover:shadow-[0_6px_25px_rgba(220,55,62,0.45)] inline-flex items-center gap-2"
                >
                  Get the Free 7-Day Plan &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
