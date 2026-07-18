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
          <p style="margin:6px 0 0;">You can provide more than one parent email &mdash; both parents get the invite and can decide who signs up.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">2</span>
          <p style="margin:6px 0 0;">Don&rsquo;t have your full roster yet? No problem &mdash; you can add players later.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">3</span>
          <p style="margin:6px 0 0;">Emails can be updated later &mdash; not a problem.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">4</span>
          <p style="margin:6px 0 0;">Parents can also sign up with a different email than the one you provided &mdash; that&rsquo;s fine.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">5</span>
          <p style="margin:6px 0 0;">Older player? Use their email if they&rsquo;ll be the primary contact.</p>
        </div>
      </div>
    `,
  },
  {
    title: 'Quick Tip: Accounts & Profiles',
    body: `
      <p>Next you&rsquo;ll create your account and add profiles for <strong>yourself and your child</strong>.</p>
      <div style="background:#eff6ff;border-radius:8px;padding:14px 16px;margin:16px 0;">
        <p style="margin:0;"><strong>Remember:</strong> you don&rsquo;t add profiles for your team&rsquo;s players &mdash; each parent has their own account.</p>
      </div>
      <p>You&rsquo;ll need to apply the <strong>team code</strong> provided. Already have an account? Enter the team code in the <strong>Account Management</strong> section.</p>
    `,
  },
  {
    title: 'Quick Tip: Creating Your Team',
    body: `
      <p>Next we&rsquo;ll ask you to create your team. All you need to do is fill out the <strong>Create Team form</strong> and let us know once it&rsquo;s done.</p>
      <div style="background:#eff6ff;border-radius:8px;padding:14px 16px;margin:16px 0;">
        <p style="margin:0;"><strong>Don&rsquo;t change the team name during onboarding</strong> &mdash; this is what we&rsquo;ll use to invite your parents.</p>
      </div>
    `,
  },
  {
    title: 'Quick Tip: If a Parent Hits a Paywall',
    body: `
      <p>One of the most common questions we get: a parent hits a <strong>paywall</strong>. That means they didn&rsquo;t apply the team code.</p>
      <div style="background:#eff6ff;border-radius:8px;padding:14px 16px;margin:16px 0;">
        <p style="margin:0;">When that happens, send them the <strong>onboarding link we provide</strong> &mdash; it includes the team code and instructions to add it. The link has everything they need.</p>
      </div>
    `,
  },
];
