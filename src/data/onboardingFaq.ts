export type FaqItem = { question: string; answer: string };

export const ONBOARDING_FAQ: FaqItem[] = [
  {
    question: "What's the difference between the login email and the contact email, and how do I update them?",
    answer:
      'Anytime Soccer Training uses two emails on every account: the login email — the email used to create the account — and the contact email — the email in-app alerts are sent to. This is helpful when the child has their own email but the parent created the account. ' +
      'To update the login email: log in, click Account Management, and update your email address. ' +
      'To update the contact email: click Edit next to the profile and update the contact email.',
  },
];
