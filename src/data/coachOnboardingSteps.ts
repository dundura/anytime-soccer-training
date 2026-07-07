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
  hint?: string;
};

export const COACH_ONBOARDING_STEPS: CoachOnboardingStep[] = [
  {
    title: 'Book a Demo',
    body: `
      <p>If you haven&rsquo;t booked a demo yet, please book a time &mdash; it&rsquo;s a quick 20-minute Zoom call.</p>
      <p>Already booked? Great job &mdash; move on to the next step.</p>
      <p><strong>Renewing member?</strong> No need to rebook &mdash; we&rsquo;ll give you a call during onboarding to walk through the new features instead.</p>
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
    hint: "Want to onboard without a roster at all? Just email megan@anytime-soccer.com letting her know, and we'll get started.",
  },
  {
    title: 'Pay Your Invoice',
    body: `
      <div style="background:#fef2f2;border-radius:8px;padding:14px 16px;margin-bottom:16px;">
        <p style="margin:0;"><strong style="color:#1565C0;">Action Required: Pay invoice online.</strong></p>
      </div>
      <p>Once we receive your roster, we&rsquo;ll generate your invoice and send it via Stripe. As soon as it&rsquo;s paid, onboarding begins &mdash; starting with the <strong>Coaching Plan Survey</strong>.</p>
      <p><strong>Parents don&rsquo;t pay anything.</strong> Each player is given a code that gives them full access to the program for 365 days.</p>
    `,
  },
  {
    title: 'Coaching Plan Survey',
    body: `
      <div style="background:#fef2f2;border-radius:8px;padding:14px 16px;margin-bottom:16px;">
        <p style="margin:0;"><strong style="color:#1565C0;">Action Required: Complete the survey.</strong></p>
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
        <p style="margin:0;"><strong style="color:#1565C0;">Action Required: Create your account and add profiles.</strong></p>
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
        description: "Megan should have emailed you your team code.",
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
        description: 'Add a profile for yourself and your children (not team).',
        videoHref: 'https://youtu.be/oE_GsRgfEdA?si=8RqaXFv_LKxXIXNY',
        moreInfoHref: 'https://www.anytime-soccer.com/adding-an-anytime-soccer-training-player-profile?utm_source=email&utm_medium=email%20marketing',
        sectionHeading: 'Add Profiles',
      },
      {
        title: 'Enter Player Information',
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
      <p><strong style="color:#1565C0;">Action Required: Create your team using the exact team name given to parents.</strong></p>
    `,
    subSteps: [
      {
        title: 'Log In and Choose Your Coach’s Profile',
        description: 'Sign in to anytime-soccer.com and select your coach profile. After creating the team, you can add your child via their profile.',
        videoHref: 'https://youtu.be/_LTtpT885cM?si=5xVusdRdi7Nxjcxa',
        moreInfoHref: 'https://www.anytime-soccer.com/creating-an-anytime-soccer-training-team?utm_source=email&utm_medium=email%20marketing',
      },
      {
        title: 'Click MY TEAMS',
        description: 'From the dashboard, click on "MY TEAMS".',
      },
      {
        title: 'Click CREATE TEAM',
        description: 'Click the "CREATE TEAM" button.',
      },
      {
        title: 'Complete the Form',
        description: 'Fill out the team information form with the exact team name given to parents.',
      },
      {
        title: 'Keep Auto-Accept Turned On',
        description: 'To check, go to Roster → Pending Invites. Please let players "request to join your team" — don’t invite them directly yet.',
      },
    ],
    hint: 'Duplicate player on the team? Click Roster, click the player’s profile name, copy their email address, click Leave Team, then invite them again — with auto-accept on, they’ll automatically appear on the roster.',
  },
];
