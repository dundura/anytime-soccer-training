'use client';

import { useState, useRef } from 'react';

export default function HeroVideo() {
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // A native <video> rather than Bunny's iframe. Browsers only autoplay a
  // cross-origin iframe under conditions we cannot see or control, and the
  // hero was staying paused; a muted inline <video> is the one autoplay path
  // that is reliable everywhere. It also makes muting a property set instead
  // of a postMessage whose delivery we cannot confirm. Same Bunny file, and
  // the same approach the other video sections on this site already use.
  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    const next = !muted;
    video.muted = next;
    if (!next) video.play().catch(() => {});
    setMuted(next);
  }

  return (
    <div className="block bg-navy rounded-2xl shadow-[0_25px_80px_rgba(15,49,84,0.15)] overflow-hidden relative">
      <video
        ref={videoRef}
        src="https://vz-61d41acf-acf.b-cdn.net/ff1c143e-b567-4262-9a03-30007cbdff31/play_720p.mp4"
        className="w-full aspect-video object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        title="Anytime Soccer Training Demo"
      />
      <button
        onClick={toggleMute}
        className="absolute bottom-4 right-4 w-10 h-10 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-sm"
        aria-label={muted ? 'Unmute' : 'Mute'}
      >
        {muted ? (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728" />
          </svg>
        )}
      </button>
    </div>
  );
}
