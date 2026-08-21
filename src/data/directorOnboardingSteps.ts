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
          'Follow-along sessions for every skill and age',
          'Assign homework folders or recurring plans',
          'Create contests and track player progress',
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
      <p>Pricing is per player, per year &mdash; and it drops once you reach 75 players.</p>
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
    title: 'Steps to Get Started',
    body: `
      <div style="${BOX}">
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">1</span>
          <div style="margin:6px 0 0;">
            <p style="margin:0;"><strong>Coaches or club rep submit rosters for each team.</strong></p>
            <ul style="margin:6px 0 0;padding-left:20px;color:#475569;font-size:14px;list-style:disc outside;">
              <li style="margin:0 0 0;display:list-item;">Partial rosters are fine, and coaches can send theirs at different times.</li>
              <li style="margin:4px 0 0;display:list-item;">We use the roster to invite families to the platform.</li>
            </ul>
          </div>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">2</span>
          <div style="margin:6px 0 0;">
            <p style="margin:0;"><strong>Pay the invoice we send for your first two teams.</strong></p>
            <ul style="margin:6px 0 0;padding-left:20px;color:#475569;font-size:14px;list-style:disc outside;">
              <li style="margin:0 0 0;display:list-item;">Additional players &mdash; we charge the card on file once they onboard.</li>
              <li style="margin:4px 0 0;display:list-item;">So you only pay for players who actually use the program.</li>
            </ul>
          </div>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">3</span>
          <div style="margin:6px 0 0;">
            <p style="margin:0;"><strong>Upgrade your players as they join.</strong></p>
            <ul style="margin:6px 0 0;padding-left:20px;color:#475569;font-size:14px;list-style:disc outside;">
              <li style="margin:0 0 0;display:list-item;">We add free access slots to your team.</li>
              <li style="margin:4px 0 0;display:list-item;">The coach applies a slot to each player as they join the team.</li>
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
      <p><strong>You do not start over each season.</strong></p>
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
        <p style="margin:0;color:#166534;">Pay for the 75 slots upfront and we charge the remainder as they join.</p>
      </div>
    `,
  },
  {
    title: 'Talk to Megan',
    body: `
      <p style="color:#DC373E;font-weight:800;text-transform:uppercase;letter-spacing:0.04em;font-size:13px;margin:0 0 10px;">Next Steps</p>
      <div style="${BOX}">
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:14px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:#DC373E;color:#fff;font-size:13px;font-weight:700;margin-top:2px;">&#10003;</span>
          <p style="margin:0;"><strong>Finish below</strong> &mdash; we let Megan know you are interested, and we will be in touch.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:14px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:#DC373E;color:#fff;font-size:13px;font-weight:700;margin-top:2px;">&#10003;</span>
          <p style="margin:0;"><a href="https://www.anytime-soccer.com/team-demo-request-anytime-soccer-training" target="_blank" rel="noopener noreferrer" style="color:#DC373E;font-weight:700;">Book a call</a> &mdash; and we will be in touch.</p>
        </div>
      </div>
    `,
  },
];
