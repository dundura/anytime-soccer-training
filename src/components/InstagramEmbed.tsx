'use client';

import { useEffect } from 'react';

export default function InstagramEmbed({ url }: { url: string }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).instgrm) {
      (window as any).instgrm.Embeds.process();
    } else {
      const script = document.createElement('script');
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <blockquote
      className="instagram-media"
      data-instgrm-permalink={url}
      data-instgrm-version="14"
      style={{
        background: '#FFF',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
        margin: '1px auto',
        maxWidth: 540,
        minWidth: 326,
        padding: 0,
        width: '100%',
      }}
    />
  );
}
