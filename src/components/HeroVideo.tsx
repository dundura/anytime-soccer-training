'use client';

import { useState } from 'react';

export default function HeroVideo() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="block bg-navy rounded-2xl shadow-[0_25px_80px_rgba(15,49,84,0.15)] overflow-hidden relative">
      {playing ? (
        <iframe
          src="https://player.vimeo.com/video/817761649?autoplay=1&title=0&byline=0&portrait=0"
          className="w-full aspect-video"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title="Anytime Soccer Training Demo"
        />
      ) : (
        <button onClick={() => setPlaying(true)} className="w-full cursor-pointer relative block">
          <img
            src="https://vumbnail.com/817761649.jpg"
            alt="Anytime Soccer Training Demo"
            className="w-full aspect-video object-cover"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-red rounded-full flex items-center justify-center text-white text-3xl shadow-[0_8px_30px_rgba(220,55,62,0.5)] hover:scale-110 transition-transform">
            &#9654;
          </div>
        </button>
      )}
    </div>
  );
}
