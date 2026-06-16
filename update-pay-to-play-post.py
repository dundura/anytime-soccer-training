import json, sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/posts.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

TARGET = 'why-is-youth-soccer-so-expensive-supply-demand-american-culture'

# ── New Spotify embed (second podcast episode) ─────────────────────────────────
NEW_EPISODE_EMBED = (
    '<iframe data-testid="embed-iframe" style="border-radius:12px;display:block;" '
    'src="https://open.spotify.com/embed/episode/0vOhAbrHCLiJtzq8nyQ7ri?utm_source=generator" '
    'width="100%" height="352" frameBorder="0" allowfullscreen="" '
    'allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>'
)

# ── Ebook block ────────────────────────────────────────────────────────────────
EBOOK_BLOCK = (
    '\n<div style="background:linear-gradient(135deg,#1e1b4b,#312e81);border-radius:20px;'
    'padding:32px 36px;margin:40px 0;display:flex;gap:24px;align-items:center;'
    'box-shadow:0 8px 32px rgba(49,46,129,0.3);">'
    '<div style="font-size:2.8em;flex-shrink:0;">&#128218;</div>'
    '<div>'
    '<p style="font-size:0.75em;font-weight:800;color:rgba(199,210,254,0.8);text-transform:uppercase;'
    'letter-spacing:0.1em;margin:0 0 6px;">Free eBook</p>'
    '<p style="font-size:1.1em;font-weight:800;color:#ffffff;margin:0 0 8px;line-height:1.3;">'
    'Monopoly: Discussing Issues Facing US Youth Soccer</p>'
    '<p style="font-size:0.9em;color:rgba(199,210,254,0.85);margin:0 0 18px;line-height:1.6;">'
    'A candid look at what\'s holding back American soccer — and ideas to spark real change '
    'from one soccer parent\'s perspective.</p>'
    '<a href="https://www.anytime-soccer.com/monopoly-addressing-issues-facing-youth-soccer-ebook" '
    'style="display:inline-block;background:#6366f1;color:#ffffff;font-weight:700;font-size:0.9em;'
    'padding:11px 24px;border-radius:10px;text-decoration:none;'
    'box-shadow:0 4px 12px rgba(99,102,241,0.4);">Download Free eBook &#8594;</a>'
    '</div></div>\n'
)

# ── Budget Calculator HTML ─────────────────────────────────────────────────────
def slider(sid, label, val, mn, mx, step, unit='$'):
    prefix = unit if unit == '$' else ''
    return (
        f'<div style="margin-bottom:20px;">'
        f'<div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px;">'
        f'<label style="font-size:0.88em;font-weight:600;color:#374151;">{label}</label>'
        f'<span id="{sid}-lbl" style="font-size:0.95em;font-weight:700;color:#0F3154;'
        f'background:#EEF4FF;padding:2px 10px;border-radius:20px;">{prefix}{val}</span>'
        f'</div>'
        f'<input id="{sid}" type="range" min="{mn}" max="{mx}" step="{step}" value="{val}" '
        f'style="width:100%;accent-color:#DC373E;height:6px;cursor:pointer;" />'
        f'<div style="display:flex;justify-content:space-between;font-size:0.75em;color:#94a3b8;margin-top:2px;">'
        f'<span>{prefix}{mn}</span><span>{prefix}{mx}</span>'
        f'</div></div>'
    )

def bar_row(bid, label, color):
    return (
        f'<div style="margin-bottom:10px;">'
        f'<div style="display:flex;justify-content:space-between;font-size:0.82em;margin-bottom:4px;">'
        f'<span style="color:#64748b;">{label}</span>'
        f'<span id="sbc-out-{bid}" style="font-weight:700;color:#0F3154;">$0</span>'
        f'</div>'
        f'<div style="background:#E1E8EF;border-radius:4px;height:8px;overflow:hidden;">'
        f'<div id="sbc-bar-{bid}" style="height:100%;width:0%;background:{color};'
        f'border-radius:4px;transition:width 0.25s ease;"></div>'
        f'</div></div>'
    )

