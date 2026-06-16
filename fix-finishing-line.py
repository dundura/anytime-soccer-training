import json

with open('src/data/posts.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

OLD = 'One thing I got completely wrong early on: I let Adam spend most of his home training time on finishing. He loved shooting. It was fun. But finishing is the hardest thing to improve at home because you can\'t replicate game pressure by yourself in the backyard.'

NEW = 'But finishing is the only thing kids will do on their own. And finishing is the hardest thing to improve at home because you can\'t replicate game pressure by yourself in the backyard.'

updated = 0
for post in posts:
    if OLD in (post.get('content') or ''):
        post['content'] = post['content'].replace(OLD, NEW, 1)
        updated += 1
        print(f"Updated: {post['title']}")

print(f"Total updated: {updated}")

with open('src/data/posts.json', 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)
