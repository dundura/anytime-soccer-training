import json

with open('src/data/posts.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

TARGET_SLUG = 'why-is-youth-soccer-so-expensive-supply-demand-american-culture'

SIMPLE_CALC = (
    '<div style="background:linear-gradient(135deg,#F8FAFC,#F1F5F9);border:1px solid #E1E8EF;'
    'border-radius:20px;padding:32px 36px;margin:44px 0;box-shadow:0 4px 24px rgba(15,49,84,0.07);">'
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;">'
    '<span style="font-size:1.4em;">&#129518;</span>'
    '<p style="font-size:0.75em;font-weight:800;color:#DC373E;text-transform:uppercase;letter-spacing:0.1em;margin:0;">Interactive Tool</p>'
    '</div>'
    '<h3 style="font-size:1.35em;font-weight:800;color:#0F3154;margin:0 0 10px;">Club Soccer Budget Calculator</h3>'
    '<p style="font-size:0.9em;color:#64748b;line-height:1.7;margin:0 0 24px;">'
    'Registration, tournaments, gear, private training — see how quickly the real annual cost adds up for your family.'
    '</p>'
    '<a href="https://app.anytime-soccer.com" target="_blank" rel="noopener" '
    'style="display:inline-block;background:#DC373E;color:#fff;font-size:0.92em;font-weight:700;'
    'padding:12px 28px;border-radius:10px;text-decoration:none;letter-spacing:0.02em;">'
    'Try It Free &rarr;'
    '</a>'
    '</div>'
)

for post in posts:
    if post.get('slug') == TARGET_SLUG:
        content = post['content']
        outer_start = 121512
        # verify the start
        assert content[outer_start:outer_start+40] == '<div style="background:linear-gradient(1', \
            f"Start mismatch: {repr(content[outer_start:outer_start+40])}"

        # find the end by counting divs
        pos = outer_start
        depth = 0
        outer_end = None
        while pos < len(content):
            open_tag = content.find('<div', pos)
            close_tag = content.find('</div>', pos)
            if open_tag == -1 and close_tag == -1:
                break
            if open_tag != -1 and (close_tag == -1 or open_tag < close_tag):
                depth += 1
                pos = open_tag + 4
            else:
                depth -= 1
                pos = close_tag + 6
                if depth == 0:
                    outer_end = pos
                    break

        if outer_end:
            post['content'] = content[:outer_start] + SIMPLE_CALC + content[outer_end:]
            print(f"Calculator simplified: removed {outer_end - outer_start} chars, added {len(SIMPLE_CALC)} chars")
        else:
            print("ERROR: could not find end of calculator block")

with open('src/data/posts.json', 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)

print("Done.")
