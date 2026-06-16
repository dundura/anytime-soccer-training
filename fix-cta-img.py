import json

with open('src/data/posts.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

TARGET_SLUG = 'why-is-youth-soccer-so-expensive-supply-demand-american-culture'

for post in posts:
    if post.get('slug') == TARGET_SLUG:
        content = post['content']

        # ── Fix 1: 7-Day CTA — bigger image (72px → 120px) ──────────────────
        OLD_7DAY = 'style="width:72px;height:72px;object-fit:cover;border-radius:10px;flex-shrink:0;"'
        NEW_7DAY = 'style="width:120px;height:120px;object-fit:cover;border-radius:12px;flex-shrink:0;align-self:center;"'
        if OLD_7DAY in content:
            content = content.replace(OLD_7DAY, NEW_7DAY, 1)
            print('7-Day image: updated to 120px')
        else:
            print('7-Day image: NOT FOUND')

        # ── Fix 2: eBook — bigger image on desktop (140px → 220px) ──────────
        # Current has a duplicate width hack: width:140px;height:110px;...width:100%;max-width:140px;
        # Replace with a clean responsive version: 220px desktop, max-width:100% so mobile wraps nicely
        OLD_EBOOK = 'style="width:140px;height:110px;object-fit:cover;border-radius:12px;flex-shrink:0;width:100%;max-width:140px;"'
        NEW_EBOOK = 'style="width:220px;height:auto;min-height:140px;object-fit:cover;border-radius:12px;flex-shrink:0;max-width:100%;"'
        if OLD_EBOOK in content:
            content = content.replace(OLD_EBOOK, NEW_EBOOK, 1)
            print('eBook image: updated to 220px')
        else:
            print('eBook image: NOT FOUND')

        post['content'] = content

with open('src/data/posts.json', 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)

print('Done.')
