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
      <p>Welcome to Anytime Soccer Training! We&rsquo;re glad to have your team on board.</p>
      <p>Below is your onboarding checklist. Work through the steps one at a time, click <strong>Next</strong> to move on, and skip anything you&rsquo;ve already completed.</p>
      <p>Once everything&rsquo;s done, please email Megan to let her know.</p>
      <p>Here&rsquo;s what&rsquo;s next:</p>
    `,
    checklist: [
      'Take the Coach Engagement Survey',
      'Create your account and add player profiles',
      'Create your team inside the app',
      'Reply to Megan with your team name',
      'Let Megan know once parents have been informed',
      "We'll invite your parents to join the team",
      "We'll send you and your parents helpful getting-started information",
      'Neil will give you a call to walk through homework and other team features',
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
