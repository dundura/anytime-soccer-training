import sys, json
sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/posts.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

# Build 100 player dots: first 8 are red (college-level), rest are light gray
def player_dots():
    dots = ''
    for i in range(100):
        if i < 8:
            color = '#DC373E'
            title = 'Played college+ soccer'
        else:
            color = '#CBD5E1'
            title = 'Grassroots / recreational'
        dots += (
            f'<div title="{title}" style="width:18px;height:18px;border-radius:50%;'
            f'background:{color};flex-shrink:0;"></div>'
        )
    return dots

GRAPHIC = (
    '<div style="background:#FAFBFF;border:1px solid #E1E8EF;border-radius:20px;'
    'padding:32px 28px;margin:32px 0;box-shadow:0 2px 16px rgba(15,49,84,0.06);">'

    # Header
    '<p style="font-size:0.7em;font-weight:800;color:#DC373E;text-transform:uppercase;'
    'letter-spacing:0.1em;margin:0 0 6px;">Illustrated</p>'
    '<p style="font-size:1.15em;font-weight:800;color:#0F3154;margin:0 0 4px;line-height:1.3;">'
    'Finding the Coach American Parents Actually Want</p>'
    '<p style="font-size:0.82em;color:#64748b;margin:0 0 24px;">'
    'Every dot = 1 youth soccer player. Red dots played college level or above.</p>'

    # Dot grid
    '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:20px;">'
    + player_dots() +
    '</div>'

    # Legend
    '<div style="display:flex;align-items:center;gap:20px;margin-bottom:28px;flex-wrap:wrap;">'
    '<div style="display:flex;align-items:center;gap:8px;">'
    '<div style="width:14px;height:14px;border-radius:50%;background:#DC373E;"></div>'
    '<span style="font-size:0.8em;color:#374151;">Played college+ (≈8 of 100)</span>'
    '</div>'
    '<div style="display:flex;align-items:center;gap:8px;">'
    '<div style="width:14px;height:14px;border-radius:50%;background:#CBD5E1;"></div>'
    '<span style="font-size:0.8em;color:#374151;">Everyone else</span>'
    '</div>'
    '</div>'

    # Funnel
    '<p style="font-size:0.78em;font-weight:800;color:#0F3154;text-transform:uppercase;'
    'letter-spacing:0.07em;margin:0 0 14px;">Now filter that pool further&hellip;</p>'

    '<div style="display:flex;flex-direction:column;gap:8px;">'

    # Step 1
    '<div style="display:flex;align-items:center;gap:14px;">'
    '<div style="background:#DC373E;color:#fff;font-size:0.75em;font-weight:700;'
    'padding:6px 12px;border-radius:6px;white-space:nowrap;min-width:90px;text-align:center;">'
    '≈ 8 of 100</div>'
    '<div style="flex:1;height:1px;background:#E1E8EF;"></div>'
    '<p style="font-size:0.85em;color:#374151;margin:0;">Played at college level or above</p>'
    '</div>'

    # Step 2
    '<div style="display:flex;align-items:center;gap:14px;">'
    '<div style="background:#b91c1c;color:#fff;font-size:0.75em;font-weight:700;'
    'padding:6px 12px;border-radius:6px;white-space:nowrap;min-width:90px;text-align:center;">'
    'Fewer</div>'
    '<div style="flex:1;height:1px;background:#E1E8EF;"></div>'
    '<p style="font-size:0.85em;color:#374151;margin:0;">&hellip; who actually want to coach kids</p>'
    '</div>'

    # Step 3
    '<div style="display:flex;align-items:center;gap:14px;">'
    '<div style="background:#991b1b;color:#fff;font-size:0.75em;font-weight:700;'
    'padding:6px 12px;border-radius:6px;white-space:nowrap;min-width:90px;text-align:center;">'
    'Even fewer</div>'
    '<div style="flex:1;height:1px;background:#E1E8EF;"></div>'
    '<p style="font-size:0.85em;color:#374151;margin:0;">&hellip; who live in your market</p>'
    '</div>'

    # Step 4
    '<div style="display:flex;align-items:center;gap:14px;">'
    '<div style="background:#7f1d1d;color:#fff;font-size:0.75em;font-weight:700;'
    'padding:6px 12px;border-radius:6px;white-space:nowrap;min-width:90px;text-align:center;">'
    'Fewer still</div>'
    '<div style="flex:1;height:1px;background:#E1E8EF;"></div>'
    '<p style="font-size:0.85em;color:#374151;margin:0;">&hellip; who are available Tuesday &amp; Thursday afternoons</p>'
    '</div>'

    # Step 5 — punchline
    '<div style="display:flex;align-items:center;gap:14px;">'
    '<div style="background:#0F3154;color:#fff;font-size:0.75em;font-weight:700;'
    'padding:6px 12px;border-radius:6px;white-space:nowrap;min-width:90px;text-align:center;">'
    'Your coach</div>'
    '<div style="flex:1;height:1px;background:#E1E8EF;"></div>'
    '<p style="font-size:0.85em;color:#374151;margin:0;">&hellip; who will work for what you think is reasonable 😬</p>'
    '</div>'

    '</div>'  # end funnel

    # Punchline callout
    '<div style="background:linear-gradient(135deg,#FFF1F2,#FFE4E6);border:1px solid #FECDD3;'
    'border-radius:12px;padding:16px 20px;margin-top:24px;display:flex;gap:12px;align-items:flex-start;">'
    '<span style="font-size:1.4em;flex-shrink:0;">💡</span>'
    '<p style="font-size:0.88em;color:#9f1239;margin:0;line-height:1.65;">'
    '<strong>This is why coaches cost what they cost.</strong> It has nothing to do with '
    'price gouging. It has everything to do with the fact that the people qualified to do '
    'the job &mdash; by the standard most families hold &mdash; are genuinely rare. '
    'And rare things in high demand are not cheap.</p>'
    '</div>'

    '</div>'  # end card
)

# Insert after the paragraph ending "...most parents consider acceptable."
ANCHOR = 'That is your entire pool of coaches who meet the standard that most parents consider acceptable.</p>'
NEW_ANCHOR = ANCHOR + '\n\n' + GRAPHIC

for post in posts:
    if 'supply-demand' not in post['slug']:
        continue
    if ANCHOR in post['content']:
        post['content'] = post['content'].replace(ANCHOR, NEW_ANCHOR, 1)
        print('✓ Graphic inserted. Length:', len(post['content']))
    else:
        print('WARNING: anchor not found')
    break

with open('src/data/posts.json', 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)
print('Saved.')
