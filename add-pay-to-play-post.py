import json, sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/posts.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

AVATAR = "https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1779745975826-iqel6b.png"

def quote(text, attribution=None):
    attr = (f'<p style="font-size:0.82em;font-weight:700;color:#DC373E;margin:14px 0 0;'
            f'letter-spacing:0.05em;text-transform:uppercase;">&mdash; {attribution}</p>') if attribution else ''
    return (
        '<div style="position:relative;background:linear-gradient(135deg,#F8FAFF 0%,#EEF4FF 100%);'
        'border-radius:16px;padding:32px 36px 28px;margin:32px 0;overflow:hidden;'
        'border:1px solid #C7D7FA;box-shadow:0 2px 12px rgba(15,49,84,0.07);">'
        '<div style="position:absolute;top:-10px;left:20px;font-size:7em;color:rgba(15,49,84,0.06);'
        'font-family:Georgia,serif;line-height:1;pointer-events:none;">&ldquo;</div>'
        f'<p style="font-size:1.08em;font-style:italic;color:#0F3154;line-height:1.75;margin:0;'
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
        f'letter-spacing:0.08em;margin:0 0 5px;">Takeaway</p>'
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

CONTENT = (
'<div class="post-content">\n\n'

'<p style="font-size:0.85em;font-weight:700;color:#DC373E;letter-spacing:0.1em;text-transform:uppercase;'
'margin-bottom:10px;display:inline-block;background:#FFF1F2;padding:4px 12px;border-radius:20px;">'
'Pay to Play &amp; The Cost of Club Soccer</p>\n\n'

'<p class="lead" style="font-size:1.18em;line-height:1.8;color:#374151;">'
'Every spring, parents across America open their email, see a registration invoice from their child\'s '
'soccer club, and feel the same slow burn. Another year, another four-figure bill. The conversations '
'that follow are always the same: clubs are greedy, the system is broken, and in Europe they do it for '
'almost nothing.</p>\n\n'

'<p>I\'ve had that conversation more times than I can count. And I\'ve been frustrated too — I write a check '
'every year and feel every dollar of it. But after spending a lot of time thinking about this, reading about it, '
'and talking with coaches and parents across the country, I\'ve come to believe that the popular framing of '
'the problem is mostly wrong.</p>\n\n'

'<p>The clubs aren\'t running a racket. The coaches in Spain aren\'t magic. And the solution isn\'t as simple '
'as "just make it cheaper."</p>\n\n'

'<p>Here\'s my attempt at an honest breakdown — covering both sides of the equation that almost nobody talks about together.</p>\n\n'

+ quote('"The problem is presented as: the clubs have figured out how to charge a lot and get a lot for free. But that\'s not the whole story — and if we\'re going to solve it, we need to understand all of it."', 'Neil Crawford')
+ divider()

# Podcast block
+ '<div style="background:linear-gradient(135deg,#EEF4FF,#E8F0FE);border-radius:20px;padding:36px;'
'margin:0 0 48px;border:1px solid #C7D7FA;">'
'\n  <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">'
'<span style="font-size:1.3em;">&#127911;</span>'
'<p style="font-size:0.75em;font-weight:800;color:#DC373E;text-transform:uppercase;letter-spacing:0.1em;margin:0;">From the Podcast — The Inside Scoop</p></div>'
'\n  <h2 style="font-size:1.35em;font-weight:800;color:#0F3154;margin:0 0 4px;line-height:1.3;">'
'Why Is Soccer So Expensive in America?</h2>'
'\n  <p style="font-size:0.85em;color:#64748b;margin:0 0 22px;font-style:italic;">'
'Neil breaks down the supply and demand forces behind the cost of club soccer — listen to the full episode below.</p>'
'\n  <iframe style="border-radius:12px;display:block;" '
'src="https://open.spotify.com/embed/episode/3nYh9J85TXJfpMO9cVCiEC?utm_source=generator" '
'width="100%" height="152" frameBorder="0" allowfullscreen="" '
'allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>'
'\n</div>\n\n'

+ section_header("1", "Start With the Framework: Supply and Demand")
+ '<p>Every pricing question — for anything — comes down to two forces: <strong>supply</strong> and '
'<strong>demand</strong>. The supply side is the organizations and people providing the service. The demand '
'side is the consumers willing to pay for it. When people ask why club soccer costs what it costs, they\'re '
'almost always only looking at the supply side — the clubs, the coaches, the fees. They\'re ignoring the '
'demand side almost entirely.</p>\n\n'

'<p>That\'s the first mistake. And it leads to the wrong diagnosis, which leads to the wrong solutions.</p>\n\n'

+ table(
    ["Side", "Who This Is", "The Core Question"],
    [
        ["Supply", "Clubs, coaches, leagues, facilities", "Why do they charge so much?"],
        ["Demand", "Parents, families, culture", "Why are we willing to pay it?"],
        ["Convergence", "The market as it exists today", "What happens when both sides push in the same direction?"],
    ],
    ["#0F3154", "#475569", "#64748b"]
)
+ tip("Before blaming the club, ask: what are we actually demanding — and who else is willing to pay for it at this price? The answer changes the whole conversation.")
+ divider()

+ section_header("2", "The Demand Side: An American Cultural Story")
+ '<p>Here\'s something that\'s genuinely different about the United States: a significant segment of American '
'parents are willing to pay for professional-level, high-volume sports training for kids who have never been '
'scouted, never demonstrated elite potential, and may not even want to play professionally.</p>\n\n'

'<p>That\'s not an insult. I\'m one of those parents. But it\'s worth naming clearly, because it drives '
'everything else.</p>\n\n'

'<p>There\'s something deeply American about it. The cultural belief is: <em>if you give us access to the '
'same resources and opportunities as anyone else, we can make it.</em> That\'s a beautiful thing. It\'s also '
'what creates a market where families invest heavily in youth sports before their child has proven they need '
'that level of investment.</p>\n\n'

+ quote('"In the US, a certain segment of the population is willing to pay for a premium, professional level of service for a child who hasn\'t been scouted — and who might not even want to become a professional player. Someone has to pay for that."', 'Neil Crawford')

+ '<p>Travel sports — not just soccer, but basketball, baseball, lacrosse — plays an outsized role in a '
'certain segment of American life. This is a cultural reality, not a flaw. But it has real consequences '
'for pricing.</p>\n\n'

+ table(
    ["Country", "Who Gets Professional Coaching?", "Who Pays?", "Volume"],
    [
        ["USA (club model)", "Any child whose parents can afford it", "Families — full cost", "4–5 days/week"],
        ["Spain / Germany (grassroots)", "Kids who show up to the local club", "Volunteer coaches — minimal cost", "2–3 days/week"],
        ["Spain / Germany (academy)", "Scouted, elite-level talent only", "The academy club", "Daily, full program"],
        ["USA (rec league)", "All kids in the community", "Municipal / subsidized", "1–2 days/week"],
    ],
    ["#0F3154", "#475569", "#475569", "#475569"]
)
+ tip("The European academy model only serves the top 1–2% of players. It\'s not a template for mass youth development — it\'s a talent extraction system for already-identified elite kids.")
+ divider()

+ section_header("3", "What We Lost: The Volunteer Model")
+ '<p>There\'s a version of youth sports that used to exist in America — and still exists in much of the '
'world — that we\'ve largely abandoned. My dad coached baseball in the community. He didn\'t get paid. He '
'coached five days a week, ran his own Little League, and did it because that\'s what parents did.</p>\n\n'

'<p>When I was younger, my son played in Hispanic rec leagues. The coach wasn\'t polished in year one. By '
'year five, he was excellent. The team practiced four or five days a week. They traveled and won tournaments. '
'It was volunteer-based. The cost was almost nothing. And the quality was real.</p>\n\n'

+ quote('"If we were in any other part of the world, I would still be coaching my twelve-year-old myself — and I\'d have a decade of experience by now. The parent-coach model builds depth over time. We\'ve walked away from that."', 'Neil Crawford')

+ '<p>That model works because it compounds. A parent who starts coaching at age five has seven years of '
'experience by the time their kid is twelve. They\'ve networked with other coaches. A second child means '
'thirteen years combined. By the time they\'re done, they\'re genuinely good coaches — because practice '
'makes you better at anything.</p>\n\n'

'<p>We traded that model for a paid professional one. The trade-off was intentional — we wanted more. '
'But it came at a cost.</p>\n\n'

+ table(
    ["Volunteer Model (Then / Abroad)", "Professional Club Model (US Today)"],
    [
        ["Parent or community coach — unpaid", "Paid full-time or part-time coaching staff"],
        ["3–5 practices/week — minimal overhead", "4–5 practices + travel — significant overhead"],
        ["Available to everyone in the community", "Available to families who can afford it"],
        ["Quality builds over years via experience", "Quality varies — depends on club investment"],
        ["Best kids stay in the community pool", "Best kids extracted into club system early"],
        ["Volunteer coaches improve with reps", "High coach turnover as staff seek better pay"],
    ],
    ["#16a34a", "#DC373E"]
)
+ tip("The volunteer model didn\'t disappear because it was bad. It disappeared because a segment of parents demanded more volume, more structure, and more professional delivery — and were willing to pay for it.")
+ divider()

+ section_header("4", "The Supply Side: US Soccer and the Consolidation Problem")
+ '<p>On the supply side, the honest answer is that the governing bodies — US Soccer most prominently — '
'have not created a marketplace that would allow competition to drive prices down.</p>\n\n'

'<p>In many markets, large clubs have entered into long-term field rental agreements with municipalities. '
'They control the field space. They control the leagues. That combination makes it very hard for a new, '
'leaner operator to enter the market and offer the same service at a lower price.</p>\n\n'

+ quote('"They\'ve allowed organizations and investors to consolidate power in a way that removes the incentive to bring down the price point. That\'s a long way of saying: there\'s no real competition pressure keeping costs down."', 'Neil Crawford')

+ '<p>This isn\'t unique to soccer. In AAU basketball, technically anyone can start a team tomorrow. '
'And yet AAU is still expensive — because the demand side hasn\'t changed. A volunteer coach isn\'t going '
'to run four training sessions a week plus weekend travel tournaments. And that\'s not what most parents '
'want anyway. So the price stays elevated regardless of the structural barriers.</p>\n\n'

'<p>The supply side problems are real, but they\'re not the whole story — and fixing them alone won\'t '
'solve the cost problem if the demand hasn\'t changed.</p>\n\n'

+ table(
    ["Supply-Side Problem", "Real Impact"],
    [
        ["Club consolidation via field control", "Limits new, cheaper operators from entering market"],
        ["Long-term municipal lease lock-ins", "Reduces available field space for competitors"],
        ["League participation tied to club affiliation", "Weaponizes access to competition"],
        ["No structured pathway for independent operators", "Discourages grassroots innovation"],
        ["High coaching staff overhead", "Passed directly to families in registration fees"],
    ],
    ["#0F3154", "#DC373E"]
)
+ tip("Structural reform matters — but it won\'t fix the price problem alone. Even in AAU basketball, where anyone can start a team, costs remain high because of what parents are demanding.")
+ divider()

+ section_header("5", "The International Comparison Fallacy")
+ '<p>The comparison I hear most often: "In Spain or Germany, they get this level of coaching and '
'only pay a fraction of what we pay. Why can\'t we do that here?"</p>\n\n'

'<p>There are two things wrong with this comparison.</p>\n\n'

'<p><strong>First:</strong> the grassroots coaches in Spain and Germany aren\'t getting paid either. '
'They\'re volunteers. The low cost isn\'t a feature of smart administration — it\'s a feature of free labor. '
'The moment you want those coaches to be paid professionals running four sessions a week, the cost goes up.</p>\n\n'

'<p><strong>Second:</strong> the professional academies people are comparing to — Barcelona B, Bayern '
'youth, Ajax — only serve a tiny percentage of the player population. They scout, they select, and they '
'cut. If your child doesn\'t make the standard, they\'re not in. Those academies are not investing in '
'average kids to see if they develop. That\'s so far from what they do that it\'s barely worth comparing.</p>\n\n'

+ quote('"Those academies only service a small percentage of the population. If you\'re not good enough, they cut you. They are not going around investing in average kids to see what happens. That is not what they do."', 'Neil Crawford')

+ table(
    ["What People Imagine", "What\'s Actually True"],
    [
        ["German clubs pay pro coaches for all youth players", "Grassroots coaches are volunteers — unpaid"],
        ["Spanish academies are open to any motivated player", "Academy spots are scouted, competitive, and cuts are real"],
        ["The system is cheaper because it\'s better run", "It\'s cheaper because the labor is free or subsidized"],
        ["Every kid gets academy-level development", "Most kids get rec-level development from volunteer parents"],
        ["The US could replicate this with better governance", "It would require Americans to accept the volunteer model — and most won\'t"],
    ],
    ["#DC373E", "#16a34a"]
)
+ tip("If you want the European model, you also have to accept European reality: most kids don\'t get professional coaching. They get parents. The academy slots go to the kids who earn them.")
+ divider()

+ section_header("6", "The School Analogy That Actually Explains It")
+ '<p>The best way I\'ve found to explain what\'s happened to the youth soccer ecosystem is this:</p>\n\n'

'<p>Imagine the most motivated, most resource-rich families in your town decided — all at once — to pull '
'their children out of the public school system and enroll them in private schools. Now imagine the public '
'school system in this town relied heavily on those parents to volunteer, mentor, and support. Those parents '
'are now gone. Their children — often the most academically engaged kids — are gone with them.</p>\n\n'

'<p>The public school still exists. The kids who remain still attend. But the culture of that school, the '
'volunteer energy, the peer dynamics — it\'s diminished. The private school is excellent. The public school '
'is struggling. And the gap between them has widened over time.</p>\n\n'

+ quote('"That is essentially what happened to American youth soccer. The most motivated, most committed parents left the rec and community system. They took their kids with them. And what they left behind was hollowed out."', 'Neil Crawford')

+ '<p>This is not a moral argument — it\'s a structural one. Nobody made the wrong choice. Parents wanted '
'more for their kids and went to get it. But the downstream effect on the community system was real, and '
'it\'s part of why rec soccer in America often feels under-resourced compared to what it once was.</p>\n\n'
+ divider()

+ '<h2 style="font-size:1.6em;font-weight:800;color:#0F3154;margin:40px 0 16px;">So What Do We Do With This?</h2>\n\n'

'<p>I don\'t have a complete solution — and I\'m suspicious of anyone who says they do. What I do believe '
'is this: <strong>you cannot solve a problem you haven\'t correctly diagnosed.</strong></p>\n\n'

'<p>If your mental model is "the club is ripping me off," you\'re going to advocate for caps on fees, '
'for more regulation, for someone to step in and fix the supply side. Some of that may be appropriate. '
'But it won\'t fully solve the problem, because the demand side will still be there — and as long as '
'enough families are willing to pay a premium for high-volume professional coaching, that market will exist.</p>\n\n'

'<p>The more interesting conversation is: what can we do on both sides simultaneously?</p>\n\n'

+ '<div style="background:linear-gradient(135deg,#F8FAFC,#EEF2FF);border-radius:16px;padding:28px 32px;'
'margin:32px 0;border:1px solid #C7D7FA;">'
'<p style="font-size:0.78em;font-weight:800;color:#0F3154;text-transform:uppercase;letter-spacing:0.08em;'
'margin:0 0 16px;">Realistic Levers for Change</p>'
'<div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;">'
'<div>'
'<p style="font-size:0.8em;font-weight:700;color:#16a34a;text-transform:uppercase;margin:0 0 10px;">Supply Side</p>'
'<ul style="padding-left:18px;font-size:0.9em;color:#374151;line-height:1.9;margin:0;">'
'<li>Break up field-space monopolies</li>'
'<li>Open pyramid access for smaller clubs</li>'
'<li>Fund community coaching development</li>'
'<li>Require subsidized spots in club programs</li>'
'</ul></div>'
'<div>'
'<p style="font-size:0.8em;font-weight:700;color:#DC373E;text-transform:uppercase;margin:0 0 10px;">Demand Side</p>'
'<ul style="padding-left:18px;font-size:0.9em;color:#374151;line-height:1.9;margin:0;">'
'<li>Re-invest in rec and community leagues</li>'
'<li>Normalize parent coaching as a real contribution</li>'
'<li>Supplement club with low-cost home training</li>'
'<li>Reframe development as long-term, not pay-to-play</li>'
'</ul></div>'
'</div></div>\n\n'

+ quote('"We\'ve got to have a clear understanding of what the problems are if we\'re going to produce any realistic solutions. If I think the problem is my club overcharging me when they\'re providing four days a week of training and two paid coaches, I may not be in a position to come up with a realistic solution."', 'Neil Crawford')

+ divider()

# Supplement CTA
+ '<div style="background:linear-gradient(135deg,#FFF7ED,#FEF3C7);border:1px solid #FCD34D;'
'border-radius:18px;padding:28px 32px;margin:36px 0;display:flex;gap:20px;align-items:center;'
'box-shadow:0 2px 16px rgba(251,191,36,0.15);">'
'<div style="font-size:2.4em;flex-shrink:0;">&#9917;</div>'
'<div>'
'<p style="font-size:0.78em;font-weight:800;color:#92400e;text-transform:uppercase;'
'letter-spacing:0.09em;margin:0 0 4px;">One Thing You Can Control</p>'
'<p style="font-size:1.02em;font-weight:700;color:#78350f;margin:0 0 6px;">'
'Supplement Club With Home Training — For Almost Nothing</p>'
'<p style="font-size:0.9em;color:#92400e;margin:0 0 14px;line-height:1.6;">'
'Whatever you spend on club, the biggest performance gains still happen at home — in the backyard, '
'with a ball and a plan. Our library of 5,000+ training videos costs less than a dinner for two per year.</p>'
'<a href="https://app.anytime-soccer.com/register" '
'style="display:inline-block;background:#DC373E;color:#fff;font-weight:700;font-size:0.88em;'
'padding:10px 22px;border-radius:10px;text-decoration:none;">Try It Free for 7 Days &#8594;</a>'
'</div></div>\n\n'

+ divider()

+ '<h2 style="font-size:1.6em;font-weight:800;color:#0F3154;margin:40px 0 16px;">The Bottom Line</h2>\n\n'

'<p>Club soccer is expensive in America because a significant segment of the population is willing to pay '
'for professional-level, high-volume youth sports development — and has been willing to pay for it long '
'before their kids have demonstrated they need it. That demand distorts the market, hollows out the '
'volunteer-based community system, and makes the gap between those who can afford it and those who can\'t '
'grow wider over time.</p>\n\n'

'<p>The supply side has real problems too — consolidation, field-space monopolies, lack of a genuine open '
'pyramid. Those are worth fighting. But fixing them without addressing the cultural demand won\'t '
'solve the pricing problem.</p>\n\n'

'<p>And comparing our system to European grassroots or academies misses the key detail: those systems are '
'either built on free labor, or they only serve the elite. America has never fully accepted either of those '
'constraints — and arguably shouldn\'t have to.</p>\n\n'

'<p>The path forward probably isn\'t a single policy fix. It\'s a combination: more structural competition '
'on the supply side, renewed investment in community and rec systems, and a cultural conversation about '
'what we\'re actually demanding — and whether it\'s serving our kids, or just our anxiety.</p>\n\n'

+ quote('"Culture is not right or wrong. Culture is just different. But understanding our culture is the first step to changing the parts of it that aren\'t working."', 'Neil Crawford')

+ '\n<div style="background:linear-gradient(135deg,#0F3154,#1a4a78);border-radius:20px;padding:40px;'
'margin:48px 0;text-align:center;box-shadow:0 8px 32px rgba(15,49,84,0.25);">'
'<p style="font-size:0.75em;font-weight:800;color:rgba(255,255,255,0.5);text-transform:uppercase;'
'letter-spacing:0.12em;margin:0 0 10px;">Whatever Club Costs —</p>'
'<h3 style="font-size:1.55em;font-weight:800;color:#ffffff;margin:0 0 14px;line-height:1.3;">'
'Make the Most of It With Better Home Training</h3>'
'<p style="color:rgba(255,255,255,0.7);margin:0 auto 28px;font-size:0.95em;max-width:500px;">'
'5,000+ training videos. Weekly plans by age and skill. The individual development work clubs don\'t have '
'time for — done at home, on your schedule, for less than a dinner for two per year.</p>'
'<a href="https://app.anytime-soccer.com/register" style="display:inline-block;'
'background:linear-gradient(135deg,#DC373E,#b91c1c);color:#ffffff;font-weight:800;font-size:1em;'
'padding:16px 36px;border-radius:12px;text-decoration:none;'
'box-shadow:0 4px 16px rgba(220,55,62,0.5);">Start Free — No Credit Card Needed &#8594;</a>'
'</div>\n\n'

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

NEW_POST = {
    "id": 100000,
    "title": "No, The Club Isn't Ripping You Off. Here's the Real Reason Club Soccer Is So Expensive.",
    "slug": "why-is-youth-soccer-so-expensive-supply-demand-american-culture",
    "date": "Mon, 26 May 2026 10:00:00 +0000",
    "excerpt": "Everyone says the clubs are overcharging. But after looking at both sides of the equation — supply and demand — the real story is more complicated, more cultural, and harder to fix than most people want to admit.",
    "categories": ["Blog", "Pay to Play", "Club Soccer", "Parent Guide"],
    "tags": ["pay to play", "club soccer", "youth soccer cost", "soccer culture", "travel sports"],
    "thumbnailId": None,
    "featuredImage": "",
    "content": CONTENT
}

posts.insert(0, NEW_POST)
print("New post added. Total posts:", len(posts))

with open('src/data/posts.json', 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)
print("posts.json saved.")
