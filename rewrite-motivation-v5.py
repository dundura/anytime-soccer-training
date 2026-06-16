import json, sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/posts.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

TARGET = "how-to-motivate-your-child-to-practice-soccer-at-home"
AVATAR = "https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1779745975826-iqel6b.png"

# ── helpers ────────────────────────────────────────────────────────────────────
def quote(text, attribution=None):
    attr = (f'<p style="font-size:0.82em;font-weight:700;color:#f87171;margin:14px 0 0;'
            f'letter-spacing:0.05em;text-transform:uppercase;">&mdash; {attribution}</p>') if attribution else ''
    return (
        '<div style="position:relative;background:linear-gradient(135deg,#0F3154 0%,#1a4a78 100%);'
        'border-radius:16px;padding:32px 36px 28px;margin:32px 0;overflow:hidden;">'
        '<div style="position:absolute;top:-10px;left:20px;font-size:7em;color:rgba(255,255,255,0.07);'
        'font-family:Georgia,serif;line-height:1;pointer-events:none;">&ldquo;</div>'
        f'<p style="font-size:1.08em;font-style:italic;color:#ffffff;line-height:1.75;margin:0;'
        f'position:relative;z-index:1;">{text}</p>{attr}</div>'
    )

def tip(text):
    return (
        '<div style="background:linear-gradient(135deg,#ecfdf5,#d1fae5);border:1px solid #6ee7b7;'
        'border-radius:14px;padding:18px 22px;margin:28px 0;display:flex;gap:14px;align-items:flex-start;'
        'box-shadow:0 2px 12px rgba(16,185,129,0.1);">'
        '<div style="background:#10b981;border-radius:8px;padding:6px 8px;flex-shrink:0;margin-top:2px;">'
        '<span style="font-size:1em;">&#128161;</span></div>'
        '<div><p style="font-size:0.76em;font-weight:800;color:#065f46;text-transform:uppercase;'
        f'letter-spacing:0.08em;margin:0 0 5px;">Quick Tip</p>'
        f'<p style="font-size:0.93em;color:#064e3b;margin:0;line-height:1.65;">{text}</p></div></div>'
    )

def section_header(num, title):
    return (
        f'<div style="display:flex;align-items:center;gap:16px;margin:52px 0 20px;">'
        f'<div style="background:linear-gradient(135deg,#DC373E,#b91c1c);color:#fff;font-size:1em;'
        f'font-weight:800;width:44px;height:44px;border-radius:12px;display:flex;align-items:center;'
        f'justify-content:center;flex-shrink:0;box-shadow:0 4px 12px rgba(220,55,62,0.35);">{num}</div>'
        f'<h2 style="font-size:1.6em;font-weight:800;color:#0F3154;margin:0;line-height:1.25;">{title}</h2></div>'
    )

def divider():
    return (
        '<div style="display:flex;align-items:center;gap:12px;margin:44px 0;">'
        '<div style="flex:1;height:1px;background:linear-gradient(to right,transparent,#CBD5E1);"></div>'
        '<div style="width:6px;height:6px;border-radius:50%;background:#DC373E;"></div>'
        '<div style="width:10px;height:10px;border-radius:50%;background:#0F3154;"></div>'
        '<div style="width:6px;height:6px;border-radius:50%;background:#DC373E;"></div>'
        '<div style="flex:1;height:1px;background:linear-gradient(to left,transparent,#CBD5E1);"></div>'
        '</div>'
    )

