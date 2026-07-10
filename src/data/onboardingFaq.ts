export type FaqItem = { question: string; answer: string };

export const ONBOARDING_FAQ: FaqItem[] = [
  {
    question: "What's the difference between the login email and the contact email, and how do I update them?",
    answer: `
      <p>Anytime Soccer Training uses two emails on every account: the <strong>login email</strong> &mdash; the email used to create the account &mdash; and the <strong>contact email</strong> &mdash; the email in-app alerts are sent to.</p>
      <p>This is helpful when the child has their own email but the parent created the account.</p>
      <div style="background:#eff6ff;border-radius:8px;padding:14px 16px;">
        <ul style="margin:0;">
          <li><strong>To update the login email:</strong> log in, click Account Management, and update your email address.</li>
          <li><strong>To update the contact email:</strong> click Edit next to the profile and update the contact email.</li>
        </ul>
      </div>
    `,
  },
];
