import json

with open('src/data/posts.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

TARGET_SLUG = 'why-is-youth-soccer-so-expensive-supply-demand-american-culture'

for post in posts:
    if post.get('slug') == TARGET_SLUG:
        content = post['content']

        # ── Fix: 7-Day CTA block — image above text on all screens ───────────
        OLD_CTA = (
            'background:linear-gradient(135deg,#FFF7ED,#FEF3C7);border:1px solid #FCD34D;'
            'border-radius:18px;padding:28px 32px;margin:36px 0;display:flex;gap:20px;'
            'align-items:center;box-shadow:0 2px 16px rgba(251,191,36,0.15);">'
            '<img src="https://media.anytime-soccer.com/wp-content/themes/anytime/images/about/new-chalange-image.png" '
            'alt="Free 7-Day Training Plan" style="width:80px;height:80px;object-fit:cover;border-radius:10px;flex-shrink:0;" />'
        )
        NEW_CTA = (
            'background:linear-gradient(135deg,#FFF7ED,#FEF3C7);border:1px solid #FCD34D;'
            'border-radius:18px;padding:28px 32px;margin:36px 0;display:flex;flex-direction:column;gap:16px;'
            'align-items:flex-start;box-shadow:0 2px 16px rgba(251,191,36,0.15);">'
            '<img src="https://media.anytime-soccer.com/wp-content/themes/anytime/images/about/new-chalange-image.png" '
            'alt="Free 7-Day Training Plan" style="width:72px;height:72px;object-fit:cover;border-radius:10px;flex-shrink:0;" />'
        )
        if OLD_CTA in content:
            content = content.replace(OLD_CTA, NEW_CTA, 1)
            print("7-Day CTA stacked: applied")
        else:
            print("7-Day CTA: NOT FOUND")

        post['content'] = content

with open('src/data/posts.json', 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)

print("Done.")
