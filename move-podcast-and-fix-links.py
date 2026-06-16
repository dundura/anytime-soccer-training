import sys, json
sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/posts.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

for post in posts:
    if 'supply-demand' not in post['slug']:
        continue
    c = post['content']

    # ── 1. Extract the full Also on The Inside Scoop block ──
    block_start = c.find('\n\n<div style="background:linear-gradient(135deg,#EEF4FF,#E8F0FE)')
    block_end   = c.find('</div>\n\n', c.find('Also on The Inside Scoop')) + 8
    podcast_block = c[block_start:block_end]
    print(f'Podcast block: {block_start}–{block_end}, len={len(podcast_block)}')

    # ── 2. Remove it from current location ──
    c = c[:block_start] + c[block_end:]

    # ── 3. Insert before the International Comparison Fallacy section header ──
    # That section starts with a section-header div containing "6" badge
    INSERT_ANCHOR = (
        '<div style="display:flex;align-items:center;gap:16px;margin:52px 0 20px;">'
        '<div style="background:linear-gradient(135deg,#DC373E,#b91c1c);color:#fff;'
        'font-size:1em;font-weight:800;width:44px;height:44px;border-radius:12px;'
        'display:flex;align-items:center;justify-content:center;flex-shrink:0;'
        'box-shadow:0 4px 12px rgba(220,55,62,0.35);">6</div>'
        '<h2 style="font-size:1.6em;font-weight:800;color:#0F3154;margin:0;line-height:1.25;">'
        'The International Comparison Fallacy</h2></div>'
    )
    if INSERT_ANCHOR in c:
        c = c.replace(INSERT_ANCHOR, podcast_block + '\n\n' + INSERT_ANCHOR, 1)
        print('✓ Podcast block moved to middle (before International Comparison Fallacy)')
    else:
        print('WARNING: insertion anchor not found')

    # ── 4. Fix register links → pricing page ──
    old_link = 'https://app.anytime-soccer.com/register'
    new_link = 'https://www.anytime-soccer.com/pricing'
    count = c.count(old_link)
    c = c.replace(old_link, new_link)
    print(f'✓ Fixed {count} register link(s) → /pricing')

    post['content'] = c
    print('New length:', len(c))
    break

with open('src/data/posts.json', 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)
print('Saved.')
