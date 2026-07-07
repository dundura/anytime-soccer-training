export type CoachOnboardingStep = {
  title: string;
  body: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export const COACH_ONBOARDING_STEPS: CoachOnboardingStep[] = [
  {
    title: 'Coaching Plan Survey',
    body: `
      <p>Hi Coach,</p>
      <p>Before we get your team fully set up, we have one quick step for you.</p>
      <p>Over the years, we&rsquo;ve studied what actually drives player participation and distilled it down to <strong>10 key coaching actions</strong> that take around one minute each for the coach to complete.</p>
      <p>Your Coaching Plan Survey tells us which ones you plan to use &mdash; and from there, our team will make sure you&rsquo;re fully equipped to execute on every single one.</p>
    `,
    ctaLabel: 'Complete Your Coaching Plan Survey — it takes about 2 minutes',
    ctaHref: 'https://www.anytime-soccer.com/my-coaching-plan',
  },
];
