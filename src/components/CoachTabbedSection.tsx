"use client";

import { useState } from "react";

const features = [
  {
    icon: "\u{1F3AF}",
    title: "Create Teams",
    description: "Set up your squad in seconds",
    video: "https://vz-61d41acf-acf.b-cdn.net/142b3f7d-68fc-47fb-b4b7-6e92c6e5210e/play_720p.mp4",
  },
  {
    icon: "\u{1F4CB}",
    title: "Build Your Roster",
    description: "Add players and manage your lineup",
    video: "https://vz-61d41acf-acf.b-cdn.net/b55cc896-5b9e-4c67-bf4d-6ae0adeb0c67/play_720p.mp4",
  },
  {
    icon: "\u{1F4DA}",
    title: "Assign Homework",
    description: "Send structured training to every player",
    video: "https://vz-61d41acf-acf.b-cdn.net/a98fa1aa-d9d8-48a8-ac35-f6258d42f9a2/play_720p.mp4",
  },
  {
    icon: "\u{1F3C6}",
    title: "Create Competitions",
    description: "Drive friendly competition across your team",
    video: "https://vz-61d41acf-acf.b-cdn.net/2b5ab4b9-a4f1-4e9d-ace0-0368bf5ba1a6/play_720p.mp4",
  },
  {
    icon: "\u{1F4CA}",
    title: "Track Progress",
    description: "See every completed session in real time",
    video: "https://vz-61d41acf-acf.b-cdn.net/1ba61fe3-1e41-4850-8d76-8f315dfbd181/play_720p.mp4",
  },
  {
    icon: "\u{1F4B0}",
    title: "Raise Money",
    description: "Fund your team through training subscriptions",
    video: "https://vz-61d41acf-acf.b-cdn.net/3ea9d24d-2b9f-4956-aea3-dc432ea05cf3/play_720p.mp4",
  },
];

export default function CoachTabbedSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="pt-0 pb-10 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-[0_4px_20px_rgba(15,49,84,0.08)]">
          <div className="text-center mb-10">
<h2 className="text-[clamp(24px,4vw,36px)] font-extrabold text-navy leading-tight max-w-3xl mx-auto uppercase tracking-tight">
              Practice Ends. Their<br /><span className="text-red">Development Shouldn't.</span>
            </h2>
            <p className="text-lg text-[#64748b] mt-4 max-w-2xl mx-auto">
              Give every player structured homework, real accountability, and a reason to train.
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
                      : "bg-[#f5f7fa] text-navy border-transparent hover:border-navy/20"
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
            <div>
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
              <div className="text-center mt-6">
                <a
                  href="/team-demo-request-anytime-soccer-training"
                  className="bg-red hover:bg-red-dark text-white px-8 py-4 rounded-full font-bold text-base transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(220,55,62,0.35)] hover:shadow-[0_6px_25px_rgba(220,55,62,0.45)] inline-flex items-center gap-2"
                >
                  Request Team Demo &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
