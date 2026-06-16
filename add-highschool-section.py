import json, sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/posts.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

TARGET = 'why-is-youth-soccer-so-expensive-supply-demand-american-culture'

def quote(text, attribution=None):
    attr = (f'<p style="font-size:0.82em;font-weight:700;color:#DC373E;margin:14px 0 0;'
            f'letter-spacing:0.05em;text-transform:uppercase;">&mdash; {attribution}</p>') if attribution else ''
    return (
        '<div style="position:relative;background:linear-gradient(135deg,#F8FAFF 0%,#EEF4FF 100%);'
        'border-radius:16px;padding:32px 36px 28px;margin:32px 0;overflow:hidden;'
        'border:1px solid #C7D7FA;box-shadow:0 2px 12px rgba(15,49,84,0.07);">'
        '<div style="position:absolute;top:-10px;left:20px;font-size:7em;color:rgba(15,49,84,0.06);'
        'font-family:Georgia,serif;line-height:1;pointer-events:none;">&ldquo;</div>'
        f'<p style="font-size:1.08em;font-style:italic;color:#0F3154;line-height:1.75;margin:0;'
        f'position:relative;z-index:1;">{text}</p>{attr}</div>'
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
        f'<th style="padding:12px 16px;text-align:left;font-size:0.8em;font-weight:800;'
        f'color:#fff;letter-spacing:0.07em;text-transform:uppercase;background:{col_colors[i] if col_colors else "#0F3154"};">'
        f'{h}</th>' for i, h in enumerate(headers)
    )
    body = ''
    for ri, row in enumerate(rows):
        bg = '#ffffff' if ri % 2 == 0 else '#F8FAFC'
        tds = ''.join(
            f'<td style="padding:13px 16px;font-size:0.9em;color:#374151;line-height:1.55;'
            f'border-bottom:1px solid #E1E8EF;">{cell}</td>' for cell in row
        )
        body += f'<tr style="background:{bg};">{tds}</tr>'
    return (
        '<div style="overflow-x:auto;margin:28px 0;border-radius:14px;'
        'box-shadow:0 2px 16px rgba(15,49,84,0.08);border:1px solid #E1E8EF;overflow:hidden;">'
        f'<table style="width:100%;border-collapse:collapse;">'
        f'<thead><tr>{th_cells}</tr></thead><tbody>{body}</tbody></table></div>'
    )