CALCULATOR = (
    '\n<div style="background:linear-gradient(135deg,#F8FAFC,#F1F5F9);border:1px solid #E1E8EF;'
    'border-radius:20px;padding:32px 36px;margin:44px 0;'
    'box-shadow:0 4px 24px rgba(15,49,84,0.07);">'
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:6px;">'
    '<span style="font-size:1.4em;">&#129518;</span>'
    '<p style="font-size:0.75em;font-weight:800;color:#DC373E;text-transform:uppercase;'
    'letter-spacing:0.1em;margin:0;">Interactive Tool</p>'
    '</div>'
    '<h3 style="font-size:1.4em;font-weight:800;color:#0F3154;margin:0 0 4px;">Club Soccer Budget Calculator</h3>'
    '<p style="font-size:0.88em;color:#64748b;margin:0 0 28px;">'
    'Slide the controls to match your situation — see your real annual cost broken down instantly.</p>'

    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:32px;">'

    # Left column — sliders
    '<div>'
    '<p style="font-size:0.78em;font-weight:800;color:#0F3154;text-transform:uppercase;'
    'letter-spacing:0.08em;margin:0 0 18px;">Your Costs</p>'
    + slider('sbc-reg',       'Annual club registration',       2000, 500,  8000, 50)
    + slider('sbc-tours',     'Tournaments per year',           8,    0,    24,   1,  unit='')
    + slider('sbc-tour-cost', 'Average cost per tournament trip', 500, 100, 2000, 50)
    + slider('sbc-gear',      'Uniforms + gear per year',       400,  0,   1500, 25)
    + slider('sbc-priv',      'Private training sessions/month', 0,   0,    12,   1,  unit='')
    + slider('sbc-priv-cost', 'Cost per private session',        60,  30,  200,  5)
    + slider('sbc-sess',      'Training sessions per week',      4,   1,    7,   1,  unit='')
    + slider('sbc-months',    'Season length (months)',          10,  6,   12,   1,  unit='')
    + '</div>'

    # Right column — results
    '<div>'
    '<p style="font-size:0.78em;font-weight:800;color:#0F3154;text-transform:uppercase;'
    'letter-spacing:0.08em;margin:0 0 18px;">Your Breakdown</p>'

    + bar_row('reg',   'Registration',      '#0F3154')
    + bar_row('tours', 'Tournaments',       '#DC373E')
    + bar_row('gear',  'Gear + uniforms',   '#6366f1')
    + bar_row('priv',  'Private training',  '#10b981')

    + '<div style="background:#0F3154;border-radius:14px;padding:20px 24px;margin-top:20px;">'
    '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">'
    '<span style="font-size:0.85em;color:rgba(255,255,255,0.7);">Annual total</span>'
    '<span id="sbc-out-annual" style="font-size:1.5em;font-weight:800;color:#ffffff;">$0</span>'
    '</div>'
    '<div style="height:1px;background:rgba(255,255,255,0.12);margin-bottom:10px;"></div>'
    '<div style="display:flex;justify-content:space-between;margin-bottom:6px;">'
    '<span style="font-size:0.82em;color:rgba(255,255,255,0.65);">Per month</span>'
    '<span id="sbc-out-month" style="font-size:0.95em;font-weight:700;color:#ffffff;">$0</span>'
    '</div>'
    '<div style="display:flex;justify-content:space-between;">'
    '<span style="font-size:0.82em;color:rgba(255,255,255,0.65);">Per training session</span>'
    '<span id="sbc-out-session" style="font-size:0.95em;font-weight:700;color:#ffffff;">$0</span>'
    '</div></div>'

    '<div style="background:#FFF7ED;border:1px solid #FCD34D;border-radius:12px;padding:14px 16px;margin-top:14px;">'
    '<p style="font-size:0.78em;font-weight:800;color:#92400e;margin:0 0 4px;text-transform:uppercase;'
    'letter-spacing:0.06em;">vs. Anytime Soccer Training</p>'
    '<p style="font-size:0.85em;color:#78350f;margin:0;line-height:1.6;">'
    'Unlimited home training videos &amp; weekly plans: <strong>&lt;$50/year</strong>. '
    'The best complement to club — not a replacement.</p>'
    '</div>'

    '</div>'  # end right col
    '</div>'  # end grid
    '</div>\n'  # end calculator
)

for post in posts:
    if post['slug'] != TARGET:
        continue

    content = post['content']

    # 1. Swap podcast embed URL to correct episode
    content = content.replace(
        'https://open.spotify.com/embed/episode/6Dc6wOPN3bjdDXzauLcRp8?utm_source=generator',
        'https://open.spotify.com/embed/episode/0vOhAbrHCLiJtzq8nyQ7ri?utm_source=generator'
    )
    print('Podcast embed updated.')

    # 2. Add ebook block — insert before "So What Do We Do With This?" section
    EBOOK_ANCHOR = '\n<h2 style="font-size:1.6em;font-weight:800;color:#0F3154;margin:40px 0 16px;">So What Do We Do With This?</h2>'
    if EBOOK_ANCHOR in content:
        content = content.replace(EBOOK_ANCHOR, EBOOK_BLOCK + EBOOK_ANCHOR, 1)
        print('eBook block inserted.')
    else:
        print('WARNING: ebook anchor not found')

    # 3. Add calculator — insert before the final CTA (dark navy block)
    CALC_ANCHOR = '\n<div style="background:linear-gradient(135deg,#0F3154,#1a4a78);border-radius:20px;padding:40px;'
    if CALC_ANCHOR in content:
        content = content.replace(CALC_ANCHOR, CALCULATOR + CALC_ANCHOR, 1)
        print('Calculator inserted.')
    else:
        print('WARNING: CTA anchor not found')

    post['content'] = content
    print('New content length:', len(content))
    break

with open('src/data/posts.json', 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)
print('posts.json saved.')
