/**
 * The lead magnets that used to run on Go High Level.
 *
 * Keyed by the GHL form id, because that id is what is actually embedded in the
 * page content. Stripping the embeds by id means the twelve pages themselves
 * need no editing — several of them live inside `pages.json` as blobs of HTML,
 * and hand-editing those is how a stray unclosed tag gets shipped.
 *
 * `sequence` is the key the backend files a signup under. A sequence with no
 * emails yet is harmless: the person is stored and nothing sends, so the forms
 * can move off GHL before the copy for each one exists.
 */

export type LeadMagnet = {
  sequence: string;
  label: string;
  heading: string;
  button: string;
};

export const LEAD_MAGNETS: Record<string, LeadMagnet> = {
  '0TjPLWqKFRzizOBb2tSu': {
    sequence: '30-day-plan',
    label: 'Free 30-Day Training Plan',
    heading: 'Get the free 30-day plan',
    button: 'Send It To Me',
  },
  lo6FcFawUsELKVA34oTo: {
    sequence: 'youtube-drills',
    label: '100 YouTube Drills by Age Group',
    heading: 'Get the 100 drills library',
    button: 'Send It To Me',
  },
  V3lq2xI6NRyCJ1OKrcMn: {
    sequence: 'must-have-guide',
    label: 'Must-Have Guide for Serious Soccer Parents',
    heading: 'Get the guide',
    button: 'Send Me The Guide',
  },
  dYaeB8CwTNYBzrvFnbtJ: {
    sequence: 'parent-trainers-playbook',
    label: "The Parent Trainer's Playbook",
    heading: 'Get the playbook',
    button: 'Send Me The Playbook',
  },
  PBQoqJ2hu9bTe5DlRxix: {
    sequence: '20-questions',
    label: '20 Questions Every Parent Should Ask',
    heading: 'Get the 20 questions',
    button: 'Send Me The Questions',
  },
  '37mvJV2K36eg9sr81JJI': {
    sequence: 'monopoly-ebook',
    label: 'Monopoly: Issues Facing Youth Soccer',
    heading: 'Get the ebook',
    button: 'Send Me The Ebook',
  },
  iG0xWqCUGEXZAc4v7MKO: {
    sequence: 'rec-coach-superhero',
    label: 'Become a Rec Coach Superhero',
    heading: 'Get the coaching guide',
    button: 'Send Me The Guide',
  },
  yLNAlo4U2OMrW3ROvWzU: {
    sequence: 'guest-playing',
    label: 'Everything About Guest Playing',
    heading: 'Get the guest playing guide',
    button: 'Send Me The Guide',
  },
  OTvffXk2hbEzs6Q66bMk: {
    sequence: 'player-cards',
    label: 'Everything About Player Cards',
    heading: 'Get the player cards guide',
    button: 'Send Me The Guide',
  },
  HC9dzAikGTQ7mAXjDCZ3: {
    sequence: 'most-important-skill',
    label: 'The Most Important Skill in Youth Soccer',
    heading: 'Get the free breakdown',
    button: 'Send It To Me',
  },
  BnJ7M4slBaT4mAqId28b: {
    sequence: 'coach-contact',
    label: 'Coach Contact Information',
    heading: 'Send your details',
    button: 'Send',
  },
};

/**
 * Swap every GHL embed in a block of page HTML for an empty slot.
 *
 * Done to the markup before it reaches the browser rather than to the live DOM,
 * so the LeadConnector iframe is never requested at all — no flash of the old
 * form, and no request to a service we are leaving.
 *
 * An unrecognised form id is left alone on purpose. Silently deleting a form
 * nobody mapped would lose leads without anything to show for it.
 */
export function replaceLeadForms(html: string): string {
  if (!html) return html;

  // The whole embed, whichever attribute order it was pasted in.
  const iframe = /<iframe\b[^>]*\bsrc="https?:\/\/api\.leadconnectorhq\.com\/widget\/form\/([A-Za-z0-9]+)"[^>]*>\s*<\/iframe>/gi;

  let out = html.replace(iframe, (match, id: string) =>
    LEAD_MAGNETS[id] ? `<div data-lead-form="${id}"></div>` : match
  );

  // The resize helper only ever existed to serve those iframes.
  out = out.replace(/<script\b[^>]*\bsrc="https?:\/\/link\.msgsndr\.com\/js\/form_embed\.js"[^>]*>\s*<\/script>/gi, '');

  return out;
}