NEW_SECTION = (
    # section header — numbered badge "4" (will sit between existing 3 and old 4)
    '<div style="display:flex;align-items:center;gap:16px;margin:52px 0 20px;">'
    '<div style="background:linear-gradient(135deg,#DC373E,#b91c1c);color:#fff;font-size:1em;'
    'font-weight:800;width:44px;height:44px;border-radius:12px;display:flex;align-items:center;'
    'justify-content:center;flex-shrink:0;box-shadow:0 4px 12px rgba(220,55,62,0.35);">4</div>'
    '<h2 style="font-size:1.6em;font-weight:800;color:#0F3154;margin:0;line-height:1.25;">'
    'The High School Void — And Why This Isn\'t Just a Soccer Problem</h2></div>\n\n'

    '<p>There\'s another piece of this story that rarely gets mentioned: <strong>high school sports used to '
    'fill a significant part of this void.</strong> Not perfectly, and not at the intensity level club '
    'offers — but for generations of American kids, the high school program was where serious development '
    'happened. It was accessible, it was community-based, and the cost was built into the school system.</p>\n\n'

    '<p>That\'s changed. And it\'s changed in a very specific direction: families with resources and ambition '
    'are increasingly opting out of the high school program entirely in favor of club. The club schedule '
    'conflicts with the school season. The club coach carries more weight in the recruiting conversation. '
    'The high school program is seen as a step down, not a complement.</p>\n\n'

    + quote(
        '"The most motivated families — the ones who would have made the high school program excellent — '
        'have left it. And the program that remains is less competitive, less resourced, and less able to '
        'develop the next generation of players who can\'t afford the club alternative."'
    )

    + '<p>But here\'s the thing: <strong>it\'s not just soccer.</strong> This is happening across virtually '
    'every American youth sport, and understanding that is important — because it means the problem isn\'t '
    'specific to how soccer is administered. It\'s a cultural and economic shift that has touched everything.</p>\n\n'

    + table(
        ["Sport", "What Replaced High School / Rec", "Avg Annual Cost", "What Was Lost"],
        [
            ["Soccer", "Club teams, MLS academies, DA/ECNL", "$3,000 – $10,000+",
             "Community leagues, parent coaches, accessible development"],
            ["Basketball", "AAU circuits, prep schools, skill academies", "$2,000 – $8,000",
             "High school ball as the primary development pathway"],
            ["Baseball", "Travel ball, showcase tournaments, private coaches", "$3,000 – $12,000",
             "Little League, Babe Ruth — the volunteer-run community tier"],
            ["Track &amp; Field", "Club teams, private coaches, elite camps", "$1,500 – $5,000",
             "The school program as the only development track needed"],
            ["Lacrosse", "Club programs, showcase circuits", "$2,500 – $7,000",
             "The sport itself — historically school-based at every level"],
        ],
        ["#0F3154", "#475569", "#DC373E", "#64748b"]
    )

    + '<p>The pattern is identical across all of them. A segment of motivated, resourced families decides '
    'the existing system isn\'t enough. They build or buy into an alternative. The alternative becomes the '
    'perceived standard. The original system — rec league, school program, community club — is hollowed out. '
    'And the cost of participation for everyone rises.</p>\n\n'

    '<p>Track and field is a particularly striking example. For decades, if your child could run, the school '
    'program was the only development pathway you needed. That infrastructure still exists — but increasingly, '
    'families who want college exposure or elite development are supplementing (or replacing) the school '
    'program with private club teams, speed coaches, and showcase meets that can rival soccer in their annual '
    'cost. A sport that was essentially free is no longer free, if you want to compete at the level that '
    'gets noticed.</p>\n\n'

    '<p>AAU basketball is perhaps the most well-documented case. The AAU circuit has largely displaced '
    'high school basketball as the primary recruiting ground for college coaches. Which means if you want '
    'your child seen, you need to be on the circuit — which means you need to pay to be on the circuit. '
    'High school basketball still exists. But it\'s no longer the main stage.</p>\n\n'

    + quote(
        '"This isn\'t a soccer problem. It\'s an American youth sports problem. The economics are the same '
        'across every sport — and so is the cultural pressure that created them."',
        'Neil Crawford'
    )

    + '<p>Understanding this matters because it shifts the conversation. If soccer clubs were uniquely '
    'predatory, you\'d expect to see lower costs in sports with different governance. You don\'t. '
    'AAU basketball has the same cost structure. Travel baseball has the same cost structure. '
    'The governing bodies are completely different — but the price points are remarkably similar. '
    'Because the demand is the same.</p>\n\n'

    + divider()
)

# Insert before the Supply Side section (now renumbered as 5)
# The anchor is the section_header div for "The Supply Side"
ANCHOR = (
    '<div style="display:flex;align-items:center;gap:16px;margin:52px 0 20px;">'
    '<div style="background:linear-gradient(135deg,#DC373E,#b91c1c);color:#fff;font-size:1em;'
    'font-weight:800;width:44px;height:44px;border-radius:12px;display:flex;align-items:center;'
    'justify-content:center;flex-shrink:0;box-shadow:0 4px 12px rgba(220,55,62,0.35);">4</div>'
    '<h2 style="font-size:1.6em;font-weight:800;color:#0F3154;margin:0;line-height:1.25;">'
    'The Supply Side: US Soccer and the Consolidation Problem</h2></div>'
)

NEW_ANCHOR_SUPPLY = (
    '<div style="display:flex;align-items:center;gap:16px;margin:52px 0 20px;">'
    '<div style="background:linear-gradient(135deg,#DC373E,#b91c1c);color:#fff;font-size:1em;'
    'font-weight:800;width:44px;height:44px;border-radius:12px;display:flex;align-items:center;'
    'justify-content:center;flex-shrink:0;box-shadow:0 4px 12px rgba(220,55,62,0.35);">5</div>'
    '<h2 style="font-size:1.6em;font-weight:800;color:#0F3154;margin:0;line-height:1.25;">'
    'The Supply Side: US Soccer and the Consolidation Problem</h2></div>'
)

