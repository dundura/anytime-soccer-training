export type CoachOnboardingStep = {
  title: string;
  body: string;
  checklist?: string[];
  ctaLabel?: string;
  ctaHref?: string;
};

export const COACH_ONBOARDING_STEPS: CoachOnboardingStep[] = [
  {
    title: 'Send Us Your Roster',
    body: `
      <p>Download a copy of the roster template below, fill it in, and email it back to <strong>Megan Chambers</strong> as an Excel file.</p>
      <p>We&rsquo;ll use the player names and emails to invite parents &mdash; but we don&rsquo;t send any information to parents until you confirm you&rsquo;ve notified them.</p>
      <p>Don&rsquo;t have your full roster finalized yet? No problem &mdash; send over what you have and we&rsquo;ll get you started. You can always add the rest of your players later.</p>
      <p>Want to onboard without a roster at all? Just email Megan letting her know, and we&rsquo;ll get started.</p>
    `,
    ctaLabel: 'Roster Template',
    ctaHref: 'https://drive.google.com/drive/u/1/folders/1UPIjsWN0pkbryFxMselsTOs3Gs2voNqa',
  },
  {
    title: 'Pay Your Invoice',
    body: `
      <p>Once we receive your roster, we&rsquo;ll generate your invoice. As soon as it&rsquo;s paid, onboarding begins &mdash; starting with the Coaching Plan Survey.</p>
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
