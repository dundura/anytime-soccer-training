import json, sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/posts.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

TARGET = "how-to-motivate-your-child-to-practice-soccer-at-home"
AVATAR = "https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1779745975826-iqel6b.png"

def quote(text, attribution=None):
    attr = f'<p style="font-size:0.8em;font-weight:600;color:#DC373E;margin:12px 0 0;letter-spacing:0.04em;">— {attribution}</p>' if attribution else ''
    return f'''<blockquote style="border-left:4px solid #DC373E;background:#FFF5F5;border-radius:0 12px 12px 0;padding:20px 24px;margin:28px 0;font-size:1.05em;font-style:italic;color:#1e3a5f;line-height:1.7;">{text}{attr}</blockquote>'''

def tip(text):
    return f'''<div style="background:#F0FDF4;border:1px solid #86efac;border-radius:12px;padding:16px 20px;margin:24px 0;display:flex;gap:12px;align-items:flex-start;"><span style="font-size:1.2em;flex-shrink:0;">&#128161;</span><div><p style="font-size:0.78em;font-weight:700;color:#16a34a;text-transform:uppercase;letter-spacing:0.07em;margin:0 0 4px;">Quick Tip</p><p style="font-size:0.93em;color:#14532d;margin:0;line-height:1.6;">{text}</p></div></div>'''

