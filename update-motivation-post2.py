import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/posts.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

TARGET = "how-to-motivate-your-child-to-practice-soccer-at-home"
AVATAR = "https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1779745975826-iqel6b.png"
NEW_TITLE = "I Figured Out How to Motivate My Kids — And It Has Nothing to Do With Making It Fun"

PODCAST_SECTION = (
    '\n<div style="background:#F0F6FF;border-radius:16px;padding:32px 36px;margin:48px 0;border:1px solid #D0E4F8;">'
    '\n  <p style="font-size:0.75em;font-weight:700;color:#DC373E;text-transform:uppercase;letter-spacing:0.09em;margin:0 0 8px;">&#127911; From the Podcast</p>'
    '\n  <h2 style="font-size:1.4em;font-weight:800;color:#0F3154;margin:0 0 6px;line-height:1.3;">Neil\'s Framework for Lasting Motivation</h2>'
    '\n  <p style="font-size:0.85em;color:#64748b;margin:0 0 24px;font-style:italic;">The following is adapted from <em>The Inside Scoop</em> podcast &mdash; a longer conversation about what actually drives a child to want to practice.</p>'
    '\n  <h3 style="font-size:1.05em;font-weight:700;color:#0F3154;margin:24px 0 8px;">What Motivation Actually Is</h3>'
    '\n  <p style="font-size:0.95em;color:#334155;line-height:1.7;margin:0 0 16px;">Here\'s the honest definition I use now: motivation is your child\'s willingness to do something <em>today</em> for a benefit they won\'t feel until later. That\'s it. It\'s the ability to engage in a delayed gratification activity &mdash; and that\'s genuinely hard for kids, because their brains are wired for <em>now</em>.</p>'
    '\n  <p style="font-size:0.95em;color:#334155;line-height:1.7;margin:0 0 16px;">When I understood that, a lot of my frustration disappeared. Matthew wasn\'t being lazy when he didn\'t want to come outside. He was being a normal eight-year-old with a normal eight-year-old brain. My job wasn\'t to override that &mdash; it was to make the delayed-gratification loop short enough that he could actually <em>feel</em> it.</p>'
    '\n  <h3 style="font-size:1.05em;font-weight:700;color:#0F3154;margin:24px 0 8px;">The Prerequisite: Growth Mindset</h3>'
    '\n  <p style="font-size:0.95em;color:#334155;line-height:1.7;margin:0 0 16px;">Before any strategy works, you need the foundation: your child has to believe that practice <em>does something</em>. If they believe ability is fixed &mdash; that they either have it or they don\'t &mdash; no amount of structured training will help. They\'ll either coast or give up.</p>'
    '\n  <p style="font-size:0.95em;color:#334155;line-height:1.7;margin:0 0 16px;">The single most important thing I ever said to Adam: <strong>&ldquo;I can see it getting better. You couldn\'t do that six weeks ago.&rdquo;</strong> Not &ldquo;you\'re so talented.&rdquo; Not &ldquo;you\'re the best on your team.&rdquo; Specific. Observable. Tied to effort, not identity. That\'s the sentence that builds growth mindset.</p>'
    '\n  <h3 style="font-size:1.05em;font-weight:700;color:#0F3154;margin:24px 0 8px;">The Right Strategy: Touches Over Everything</h3>'
    '\n  <p style="font-size:0.95em;color:#334155;line-height:1.7;margin:0 0 16px;">One thing I got completely wrong early on: I let Adam spend most of his home training time on finishing. He loved shooting. It was fun. But finishing is the hardest thing to improve at home because you can\'t replicate game pressure by yourself in the backyard.</p>'
    '\n  <p style="font-size:0.95em;color:#334155;line-height:1.7;margin:0 0 16px;">Ball mastery changed everything. Close-control, quick-feet work &mdash; the kind of repetitive, ball-at-your-feet training that looks boring from the outside but actually builds the neural pathways that make the game feel effortless. Twenty minutes of real ball mastery produces more meaningful touches than an hour of dribbling around cones. And more touches means faster visible progress, which means the feedback loop tightens, which means motivation goes up on its own.</p>'
    '\n  <p style="font-size:0.95em;color:#334155;line-height:1.7;margin:0 0 16px;">When Matthew could feel his feet moving faster than they did a month ago, I didn\'t have to drag him outside anymore. He went on his own.</p>'
    '\n  <h3 style="font-size:1.05em;font-weight:700;color:#0F3154;margin:24px 0 8px;">Autonomy: Real Choices, Not False Ones</h3>'
    '\n  <p style="font-size:0.95em;color:#334155;line-height:1.7;margin:0 0 16px;">I\'ve talked a lot in this post about giving kids choices. But there\'s a version of this that backfires: false choices. &ldquo;Do you want to practice today &mdash; yes or no?&rdquo; isn\'t a real choice. It\'s a question with a wrong answer, and kids know it immediately.</p>'
    '\n  <p style="font-size:0.95em;color:#334155;line-height:1.7;margin:0 0 16px;">Real choice looks like: &ldquo;We\'re going outside for twenty minutes. You pick what we work on first.&rdquo; The training is happening &mdash; that\'s non-negotiable &mdash; but they have genuine ownership over the shape of it. That distinction matters enormously to a ten-year-old who spends all day being told what to do.</p>'
    '\n  <p style="font-size:0.95em;color:#334155;line-height:1.7;margin:0 0 16px;">Technology helps here more than I expected. When Matthew could open an app and choose his own drill video &mdash; rather than having me hand him a plan &mdash; the buy-in was completely different. He\'d spend five minutes choosing before we even went outside. By the time we got to the backyard, he was already invested.</p>'
    '\n  <h3 style="font-size:1.05em;font-weight:700;color:#0F3154;margin:24px 0 8px;">Lead by Example</h3>'
    '\n  <p style="font-size:0.95em;color:#334155;line-height:1.7;margin:0 0 16px;">Kids watch what you do more carefully than they listen to what you say. If I spent my evenings on the couch telling Adam to get off his video games, the message I was actually sending was: <em>screen time is how adults relax, practice is what kids have to do.</em></p>'
    '\n  <p style="font-size:0.95em;color:#334155;line-height:1.7;margin:0 0 16px;">The shift that worked for me was participating &mdash; not coaching from the sideline, but actually picking up a ball and struggling alongside him. When I made mistakes, when I laughed at my own bad juggling attempts, the whole dynamic changed. He stopped feeling evaluated. And somewhere along the way, he stopped needing to be invited outside at all.</p>'
    '\n  <h3 style="font-size:1.05em;font-weight:700;color:#0F3154;margin:24px 0 8px;">Making It Uneventful</h3>'
    '\n  <p style="font-size:0.95em;color:#334155;line-height:1.7;margin:0 0 0;">The goal, ultimately, is for home training to become so routine that it stops feeling like a decision. Not an event. Not a negotiation. Just <em>what we do on Tuesdays and Thursdays</em>. Like dinner. Like homework. It\'s just part of the week.</p>'
    '\n  <p style="font-size:0.95em;color:#334155;line-height:1.7;margin:16px 0 0;">The irony is that &ldquo;uneventful&rdquo; is the highest compliment I can give a home training habit. It means the resistance is gone. The motivation question has been answered &mdash; not with a pep talk, but with a system. And systems outlast inspiration every single time.</p>'
    '\n</div>\n'
)

