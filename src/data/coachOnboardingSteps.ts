export type CoachOnboardingStep = {
  title: string;
  body: string;
  checklist?: string[];
  ctaLabel?: string;
  ctaHref?: string;
  hint?: string;
};

export const COACH_ONBOARDING_STEPS: CoachOnboardingStep[] = [
  {
    title: 'Send Us Your Roster',
    body: `
      <p><strong style="color:#DC373E;">Action Required:</strong> Download a copy of the roster template below, fill it in, and email it back to <strong>Megan Chambers</strong> as an Excel file.</p>
      <p>We&rsquo;ll use the player names and emails to invite parents &mdash; <strong>but we don&rsquo;t send any information to parents until you confirm you&rsquo;ve notified them.</strong></p>
      <div style="background:#f8fafc;border-left:4px solid #DC373E;border-radius:8px;padding:14px 16px;margin:16px 0;">
        <p style="margin:0;"><strong>Roster not finalized?</strong> No problem &mdash; send what you have and add the rest later.</p>
      </div>
    `,
    ctaLabel: 'Roster Template',
    ctaHref: 'https://drive.google.com/drive/u/1/folders/1UPIjsWN0pkbryFxMselsTOs3Gs2voNqa',
    hint: "Want to onboard without a roster at all? Just email Megan letting her know, and we'll get started.",
  },
  {
    title: 'Pay Your Invoice',
    body: `
      <p><strong style="color:#DC373E;">Action Required:</strong> Pay invoice online.</p>
      <p>Once we receive your roster, we&rsquo;ll generate your invoice and send it via Stripe. As soon as it&rsquo;s paid, onboarding begins &mdash; starting with the <strong>Coaching Plan Survey</strong>.</p>
      <p><strong>Parents don&rsquo;t pay anything.</strong> Each player is given a code that gives them full access to the program for 365 days.</p>
    `,
  },
  {
    title: 'Coaching Plan Survey',
    body: `
      <p>Before we get your team fully set up, there&rsquo;s one quick step to complete.</p>
      <p>Over the years, we&rsquo;ve studied what actually drives player participation and distilled it down to <strong>10 key coaching actions</strong> that take around one minute each for the coach to complete.</p>
      <p>Your Coaching Plan Survey tells us which ones you plan to use &mdash; and from there, our team will make sure you&rsquo;re fully equipped to execute on every single one.</p>
    `,
    ctaLabel: 'Complete Your Coaching Plan Survey',
    ctaHref: 'https://www.anytime-soccer.com/my-coaching-plan',
  },
];
