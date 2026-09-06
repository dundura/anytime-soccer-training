/**
 * Per-partner branding for /partner/<code>.
 *
 * Shared because both halves need it: the page's generateMetadata builds the
 * share card from it on the server, and PartnerLanding renders from it on the
 * client. Keeping one copy is what stops a logo appearing on the page but not
 * in the preview, or the other way round.
 *
 * Keyed by referral code, uppercased. A map rather than a guessed
 * `/partners/${code}.png` path: most partners have no logo, and a filename
 * guess would 404 into a broken image on every one of them.
 *
 * If this grows past a dozen it is worth a logoUrl column on the partner
 * record so it can be set from the Partners tab instead of a deploy.
 */

export const PARTNER_LOGOS: Record<string, string> = {
  BLKSOCCERGROUP: '/partners/BLKSOCCERGROUP.png',
};

/**
 * Where the partner's name points. Their own home, not ours -- somebody who
 * recognises the badge should be able to get back to the group it belongs to.
 */
export const PARTNER_LINKS: Record<string, string> = {
  BLKSOCCERGROUP: 'https://www.facebook.com/groups/blksoccer',
};

/** The 1200x630 card platforms crop toward when the link is shared. */
export const PARTNER_OG_IMAGES: Record<string, string> = {
  BLKSOCCERGROUP: '/partners/BLKSOCCERGROUP-og.png',
};

export type PartnerTheme = {
  panel: string;      // dark panels: the hero, the plans block
  glow: string;       // the soft wash behind the hero
  accent: string;     // small accents ON those dark panels
  brand: string;      // the page's call-to-action colour, on light
  brandDark: string;  // its hover
  ink: string;        // headings and prices on light
};

export const PARTNER_THEMES: Record<string, PartnerTheme> = {
  // Sampled from the shield: red #D00020, green #00A040, gold #F0D010.
  // panel is not pure black on purpose -- the shield has a black outer ring
  // and would lose its silhouette against #000.
  BLKSOCCERGROUP: {
    panel: '#131313',
    glow: 'rgba(0,160,64,0.20)',
    accent: '#F0D010',
    brand: '#D00020',
    brandDark: '#A80019',
    ink: '#131313',
  },
};
