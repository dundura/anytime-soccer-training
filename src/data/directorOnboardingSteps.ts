import type { CoachOnboardingStep } from './coachOnboardingSteps';

/**
 * Club Director steps — the second audience of the onboarding portal.
 *
 * Deliberately NOT a copy of COACH_ONBOARDING_STEPS. A coach arriving at that
 * flow has already bought and needs a setup checklist. A director arriving here
 * usually has not bought and is deciding, so this leads with cost and structure
 * and only then covers rollout.
 *
 * Two questions drove the content, both from a real enquiry (José, DOC at Storm
 * in Cheney WA, 2026-08-05) — a year-one customer asking how to go from a couple
 * of players to a 220-player club:
 *
 *   1. Season rollover — new teams, new players, players who left. The coach
 *      flow never covers this; it only covers first-time setup.
 *   2. What a club actually pays.
 *
 * Pricing is stated plainly on purpose: it is the number that decides whether a
 * director expands, and burying it just costs everyone an email round-trip.
 */

const BOX = 'background:#eff6ff;border:1px solid #dbeafe;border-radius:12px;padding:20px;margin:16px 0;';
const GREEN = 'background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:14px 18px;margin:16px 0;';

export const DIRECTOR_ONBOARDING_STEPS: CoachOnboardingStep[] = [
  {
    // Titled with the headline itself rather than "About …", so the page shows
    // one heading instead of a title stacked on top of a near-identical line.
    title: 'The Complete Soccer Training Platform for Your Club',
    body: `
      <p>Some of the benefits that come with your subscription:</p>
      <div style="${BOX}">
        ${[
          'Follow-along sessions for every skill',
          'Assign homework folders or recurring plans &mdash; customizable for individual players',
          'Create contests and track player progress',
          'Built for all ages, all skill levels',
          'Unlimited teams, easy roster management',
        ].map((item, i, all) => `
        <div style="display:flex;gap:12px;align-items:flex-start;${i < all.length - 1 ? 'margin-bottom:14px;' : ''}">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:#DC373E;color:#fff;font-size:13px;font-weight:700;margin-top:2px;">&#10003;</span>
          <p style="margin:0;">${item}</p>
        </div>`).join('')}
      </div>
    `,
  },
  {
    title: 'How Pricing Works',
    body: `
      <p style="color:#DC373E;font-weight:800;text-transform:uppercase;letter-spacing:0.04em;font-size:13px;margin:0 0 10px;">The Rate</p>
      <p>Pricing is per player, per year &mdash; and it drops once you reach 75 players (5 teams).</p>
      <div style="${BOX}">
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">1</span>
          <p style="margin:6px 0 0;"><strong>$10 per player, per year</strong> &mdash; standard rate.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">2</span>
          <p style="margin:6px 0 0;"><strong>$8 per player, per year</strong> &mdash; once you have 75 players or more.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">3</span>
          <p style="margin:6px 0 0;"><strong>One free coach account</strong> &mdash; per team.</p>
        </div>
      </div>
    `,
  },
  {
    title: 'Payment',
    body: `
      <div style="${BOX}">
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">1</span>
          <div style="margin:6px 0 0;">
            <p style="margin:0;"><strong>Submit your rosters</strong> using our template.</p>
            <ul style="margin:6px 0 0;padding-left:20px;color:#475569;font-size:14px;list-style:disc outside;">
              <li style="margin:0;display:list-item;">Coaches can submit partial rosters, and each coach can submit at their own pace.</li>
            </ul>
          </div>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">2</span>
          <p style="margin:6px 0 0;"><strong>Pay the invoice we send for your first 75 players.</strong></p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">3</span>
          <div style="margin:6px 0 0;">
            <p style="margin:0;"><strong>That covers your first 75 players &mdash; done.</strong></p>
            <ul style="margin:6px 0 0;padding-left:20px;color:#475569;font-size:14px;list-style:disc outside;">
              <li style="margin:0;display:list-item;">Only from player 76 onward do we charge your card, $8 each as they join.</li>
              <li style="margin:4px 0 0;display:list-item;">So you only pay for players who actually use the program.</li>
            </ul>
          </div>
        </div>
      </div>
    `,
  },
  {
    title: 'How Onboarding Works',
    body: `
      <p>Each of your coaches goes through the same short sequence.</p>
      <div style="${BOX}">
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">1</span>
          <div style="margin:6px 0 0;">
            <p style="margin:0;"><strong>Coach joins a 15&ndash;20 minute online demo.</strong></p>
            <ul style="margin:6px 0 0;padding-left:20px;color:#475569;font-size:14px;list-style:disc outside;">
              <li style="margin:0;display:list-item;">Group demos available.</li>
            </ul>
          </div>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">2</span>
          <p style="margin:6px 0 0;"><strong>Coach sends us their roster</strong> using our template.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">3</span>
          <p style="margin:6px 0 0;"><strong>Coach creates their team</strong> inside the app.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">4</span>
          <p style="margin:6px 0 0;"><strong>We invite the parents</strong> &mdash; with information to create an account and join their team.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">5</span>
          <p style="margin:6px 0 0;"><strong>Coach assigns homework</strong> and sets up challenges and fun contests.</p>
        </div>
      </div>
      <div style="${GREEN}">
        <p style="margin:0;color:#166534;">We walk your coaches through every step, and support them for as long as they need it.</p>
      </div>
    `,
  },
  {
    title: 'Adding and Removing Players Each Season',
    body: `
      <p>This is the question every club asks in year two, so here it is plainly: <strong>you do not start over each season.</strong></p>
      <div style="${BOX}">
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">1</span>
          <p style="margin:6px 0 0;"><strong>Players who left the club</strong> &mdash; the coach removes them from the team roster. Their account stays theirs; they are simply no longer on your team.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">2</span>
          <p style="margin:6px 0 0;"><strong>Players who stayed</strong> &mdash; nothing to do. They keep their profile, their history and their progress.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">3</span>
          <p style="margin:6px 0 0;"><strong>New players</strong> &mdash; add them the same way you did the first time: send the roster.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">4</span>
          <p style="margin:6px 0 0;"><strong>New teams</strong> &mdash; create in the app the same way as before.</p>
        </div>
      </div>
      <div style="${GREEN}">
        <p style="margin:0 0 6px;color:#166534;"><strong>On billing at renewal:</strong></p>
        <p style="margin:0;color:#166534;">Talk to Megan before the season starts and she will square up the count &mdash; you pay for the players you actually have, not the ones you had last year.</p>
      </div>
    `,
  },
  {
    title: 'Getting Your Coaches Set Up',
    body: `
      <p>Your coaches each run their own team, so each of them needs a few minutes of setup.</p>
      <div style="${BOX}">
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">1</span>
          <p style="margin:6px 0 0;"><strong>Send Megan your team list</strong> &mdash; team names and the coach for each one.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">2</span>
          <p style="margin:6px 0 0;"><strong>Each coach gets their own onboarding</strong> &mdash; the same portal you are in now, pointed at setting up one team.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">3</span>
          <p style="margin:6px 0 0;"><strong>We handle the rosters</strong> &mdash; send them in and we load them, so your coaches are not typing names in one at a time.</p>
        </div>
      </div>
      <p>Coaches do not pay anything and do not need a separate license.</p>
    `,
  },
  {
    title: 'Rolling It Out to Parents',
    body: `
      <p>The clubs that get real use out of this are the ones where parents hear about it from the club, not just from an app.</p>
      <div style="${BOX}">
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">1</span>
          <p style="margin:6px 0 0;"><strong>One club-wide announcement</strong> explaining what it is and that the club is providing it.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">2</span>
          <p style="margin:6px 0 0;"><strong>A getting-started link per team</strong> &mdash; ask Megan and she will send you one for each, ready to forward to parents.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">3</span>
          <p style="margin:6px 0 0;"><strong>Coaches assign the first homework</strong> in week one, so there is something waiting when parents log in.</p>
        </div>
      </div>
      <div style="${GREEN}">
        <p style="margin:0;color:#166534;">That last one matters more than it sounds. An empty account is the fastest way to lose a family in week one.</p>
      </div>
    `,
  },
  {
    title: 'Talk to Megan',
    body: `
      <p>When you are ready to talk numbers for your club, Megan will put together a quote and get your teams created.</p>
      <div style="${GREEN}">
        <p style="margin:0 0 6px;color:#166534;"><strong>Tell her:</strong></p>
        <p style="margin:0;color:#166534;">Your club name, roughly how many teams and players you are looking at, and when your season starts.</p>
      </div>
      <p>She will confirm your rate, set up the teams and get your coaches their onboarding links.</p>
    `,
    ctaLabel: 'Email Megan',
    ctaHref: 'mailto:megan@anytime-soccer.com?subject=Club%20enquiry',
  },
];
