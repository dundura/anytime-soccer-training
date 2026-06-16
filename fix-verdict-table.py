import sys, json
sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/posts.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

def th(text, bg):
    return (
        f'<th style="padding:12px 20px;text-align:left;font-size:0.8em;font-weight:800;'
        f'color:#fff;letter-spacing:0.07em;text-transform:uppercase;background:{bg};">'
        f'{text}</th>'
    )

def td(text):
    return (
        f'<td style="padding:11px 20px;font-size:0.9em;color:#374151;line-height:1.55;'
        f'border-bottom:1px solid #E1E8EF;">{text}</td>'
    )

will_rows = [
    'Expand pathways for elite players being overlooked',
    'Attract foreign investment to the professional tier',
    'Create real competitive stakes up and down the pyramid',
    'Make American soccer more legitimate on the world stage',
]
wont_rows = [
    'Lower the cost of mass-participation club soccer',
    'Change what a paid coach, fields, and ten months of training costs',
    'Replicate 100+ years of European accumulated infrastructure overnight',
    'Resolve the demand-side problem that drives prices up',
]

tbody = ''
for i, (will, wont) in enumerate(zip(will_rows, wont_rows)):
    bg = '#ffffff' if i % 2 == 0 else '#F8FAFC'
    tbody += (
        f'<tr style="background:{bg};">'
        + td(f'<span style="color:#16a34a;font-weight:700;">&#10003;</span>&nbsp; {will}')
        + td(f'<span style="color:#DC373E;font-weight:700;">&#10007;</span>&nbsp; {wont}')
        + '</tr>'
    )

NEW_TABLE = (
    '<div style="overflow-x:auto;margin:20px 0;border-radius:14px;'
    'box-shadow:0 2px 16px rgba(15,49,84,0.08);border:1px solid #E1E8EF;overflow:hidden;">'
    '<table style="width:100%;border-collapse:collapse;">'
    '<thead><tr>'
    + th('&#10003;&nbsp; Pro/Rel Will', '#16a34a')
    + th('&#10007;&nbsp; Pro/Rel Won\'t', '#DC373E')
    + '</tr></thead>'
    '<tbody>' + tbody + '</tbody>'
    '</table></div>'
)

# Find and replace the old dark navy verdict card
OLD_CARD_START = '<div style="background:linear-gradient(135deg,#0F3154,#1a4a78);border-radius:16px;padding:24px 28px;margin:20px 0;">'
OLD_CARD_END   = '</div></div></div>'  # three closing divs for the nested structure

for post in posts:
    if 'supply-demand' not in post['slug']:
        continue
    c = post['content']
    start = c.find(OLD_CARD_START)
    if start < 0:
        print('WARNING: card start not found')
        break
    end = c.find(OLD_CARD_END, start) + len(OLD_CARD_END)
    print(f'Replacing card: {start}–{end}')
    c = c[:start] + NEW_TABLE + c[end:]
    post['content'] = c
    print('Done. Length:', len(c))
    break

with open('src/data/posts.json', 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)
print('Saved.')