def table(headers, rows, col_colors=None):
    th_cells = ''.join(
        f'<th style="padding:12px 16px;text-align:left;font-size:0.8em;font-weight:800;'
        f'color:#fff;letter-spacing:0.07em;text-transform:uppercase;background:{col_colors[i] if col_colors else "#0F3154"};">'
        f'{h}</th>' for i, h in enumerate(headers)
    )
    body = ''
    for ri, row in enumerate(rows):
        bg = '#ffffff' if ri % 2 == 0 else '#F8FAFC'
        tds = ''.join(
            f'<td style="padding:13px 16px;font-size:0.9em;color:#374151;line-height:1.55;'
            f'border-bottom:1px solid #E1E8EF;">{cell}</td>' for cell in row
        )
        body += f'<tr style="background:{bg};">{tds}</tr>'
    return (
        '<div style="overflow-x:auto;margin:28px 0;border-radius:14px;'
        'box-shadow:0 2px 16px rgba(15,49,84,0.08);border:1px solid #E1E8EF;overflow:hidden;">'
        f'<table style="width:100%;border-collapse:collapse;">'
        f'<thead><tr>{th_cells}</tr></thead><tbody>{body}</tbody></table></div>'
    )

def giveaway_block():
    return (
        '<div style="background:linear-gradient(135deg,#7c3aed,#4f46e5);border-radius:20px;'
        'padding:36px 40px;margin:48px 0;text-align:center;position:relative;overflow:hidden;'
        'box-shadow:0 8px 32px rgba(79,70,229,0.3);">'
        '<div style="position:absolute;top:-30px;right:-30px;width:140px;height:140px;'
        'border-radius:50%;background:rgba(255,255,255,0.05);"></div>'
        '<div style="position:absolute;bottom:-20px;left:-20px;width:100px;height:100px;'
        'border-radius:50%;background:rgba(255,255,255,0.05);"></div>'
        '<p style="font-size:1.8em;margin:0 0 8px;">&#127873;</p>'
        '<p style="font-size:0.75em;font-weight:800;color:rgba(255,255,255,0.6);text-transform:uppercase;'
        'letter-spacing:0.12em;margin:0 0 8px;">Free Giveaway</p>'
        '<h3 style="font-size:1.4em;font-weight:800;color:#ffffff;margin:0 0 12px;line-height:1.3;">'
        'Win 3 Months of Anytime Soccer Training — Free</h3>'
        '<p style="color:rgba(255,255,255,0.75);margin:0 0 24px;font-size:0.93em;max-width:420px;'
        'margin-left:auto;margin-right:auto;">'
        'Take our 2-minute soccer training survey and you\'ll be entered to win a free 3-month membership. '
        'We use your answers to build better training plans for families like yours.</p>'
        '<a href="https://www.anytime-soccer.com/soccer-training-survey" style="display:inline-block;'
        'background:#ffffff;color:#4f46e5;font-weight:800;font-size:0.95em;padding:14px 32px;'
        'border-radius:12px;text-decoration:none;box-shadow:0 4px 12px rgba(0,0,0,0.15);">'
        'Take the Survey &amp; Enter to Win &#8594;</a>'
        '</div>'
    )

def free_plan_block():
    return (
        '<div style="background:linear-gradient(135deg,#FFF7ED,#FEF3C7);border:1px solid #FCD34D;'
        'border-radius:18px;padding:28px 32px;margin:36px 0;display:flex;gap:20px;align-items:center;'
        'box-shadow:0 2px 16px rgba(251,191,36,0.15);">'
        '<div style="font-size:2.4em;flex-shrink:0;">&#127942;</div>'
        '<div>'
        '<p style="font-size:0.78em;font-weight:800;color:#92400e;text-transform:uppercase;'
        'letter-spacing:0.09em;margin:0 0 4px;">Free Resource</p>'
        '<p style="font-size:1.05em;font-weight:700;color:#78350f;margin:0 0 6px;">'
        'Get Your Free 4-Week Training Plan</p>'
        '<p style="font-size:0.9em;color:#92400e;margin:0 0 14px;line-height:1.6;">'
        'A done-for-you home training plan built around ball mastery progressions — '
        'no equipment required, works for any age group.</p>'
        '<a href="https://www.anytime-soccer.com/free-training-plan" style="display:inline-block;'
        'background:#DC373E;color:#fff;font-weight:700;font-size:0.88em;padding:10px 22px;'
        'border-radius:10px;text-decoration:none;">Download Free Plan &#8594;</a>'
        '</div></div>'
    )