NEW_ANCHOR_INTL = (
    '<div style="display:flex;align-items:center;gap:16px;margin:52px 0 20px;">'
    '<div style="background:linear-gradient(135deg,#DC373E,#b91c1c);color:#fff;font-size:1em;'
    'font-weight:800;width:44px;height:44px;border-radius:12px;display:flex;align-items:center;'
    'justify-content:center;flex-shrink:0;box-shadow:0 4px 12px rgba(220,55,62,0.35);">6</div>'
    '<h2 style="font-size:1.6em;font-weight:800;color:#0F3154;margin:0;line-height:1.25;">'
    'The International Comparison Fallacy</h2></div>'
)

OLD_ANCHOR_INTL = (
    '<div style="display:flex;align-items:center;gap:16px;margin:52px 0 20px;">'
    '<div style="background:linear-gradient(135deg,#DC373E,#b91c1c);color:#fff;font-size:1em;'
    'font-weight:800;width:44px;height:44px;border-radius:12px;display:flex;align-items:center;'
    'justify-content:center;flex-shrink:0;box-shadow:0 4px 12px rgba(220,55,62,0.35);">5</div>'
    '<h2 style="font-size:1.6em;font-weight:800;color:#0F3154;margin:0;line-height:1.25;">'
    'The International Comparison Fallacy</h2></div>'
)

NEW_ANCHOR_SCHOOL = (
    '<div style="display:flex;align-items:center;gap:16px;margin:52px 0 20px;">'
    '<div style="background:linear-gradient(135deg,#DC373E,#b91c1c);color:#fff;font-size:1em;'
    'font-weight:800;width:44px;height:44px;border-radius:12px;display:flex;align-items:center;'
    'justify-content:center;flex-shrink:0;box-shadow:0 4px 12px rgba(220,55,62,0.35);">7</div>'
    '<h2 style="font-size:1.6em;font-weight:800;color:#0F3154;margin:0;line-height:1.25;">'
    'The School Analogy That Actually Explains It</h2></div>'
)

OLD_ANCHOR_SCHOOL = (
    '<div style="display:flex;align-items:center;gap:16px;margin:52px 0 20px;">'
    '<div style="background:linear-gradient(135deg,#DC373E,#b91c1c);color:#fff;font-size:1em;'
    'font-weight:800;width:44px;height:44px;border-radius:12px;display:flex;align-items:center;'
    'justify-content:center;flex-shrink:0;box-shadow:0 4px 12px rgba(220,55,62,0.35);">6</div>'
    '<h2 style="font-size:1.6em;font-weight:800;color:#0F3154;margin:0;line-height:1.25;">'
    'The School Analogy That Actually Explains It</h2></div>'
)

for post in posts:
    if post['slug'] != TARGET:
        continue
    c = post['content']

    # Insert new section before old #4 (Supply Side), which becomes #5
    if ANCHOR in c:
        c = c.replace(ANCHOR, NEW_SECTION + NEW_ANCHOR_SUPPLY, 1)
        print('New section inserted, Supply Side renumbered to 5.')
    else:
        print('WARNING: Supply Side anchor not found')

    # Renumber International Comparison 5->6
    if OLD_ANCHOR_INTL in c:
        c = c.replace(OLD_ANCHOR_INTL, NEW_ANCHOR_INTL, 1)
        print('International Comparison renumbered to 6.')
    else:
        print('WARNING: International anchor not found')

    # Renumber School Analogy 6->7
    if OLD_ANCHOR_SCHOOL in c:
        c = c.replace(OLD_ANCHOR_SCHOOL, NEW_ANCHOR_SCHOOL, 1)
        print('School Analogy renumbered to 7.')
    else:
        print('WARNING: School Analogy anchor not found')

    post['content'] = c
    print('New content length:', len(c))
    break

with open('src/data/posts.json', 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)
print('posts.json saved.')
