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

# ── 1. Convert "Fourth — The Revenue Fallacy" bold paragraph → h3 section ──
OLD_FOURTH = (
    'You cannot separate the low cost from the community context that produces it.</p>\n\n'
    '<p><strong>Fourth &mdash; The Revenue Fallacy:</strong> there is a version of this argument that goes: European clubs'
)

NEW_FOURTH = (
    'You cannot separate the low cost from the community context that produces it.</p>\n\n'
    + DIVIDER
    + '<h3 style="font-size:1.3em;font-weight:800;color:#0F3154;margin:0 0 18px;">The Revenue Fallacy</h3>\n\n'
    '<p>There is a version of this argument that goes: European clubs'
)

# ── 2. Fix the forum comment card — less formal, more like a real forum post ──
# Replace the polished avatar card with a plain forum-post look
OLD_FORUM_CARD = (
    '<div style="background:#F8FAFC;border:1px solid #E1E8EF;border-radius:14px;'
    'padding:20px 24px;margin:0 0 12px;">'
    '<div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">'
    '<div style="width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#94a3b8,#64748b);'
    'display:flex;align-items:center;justify-content:center;flex-shrink:0;">'
    '<span style="font-size:0.85em;color:#fff;font-weight:700;">SC</span></div>'
    '<div>'
    '<p style="font-size:0.85em;font-weight:700;color:#0F3154;margin:0;">Soccer Parent</p>'
    '<p style="font-size:0.75em;color:#94a3b8;margin:0;">Community Forum</p>'
    '</div></div>'
    '<p style="font-size:0.9em;color:#374151;line-height:1.7;margin:0 0 14px;">'
    '"For better context, why don\'t you make a chart of actual levels of play and who pays what? '
    'For example:"</p>'
)

NEW_FORUM_CARD = (
    '<div style="background:#F8FAFC;border-left:3px solid #CBD5E1;'
    'border-radius:0 8px 8px 0;padding:16px 20px;margin:0 0 12px;">'
    '<p style="font-size:0.78em;font-weight:600;color:#94a3b8;margin:0 0 10px;'
    'text-transform:uppercase;letter-spacing:0.06em;">Posted in a community forum</p>'
    '<p style="font-size:0.9em;color:#374151;line-height:1.7;margin:0 0 14px;font-style:italic;">'
    '"For better context, why don\'t you make a chart of actual levels of play and who pays what? '
    'For example:"</p>'
)

# ── 3. Fix the exaggerated $10,000 figures in the forum table ──
# The table has 4 rows all showing $10,000 — update to realistic ranges
OLD_ROW_1 = "['MLS Next (Non-Academy)', '$10,000', 'EPL Academy',          'Free'],"
NEW_ROW_1 = "['MLS Next (Non-Academy)', '$3,000&ndash;$8,000', 'EPL Academy', 'Free'],"

OLD_ROW_2 = "['ECNL National',          '$10,000', 'Championship Academy', 'Free'],"
NEW_ROW_2 = "['ECNL National', '$4,000&ndash;$8,000', 'Championship Academy', 'Free'],"

OLD_ROW_3 = "['USYSA National',         '$10,000', 'League One Academy',   'Free'],"
NEW_ROW_3 = "['USYSA National', '$3,000&ndash;$7,000', 'League One Academy', 'Free'],"

OLD_ROW_4 = "['ECNL Regional',          '$10,000', 'League Two Academy',   'Free'],"
NEW_ROW_4 = "['ECNL Regional', '$2,500&ndash;$5,000', 'League Two Academy', 'Free'],"