NEW_CONTENT = (
'<div class="post-content">\n\n'
'<p style="font-size:0.95em;font-weight:600;color:#DC373E;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:8px;">Parent Guide &amp; Mindset</p>\n\n'
'<p class="lead" style="font-size:1.18em;line-height:1.75;color:#374151;">It was a Tuesday evening, and I was standing in the backyard holding a soccer ball, calling Matthew\'s name for the third time. No answer. I walked inside and found him exactly where I expected — on the couch, controller in hand, halfway through some game I\'d never heard of. He glanced up at me with that look every soccer parent knows: <em>please don\'t make me go outside.</em></p>\n\n'
'<p>"Five more minutes," he said.</p>\n\n'
'<p>It wasn\'t five minutes. It wasn\'t ten. By the time we actually got outside, I was frustrated, he was resistant, and the next twenty minutes were about as productive as you\'d imagine.</p>\n\n'
'<p>I drove to practice the next morning thinking: <em>Why is this so hard?</em></p>\n\n'
'<p>He <em>loves</em> soccer. He begs to go to games. He watches it on TV. But the moment I asked him to practice at home, it felt like I\'d asked him to clean the bathroom.</p>\n\n'
'<p>If you\'ve been in that spot, you\'ve probably heard the same advice I heard a hundred times: <strong>just make it fun.</strong></p>\n\n'
'<p>And look — they\'re not wrong. Fun matters. But "make it fun" is not a framework. It doesn\'t tell you <em>why</em> your child is resisting, or what to do when the fun isn\'t enough, or how to build something that actually sticks past a single good session. I spent years chasing fun and getting inconsistency. What finally worked was understanding something much more fundamental — and once I got it, the whole thing clicked.</p>\n\n'
+ quote(
    '"Fun is the entry point. Visible progress is what keeps them coming back."',
    'Neil Crawford'
)
+ '\n<hr style="border:none;border-top:2px solid #E5E7EB;margin:36px 0;" />\n\n'
'<div style="background:#F0F6FF;border-radius:16px;padding:32px 36px;margin:0 0 48px;border:1px solid #D0E4F8;">'
'\n  <p style="font-size:0.75em;font-weight:700;color:#DC373E;text-transform:uppercase;letter-spacing:0.09em;margin:0 0 8px;">&#127911; From the Podcast</p>'
'\n  <h2 style="font-size:1.4em;font-weight:800;color:#0F3154;margin:0 0 6px;line-height:1.3;">Neil\'s Framework for Lasting Motivation</h2>'
'\n  <p style="font-size:0.85em;color:#64748b;margin:0 0 20px;font-style:italic;">The following walks through the framework I shared on <em>The Inside Scoop</em> podcast. Listen below, then read on for the full breakdown.</p>'
'\n  <div style="margin:0 0 4px;">'
'\n    <iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/episode/3nYh9J85TXJfpMO9cVCiEC?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>'
'\n  </div>'
'\n</div>\n\n'

'<h2 style="font-size:1.65em;font-weight:800;color:#0F3154;margin:40px 0 16px;">1. What Motivation Actually Is</h2>\n\n'
'<p>Here\'s the honest definition I use now: motivation is your child\'s willingness to do something <em>today</em> for a benefit they won\'t feel until later. That\'s it. It\'s the ability to engage in a delayed gratification activity — and that\'s genuinely hard for kids, because their brains are wired for <em>now</em>.</p>\n\n'
'<p>When I understood that, a lot of my frustration disappeared. Matthew wasn\'t being lazy when he didn\'t want to come outside. He was being a normal eight-year-old with a normal eight-year-old brain. My job wasn\'t to override that — it was to make the delayed-gratification loop short enough that he could actually <em>feel</em> it.</p>\n\n'
'<p>This is also why "just make it fun" gets you only so far. Fun solves the immediate resistance — it makes today feel good. But motivation that lasts is built when your child can <em>see the result</em> of what they\'re doing. That\'s a different problem entirely. Fun is the entry point. Visible progress is what keeps them coming back.</p>\n\n'
+ quote(
    '"I wasn\'t dealing with a lazy kid. I was dealing with a kid whose brain hadn\'t yet learned to value something it couldn\'t feel today."'
)
+ tip("Shorten the feedback loop. After every session, point to one concrete thing that\'s better than it was last week. \"That turn — you did that automatically. Two months ago you had to think about it.\" Make the progress visible.") + '\n'
'<hr style="border:none;border-top:2px solid #E5E7EB;margin:36px 0;" />\n\n'

'<h2 style="font-size:1.65em;font-weight:800;color:#0F3154;margin:40px 0 16px;">2. The Prerequisite: Growth Mindset</h2>\n\n'
'<p>Before any strategy works, you need the foundation: your child has to believe that practice <em>does something</em>. If they believe ability is fixed — that they either have it or they don\'t — no amount of structured training will help. They\'ll either coast or give up.</p>\n\n'
'<p>When Adam hit a wall around age ten, it wasn\'t laziness. He\'d been putting in real work but not seeing the results he expected. His friends on the team seemed to be improving faster (they probably weren\'t, but perception is everything at that age). He was quietly frustrated, and that frustration was coming out as resistance.</p>\n\n'
'<p>The fix wasn\'t a better training plan. It was a conversation. And the single most important thing I said:</p>\n\n'
+ quote(
    '"I can see it getting better. You couldn\'t do that six weeks ago."',
    'Neil to Adam'
)
+ '<p>Not "you\'re so talented." Not "you\'re the best on your team." Specific. Observable. Tied to effort, not identity. That\'s the sentence that builds growth mindset.</p>\n\n'
'<p>Kids who believe improvement is real will practice. Kids who don\'t, won\'t. No amount of fun closes that gap.</p>\n\n'
+ tip("Swap praise of talent for praise of process. Instead of \"You\'re so good at this,\" try \"I can tell you\'ve been working on that — it shows.\" One habit, big difference.") + '\n'
'<hr style="border:none;border-top:2px solid #E5E7EB;margin:36px 0;" />\n\n'

'<h2 style="font-size:1.65em;font-weight:800;color:#0F3154;margin:40px 0 16px;">3. The Right Strategy: Touches Over Everything</h2>\n\n'
'<p>One thing I got completely wrong early on: I let Adam spend most of his home training time on finishing. He loved shooting. It was fun. But finishing is the hardest thing to improve at home because you can\'t replicate game pressure by yourself in the backyard.</p>\n\n'
'<p>Ball mastery changed everything. Close-control, quick-feet work — the kind of repetitive, ball-at-your-feet training that looks boring from the outside but actually builds the neural pathways that make the game feel effortless. Twenty minutes of real ball mastery produces more meaningful touches than an hour of dribbling around cones. And more touches means faster visible progress, which means the feedback loop tightens, which means <em>motivation goes up on its own</em>.</p>\n\n'
+ quote(
    '"When Matthew could feel his feet moving faster than they did a month ago, I didn\'t have to drag him outside anymore. He went on his own."'
)
+ '<p>This is the part that\'s hard to explain to a parent whose kid is begging to shoot on goal: letting them do what\'s fun in the short term at the expense of what builds the fastest visible progress actually works against long-term motivation. The irony is real.</p>\n\n'
'<p>If you want structured ball mastery progressions by age and skill level, <a href="https://www.anytime-soccer.com/our-picks" style="color:#DC373E;font-weight:600;">our recommended training tools</a> are a good place to start — and our weekly training plans inside the app do exactly this work for you.</p>\n\n'
+ tip("Start with 10 minutes of pure ball mastery before anything else — even if they\'d rather shoot. The feet get sharp, the confidence builds, and they usually want to keep going. Momentum is everything.") + '\n'
'<hr style="border:none;border-top:2px solid #E5E7EB;margin:36px 0;" />\n\n'

'<h2 style="font-size:1.65em;font-weight:800;color:#0F3154;margin:40px 0 16px;">4. Autonomy: Real Choices, Not False Ones</h2>\n\n'
'<p>I\'ve talked a lot about giving kids choices. But there\'s a version of this that backfires: false choices. "Do you want to practice today — yes or no?" isn\'t a real choice. It\'s a question with a wrong answer, and kids know it immediately.</p>\n\n'
'<p>Real choice looks like: "We\'re going outside for twenty minutes. You pick what we work on first." The training is happening — that\'s non-negotiable — but they have genuine ownership over the shape of it. That distinction matters enormously to a ten-year-old who spends all day being told what to do.</p>\n\n'
+ quote(
    '"Within a few weeks of handing them the clipboard, they started asking me what I thought they should work on. Because the training felt like theirs — my input became something they wanted, not something imposed."'
)
+ '<p>Technology helps here more than I expected. When Matthew could open an app and choose his own drill video — rather than having me hand him a plan — the buy-in was completely different. He\'d spend five minutes choosing before we even went outside. By the time we got to the backyard, he was already invested.</p>\n\n'
+ tip("Give three real options every session: \"Ball mastery, shooting practice, or free juggle challenge — your call.\" All are valid. The choice creates investment before you even pick up a ball.") + '\n'
'<hr style="border:none;border-top:2px solid #E5E7EB;margin:36px 0;" />\n\n'

'<h2 style="font-size:1.65em;font-weight:800;color:#0F3154;margin:40px 0 16px;">5. Lead by Example</h2>\n\n'
'<p>Kids watch what you do more carefully than they listen to what you say. If I spent my evenings on the couch telling Adam to get off his video games, the message I was actually sending was: <em>screen time is how adults relax, practice is what kids have to do.</em></p>\n\n'
'<p>The moment I stepped off the "coach" pedestal and picked up a ball myself, both boys responded completely differently. I wasn\'t evaluating them anymore. I was playing with them.</p>\n\n'
+ quote(
    '"Adam lit up when I made mistakes in front of him. He\'d laugh. He\'d correct me. Suddenly he was the one with knowledge to share — not just the student being observed."'
)
+ '<p>The shift that worked for me was participating — not coaching from the sideline, but actually picking up a ball and struggling alongside him. When I laughed at my own bad juggling attempts, the whole dynamic changed. He stopped feeling evaluated. And somewhere along the way, he stopped needing to be invited outside at all.</p>\n\n'
'<p>You don\'t need to be a skilled player to train alongside your child. You just need to show up as a participant, not a spectator.</p>\n\n'
+ tip("Ask your child to teach you something once per session. \"Show me that move\" or \"how do I do that footwork?\" It flips the dynamic — they become the expert, and experts don\'t dread going to practice.") + '\n'
'<hr style="border:none;border-top:2px solid #E5E7EB;margin:36px 0;" />\n\n'

'<h2 style="font-size:1.65em;font-weight:800;color:#0F3154;margin:40px 0 16px;">6. Making It Uneventful</h2>\n\n'
'<p>The goal, ultimately, is for home training to become so routine that it stops feeling like a decision. Not an event. Not a negotiation. Just <em>what we do on Tuesdays and Thursdays</em>. Like dinner. Like homework. It\'s just part of the week.</p>\n\n'
'<p>"Event" training — the big formal sessions you announce — creates pressure. Routine training becomes part of the landscape of the week. Less drama, more consistency.</p>\n\n'
+ quote(
    '"\'Uneventful\' is the highest compliment I can give a home training habit. It means the resistance is gone. The motivation question has been answered — not with a pep talk, but with a system."',
    'Neil Crawford'
)
+ '<p>Systems outlast inspiration every single time.</p>\n\n'
+ tip("Pick two fixed days and put them in the family calendar — no negotiation each week about whether you\'re training. The battle isn\'t \"will we do it?\", it\'s just \"which drill first?\" That small shift removes most of the friction.") + '\n'
'<hr style="border:none;border-top:2px solid #E5E7EB;margin:36px 0;" />\n\n'

'<h2 style="font-size:1.65em;font-weight:800;color:#0F3154;margin:40px 0 16px;">The Checklist: Setting Up a Session That Actually Happens</h2>\n\n'
'<p style="font-size:0.95em;font-weight:700;color:#0F3154;margin:20px 0 8px;">Before You Go Outside:</p>'
'<ul style="padding-left:20px;line-height:1.9;color:#374151;font-size:0.95em;">'
'<li>Is your child in a good headspace? (Hungry, tired, or upset = bad time)</li>'
'<li>Have you set a realistic time limit? (20–30 min beats an hour every time)</li>'
'<li>Have you asked if they\'d like to pick the first drill?</li>'
'<li>Do you know what they\'ve been excited about recently — or struggling with?</li>'
'</ul>\n\n'
'<p style="font-size:0.95em;font-weight:700;color:#0F3154;margin:20px 0 8px;">During the Session:</p>'
'<ul style="padding-left:20px;line-height:1.9;color:#374151;font-size:0.95em;">'
'<li>Ratio check: more praise than correction</li>'
'<li>Are you participating, or just watching?</li>'
'<li>Have you given them at least one unstructured "free play" window?</li>'
'<li>Have you acknowledged at least one thing they did well — specifically?</li>'
'</ul>\n\n'
'<p style="font-size:0.95em;font-weight:700;color:#0F3154;margin:20px 0 8px;">After the Session:</p>'
'<ul style="padding-left:20px;line-height:1.9;color:#374151;font-size:0.95em;">'
'<li>Did you end on a high note, before they were fully tired?</li>'
'<li>Did you skip the post-practice breakdown? ("Your first touch was still heavy…")</li>'
'<li>Did you express genuine enjoyment of the time — not just pride in their performance?</li>'
'</ul>\n\n'
'<hr style="border:none;border-top:2px solid #E5E7EB;margin:36px 0;" />\n\n'

'<h2 style="font-size:1.65em;font-weight:800;color:#0F3154;margin:40px 0 16px;">The Do\'s and Don\'ts</h2>\n\n'
'<h3 style="font-size:1.1em;font-weight:700;color:#16a34a;margin:20px 0 12px;">&#10003; Do\'s</h3>'
'<p><strong>DO start shorter than you think you need to.</strong> Twenty focused minutes beats a dragged-out hour. When the session ends while they\'re still energized, they come back wanting more.</p>'
'<p><strong>DO celebrate improvement over performance.</strong> "That cut — you wouldn\'t have made that move a month ago." They can\'t always see their own progress. You\'re the one who holds up the mirror.</p>'
'<p><strong>DO use video — of them and of pros.</strong> Matthew became obsessed with a particular player for about a year. We\'d watch clips together, then he\'d go outside and try to replicate moves. Screen time feeding training time, not competing with it.</p>'
'<p><strong>DO let sessions fail sometimes.</strong> Not every session will be great. Let it be short. Let it be low-key. Come back tomorrow. Forcing a good session when the conditions are wrong is how you create the negative association you\'re trying to avoid.</p>'
'<p><strong>DO let them teach you.</strong> Ask them to explain a drill. Ask them to be the "coach" for five minutes. Teaching deepens ownership. Kids who feel like experts are kids who want to practice more.</p>'
'<p><strong>DO check out the gear we actually use</strong> — cones, a rebounder, a size-one ball. The right setup makes ball mastery sessions 10x more effective. <a href="https://www.anytime-soccer.com/our-picks" style="color:#DC373E;font-weight:600;">See our picks here.</a></p>\n\n'
'<h3 style="font-size:1.1em;font-weight:700;color:#DC373E;margin:28px 0 12px;">&#10007; Don\'ts</h3>'
'<p><strong>DON\'T connect home training to game performance.</strong> "You need to work on your first touch because you keep losing the ball in games" links their identity to a deficit. Train at home because it\'s its own thing — not as remediation for Saturday.</p>'
'<p><strong>DON\'T correct every mistake.</strong> Ten corrections in twenty minutes doesn\'t make a player better — it makes them afraid to try. Pick one thing per session, maximum. Let everything else go.</p>'
'<p><strong>DON\'T use training as punishment.</strong> Soccer should be the good thing, not the withheld reward. When training becomes the stick, kids start to resent it — even if they love the game.</p>'
'<p><strong>DON\'T compare them to siblings, teammates, or YouTube prodigies.</strong> Comparison kills intrinsic motivation faster than almost anything else.</p>'
'<p><strong>DON\'T push through the resistance.</strong> When a child is genuinely disengaged — not just the typical pre-session inertia — pushing harder backfires. Take a step back. Have a conversation. Ask what\'s going on.</p>\n\n'
'<hr style="border:none;border-top:2px solid #E5E7EB;margin:36px 0;" />\n\n'

'<h2 style="font-size:1.65em;font-weight:800;color:#0F3154;margin:40px 0 16px;">The Bigger Picture</h2>\n\n'
'<p>When I watch Adam and Matthew play now, the thing I\'m proudest of isn\'t their ability — although watching their growth has been one of the great joys of my life.</p>\n\n'
'<p>What I\'m proudest of is that they still <em>want</em> to play.</p>\n\n'
'<p>They\'re not burned out. They\'re not grinding through a sport they secretly hate. They still go outside on their own. They still come to me with things they want to work on. The love of the game is still there.</p>\n\n'
'<p>That doesn\'t happen by accident. It happens when parents protect the joy instead of just developing the skill. It happens when we stay curious about our kids instead of staying locked into a plan.</p>\n\n'
+ quote(
    '"A motivated child will always outperform a coerced one. Not sometimes. Always. Protect the joy. The skill will follow."',
    'Neil Crawford'
)
+ '\n<div style="background:linear-gradient(135deg,#0F3154 0%,#1a4a78 100%);border-radius:16px;padding:36px 40px;margin:48px 0;text-align:center;">'
'<p style="font-size:0.75em;font-weight:700;color:rgba(255,255,255,0.6);text-transform:uppercase;letter-spacing:0.1em;margin:0 0 8px;">Ready to Make It Easier?</p>'
'<h3 style="font-size:1.5em;font-weight:800;color:#ffffff;margin:0 0 12px;line-height:1.3;">Build the Habit With a Plan That Does the Thinking For You</h3>'
'<p style="color:rgba(255,255,255,0.75);margin:0 0 24px;font-size:0.95em;">Thousands of drill videos organized by age and skill level. You show up. We handle the curriculum.</p>'
'<a href="https://app.anytime-soccer.com/register" style="display:inline-block;background:#DC373E;color:#ffffff;font-weight:700;font-size:0.95em;padding:14px 32px;border-radius:10px;text-decoration:none;">Start Your Free 7-Day Trial &#8594;</a>'
'</div>\n\n'
f'<div style="display:flex;align-items:flex-start;gap:20px;background:#F8FAFC;border-radius:16px;padding:24px 28px;margin-top:40px;border:1px solid #E1E8EF;">'
f'<img src="{AVATAR}" alt="Neil Crawford" style="width:64px;height:64px;border-radius:50%;object-fit:cover;flex-shrink:0;border:3px solid #fff;box-shadow:0 2px 8px rgba(15,49,84,0.15);" />'
'<div>'
'<p style="font-size:0.78em;font-weight:700;color:#DC373E;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 4px;">About the Author</p>'
'<p style="font-size:0.95em;font-weight:700;color:#0F3154;margin:0 0 6px;">Neil Crawford</p>'
'<p style="font-size:0.88em;color:#64748b;margin:0;line-height:1.65;">Founder of Anytime Soccer Training and soccer dad to Adam and Matthew. He built the platform because he couldn\'t find one that worked for real families with real schedules — and because he made enough mistakes in his own backyard to fill a book.</p>'
'</div></div>\n\n</div>'
)

for post in posts:
    if post['slug'] == TARGET:
        post['content'] = NEW_CONTENT
        print("Content replaced. Length:", len(NEW_CONTENT))
        break

with open('src/data/posts.json', 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)
print("posts.json saved.")