OLD_BIO = ('<p style="font-size:0.88em;color:#94a3b8;margin-top:32px;font-style:italic;">'
           "Neil Crawford is the founder of Anytime Soccer Training and a soccer dad to Adam and Matthew. "
           "He built the platform because he couldn't find one that worked for real families with real schedules "
           "— and because he made enough mistakes in his own backyard to fill a book.</p>")

NEW_BIO = (
    '<div style="display:flex;align-items:flex-start;gap:20px;background:#F8FAFC;border-radius:16px;'
    'padding:24px 28px;margin-top:40px;border:1px solid #E1E8EF;">'
    f'<img src="{AVATAR}" alt="Neil Crawford" style="width:64px;height:64px;border-radius:50%;'
    'object-fit:cover;flex-shrink:0;border:3px solid #fff;box-shadow:0 2px 8px rgba(15,49,84,0.15);" />'
    '<div>'
    '<p style="font-size:0.78em;font-weight:700;color:#DC373E;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 4px;">About the Author</p>'
    '<p style="font-size:0.95em;font-weight:700;color:#0F3154;margin:0 0 6px;">Neil Crawford</p>'
    '<p style="font-size:0.88em;color:#64748b;margin:0;line-height:1.65;">'
    "Founder of Anytime Soccer Training and soccer dad to Adam and Matthew. He built the platform because "
    "he couldn’t find one that worked for real families with real schedules — and because he made "
    "enough mistakes in his own backyard to fill a book.</p>"
    '</div></div>'
)

CTA_ANCHOR = '\n<div style="background:linear-gradient'

updated = False
for post in posts:
    if post['slug'] == TARGET:
        content = post['content']

        # Update title
        post['title'] = NEW_TITLE

        # Insert podcast section before CTA
        if CTA_ANCHOR in content:
            content = content.replace(CTA_ANCHOR, PODCAST_SECTION + CTA_ANCHOR, 1)
            print("Podcast section inserted before CTA.")
        else:
            print("WARNING: CTA anchor not found.")

        # Replace author bio
        if OLD_BIO in content:
            content = content.replace(OLD_BIO, NEW_BIO)
            print("Author bio updated with profile picture.")
        else:
            print("WARNING: Old bio string not found.")

        post['content'] = content
        print("New content length:", len(content))
        updated = True
        break

if not updated:
    print("ERROR: Post slug not found.")
else:
    with open('src/data/posts.json', 'w', encoding='utf-8') as f:
        json.dump(posts, f, ensure_ascii=False, indent=2)
    print("posts.json saved successfully.")