# But the table rows are already rendered HTML, not Python list literals
# Let me find the actual rendered HTML for the table cells
RENDERED_TABLE_OLD = (
    '<td style="padding:13px 16px;font-size:0.9em;color:#374151;line-height:1.55;'
    'border-bottom:1px solid #E1E8EF;">MLS Next (Non-Academy)</td>'
    '<td style="padding:13px 16px;font-size:0.9em;color:#374151;line-height:1.55;'
    'border-bottom:1px solid #E1E8EF;">$10,000</td>'
    '<td style="padding:13px 16px;font-size:0.9em;color:#374151;line-height:1.55;'
    'border-bottom:1px solid #E1E8EF;">EPL Academy</td>'
    '<td style="padding:13px 16px;font-size:0.9em;color:#374151;line-height:1.55;'
    'border-bottom:1px solid #E1E8EF;">Free</td>'
)
RENDERED_TABLE_NEW = (
    '<td style="padding:13px 16px;font-size:0.9em;color:#374151;line-height:1.55;'
    'border-bottom:1px solid #E1E8EF;">MLS Next (Non-Academy)</td>'
    '<td style="padding:13px 16px;font-size:0.9em;color:#374151;line-height:1.55;'
    'border-bottom:1px solid #E1E8EF;">$3,000&ndash;$8,000</td>'
    '<td style="padding:13px 16px;font-size:0.9em;color:#374151;line-height:1.55;'
    'border-bottom:1px solid #E1E8EF;">EPL Academy</td>'
    '<td style="padding:13px 16px;font-size:0.9em;color:#374151;line-height:1.55;'
    'border-bottom:1px solid #E1E8EF;">Free</td>'
)

ECNL_NAT_OLD = (
    '<td style="padding:13px 16px;font-size:0.9em;color:#374151;line-height:1.55;'
    'border-bottom:1px solid #E1E8EF;">ECNL National</td>'
    '<td style="padding:13px 16px;font-size:0.9em;color:#374151;line-height:1.55;'
    'border-bottom:1px solid #E1E8EF;">$10,000</td>'
    '<td style="padding:13px 16px;font-size:0.9em;color:#374151;line-height:1.55;'
    'border-bottom:1px solid #E1E8EF;">Championship Academy</td>'
    '<td style="padding:13px 16px;font-size:0.9em;color:#374151;line-height:1.55;'
    'border-bottom:1px solid #E1E8EF;">Free</td>'
)
ECNL_NAT_NEW = (
    '<td style="padding:13px 16px;font-size:0.9em;color:#374151;line-height:1.55;'
    'border-bottom:1px solid #E1E8EF;">ECNL National</td>'
    '<td style="padding:13px 16px;font-size:0.9em;color:#374151;line-height:1.55;'
    'border-bottom:1px solid #E1E8EF;">$4,000&ndash;$8,000</td>'
    '<td style="padding:13px 16px;font-size:0.9em;color:#374151;line-height:1.55;'
    'border-bottom:1px solid #E1E8EF;">Championship Academy</td>'
    '<td style="padding:13px 16px;font-size:0.9em;color:#374151;line-height:1.55;'
    'border-bottom:1px solid #E1E8EF;">Free</td>'
)

USYSA_OLD = (
    '<td style="padding:13px 16px;font-size:0.9em;color:#374151;line-height:1.55;'
    'border-bottom:1px solid #E1E8EF;">USYSA National</td>'
    '<td style="padding:13px 16px;font-size:0.9em;color:#374151;line-height:1.55;'
    'border-bottom:1px solid #E1E8EF;">$10,000</td>'
    '<td style="padding:13px 16px;font-size:0.9em;color:#374151;line-height:1.55;'
    'border-bottom:1px solid #E1E8EF;">League One Academy</td>'
    '<td style="padding:13px 16px;font-size:0.9em;color:#374151;line-height:1.55;'
    'border-bottom:1px solid #E1E8EF;">Free</td>'
)
USYSA_NEW = (
    '<td style="padding:13px 16px;font-size:0.9em;color:#374151;line-height:1.55;'
    'border-bottom:1px solid #E1E8EF;">USYSA National</td>'
    '<td style="padding:13px 16px;font-size:0.9em;color:#374151;line-height:1.55;'
    'border-bottom:1px solid #E1E8EF;">$3,000&ndash;$7,000</td>'
    '<td style="padding:13px 16px;font-size:0.9em;color:#374151;line-height:1.55;'
    'border-bottom:1px solid #E1E8EF;">League One Academy</td>'
    '<td style="padding:13px 16px;font-size:0.9em;color:#374151;line-height:1.55;'
    'border-bottom:1px solid #E1E8EF;">Free</td>'
)

