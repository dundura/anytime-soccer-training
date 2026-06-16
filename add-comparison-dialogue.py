import json

with open('src/data/posts.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

def divider():
    return (
        '<div style="display:flex;align-items:center;gap:12px;margin:44px 0;">'
        '<div style="flex:1;height:1px;background:linear-gradient(to right,transparent,#CBD5E1);"></div>'
        '<div style="width:6px;height:6px;border-radius:50%;background:#DC373E;"></div>'
        '<div style="width:10px;height:10px;border-radius:50%;background:#0F3154;"></div>'
        '<div style="width:6px;height:6px;border-radius:50%;background:#DC373E;"></div>'
        '<div style="flex:1;height:1px;background:linear-gradient(to left,transparent,#CBD5E1);"></div>'
        '</div>'
    )

def table(headers, rows, col_colors=None):
    th_cells = ''.join(
        '<th style="padding:12px 16px;text-align:left;font-size:0.8em;font-weight:800;'
        'color:#fff;letter-spacing:0.07em;text-transform:uppercase;background:' +
        (col_colors[i] if col_colors else '#0F3154') + ';">' + h + '</th>'
        for i, h in enumerate(headers)
    )
    body = ''
    for ri, row in enumerate(rows):
        bg = '#ffffff' if ri % 2 == 0 else '#F8FAFC'
        tds = ''.join(
            '<td style="padding:13px 16px;font-size:0.9em;color:#374151;line-height:1.55;'
            'border-bottom:1px solid #E1E8EF;">' + cell + '</td>'
            for cell in row
        )
        body += '<tr style="background:' + bg + ';">' + tds + '</tr>'
    return (
        '<div style="overflow-x:auto;margin:28px 0;border-radius:14px;'
        'box-shadow:0 2px 16px rgba(15,49,84,0.08);border:1px solid #E1E8EF;overflow:hidden;">'
        '<table style="width:100%;border-collapse:collapse;">'
        '<thead><tr>' + th_cells + '</tr></thead><tbody>' + body + '</tbody></table></div>'
    )

DIALOGUE_SECTION = (
    divider()

    + '<h3 style="font-size:1.3em;font-weight:800;color:#0F3154;margin:0 0 8px;">'
    'A Real Example of the Misunderstanding</h3>'
    '<p style="font-size:0.9em;color:#64748b;margin:0 0 24px;">'
    'From a community discussion about the cost of US youth soccer &mdash; '
    'a well-intentioned comparison that illustrates exactly why this conversation goes sideways.</p>\n\n'

    # The original comment — styled as a forum post
    + '<div style="background:#F8FAFC;border:1px solid #E1E8EF;border-radius:14px;'
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

    + table(
        ['US Level', 'US Annual Cost', 'UK Equivalent', 'UK Annual Cost'],
        [
            ['MLS Academy',           'Free',   'EPL Academy',           'Free'],
            ['MLS Next (Non-Academy)', '$10,000', 'EPL Academy',          'Free'],
            ['ECNL National',          '$10,000', 'Championship Academy', 'Free'],
            ['USYSA National',         '$10,000', 'League One Academy',   'Free'],
            ['ECNL Regional',          '$10,000', 'League Two Academy',   'Free'],
        ],
        ['#0F3154', '#DC373E', '#16a34a', '#16a34a']
    )

    + '</div>\n\n'

    # Neil's reply — styled differently
    + '<div style="background:linear-gradient(135deg,#F0F9FF,#E0F2FE);border:1px solid #7DD3FC;'
    'border-radius:14px;padding:20px 24px;margin:0 0 28px;">'
    '<div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">'
    '<div style="width:34px;height:34px;border-radius:50%;overflow:hidden;flex-shrink:0;">'
    '<img src="https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1779745975826-iqel6b.png" '
    'alt="Neil Crawford" style="width:100%;height:100%;object-fit:cover;" /></div>'
    '<div>'
    '<p style="font-size:0.85em;font-weight:700;color:#0F3154;margin:0;">Neil Crawford</p>'
    '<p style="font-size:0.75em;color:#0369a1;margin:0;">Reply</p>'
    '</div></div>'
    '<p style="font-size:0.9em;color:#0c4a6e;line-height:1.75;margin:0 0 12px;">'
    'This is a genuinely thoughtful chart &mdash; and it captures exactly the misunderstanding '
    'that makes this conversation so difficult. <strong>You cannot compare ECNL to a Championship '
    'academy. That is the core of the fallacy.</strong></p>'
    '<p style="font-size:0.9em;color:#0c4a6e;line-height:1.75;margin:0 0 12px;">'
    'The kids playing ECNL in the US would not be in a Championship academy if they lived in England. '
    'They would be in grassroots. Full stop. Championship academies are for players who have been '
    'scouted and selected by professional clubs &mdash; players with a realistic pathway to professional '
    'soccer. That is a tiny fraction of the ECNL population.</p>'
    '<p style="font-size:0.9em;color:#0c4a6e;line-height:1.75;margin:0 0 12px;">'
    'The correct comparison for the average ECNL player in England is not a Championship academy &mdash; '
    'it is a local community club with a parent volunteer coach. Which costs very little. '
    'Because the level of investment is matched to the level of player. That is the part '
    'the chart misses.</p>'
    '<p style="font-size:0.9em;color:#0c4a6e;line-height:1.75;margin:0;">'
    'What the chart is actually showing &mdash; without meaning to &mdash; is that in America, '
    'we have built a system that provides near-academy-level programming to average players, '
    'at near-academy cost. In England, that does not exist. If you are not good enough for the '
    'academy, you are in grassroots. There is no in-between. Whether that is better or worse '
    'for player development is a genuinely interesting question. But it is a very different '
    'system &mdash; and it is not cheaper because it is better run.'
    '</p>'
    '</div>\n\n'
)

# Insert after the revenue fallacy closing paragraph, before the big quote block
ANCHOR = (
    'They do not share a budget.</p>\n\n'
    '<div style="position:relative;background:linear-gradient(135deg,#F8FAFF'
)

NEW_ANCHOR = (
    'They do not share a budget.</p>\n\n'
    + DIALOGUE_SECTION
    + '<div style="position:relative;background:linear-gradient(135deg,#F8FAFF'
)

TARGET = 'why-is-youth-soccer-so-expensive-supply-demand-american-culture'

for post in posts:
    if 'supply-demand' not in post['slug']:
        continue
    if ANCHOR in post['content']:
        post['content'] = post['content'].replace(ANCHOR, NEW_ANCHOR, 1)
        print('Dialogue section inserted.')
    else:
        print('WARNING: anchor not found')
    print('New length:', len(post['content']))
    break

with open('src/data/posts.json', 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)
print('Saved.')
