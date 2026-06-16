import sys, json
sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/posts.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

# ── 1. Expand "ECNL to a Championship academy" → include any pro academy ──
OLD_ECNL = (
    'The bigger issue: this chart captures exactly the misunderstanding that makes this conversation '
    'so difficult. <strong>You cannot compare ECNL to a Championship academy. That is the core '
    'of the fallacy.</strong></p>'
)
NEW_ECNL = (
    'The bigger issue: this chart captures exactly the misunderstanding that makes this conversation '
    'so difficult. <strong>You cannot compare ECNL to a Championship academy &mdash; or to any '
    'professional academy. That is the core of the fallacy.</strong></p>'
)

OLD_ECNL2 = (
    'The kids playing ECNL in the US would not be in a Championship academy if they lived in England. '
    'They would be in grassroots. Full stop. Championship academies are for players who have been '
    'scouted and selected by professional clubs'
)
NEW_ECNL2 = (
    'The kids playing ECNL in the US would not be in a Championship academy &mdash; or any '
    'professional academy &mdash; if they lived in England. '
    'They would be in grassroots. Full stop. Professional academies are for players who have been '
    'scouted and selected by professional clubs'
)

# ── 2. Make the Monopoly ebook image larger ──
OLD_EBOOK = (
    'background:linear-gradient(135deg,#1e1b4b,#312e81);border-radius:20px;padding:32px 36px;'
    'margin:40px 0;display:flex;gap:24px;align-items:center;'
    'box-shadow:0 8px 32px rgba(49,46,129,0.3);">'
    '<img src="https://media.anytime-soccer.com/wp-content/uploads/2024/07/us_soccer-768x596.png" '
    'alt="Monopoly eBook" style="width:80px;height:80px;object-fit:cover;border-radius:10px;flex-shrink:0;" />'
)
NEW_EBOOK = (
    'background:linear-gradient(135deg,#1e1b4b,#312e81);border-radius:20px;padding:32px 36px;'
    'margin:40px 0;display:flex;gap:28px;align-items:flex-start;'
    'box-shadow:0 8px 32px rgba(49,46,129,0.3);">'
    '<img src="https://media.anytime-soccer.com/wp-content/uploads/2024/07/us_soccer-768x596.png" '
    'alt="Monopoly eBook" style="width:140px;height:110px;object-fit:cover;border-radius:12px;flex-shrink:0;" />'
)

for post in posts:
    if 'supply-demand' not in post['slug']:
        continue
    c = post['content']

    if OLD_ECNL in c:
        c = c.replace(OLD_ECNL, NEW_ECNL, 1)
        print('✓ ECNL comparison text expanded (opener)')
    else:
        print('WARNING: ECNL opener not found')

    if OLD_ECNL2 in c:
        c = c.replace(OLD_ECNL2, NEW_ECNL2, 1)
        print('✓ ECNL comparison text expanded (body)')
    else:
        print('WARNING: ECNL body not found')

    if OLD_EBOOK in c:
        c = c.replace(OLD_EBOOK, NEW_EBOOK, 1)
        print('✓ Monopoly ebook image enlarged')
    else:
        print('WARNING: Ebook block not found')

    post['content'] = c
    print('New length:', len(c))
    break

with open('src/data/posts.json', 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)
print('Saved.')
