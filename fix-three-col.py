import json, re

with open('src/data/posts.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

TARGET_SLUG = 'why-is-youth-soccer-so-expensive-supply-demand-american-culture'

for post in posts:
    if post.get('slug') == TARGET_SLUG:
        content = post['content']

        # ── Fix 1: Three-column callout ──────────────────────────────────────
        # The flex div contains icon + 3 paragraphs. Move 2nd and 3rd outside.
        OLD_CALLOUT = (
            '<div style="background:#EFF6FF;border:1px solid #93C5FD;border-radius:12px;padding:16px 20px;margin:20px 0;display:flex;gap:12px;align-items:flex-start;">'
            '<span style="font-size:1.3em;flex-shrink:0;margin-top:1px;">\U0001f3db️</span>'
            '<p style="font-size:0.9em;color:#1e3a8a;margin:0;line-height:1.7;"><strong>European clubs have been around for literally over one hundred years.</strong> What they have is not investment-created infrastructure. It is <em>accumulated</em> infrastructure &mdash; facilities owned outright, volunteer networks built across decades, community trust earned over a century of being part of local life.</p>\n\n'
            '<p style="font-size:0.95em;color:#374151;line-height:1.85;">That is a completely different thing from what pro/rel investment would produce. An investor backing a new Tier 4 club in 2025 is building something from scratch &mdash; in a market where land costs money, labor costs money, and nothing has been accumulated yet.</p>\n\n'
            '<p style="font-size:0.95em;color:#374151;line-height:1.85;">You are not replicating a European club. You are starting one. <strong>A new club in year two does not operate like a club in year one hundred.</strong></p>'
            '</div>'
        )
        NEW_CALLOUT = (
            '<div style="background:#EFF6FF;border:1px solid #93C5FD;border-radius:12px;padding:16px 20px;margin:20px 0;display:flex;gap:12px;align-items:flex-start;">'
            '<span style="font-size:1.3em;flex-shrink:0;margin-top:1px;">\U0001f3db️</span>'
            '<p style="font-size:0.9em;color:#1e3a8a;margin:0;line-height:1.7;"><strong>European clubs have been around for literally over one hundred years.</strong> What they have is not investment-created infrastructure. It is <em>accumulated</em> infrastructure &mdash; facilities owned outright, volunteer networks built across decades, community trust earned over a century of being part of local life.</p>'
            '</div>\n\n'
            '<p style="font-size:0.95em;color:#374151;line-height:1.85;">That is a completely different thing from what pro/rel investment would produce. An investor backing a new Tier 4 club in 2025 is building something from scratch &mdash; in a market where land costs money, labor costs money, and nothing has been accumulated yet.</p>\n\n'
            '<p style="font-size:0.95em;color:#374151;line-height:1.85;">You are not replicating a European club. You are starting one. <strong>A new club in year two does not operate like a club in year one hundred.</strong></p>'
        )
        if OLD_CALLOUT in content:
            content = content.replace(OLD_CALLOUT, NEW_CALLOUT, 1)
            print("Fix 1 (callout): applied")
        else:
            print("Fix 1 (callout): NOT FOUND — trying looser match")
            # Looser: find the opening of the callout div and restructure
            marker = 'European clubs have been around for literally over one hundred years.'
            idx = content.find(marker)
            if idx >= 0:
                # Find the opening div before the marker
                div_start = content.rfind('<div style="background:#EFF6FF', 0, idx)
                # Find the closing </div> of this block
                div_end = content.find('</div>', idx) + len('</div>')
                block = content[div_start:div_end]
                print("Block found (first 200):", block[:200])

        # ── Fix 2: Stat block — make it responsive (wrap in a column on mobile) ─
        # The stat items use display:flex with fixed widths — add flex-wrap and min-width
        content = content.replace(
            'display:flex;align-items:center;gap:14px;',
            'display:flex;align-items:center;gap:14px;flex-wrap:wrap;',
        )
        # Make stat number divs not overflow by adding word-break
        content = content.replace(
            'font-size:2em;font-weight:900;color:#DC373E;',
            'font-size:2em;font-weight:900;color:#DC373E;word-break:break-word;min-width:0;',
        )
        print("Fix 2 (stat flex-wrap): applied")

        # ── Fix 3: Worth Knowing — split the long paragraph into two ─────────
        OLD_WORTH = (
            'Many Tier 2 and 3 European academies only offer scholarships and paid coaches at U16 and beyond — and those spots typically go to players released from Category 1 academies. Before that age, those same kids are playing grassroots, with volunteer coaches, paying minimal fees. The fully funded academy pathway that people picture when they imagine European development does not start at age eight. It starts much later, for a very small number of players who have already been pre-selected by elite clubs.'
        )
        NEW_WORTH = (
            'Many Tier 2 and 3 European academies only offer scholarships and paid coaches at U16 and beyond — and those spots typically go to players released from Category 1 academies. Before that age, those same kids are playing grassroots, with volunteer coaches, paying minimal fees.</p>\n\n<p style="font-size:0.9em;color:#1e3a8a;margin:0;line-height:1.7;">'
            'The fully funded academy pathway that people picture when they imagine European development does not start at age eight. It starts much later, for a very small number of players who have already been pre-selected by elite clubs.'
        )
        if OLD_WORTH in content:
            content = content.replace(OLD_WORTH, NEW_WORTH, 1)
            print("Fix 3 (Worth Knowing split): applied")
        else:
            print("Fix 3 (Worth Knowing): NOT FOUND")

        post['content'] = content

with open('src/data/posts.json', 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)

print("Done.")
