export type FaqItem = { question: string; answer: string; category?: string };

export const ONBOARDING_FAQ: FaqItem[] = [
  {
    category: 'Accounts & Profiles',
    question: "What's the difference between the login email and the contact email, and how do I update them?",
    answer: `
      <p>Every account has a <strong>login email</strong> (used to sign in) and a <strong>contact email</strong> (where alerts go) &mdash; handy when a child has their own email but a parent created the account.</p>
      <div style="background:#eff6ff;border-radius:8px;padding:14px 16px;">
        <p style="margin:0 0 8px;font-weight:700;color:#0F3154;">How to Update</p>
        <ul style="margin:0;">
          <li><strong>Login email:</strong> Account Management &rarr; update your email.</li>
          <li><strong>Contact email:</strong> click Edit next to the profile &rarr; update it.</li>
        </ul>
      </div>
    `,
  },
  {
    category: 'Accounts & Profiles',
    question: 'What if I have more than one child using the program?',
    answer: `
      <p>Add up to <strong>4 profiles per account</strong>, all under one login. Each can join the same or a different team, and a team code applies to all of them.</p>
      <div style="background:#eff6ff;border-radius:8px;padding:14px 16px;">
        <ul style="margin:0;">
          <li><strong>Add a profile:</strong> log in &rarr; Add a Profile &rarr; Save.</li>
          <li><strong>Link profiles</strong> (for shared training credit): click the link icon next to a profile, then log in with the one to link.</li>
        </ul>
      </div>
    `,
  },
  {
    category: 'Joining a Team',
    question: "Parents can't find our team when they search — what should I do?",
    answer: `
      <p>The exact name may be different. A few options:</p>
      <div style="background:#eff6ff;border-radius:8px;padding:14px 16px;">
        <ul style="margin:0;">
          <li>Search <strong>part</strong> of the name (e.g. &ldquo;Anytime&rdquo; for &ldquo;Anytime Soccer Training&rdquo;).</li>
          <li>Re-invite from <strong>New Players &rarr; Player Onboard</strong> &mdash; the invite includes the correct team name.</li>
          <li>Or send them the onboarding link we shared &mdash; it has instructions.</li>
        </ul>
      </div>
      <p>Still stuck? Email <a href="mailto:megan@anytime-soccer.com" style="color:#0F3154;font-weight:600;">megan@anytime-soccer.com</a>.</p>
    `,
  },
  {
    category: 'Team Management',
    question: 'How do I add players to my team?',
    answer: `
      <p>You can add players from the <strong>Player Onboard</strong> section.</p>
      <div style="background:#eff6ff;border-radius:8px;padding:16px 18px;">
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:12px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;font-size:14px;">1</span>
          <p style="margin:5px 0 0;">Click your team and open the <strong>Coach&rsquo;s Board</strong>.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:12px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;font-size:14px;">2</span>
          <p style="margin:5px 0 0;">Click <strong>New Players</strong> (at the top), then <strong>Player Onboard</strong>.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:12px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;font-size:14px;">3</span>
          <p style="margin:5px 0 0;">Enter the player&rsquo;s email into <strong>Add Player</strong>.</p>
        </div>
        <p style="margin:0;">They&rsquo;ll get an invite; if they already have an account, they can join in one click.</p>
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
      <p><strong>Yes &mdash; automatically.</strong> Video and training data travel with the player; teams are just groups.</p>
      <p>Changing teams never resets progress.</p>
    `,
  },
  {
    category: 'Team Management',
    question: 'Which homework do you recommend I start with?',
    answer: `
      <p><strong>Keep it simple to start.</strong> We recommend <strong>Ball Mastery</strong> first, then adding <strong>Wall Passing</strong>, <strong>Dribbling</strong>, <strong>1v1</strong>, and more as the kids settle in.</p>
      <div style="background:#eff6ff;border-radius:8px;padding:14px 16px;">
        <p style="margin:0;">Prefer set-and-forget? Build a plan like <strong>Skill Builder</strong> &mdash; recurring, no upkeep.</p>
      </div>
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
  {
    category: 'Team Management',
    question: "I got an email that a homework folder is complete, but the player hasn't done the videos",
    answer: `
      <p>Folder completion is <strong>not tied to the videos</strong> &mdash; players mark a homework folder complete themselves, with a double confirmation.</p>
      <div style="background:#eff6ff;border-radius:8px;padding:14px 16px;">
        <p style="margin:0;">Please ask the player to only confirm their homework is complete when <strong>all the videos are done</strong>.</p>
      </div>
    `,
  },
  {
    category: 'Team Management',
    question: 'What are the different training plans?',
    answer: `
      <div style="background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:14px 16px;margin-bottom:10px;">
        <p style="margin:0 0 6px;"><span style="font-size:17px;">🛠️</span> <strong>Skill Builder</strong></p>
        <p style="margin:0;color:#64748b;">Pulls from every video in our curriculum and separates them by skill area, so you can focus on exactly the skills you want to build.</p>
      </div>
      <div style="background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:14px 16px;margin-bottom:10px;">
        <p style="margin:0 0 6px;"><span style="font-size:17px;">📅</span> <strong>Weekly Plan</strong></p>
        <p style="margin:0;color:#64748b;">Pulls from the full curriculum and puts the skill areas into each day of the week &mdash; delivered automatically, no setup needed.</p>
      </div>
      <div style="background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:14px 16px;margin-bottom:10px;">
        <p style="margin:0 0 6px;"><span style="font-size:17px;">📆</span> <strong>30-Day Monthly Plan</strong></p>
        <p style="margin:0;color:#64748b;">A guided program based on our 30-Day plan folders, giving you a full month of structured training.</p>
      </div>
      <div style="background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:14px 16px;">
        <p style="margin:0 0 6px;"><span style="font-size:17px;">🧩</span> <strong>Custom Plan</strong></p>
        <p style="margin:0;color:#64748b;">You pick the folders and build your plan.</p>
      </div>
    `,
  },
  {
    category: 'Team Management',
    question: "I see that players have joined the app, but they're not on my team",
    answer: `
      <p>Some players join the app but forget to join the team. You can automatically add them by <strong>re-inviting them</strong>.</p>
      <div style="background:#eff6ff;border-radius:8px;padding:14px 16px;">
        <p style="margin:0 0 8px;font-weight:700;color:#0F3154;">To re-invite a player:</p>
        <ul style="margin:0;">
          <li>Go to your team, open the <strong>New Players</strong> dropdown, and click <strong>Player Onboard</strong>.</li>
          <li>Resend the invite.</li>
          <li>They&rsquo;ll get an invite; if they already have an account, they can join in one click.</li>
        </ul>
      </div>
    `,
  },
  {
    category: 'Team Management',
    question: 'What are the 30-day plans?',
    answer: `
      <p>The curriculum teaches <strong>one move at a time</strong>, then combines them. 30-day plans pull only the <strong>review videos</strong> &mdash; about <strong>30 days</strong> of training.</p>
      <div style="background:#eff6ff;border-radius:8px;padding:14px 16px;">
        <p style="margin:0;">Each review video packs <strong>4&ndash;6 moves</strong>, so players touch most skills quickly.</p>
      </div>
    `,
  },
  {
    category: 'Team Management',
    question: 'How do I assign homework?',
    answer: `
      <p>Homework is organized into <strong>3 key categories</strong>:</p>
      <div style="background:#eff6ff;border-radius:8px;padding:16px 18px;">
        <div style="display:flex;gap:12px;align-items:center;margin-bottom:12px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;font-size:14px;">1</span>
          <p style="margin:0;"><strong>Program Folders</strong></p>
        </div>
        <div style="display:flex;gap:12px;align-items:center;margin-bottom:12px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;font-size:14px;">2</span>
          <p style="margin:0;"><strong>Recurring Training Plans</strong></p>
        </div>
        <div style="display:flex;gap:12px;align-items:center;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;font-size:14px;">3</span>
          <p style="margin:0;"><strong>Favorites (custom folders)</strong></p>
        </div>
      </div>
      <p>We&rsquo;ll go over each one in the next few pages.</p>
    `,
  },
  {
    category: 'Team Management',
    question: 'Assigning Program Folders',
    answer: `
      <p>Training is organized by <strong>skill areas</strong>, <strong>programs</strong>, and <strong>folders</strong> &mdash; the folders house the videos. For example, <strong>Ball Mastery</strong> is a skill area, <strong>1,000 Touch</strong> is a program, and <strong>P1:</strong> is the first folder.</p>
      <p style="font-weight:700;color:#0F3154;margin:16px 0 8px;">Types of Folders</p>
      <div style="background:#eff6ff;border-radius:8px;padding:16px 18px;">
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:12px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;font-size:14px;">1</span>
          <p style="margin:5px 0 0;"><strong>All Programs</strong> &mdash; lists every folder in each respective program.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:12px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;font-size:14px;">2</span>
          <p style="margin:5px 0 0;"><strong>Curated Curriculum</strong> &mdash; folders by skill area, in our recommended order (rotates programs for variety).</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:12px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;font-size:14px;">3</span>
          <p style="margin:5px 0 0;"><strong>30-Day Plans</strong> &mdash; 30-day plans by skill area.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;font-size:14px;">4</span>
          <p style="margin:5px 0 0;"><strong>Favorites</strong> &mdash; your own folders (add videos in Key Skills).</p>
        </div>
      </div>
      <p style="font-weight:700;color:#0F3154;margin:16px 0 8px;">How to Assign</p>
      <div style="background:#eff6ff;border-radius:8px;padding:16px 18px;">
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:12px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;font-size:14px;">1</span>
          <p style="margin:5px 0 0;">Click <strong>pin/board</strong> next to a folder.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;font-size:14px;">2</span>
          <p style="margin:5px 0 0;">Click the <strong>person icon</strong> and select your players.</p>
        </div>
      </div>
    `,
  },
  {
    category: 'Team Management',
    question: 'Assigning recurring training plans',
    answer: `
      <p>Training plans are recurring plans that you set and forget.</p>
      <p style="font-weight:700;color:#0F3154;margin:16px 0 8px;">Types of Plans</p>
      <div style="background:#eff6ff;border-radius:8px;padding:16px 18px;">
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:12px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;font-size:14px;">1</span>
          <p style="margin:5px 0 0;"><strong>Skill Builder</strong> &mdash; pulls from the full curriculum by skill area.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:12px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;font-size:14px;">2</span>
          <p style="margin:5px 0 0;"><strong>Weekly Plan</strong> &mdash; organizes the skill videos by day, delivering skill areas into each day automatically.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:12px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;font-size:14px;">3</span>
          <p style="margin:5px 0 0;"><strong>30-Day Monthly Plan</strong> &mdash; a guided month built from the 30-Day folders.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;font-size:14px;">4</span>
          <p style="margin:5px 0 0;"><strong>Custom Plan</strong> &mdash; folders you pick yourself.</p>
        </div>
      </div>
      <p style="font-weight:700;color:#0F3154;margin:16px 0 8px;">How to Assign</p>
      <div style="background:#eff6ff;border-radius:8px;padding:16px 18px;">
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:12px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;font-size:14px;">1</span>
          <p style="margin:5px 0 0;">From the <strong>Coach&rsquo;s Board</strong>, click <strong>Build Training Plan</strong>.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;font-size:14px;">2</span>
          <p style="margin:5px 0 0;">Assign it the same way you assign folders.</p>
        </div>
      </div>
    `,
  },
  {
    category: 'Team Management',
    question: "My kids have not used the program as much as I expected. Any suggestions?",
    answer: `
      <p>Two quick moves to get your team going:</p>
      <div style="background:#eff6ff;border-radius:8px;padding:14px 16px;">
        <ul style="margin:0;">
          <li style="margin-bottom:8px;"><strong>Start a team contest</strong> and announce it at your next training.</li>
          <li><strong>Set a personal goal for every player</strong> &mdash; it&rsquo;s the biggest driver of consistency.</li>
        </ul>
      </div>
      <p>Need a hand setting these up? Email <a href="mailto:megan@anytime-soccer.com" style="color:#0F3154;font-weight:600;">megan@anytime-soccer.com</a>.</p>
    `,
  },
  {
    category: 'Team Management',
    question: 'Can my team have multiple team managers?',
    answer: `
      <p><strong>Yes.</strong> Once the team manager joins, you can update their role:</p>
      <div style="background:#eff6ff;border-radius:8px;padding:16px 18px;">
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:12px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;font-size:14px;">1</span>
          <p style="margin:5px 0 0;">Click <strong>Roster</strong>.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:12px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;font-size:14px;">2</span>
          <p style="margin:5px 0 0;">Click their name.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;font-size:14px;">3</span>
          <p style="margin:5px 0 0;">Update their role to <strong>Manager</strong>.</p>
        </div>
      </div>
      <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:14px 16px;margin-top:12px;">
        <p style="margin:0;color:#92400e;">Parent coaches should add a profile for themselves and their children using the program &mdash; just like you did initially.</p>
      </div>
    `,
  },
];
