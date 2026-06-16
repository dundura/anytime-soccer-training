import sys, json
sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/posts.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

INSIGHT = (
    '\n\n<div style="background:linear-gradient(135deg,#FEFCE8,#FEF9C3);border:1px solid #FDE047;'
    'border-radius:14px;padding:20px 24px;margin:24px 0;display:flex;gap:14px;align-items:flex-start;'
    'box-shadow:0 2px 12px rgba(234,179,8,0.1);">'
    '<div style="background:#EAB308;border-radius:8px;padding:6px 9px;flex-shrink:0;margin-top:2px;">'
    '<span style="font-size:0.9em;color:#fff;">&#128161;</span>'
    '</div>'
    '<div>'
    '<p style="font-size:0.76em;font-weight:800;color:#713f12;text-transform:uppercase;'
    'letter-spacing:0.08em;margin:0 0 5px;">Worth Knowing</p>'
    '<p style="font-size:0.93em;color:#713f12;margin:0;line-height:1.65;">'
    'Many Tier 2 and 3 European academies only offer scholarships and paid coaches at U16 and beyond '
    '&mdash; and those spots typically go to players released from Category 1 academies. '
    'Before that age, those same kids are playing grassroots, with volunteer coaches, '
    'paying minimal fees. The fully funded academy pathway that people picture when they '
    'imagine European development does not start at age eight. It starts much later, '
    'for a very small number of players who have already been pre-selected by elite clubs.'
    '</p>'
    '</div>'
    '</div>'
)

DIVIDER_OPEN = '<div style="display:flex;align-items:center;gap:12px;margin:44px 0;"><div style='

# Find the verdict card end + divider that follows it
OLD = '</div></div></div>\n\n' + DIVIDER_OPEN
NEW = '</div></div></div>' + INSIGHT + '\n\n' + DIVIDER_OPEN

for post in posts:
    if 'supply-demand' not in post['slug']:
        continue
    c = post['content']
    if OLD in c:
        c = c.replace(OLD, NEW, 1)
        print('Done. Length:', len(c))
    else:
        print('WARNING: anchor not found')
        idx = c.find('Pro/Rel Won')
        if idx > 0:
            print('Verdict card at:', idx)
            end = c.find('</div></div></div>', idx)
            print('Card closes at:', end)
            print(repr(c[end:end+80]))
    post['content'] = c
    break

with open('src/data/posts.json', 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)
print('Saved.')
