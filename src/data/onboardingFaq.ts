export type FaqItem = { question: string; answer: string; category?: string };

export const ONBOARDING_FAQ: FaqItem[] = [
  {
    category: 'Accounts & Profiles',
    question: "What's the difference between the login email and the contact email, and how do I update them?",
    answer: `
      <p>Every account has a <strong>login email</strong> (used to sign in) and a <strong>contact email</strong> (where alerts go) &mdash; handy when a child has their own email but a parent created the account.</p>
      <div style="background:#eff6ff;border:1px solid #dbeafe;border-radius:12px;padding:20px;margin:16px 0;">
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">1</span>
          <p style="margin:6px 0 0;"><strong>Login email:</strong> Account Management &rarr; update your email.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">2</span>
          <p style="margin:6px 0 0;"><strong>Contact email:</strong> click Edit next to the profile &rarr; update it.</p>
        </div>
      </div>
    `,
  },
  {
    category: 'Accounts & Profiles',
    question: 'What if I have more than one child using the program?',
    answer: `
      <p>Add up to <strong>4 profiles per account</strong>, all under one login. Each can join the same or a different team, and a team code applies to all of them.</p>
      <div style="background:#eff6ff;border:1px solid #dbeafe;border-radius:12px;padding:20px;margin:16px 0;">
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">1</span>
          <p style="margin:6px 0 0;"><strong>Add a profile:</strong> log in &rarr; Add a Profile &rarr; Save.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">2</span>
          <p style="margin:6px 0 0;"><strong>Link profiles</strong> (for shared training credit): click the link icon next to a profile, then log in with the one to link.</p>
        </div>
      </div>
    `,
  },
  {
    category: 'Joining a Team',
    question: "Parents can't find our team — what should I do?",
    answer: `
      <p>The exact name may be different. A few options:</p>
      <div style="background:#eff6ff;border:1px solid #dbeafe;border-radius:12px;padding:20px;margin:16px 0;">
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">1</span>
          <p style="margin:6px 0 0;">Search <strong>part</strong> of the name (e.g. &ldquo;Anytime&rdquo; for &ldquo;Anytime Soccer Training&rdquo;).</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">2</span>
          <p style="margin:6px 0 0;">Re-invite from <strong>Manage &amp; Upgrade &rarr; New Player Onboard</strong> &mdash; the invite includes the correct team name.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">3</span>
          <p style="margin:6px 0 0;">Or send them the onboarding link we shared &mdash; it has instructions.</p>
        </div>
      </div>
    `,
  },
  {
    category: 'Team Management',
    question: 'How do I add players to my team?',
    answer: `
      <p>You can add players from the <strong>Manage &amp; Upgrade</strong> section.</p>
      <div style="background:#eff6ff;border-radius:8px;padding:16px 18px;">
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:12px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;font-size:14px;">1</span>
          <p style="margin:5px 0 0;">Click <strong>New Players Onboard</strong>.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:12px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;font-size:14px;">2</span>
          <p style="margin:5px 0 0;">Enter the player&rsquo;s email into <strong>Add Player</strong>.</p>
        </div>
        <p style="margin:0;">They&rsquo;ll get an invite; if they already have an account, they are automatically added.</p>
      </div>
    `,
  },
  {
    category: 'Team Management',
    question: 'How do I remove players from my team?',
    answer: `
      <div style="background:#eff6ff;border:1px solid #dbeafe;border-radius:12px;padding:20px;margin:16px 0;">
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">1</span>
          <p style="margin:6px 0 0;">Go to your team and click <strong>Roster</strong>.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">2</span>
          <p style="margin:6px 0 0;">Click the player&rsquo;s name.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">3</span>
          <p style="margin:6px 0 0;">From their profile, click <strong>Remove from Team</strong>.</p>
        </div>
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
        <p style="margin:0;">Prefer set-and-forget? Build a <strong>Weekly Training Plan</strong> &mdash; recurring, no upkeep.</p>
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
        <p style="margin:0 0 6px;"><span style="font-size:17px;">📅</span> <strong>Weekly Plan</strong></p>
        <p style="margin:0;color:#64748b;">Pulls from the full curriculum and puts the skill areas into each day of the week &mdash; delivered automatically.</p>
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
    question: "Players have joined the app, but they're not on my team",
    answer: `
      <p>Some players join the app but forget to join the team. You can automatically add them by <strong>re-inviting them</strong>.</p>
      <div style="background:#eff6ff;border:1px solid #dbeafe;border-radius:12px;padding:20px;margin:16px 0;">
        <p style="margin:0 0 8px;font-weight:700;color:#0F3154;">To re-invite a player:</p>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">1</span>
          <p style="margin:6px 0 0;">Go to your team and click <strong>Manage &amp; Upgrade</strong>.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">2</span>
          <p style="margin:6px 0 0;">Resend the invite.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">3</span>
          <p style="margin:6px 0 0;">They&rsquo;ll get an invite; if they already have an account, they are automatically added.</p>
        </div>
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
          <p style="margin:5px 0 0;"><strong>Weekly Plan</strong> &mdash; organizes the skill videos by day, delivering skill areas into each day automatically.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:12px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;font-size:14px;">2</span>
          <p style="margin:5px 0 0;"><strong>30-Day Monthly Plan</strong> &mdash; a guided month built from the 30-Day folders.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;font-size:14px;">3</span>
          <p style="margin:5px 0 0;"><strong>Custom Plan</strong> &mdash; folders you pick yourself.</p>
        </div>
      </div>
    `,
  },
  {
    category: 'Team Management',
    question: "My kids have not used the program as much as I expected. Any suggestions?",
    answer: `
      <p>A few quick moves to get your team going:</p>
      <p style="font-weight:700;color:#0F3154;margin:16px 0 8px;">In-app features</p>
      <div style="background:#eff6ff;border-radius:8px;padding:16px 18px;">
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:12px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;font-size:14px;">1</span>
          <p style="margin:5px 0 0;"><strong>Start a team contest</strong> and announce it at your next training.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;font-size:14px;">2</span>
          <p style="margin:5px 0 0;"><strong>Set a personal goal for every player</strong> &mdash; it&rsquo;s the biggest driver of consistency.</p>
        </div>
      </div>
      <p style="font-weight:700;color:#0F3154;margin:16px 0 8px;">In-person</p>
      <div style="background:#eff6ff;border-radius:8px;padding:16px 18px;">
        <div style="display:flex;gap:12px;align-items:flex-start;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;font-size:14px;">3</span>
          <p style="margin:5px 0 0;"><strong>Demo the app in person</strong> and give the players a specific video goal for that week.</p>
        </div>
      </div>
      <p>We understand that building habits can be difficult, but a little nudge on your part &mdash; and a <strong>specific, measurable goal</strong> &mdash; goes a long way.</p>
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
  {
    category: 'Team Management',
    question: 'Do my players need equipment and a lot of space?',
    answer: `
      <p><strong>No &mdash; just a ball.</strong> Most videos don&rsquo;t require any equipment, and when equipment is suggested it&rsquo;s normally optional.</p>
      <div style="background:#eff6ff;border-radius:8px;padding:14px 16px;">
        <p style="margin:0;">Players can follow along in a small space &mdash; a garage, driveway, backyard, or even a living room works.</p>
      </div>
      <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:14px 16px;margin-top:12px;">
        <p style="margin:0 0 8px;color:#92400e;font-weight:700;">A few exceptions:</p>
        <ul style="margin:0;color:#92400e;padding-left:18px;">
          <li style="margin-bottom:6px;"><strong>Wall passing</strong> needs a wall, rebounder, or other surface &mdash; or players can pass with a friend, sibling, or parent.</li>
          <li style="margin-bottom:6px;">Some <strong>fitness drills</strong> use common equipment.</li>
          <li><strong>Finishing drills</strong> require a goal.</li>
        </ul>
      </div>
    `,
  },
  {
    category: 'Team Management',
    question: 'What do successful coaches do differently?',
    answer: `
      <p>The difference usually comes down to a few simple habits.</p>
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:16px 18px;">
        <p style="margin:0 0 10px;color:#166534;font-weight:700;">✓ Successful coaches</p>
        <ul style="margin:0;color:#166534;padding-left:18px;">
          <li style="margin-bottom:6px;">Speak with parents during a team meeting and set clear expectations.</li>
          <li style="margin-bottom:6px;">Assign homework on Day 1.</li>
          <li style="margin-bottom:6px;">Set specific, measurable goals for their team.</li>
          <li style="margin-bottom:6px;">Create a team challenge (or other challenges) and announce it in person.</li>
          <li style="margin-bottom:6px;">Demo the app so players know how to use it.</li>
          <li style="margin-bottom:6px;">Acknowledge players at training for their progress.</li>
          <li style="margin-bottom:6px;">Personally check in on players who are not engaged.</li>
          <li style="margin-bottom:6px;">Give a regular nudge and check progress on the board.</li>
          <li>Keep it simple.</li>
        </ul>
      </div>
    `,
  },
  {
    category: 'Team Management',
    question: 'How to Assign',
    answer: `
      <p>Once you&rsquo;ve found a folder, assign it to your players in two steps.</p>
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
    question: 'How to Assign',
    answer: `
      <p>Once you&rsquo;ve chosen a plan, assign it in two steps.</p>
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
    question: 'What are weekly plans?',
    answer: `
      <p>Pulls from the <strong>full curriculum</strong> and puts the skill areas into <strong>each day of the week</strong> &mdash; delivered automatically.</p>
      <p style="font-weight:700;color:#0F3154;margin:16px 0 8px;">Key Features</p>
      <div style="background:#eff6ff;border-radius:8px;padding:16px 18px;">
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:12px;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;font-size:14px;">1</span>
          <p style="margin:5px 0 0;">Delivers <strong>single-move videos</strong> and <strong>review videos</strong>.</p>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start;">
          <span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;font-size:14px;">2</span>
          <p style="margin:5px 0 0;">Can <strong>auto-renew</strong> &mdash; set and forget.</p>
        </div>
      </div>
    `,
  },
  {
    category: 'Team Management',
    question: 'What are custom plans?',
    answer: `
      <p>Operate like the weekly plans, but only include the <strong>folders you select</strong>.</p>
      <div style="background:#eff6ff;border-radius:8px;padding:14px 16px;">
        <p style="margin:0;">For example, you can create a custom plan that includes only <strong>101 Ball Mastery</strong> folders and <strong>50 Top 1v1 Moves</strong> folders.</p>
      </div>
    `,
  },
  {
    category: 'Team Management',
    question: 'Coaches who struggle',
    answer: `
      <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:16px 18px;">
        <p style="margin:0 0 10px;color:#DC373E;font-weight:700;">✗ Coaches who struggle</p>
        <ul style="margin:0;color:#b91c1c;padding-left:18px;">
          <li style="margin-bottom:6px;">Don&rsquo;t meet and set clear expectations with the families.</li>
          <li style="margin-bottom:6px;">Don&rsquo;t actively assign homework.</li>
          <li style="margin-bottom:6px;">Never mention it at training.</li>
          <li style="margin-bottom:6px;">Assume the kids will do it on their own.</li>
          <li style="margin-bottom:6px;">Unintentionally make things complicated.</li>
          <li>Don&rsquo;t ask the Anytime team for help.</li>
        </ul>
      </div>
    `,
  },
  {
    category: 'Boosting Usage',
    question: 'My players are not using the program as much as I expected',
    answer: `
      <p>Over the next few pages we&rsquo;ll share <strong>suggestions that have proven to increase participation</strong>.</p>
      <p>To help support you, we&rsquo;re asking in advance if these are tactics you will consider.</p>
    `,
  },
  {
    category: 'Boosting Usage',
    question: 'Start a team contest',
    answer: `
      <p>A great way to boost participation is to <strong>start a team contest</strong>.</p>
      <p>Create a contest inside the app and set a prize for the team and highest ranking player.</p>
    `,
  },
  {
    category: 'Boosting Usage',
    question: 'Set a personal goal for every player',
    answer: `
      <p>This is the single biggest driver of consistency &mdash; when a player has their own target, they show up.</p>
      <div style="background:#eff6ff;border:1px solid #dbeafe;border-radius:12px;padding:16px 18px;margin:16px 0;">
        <p style="margin:0;color:#0F3154;font-weight:600;">From your team menu, click <strong>Set Personal Challenge</strong>. It takes seconds.</p>
      </div>
    `,
  },
  {
    category: 'Boosting Usage',
    question: 'Demo the app in person',
    answer: `
      <p><strong>Show the app at training</strong> and make sure players know how to access their homework.</p>
      <p>Before or after practice show the app and make sure everyone knows how to access the homework.</p>
    `,
  },
  {
    category: 'Getting Started',
    question: 'What are your expectations?',
    answer: `
    `,
  },
  {
    category: 'Roster FAQs',
    question: 'Coach Contact',
    answer: `
      <div style="background:#eff6ff;border:1px solid #dbeafe;border-radius:12px;padding:18px 20px;margin:8px 0;">
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:12px;"><span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">1</span><p style="margin:4px 0 0;"><strong>Phone number</strong> &mdash; include the coach&rsquo;s phone number.</p></div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:12px;"><span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">2</span><p style="margin:4px 0 0;">Include the coach on the roster and indicate they&rsquo;re the coach &mdash; their child will be the player on the same line.</p></div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:12px;"><span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">3</span><p style="margin:4px 0 0;">Don&rsquo;t have a player? Leave the player name blank.</p></div>
        <div style="display:flex;gap:12px;align-items:flex-start;"><span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">4</span><p style="margin:4px 0 0;">Teams can have multiple coaches. Once they join, you will update their role as team manager.</p></div>
      </div>
    `,
  },
  {
    category: 'Roster FAQs',
    question: 'Parent Emails & Roster',
    answer: `
      <div style="background:#eff6ff;border:1px solid #dbeafe;border-radius:12px;padding:18px 20px;margin:8px 0;">
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:12px;"><span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">1</span><p style="margin:4px 0 0;">You can provide more than one parent email &mdash; both parents will get the invite and can decide who signs up.</p></div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:12px;"><span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">2</span><p style="margin:4px 0 0;">You can submit a partial roster and add players later.</p></div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:12px;"><span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">3</span><p style="margin:4px 0 0;">Multiple children? Provide a line for each child using the same email.</p></div>
        <div style="display:flex;gap:12px;align-items:flex-start;"><span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">4</span><p style="margin:4px 0 0;">Users can update their emails inside the app at any time.</p></div>
      </div>
    `,
  },
  {
    category: 'Roster FAQs',
    question: 'More on Emails',
    answer: `
      <div style="background:#eff6ff;border:1px solid #dbeafe;border-radius:12px;padding:18px 20px;margin:8px 0;">
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:12px;"><span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">1</span><p style="margin:4px 0 0;">Parents can also sign up with a different email than the one you provided in the roster.</p></div>
        <div style="display:flex;gap:12px;align-items:flex-start;"><span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">2</span><p style="margin:4px 0 0;">Older players can provide their email if they&rsquo;ll be the account creator.</p></div>
      </div>
    `,
  },
  {
    category: 'Roster FAQs',
    question: 'Adding Players Later',
    answer: `
      <div style="background:#eff6ff;border:1px solid #dbeafe;border-radius:12px;padding:18px 20px;margin:8px 0;">
        <div style="display:flex;gap:12px;align-items:flex-start;"><span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">1</span><p style="margin:4px 0 0;">Once we onboard the initial roster, you can add them directly in the app via the <strong>Manage &amp; Upgrade</strong> tab or send them to us using the roster template.</p></div>
      </div>
    `,
  },
  {
    category: 'Roster FAQs',
    question: 'Player Turnover',
    answer: `
      <div style="background:#eff6ff;border:1px solid #dbeafe;border-radius:12px;padding:18px 20px;margin:8px 0;">
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:12px;"><span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">1</span><p style="margin:4px 0 0;">You can remove a player from your team anytime.</p></div>
        <div style="display:flex;gap:12px;align-items:flex-start;"><span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">2</span><p style="margin:4px 0 0;">Their account and 365-day access stay with them.</p></div>
      </div>
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:14px 18px;margin:14px 0 0;">
        <p style="margin:0;color:#166534;">New players are additions &mdash; not replacements for a player who left. Upgrades are only $10 per player per year.</p>
      </div>
    `,
  },
  {
    category: "Team Management",
    question: "How do I change my team name?",
    answer: `
      <div style="background:#eff6ff;border:1px solid #dbeafe;border-radius:12px;padding:18px 20px;margin:8px 0;">
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:12px;"><span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">1</span><p style="margin:4px 0 0;">Go to <strong>your team</strong>.</p></div>
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:12px;"><span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">2</span><p style="margin:4px 0 0;">Click <strong>Edit Team</strong> in the side menu.</p></div>
        <div style="display:flex;gap:12px;align-items:flex-start;"><span style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#0F3154;color:#fff;font-weight:700;">3</span><p style="margin:4px 0 0;">Change the name and save.</p></div>
      </div>
      <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:10px;padding:14px 18px;margin:14px 0 0;">
        <p style="margin:0;color:#991b1b;"><strong>Wait until every player has joined before changing the name.</strong> Players search for your team by name to join &mdash; rename it early and the ones who have not joined yet will not find you.</p>
      </div>
    `,
  },
];
