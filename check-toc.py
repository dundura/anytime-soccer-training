import json, re

with open('src/data/posts.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

for post in posts:
    if post.get('slug') == 'why-is-youth-soccer-so-expensive-supply-demand-american-culture':
        content = post['content']
        # Find all TOC-like sections
        matches = [(m.start(), content[max(0,m.start()-50):m.start()+200]) for m in re.finditer(r'[Ii]n [Tt]his [Aa]rticle|table.of.contents|TOC|toc', content)]
        for pos, ctx in matches:
            print(f"--- Match at {pos} ---")
            print(ctx)
            print()

        # Also count h2 tags
        h2s = re.findall(r'<h2[^>]*>(.*?)</h2>', content, re.IGNORECASE | re.DOTALL)
        print(f"\nTotal h2 tags: {len(h2s)}")
        for h in h2s:
            print(" -", re.sub(r'<[^>]+>', '', h).strip()[:80])
