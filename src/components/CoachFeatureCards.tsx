'use client';

import { useState } from 'react';

const features = [
  {
    icon: '🎯',
    title: 'Create Teams',
    description: 'Set up your squad in seconds',
    video: 'https://player.vimeo.com/progressive_redirect/playback/1169303012/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&log_user=0&signature=c734dc10fea1c8c23648cdce45060f9fa4a5c3b58d91e3d1166bea1336d6c6eb',
  },
  {
    icon: '📋',
    title: 'Build Your Roster',
    description: 'Add players and manage your lineup',
    video: 'https://player.vimeo.com/progressive_redirect/playback/1169302955/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&log_user=0&signature=397999004d244a61df927c2ecc56fbefcfb40b2e0b9ca3b6436cb16925f94dd4',
  },
  {
    icon: '📚',
    title: 'Assign Homework',
    description: 'Send structured training to every player',
    video: 'https://player.vimeo.com/progressive_redirect/playback/1169302980/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&log_user=0&signature=1538e99ab9202f4db963fdf9c231130c154ac8d11e90bc7e912c7c912881c5c6',
  },
  {
    icon: '🏆',
    title: 'Create Competitions',
    description: 'Drive friendly competition across your team',
    video: 'https://player.vimeo.com/progressive_redirect/playback/1169302955/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&log_user=0&signature=397999004d244a61df927c2ecc56fbefcfb40b2e0b9ca3b6436cb16925f94dd4',
  },
  {
    icon: '📊',
    title: 'Track Progress',
    description: 'See every completed session in real time',
    video: 'https://player.vimeo.com/progressive_redirect/playback/1169302963/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&log_user=0&signature=687134569779f1635d1b4fb59172dc78d33ee3fba58ec743e581f70c887e2957',
  },
  {
    icon: '💰',
    title: 'Raise Money',
    description: 'Fund your team through training subscriptions',
    video: 'https://player.vimeo.com/progressive_redirect/playback/1169302963/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&log_user=0&signature=687134569779f1635d1b4fb59172dc78d33ee3fba58ec743e581f70c887e2957',
  },
];

export default function CoachFeatureCards() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-16 px-5 bg-white">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-[2px] text-red block mb-3">For Clubs and Teams</span>
          <h2 className="text-[clamp(24px,4vw,36px)] font-bold text-navy leading-tight max-w-3xl mx-auto">
            Your Players Are Going Home With <span className="text-red">No Plan</span>
          </h2>
          <p className="text-lg text-[#64748b] mt-4 max-w-2xl mx-auto">
            Give every player structured homework, real accountability, and a reason to train — without adding a single minute to your practice schedule.
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
                    ? 'bg-navy text-white border-navy shadow-[0_4px_20px_rgba(15,49,84,0.2)]'
                    : 'bg-background text-navy border-transparent hover:border-navy/20'
                }`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                  active === i ? 'bg-white/15' : 'bg-white'
                }`}>
                  {feature.icon}
                </div>
                <div>
                  <div className="font-bold text-[15px]">{feature.title}</div>
                  <div className={`text-sm ${active === i ? 'text-white/70' : 'text-[#64748b]'}`}>
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
