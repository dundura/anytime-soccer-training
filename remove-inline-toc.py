import json, re

with open('src/data/posts.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

TARGET_SLUG = 'why-is-youth-soccer-so-expensive-supply-demand-american-culture'

for post in posts:
    if post.get('slug') == TARGET_SLUG:
        content = post['content']
        idx = content.find('In This Article')
        if idx < 0:
            print("Not found"); break

        # Walk backwards from idx to find the opening <div of the TOC container
        start = content.rfind('<div', 0, idx)
        # Walk forwards from idx to find </ol></div> which closes the TOC
        end = content.find('</ol>', idx)
        if end >= 0:
            # Find the closing </div> right after </ol>
            end = content.find('</div>', end) + len('</div>')

        print(f"Removing from {start} to {end}")
        print("Block preview:", content[start:start+120], "...", content[end-60:end])

        post['content'] = content[:start] + content[end:]
        print("Done")

with open('src/data/posts.json', 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)
