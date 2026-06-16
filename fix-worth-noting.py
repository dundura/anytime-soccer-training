import json

with open('src/data/posts.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

for post in posts:
    if 'supply-demand' not in post['slug']:
        continue
    c = post['content']

    # Outer div: green -> blue gradient + border + shadow
    c = c.replace(
        'background:linear-gradient(135deg,#F0FDF4,#DCFCE7);border:1px solid #86EFAC;'
        'border-radius:14px;padding:20px 24px;margin:28px 0;display:flex;gap:14px;'
        'align-items:flex-start;box-shadow:0 2px 12px rgba(16,185,129,0.08);',
        'background:linear-gradient(135deg,#EFF6FF,#DBEAFE);border:1px solid #93C5FD;'
        'border-radius:14px;padding:20px 24px;margin:28px 0;display:flex;gap:14px;'
        'align-items:flex-start;box-shadow:0 2px 12px rgba(59,130,246,0.1);'
    )
    # Icon badge: green -> blue
    c = c.replace(
        'background:#16a34a;border-radius:8px;padding:6px 9px;flex-shrink:0;margin-top:2px;',
        'background:#2563EB;border-radius:8px;padding:6px 9px;flex-shrink:0;margin-top:2px;'
    )
    # Label text color: dark green -> dark blue
    c = c.replace(
        'font-size:0.76em;font-weight:800;color:#14532d;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 5px;">Worth Noting',
        'font-size:0.76em;font-weight:800;color:#1e40af;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 5px;">Worth Noting'
    )
    # Body text color: dark green -> dark blue
    c = c.replace(
        'font-size:0.93em;color:#166534;margin:0;line-height:1.65;">There are still many good volunteer',
        'font-size:0.93em;color:#1e3a8a;margin:0;line-height:1.65;">There are still many good volunteer'
    )

    post['content'] = c
    print('Worth Noting block updated to blue.')
    break

with open('src/data/posts.json', 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)
print('Saved.')
