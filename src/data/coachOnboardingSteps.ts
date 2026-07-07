export type CoachOnboardingSubStep = {
  title: string;
  description: string;
  videoHref?: string;
  moreInfoHref?: string;
};

export type CoachOnboardingStep = {
  title: string;
  body: string;
  checklist?: string[];
  subSteps?: CoachOnboardingSubStep[];
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
      <p><strong style="color:#DC373E;">Action Required:</strong> Complete the survey.</p>
      <p>We&rsquo;ve distilled what drives player participation into <strong>10 key coaching actions</strong> &mdash; each takes about a minute. Your survey tells us which ones you plan to use, so we can set you up to execute on every one.</p>
    `,
    ctaLabel: 'Complete Your Coaching Plan Survey',
    ctaHref: 'https://www.anytime-soccer.com/my-coaching-plan',
  },
  {
    title: 'Create Your Account',
    body: `
      <p><strong style="color:#DC373E;">Action Required:</strong> Create your account and add player profiles.</p>
    `,
    subSteps: [
      {
        title: 'Go to anytime-soccer.com & Join for Free',
        description: 'Visit anytime-soccer.com and click "Join for Free" to create your account.',
        videoHref: 'https://youtu.be/Vd2IkI3bQdM?si=urfwji2FLhUMYpGH',
        moreInfoHref: 'https://www.anytime-soccer.com/how-to-create-your-anytime-soccer-training-account?utm_source=email&utm_medium=email%20marketing',
      },
      {
        title: 'Enter Your Team Code (Optional)',
        description: "Megan should have emailed you your team code — enter it during signup. No code? No problem, you can skip this step and join a team later.",
        moreInfoHref: 'https://www.anytime-soccer.com/applying-team-code-to-existing-account?utm_source=email&utm_medium=email%20marketing',
      },
      {
        title: 'Verify Your Email',
        description: 'Open the Welcome Email and click "Verify Address." Don\'t see it? Check your spam or junk folder!',
      },
      {
        title: 'Log In & Start Training',
        description: "Log in with Single Sign-On using your email and password. You're all set!",
      },
      {
        title: 'Sign In to Your Account',
        description: 'Go to anytime-soccer.com and sign in with your email and password.',
      },
      {
        title: 'Click "Add Profile"',
        description: 'From your account dashboard, click the "Add Profile" button to create a new player profile.',
        videoHref: 'https://youtu.be/oE_GsRgfEdA?si=8RqaXFv_LKxXIXNY',
        moreInfoHref: 'https://www.anytime-soccer.com/adding-an-anytime-soccer-training-player-profile?utm_source=email&utm_medium=email%20marketing',
      },
      {
        title: 'Enter Player Information',
        description: "Fill out the player's name, age, and other details. You can add up to 4 player profiles per account.",
      },
      {
        title: 'Use the Same Contact Email',
        description: 'You can use the same contact email for all player profiles — no need for separate email addresses. Parents: only create profiles for your own children.',
      },
      {
        title: 'Save Your Profile',
        description: 'Click "Save" to complete the profile. Your new player is now ready to join a team and start training! Coaches: create profiles for yourself and your own children only — not for other players on the team.',
      },
    ],
  },
];
