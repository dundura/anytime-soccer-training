export type CoachOnboardingStep = {
  title: string;
  body: string;
  checklist?: string[];
  ctaLabel?: string;
  ctaHref?: string;
  isOverview?: boolean;
};

export const COACH_ONBOARDING_STEPS: CoachOnboardingStep[] = [
  {
    isOverview: true,
    title: "You're In! Let's Get Your Team Rolling",
    body: `
      <p>We&rsquo;re excited to get your team started with Anytime Soccer Training!</p>
      <p>Below are the key steps to the onboarding process. Complete each one, and be sure to email Megan when you&rsquo;re done.</p>
      <p>Work through them one at a time &mdash; click <strong>Next</strong> when you&rsquo;re ready to move on, and skip anything you&rsquo;ve already knocked out.</p>
      <p>Here&rsquo;s what needs to happen:</p>
    `,
    checklist: [
      'Take the Coach Engagement Survey',
      'Create your account (and add profiles)',
      'Create your team (inside the app)',
      'Reply back to Megan with your team name',
      'Let Megan know that parents have been informed',
    ],
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
