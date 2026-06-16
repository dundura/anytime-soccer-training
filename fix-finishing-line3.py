import json

with open('src/data/posts.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

OLD = "But finishing is the only thing kids will do on their own. And even when they do work on it with you, they don't want to do the kind of reps that actually move the needle."

NEW = "But finishing is the only thing kids will do on their own — they want to kick around with their friends. And even when they do work on it with you, they don't want to do the kind of reps that actually move the needle."

updated = 0
for post in posts:
    if OLD in (post.get('content') or ''):
        post['content'] = post['content'].replace(OLD, NEW, 1)
        updated += 1
        print(f"Updated: {post['title']}")

print(f"Total updated: {updated}")

with open('src/data/posts.json', 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)
