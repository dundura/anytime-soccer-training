import sys, json
sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/posts.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

OLD = (
    '<strong>European clubs have been around for literally over one hundred years.</strong> '
    'What they have is not investment-created infrastructure. It is <em>accumulated</em> '
    'infrastructure &mdash; facilities owned outright or held on long-term terms because the '
    'club has been there for generations, volunteer networks built across decades, community '
    'trust earned over a century of being part of local life. That is a completely different '
    'thing from what pro/rel investment would produce. An investor backing a new Tier 4 club '
    'in 2025 is building something from scratch, in a market where land costs money and labor '
    'costs money and nothing has been accumulated yet. You are not replicating a European club. '
    'You are starting one. <strong>A new club in year two does not operate like a club in year one hundred.</strong>'
)

NEW = (
    '<strong>European clubs have been around for literally over one hundred years.</strong> '
    'What they have is not investment-created infrastructure. It is <em>accumulated</em> '
    'infrastructure &mdash; facilities owned outright, volunteer networks built across decades, '
    'community trust earned over a century of being part of local life.</p>'

    '\n\n<p style="font-size:0.95em;color:#374151;line-height:1.85;">'
    'That is a completely different thing from what pro/rel investment would produce. '
    'An investor backing a new Tier 4 club in 2025 is building something from scratch &mdash; '
    'in a market where land costs money, labor costs money, and nothing has been accumulated yet.</p>'

    '\n\n<p style="font-size:0.95em;color:#374151;line-height:1.85;">'
    'You are not replicating a European club. You are starting one. '
    '<strong>A new club in year two does not operate like a club in year one hundred.</strong>'
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
