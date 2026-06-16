import json

with open('src/data/posts.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

def quote(text, attribution=None):
    attr = ('<p style="font-size:0.82em;font-weight:700;color:#DC373E;margin:14px 0 0;'
            'letter-spacing:0.05em;text-transform:uppercase;">&mdash; ' + attribution + '</p>') if attribution else ''
    return (
        '<div style="position:relative;background:linear-gradient(135deg,#F8FAFF 0%,#EEF4FF 100%);'
        'border-radius:16px;padding:32px 36px 28px;margin:32px 0;overflow:hidden;'
        'border:1px solid #C7D7FA;box-shadow:0 2px 12px rgba(15,49,84,0.07);">'
        '<div style="position:absolute;top:-10px;left:20px;font-size:7em;color:rgba(15,49,84,0.06);'
        'font-family:Georgia,serif;line-height:1;pointer-events:none;">&ldquo;</div>'
        '<p style="font-size:1.08em;font-style:italic;color:#0F3154;line-height:1.75;margin:0;'
        'position:relative;z-index:1;">' + text + '</p>' + attr + '</div>'
    )

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

SCHOOL_SECTION = (
    divider()

    + '<h3 style="font-size:1.3em;font-weight:800;color:#0F3154;margin:0 0 18px;">'
    'One Model Worth Building: Club&ndash;Elementary School Partnerships</h3>\n\n'

    '<p>Of all the structural ideas I keep coming back to, this one feels the most achievable &mdash; '
    'and the most underexplored.</p>\n\n'

    '<p>The concept is straightforward: <strong>local soccer clubs partner directly with elementary schools '
    'to train kids during recess, PE, and after-school programs.</strong> The club gets access to school '
    'facilities &mdash; fields, gyms, courts &mdash; without the cost of a long-term municipal lease. '
    'The school gets professional coaching instruction embedded into the school day at little or no cost '
    'to the district. Parents who want their child in the after-school program contribute at a significantly '
    'reduced rate compared to traditional club fees. And the club gets something arguably more valuable '
    'than money: <em>early access to a large pool of kids before any other club does.</em></p>\n\n'

    + quote(
        '"The club gets early access to developing players. The kids get access to professional coaches. '
        'The school gets a quality program it could not otherwise afford. Nobody gives away anything for free '
        '&mdash; but everyone gets more than they\'re putting in."'
    )

    + '<p>This is not a charity model. It is a market model that aligns incentives better than the current '
    'one. Clubs that invest in elementary school pipelines are not just doing community service &mdash; '
    'they are building their own talent pool and their own future roster. The family that first encounters '
    'your coaches when their child is six years old is far more likely to be your club family at nine, '
    'ten, and twelve. That is a meaningful competitive advantage, and it is worth subsidizing access '
    'to create it.</p>\n\n'

    + table(
        ['Who', 'What They Give', 'What They Get'],
        [
            ['The Club', 'Professional coaches during school hours; reduced-rate after-school program',
             'School facility access; early pipeline to developing players; community goodwill'],
            ['The School', 'Facility access (fields, gym, outdoor space)',
             'Quality soccer instruction in PE and recess; structured after-school option at no district cost'],
            ['Parents', 'Reduced club fee (vs. full club cost)',
             'Professional coaching for their child; convenient school-day and after-school access'],
            ['The Community', 'Buy-in and small volunteer contribution',
             'A rec-level program that is actually well-run and professionally supported'],
        ],
        ['#0F3154', '#475569', '#16a34a']
    )

    + '<p>There is one critical piece that makes this more than just an enrichment program: '
    '<strong>the school-based teams that emerge from these partnerships need to be plugged into '
    'the full US Soccer competitive grid.</strong> Not a parallel system. Not a separate rec league '
    'that goes nowhere. The same pyramid that the best club teams compete in, with a pathway that '
    'runs from elementary school all the way up.</p>\n\n'

    '<p>That is the missing link in most of these kinds of programs. The moment you wall off '
    'school-based soccer into its own silo &mdash; with no connection to state cups, regional '
    'leagues, or national pathways &mdash; you remove the incentive for serious families to '
    'participate. The family that wants real development for their child will still leave for '
    'a traditional club, because the school program has no competitive ceiling.</p>\n\n'

    '<p>Connect it to the grid, and the calculus changes. Now a family can start at the school '
    'program, develop in a professionally coached environment, and follow a legitimate competitive '
    'pathway &mdash; all at a fraction of traditional club cost. That is the version of this that '
    'actually bends the curve.</p>\n\n'

    + table(
        ['Program Feature', 'Without US Soccer Grid Access', 'With US Soccer Grid Access'],
        [
            ['Competitive ceiling', 'Internal / local only', 'State, regional, national pathway'],
            ['Appeal to serious families', 'Low &mdash; they will leave for club', 'High &mdash; real development pathway exists'],
            ['Coach incentive to develop players', 'Limited', 'Significant &mdash; results are visible and tracked'],
            ['Club participation incentive', 'Charitable / PR only', 'Strategic &mdash; pipeline and talent access'],
            ['Long-term sustainability', 'Dependent on goodwill', 'Aligned incentives on all sides'],
        ],
        ['#0F3154', '#DC373E', '#16a34a']
    )

    + quote(
        '"The school program without a competitive pathway is a dead end. The school program with a '
        'legitimate pathway into the national grid is something entirely different &mdash; it is the '
        'foundation of an accessible development system that does not require a four-figure check to enter."',
        'Neil Crawford'
    )

    + '<p>This is not a new idea in every sense &mdash; versions of it exist in pockets around the country. '
    'What is missing is the coordination, the governance buy-in from US Soccer, and the explicit '
    'connection to the competitive pyramid. Those are solvable problems. They require will, not '
    'resources. And they represent one of the most realistic paths toward actually reducing the '
    'cost of meaningful youth soccer development in America.</p>\n\n'
)

# Insert after the Realistic Levers table, before the big quote that follows
ANCHOR = '</table></div>\n\n<div style="position:relative;background:linear-gradient(135deg,#F8FAFF'

TARGET = 'why-is-youth-soccer-so-expensive-supply-demand-american-culture'

for post in posts:
    if 'supply-demand' not in post['slug']:
        continue
    c = post['content']

    if ANCHOR in c:
        c = c.replace(ANCHOR, '</table></div>\n\n' + SCHOOL_SECTION + '<div style="position:relative;background:linear-gradient(135deg,#F8FAFF', 1)
        print('School partnership section inserted.')
    else:
        print('WARNING: anchor not found')
        idx = c.find('</table></div>')
        # find the one after levers table specifically
        so_what_idx = c.find('So What Do We Do With This')
        levers_table_end = c.find('</table></div>', so_what_idx)
        print('Levers table end:', levers_table_end)
        print(repr(c[levers_table_end:levers_table_end+100]))

    post['content'] = c
    print('New length:', len(c))
    break

with open('src/data/posts.json', 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)
print('Saved.')
