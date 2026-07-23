export type CoachOnboardingSubStep = {
  title: string;
  description?: string;
  videoHref?: string;
  moreInfoHref?: string;
  extraLinkPrefix?: string;
  extraLinkLabel?: string;
  extraLinkHref?: string;
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
      <p>If you haven&rsquo;t booked a demo yet, please book a time.</p>
      <div style="background:#eff6ff;border:1px solid #dbeafe;border-radius:12px;padding:20px;margin:16px 0;">
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">1</span>
          <p style="margin:6px 0 0;"><strong>Already booked?</strong> Great job &mdash; move on to the next step.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">2</span>
          <p style="margin:6px 0 0;"><strong>Renewing member?</strong> No need to rebook &mdash; we&rsquo;ll call to walk through the new features instead.</p>
        </div>
      </div>
    `,
    ctaLabel: 'Book Demo',
    ctaHref: 'https://www.anytime-soccer.com/team-demo-request-anytime-soccer-training',
  },
  {
    title: 'Send Us Your Roster',
    body: `
      <p>Download the roster template below, fill it in, and email it to <strong>Megan Chambers</strong> as an Excel file.</p>
      <div style="background:#eff6ff;border:1px solid #dbeafe;border-radius:12px;padding:20px;margin:16px 0;">
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">1</span>
          <p style="margin:6px 0 0;"><strong>Nothing is sent to parents until you confirm they&rsquo;ve been notified.</strong></p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">2</span>
          <p style="margin:6px 0 0;"><strong>Roster not finalized?</strong> No problem &mdash; send what you have and add the rest later.</p>
        </div>
      </div>
    `,
    ctaLabel: 'Roster Template',
    ctaHref: 'https://drive.google.com/drive/u/1/folders/1UPIjsWN0pkbryFxMselsTOs3Gs2voNqa',
  },
  {
    title: 'Pay Your Invoice',
    body: `
      <p>We&rsquo;ll send your invoice via Stripe once we receive your roster. <strong>As soon as you&rsquo;ve paid it, confirm this step below</strong> &mdash; that&rsquo;s when onboarding begins.</p>
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:16px 20px;margin:16px 0;">
        <p style="margin:0;color:#166534;"><strong>Please confirm you&rsquo;ve received and paid your invoice</strong> to continue.</p>
      </div>
    `,
  },
  {
    title: 'Coaching Engagement Survey',
    body: `
      <p>We&rsquo;ve distilled what drives player participation into <strong>10 key coaching actions</strong>.</p>
      <p>Tell us which ones you plan to use, and we&rsquo;ll set you up to execute.</p>
      <div style="background:#eff6ff;border-radius:8px;padding:14px 16px;margin:16px 0;">
        <p style="margin:0;"><strong>Filled this out before?</strong> Please take it again when adding a new team.</p>
      </div>
    `,
    ctaLabel: 'Complete Your Survey',
    ctaHref: 'https://www.anytime-soccer.com/my-coaching-plan',
  },
  {
    title: 'Create Your Account',
    body: `
      <p>Fill in the registration form and add profiles for yourself and your children using the program.</p>
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
        description: 'No team code? Email megan@anytime-soccer.com.',
        extraLinkPrefix: 'Already have an account?',
        extraLinkLabel: 'learn how to apply it →',
        extraLinkHref: 'https://www.anytime-soccer.com/applying-team-code-to-existing-account?utm_source=email&utm_medium=email%20marketing',
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
        title: 'Contact Emails',
        description: 'Use the same contact email for all profiles, or different ones.',
      },
    ],
  },
  {
    title: 'Create Your Team',
    body: '',
    subSteps: [
      {
        title: 'Log In and Choose Your Coach’s Profile',
        videoHref: 'https://youtu.be/_LTtpT885cM?si=5xVusdRdi7Nxjcxa',
        moreInfoHref: 'https://www.anytime-soccer.com/creating-an-anytime-soccer-training-team?utm_source=email&utm_medium=email%20marketing',
      },
      {
        title: 'Click MY TEAMS',
      },
      {
        title: 'Click CREATE TEAM',
      },
      {
        title: 'Complete the Form',
        description: "Don't change your team name during onboarding — it's what parents search to join.",
      },
    ],
  },
  {
    title: 'Making the Most of Your Pricing',
    body: `
      <p>We&rsquo;ve made Anytime Soccer Training super affordable &mdash; your players get access to over 5,000 training sessions, plus every feature that comes with your team.</p>
      <div style="background:#f8fafc;border:1px solid #e3e8f0;border-radius:10px;padding:20px;margin:16px 0;">
        <p style="margin:0 0 12px;"><strong>Here&rsquo;s how it works:</strong> once you pay your invoice, we add <strong>roster slots</strong> to your account &mdash; one for every player you&rsquo;ve paid for.</p>
        <p style="margin:0 0 12px;">When a player joins your team, head to the <strong>Upgrade Player</strong> page and upgrade their account using an allocated slot. That gives them <strong>365 days of full access</strong>.</p>
        <p style="margin:0;">Need more? You can <strong>purchase additional slots directly in the app</strong> anytime as your roster grows.</p>
      </div>
    `,
  },
  {
    title: 'Notify Parents',
    body: `
      <p>Please download the template linked below to notify parents. You&rsquo;re welcome to edit it before sending.</p>
    `,
    ctaLabel: 'Download the Parent Welcome Template',
    ctaHref: 'https://docs.google.com/document/d/1VAVT_sHrtvvb1rUbuNX4muqUthq1Tgn0/edit?tab=t.0',
  },
  {
    title: 'Notify Megan',
    body: `
      <p>Reply to Megan with two things:</p>
    `,
    subSteps: [
      {
        title: 'Your team name',
        description: 'Use the exact name from the app.',
      },
      {
        title: 'That parents are informed',
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
  {
    title: 'Onboarding Begins!',
    body: `
      <p>Invoice paid? 🎉 <strong>Now onboarding begins.</strong></p>
      <p>The faster you complete these steps, the quicker your team gets training.</p>
      <div style="background:#eff6ff;border-radius:8px;padding:14px 16px;margin:16px 0;">
        <p style="margin:0;"><strong>Returning member?</strong> You&rsquo;ve likely done most of these &mdash; but please still complete the <strong>Coaching Engagement Survey</strong> so we can support you better.</p>
      </div>
      <p>Here&rsquo;s what&rsquo;s left:</p>
    `,
  },
  {
    title: 'Roster FAQs',
    body: `
      <p>Before you download the roster template in the next step, we want to cover some FAQs.</p>
    `,
  },
  {
    title: 'Quick Tip: Accounts & Profiles',
    body: `
      <p>Next you&rsquo;ll create your account and add profiles for <strong>yourself and your child</strong>.</p>
      <div style="background:#eff6ff;border:1px solid #dbeafe;border-radius:12px;padding:20px;margin:16px 0;">
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">1</span>
          <p style="margin:6px 0 0;"><strong>Remember:</strong> you don&rsquo;t add profiles for your team&rsquo;s players &mdash; each parent has their own account.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">2</span>
          <p style="margin:6px 0 0;">You&rsquo;ll need to apply the <strong>team code</strong> provided to your account.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">3</span>
          <p style="margin:6px 0 0;">Already have an account? Enter the team code in the <strong>Account Management</strong> section.</p>
        </div>
      </div>
    `,
  },
  {
    title: 'Quick Tip: Creating Your Team',
    body: `
      <p>Next we&rsquo;ll ask you to create your team. All you need to do is fill out the <strong>Create Team form</strong> and let us know once it&rsquo;s done.</p>
      <div style="background:#eff6ff;border-radius:8px;padding:14px 16px;margin:16px 0;">
        <p style="margin:0;"><strong>Don&rsquo;t change the team name during onboarding</strong> &mdash; this is what the parents will search for.</p>
      </div>
    `,
  },
  {
    title: 'Quick Tip: If a Parent Hits a Paywall',
    body: `
      <p>One of the most common questions we get: <strong>a parent hits a paywall</strong>. That means they didn&rsquo;t apply the team code or you have not applied an upgrade slot.</p>
      <div style="background:#eff6ff;border:1px solid #dbeafe;border-radius:12px;padding:20px;margin:16px 0;">
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">1</span>
          <p style="margin:6px 0 0;">If you were provided a team code, send them the <strong>onboarding link we provide</strong> &mdash; it includes the team code and instructions to add it.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">2</span>
          <p style="margin:6px 0 0;">If you purchased <strong>free access slots</strong>, apply them in the <strong>Upgrade</strong> section within your team.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">3</span>
          <p style="margin:6px 0 0;">Still having issues? Have them email <a href="mailto:megan@anytime-soccer.com" style="color:#DC373E;font-weight:600;">Megan Chambers</a>.</p>
        </div>
      </div>
    `,
  },
  {
    title: 'Common FAQs',
    body: `
      <p>🎉 <strong>Megan has been notified</strong>. There&rsquo;s one final step before we onboard your parents.</p>
      <div style="background:#eff6ff;border:1px solid #dbeafe;border-radius:12px;padding:20px;margin:16px 0;">
        <div style="display:flex;gap:12px;align-items:flex-start;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">1</span>
          <p style="margin:6px 0 0;">Just a few quick FAQs to set you up for success &mdash; complete each one to finish.</p>
        </div>
      </div>
    `,
  },
  {
    title: 'Confirm & Finish',
    body: `
      <p>That&rsquo;s everything! Once every step is complete, confirm below and we&rsquo;ll take it from there.</p>
      <div style="background:#eff6ff;border-radius:8px;padding:14px 16px;margin:16px 0;">
        <p style="margin:0;">The confirm button unlocks when <strong>every step is done</strong>. Tap <strong>Index</strong> at the top to see anything you still need to complete.</p>
      </div>
    `,
  },
  {
    title: 'How Payment Works',
    body: `
      <p>Here&rsquo;s the big picture &mdash; billing is simple and handled entirely by us.</p>
      <div style="background:#eff6ff;border:1px solid #dbeafe;border-radius:12px;padding:20px;margin:16px 0;">
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">1</span>
          <p style="margin:6px 0 0;"><strong>You send us your roster.</strong> Let us know who&rsquo;s on your team.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">2</span>
          <p style="margin:6px 0 0;"><strong>We invoice you.</strong> One bill to you at <strong>$10 per player, per year</strong> &mdash; <strong>parents pay nothing</strong>.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">3</span>
          <p style="margin:6px 0 0;"><strong>You pay the invoice.</strong> As soon as it&rsquo;s paid, onboarding begins.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">4</span>
          <div style="margin:6px 0 0;">
            <p style="margin:0;">We add <strong>free access slots</strong> to your account.</p>
            <ul style="margin:8px 0 0;padding-left:22px;list-style:disc;">
              <li style="margin:0 0 6px;list-style:disc;display:list-item;">When a player joins, go to <strong>Upgrade Player</strong> and upgrade them with a free access slot.</li>
              <li style="margin:0;list-style:disc;display:list-item;">That gives them <strong>365 days of full access</strong>.</li>
            </ul>
          </div>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">5</span>
          <p style="margin:6px 0 0;"><strong>Add players anytime.</strong> As your roster grows, add new players to your team and <strong>purchase additional slots</strong> to upgrade them &mdash; all directly in the app.</p>
        </div>
      </div>
    `,
  },
  {
    title: 'Renewing members',
    body: `
      <p>Quick steps for renewing members.</p>
      <div style="background:#eff6ff;border:1px solid #dbeafe;border-radius:12px;padding:20px;margin:16px 0;">
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">1</span>
          <p style="margin:6px 0 0;"><strong>We add the access slots</strong> to your account &mdash; the same way as your original players.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">2</span>
          <p style="margin:6px 0 0;"><strong>You upgrade each player once they join your team</strong> &mdash; right under <strong>Upgrade Players</strong> in your dashboard.</p>
        </div>
      </div>
    `,
  },
];
