import json

with open('src/data/posts.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

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

def quote(text, attribution=None):
    attr = ('<p style="font-size:0.82em;font-weight:700;color:#DC373E;margin:14px 0 0;'
            'letter-spacing:0.05em;text-transform:uppercase;">&mdash; ' + attribution + '</p>') if attribution else ''
    return (
        '<div style="position:relative;background:linear-gradient(135deg,#F8FAFF 0%,#EEF4FF 100%);'
        'border-radius:16px;padding:32px 36px 28px;margin:32px 0;overflow:hidden;'
        'border:1px solid #C7D7FA;box-shadow:0 2px 12px rgba(15,49,84,0.07);">'
        '<div style="position:absolute;top:-10px;left:20px;font-size:7em;color:rgba(15,49,84,0.06);'
        'font-family:Georgia,serif;line-height:1;pointer-events:none;">&ldquo;</div>'
        '<p style="font-size:1.08em;font-style:italic;color:#0F3154;line-height:1.75;margin:0;'
        'position:relative;z-index:1;">' + text + '</p>' + attr + '</div>'
    )

# New "myth" section
NEW_MYTH = (
    divider()
    + '<h3 style="font-size:1.3em;font-weight:800;color:#0F3154;margin:0 0 18px;">'
    'The Myth of the Great European Parent Coach</h3>\n\n'

    '<p>There is a version of this conversation that goes: European kids are coached by parent volunteers '
    'who played the game, and those coaches are excellent, so quality is high without the cost. If American '
    'parent coaches tried the same thing, it would work here too.</p>\n\n'

    '<p>The first part is partly true. The second part misses something important.</p>\n\n'

    '<p>Look at rec programs in American sports &mdash; Little League baseball, youth basketball, recreational '
    'football. Parent coaches run those programs. Those parents have played their sport. And the coaching, '
    'especially in the early years, is <em>not particularly good.</em> That is not an insult. It is simply '
    'what happens when someone with no coaching background starts coaching. You learn by doing. You make '
    'mistakes. You get better slowly, over time, through experience and repetition.</p>\n\n'

    '<p>The European parent coach is not exempt from this. They started out just as raw. The difference '
    'is not the playing background &mdash; it is the <strong>time they were given to improve.</strong></p>\n\n'

    + quote(
        '"In Europe, club soccer is not a competing alternative pulling the best families out of the '
        'community system. So the parent coach stays. They coach year after year. They get better. '
        'In the US, the moment a family decides the rec coach isn\'t good enough, they leave for a '
        'club &mdash; and the coach never gets the years of experience needed to actually become good."',
        'Neil Crawford'
    )

    + '<p>This is the compounding problem. The American parent coach coaches for two or three years, the '
    'family moves on to club, and the coach starts over with a new group of beginners. They never accumulate '
    'the experience required to become genuinely excellent. Meanwhile, the European counterpart is on year '
    'eight with the same community club, alongside coaches on year six and year ten. The knowledge builds. '
    'The standard rises. Not because they were better players &mdash; because they were given the time.</p>\n\n'

    '<p>The rec program does not fail because American parents cannot coach. It struggles because the system '
    'does not give them enough time in the role to get good at it.</p>\n\n'
)

# Convert the "Realistic Levers" two-column grid into a proper table
OLD_LEVERS = (
    '<div style="background:linear-gradient(135deg,#F8FAFC,#EEF2FF);border-radius:16px;padding:28px 32px;'
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
    '</div></div>'
)

NEW_LEVERS = (
    '<div style="overflow-x:auto;margin:28px 0;border-radius:14px;'
    'box-shadow:0 2px 16px rgba(15,49,84,0.08);border:1px solid #E1E8EF;overflow:hidden;">'
    '<table style="width:100%;border-collapse:collapse;">'
    '<thead><tr>'
    '<th colspan="2" style="padding:14px 20px;text-align:left;font-size:0.85em;font-weight:800;'
    'color:#fff;letter-spacing:0.07em;text-transform:uppercase;background:#0F3154;">'
    'Realistic Levers for Change</th>'
    '</tr>'
    '<tr>'
    '<th style="padding:12px 20px;text-align:left;font-size:0.8em;font-weight:800;'
    'color:#fff;letter-spacing:0.07em;text-transform:uppercase;background:#16a34a;width:50%;">'
    'Supply Side</th>'
    '<th style="padding:12px 20px;text-align:left;font-size:0.8em;font-weight:800;'
    'color:#fff;letter-spacing:0.07em;text-transform:uppercase;background:#DC373E;width:50%;">'
    'Demand Side</th>'
    '</tr></thead>'
    '<tbody>'
    '<tr style="background:#ffffff;">'
    '<td style="padding:13px 20px;font-size:0.9em;color:#374151;line-height:1.6;border-bottom:1px solid #E1E8EF;">'
    'Break up field-space monopolies</td>'
    '<td style="padding:13px 20px;font-size:0.9em;color:#374151;line-height:1.6;border-bottom:1px solid #E1E8EF;">'
    'Re-invest in rec and community leagues</td>'
    '</tr>'
    '<tr style="background:#F8FAFC;">'
    '<td style="padding:13px 20px;font-size:0.9em;color:#374151;line-height:1.6;border-bottom:1px solid #E1E8EF;">'
    'Open pyramid access for smaller clubs</td>'
    '<td style="padding:13px 20px;font-size:0.9em;color:#374151;line-height:1.6;border-bottom:1px solid #E1E8EF;">'
    'Normalize parent coaching as a real contribution</td>'
    '</tr>'
    '<tr style="background:#ffffff;">'
    '<td style="padding:13px 20px;font-size:0.9em;color:#374151;line-height:1.6;border-bottom:1px solid #E1E8EF;">'
    'Fund community coaching development</td>'
    '<td style="padding:13px 20px;font-size:0.9em;color:#374151;line-height:1.6;border-bottom:1px solid #E1E8EF;">'
    'Supplement club with low-cost home training</td>'
    '</tr>'
    '<tr style="background:#F8FAFC;">'
    '<td style="padding:13px 20px;font-size:0.9em;color:#374151;line-height:1.6;">'
    'Require subsidized spots in club programs</td>'
    '<td style="padding:13px 20px;font-size:0.9em;color:#374151;line-height:1.6;">'
    'Reframe development as long-term, not pay-to-play</td>'
    '</tr>'
    '</tbody></table></div>'
)

# School Analogy section-7 header to use as anchor
SCHOOL_ANCHOR = (
    '<div style="display:flex;align-items:center;gap:16px;margin:52px 0 20px;">'
    '<div style="background:linear-gradient(135deg,#DC373E,#b91c1c);color:#fff;font-size:1em;'
    'font-weight:800;width:44px;height:44px;border-radius:12px;display:flex;align-items:center;'
    'justify-content:center;flex-shrink:0;box-shadow:0 4px 12px rgba(220,55,62,0.35);">7</div>'
    '<h2 style="font-size:1.6em;font-weight:800;color:#0F3154;margin:0;line-height:1.25;">'
    'The School Analogy That Actually Explains It</h2></div>'
)

TARGET = 'why-is-youth-soccer-so-expensive-supply-demand-american-culture'

for post in posts:
    if 'supply-demand' not in post['slug']:
        continue
    c = post['content']

    # 1. Insert myth section before School Analogy
    if SCHOOL_ANCHOR in c:
        c = c.replace(SCHOOL_ANCHOR, NEW_MYTH + SCHOOL_ANCHOR, 1)
        print('Myth section inserted before School Analogy.')
    else:
        print('WARNING: School Analogy anchor not found')

    # 2. Convert Realistic Levers grid to table
    if OLD_LEVERS in c:
        c = c.replace(OLD_LEVERS, NEW_LEVERS, 1)
        print('Realistic Levers converted to table.')
    else:
        print('WARNING: Realistic Levers block not found')

    # 3. Set monopoly ebook image
    post['content'] = c
    print('New content length:', len(c))
    break

with open('src/data/posts.json', 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)
print('posts.json saved.')
