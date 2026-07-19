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
      <p>Sometimes the team name is slightly different, so the exact full name may not turn up. A few things that help:</p>
      <div style="background:#eff6ff;border-radius:8px;padding:14px 16px;">
        <ul style="margin:0;">
          <li>Have them search <strong>part</strong> of the name (e.g. &ldquo;Next&rdquo; for &ldquo;Next Level AS - Group 2&rdquo;).</li>
          <li>Re-invite them from <strong>New Players &rarr; Player Onboard</strong>.</li>
          <li>Or send them the onboarding link we shared with you &mdash; it has step-by-step instructions.</li>
        </ul>
      </div>
      <p>Still stuck? Email <a href="mailto:megan@anytime-soccer.com" style="color:#0F3154;font-weight:600;">megan@anytime-soccer.com</a>.</p>
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
        <p style="margin:0;">If they already have an Anytime Soccer Training account, they&rsquo;ll automatically be added to the team. If not, click the invite button in the app.</p>
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
      <p>Totals, streaks, and levels stay intact, and completed videos count on the new team right away. Changing teams never resets progress.</p>
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
        <p style="margin:0;"><strong>To re-invite a player:</strong> go to your team, open the <strong>Player Onboard</strong> page, and resend the invite. Anyone already on the app is automatically added to the team.</p>
      </div>
    `,
  },
  {
    category: 'Team Management',
    question: 'What are the 30-day plans?',
    answer: `
      <p>The full video curriculum introduces <strong>one move at a time</strong>, then combines them. Our 30-day plans select only the <strong>review videos</strong> &mdash; estimated to take about <strong>30 days</strong> to finish.</p>
      <div style="background:#eff6ff;border-radius:8px;padding:14px 16px;">
        <p style="margin:0;">Review videos include <strong>4&ndash;6 moves per video</strong>, making them excellent for touching most skills in a truncated way.</p>
      </div>
    `,
  },
  {
    category: 'Team Management',
    question: 'How do I assign homework?',
    answer: `
      <p>Homework is organized into <strong>3 key categories</strong>:</p>
      <div style="background:#eff6ff;border-radius:8px;padding:14px 16px;">
        <ul style="margin:0;">
          <li><strong>Program Folders</strong></li>
          <li><strong>Recurring Training Plans</strong></li>
          <li><strong>Favorites (custom folders)</strong></li>
        </ul>
      </div>
      <p>We&rsquo;ll go over each one in the next few pages.</p>
    `,
  },
  {
    category: 'Team Management',
    question: 'Assigning Program Folders',
    answer: `
      <p>Training is organized by <strong>skill areas</strong>, <strong>programs</strong>, and <strong>folders</strong> &mdash; the folders house the videos.</p>
      <p style="font-weight:700;color:#0F3154;margin:16px 0 8px;">Types of Folders</p>
      <div style="background:#eff6ff;border-radius:8px;padding:14px 16px;">
        <ul style="margin:0;">
          <li><strong>Curated Curriculum</strong> &mdash; folders by skill area, in our recommended order (rotates programs for variety).</li>
          <li><strong>All Programs</strong> &mdash; every folder in a program within a skill area.</li>
          <li><strong>30-Day Plans</strong> &mdash; 30-day plans by skill area.</li>
          <li><strong>Favorites</strong> &mdash; your own folders (add videos in Key Skills).</li>
        </ul>
      </div>
      <p style="font-weight:700;color:#0F3154;margin:16px 0 8px;">How to Assign</p>
      <div style="background:#eff6ff;border-radius:8px;padding:14px 16px;">
        <p style="margin:0;">Click <strong>pin/board</strong> next to a folder, then the <strong>person icon</strong>, and select your players.</p>
      </div>
    `,
  },
  {
    category: 'Team Management',
    question: 'Assigning training plans',
    answer: `
      <p>From the <strong>Coach&rsquo;s Board</strong>, click <strong>Build Training Plan</strong>. You build the plan, then <strong>assign it the same way you assign folders</strong>.</p>
      <div style="background:#eff6ff;border-radius:8px;padding:14px 16px;">
        <p style="margin:0 0 8px;"><strong>The quick differences:</strong></p>
        <ul style="margin:0;padding-left:20px;list-style:disc;">
          <li style="margin-bottom:8px;"><strong>Skill Builder</strong> &mdash; pulls from the full curriculum by skill area.</li>
          <li style="margin-bottom:8px;"><strong>Weekly Plan</strong> &mdash; delivers skill areas into each day automatically.</li>
          <li style="margin-bottom:8px;"><strong>30-Day Monthly Plan</strong> &mdash; a guided month built from the 30-Day folders.</li>
          <li><strong>Custom Plan</strong> &mdash; folders you pick yourself.</li>
        </ul>
      </div>
    `,
  },
  {
    category: 'Team Management',
    question: "My kids have not used the program as much as I expected. Any suggestions?",
    answer: `
      <p>It happens &mdash; sometimes a team just needs a little spark to get going, and a couple of small moves can make a big difference.</p>
      <div style="background:#eff6ff;border-radius:8px;padding:14px 16px;">
        <p style="margin:0 0 8px;"><strong>We recommend:</strong></p>
        <ul style="margin:0;padding-left:20px;list-style:disc;">
          <li style="margin-bottom:8px;">Creating a <strong>team contest</strong> and making an <strong>announcement during training</strong>.</li>
          <li>Setting each player a <strong>personal goal</strong> &mdash; personal goals really motivate players to stay consistent.</li>
        </ul>
      </div>
      <p>Want ideas for your team? Email <a href="mailto:megan@anytime-soccer.com" style="color:#0F3154;font-weight:600;">megan@anytime-soccer.com</a> &mdash; we&rsquo;ll help you get things moving.</p>
    `,
  },
];
