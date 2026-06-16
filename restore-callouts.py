import sys, json
sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/posts.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

# ── Restore green "I agree" callout ──
OLD_AGREE = (
    '<p><strong>I agree with this.</strong> And it goes further than just fairness &mdash; '
    'an open pyramid at the youth level would create genuine innovation.</p>\n\n'
    '<p>Clubs would have real incentive to develop players well because the results would be '
    'visible and the stakes would be real. A coach who consistently produces players who '
    'move up the pyramid becomes known for it.</p>\n\n'
    '<p>Right now, the system is opaque enough that none of that feedback loops cleanly. '
    'Transparency and openness would change that.</p>'
)

NEW_AGREE = (
    '<div style="background:#F0FDF4;border:1px solid #86EFAC;border-radius:12px;'
    'padding:16px 20px;margin:20px 0;display:flex;gap:12px;align-items:flex-start;">'
    '<span style="font-size:1.3em;flex-shrink:0;margin-top:1px;">✅</span>'
    '<div>'
    '<p style="font-size:0.9em;color:#14532d;margin:0 0 10px;line-height:1.7;">'
    '<strong>I agree with this.</strong> And it goes further than just fairness &mdash; '
    'an open pyramid at the youth level would create genuine innovation.</p>'
    '<p style="font-size:0.9em;color:#14532d;margin:0 0 10px;line-height:1.7;">'
    'Clubs would have real incentive to develop players well because the results would be '
    'visible and the stakes would be real. A coach who consistently produces players who '
    'move up the pyramid becomes known for it.</p>'
    '<p style="font-size:0.9em;color:#14532d;margin:0;line-height:1.7;">'
    'Right now, the system is opaque enough that none of that feedback loops cleanly. '
    'Transparency and openness would change that.</p>'
    '</div></div>'
)

# ── Restore orange demand-side callout ──
OLD_DEMAND = (
    '<p>But even an open, transparent youth pyramid does not resolve the demand-side problem.</p>\n\n'
    '<p>Parents will still want paid coaches with playing experience. Families will still want '
    'multiple training sessions a week. The cultural expectation that elite-level programming '
    'should be available to average players does not disappear because the league structure is cleaner.</p>\n\n'
    '<p><strong>You can build the best pyramid in the world and the bill at the bottom of it '
    'is still going to reflect what it costs to deliver what American families are asking for.</strong></p>'
)

NEW_DEMAND = (
    '<div style="background:#FFF7ED;border:1px solid #FED7AA;border-radius:12px;'
    'padding:16px 20px;margin:20px 0;display:flex;gap:12px;align-items:flex-start;">'
    '<span style="font-size:1.3em;flex-shrink:0;margin-top:1px;">⚠️</span>'
    '<div>'
    '<p style="font-size:0.9em;color:#92400e;margin:0 0 10px;line-height:1.7;">'
    'But even an open, transparent youth pyramid does not resolve the demand-side problem.</p>'
    '<p style="font-size:0.9em;color:#92400e;margin:0 0 10px;line-height:1.7;">'
    'Parents will still want paid coaches with playing experience. Families will still want '
    'multiple training sessions a week. The cultural expectation that elite-level programming '
    'should be available to average players does not disappear because the league structure is cleaner.</p>'
    '<p style="font-size:0.9em;color:#92400e;margin:0;line-height:1.7;">'
    '<strong>You can build the best pyramid in the world and the bill at the bottom of it '
    'is still going to reflect what it costs to deliver what American families are asking for.</strong></p>'
    '</div></div>'
)

for post in posts:
    if 'supply-demand' not in post['slug']:
        continue
    c = post['content']
    if OLD_AGREE in c:
        c = c.replace(OLD_AGREE, NEW_AGREE, 1)
        print('✓ Green agree callout restored')
    else:
        print('WARNING: agree not found')
    if OLD_DEMAND in c:
        c = c.replace(OLD_DEMAND, NEW_DEMAND, 1)
        print('✓ Orange demand callout restored')
    else:
        print('WARNING: demand not found')
    post['content'] = c
    print('Length:', len(c))
    break

with open('src/data/posts.json', 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)
print('Saved.')
