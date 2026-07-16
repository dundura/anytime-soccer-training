export type FaqItem = { question: string; answer: string; category?: string };

export const ONBOARDING_FAQ: FaqItem[] = [
  {
    category: 'Accounts & Profiles',
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
  {
    category: 'Accounts & Profiles',
    question: 'What if I have more than one child using the program?',
    answer: `
      <p>You can add up to <strong>4 unique profiles per account</strong>. Each profile can use the same contact email or a different one &mdash; they&rsquo;re all tied to a single login.</p>
      <p>Each profile can join the same or a different team, and profiles can be linked together when training together so they get shared training credit.</p>
      <p>If you apply a team code, it applies to all profiles on the account.</p>
      <div style="background:#eff6ff;border-radius:8px;padding:14px 16px;margin-bottom:12px;">
        <p style="margin:0;"><strong>To add a profile:</strong> log in and click Add a Profile. Complete the form and click Save.</p>
      </div>
      <div style="background:#eff6ff;border-radius:8px;padding:14px 16px;">
        <p style="margin:0;"><strong>To link profiles during a training session:</strong> click the link icon next to the profile, then log in with the profile you want to link.</p>
      </div>
    `,
  },
  {
    category: 'Joining a Team',
    question: "I can't find my team when I search for it — what should I do?",
    answer: `
      <p>This is a common question. Occasionally a coach changes the team name after it was created, so searching for the exact full name may not find it.</p>
      <div style="background:#eff6ff;border-radius:8px;padding:14px 16px;">
        <p style="margin:0;"><strong>Try searching for just part of the team name instead.</strong> For example, if the team name is &ldquo;<strong>Next Level AS - Group 2</strong>,&rdquo; try searching for just &ldquo;<strong>Next</strong>&rdquo;.</p>
      </div>
      <p>If you still can&rsquo;t find it, email <a href="mailto:megan@anytime-soccer.com" style="color:#0F3154;font-weight:600;">megan@anytime-soccer.com</a>.</p>
    `,
  },
  {
    category: 'Team Management',
    question: 'How do I add players to my team?',
    answer: `
      <div style="background:#eff6ff;border-radius:8px;padding:14px 16px;">
        <ul style="margin:0 0 10px;">
          <li>Click your team and open the <strong>Coach&rsquo;s Board</strong>.</li>
          <li>Click <strong>New Players</strong> (at the top), then <strong>Player Onboard</strong>.</li>
          <li>Enter the player&rsquo;s email into <strong>Add Player</strong>.</li>
        </ul>
        <p style="margin:0;">If they already have an Anytime Soccer Training account, they&rsquo;ll automatically be added to the team.</p>
      </div>
    `,
  },
  {
    category: 'Team Management',
    question: 'How do I remove players from my team?',
    answer: `
      <div style="background:#eff6ff;border-radius:8px;padding:14px 16px;">
        <ul style="margin:0;">
          <li>Go to your team and click <strong>Roster</strong>.</li>
          <li>Click the player&rsquo;s name and remove them from the team.</li>
        </ul>
      </div>
    `,
  },
  {
    category: 'Team Management',
    question: 'Do completed videos move with a player to a new team?',
    answer: `
      <p><strong>Yes &mdash; automatically.</strong> Video and training time data travel with the player &mdash; teams simply act as groups.</p>
      <p>All-time totals, streaks, and levels stay fully intact, and their completed videos count on the new team right away &mdash; changing teams never resets a player&rsquo;s progress.</p>
    `,
  },
];
