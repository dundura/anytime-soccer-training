"use client";

import { useState } from "react";

const features = [
  {
    icon: "\u{1F4CB}",
    title: "Assign Homework",
    description: "Send structured training to every player",
    video: "https://player.vimeo.com/progressive_redirect/playback/1169303012/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&log_user=0&signature=c734dc10fea1c8c23648cdce45060f9fa4a5c3b58d91e3d1166bea1336d6c6eb",
  },
  {
    icon: "\u{1F4CA}",
    title: "Track Progress",
    description: "See every completed session",
    video: "https://player.vimeo.com/progressive_redirect/playback/1169302940/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&log_user=0&signature=d7ec2be5b7f101dc9ca09dc1ce2cf82f8134927a7c7506103375717d7168034b",
  },
  {
    icon: "\u{1F3C6}",
    title: "Team Leaderboard",
    description: "Drive friendly competition",
    video: "https://player.vimeo.com/progressive_redirect/playback/1169303020/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&log_user=0&signature=5f7589b67658329b3c754291c49f3bc76b74ac990c214e0f5c9f5eeb6f15c5cf",
  },
  {
    icon: "\u{1F514}",
    title: "Auto Reminders",
    description: "Keep players on track automatically",
    video: "https://player.vimeo.com/progressive_redirect/playback/1169302955/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&log_user=0&signature=397999004d244a61df927c2ecc56fbefcfb40b2e0b9ca3b6436cb16925f94dd4",
  },
  {
    icon: "\u{1F4C4}",
    title: "Team Reports",
    description: "Full visibility into team activity",
    video: "https://player.vimeo.com/progressive_redirect/playback/1169302963/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&log_user=0&signature=687134569779f1635d1b4fb59172dc78d33ee3fba58ec743e581f70c887e2957",
  },
];

export default function CoachTabbedSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-16 px-5 bg-white">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-[2px] text-red block mb-3">The Problem</span>
          <h2 className="text-[clamp(24px,4vw,36px)] font-bold text-navy leading-tight max-w-3xl mx-auto">
            Your Players Are Going Home With <span className="text-red">No Plan</span>
          </h2>
          <p className="text-lg text-[#64748b] mt-4 max-w-2xl mx-auto">
            Give every player structured homework, real accountability, and a reason to train &mdash; without adding a single minute to your practice schedule.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-8 items-start">
          {/* Feature Cards */}
          <div className="flex flex-col gap-3">
            {features.map((feature, i) => (
              <button
                key={feature.title}
                onClick={() => setActive(i)}
                className={`flex items-center gap-4 text-left px-5 py-4 rounded-xl transition-all cursor-pointer border-2 ${
                  active === i
                    ? "bg-navy text-white border-navy shadow-[0_4px_20px_rgba(15,49,84,0.2)]"
                    : "bg-background text-navy border-transparent hover:border-navy/20"
                }`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                  active === i ? "bg-white/15" : "bg-white"
                }`}>
                  {feature.icon}
                </div>
                <div>
                  <div className="font-bold text-[15px]">{feature.title}</div>
                  <div className={`text-sm ${active === i ? "text-white/70" : "text-[#64748b]"}`}>
                    {feature.description}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Video Player */}
          <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(15,49,84,0.15)] bg-navy">
            <video
              key={features[active].video}
              src={features[active].video}
              className="w-full aspect-video object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </div>
      </div>
    </section>
  );
}
