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
    question: "Parents can't find our team when they search — what should I do?",
    answer: `
      <p>This is a common question. Occasionally the team name is slightly different, so searching for the exact full name may not find it.</p>
      <div style="background:#eff6ff;border-radius:8px;padding:14px 16px;">
        <p style="margin:0;"><strong>Tell them to try searching for just part of the team name.</strong> For example, if the team name is &ldquo;<strong>Next Level AS - Group 2</strong>,&rdquo; try searching for just &ldquo;<strong>Next</strong>&rdquo;.</p>
      </div>
      <p>You can also invite them again from the <strong>Player Onboard</strong> tab under <strong>New Players</strong>.</p>
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
        <p style="margin:0;">If they already have an Anytime Soccer Training account, they&rsquo;ll automatically be added to the team. If not, they&rsquo;ll receive an invite with instructions on joining.</p>
      </div>
      <div style="background:#fef2f2;border-radius:8px;padding:14px 16px;margin-top:12px;">
        <p style="margin:0;color:#DC373E;font-weight:600;">If you already have 15 or more players, we&rsquo;ll charge the card on file and send you a team code for that player.</p>
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
          <li>Click the player&rsquo;s name.</li>
          <li>From their profile, click <strong>Remove from Team</strong>.</li>
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
  {
    category: 'Team Management',
    question: 'Which homework do you recommend I start with?',
    answer: `
      <p>To start, it&rsquo;s important to <strong>keep it simple</strong>. What you assign is based on a number of factors &mdash; including your preference.</p>
      <div style="background:#eff6ff;border-radius:8px;padding:14px 16px;margin-bottom:12px;">
        <p style="margin:0;">We recommend starting with <strong>Ball Mastery</strong>. As the kids get used to the program, add <strong>Wall Passing</strong>, <strong>Dribbling</strong>, <strong>1v1</strong>, and other folders.</p>
      </div>
      <p>You can also create a plan &mdash; such as the <strong>Skill Builder</strong> plan. These are recurring plans that require no maintenance from the coach once set.</p>
    `,
  },
  {
    category: 'Team Management',
    question: 'What happens if kids skip videos?',
    answer: `
      <p>We have <strong>automatic fraud detection</strong>. If a player skips through a video, it will show as complete &mdash; but they <strong>won&rsquo;t get credit for the time</strong>.</p>
      <div style="background:#eff6ff;border-radius:8px;padding:14px 16px;">
        <p style="margin:0;">Time is what drives all <strong>leaderboard activity</strong> &mdash; so skipping never pays off.</p>
      </div>
    `,
  },
];
