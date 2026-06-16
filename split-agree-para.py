import sys, json
sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/posts.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

OLD = (
    '<strong>I agree with this</strong> &mdash; and it goes further than just fairness. '
    'An open pyramid at the youth level would create genuine innovation. Clubs would have real '
    'incentive to develop players well because the results would be visible and the stakes '
    'would be real. A coach who consistently produces players who move up the pyramid becomes '
    'known for it. Right now, the system is opaque enough that none of that feedback loops '
    'cleanly. Transparency and openness would change that.'
)

NEW = (
    '<strong>I agree with this.</strong> And it goes further than just fairness &mdash; '
    'an open pyramid at the youth level would create genuine innovation.</p>'

    '\n\n<p style="font-size:0.93em;color:#713f12;margin:0 0 10px;line-height:1.65;">'
    'Clubs would have real incentive to develop players well because the results would be '
    'visible and the stakes would be real. A coach who consistently produces players who '
    'move up the pyramid becomes known for it.</p>'

    '\n\n<p style="font-size:0.93em;color:#713f12;margin:0;line-height:1.65;">'
    'Right now, the system is opaque enough that none of that feedback loops cleanly. '
    'Transparency and openness would change that.'
)

for post in posts:
    if 'supply-demand' not in post['slug']:
        continue
    if OLD in post['content']:
        post['content'] = post['content'].replace(OLD, NEW, 1)
        print('Done. Length:', len(post['content']))
    else:
        print('WARNING: not found')
    break

with open('src/data/posts.json', 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)
print('Saved.')
