import sys, json
sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/posts.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

STYLE = 'font-size:1em;line-height:1.85;color:#374151;'

FIXES = [
    (
        '<p>I’ve had that conversation more times than I can count.',
        f'<p style="{STYLE}">I’ve had that conversation more times than I can count.'
    ),
    (
        "<p>The clubs aren’t running a racket.",
        f'<p style="{STYLE}">The clubs aren’t running a racket.'
    ),
    (
        "<p>Here’s my attempt at an honest breakdown",
        f'<p style="{STYLE}">Here’s my attempt at an honest breakdown'
    ),
]

for post in posts:
    if 'supply-demand' not in post['slug']:
        continue
    c = post['content']
    for old, new in FIXES:
        if old in c:
            c = c.replace(old, new, 1)
            print(f'✓ Fixed: {old[:50]}')
        else:
            print(f'WARNING not found: {old[:50]}')
    post['content'] = c
    print('New length:', len(c))
    break

with open('src/data/posts.json', 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)
print('Saved.')
