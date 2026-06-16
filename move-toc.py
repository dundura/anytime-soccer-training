import sys, json
sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/posts.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

for post in posts:
    if 'supply-demand' not in post['slug']:
        continue
    c = post['content']

    # ── Extract the TOC block ──
    toc_start = c.find('\n\n<div style="background:#F8FAFC;border:1px solid #E1E8EF;border-radius:16px;padding:24px 28px;margin:36px 0;">')
    toc_end   = c.find('</div>\n\n', c.find('In This Article')) + 8
    toc_block = c[toc_start:toc_end]
    print(f'TOC block: {toc_start}–{toc_end}, len={len(toc_block)}')

    # ── Remove it from current location ──
    c = c[:toc_start] + c[toc_end:]

    # ── Find the podcast section — outer wrapper div ──
    podcast_outer = c.find('\n\n<div style="position:relative;background:linear-gradient(135deg,#F8FAFF')
    print(f'Podcast outer at: {podcast_outer}')
    print(repr(c[podcast_outer:podcast_outer+60]))

    # ── Insert TOC just before the podcast div ──
    c = c[:podcast_outer] + toc_block + c[podcast_outer:]
    print('✓ TOC moved above podcast')
    print('New length:', len(c))
    post['content'] = c
    break

with open('src/data/posts.json', 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)
print('Saved.')
