/**
 * Meta (Facebook) pixel for paid social ads.
 *
 * The base snippet lives in components/MetaPixel.tsx; this file holds the id
 * and the helpers the signup forms call, so a form never has to know whether
 * the pixel loaded.
 */

export const META_PIXEL_ID = '308944029963011';

// Internal pages. Neil's own visits there would otherwise land in the ad
// audiences as if he were a prospect.
export const PIXEL_EXCLUDED_PREFIXES = ['/console', '/admin'];

type Fbq = (...args: unknown[]) => void;

function fbq(): Fbq | null {
  if (typeof window === 'undefined') return null;
  const f = (window as unknown as { fbq?: Fbq }).fbq;
  return typeof f === 'function' ? f : null;
}

export function trackPageView() {
  fbq()?.('track', 'PageView');
}

/** A signup went through. This is the conversion the ads optimise for. */
export function trackLead(contentName: string) {
  fbq()?.('track', 'Lead', { content_name: contentName });
}

/**
 * The page plus its query string, so utm_source=facebook and friends from an
 * ad link are saved with the signup and ad signups can be told apart.
 */
export function landingPageWithCampaign(): string | null {
  if (typeof window === 'undefined') return null;
  return (window.location.pathname + window.location.search).slice(0, 255);
}
