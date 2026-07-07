export type CoachOnboardingStep = {
  title: string;
  body: string;
  checklist?: string[];
  ctaLabel?: string;
  ctaHref?: string;
};

export const COACH_ONBOARDING_STEPS: CoachOnboardingStep[] = [
  {
    title: "Welcome — Here's What's Next",
    body: `
      <p>Thanks for getting your team set up with us &mdash; it&rsquo;s time to get started!</p>
      <p>Our Team Success Manager, Megan, will be reaching out shortly with specific instructions to get you set up. Keep an eye on your email and follow the steps she sends &mdash; they&rsquo;ll be short and easy to act on.</p>
      <p>Already completed a step? No worries &mdash; just skip it. After Megan&rsquo;s email, make sure these things are done:</p>
    `,
    checklist: [
      'Take the Coach Engagement Survey',
      'Create your account (and add profiles)',
      'Create your team (inside the app)',
      'Reply back to Megan with your team name',
      'Let us know that parents have been informed',
    ],
    ctaLabel: 'Download the Parent Welcome Template →',
    ctaHref: 'https://docs.google.com/document/d/1VAVT_sHrtvvb1rUbuNX4muqUthq1Tgn0/edit',
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
