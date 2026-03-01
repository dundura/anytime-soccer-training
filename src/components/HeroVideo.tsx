'use client';

export default function HeroVideo() {
  return (
    <div className="block bg-navy rounded-2xl shadow-[0_25px_80px_rgba(15,49,84,0.15)] overflow-hidden relative">
      <video
        src="https://player.vimeo.com/progressive_redirect/playback/1169302940/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&log_user=0&signature=d7ec2be5b7f101dc9ca09dc1ce2cf82f8134927a7c7506103375717d7168034b"
        className="w-full aspect-video object-cover"
        autoPlay
        muted
        loop
        playsInline
      />
    </div>
  );
}
