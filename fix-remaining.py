import json

with open('src/data/posts.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

TARGET_SLUG = 'why-is-youth-soccer-so-expensive-supply-demand-american-culture'

for post in posts:
    if post.get('slug') == TARGET_SLUG:
        content = post['content']

        # ── Fix 3: Split Worth Knowing paragraph ─────────────────────────────
        OLD_WORTH = 'Many Tier 2 and 3 European academies only offer scholarships and paid coaches at U16 and beyond &mdash; and those spots typically go to players released from Category 1 academies. Before that age, those same kids are playing grassroots, with volunteer coaches, paying minimal fees. The fully funded academy pathway that people picture when they imagine European development does not start at age eight. It starts much later, for a very small number of players who have already been pre-selected by elite clubs.'
        NEW_WORTH = 'Many Tier 2 and 3 European academies only offer scholarships and paid coaches at U16 and beyond &mdash; and those spots typically go to players released from Category 1 academies. Before that age, those same kids are playing grassroots, with volunteer coaches, paying minimal fees.</p><p style="font-size:0.9em;color:#1e3a8a;margin:12px 0 0;line-height:1.7;">The fully funded academy pathway that people picture when they imagine European development does not start at age eight. It starts much later, for a very small number of players who have already been pre-selected by elite clubs.'
        if OLD_WORTH in content:
            content = content.replace(OLD_WORTH, NEW_WORTH, 1)
            print("Fix 3 (Worth Knowing split): applied")
        else:
            print("Fix 3: NOT FOUND")

        # ── Fix 4: eBook block — stack image above text on mobile ────────────
        OLD_EBOOK = 'background:linear-gradient(135deg,#1e1b4b,#312e81);border-radius:20px;padding:32px 36px;margin:40px 0;display:flex;gap:28px;align-items:flex-start;box-shadow:0 8px 32px rgba(49,46,129,0.3);"><img src="https://media.anytime-soccer.com/wp-content/uploads/2024/07/us_soccer-768x596.png" alt="Monopoly eBook" style="width:140px;height:110px;object-fit:cover;border-radius:12px;flex-shrink:0;"'
        NEW_EBOOK = 'background:linear-gradient(135deg,#1e1b4b,#312e81);border-radius:20px;padding:32px 36px;margin:40px 0;display:flex;gap:28px;align-items:flex-start;box-shadow:0 8px 32px rgba(49,46,129,0.3);flex-wrap:wrap;"><img src="https://media.anytime-soccer.com/wp-content/uploads/2024/07/us_soccer-768x596.png" alt="Monopoly eBook" style="width:140px;height:110px;object-fit:cover;border-radius:12px;flex-shrink:0;width:100%;max-width:140px;"'
        if OLD_EBOOK in content:
            content = content.replace(OLD_EBOOK, NEW_EBOOK, 1)
            print("Fix 4 (eBook flex-wrap): applied")
        else:
            print("Fix 4: NOT FOUND")

        post['content'] = content

with open('src/data/posts.json', 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)

print("Done.")
