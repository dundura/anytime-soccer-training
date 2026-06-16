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

for post in posts:
    if 'supply-demand' not in post['slug']:
        continue
    c = post['content']

    # ── Locate the Pro/Rel block (divider + h3 + content) ──
    prorel_h3 = '<h3 style="font-size:1.3em;font-weight:800;color:#0F3154;margin:0 0 18px;">What About Promotion and Relegation?</h3>'
    prorel_h3_pos = c.find(prorel_h3)
    prorel_start = c.rfind(DIVIDER, 0, prorel_h3_pos)

    # Ends just before the budget calculator card
    calc_card = '<div style="background:linear-gradient(135deg,#F8FAFC,#F1F5F9);border:1px solid #E1E8EF;border-radius:20px;padding:32px 36px;margin:44px 0;box-shadow:0 4px 24px rgba(15,49,84,0.07);">'
    prorel_end = c.find(calc_card, prorel_h3_pos)

    prorel_block = c[prorel_start:prorel_end]
    print(f'Pro/Rel block: chars {prorel_start}–{prorel_end}, length {len(prorel_block)}')

    # ── Remove it from its current location ──
    c_without = c[:prorel_start] + c[prorel_end:]

    # ── Find insertion point: right before the School Analogy section header div ──
    # The School Analogy h2 is wrapped in a section-header div; find the divider before it
    school_section_start = c_without.find(
        '<div style="display:flex;align-items:center;gap:16px;margin:52px 0 20px;">'
        '<div style="background:linear-gradient(135deg,#DC373E,#b91c1c);color:#fff;'
        'font-size:1em;font-weight:800;width:44px;height:44px;border-radius:12px;'
        'display:flex;align-items:center;justify-content:center;flex-shrink:0;'
        'box-shadow:0 4px 12px rgba(220,55,62,0.35);">7</div>'
        '<h2 style="font-size:1.6em;font-weight:800;color:#0F3154;margin:0;line-height:1.25;">'
        'The School Analogy'
    )
    # Walk back to find the divider before that section header
    insert_at = c_without.rfind(DIVIDER, 0, school_section_start)
    print(f'Inserting before divider at: {insert_at}')
    print('Context:', repr(c_without[insert_at:insert_at+80]))

    # ── Insert pro/rel block before that divider ──
    c_new = c_without[:insert_at] + prorel_block + c_without[insert_at:]

    post['content'] = c_new
    print('New length:', len(c_new))
    break

with open('src/data/posts.json', 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)
print('Saved.')
