/**
 * The lead magnets, and which of them have left Go High Level.
 *
 * Keyed by the GHL form id, because that id is what is actually embedded in the
 * page content. Stripping the embeds by id means the pages themselves need no
 * editing — most of them live inside `pages.json` as blobs of HTML, and
 * hand-editing those is how a stray unclosed tag gets shipped.
 *
 * `live` is the switch, and it is off for everything but the 7-day plan. A
 * magnet only crosses over once its sequence has emails written: taking the GHL
 * form away first captures the signup and then sends them nothing at all, which
 * is worse than leaving it where it was. Flip `live` to true in the same change
 * that adds the emails.
 */

export type LeadMagnet = {
  sequence: string;
  label: string;
  heading: string;
  button: string;
  /** Off until this magnet's sequence actually has emails to send. */
  live: boolean;
};

export const LEAD_MAGNETS: Record<string, LeadMagnet> = {
  '0TjPLWqKFRzizOBb2tSu': {
    sequence: '30-day-plan',
    label: 'Free 30-Day Training Plan',
    heading: 'Get the free 30-day plan',
    button: 'Send It To Me',
    live: false,
  },
  lo6FcFawUsELKVA34oTo: {
    sequence: 'youtube-drills',
    label: '100 YouTube Drills by Age Group',
    heading: 'Get the 100 drills library',
    button: 'Send It To Me',
    live: false,
  },
  V3lq2xI6NRyCJ1OKrcMn: {
    sequence: 'must-have-guide',
    label: 'Must-Have Guide for Serious Soccer Parents',
    heading: 'Get the guide',
    button: 'Send Me The Guide',
    live: false,
  },
  dYaeB8CwTNYBzrvFnbtJ: {
    sequence: 'parent-trainers-playbook',
    label: "The Parent Trainer's Playbook",
    heading: 'Get the playbook',
    button: 'Send Me The Playbook',
    live: false,
  },
  PBQoqJ2hu9bTe5DlRxix: {
    sequence: '20-questions',
    label: '20 Questions Every Parent Should Ask',
    heading: 'Get the 20 questions',
    button: 'Send Me The Questions',
    live: false,
  },
  '37mvJV2K36eg9sr81JJI': {
    sequence: 'monopoly-ebook',
    label: 'Monopoly: Issues Facing Youth Soccer',
    heading: 'Get the ebook',
    button: 'Send Me The Ebook',
    live: false,
  },
  iG0xWqCUGEXZAc4v7MKO: {
    sequence: 'rec-coach-superhero',
    label: 'Become a Rec Coach Superhero',
    heading: 'Get the coaching guide',
    button: 'Send Me The Guide',
    live: false,
  },
  yLNAlo4U2OMrW3ROvWzU: {
    sequence: 'guest-playing',
    label: 'Everything About Guest Playing',
    heading: 'Get the guest playing guide',
    button: 'Send Me The Guide',
    live: false,
  },
  OTvffXk2hbEzs6Q66bMk: {
    sequence: 'player-cards',
    label: 'Everything About Player Cards',
    heading: 'Get the player cards guide',
    button: 'Send Me The Guide',
    live: false,
  },
  HC9dzAikGTQ7mAXjDCZ3: {
    sequence: 'most-important-skill',
    label: 'The Most Important Skill in Youth Soccer',
    heading: 'Get the free breakdown',
    button: 'Send It To Me',
    live: false,
  },
  BnJ7M4slBaT4mAqId28b: {
    sequence: 'coach-contact',
    label: 'Coach Contact Information',
    heading: 'Send your details',
    button: 'Send',
    live: false,
  },
};

/**
 * Swap every GHL embed in a block of page HTML for an empty slot.
 *
 * Done to the markup before it reaches the browser rather than to the live DOM,
 * so the LeadConnector iframe is never requested at all — no flash of the old
 * form, and no request to a service we are leaving.
 *
 * A magnet that is not `live`, and any form id nobody mapped, is left exactly as
 * it was. Removing a form before there is something to send loses the lead with
 * nothing to show for it.
 */
export function replaceLeadForms(html: string): string {
  if (!html) return html;

  // The whole embed, whichever attribute order it was pasted in.
  const iframe = /<iframe\b[^>]*\bsrc="https?:\/\/api\.leadconnectorhq\.com\/widget\/form\/([A-Za-z0-9]+)"[^>]*>\s*<\/iframe>/gi;

  const out = html.replace(iframe, (match, id: string) =>
    LEAD_MAGNETS[id]?.live ? `<div data-lead-form="${id}"></div>` : match
  );

  // The resize helper stays while any GHL embed remains, since removing it
  // leaves the surviving iframes stuck at a height that does not match their
  // content.
  return out;
}
