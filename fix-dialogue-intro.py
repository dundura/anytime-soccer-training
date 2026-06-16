import sys, json
sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/posts.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

OLD_INTRO = (
    '<h3 style="font-size:1.3em;font-weight:800;color:#0F3154;margin:0 0 8px;">'
    'A Real Example of the Misunderstanding</h3>'
    '<p style="font-size:0.9em;color:#64748b;margin:0 0 24px;">'
    'From a community discussion about the cost of US youth soccer &mdash; '
    'a well-intentioned comparison that illustrates exactly why this conversation goes sideways.</p>\n\n'
    '<div style="background:#F8FAFC;border-left:3px solid #CBD5E1;'
    'border-radius:0 8px 8px 0;padding:16px 20px;margin:0 0 12px;">'
    '<p style="font-size:0.78em;font-weight:600;color:#94a3b8;margin:0 0 10px;'
    'text-transform:uppercase;letter-spacing:0.06em;">Posted in a community forum</p>'
)

NEW_INTRO = (
    '<h3 style="font-size:1.3em;font-weight:800;color:#0F3154;margin:0 0 8px;">'
    'A Real Example of the Misunderstanding</h3>'
    '<p style="font-size:0.9em;color:#64748b;margin:0 0 24px;">'
    'A parent jumped into an online discussion about the cost of US youth soccer and posted this '
    'comparison. It was well-intentioned &mdash; they were genuinely trying to put the numbers in '
    'context. And it illustrates exactly why this conversation goes sideways every single time.</p>\n\n'
    '<div style="background:#F8FAFC;border-left:3px solid #CBD5E1;'
    'border-radius:0 8px 8px 0;padding:16px 20px;margin:0 0 12px;">'
    '<p style="font-size:0.78em;font-weight:600;color:#94a3b8;margin:0 0 10px;'
    'text-transform:uppercase;letter-spacing:0.06em;">A parent posted this in a community forum</p>'
)

for post in posts:
    if 'supply-demand' not in post['slug']:
        continue
    c = post['content']
    if OLD_INTRO in c:
        c = c.replace(OLD_INTRO, NEW_INTRO, 1)
        print('✓ Dialogue intro updated')
    else:
        print('WARNING: anchor not found')
    post['content'] = c
    print('New length:', len(c))
    break

with open('src/data/posts.json', 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)
print('Saved.')
