import json

with open('src/data/posts.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

DIVIDER = (
    '<div style="display:flex;align-items:center;gap:12px;margin:44px 0;">'
    '<div style="flex:1;height:1px;background:linear-gradient(to right,transparent,#CBD5E1);"></div>'
    '<div style="width:6px;height:6px;border-radius:50%;background:#DC373E;"></div>'
    '<div style="width:10px;height:10px;border-radius:50%;background:#0F3154;"></div>'
    '<div style="width:6px;height:6px;border-radius:50%;background:#DC373E;"></div>'
    '<div style="flex:1;height:1px;background:linear-gradient(to left,transparent,#CBD5E1);"></div>'
    '</div>'
)

DOUBLE = DIVIDER + DIVIDER

for post in posts:
    if 'supply-demand' not in post['slug']:
        continue
    count = post['content'].count(DOUBLE)
    print('Double dividers found:', count)
    post['content'] = post['content'].replace(DOUBLE, DIVIDER)
    print('Fixed. Remaining doubles:', post['content'].count(DOUBLE))
    break

with open('src/data/posts.json', 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)
print('Saved.')
