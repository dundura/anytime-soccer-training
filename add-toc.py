import sys, json, re
sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/posts.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

# ── Section anchor map: (anchor_id, display_title, find_string_in_content) ──
SECTIONS = [
    ('framework',        'Supply & Demand Framework',          'Start With the Framework: Supply and Demand</h2>'),
    ('demand-side',      'The Demand Side',                    'The Demand Side: An American Cultural Story</h2>'),
    ('volunteer-model',  'The Volunteer Model',                'What We Lost: The Volunteer Model</h2>'),
    ('high-school-void', 'The High School Void',               'The High School Void'),
    ('supply-side',      'The Supply Side',                    'The Supply Side: US Soccer and the Consolidation Problem</h2>'),
    ('intl-comparison',  'The International Comparison Fallacy','The International Comparison Fallacy</h2>'),
    ('pro-rel',          'What About Pro/Rel?',                'What About Promotion and Relegation?</h3>'),
    ('school-analogy',   'The School Analogy',                 'The School Analogy That Actually Explains It</h2>'),
    ('solutions',        'So What Do We Do?',                  'So What Do We Do With This?</h2>'),
    ('bottom-line',      'The Bottom Line',                    'The Bottom Line</h2>'),
]

# ── TOC HTML ──
toc_items = ''
for anchor, title, _ in SECTIONS:
    toc_items += (
        f'<li style="margin:0;">'
        f'<a href="#{anchor}" style="display:flex;align-items:center;gap:8px;'
        f'padding:7px 0;color:#0F3154;text-decoration:none;font-size:0.88em;'
        f'border-bottom:1px solid #E1E8EF;line-height:1.4;'
        f'transition:color 0.15s;" '
        f'onmouseover="this.style.color=\'#DC373E\'" '
        f'onmouseout="this.style.color=\'#0F3154\'">'
        f'<span style="color:#DC373E;font-size:0.7em;">&#9654;</span>'
        f'{title}</a></li>'
    )

TOC = (
    '<div style="background:#F8FAFC;border:1px solid #E1E8EF;border-radius:16px;'
    'padding:24px 28px;margin:36px 0;">'
    '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">'
    '<span style="font-size:1em;">&#128196;</span>'
    '<p style="font-size:0.75em;font-weight:800;color:#0F3154;text-transform:uppercase;'
    'letter-spacing:0.1em;margin:0;">In This Article</p>'
    '</div>'
    f'<ol style="margin:0;padding:0;list-style:none;">{toc_items}</ol>'
    '</div>\n\n'
)

for post in posts:
    if 'supply-demand' not in post['slug']:
        continue
    c = post['content']

    # ── Add id anchors to each section ──
    for anchor, _, find_str in SECTIONS:
        if find_str in c:
            # Add id to the element right before the found text
            # Find the wrapping div for numbered sections, or the h2/h3 itself
            idx = c.find(find_str)

            # For h2 sections inside a section-header div, wrap the outer div
            # For h3 sections (pro-rel, myth) add id span before the h3
            if find_str.endswith('</h2>') or find_str.endswith('</h3>'):
                # Insert an anchor span just before this element
                # Walk back to find the opening <div or <h2 or <h3
                tag_start = c.rfind('<', 0, idx)
                insert_before = c.rfind('\n\n', 0, tag_start) + 2
                if insert_before < 2:
                    insert_before = tag_start
                anchor_tag = f'<span id="{anchor}" style="display:block;position:relative;top:-80px;visibility:hidden;"></span>'
                c = c[:insert_before] + anchor_tag + '\n' + c[insert_before:]
                print(f'✓ Anchor added: #{anchor}')
            else:
                # The High School Void — find the section header div
                idx2 = c.find('<div style="display:flex;align-items:center;gap:16px', max(0, idx - 200))
                anchor_tag = f'<span id="{anchor}" style="display:block;position:relative;top:-80px;visibility:hidden;"></span>'
                c = c[:idx2] + anchor_tag + '\n' + c[idx2:]
                print(f'✓ Anchor added: #{anchor} (div)')
        else:
            print(f'WARNING: section not found for #{anchor}: {find_str[:50]}')

    # ── Insert TOC after the 4 intro paragraphs, before the first section ──
    # The first section header is "Start With the Framework"
    first_section = '<span id="framework"'
    toc_insert_at = c.find(first_section)
    if toc_insert_at >= 0:
        c = c[:toc_insert_at] + TOC + c[toc_insert_at:]
        print('✓ TOC inserted')
    else:
        print('WARNING: TOC insertion point not found')

    post['content'] = c
    print('New length:', len(c))
    break

with open('src/data/posts.json', 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)
print('Saved.')
