import json

with open('src/data/posts.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

THIRD_POINT = (
    "<p><strong>Third:</strong> in Europe, clubs are not businesses. They are genuinely community "
    "institutions &mdash; membership organizations that collect dues, field multiple teams across age "
    "groups and genders, host social events, and serve the neighborhood in ways that extend well beyond "
    "soccer. They are woven into the fabric of local life in a way that has no real American equivalent.</p>\n\n"

    "<p>Think of it like your local CPA doing the church's taxes for free, or a volunteer fire department "
    "staffed by people who live three streets over. There is a deep culture of community contribution "
    "built into these clubs that is not transferable by policy. A parent coaches not just because they "
    "love soccer, but because the club is <em>their club</em> &mdash; the same one their parents "
    "belonged to, the same one their neighbors belong to. The social obligation is real and "
    "it is self-reinforcing across generations.</p>\n\n"

    "<p>An American soccer club, by contrast, is almost always a business &mdash; or at best, a "
    "nonprofit that functions like one. It competes for families. It markets itself. It lives and dies "
    "by registration numbers. The relationship between family and club is transactional, not communal. "
    "That is not a criticism &mdash; it reflects the context in which American clubs operate. "
    "But it means the social infrastructure that makes the European volunteer model work simply "
    "does not exist here in the same form. You cannot separate the low cost from the community "
    "context that produces it.</p>\n\n"
)

# Insert after the "Second" paragraph, before the quote block that follows
ANCHOR = (
    "That's so far from what they do that it's barely worth comparing.</p>\n\n"
    '<div style="position:relative;background:linear-gradient(135deg,#F8FAFF'
)

NEW_ANCHOR = (
    "That's so far from what they do that it's barely worth comparing.</p>\n\n"
    + THIRD_POINT
    + '<div style="position:relative;background:linear-gradient(135deg,#F8FAFF'
)

TARGET = 'why-is-youth-soccer-so-expensive-supply-demand-american-culture'

for post in posts:
    if 'supply-demand' not in post['slug']:
        continue
    if ANCHOR in post['content']:
        post['content'] = post['content'].replace(ANCHOR, NEW_ANCHOR, 1)
        print('Third point inserted.')
    else:
        print('WARNING: anchor not found')
    print('New length:', len(post['content']))
    break

with open('src/data/posts.json', 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)
print('Saved.')
