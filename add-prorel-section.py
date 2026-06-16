import sys, json
sys.stdout.reconfigure(encoding='utf-8')

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

def td(text, bold=False, color='#374151'):
    inner = f'<strong>{text}</strong>' if bold else text
    return (
        f'<td style="padding:13px 20px;font-size:0.9em;color:{color};line-height:1.6;'
        f'border-bottom:1px solid #E1E8EF;">{inner}</td>'
    )

def th(text, bg='#0F3154'):
    return (
        f'<th style="padding:12px 20px;text-align:left;font-size:0.8em;font-weight:800;'
        f'color:#fff;letter-spacing:0.07em;text-transform:uppercase;background:{bg};">'
        f'{text}</th>'
    )

tier_rows = [
    ('Tier 2', 'USL Championship / MLS NEXT Pro', 'Top MLS NEXT clubs, ECNL National elite', 'Players already on MLS Academy radar — a very small number'),
    ('Tier 3', 'USL League One', 'Top ECNL Regional, elite state-level players', 'Genuinely talented players who may be overlooked today'),
    ('Tier 4', 'USL League Two', 'Strong state-league players, top rec standouts', 'Local talent with potential — the pro/rel benefit is real here'),
    ('Tier 5', 'Regional / NPSL', 'Community-level elite players', 'Players who currently have no visible pathway at all'),
]

tier_table_rows = ''
for i, (tier, pro_level, youth_source, note) in enumerate(tier_rows):
    bg = '#ffffff' if i % 2 == 0 else '#F8FAFC'
    tier_table_rows += (
        f'<tr style="background:{bg};">'
        + td(tier, bold=True, color='#DC373E')
        + td(pro_level)
        + td(youth_source)
        + td(note, color='#64748b')
        + '</tr>'
    )

TIER_TABLE = (
    '<div style="overflow-x:auto;margin:28px 0;border-radius:14px;'
    'box-shadow:0 2px 16px rgba(15,49,84,0.08);border:1px solid #E1E8EF;overflow:hidden;">'
    '<table style="width:100%;border-collapse:collapse;">'
    '<thead>'
    '<tr>'
    + th('Pro Tier', '#0F3154')
    + th('Pro Level (US)', '#0F3154')
    + th('Youth Source (Current Equivalent)', '#0F3154')
    + th('What Pro/Rel Changes', '#16a34a')
    + '</tr>'
    '</thead>'
    '<tbody>' + tier_table_rows + '</tbody>'
    '</table></div>'
)

PROREL_SECTION = (
    DIVIDER
    + '<h3 style="font-size:1.3em;font-weight:800;color:#0F3154;margin:0 0 18px;">'
    'What About Promotion and Relegation?</h3>\n\n'

    '<p>Pro/rel comes up in almost every conversation about fixing American soccer. '
    'And it is worth taking seriously &mdash; but it needs to be understood for what it '
    'actually does and does not do.</p>\n\n'

    '<p>Here is a useful thought experiment: <strong>if the US adopted a full pro/rel pyramid '
    'tomorrow, which kids in our current leagues would be next in line to play for a Tier 2 '
    'professional academy? Then Tier 3? Tier 4 and 5?</strong></p>\n\n'

    + TIER_TABLE

    + '<p>This is where pro/rel genuinely helps. Right now, a talented kid in a smaller market '
    'playing for a state-league club has almost no visible pathway to professional soccer. '
    'There is no affiliated pro club watching, no academy attached, no structured pipeline. '
    '<strong>Pro/rel changes that.</strong> A Tier 3 or Tier 4 club that has something to play '
    'for &mdash; promotion, survival &mdash; has a reason to identify and develop local talent '
    'more seriously. That creates more opportunities for elite players who are currently '
    'being overlooked, especially outside of major markets.</p>\n\n'

    '<p>Foreign investment is another real upside. A credible pro/rel pyramid attracts outside '
    'money in a way that the current closed-league system does not. More clubs with real '
    'investment means more professional infrastructure &mdash; better facilities, more paid '
    'coaching at the top of the pyramid, more scouts.</p>\n\n'

    '<p>But here is where people lose the thread: <strong>pro/rel is not equipped to finance '
    'club soccer at the mass-participation level.</strong> It does not change the cost basis '
    'for the average family. A Tier 3 club getting promoted does not suddenly have the budget '
    'to pay professional coaches across five age groups, cover facility costs for 200 kids '
    'training three days a week, and absorb travel expenses for a regional tournament schedule. '
    'The economics do not work that way. The club&rsquo;s revenue from gates and investment '
    'flows into the first team. The youth program still runs on parent dues.</p>\n\n'

    '<p>The cost drivers we talked about earlier in this post &mdash; paid coaching staff, '
    'multiple training days per week, licensed curriculum, tournament travel, facility access '
    '&mdash; none of those go away under pro/rel. That is a demand-side and cost-structure '
    'problem, and it exists independent of whether there is promotion and relegation at the '
    'top of the pyramid.</p>\n\n'

    '<p>So: pro/rel is good and worth pushing for. It will meaningfully expand pathways for '
    'elite players who are currently invisible to the system. It will bring foreign capital '
    'that improves the professional tier. It will make American soccer more legitimate on the '
    'world stage. What it will not do is make club soccer affordable for the average family. '
    'Those are two different problems &mdash; and they require two different conversations.</p>\n\n'
)

# Insert right before the Budget Calculator block
ANCHOR = (
    '<div style="background:linear-gradient(135deg,#F8FAFC,#F1F5F9);border:1px solid #E1E8EF;'
    'border-radius:20px;padding:32px 36px;margin:44px 0;box-shadow:0 4px 24px rgba(15,49,84,0.07);">'
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:6px;">'
    '<span style="font-size:1.4em;">&#129518;</span>'
    '<p style="font-size:0.75em;font-weight:800;color:#DC373E;text-transform:uppercase;'
    'letter-spacing:0.1em;margin:0;">Interactive Tool</p></div>'
    '<h3 style="font-size:1.4em;font-weight:800;color:#0F3154;margin:0 0 4px;">'
    'Club Soccer Budget Calculator</h3>'
)

NEW_ANCHOR = PROREL_SECTION + ANCHOR

for post in posts:
    if 'supply-demand' not in post['slug']:
        continue
    c = post['content']
    if ANCHOR in c:
        c = c.replace(ANCHOR, NEW_ANCHOR, 1)
        print('✓ Pro/Rel section inserted')
    else:
        print('WARNING: anchor not found')
    post['content'] = c
    print('New length:', len(c))
    break

with open('src/data/posts.json', 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)
print('Saved.')
