import json

with open('src/data/posts.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

OLD = 'an hour of dribbling around cones'
NEW = 'an hour at a game when you barely play'

updated = 0
for post in posts:
    if OLD in (post.get('content') or ''):
        post['content'] = post['content'].replace(OLD, NEW)
        updated += 1
        print(f"Updated: {post['title']}")

print(f"Total updated: {updated}")

with open('src/data/posts.json', 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)