# ── full content ────────────────────────────────────────────────────────────────
NEW_CONTENT = (
'<div class="post-content">\n\n'

'<p style="font-size:0.85em;font-weight:700;color:#DC373E;letter-spacing:0.1em;text-transform:uppercase;'
'margin-bottom:10px;display:inline-block;background:#FFF1F2;padding:4px 12px;border-radius:20px;">'
'Parent Guide &amp; Mindset</p>\n\n'

'<p class="lead" style="font-size:1.18em;line-height:1.8;color:#374151;">'
'It was a Tuesday evening, and I was standing in the backyard holding a soccer ball, calling Matthew\'s name '
'for the third time. No answer. I walked inside and found him exactly where I expected — on the couch, '
'controller in hand, halfway through some game I\'d never heard of. He glanced up at me with that look every '
'soccer parent knows: <em>please don\'t make me go outside.</em></p>\n\n'

'<p>"Five more minutes," he said.</p>\n\n'
'<p>It wasn\'t five minutes. It wasn\'t ten. By the time we actually got outside, I was frustrated, '
'he was resistant, and the next twenty minutes were about as productive as you\'d imagine.</p>\n\n'
'<p>I drove to practice the next morning thinking: <em>Why is this so hard?</em></p>\n\n'
'<p>He <em>loves</em> soccer. He begs to go to games. He watches it on TV. But the moment I asked him '
'to practice at home, it felt like I\'d asked him to clean the bathroom.</p>\n\n'
'<p>If you\'ve been in that spot, you\'ve probably heard the same advice I heard a hundred times: '
'<strong>just make it fun.</strong></p>\n\n'
'<p>And look — they\'re not wrong. Fun matters. But "make it fun" is not a framework. It doesn\'t tell you '
'<em>why</em> your child is resisting, or what to do when the fun isn\'t enough, or how to build something '
'that actually sticks past a single good session. I spent years chasing fun and getting inconsistency. '
'What finally worked was understanding something much more fundamental — and once I got it, the whole thing clicked.</p>\n\n'
+ quote('"Fun is the entry point. Visible progress is what keeps them coming back."', 'Neil Crawford')
+ divider()

# Podcast section
+ '<div style="background:linear-gradient(135deg,#EEF4FF,#E8F0FE);border-radius:20px;padding:36px;'
'margin:0 0 48px;border:1px solid #C7D7FA;">\n'
'  <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">'
'<span style="font-size:1.3em;">&#127911;</span>'
'<p style="font-size:0.75em;font-weight:800;color:#DC373E;text-transform:uppercase;letter-spacing:0.1em;margin:0;">From the Podcast</p></div>\n'
'  <h2 style="font-size:1.45em;font-weight:800;color:#0F3154;margin:0 0 4px;line-height:1.3;">'
'Neil\'s Framework for Lasting Motivation</h2>\n'
'  <p style="font-size:0.85em;color:#64748b;margin:0 0 22px;font-style:italic;">'
'Listen to the full episode of <em>The Inside Scoop</em>, then read the framework below.</p>\n'
'  <iframe data-testid="embed-iframe" style="border-radius:12px;display:block;" '
'src="https://open.spotify.com/embed/episode/3nYh9J85TXJfpMO9cVCiEC?utm_source=generator" '
'width="100%" height="352" frameBorder="0" allowfullscreen="" '
'allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>\n'
'</div>\n\n'

# Section 1
+ section_header("1", "What Motivation Actually Is")
+ '<p>Here\'s the honest definition I use now: motivation is your child\'s willingness to do something '
'<em>today</em> for a benefit they won\'t feel until later. That\'s it. It\'s the ability to engage in a '
'delayed gratification activity — and that\'s genuinely hard for kids, because their brains are wired for <em>now</em>.</p>\n\n'
'<p>When I understood that, a lot of my frustration disappeared. Matthew wasn\'t being lazy — he was being '
'a normal eight-year-old with a normal eight-year-old brain. My job wasn\'t to override that — it was to '
'make the delayed-gratification loop short enough that he could actually <em>feel</em> it.</p>\n\n'
'<p>This is also why "just make it fun" gets you only so far. Fun solves the immediate resistance. '
'But motivation that lasts is built when your child can <em>see the result</em> of what they\'re doing. '
'Fun is the entry point. Visible progress is what keeps them coming back.</p>\n\n'
+ quote('"I wasn\'t dealing with a lazy kid. I was dealing with a kid whose brain hadn\'t yet learned to value something it couldn\'t feel today."')
+ table(
    ["If your child thinks...", "They will..."],
    [
        ["\"Practice is boring and I\'m not getting better\"", "Avoid it whenever possible"],
        ["\"I can feel myself improving\"", "Start asking to go outside on their own"],
        ["\"This is only fun when I\'m winning\"", "Quit when things get hard"],
        ["\"Each session moves me forward\"", "Stay consistent even on tough days"],
    ],
    ["#0F3154", "#DC373E"]
)
+ tip("Shorten the feedback loop. After every session, point to one concrete thing that\'s better than it was last week. \"That turn — you did that automatically. Two months ago you had to think about it.\" Make the progress visible.")
+ divider()

# Section 2
+ section_header("2", "The Prerequisite: Growth Mindset")
+ '<p>Before any strategy works, your child has to believe that practice <em>does something</em>. '
'If they believe ability is fixed — that they either have it or they don\'t — no training plan will help. '
'They\'ll either coast or give up.</p>\n\n'
'<p>When Adam hit a wall around age ten, it wasn\'t laziness. He\'d been putting in real work but not '
'seeing the results he expected. His friends seemed to be improving faster (they probably weren\'t, but '
'perception is everything at that age). He was quietly frustrated, and that frustration was coming out as resistance.</p>\n\n'
'<p>The fix wasn\'t a better training plan. It was a conversation. And the single most important thing I said:</p>\n\n'
+ quote('"I can see it getting better. You couldn\'t do that six weeks ago."', 'Neil to Adam')
+ '<p>Not "you\'re so talented." Specific. Observable. Tied to effort, not identity. That\'s the sentence '
'that builds growth mindset. Kids who believe improvement is real will practice. Kids who don\'t, won\'t.</p>\n\n'
+ table(
    ["Fixed Mindset says...", "Growth Mindset says..."],
    [
        ["\"I\'m just not good at this\"", "\"I\'m not good at this <em>yet</em>\""],
        ["\"They\'re better than me\"", "\"What are they doing that I can learn from?\""],
        ["\"I messed up, I\'ll never get it\"", "\"I messed up — that tells me what to practice\""],
        ["\"Why bother, I\'ll just fail again\"", "\"Every rep makes the next one easier\""],
    ],
    ["#DC373E", "#16a34a"]
)
+ tip("Swap praise of talent for praise of process. Instead of \"You\'re so good at this,\" try \"I can tell you\'ve been working on that — it shows.\" One habit, big difference.")
+ divider()

# Section 3
+ section_header("3", "The Right Strategy: Touches Over Everything")
+ '<p>One thing I got completely wrong early on: I let Adam spend most of his home training time on '
'finishing. He loved shooting. It was fun. But finishing is the hardest thing to improve at home because '
'you can\'t replicate game pressure by yourself in the backyard.</p>\n\n'
'<p>Ball mastery changed everything. Close-control, quick-feet work — the kind of repetitive, '
'ball-at-your-feet training that builds the neural pathways that make the game feel effortless. '
'Twenty minutes of real ball mastery produces more meaningful touches than an hour of dribbling around cones. '
'More touches = faster visible progress = feedback loop tightens = <em>motivation goes up on its own</em>.</p>\n\n'
+ quote('"When Matthew could feel his feet moving faster than they did a month ago, I didn\'t have to drag him outside anymore. He went on his own."')
+ table(
    ["Training Type", "Touches Per 20 Min", "Visible Progress Speed", "Best for Home?"],
    [
        ["Ball Mastery (feet work)", "500 – 800+", "&#9646;&#9646;&#9646;&#9646;&#9646; Fast", "&#10003; Yes"],
        ["Dribbling with cones", "100 – 200", "&#9646;&#9646;&#9646;&#9645;&#9645; Medium", "&#10003; Yes"],
        ["Shooting / Finishing", "20 – 40", "&#9646;&#9645;&#9645;&#9645;&#9645; Slow", "&#x26A0; Hard alone"],
        ["Free juggling", "200 – 400", "&#9646;&#9646;&#9646;&#9645;&#9645; Medium", "&#10003; Yes"],
    ],
    ["#0F3154", "#475569", "#475569", "#475569"]
)
+ '<p>The irony: letting them do what\'s fun in the short term (shooting) at the expense of what builds '
'the fastest visible progress (ball mastery) actually works against long-term motivation. For structured '
'progressions, <a href="https://www.anytime-soccer.com/our-picks" style="color:#DC373E;font-weight:600;'
'text-decoration:underline;text-underline-offset:3px;">see the gear we actually use</a>.</p>\n\n'
+ free_plan_block()
+ tip("Start with 10 minutes of pure ball mastery before anything else — even if they\'d rather shoot. The feet get sharp, confidence builds, and they usually want to keep going.")
+ divider()

# Section 4
+ section_header("4", "Autonomy: Real Choices, Not False Ones")
+ '<p>There\'s a version of "giving choices" that backfires: false choices. "Do you want to practice today '
'— yes or no?" isn\'t a real choice. It\'s a question with a wrong answer, and kids know it immediately.</p>\n\n'
'<p>Real choice: "We\'re going outside for twenty minutes. You pick what we work on first." The training '
'is happening — that\'s non-negotiable — but they have genuine ownership over the shape of it.</p>\n\n'
+ quote('"Within a few weeks of handing them the clipboard, they started asking me what I thought they should work on. The training felt like theirs — my input became something they wanted, not something imposed."')
+ table(
    ["False Choice (backfires)", "Real Choice (builds ownership)"],
    [
        ['"Do you want to practice today?"', '"You pick the first drill — ball mastery or dribbling?"'],
        ['"You need to go outside and train."', '"We\'ve got 20 minutes. What are we working on?"'],
        ['"Practice or no screen time."', '"Should we start with footwork or juggling challenge?"'],
        ['"You said you wanted to get better."', '"I\'m going outside — want to join me?"'],
    ],
    ["#DC373E", "#16a34a"]
)
+ '<p>Technology helps here more than I expected. When Matthew could open an app and choose his own drill '
'video, the buy-in was completely different. He\'d spend five minutes choosing before we even went outside. '
'By the time we got to the backyard, he was already invested.</p>\n\n'
+ tip("Give three real options every session: \"Ball mastery, shooting practice, or free juggle challenge — your call.\" All are valid. The choice creates investment before you even pick up a ball.")
+ divider()

# Section 5
+ section_header("5", "Lead by Example")
+ '<p>Kids watch what you do more carefully than they listen to what you say. If I spent my evenings '
'on the couch telling Adam to get off his video games, the message I was actually sending was: '
'<em>screen time is how adults relax, practice is what kids have to do.</em></p>\n\n'
'<p>The moment I stepped off the "coach" pedestal and picked up a ball myself, both boys responded '
'completely differently. I wasn\'t evaluating them anymore. I was playing with them.</p>\n\n'
+ quote('"Adam lit up when I made mistakes in front of him. He\'d laugh. He\'d correct me. Suddenly he was the one with knowledge to share — not just the student being observed."')
+ '<p>When I laughed at my own bad juggling attempts, the whole dynamic changed. He stopped feeling '
'evaluated. And somewhere along the way, he stopped needing to be invited outside at all.</p>\n\n'
+ tip("Ask your child to teach you something once per session. \"Show me that move\" or \"how do I do that footwork?\" Kids who feel like experts don\'t dread going to practice.")
+ divider()

# Section 6
+ section_header("6", "Making It Uneventful")
+ '<p>The goal, ultimately, is for home training to become so routine that it stops feeling like a '
'decision. Not an event. Not a negotiation. Just <em>what we do on Tuesdays and Thursdays</em>. '
'Like dinner. Like homework. It\'s just part of the week.</p>\n\n'
'<p>"Event" training — the big formal sessions you announce — creates pressure. Routine training '
'becomes part of the landscape of the week. Less drama, more consistency.</p>\n\n'
+ quote('"\'Uneventful\' is the highest compliment I can give a home training habit. It means the resistance is gone. The motivation question has been answered — not with a pep talk, but with a system."', 'Neil Crawford')
+ table(
    ["Event Training", "Routine Training"],
    [
        ["Announced in advance, feels like a big deal", "Same days every week, no announcement needed"],
        ["High pressure — child feels evaluated", "Low stakes — just another Tuesday"],
        ["Resistance builds in the hours before", "No negotiation — it\'s just what we do"],
        ["Fades after a few weeks", "Gets easier every month"],
        ["Relies on motivation", "Relies on habit — motivation not required"],
    ],
    ["#DC373E", "#16a34a"]
)
+ tip("Pick two fixed days and put them in the family calendar. The battle isn\'t \"will we do it?\" — it\'s just \"which drill first?\" That small shift removes most of the friction.")
+ divider()

# Giveaway
+ giveaway_block()

# Recommended read block
+ '<div style="background:linear-gradient(135deg,#F0F9FF,#E0F2FE);border:1px solid #7DD3FC;'
'border-radius:16px;padding:24px 28px;margin:36px 0;display:flex;gap:18px;align-items:center;'
'box-shadow:0 2px 12px rgba(14,165,233,0.1);">'
'<div style="font-size:2.2em;flex-shrink:0;">&#128218;</div>'
'<div>'
'<p style="font-size:0.75em;font-weight:800;color:#0369a1;text-transform:uppercase;'
'letter-spacing:0.09em;margin:0 0 4px;">Recommended Read</p>'
'<p style="font-size:1.02em;font-weight:700;color:#0c4a6e;margin:0 0 6px;">'
'The Must-Have Guide for Serious Soccer Parents</p>'
'<p style="font-size:0.9em;color:#0369a1;margin:0 0 14px;line-height:1.6;">'
'Everything you need to know about supporting your child\'s soccer development — '
'from choosing the right club to building the right home environment.</p>'
'<a href="https://www.anytime-soccer.com/must-have-guide-for-serious-soccer-parents" '
'style="display:inline-block;background:#0284c7;color:#fff;font-weight:700;font-size:0.88em;'
'padding:10px 22px;border-radius:10px;text-decoration:none;">Read the Guide &#8594;</a>'
'</div></div>\n\n'
+ divider()

# Checklist
+ '<h2 style="font-size:1.6em;font-weight:800;color:#0F3154;margin:40px 0 20px;">The Checklist: Setting Up a Session That Actually Happens</h2>\n\n'
'<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px;margin:24px 0 40px;">'

'<div style="background:#F8FAFC;border:1px solid #E1E8EF;border-radius:16px;padding:24px;">'
'<p style="font-size:0.78em;font-weight:800;color:#0F3154;text-transform:uppercase;letter-spacing:0.08em;'
'margin:0 0 14px;display:flex;align-items:center;gap:8px;">'
'<span style="background:#0F3154;color:#fff;width:22px;height:22px;border-radius:6px;display:inline-flex;'
'align-items:center;justify-content:center;font-size:0.85em;flex-shrink:0;">&#x23F0;</span>'
'Before</p>'
'<ul style="padding-left:18px;line-height:2;color:#374151;font-size:0.9em;margin:0;">'
'<li>Good headspace? (Hungry / tired = reschedule)</li>'
'<li>Time limit set? (20–30 min is the sweet spot)</li>'
'<li>Asked if they\'d like to pick the first drill?</li>'
'<li>Know what they\'ve been excited about lately?</li>'
'</ul></div>'

'<div style="background:#F8FAFC;border:1px solid #E1E8EF;border-radius:16px;padding:24px;">'
'<p style="font-size:0.78em;font-weight:800;color:#0F3154;text-transform:uppercase;letter-spacing:0.08em;'
'margin:0 0 14px;display:flex;align-items:center;gap:8px;">'
'<span style="background:#DC373E;color:#fff;width:22px;height:22px;border-radius:6px;display:inline-flex;'
'align-items:center;justify-content:center;font-size:0.85em;flex-shrink:0;">&#9917;</span>'
'During</p>'
'<ul style="padding-left:18px;line-height:2;color:#374151;font-size:0.9em;margin:0;">'
'<li>More praise than corrections?</li>'
'<li>Participating, not just watching?</li>'
'<li>At least one free-play window?</li>'
'<li>One specific win acknowledged?</li>'
'</ul></div>'

'<div style="background:#F8FAFC;border:1px solid #E1E8EF;border-radius:16px;padding:24px;">'
'<p style="font-size:0.78em;font-weight:800;color:#0F3154;text-transform:uppercase;letter-spacing:0.08em;'
'margin:0 0 14px;display:flex;align-items:center;gap:8px;">'
'<span style="background:#16a34a;color:#fff;width:22px;height:22px;border-radius:6px;display:inline-flex;'
'align-items:center;justify-content:center;font-size:0.85em;flex-shrink:0;">&#10003;</span>'
'After</p>'
'<ul style="padding-left:18px;line-height:2;color:#374151;font-size:0.9em;margin:0;">'
'<li>Ended on a high note?</li>'
'<li>Skipped the post-session critique?</li>'
'<li>Expressed genuine enjoyment?</li>'
'</ul></div>'
'</div>\n\n'
+ divider()

# Do's and Don'ts
+ '<h2 style="font-size:1.6em;font-weight:800;color:#0F3154;margin:40px 0 20px;">The Do\'s and Don\'ts</h2>\n\n'
'<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin:24px 0 40px;">'
'<div style="background:linear-gradient(160deg,#f0fdf4,#dcfce7);border:1px solid #86efac;border-radius:16px;padding:24px;">'
'<p style="font-size:0.78em;font-weight:800;color:#15803d;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 16px;">&#10003;&nbsp; Do\'s</p>'
'<p style="font-size:0.9em;color:#166534;line-height:1.7;margin:0 0 12px;"><strong>Start shorter than you think.</strong> 20 focused minutes beats a dragged-out hour.</p>'
'<p style="font-size:0.9em;color:#166534;line-height:1.7;margin:0 0 12px;"><strong>Celebrate improvement, not performance.</strong> Hold up the mirror — they can\'t always see their own progress.</p>'
'<p style="font-size:0.9em;color:#166534;line-height:1.7;margin:0 0 12px;"><strong>Use video.</strong> Watch pros together, then go replicate the moves. Screen time feeding training time.</p>'
'<p style="font-size:0.9em;color:#166534;line-height:1.7;margin:0 0 12px;"><strong>Let sessions fail sometimes.</strong> Bad energy today = short session, come back tomorrow.</p>'
'<p style="font-size:0.9em;color:#166534;line-height:1.7;margin:0;"><strong>Let them teach you.</strong> Kids who feel like experts want to practice more.</p>'
'</div>'
'<div style="background:linear-gradient(160deg,#fff1f2,#ffe4e6);border:1px solid #fca5a5;border-radius:16px;padding:24px;">'
'<p style="font-size:0.78em;font-weight:800;color:#b91c1c;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 16px;">&#10007;&nbsp; Don\'ts</p>'
'<p style="font-size:0.9em;color:#7f1d1d;line-height:1.7;margin:0 0 12px;"><strong>Connect training to game failures.</strong> "You lose the ball because your first touch is bad" kills motivation.</p>'
'<p style="font-size:0.9em;color:#7f1d1d;line-height:1.7;margin:0 0 12px;"><strong>Correct every mistake.</strong> Max one correction per session. Let everything else go.</p>'
'<p style="font-size:0.9em;color:#7f1d1d;line-height:1.7;margin:0 0 12px;"><strong>Use training as punishment.</strong> Soccer is the reward, not the stick.</p>'
'<p style="font-size:0.9em;color:#7f1d1d;line-height:1.7;margin:0 0 12px;"><strong>Compare them to others.</strong> Siblings, teammates, YouTube prodigies — all poison for intrinsic motivation.</p>'
'<p style="font-size:0.9em;color:#7f1d1d;line-height:1.7;margin:0;"><strong>Push through genuine resistance.</strong> Back off. Have a conversation. It\'s usually about something else.</p>'
'</div></div>\n\n'
+ divider()

# Bigger picture
+ '<h2 style="font-size:1.6em;font-weight:800;color:#0F3154;margin:40px 0 16px;">The Bigger Picture</h2>\n\n'
'<p>When I watch Adam and Matthew play now, the thing I\'m proudest of isn\'t their ability — although '
'watching their growth has been one of the great joys of my life.</p>\n\n'
'<p>What I\'m proudest of is that they still <em>want</em> to play. They\'re not burned out. They\'re not '
'grinding through a sport they secretly hate. They still go outside on their own. The love of the game is still there.</p>\n\n'
'<p>That doesn\'t happen by accident. It happens when parents protect the joy instead of just developing the skill.</p>\n\n'
+ quote('"A motivated child will always outperform a coerced one. Not sometimes. Always. Protect the joy. The skill will follow."', 'Neil Crawford')

# CTA
+ '\n<div style="background:linear-gradient(135deg,#0F3154,#1a4a78);border-radius:20px;padding:40px;'
'margin:48px 0;text-align:center;box-shadow:0 8px 32px rgba(15,49,84,0.25);">'
'<p style="font-size:0.75em;font-weight:800;color:rgba(255,255,255,0.5);text-transform:uppercase;'
'letter-spacing:0.12em;margin:0 0 10px;">Ready to Make It Easier?</p>'
'<h3 style="font-size:1.55em;font-weight:800;color:#ffffff;margin:0 0 14px;line-height:1.3;">'
'Build the Habit With a Plan That Does the Thinking For You</h3>'
'<p style="color:rgba(255,255,255,0.7);margin:0 auto 28px;font-size:0.95em;max-width:480px;">'
'Thousands of drill videos organized by age and skill level. You show up. We handle the curriculum.</p>'
'<a href="https://app.anytime-soccer.com/register" style="display:inline-block;'
'background:linear-gradient(135deg,#DC373E,#b91c1c);color:#ffffff;font-weight:800;font-size:1em;'
'padding:16px 36px;border-radius:12px;text-decoration:none;'
'box-shadow:0 4px 16px rgba(220,55,62,0.5);">Start Your Free 7-Day Trial &#8594;</a>'
'</div>\n\n'

# Author card
f'<div style="display:flex;align-items:flex-start;gap:20px;'
'background:linear-gradient(135deg,#F8FAFC,#EEF2FF);border-radius:16px;padding:24px 28px;'
'margin-top:40px;border:1px solid #C7D7FA;box-shadow:0 2px 12px rgba(15,49,84,0.06);">'
f'<img src="{AVATAR}" alt="Neil Crawford" style="width:68px;height:68px;border-radius:50%;'
'object-fit:cover;flex-shrink:0;border:3px solid #fff;box-shadow:0 4px 14px rgba(15,49,84,0.2);" />'
'<div>'
'<p style="font-size:0.75em;font-weight:800;color:#DC373E;text-transform:uppercase;'
'letter-spacing:0.09em;margin:0 0 4px;">About the Author</p>'
'<p style="font-size:0.97em;font-weight:700;color:#0F3154;margin:0 0 6px;">Neil Crawford</p>'
'<p style="font-size:0.88em;color:#64748b;margin:0;line-height:1.65;">'
'Founder of Anytime Soccer Training and soccer dad to Adam and Matthew. He built the platform because '
'he couldn\'t find one that worked for real families with real schedules — and because he made enough '
'mistakes in his own backyard to fill a book.</p>'
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
