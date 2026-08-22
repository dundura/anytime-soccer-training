export type CoachOnboardingSubStep = {
  title: string;
  description?: string;
  /** Points under the step. Two facts about the same step read as a list, not
   *  as a sentence that happens to contain a full stop. */
  bullets?: string[];
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
  /** HTML shown AFTER the numbered steps — for a note that only makes sense
   *  once you have read them. `body` renders above and would pre-empt it. */
  afterSteps?: string;
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
      <p>Email your roster to <strong>Megan Chambers</strong> as an Excel file.</p>
      <div style="background:#eff6ff;border:1px solid #dbeafe;border-radius:12px;padding:20px;margin:16px 0;">
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">1</span>
          <p style="margin:6px 0 0;"><strong>We contact parents only after you confirm.</strong></p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">2</span>
          <p style="margin:6px 0 0;"><strong>Roster not final?</strong> Send what you have and add the rest later.</p>
        </div>
      </div>
      <div style="background:#EFF6FF;border:1px solid #BFDBFE;border-left:4px solid #0F3154;border-radius:10px;padding:16px 18px;margin:16px 0;">
        <p style="margin:0 0 8px;font-weight:700;color:#0F3154;font-size:16px;">Clubs With More Than One Team</p>
        <p style="margin:0;color:#1e3a5f;">Pay the invoice for the first two teams. After that we charge the card on file for additional players and add free slots to your coaches&rsquo; accounts.</p>
      </div>
    `,
    ctaLabel: 'Roster Template',
    ctaHref: 'https://www.anytime-soccer.com/roster-template',
  },
  {
    title: 'Pay Your Invoice',
    body: `
      <div style="background:#eff6ff;border:1px solid #dbeafe;border-radius:12px;padding:20px;margin:16px 0;">
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">1</span>
          <p style="margin:6px 0 0;"><strong>If you submitted a roster:</strong> we&rsquo;ll send your invoice via Stripe. Once paid, confirm below &mdash; that&rsquo;s when onboarding begins.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">2</span>
          <p style="margin:6px 0 0;"><strong>Adding players inside the app instead?</strong> There&rsquo;s no invoice here &mdash; just mark this step complete and move on.</p>
        </div>
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
      <p>Fill in the registration form to create your account.</p>
    `,
    subSteps: [
      {
        title: 'Go to anytime-soccer.com & Join for Free',
        videoHref: 'https://youtu.be/Vd2IkI3bQdM?si=urfwji2FLhUMYpGH',
        moreInfoHref: 'https://www.anytime-soccer.com/how-to-create-your-anytime-soccer-training-account?utm_source=email&utm_medium=email%20marketing',
      },
      {
        title: 'Enter Your Team Code (Optional)',
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
    ],
  },
  {
    title: 'Create Your Team',
    body: '',
    // Below the numbered steps: a coach who is NOT renewing should read the
    // four steps first, and this only makes sense once you know what creating
    // a team involves.
    afterSteps: `
      <div style="background:#FFF7ED;border:1px solid #FDBA74;border-left:4px solid #F97316;border-radius:10px;padding:16px 18px;margin:0 0 24px;">
        <p style="margin:0 0 8px;font-weight:700;color:#9A3412;">Renewing with a team you already have?</p>
        <p style="margin:0;color:#7C2D12;">You can keep your existing team and just <strong>update the team name</strong>. Then update your roster by adding and removing players.</p>
      </div>
    `,
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
      <p>Please download the template to notify parents. You&rsquo;re welcome to edit it before sending.</p>
    `,
    ctaLabel: 'Download the Parent Welcome Template',
    ctaHref: 'https://www.anytime-soccer.com/welcome-email-template',
  },
  {
    title: 'Notify Megan',
    body: `
    `,
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
        moreInfoHref: 'https://www.anytime-soccer.com/roster-template',
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
        moreInfoHref: 'https://www.anytime-soccer.com/welcome-email-template',
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
      <p>I understand I need to complete each of these:</p>
    `,
  },
  {
    title: 'Roster FAQs',
    body: `
      <p>Roster templates are for teams joining for the first time and teams with several roster changes. Renewing members can <strong>submit a roster or add new players inside the app and purchase their slots.</strong> See the bonus section for roster template FAQs.</p>
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
          <p style="margin:6px 0 0;">Already have an account? Enter the team code in the <strong>Account Management</strong> section. (Optional)</p>
        </div>
      </div>
    `,
  },
  {
    title: 'Quick Tip: Creating Your Team',
    body: `
      <p>Next we&rsquo;ll ask you to create your team. Fill out the <strong>Create Team form</strong> and let us know once it&rsquo;s done.</p>
      <div style="background:#eff6ff;border-radius:8px;padding:14px 16px;margin:16px 0;">
        <p style="margin:0;"><strong>Don&rsquo;t change the team name during onboarding</strong> &mdash; this is what the parents will search for.</p>
      </div>
    `,
  },
  {
    title: 'Quick Tip: If a Parent Hits a Paywall',
    body: `
      <p><strong>A parent hits a paywall.</strong> That means they didn&rsquo;t apply the team code or you have not applied an upgrade slot.</p>
      <div style="background:#eff6ff;border:1px solid #dbeafe;border-radius:12px;padding:20px;margin:16px 0;">
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">1</span>
          <p style="margin:6px 0 0;">If you were provided a team code, send them the <strong>onboarding link we provide</strong> &mdash; it includes the team code and instructions.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">2</span>
          <p style="margin:6px 0 0;">If you purchased <strong>free access slots</strong>, apply them in the <strong>Upgrade</strong> section within your team.</p>
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
      <p>We&rsquo;ll go over the payment steps for new and renewing teams.</p>
      <div style="background:#eff6ff;border:1px solid #dbeafe;border-radius:12px;padding:20px;margin:16px 0;">
        <p style="color:#DC373E;font-weight:800;text-transform:uppercase;letter-spacing:0.04em;font-size:13px;margin:0 0 16px;">New Teams</p>
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
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">5</span>
          <p style="margin:6px 0 0;"><strong>Add players anytime.</strong> As your roster grows, add new players to your team and <strong>purchase additional slots</strong> to upgrade them &mdash; all directly in the app.</p>
        </div>
<div style="display:flex;gap:12px;align-items:flex-start;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">6</span>
          <div style="margin:6px 0 0;">
            <p style="margin:0;"><strong>Club upgrades.</strong></p>
            <ul style="margin:8px 0 0;padding-left:22px;list-style:disc;">
              <li style="margin:0;list-style:disc;display:list-item;">Clubs can buy and upgrade players on behalf of their coaches, so a coach never has to handle payment.</li>
            </ul>
          </div>
        </div>
        </div>
    `,
  },
  {
    title: 'How Payment Works - Club Pays',
    body: `
      <p>Some clubs pay for their teams centrally. If yours does, <strong>you never handle payment</strong>.</p>
      <div style="background:#eff6ff;border:1px solid #dbeafe;border-radius:12px;padding:20px;margin:16px 0;">
        <p style="color:#DC373E;font-weight:800;text-transform:uppercase;letter-spacing:0.04em;font-size:13px;margin:0 0 16px;">Option 2 &mdash; Your Club Pays the Invoice</p>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">1</span>
          <p style="margin:6px 0 0;"><strong>Send Roster</strong> &mdash; club or coach sends the roster.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">2</span>
          <p style="margin:6px 0 0;"><strong>Club pays invoice</strong> &mdash; we bill the club at <strong>$10 per player, per year</strong>. <strong>Coaches and parents pay nothing.</strong></p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">3</span>
          <p style="margin:6px 0 0;">We add <strong>free access slots</strong> to <strong>each coach&rsquo;s profile</strong> &mdash; once the club has paid, onboarding begins.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">4</span>
          <p style="margin:6px 0 0;"><strong>Once players join your team, you grant them free 365-day access</strong> &mdash; via the <strong>Upgrade Players</strong> in your dashboard.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">5</span>
          <p style="margin:6px 0 0;"><strong>Your club can upgrade existing players once their subscription ends.</strong></p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">6</span>
          <p style="margin:6px 0 0;">Existing players can be <strong>removed</strong> from the team, but a <strong>subscription must be purchased for new players</strong>.</p>
        </div>
      </div>
    `,
  },
  {
    title: 'How Payment Works - Renewing teams',
    body: `
      <p>There are two ways: email us your roster, or invite new players individually.</p>
      <div style="background:#eff6ff;border:1px solid #dbeafe;border-radius:12px;padding:20px;margin:16px 0;">
        <p style="color:#DC373E;font-weight:800;text-transform:uppercase;letter-spacing:0.04em;font-size:13px;margin:0 0 16px;">Option 1 &mdash; Emailing Roster</p>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">1</span>
          <p style="margin:6px 0 0;"><strong>Send Roster</strong> &mdash; send the roster of only the new players.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">2</span>
          <p style="margin:6px 0 0;">We invoice you and add <strong>free access slots</strong> to your account.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">3</span>
          <p style="margin:6px 0 0;"><strong>Once players join your team, you grant them free 365-day access</strong> &mdash; via the <strong>Upgrade Players</strong> in your dashboard.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">4</span>
          <p style="margin:6px 0 0;"><strong>Upgrade existing players once their subscription ends.</strong></p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">5</span>
          <p style="margin:6px 0 0;">Existing players can be <strong>removed</strong> from the team, but a <strong>subscription must be purchased for new players</strong>.</p>
        </div>
      </div>
    `,
  },
  {
    title: 'Paying for New Players',
    body: `
      <p>You can add players and pay for their access directly inside the app.</p>
      <div style="background:#eff6ff;border:1px solid #dbeafe;border-radius:12px;padding:20px;margin:16px 0;">
        <p style="color:#DC373E;font-weight:800;text-transform:uppercase;letter-spacing:0.04em;font-size:13px;margin:0 0 16px;">Option 2 &mdash; Paying for New Players inside the App</p>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">1</span>
          <p style="margin:6px 0 0;">Go to your team and open the <strong>Manage &amp; Upgrade</strong> dropdown.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">2</span>
          <p style="margin:6px 0 0;">From your team, click <strong>Manage &amp; Upgrade</strong> and add the players.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">3</span>
          <p style="margin:6px 0 0;">Then click <strong>Upgrade Players</strong> and purchase the additional free access slots.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">4</span>
          <p style="margin:6px 0 0;"><strong>Once the players join your team</strong>, grant them <strong>365-day access</strong> using one of your slots.</p>
        </div>
      </div>
      <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:14px 18px;margin:16px 0;">
        <p style="margin:0 0 6px;color:#92400e;"><strong>If your club has paid, no payment is needed &mdash; skip step 3.</strong></p>
        <p style="margin:0;color:#92400e;">We add the slots to your account for you. All you do is click <strong>Upgrade Players</strong> and grant each player their 365-day access. You are never asked to pay.</p>
      </div>
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:14px 18px;margin:16px 0;">
        <p style="margin:0 0 6px;color:#166534;"><strong>Once they are added, invite them.</strong></p>
        <p style="margin:0;color:#166534;">Also, you can ask Megan for a getting-started link to share with your parents.</p>
      </div>
    `,
  },
  {
    title: 'Add Profiles',
    body: `
      <p>Add profiles for yourself and your children using the program.</p>
    `,
    subSteps: [
      {
        title: 'Click "Add Profile"',
        description: 'Add a profile for yourself and your children (not team).',
        videoHref: 'https://youtu.be/oE_GsRgfEdA?si=8RqaXFv_LKxXIXNY',
        moreInfoHref: 'https://www.anytime-soccer.com/adding-an-anytime-soccer-training-player-profile?utm_source=email&utm_medium=email%20marketing',
      },
      {
        title: 'Contact Emails',
        description: 'Use the same contact email for all profiles, or different ones.',
      },
    ],
  },
  {
    title: 'Upgrading Players: Brand New Team',
    body: `
      <p><strong>Upgrade players by either paying the online invoice in advance and/or purchasing upgrade slots inside the app.</strong></p>
    `,
    subSteps: [
      {
        title: 'Method One: Submit your roster and pay the invoice in advance',
        bullets: [
          'The roster template is provided later.',
          'Once paid, we add free access slots that you apply to players.',
        ],
      },
    ],
  },
  {
    // Its own page rather than a second group on the previous one: the two
    // routes have nothing to do with each other, and a coach reading both is
    // reading half a page that does not apply to them.
    title: 'Upgrading Players: Renewing or Self Onboard',
    body: `
      <p><strong>Upgrade players by either paying the online invoice in advance and/or purchasing upgrade slots inside the app.</strong></p>
    `,
    afterSteps: `
      <div style="background:#FFF7ED;border:1px solid #FDBA74;border-left:4px solid #F97316;border-radius:10px;padding:16px 18px;margin:0 0 24px;">
        <p style="margin:0 0 8px;font-weight:700;color:#9A3412;">Renewing members</p>
        <p style="margin:0;color:#7C2D12;">Because you have players with different subscription dates, you can submit a roster template with only new players, or add the new players inside the app. We&rsquo;ll invoice you for new players, and you can upgrade existing players inside the app once their subscription expires.</p>
      </div>
    `,
    subSteps: [
      {
        title: 'Method Two: two options',
        bullets: [
          'Submit a roster of just the new players.',
          'Or add new players inside the app and purchase their slots.',
          'Click Upgrade Players to buy them.',
        ],
      },
    ],
  },
  {
    title: 'Complete Portal Onboarding Steps',
    body: `
      <p>Before you notify Megan, work through the rest of the steps in this portal &mdash; they walk you through setup and the key features that get your team going.</p>
    `,
  },
  {
    title: 'Quick Reminder: Adding Players',
    body: `
      <p style="margin:0 0 12px;">Here are the steps going forward:</p>
      <div style="background:#eff6ff;border:1px solid #dbeafe;border-radius:12px;padding:20px;margin:16px 0;">
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">1</span>
          <p style="margin:6px 0 0;"><strong>Add them</strong> via the New Player Onboarding page.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">2</span>
          <p style="margin:6px 0 0;">Then click <strong>Invite</strong> next to their email.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">3</span>
          <p style="margin:6px 0 0;"><strong>Purchase a free access slot</strong>.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">4</span>
          <p style="margin:6px 0 0;">When they join your team, click <strong>Upgrade</strong> next to their name.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">5</span>
          <p style="margin:6px 0 0;">This gives them <strong>365 day access</strong> to all the training content.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">6</span>
          <p style="margin:6px 0 0;">Megan will send you a <strong>getting-started information link</strong> that you can share with the players.</p>
        </div>
      </div>
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:14px 18px;">
        <p style="margin:0;color:#166534;">Adding a player does not notify them &mdash; step 2 is what sends the invite.</p>
      </div>
    `,
  },
  {
    title: 'Adding and removing players each season',
    body: `
      <p><strong>You do not start over each season.</strong></p>
      <div style="background:#eff6ff;border:1px solid #dbeafe;border-radius:12px;padding:20px;margin:16px 0;">
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">1</span>
          <p style="margin:6px 0 0;"><strong>Players who left the club</strong> &mdash; click their name on the roster and remove them.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">2</span>
          <p style="margin:6px 0 0;"><strong>Players who stayed</strong> &mdash; nothing to do. They keep their profile, their history and their progress. <strong>Even if they join a new team.</strong></p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">3</span>
          <p style="margin:6px 0 0;"><strong>New players</strong> &mdash; add them the same way you did the first time: send the roster or invite them from the Player Onboarding tab.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">4</span>
          <p style="margin:6px 0 0;"><strong>New teams</strong> &mdash; create in the app the same way as before.</p>
        </div>
      </div>
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:14px 18px;margin:16px 0;">
        <p style="margin:0 0 6px;color:#166534;"><strong>Moving a player from another team &mdash; do they lose their stats?</strong></p>
        <p style="margin:0;color:#166534;">No. Progress belongs to the player, not the team. Add them to the new roster and it all comes with them.</p>
      </div>
    `,
  },
];