ECNL_REG_OLD = (
    '<td style="padding:13px 16px;font-size:0.9em;color:#374151;line-height:1.55;'
    'border-bottom:1px solid #E1E8EF;">ECNL Regional</td>'
    '<td style="padding:13px 16px;font-size:0.9em;color:#374151;line-height:1.55;'
    'border-bottom:1px solid #E1E8EF;">$10,000</td>'
    '<td style="padding:13px 16px;font-size:0.9em;color:#374151;line-height:1.55;'
    'border-bottom:1px solid #E1E8EF;">League Two Academy</td>'
    '<td style="padding:13px 16px;font-size:0.9em;color:#374151;line-height:1.55;'
    'border-bottom:1px solid #E1E8EF;">Free</td>'
)
ECNL_REG_NEW = (
    '<td style="padding:13px 16px;font-size:0.9em;color:#374151;line-height:1.55;'
    'border-bottom:1px solid #E1E8EF;">ECNL Regional</td>'
    '<td style="padding:13px 16px;font-size:0.9em;color:#374151;line-height:1.55;'
    'border-bottom:1px solid #E1E8EF;">$2,500&ndash;$5,000</td>'
    '<td style="padding:13px 16px;font-size:0.9em;color:#374151;line-height:1.55;'
    'border-bottom:1px solid #E1E8EF;">League Two Academy</td>'
    '<td style="padding:13px 16px;font-size:0.9em;color:#374151;line-height:1.55;'
    'border-bottom:1px solid #E1E8EF;">Free</td>'
)

# ── Also add a note at the start of Neil's reply about the exaggerated costs ──
OLD_NEIL_OPENER = (
    'This is a genuinely thoughtful chart &mdash; and it captures exactly the misunderstanding '
    'that makes this conversation so difficult. <strong>You cannot compare ECNL to a Championship '
    'academy. That is the core of the fallacy.</strong></p>'
)

NEW_NEIL_OPENER = (
    'First, the cost figures here are off &mdash; most families at these levels are not paying $10,000. '
    'Costs vary a lot by region, club, and travel schedule. But honestly, the amounts are not even '
    'the main problem with this chart.</p>'
    '<p style="font-size:0.9em;color:#0c4a6e;line-height:1.75;margin:0 0 12px;">'
    'The bigger issue: this chart captures exactly the misunderstanding that makes this conversation '
    'so difficult. <strong>You cannot compare ECNL to a Championship academy. That is the core '
    'of the fallacy.</strong></p>'
)

for post in posts:
    if 'supply-demand' not in post['slug']:
        continue

    c = post['content']

    # Fix 1 — Revenue Fallacy section header
    if OLD_FOURTH in c:
        c = c.replace(OLD_FOURTH, NEW_FOURTH, 1)
        print('✓ Revenue Fallacy promoted to h3 section')
    else:
        print('WARNING: Revenue Fallacy anchor not found')

    # Fix 2 — Forum card styling
    if OLD_FORUM_CARD in c:
        c = c.replace(OLD_FORUM_CARD, NEW_FORUM_CARD, 1)
        print('✓ Forum comment card made informal')
    else:
        print('WARNING: Forum card anchor not found')
        # Debug
        idx = c.find('Soccer Parent')
        if idx >= 0:
            print('  Soccer Parent found at:', idx)
            print('  Surrounding:', repr(c[max(0,idx-200):idx+100]))

    # Fix 3 — Exaggerated table amounts
    for old, new, label in [
        (RENDERED_TABLE_OLD, RENDERED_TABLE_NEW, 'MLS Next row'),
        (ECNL_NAT_OLD, ECNL_NAT_NEW, 'ECNL National row'),
        (USYSA_OLD, USYSA_NEW, 'USYSA National row'),
        (ECNL_REG_OLD, ECNL_REG_NEW, 'ECNL Regional row'),
    ]:
        if old in c:
            c = c.replace(old, new, 1)
            print(f'✓ Updated {label}')
        else:
            print(f'WARNING: {label} not found')

    # Fix 4 — Neil's opener about costs
    if OLD_NEIL_OPENER in c:
        c = c.replace(OLD_NEIL_OPENER, NEW_NEIL_OPENER, 1)
        print('✓ Added cost note to Neil reply')
    else:
        print('WARNING: Neil opener not found')

    post['content'] = c
    print('New length:', len(c))
    break

with open('src/data/posts.json', 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)
print('Saved.')
