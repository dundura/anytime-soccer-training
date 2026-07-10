export type CoachOnboardingSubStep = {
  title: string;
  description?: string;
  videoHref?: string;
  moreInfoHref?: string;
  sectionHeading?: string;
};

export type CoachOnboardingStep = {
  title: string;
  body: string;
  checklist?: string[];
  subSteps?: CoachOnboardingSubStep[];
  ctaLabel?: string;
  ctaHref?: string;
  videoHref?: string;
  moreInfoHref?: string;
  hint?: string;
};

export const COACH_ONBOARDING_STEPS: CoachOnboardingStep[] = [
  {
    title: 'Book a Demo',
    body: `
      <p>If you haven&rsquo;t booked a demo yet, please book a time &mdash; it&rsquo;s a quick 20-minute Zoom call.</p>
      <p>Already booked? Great job &mdash; move on to the next step.</p>
      <div style="background:#eff6ff;border-radius:8px;padding:14px 16px;margin:16px 0;">
        <p style="margin:0;"><strong>Renewing member?</strong> No need to rebook &mdash; we&rsquo;ll give you a call during onboarding to walk through the new features instead.</p>
      </div>
    `,
    ctaLabel: 'Book Demo',
    ctaHref: 'https://www.anytime-soccer.com/team-demo-request-anytime-soccer-training',
  },
  {
    title: 'Send Us Your Roster',
    body: `
      <div style="background:#fef2f2;border-radius:8px;padding:14px 16px;margin-bottom:16px;">
        <p style="margin:0;"><strong style="color:#DC373E;">Action Required:</strong> Download a copy of the roster template below, fill it in, and email it back to <strong>Megan Chambers</strong> as an Excel file.</p>
      </div>
      <p>We&rsquo;ll use the player names and emails to invite parents &mdash; <strong>but we don&rsquo;t send any information to parents until you confirm you&rsquo;ve notified them.</strong></p>
      <div style="background:#f8fafc;border-left:4px solid #DC373E;border-radius:8px;padding:14px 16px;margin:16px 0;">
        <p style="margin:0;"><strong>Roster not finalized?</strong> No problem &mdash; send what you have and add the rest later.</p>
      </div>
    `,
    ctaLabel: 'Roster Template',
    ctaHref: 'https://drive.google.com/drive/u/1/folders/1UPIjsWN0pkbryFxMselsTOs3Gs2voNqa',
    hint: "Want to onboard without a roster at all? Email megan@anytime-soccer.com, and we'll send you a custom link with the set-up instructions for your team.",
  },
  {
    title: 'Pay Your Invoice',
    body: `
      <div style="background:#fef2f2;border-radius:8px;padding:14px 16px;margin-bottom:16px;">
        <p style="margin:0;"><strong style="color:#DC373E;">Action Required:</strong> <strong style="color:#0F3154;">Pay invoice online.</strong></p>
      </div>
      <p>Once we receive your roster, we&rsquo;ll generate your invoice and send it via Stripe. As soon as it&rsquo;s paid, onboarding begins &mdash; starting with the <strong>Coaching Plan Survey</strong>.</p>
      <p><strong>Parents don&rsquo;t pay anything.</strong> Each player is given a code that gives them full access to the program for 365 days.</p>
    `,
  },
  {
    title: 'Coaching Plan Survey',
    body: `
      <div style="background:#fef2f2;border-radius:8px;padding:14px 16px;margin-bottom:16px;">
        <p style="margin:0;"><strong style="color:#DC373E;">Action Required:</strong> <strong style="color:#0F3154;">Complete the survey.</strong></p>
      </div>
      <p>We&rsquo;ve distilled what drives player participation into <strong>10 key coaching actions</strong> &mdash; each takes about a minute.</p>
      <p>Your survey tells us which ones you plan to use, so we can set you up to execute on every one.</p>
    `,
    ctaLabel: 'Complete Your Coaching Plan Survey',
    ctaHref: 'https://www.anytime-soccer.com/my-coaching-plan',
  },
  {
    title: 'Create Your Account',
    body: `
      <div style="background:#fef2f2;border-radius:8px;padding:14px 16px;margin-bottom:16px;">
        <p style="margin:0;"><strong style="color:#DC373E;">Action Required:</strong> <strong style="color:#0F3154;">Create your account and add profiles.</strong></p>
      </div>
      <p>Click the How To links below for detailed instructions.</p>
    `,
    subSteps: [
      {
        title: 'Go to anytime-soccer.com & Join for Free',
        videoHref: 'https://youtu.be/Vd2IkI3bQdM?si=urfwji2FLhUMYpGH',
        moreInfoHref: 'https://www.anytime-soccer.com/how-to-create-your-anytime-soccer-training-account?utm_source=email&utm_medium=email%20marketing',
        sectionHeading: 'Create Account',
      },
      {
        title: 'Enter Your Team Code',
        description: "If you didn't receive your team code, email megan@anytime-soccer.com.",
        moreInfoHref: 'https://www.anytime-soccer.com/applying-team-code-to-existing-account?utm_source=email&utm_medium=email%20marketing',
      },
      {
        title: 'Verify Your Email',
      },
      {
        title: 'Sign In to Your Account',
      },
      {
        title: 'Click "Add Profile"',
        description: 'Add a profile for yourself and your children (not team). Remember: you don\'t create profiles for the players on your team — each parent has their own account.',
        videoHref: 'https://youtu.be/oE_GsRgfEdA?si=8RqaXFv_LKxXIXNY',
        moreInfoHref: 'https://www.anytime-soccer.com/adding-an-anytime-soccer-training-player-profile?utm_source=email&utm_medium=email%20marketing',
        sectionHeading: 'Add Profiles',
      },
      {
        title: 'Contact Emails',
        description: 'You can use the same contact email for all player profiles, or different ones. Parents: only create profiles for your own children.',
      },
    ],
  },
  {
    title: 'Create Your Team',
    body: `
      <div style="background:#fef2f2;border-radius:8px;padding:14px 16px;margin-bottom:16px;">
        <p style="margin:0;"><strong style="color:#DC373E;">Action Required:</strong> <strong style="color:#0F3154;">Create your team using the exact team name given to parents.</strong></p>
      </div>
    `,
    videoHref: 'https://youtu.be/_LTtpT885cM?si=5xVusdRdi7Nxjcxa',
    moreInfoHref: 'https://www.anytime-soccer.com/creating-an-anytime-soccer-training-team?utm_source=email&utm_medium=email%20marketing',
    subSteps: [
      {
        title: 'Log In and Choose Your Coach’s Profile',
      },
      {
        title: 'Click MY TEAMS',
        description: "One thing to avoid: please don't change your team name during onboarding. This is what parents will search for to find and join your team.",
      },
      {
        title: 'Click CREATE TEAM',
      },
      {
        title: 'Complete the Form',
      },
      {
        title: 'Add your team code to the team code field in the New Player tab (no need if you paid inside the app)',
        sectionHeading: 'Self Onboarding',
      },
      {
        title: "Add your team's parent emails",
      },
      {
        title: 'Invite everyone through the app',
      },
    ],
  },
  {
    title: 'Notify Parents',
    body: `
      <div style="background:#fef2f2;border-radius:8px;padding:14px 16px;margin-bottom:16px;">
        <p style="margin:0;"><strong style="color:#DC373E;">Action Required:</strong> <strong style="color:#0F3154;">Send parents the introduction email using our template.</strong></p>
      </div>
      <p>Please download the template linked below to notify parents. You&rsquo;re welcome to edit it as needed to reflect your name, club details, or program specifics before sending.</p>
    `,
    ctaLabel: 'Download the Parent Welcome Template',
    ctaHref: 'https://docs.google.com/document/d/1VAVT_sHrtvvb1rUbuNX4muqUthq1Tgn0/edit?tab=t.0',
  },
  {
    title: 'Notify Megan',
    body: `
      <div style="background:#fef2f2;border-radius:8px;padding:14px 16px;margin-bottom:16px;">
        <p style="margin:0;"><strong style="color:#DC373E;">Action Required:</strong> <strong style="color:#0F3154;">Reply to Megan and confirm parents have been informed.</strong></p>
      </div>
    `,
    subSteps: [
      {
        title: 'Reply to Megan with your team name',
        description: 'Use the exact team name you created in the app, and don’t change it during onboarding.',
      },
      {
        title: 'Let Megan know once parents have been informed',
        description: "We'll begin onboarding within 48 hours.",
      },
    ],
  },
  {
    title: "You're All Set!",
    body: `
      <p>You&rsquo;re all set! Here&rsquo;s what to expect next:</p>
    `,
    checklist: [
      "We'll invite your parents to join the team",
      "We'll send you and your parents helpful getting-started information",
      'Neil will give you a call to walk through homework and other team features',
    ],
  },
  {
    title: 'Renewing Members',
    body: `
      <p>We&rsquo;re excited to have you back. We&rsquo;ve made updates to make managing your team easier and get your players more touches at home.</p>
      <div style="background:#fef2f2;border-radius:8px;padding:14px 16px;margin:16px 0;">
        <p style="margin:0;"><strong style="color:#DC373E;">Action Required:</strong> <strong style="color:#0F3154;">Complete your roster update and send parent notifications.</strong></p>
      </div>
      <p>You don&rsquo;t need to book a demo &mdash; we&rsquo;ll give you a call during onboarding to walk through anything new since last season.</p>
    `,
    subSteps: [
      {
        title: 'Submit your updated roster to Megan',
        moreInfoHref: 'https://drive.google.com/drive/u/1/folders/1UPIjsWN0pkbryFxMselsTOs3Gs2voNqa',
        sectionHeading: 'Roster Update',
      },
      {
        title: "Pay your invoice (we'll send it via Stripe)",
      },
      {
        title: 'Remove non-returning players from your roster',
        description: 'It\'s a quick one-minute task. Go to your roster, click the player\'s name, then click "Remove from Team."',
      },
      {
        title: 'Send parents your intro email',
        moreInfoHref: 'https://docs.google.com/document/d/1VAVT_sHrtvvb1rUbuNX4muqUthq1Tgn0/edit',
        sectionHeading: 'Send Notifications',
      },
      {
        title: 'Confirm with Megan once parents are notified',
        description: 'Email her at megan@anytime-soccer.com.',
      },
    ],
    hint: "That's it — Megan will follow up. Looking forward to the season! Questions? Email megan@anytime-soccer.com.",
  },
];
