'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { META_PIXEL_ID, PIXEL_EXCLUDED_PREFIXES, trackPageView } from '@/lib/metaPixel';

/**
 * Loads the Meta pixel site-wide. The snippet records the first PageView
 * itself; client-side navigations never reload the page, so each later route
 * change is recorded here.
 */
export default function MetaPixel() {
  const pathname = usePathname() || '/';
  const excluded = PIXEL_EXCLUDED_PREFIXES.some((p) => pathname.startsWith(p));
  const first = useRef(true);

  useEffect(() => {
    if (excluded) return;
    if (first.current) {
      first.current = false;
      return;
    }
    trackPageView();
  }, [pathname, excluded]);

  if (excluded) return null;

  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}
    </Script>
  );
}
