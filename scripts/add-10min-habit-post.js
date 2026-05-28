const fs = require('fs');
const path = require('path');

const postsPath = path.join(__dirname, '../src/data/posts.json');
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));

// Check if post already exists
if (posts.find(p => p.slug === '10-minute-habit-home-soccer-training-stick')) {
  console.log('Post already exists, skipping.');
  process.exit(0);
}

const content = `<div class="post-content">

<p style="font-size:0.82em;font-weight:700;color:#DC373E;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:10px;display:inline-block;background:#FFF1F2;padding:4px 12px;border-radius:20px;">Home Training &amp; Habit Building</p>

<p style="font-size:1em;line-height:1.85;color:#374151;">Let me tell you about the version of myself I'm not proud of.</p>

<p style="font-size:1em;line-height:1.85;color:#374151;">It was a Tuesday evening, maybe six months into training my son Adam at home. I had a whole plan — cones set up in the backyard, a YouTube playlist queued up, a notebook with drills I'd researched. Adam came outside, took one look at the setup, and said he was tired.</p>

<p style="font-size:1em;line-height:1.85;color:#374151;">I pushed. He resisted. We argued. He cried. I felt terrible. Nothing got done.</p>

<p style="font-size:1em;line-height:1.85;color:#374151;">That night I sat on the back porch and asked myself a hard question: <em>Why is this so difficult?</em></p>

<p style="font-size:1em;line-height:1.85;color:#374151;">The answer, when I finally found it, had nothing to do with drills, equipment, or even Adam's attitude. It had everything to do with the way I was thinking about training.</p>

<div style="display:flex;align-items:center;gap:16px;margin:52px 0 8px;"><div style="background:linear-gradient(135deg,#DC373E,#b91c1c);color:#fff;font-size:1em;font-weight:800;width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 4px 12px rgba(220,55,62,0.35);">1</div><h2 style="font-size:1.6em;font-weight:800;color:#0F3154;margin:0;line-height:1.25;">The Motivation Trap</h2></div>

<p style="font-size:1em;line-height:1.85;color:#374151;">Most parents approach home training the same way I did in the beginning: with a burst of motivation.</p>

<p style="font-size:1em;line-height:1.85;color:#374151;">You watch a game, you see your child get passed up for the ball three times in a row, and something clicks. <em>We need to do more.</em> So you set up a big session. You block out an hour on Saturday. You find a bunch of drills. You're fired up.</p>

<p style="font-size:1em;line-height:1.85;color:#374151;">And it works — for about two weeks. Then life gets in the way. Saturday's session gets pushed to Sunday, then doesn't happen at all. The motivation fades. The cones sit in the garage. And your child picks up the unconscious message that home training is something you do when you feel like it, which means it's something that doesn't really matter.</p>

<div style="position:relative;background:linear-gradient(135deg,#F8FAFF 0%,#EEF4FF 100%);border-radius:16px;padding:32px 36px 28px;margin:32px 0;overflow:hidden;border:1px solid #C7D7FA;box-shadow:0 2px 12px rgba(15,49,84,0.07);"><div style="position:absolute;top:-10px;left:20px;font-size:7em;color:rgba(15,49,84,0.06);font-family:Georgia,serif;line-height:1;pointer-events:none;">&ldquo;</div><p style="font-size:1.08em;font-style:italic;color:#0F3154;line-height:1.75;margin:0;position:relative;z-index:1;">Motivation is a feeling. Feelings come and go. Habits are structural — they run on autopilot once they're built, regardless of how anyone feels on a given Tuesday.</p><p style="font-size:0.82em;font-weight:700;color:#DC373E;margin:14px 0 0;letter-spacing:0.05em;text-transform:uppercase;">&mdash; Neil Crawford</p></div>

<p style="font-size:1em;line-height:1.85;color:#374151;">The goal isn't to train when you're motivated. The goal is to build a system that runs whether you're motivated or not.</p>

<div style="background:linear-gradient(135deg,#ecfdf5,#d1fae5);border:1px solid #6ee7b7;border-radius:14px;padding:18px 22px;margin:32px 0;display:flex;gap:14px;align-items:flex-start;box-shadow:0 2px 12px rgba(16,185,129,0.1);"><div style="background:#10b981;border-radius:8px;padding:6px 8px;flex-shrink:0;margin-top:2px;font-size:1em;">&#9889;</div><div><p style="font-size:0.76em;font-weight:800;color:#065f46;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 5px;">Quick Tip</p><p style="font-size:0.93em;color:#064e3b;margin:0;line-height:1.65;"><strong>Stop chasing motivation. Start chasing consistency.</strong> This week, pick just one day to do a 5-minute training session. Just one. Protect it like an appointment. Start there — not with a full schedule.</p></div></div>

<div style="display:flex;align-items:center;gap:16px;margin:52px 0 8px;"><div style="background:linear-gradient(135deg,#DC373E,#b91c1c);color:#fff;font-size:1em;font-weight:800;width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 4px 12px rgba(220,55,62,0.35);">2</div><h2 style="font-size:1.6em;font-weight:800;color:#0F3154;margin:0;line-height:1.25;">Why 10 Minutes Is the Magic Number</h2></div>

<p style="font-size:1em;line-height:1.85;color:#374151;">When I tell parents that 10 minutes a day is enough to build elite-level ball skills, they usually look at me like I'm underselling it.</p>

<p style="font-size:1em;line-height:1.85;color:#374151;">They're thinking about what they see at club practice: 90-minute sessions, dozens of kids, cones everywhere, coaches running drills. Surely more time equals more development?</p>

<p style="font-size:1em;line-height:1.85;color:#374151;">Here's the thing most people don't know: in a typical 90-minute club practice, your child gets somewhere between 50 and 100 touches on the ball. The rest of the time is spent waiting in line, listening to instructions, doing team shape work, and scrimmaging — all valuable, but not high-repetition skill development.</p>

<div style="overflow-x:auto;margin:28px 0;border-radius:14px;box-shadow:0 2px 16px rgba(15,49,84,0.08);border:1px solid #E1E8EF;overflow:hidden;"><table style="width:100%;border-collapse:collapse;min-width:500px;"><thead><tr><th style="padding:12px 16px;text-align:left;font-size:0.8em;font-weight:800;color:#fff;letter-spacing:0.07em;text-transform:uppercase;background:#0F3154;">Training Type</th><th style="padding:12px 16px;text-align:left;font-size:0.8em;font-weight:800;color:#fff;letter-spacing:0.07em;text-transform:uppercase;background:#475569;">Duration</th><th style="padding:12px 16px;text-align:left;font-size:0.8em;font-weight:800;color:#fff;letter-spacing:0.07em;text-transform:uppercase;background:#DC373E;">Ball Touches</th></tr></thead><tbody><tr style="background:#ffffff;"><td style="padding:13px 16px;font-size:0.9em;color:#374151;border-bottom:1px solid #E1E8EF;">Club Practice</td><td style="padding:13px 16px;font-size:0.9em;color:#374151;border-bottom:1px solid #E1E8EF;">90 minutes</td><td style="padding:13px 16px;font-size:0.9em;color:#374151;border-bottom:1px solid #E1E8EF;">50–100 touches</td></tr><tr style="background:#F8FAFC;"><td style="padding:13px 16px;font-size:0.9em;color:#374151;border-bottom:1px solid #E1E8EF;">Home Ball Mastery Session</td><td style="padding:13px 16px;font-size:0.9em;color:#374151;border-bottom:1px solid #E1E8EF;">10 minutes</td><td style="padding:13px 16px;font-size:0.9em;font-weight:700;color:#DC373E;border-bottom:1px solid #E1E8EF;">500+ touches</td></tr><tr style="background:#ffffff;"><td style="padding:13px 16px;font-size:0.9em;color:#374151;">Home Training (Full Week)</td><td style="padding:13px 16px;font-size:0.9em;color:#374151;">10 min × 7 days</td><td style="padding:13px 16px;font-size:0.9em;font-weight:800;color:#10b981;">3,500+ touches</td></tr></tbody></table></div>

<p style="font-size:1em;line-height:1.85;color:#374151;">That's the math. And it compounds every single day. A child who does 10 minutes of focused home training daily accumulates more quality touches in a single week than most players get in a month of club practice alone. Over a full season, that gap becomes a skill chasm that coaches notice — and that parents can't explain any other way.</p>

<p style="font-size:1em;line-height:1.85;color:#374151;">But here's the catch: those 10 minutes have to actually happen. <strong>Consistently.</strong> Not when you feel like it. Not when there's nothing else going on. Every day.</p>

<div style="background:linear-gradient(135deg,#ecfdf5,#d1fae5);border:1px solid #6ee7b7;border-radius:14px;padding:18px 22px;margin:32px 0;display:flex;gap:14px;align-items:flex-start;box-shadow:0 2px 12px rgba(16,185,129,0.1);"><div style="background:#10b981;border-radius:8px;padding:6px 8px;flex-shrink:0;margin-top:2px;font-size:1em;">&#9889;</div><div><p style="font-size:0.76em;font-weight:800;color:#065f46;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 5px;">Quick Tip</p><p style="font-size:0.93em;color:#064e3b;margin:0;line-height:1.65;"><strong>Count your child's actual ball touches at their next practice.</strong> You'll stop thinking 90 minutes is enough. Then count their touches in a 10-minute ball mastery session at home. The numbers don't lie — and once you see them, it changes how you think about home training forever.</p></div></div>

<div style="background:linear-gradient(135deg,#0F3154,#1e4a73);border-radius:20px;padding:28px 32px;margin:40px 0;display:flex;align-items:center;gap:28px;flex-wrap:wrap;box-shadow:0 4px 24px rgba(15,49,84,0.2);">
  <div style="flex:1;min-width:200px;">
    <p style="font-size:0.75em;font-weight:800;color:#93c5fd;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 6px;">Recommended Gear</p>
    <p style="font-size:1.1em;font-weight:800;color:#fff;margin:0 0 4px;line-height:1.3;">Size 1 Soccer Ball</p>
    <p style="font-size:0.88em;color:rgba(255,255,255,0.7);margin:0;line-height:1.5;">The best tool for ball mastery. Smaller ball = more control = faster skill development.</p>
  </div>
  <a href="https://amzn.to/4aM3st9" target="_blank" rel="noopener noreferrer" style="background:#DC373E;color:#fff;font-weight:800;font-size:0.9em;padding:12px 24px;border-radius:50px;text-decoration:none;white-space:nowrap;box-shadow:0 4px 16px rgba(220,55,62,0.4);flex-shrink:0;">Shop on Amazon &rarr;</a>
</div>

<div style="display:flex;align-items:center;gap:16px;margin:52px 0 8px;"><div style="background:linear-gradient(135deg,#DC373E,#b91c1c);color:#fff;font-size:1em;font-weight:800;width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 4px 12px rgba(220,55,62,0.35);">3</div><h2 style="font-size:1.6em;font-weight:800;color:#0F3154;margin:0;line-height:1.25;">The Science of Habit Formation (In Plain English)</h2></div>

<p style="font-size:1em;line-height:1.85;color:#374151;">You don't need to read a book on behavioral psychology to understand how habits work. The basics are simple.</p>

<p style="font-size:1em;line-height:1.85;color:#374151;">Habits form when a behavior gets attached to a <strong>cue</strong> — something that reliably signals it's time to do the thing. The cue triggers the behavior. The behavior produces a reward. Over time, the brain automates the sequence.</p>

<div style="overflow-x:auto;margin:28px 0;border-radius:14px;box-shadow:0 2px 16px rgba(15,49,84,0.08);border:1px solid #E1E8EF;overflow:hidden;"><table style="width:100%;border-collapse:collapse;min-width:400px;"><thead><tr><th style="padding:12px 16px;text-align:left;font-size:0.8em;font-weight:800;color:#fff;letter-spacing:0.07em;text-transform:uppercase;background:#0F3154;">Stage</th><th style="padding:12px 16px;text-align:left;font-size:0.8em;font-weight:800;color:#fff;letter-spacing:0.07em;text-transform:uppercase;background:#475569;">What It Is</th><th style="padding:12px 16px;text-align:left;font-size:0.8em;font-weight:800;color:#fff;letter-spacing:0.07em;text-transform:uppercase;background:#DC373E;">Home Training Example</th></tr></thead><tbody><tr style="background:#ffffff;"><td style="padding:13px 16px;font-size:0.9em;font-weight:700;color:#0F3154;border-bottom:1px solid #E1E8EF;">Cue</td><td style="padding:13px 16px;font-size:0.9em;color:#374151;border-bottom:1px solid #E1E8EF;">Automatic trigger</td><td style="padding:13px 16px;font-size:0.9em;color:#374151;border-bottom:1px solid #E1E8EF;">Put on school shoes → ball goes on porch</td></tr><tr style="background:#F8FAFC;"><td style="padding:13px 16px;font-size:0.9em;font-weight:700;color:#0F3154;border-bottom:1px solid #E1E8EF;">Routine</td><td style="padding:13px 16px;font-size:0.9em;color:#374151;border-bottom:1px solid #E1E8EF;">The behavior itself</td><td style="padding:13px 16px;font-size:0.9em;color:#374151;border-bottom:1px solid #E1E8EF;">10-minute ball mastery session before school</td></tr><tr style="background:#ffffff;"><td style="padding:13px 16px;font-size:0.9em;font-weight:700;color:#0F3154;">Reward</td><td style="padding:13px 16px;font-size:0.9em;color:#374151;">The payoff that locks it in</td><td style="padding:13px 16px;font-size:0.9em;color:#374151;">X on the calendar, coach compliment at practice</td></tr></tbody></table></div>

<p style="font-size:1em;line-height:1.85;color:#374151;">The problem with most home training attempts is that there's no reliable cue. "We'll train after dinner" is not a cue — it's an intention. Intentions require willpower. Willpower is finite. At the end of a school day, after homework and dinner, there's not much willpower left in a 10-year-old.</p>

<p style="font-size:1em;line-height:1.85;color:#374151;">A cue is specific, automatic, and already part of your existing routine. The most powerful cues for home training are ones that <strong>stack onto something you already do every day without thinking.</strong></p>

<div style="background:linear-gradient(135deg,#ecfdf5,#d1fae5);border:1px solid #6ee7b7;border-radius:14px;padding:18px 22px;margin:32px 0;display:flex;gap:14px;align-items:flex-start;box-shadow:0 2px 12px rgba(16,185,129,0.1);"><div style="background:#10b981;border-radius:8px;padding:6px 8px;flex-shrink:0;margin-top:2px;font-size:1em;">&#9889;</div><div><p style="font-size:0.76em;font-weight:800;color:#065f46;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 5px;">Quick Tip</p><p style="font-size:0.93em;color:#064e3b;margin:0;line-height:1.65;"><strong>Tonight, identify one existing habit your child does automatically every day</strong> — tying shoes before school, grabbing their backpack, eating breakfast. That's your cue. You don't create the habit from scratch. You <em>attach</em> the new behavior to the old one.</p></div></div>

<div style="display:flex;align-items:center;gap:16px;margin:52px 0 8px;"><div style="background:linear-gradient(135deg,#DC373E,#b91c1c);color:#fff;font-size:1em;font-weight:800;width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 4px 12px rgba(220,55,62,0.35);">4</div><h2 style="font-size:1.6em;font-weight:800;color:#0F3154;margin:0;line-height:1.25;">The 4-Step System That Actually Works</h2></div>

<p style="font-size:1em;line-height:1.85;color:#374151;">Here's exactly what worked for us, and what I've seen work for hundreds of families in the Anytime Soccer Training community.</p>

<div style="background:#F8FAFC;border:1px solid #E1E8EF;border-radius:16px;padding:24px 28px;margin:28px 0;">
<p style="font-size:0.82em;font-weight:800;color:#DC373E;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 18px;">Step 1 — Pick One Anchor</p>
<p style="font-size:1em;line-height:1.85;color:#374151;margin:0 0 14px;">An anchor is the existing routine you'll attach training to. It should happen at the same time every day, require no decision-making, and already be fully automatic.</p>
<p style="font-size:0.9em;font-weight:700;color:#0F3154;margin:0 0 10px;">The best anchors:</p>
<ul style="margin:0;padding-left:22px;line-height:1.9;font-size:0.95em;color:#374151;">
  <li><strong>Before school</strong> — Day hasn't started, no one is tired, and there's a natural time limit. Adam trained this way for three years.</li>
  <li><strong>Right after school, before anything else</strong> — Key word: <em>before</em>. Before screens, snacks, or sitting down. Once a kid sits, momentum is gone.</li>
  <li><strong>Before club practice</strong> — Your child arrives already warm, already sharp, already having touched the ball 500 times. Coaches notice.</li>
</ul>
</div>

<div style="background:linear-gradient(135deg,#ecfdf5,#d1fae5);border:1px solid #6ee7b7;border-radius:14px;padding:18px 22px;margin:28px 0;display:flex;gap:14px;align-items:flex-start;box-shadow:0 2px 12px rgba(16,185,129,0.1);"><div style="background:#10b981;border-radius:8px;padding:6px 8px;flex-shrink:0;margin-top:2px;font-size:1em;">&#9889;</div><div><p style="font-size:0.76em;font-weight:800;color:#065f46;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 5px;">Quick Tip: Step 1</p><p style="font-size:0.93em;color:#064e3b;margin:0;line-height:1.65;"><strong>Right now, text yourself one word:</strong> "before school," "after school," or "before practice." That's your anchor. Don't decide later. Decide now while it's on your mind — the act of choosing is step one.</p></div></div>

<div style="background:#F8FAFC;border:1px solid #E1E8EF;border-radius:16px;padding:24px 28px;margin:28px 0;">
<p style="font-size:0.82em;font-weight:800;color:#DC373E;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 18px;">Step 2 — Make It Impossibly Easy to Start</p>
<p style="font-size:1em;line-height:1.85;color:#374151;margin:0 0 14px;">The biggest enemy of habit formation is friction. Remove every obstacle in advance:</p>
<ul style="margin:0;padding-left:22px;line-height:1.9;font-size:0.95em;color:#374151;">
  <li>Ball stays in the same spot, always — by the back door, in the garage</li>
  <li>No setup required — ball mastery needs nothing but a ball and a small patch of ground</li>
  <li>The session is already chosen — press play and follow along</li>
</ul>
<p style="font-size:0.95em;line-height:1.75;color:#374151;margin:14px 0 0;"><strong>The goal for the first 30 days:</strong> lower the bar so far that saying no feels harder than saying yes.</p>
</div>

<div style="background:linear-gradient(135deg,#ecfdf5,#d1fae5);border:1px solid #6ee7b7;border-radius:14px;padding:18px 22px;margin:28px 0;display:flex;gap:14px;align-items:flex-start;box-shadow:0 2px 12px rgba(16,185,129,0.1);"><div style="background:#10b981;border-radius:8px;padding:6px 8px;flex-shrink:0;margin-top:2px;font-size:1em;">&#9889;</div><div><p style="font-size:0.76em;font-weight:800;color:#065f46;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 5px;">Quick Tip: Step 2</p><p style="font-size:0.93em;color:#064e3b;margin:0;line-height:1.65;"><strong>Physically move the ball right now.</strong> Put it by the back door, or wherever training will happen. This one act eliminates the #1 reason kids skip — "I couldn't find the ball." No friction means no excuses.</p></div></div>

<div style="background:#F8FAFC;border:1px solid #E1E8EF;border-radius:16px;padding:24px 28px;margin:28px 0;">
<p style="font-size:0.82em;font-weight:800;color:#DC373E;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 18px;">Step 3 — Start With Less Than You Think You Need</p>
<p style="font-size:1em;line-height:1.85;color:#374151;margin:0 0 14px;">Counterintuitive but critical: <strong>start with less.</strong> Not an hour. Not 30 minutes. Ten minutes. Maybe even five for the first week.</p>
<p style="font-size:0.95em;line-height:1.75;color:#374151;margin:0;">The goal in the beginning is not fitness or skill — it's <strong>the identity of being someone who trains every day.</strong> That identity is built through repetition, not duration. A 5-minute session that happens every day for 30 days does more for habit formation than a 45-minute session that happens twice.</p>
</div>

<div style="background:linear-gradient(135deg,#ecfdf5,#d1fae5);border:1px solid #6ee7b7;border-radius:14px;padding:18px 22px;margin:28px 0;display:flex;gap:14px;align-items:flex-start;box-shadow:0 2px 12px rgba(16,185,129,0.1);"><div style="background:#10b981;border-radius:8px;padding:6px 8px;flex-shrink:0;margin-top:2px;font-size:1em;">&#9889;</div><div><p style="font-size:0.76em;font-weight:800;color:#065f46;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 5px;">Quick Tip: Step 3</p><p style="font-size:0.93em;color:#064e3b;margin:0;line-height:1.65;"><strong>Tell your child: "We're only doing 5 minutes today."</strong> Watch what happens — most kids keep going past 5 minutes once they're out there. But even if they stop at 5, that's a win. You protected the streak. That's the whole game in month one.</p></div></div>

<div style="background:#F8FAFC;border:1px solid #E1E8EF;border-radius:16px;padding:24px 28px;margin:28px 0;">
<p style="font-size:0.82em;font-weight:800;color:#DC373E;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 18px;">Step 4 — Make the Win Visible</p>
<p style="font-size:1em;line-height:1.85;color:#374151;margin:0 0 14px;">Kids are motivated by progress they can see:</p>
<ul style="margin:0;padding-left:22px;line-height:1.9;font-size:0.95em;color:#374151;">
  <li><strong>A simple calendar on the fridge.</strong> Every day they train, they put an X. The chain of X's becomes its own motivation — no one wants to break the streak.</li>
  <li><strong>Video checkpoints.</strong> Every two weeks, record a short clip of the same skill. The improvement is often dramatic and kids love seeing it.</li>
  <li><strong>Connect the dots at practice.</strong> When a coach comments on first touch or ball control, say: "That's from all those sessions before school." Make the connection explicit.</li>
</ul>
</div>

<div style="background:linear-gradient(135deg,#ecfdf5,#d1fae5);border:1px solid #6ee7b7;border-radius:14px;padding:18px 22px;margin:28px 0;display:flex;gap:14px;align-items:flex-start;box-shadow:0 2px 12px rgba(16,185,129,0.1);"><div style="background:#10b981;border-radius:8px;padding:6px 8px;flex-shrink:0;margin-top:2px;font-size:1em;">&#9889;</div><div><p style="font-size:0.76em;font-weight:800;color:#065f46;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 5px;">Quick Tip: Step 4</p><p style="font-size:0.93em;color:#064e3b;margin:0;line-height:1.65;"><strong>Print a blank monthly calendar — right now.</strong> Hang it on the fridge. Hand your child a marker. Tell them their only job this month is to put an X on every day they train. That visual chain will do more motivational heavy lifting than any pep talk you could give.</p></div></div>

<div style="background:linear-gradient(135deg,#FFF7ED,#FFEDD5);border-radius:20px;padding:28px 32px;margin:44px 0;border:1px solid #FED7AA;box-shadow:0 4px 20px rgba(234,88,12,0.08);">
  <p style="font-size:0.75em;font-weight:800;color:#ea580c;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 8px;">Free Resource</p>
  <p style="font-size:1.1em;font-weight:800;color:#0F3154;margin:0 0 6px;">Don't Want to Figure Out What to Train?</p>
  <p style="font-size:0.92em;color:#374151;line-height:1.65;margin:0 0 18px;">Our free 7-Day Training Plan removes every friction point — seven follow-along sessions your child can start today, no coaching experience required. Structured. Engaging. Under 10 minutes each.</p>
  <a href="https://www.anytime-soccer.com/blog/free-7-day-soccer-skills-challenge" style="display:inline-block;background:#DC373E;color:#fff;font-weight:800;font-size:0.9em;padding:12px 24px;border-radius:50px;text-decoration:none;box-shadow:0 4px 16px rgba(220,55,62,0.35);">Get the Free 7-Day Plan &rarr;</a>
</div>

<div style="display:flex;align-items:center;gap:16px;margin:52px 0 8px;"><div style="background:linear-gradient(135deg,#DC373E,#b91c1c);color:#fff;font-size:1em;font-weight:800;width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 4px 12px rgba(220,55,62,0.35);">5</div><h2 style="font-size:1.6em;font-weight:800;color:#0F3154;margin:0;line-height:1.25;">The Parent's Role: Show Up, Don't Coach</h2></div>

<p style="font-size:1em;line-height:1.85;color:#374151;">This might be the most important section in this entire post, and it's the one I got wrong the longest.</p>

<p style="font-size:1em;line-height:1.85;color:#374151;">When I started training Adam at home, I thought my job was to teach. I'd research drills, explain technique, offer corrections. I had no soccer background, but I compensated by over-preparing.</p>

<p style="font-size:1em;line-height:1.85;color:#374151;">The result? Adam started dreading our sessions. The backyard became a place where Dad criticized him, not a place where he got to play with a ball.</p>

<div style="position:relative;background:linear-gradient(135deg,#F8FAFF 0%,#EEF4FF 100%);border-radius:16px;padding:32px 36px 28px;margin:32px 0;overflow:hidden;border:1px solid #C7D7FA;box-shadow:0 2px 12px rgba(15,49,84,0.07);"><div style="position:absolute;top:-10px;left:20px;font-size:7em;color:rgba(15,49,84,0.06);font-family:Georgia,serif;line-height:1;pointer-events:none;">&ldquo;</div><p style="font-size:1.08em;font-style:italic;color:#0F3154;line-height:1.75;margin:0;position:relative;z-index:1;">Your job during home training is not to coach. It's to be present. When you're using follow-along videos, the coaching is already happening on screen, delivered by someone with actual soccer expertise. Your child doesn't need a second coach.</p></div>

<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:28px 0;">
  <div style="background:#FEF2F2;border:1px solid #FECACA;border-radius:14px;padding:20px;">
    <p style="font-size:0.78em;font-weight:800;color:#DC373E;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 12px;">Stop Doing</p>
    <ul style="margin:0;padding-left:18px;font-size:0.9em;color:#374151;line-height:1.85;">
      <li>Correcting technique during the session</li>
      <li>Comparing your child to other players</li>
      <li>Expressing frustration when unfocused</li>
      <li>Extending sessions because you think they need more</li>
    </ul>
  </div>
  <div style="background:#F0FDF4;border:1px solid #A7F3D0;border-radius:14px;padding:20px;">
    <p style="font-size:0.78em;font-weight:800;color:#10b981;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 12px;">Start Doing</p>
    <ul style="margin:0;padding-left:18px;font-size:0.9em;color:#374151;line-height:1.85;">
      <li>Being present without hovering</li>
      <li>Asking "how did that feel?" — not "what did you work on?"</li>
      <li>Celebrating consistency over performance</li>
      <li>Letting them feel ownership over the training</li>
    </ul>
  </div>
</div>

<div style="background:linear-gradient(135deg,#ecfdf5,#d1fae5);border:1px solid #6ee7b7;border-radius:14px;padding:18px 22px;margin:32px 0;display:flex;gap:14px;align-items:flex-start;box-shadow:0 2px 12px rgba(16,185,129,0.1);"><div style="background:#10b981;border-radius:8px;padding:6px 8px;flex-shrink:0;margin-top:2px;font-size:1em;">&#9889;</div><div><p style="font-size:0.76em;font-weight:800;color:#065f46;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 5px;">Quick Tip</p><p style="font-size:0.93em;color:#064e3b;margin:0;line-height:1.65;"><strong>Try "phone in pocket" for one week.</strong> No notes, no filming, no corrections. Just sit nearby and watch. After the session, say exactly one thing: "Good session." That's it. Watch how different the energy is.</p></div></div>

<div style="background:linear-gradient(135deg,#FFF7ED,#FFEDD5);border-radius:20px;padding:28px 32px;margin:44px 0;border:1px solid #FED7AA;box-shadow:0 4px 20px rgba(234,88,12,0.08);display:flex;align-items:center;gap:24px;flex-wrap:wrap;">
  <div style="flex:1;min-width:200px;">
    <p style="font-size:0.75em;font-weight:800;color:#ea580c;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 6px;">Free Ebook</p>
    <p style="font-size:1.05em;font-weight:800;color:#0F3154;margin:0 0 6px;">The Parent Trainer's Playbook</p>
    <p style="font-size:0.88em;color:#374151;line-height:1.6;margin:0 0 16px;">20 unconventional tips for raising a competitive soccer player — from a soccer dad who's lived it.</p>
    <a href="https://www.anytime-soccer.com/the-parent-trainers-playbook" style="display:inline-block;background:#DC373E;color:#fff;font-weight:800;font-size:0.88em;padding:10px 22px;border-radius:50px;text-decoration:none;box-shadow:0 4px 14px rgba(220,55,62,0.3);">Download Free &rarr;</a>
  </div>
  <div style="flex:1;min-width:200px;">
    <p style="font-size:0.75em;font-weight:800;color:#ea580c;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 6px;">Free Ebook</p>
    <p style="font-size:1.05em;font-weight:800;color:#0F3154;margin:0 0 6px;">Must-Have Guide to In-Home Training</p>
    <p style="font-size:0.88em;color:#374151;line-height:1.6;margin:0 0 16px;">Everything you need to know to start training at home effectively — setup, structure, and mindset.</p>
    <a href="https://www.anytime-soccer.com/must-have-guide-for-serious-soccer-parents" style="display:inline-block;background:#0F3154;color:#fff;font-weight:800;font-size:0.88em;padding:10px 22px;border-radius:50px;text-decoration:none;box-shadow:0 4px 14px rgba(15,49,84,0.25);">Download Free &rarr;</a>
  </div>
</div>

<div style="display:flex;align-items:center;gap:16px;margin:52px 0 8px;"><div style="background:linear-gradient(135deg,#DC373E,#b91c1c);color:#fff;font-size:1em;font-weight:800;width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 4px 12px rgba(220,55,62,0.35);">6</div><h2 style="font-size:1.6em;font-weight:800;color:#0F3154;margin:0;line-height:1.25;">What 30, 60, and 90 Days Looks Like</h2></div>

<p style="font-size:1em;line-height:1.85;color:#374151;">Here's a realistic picture of the timeline so you're not measuring against the wrong benchmarks.</p>

<div style="display:flex;flex-direction:column;gap:0;margin:28px 0;border-radius:16px;overflow:hidden;border:1px solid #E1E8EF;box-shadow:0 2px 16px rgba(15,49,84,0.07);">
  <div style="padding:22px 28px;background:#fff;border-bottom:1px solid #E1E8EF;display:flex;gap:18px;align-items:flex-start;">
    <div style="background:linear-gradient(135deg,#FECACA,#FCA5A5);color:#b91c1c;font-weight:800;font-size:0.82em;padding:4px 12px;border-radius:50px;white-space:nowrap;flex-shrink:0;margin-top:2px;">Days 1–14</div>
    <div><p style="font-weight:800;color:#0F3154;margin:0 0 4px;font-size:0.95em;">The Friction Phase</p><p style="font-size:0.92em;color:#374151;margin:0;line-height:1.65;">The habit doesn't exist yet, so everything requires willpower. Some days your child will resist. Some days you'll skip. That's normal. Aim for 5 out of 7 days. Don't make missed days dramatic — just return to the anchor tomorrow.</p></div>
  </div>
  <div style="padding:22px 28px;background:#F8FAFC;border-bottom:1px solid #E1E8EF;display:flex;gap:18px;align-items:flex-start;">
    <div style="background:linear-gradient(135deg,#FDE68A,#FCD34D);color:#92400e;font-weight:800;font-size:0.82em;padding:4px 12px;border-radius:50px;white-space:nowrap;flex-shrink:0;margin-top:2px;">Days 15–30</div>
    <div><p style="font-weight:800;color:#0F3154;margin:0 0 4px;font-size:0.95em;">The Settling Phase</p><p style="font-size:0.92em;color:#374151;margin:0;line-height:1.65;">Something shifts. The session starts to feel like part of the day rather than an addition to it. Your child stops asking "do we have to?" as often. The ball is already in their hands before you've said anything.</p></div>
  </div>
  <div style="padding:22px 28px;background:#fff;border-bottom:1px solid #E1E8EF;display:flex;gap:18px;align-items:flex-start;">
    <div style="background:linear-gradient(135deg,#A7F3D0,#6EE7B7);color:#065f46;font-weight:800;font-size:0.82em;padding:4px 12px;border-radius:50px;white-space:nowrap;flex-shrink:0;margin-top:2px;">Days 31–60</div>
    <div><p style="font-weight:800;color:#0F3154;margin:0 0 4px;font-size:0.95em;">The Competence Phase</p><p style="font-size:0.92em;color:#374151;margin:0;line-height:1.65;">Real skill development becomes visible. Ball mastery movements that were awkward in week one are becoming fluid. Coaches may start commenting. This is where motivation kicks back in — not as the engine, but as the reward.</p></div>
  </div>
  <div style="padding:22px 28px;background:#F8FAFC;display:flex;gap:18px;align-items:flex-start;">
    <div style="background:linear-gradient(135deg,#BFDBFE,#93C5FD);color:#1d4ed8;font-weight:800;font-size:0.82em;padding:4px 12px;border-radius:50px;white-space:nowrap;flex-shrink:0;margin-top:2px;">Days 61–90</div>
    <div><p style="font-weight:800;color:#0F3154;margin:0 0 4px;font-size:0.95em;">The Identity Phase</p><p style="font-size:0.92em;color:#374151;margin:0;line-height:1.65;">Your child has become someone who trains. Not someone who trains when they feel like it — someone for whom training is just part of who they are. That identity is extraordinarily durable. It doesn't require your enforcement anymore.</p></div>
  </div>
</div>

<div style="background:linear-gradient(135deg,#ecfdf5,#d1fae5);border:1px solid #6ee7b7;border-radius:14px;padding:18px 22px;margin:32px 0;display:flex;gap:14px;align-items:flex-start;box-shadow:0 2px 12px rgba(16,185,129,0.1);"><div style="background:#10b981;border-radius:8px;padding:6px 8px;flex-shrink:0;margin-top:2px;font-size:1em;">&#9889;</div><div><p style="font-size:0.76em;font-weight:800;color:#065f46;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 5px;">Quick Tip</p><p style="font-size:0.93em;color:#064e3b;margin:0;line-height:1.65;"><strong>Set a 90-day goal, not a season goal.</strong> Tell your child: "Let's see who you are as a player in 90 days." That's short enough to feel real and long enough to see genuine change. Take a 30-second skill video today as your Day 1 baseline. You'll want it at Day 90.</p></div></div>

<div style="background:linear-gradient(135deg,#FFF7ED,#FFEDD5);border-radius:20px;padding:28px 32px;margin:44px 0;border:1px solid #FED7AA;box-shadow:0 4px 20px rgba(234,88,12,0.08);">
  <p style="font-size:0.75em;font-weight:800;color:#ea580c;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 8px;">Free Resource</p>
  <p style="font-size:1.1em;font-weight:800;color:#0F3154;margin:0 0 6px;">Build a Personalized 30-Day Training Plan</p>
  <p style="font-size:0.92em;color:#374151;line-height:1.65;margin:0 0 18px;">Pick your skill areas, set your schedule, and get a custom PDF plan in under 60 seconds. No coaching experience required — just show up and press play.</p>
  <a href="https://www.anytime-soccer.com/free-training-plan" style="display:inline-block;background:#DC373E;color:#fff;font-weight:800;font-size:0.9em;padding:12px 24px;border-radius:50px;text-decoration:none;box-shadow:0 4px 16px rgba(220,55,62,0.35);margin-right:12px;">Build Free Plan &rarr;</a>
  <a href="https://www.anytime-soccer.com/free-30-day-training-plan" style="display:inline-block;background:#0F3154;color:#fff;font-weight:800;font-size:0.9em;padding:12px 24px;border-radius:50px;text-decoration:none;box-shadow:0 4px 14px rgba(15,49,84,0.25);">Get 30-Day Plan &rarr;</a>
</div>

<div style="display:flex;align-items:center;gap:16px;margin:52px 0 8px;"><div style="background:linear-gradient(135deg,#DC373E,#b91c1c);color:#fff;font-size:1em;font-weight:800;width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 4px 12px rgba(220,55,62,0.35);">7</div><h2 style="font-size:1.6em;font-weight:800;color:#0F3154;margin:0;line-height:1.25;">A Note on Setbacks (Because They Will Happen)</h2></div>

<p style="font-size:1em;line-height:1.85;color:#374151;">Seasons end. School gets busy. Kids get sick. Travel happens. Streaks break.</p>

<p style="font-size:1em;line-height:1.85;color:#374151;">When they do — and they will — the single most important thing you can do is <strong>not make it a bigger deal than it is.</strong></p>

<p style="font-size:1em;line-height:1.85;color:#374151;">The mistake most parents make is treating a broken streak as a failure that requires recommitting, re-motivating, and restarting from scratch. That framing makes coming back feel heavy. The harder the fall, the harder the climb.</p>

<p style="font-size:1em;line-height:1.85;color:#374151;">Instead, treat missed days like weather. It rained. The weather changed. You pick up the ball and do a session today. No drama, no lecture, no big speech about commitment.</p>

<p style="font-size:1em;line-height:1.85;color:#374151;">The anchor is still there. The habit is more durable than a few missed days. Just return to it.</p>

<div style="background:linear-gradient(135deg,#ecfdf5,#d1fae5);border:1px solid #6ee7b7;border-radius:14px;padding:18px 22px;margin:32px 0;display:flex;gap:14px;align-items:flex-start;box-shadow:0 2px 12px rgba(16,185,129,0.1);"><div style="background:#10b981;border-radius:8px;padding:6px 8px;flex-shrink:0;margin-top:2px;font-size:1em;">&#9889;</div><div><p style="font-size:0.76em;font-weight:800;color:#065f46;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 5px;">Quick Tip</p><p style="font-size:0.93em;color:#064e3b;margin:0;line-height:1.65;"><strong>"Never miss twice" is the only rule you need.</strong> You'll miss a day — everyone does. Your only job when that happens is to make sure you don't miss the next one. One missed day is an accident. Two in a row is the start of a new (bad) habit.</p></div></div>

<div style="display:flex;align-items:center;gap:16px;margin:52px 0 8px;"><div style="background:linear-gradient(135deg,#0F3154,#1e4a73);color:#fff;font-size:1em;font-weight:800;width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">&#10003;</div><h2 style="font-size:1.6em;font-weight:800;color:#0F3154;margin:0;line-height:1.25;">The Bottom Line</h2></div>

<p style="font-size:1em;line-height:1.85;color:#374151;">The families I've seen produce the most developed players have one thing in common: they made home training <strong>boring</strong>.</p>

<p style="font-size:1em;line-height:1.85;color:#374151;">Not in a bad way. Boring in the best sense — routine, expected, unremarkable. A thing that just happens, like brushing teeth or eating breakfast. Not a special event, not a punishment, not something that requires a conversation.</p>

<p style="font-size:1em;line-height:1.85;color:#374151;">Ten minutes. Same time every day. Ball already out. Video already chosen. Parent present but quiet.</p>

<p style="font-size:1em;line-height:1.85;color:#374151;">It doesn't look like much from the outside. But over months and years, it produces players who move differently — players whose first touch is automatic, whose close control is instinctive, whose confidence with the ball under pressure comes from thousands of hours of quiet repetition nobody else knows about.</p>

<p style="font-size:1em;line-height:1.85;color:#374151;">That's what Adam had. That's what Matthew had. And it started with 10 minutes before school and a parent who was willing to show up without a whistle.</p>

<div style="display:flex;align-items:center;gap:16px;margin:52px 0 20px;"><div style="flex:1;height:1px;background:linear-gradient(to right,transparent,#CBD5E1);"></div><div style="width:6px;height:6px;border-radius:50%;background:#DC373E;"></div><div style="width:10px;height:10px;border-radius:50%;background:#0F3154;"></div><div style="width:6px;height:6px;border-radius:50%;background:#DC373E;"></div><div style="flex:1;height:1px;background:linear-gradient(to left,transparent,#CBD5E1);"></div></div>

<div style="background:linear-gradient(135deg,#0F3154,#1a3d5c);border-radius:24px;padding:40px 36px;margin:40px 0;text-align:center;box-shadow:0 6px 32px rgba(15,49,84,0.18);">
  <p style="font-size:0.78em;font-weight:800;color:#93c5fd;text-transform:uppercase;letter-spacing:0.12em;margin:0 0 10px;">Ready to Build the Habit?</p>
  <h3 style="font-size:1.65em;font-weight:800;color:#fff;margin:0 0 10px;line-height:1.25;">Everything You Need — Free</h3>
  <p style="font-size:0.97em;color:rgba(255,255,255,0.8);line-height:1.7;max-width:500px;margin:0 auto 28px;">Training plans, ebooks, guides, community groups, and 5,000+ follow-along videos. Start with any of these free resources today.</p>
  <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
    <a href="https://www.anytime-soccer.com/free-resource-hub" style="display:inline-block;background:#DC373E;color:#fff;font-weight:800;font-size:0.92em;padding:13px 26px;border-radius:50px;text-decoration:none;box-shadow:0 4px 20px rgba(220,55,62,0.45);">Free Resource Hub &rarr;</a>
    <a href="https://www.anytime-soccer.com/blog/free-7-day-soccer-skills-challenge" style="display:inline-block;background:rgba(255,255,255,0.12);color:#fff;font-weight:700;font-size:0.92em;padding:13px 26px;border-radius:50px;text-decoration:none;border:1px solid rgba(255,255,255,0.25);">7-Day Training Plan</a>
    <a href="https://www.anytime-soccer.com/free-training-plan" style="display:inline-block;background:rgba(255,255,255,0.12);color:#fff;font-weight:700;font-size:0.92em;padding:13px 26px;border-radius:50px;text-decoration:none;border:1px solid rgba(255,255,255,0.25);">Build a Plan</a>
  </div>
</div>

<div style="background:#F8FAFC;border-radius:20px;padding:28px 32px;margin:36px 0;border:1px solid #E1E8EF;">
  <p style="font-size:0.78em;font-weight:800;color:#0F3154;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 16px;">&#127919; Gear That Makes the 10-Minute Habit Easier</p>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:14px;">
    <a href="https://amzn.to/4aM3st9" target="_blank" rel="noopener noreferrer" style="display:flex;flex-direction:column;align-items:center;background:#fff;border:1px solid #E1E8EF;border-radius:12px;padding:14px;text-decoration:none;text-align:center;">
      <img src="https://media.anytime-soccer.com/wp-content/uploads/2026/01/size_one-soccer-balls.jpg" alt="Size 1 Ball" style="width:80px;height:80px;object-fit:contain;margin-bottom:8px;" />
      <span style="font-size:0.8em;font-weight:700;color:#0F3154;line-height:1.3;">Size 1 Ball</span>
      <span style="font-size:0.75em;color:#DC373E;font-weight:700;margin-top:4px;">Shop →</span>
    </a>
    <a href="https://amzn.to/4q6yUY3" target="_blank" rel="noopener noreferrer" style="display:flex;flex-direction:column;align-items:center;background:#fff;border:1px solid #E1E8EF;border-radius:12px;padding:14px;text-decoration:none;text-align:center;">
      <img src="https://media.anytime-soccer.com/wp-content/uploads/2026/01/adidas-mls-soccer-ball.jpg" alt="Training Ball" style="width:80px;height:80px;object-fit:contain;margin-bottom:8px;" />
      <span style="font-size:0.8em;font-weight:700;color:#0F3154;line-height:1.3;">Training Ball</span>
      <span style="font-size:0.75em;color:#DC373E;font-weight:700;margin-top:4px;">Shop →</span>
    </a>
    <a href="https://amzn.to/4qFkfD1" target="_blank" rel="noopener noreferrer" style="display:flex;flex-direction:column;align-items:center;background:#fff;border:1px solid #E1E8EF;border-radius:12px;padding:14px;text-decoration:none;text-align:center;">
      <img src="https://media.anytime-soccer.com/wp-content/uploads/2026/01/soccer-rebounder.jpg" alt="Soccer Rebounder" style="width:80px;height:80px;object-fit:contain;margin-bottom:8px;" />
      <span style="font-size:0.8em;font-weight:700;color:#0F3154;line-height:1.3;">Soccer Rebounder</span>
      <span style="font-size:0.75em;color:#DC373E;font-weight:700;margin-top:4px;">Shop →</span>
    </a>
    <a href="https://amzn.to/4spLHX1" target="_blank" rel="noopener noreferrer" style="display:flex;flex-direction:column;align-items:center;background:#fff;border:1px solid #E1E8EF;border-radius:12px;padding:14px;text-decoration:none;text-align:center;">
      <img src="https://media.anytime-soccer.com/wp-content/uploads/2026/01/soccer_agility_ladder.jpg" alt="Agility Ladder" style="width:80px;height:80px;object-fit:contain;margin-bottom:8px;" />
      <span style="font-size:0.8em;font-weight:700;color:#0F3154;line-height:1.3;">Agility Ladder</span>
      <span style="font-size:0.75em;color:#DC373E;font-weight:700;margin-top:4px;">Shop →</span>
    </a>
    <a href="https://amzn.to/4soWKzv" target="_blank" rel="noopener noreferrer" style="display:flex;flex-direction:column;align-items:center;background:#fff;border:1px solid #E1E8EF;border-radius:12px;padding:14px;text-decoration:none;text-align:center;">
      <img src="https://media.anytime-soccer.com/wp-content/uploads/2026/01/training-cones.jpg" alt="Training Cones" style="width:80px;height:80px;object-fit:contain;margin-bottom:8px;" />
      <span style="font-size:0.8em;font-weight:700;color:#0F3154;line-height:1.3;">Training Cones</span>
      <span style="font-size:0.75em;color:#DC373E;font-weight:700;margin-top:4px;">Shop →</span>
    </a>
    <a href="https://www.anytime-soccer.com/our-picks" style="display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(135deg,#0F3154,#1e4a73);border-radius:12px;padding:14px;text-decoration:none;text-align:center;">
      <span style="font-size:1.4em;margin-bottom:6px;">&#127919;</span>
      <span style="font-size:0.8em;font-weight:800;color:#fff;line-height:1.3;">See All Our Picks</span>
      <span style="font-size:0.75em;color:#93c5fd;font-weight:700;margin-top:4px;">Full list →</span>
    </a>
  </div>
</div>

</div>`;

const newPost = {
  id: 100001,
  slug: '10-minute-habit-home-soccer-training-stick',
  title: 'The 10-Minute Habit: How to Make Home Soccer Training Stick',
  date: 'Thu, 28 May 2026 10:00:00 +0000',
  excerpt: "Most parents try to train at home with motivation. Here's why that fails — and the 4-step system built on habit science that actually produces results. From a soccer dad who did this with two boys now playing at Charlotte FC Academy and ECNL.",
  categories: ['Blog', 'Home Training', 'Parent Guide', 'Ball Mastery'],
  tags: ['home training', 'habit formation', 'ball mastery', 'soccer parent', 'youth soccer', '10 minute training', 'follow along videos'],
  featuredImage: 'https://media.anytime-soccer.com/wp-content/themes/anytime/images/about/new-chalange-image.png',
  thumbnailId: '',
  content,
};

// Prepend to array so newest shows first
posts.unshift(newPost);

fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
console.log('✅ Post added successfully:', newPost.slug);
console.log('Total posts now:', posts.length);
