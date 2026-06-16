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

def subhead(text):
    return (
        f'<p style="font-size:0.78em;font-weight:800;color:#0F3154;text-transform:uppercase;'
        f'letter-spacing:0.08em;margin:28px 0 8px;">{text}</p>'
    )

def callout(text, bg='#F0F9FF', border='#7DD3FC', color='#0c4a6e', icon=None):
    icon_html = f'<span style="font-size:1.3em;flex-shrink:0;margin-top:1px;">{icon}</span>' if icon else ''
    gap = 'display:flex;gap:12px;align-items:flex-start;' if icon else ''
    return (
        f'<div style="background:{bg};border:1px solid {border};border-radius:12px;'
        f'padding:16px 20px;margin:20px 0;{gap}">'
        + icon_html +
        f'<p style="font-size:0.9em;color:{color};margin:0;line-height:1.7;">{text}</p>'
        f'</div>'
    )

def stat_row(stat, label, color='#DC373E'):
    return (
        f'<div style="display:flex;align-items:center;gap:14px;padding:12px 0;'
        f'border-bottom:1px solid #E1E8EF;">'
        f'<span style="font-size:1.4em;font-weight:800;color:{color};min-width:80px;">{stat}</span>'
        f'<p style="font-size:0.88em;color:#374151;margin:0;line-height:1.5;">{label}</p>'
        f'</div>'
    )

NEW_SECTION = (

    # ── Framing question ──
    '<p style="font-size:1em;color:#374151;line-height:1.85;">'
    'Pro/rel comes up in almost every conversation about fixing American soccer. And it is worth '
    'taking seriously &mdash; but before we can have that conversation, we need to be clear about '
    'what we are actually talking about.</p>'

    + callout(
        '<strong>Are we discussing pro/rel at the adult league level, or pro/rel at the youth level? '
        'Because those are two very different things &mdash; and they have two very different '
        'effects on cost.</strong>',
        bg='#FFF7ED', border='#FED7AA', color='#92400e', icon='⚠️'
    )

    # ── Adult pro/rel ──
    + subhead('The Adult Pyramid Argument')

    + '<p style="font-size:0.95em;color:#374151;line-height:1.85;">'
    'Most people raising pro/rel in this debate are talking about the adult pyramid &mdash; '
    'MLS, USL, and below. A connected system would attract foreign investment, create real '
    'competitive stakes, and open pathways for players being missed. That is largely true.</p>'

    + '<p style="font-size:0.95em;color:#374151;line-height:1.85;">'
    'But it does not directly change what a family pays for their 12-year-old to train three '
    'days a week &mdash; with a paid coach, on well-kept fields, for ten months a year.</p>'

    + '<p style="font-size:0.95em;color:#374151;line-height:1.85;">'
    'The counter-argument: pro/rel will spur the formation of new clubs across the country. '
    'Investors and communities organize, build clubs, develop youth academies underneath them. '
    'The pipeline builds from the top down. More clubs, more competition, lower prices.</p>'

    + '<p style="font-size:0.95em;color:#374151;line-height:1.85;">'
    'There is something to this. But new clubs still need fields. They still need paid staff. '
    'They operate in the same real-estate market, the same labor market, the same insurance '
    'environment. The pyramid structure does not change the underlying cost drivers. '
    'A Tier 4 affiliated club is still paying what a qualified coach costs in 2025.</p>'

    # ── 100 years ──
    + subhead('What People Miss: Accumulated vs. Investment Infrastructure')

    + callout(
        '<strong>European clubs have been around for literally over one hundred years.</strong> '
        'What they have is not investment-created infrastructure. It is <em>accumulated</em> '
        'infrastructure &mdash; facilities owned outright or held on long-term terms because the '
        'club has been there for generations, volunteer networks built across decades, community '
        'trust earned over a century of being part of local life. That is a completely different '
        'thing from what pro/rel investment would produce. An investor backing a new Tier 4 club '
        'in 2025 is building something from scratch, in a market where land costs money and labor '
        'costs money and nothing has been accumulated yet. You are not replicating a European club. '
        'You are starting one. <strong>A new club in year two does not operate like a club in year one hundred.</strong>',
        bg='#EFF6FF', border='#93C5FD', color='#1e3a8a', icon='🏛️'
    )

    # ── Academy costs + timeline ──
    + subhead('The Academy Math Nobody Runs')

    + '<div style="background:#FAFBFF;border:1px solid #E1E8EF;border-radius:14px;padding:20px 24px;margin:20px 0;">'
    + stat_row('$millions', 'per year to run a proper professional academy — full-time staff, facilities, year-round operation')
    + stat_row('8–12 years', 'of development before a player is even close to sellable', color='#0F3154')
    + stat_row('<5%', 'of academy players who ever reach a professional level', color='#DC373E')
    + stat_row('30–50 yrs', 'best-case timeline before pro/rel infrastructure meaningfully lowers youth costs', color='#64748b')
    + '</div>'

    + '<p style="font-size:0.95em;color:#374151;line-height:1.85;">'
    'Building an academy on player-sale returns is an extremely long-horizon, high-risk bet. '
    'The clubs that pull it off are the exception, not the template.</p>'

    + '<p style="font-size:0.95em;color:#374151;line-height:1.85;">'
    'Even in the best-case scenario &mdash; pro/rel passes, investment flows, clubs form, '
    'academies are built &mdash; you are looking at several generations before any of that '
    'meaningfully lowers what the average family pays. It is worth doing. '
    'But it is not a solution to what is happening right now.</p>'

    # ── Youth open pyramid ──
    + subhead('What People Really Mean: The Youth Open Pyramid')

    + '<p style="font-size:0.95em;color:#374151;line-height:1.85;">'
    'When people talk about pro/rel at the <em>youth</em> level, what they often mean is '
    'something different: <strong>an open, transparent pyramid &mdash; like most of the world '
    'already has &mdash; where the best players rise based on merit, regardless of which club '
    'they started at.</strong></p>'

    + '<p style="font-size:0.95em;color:#374151;line-height:1.85;">'
    'Not the current closed ecosystem where MLS NEXT, ECNL, and USYSA run in parallel with '
    'no clear hierarchy between them. A system where a talented kid at a smaller club can earn '
    'their way up, and where everyone knows exactly what tier they are competing at.</p>'

    + callout(
        '<strong>I agree with this</strong> &mdash; and it goes further than just fairness. '
        'An open pyramid at the youth level would create genuine innovation. Clubs would have real '
        'incentive to develop players well because the results would be visible and the stakes '
        'would be real. A coach who consistently produces players who move up the pyramid becomes '
        'known for it. Right now, the system is opaque enough that none of that feedback loops '
        'cleanly. Transparency and openness would change that.',
        bg='#F0FDF4', border='#86EFAC', color='#14532d', icon='✅'
    )

    + callout(
        'But even an open, transparent youth pyramid does not resolve the demand-side problem. '
        'Parents will still want paid coaches with playing experience. Families will still want '
        'multiple training sessions a week. The cultural expectation that elite-level programming '
        'should be available to average players does not disappear because the league structure is '
        'cleaner. <strong>You can build the best pyramid in the world and the bill at the bottom '
        'of it is still going to reflect what it costs to deliver what American families are '
        'asking for.</strong>',
        bg='#FFF7ED', border='#FED7AA', color='#92400e', icon='⚠️'
    )

    # ── Verdict ──
    + subhead("The Bottom Line on Pro/Rel")

    + '<div style="background:linear-gradient(135deg,#0F3154,#1a4a78);border-radius:16px;'
    'padding:24px 28px;margin:20px 0;">'
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:0;">'

    '<div style="padding-right:20px;border-right:1px solid rgba(255,255,255,0.15);">'
    '<p style="font-size:0.72em;font-weight:800;color:#86EFAC;text-transform:uppercase;'
    'letter-spacing:0.1em;margin:0 0 12px;">Pro/Rel Will</p>'
    '<ul style="margin:0;padding-left:18px;list-style:disc;">'
    '<li style="font-size:0.85em;color:rgba(255,255,255,0.9);margin-bottom:8px;line-height:1.5;">'
    'Expand pathways for elite players being overlooked</li>'
    '<li style="font-size:0.85em;color:rgba(255,255,255,0.9);margin-bottom:8px;line-height:1.5;">'
    'Attract foreign investment to the professional tier</li>'
    '<li style="font-size:0.85em;color:rgba(255,255,255,0.9);margin-bottom:8px;line-height:1.5;">'
    'Create real competitive stakes up and down the pyramid</li>'
    '<li style="font-size:0.85em;color:rgba(255,255,255,0.9);line-height:1.5;">'
    'Make American soccer more legitimate on the world stage</li>'
    '</ul>'
    '</div>'

    '<div style="padding-left:20px;">'
    '<p style="font-size:0.72em;font-weight:800;color:#FCA5A5;text-transform:uppercase;'
    'letter-spacing:0.1em;margin:0 0 12px;">Pro/Rel Won\'t</p>'
    '<ul style="margin:0;padding-left:18px;list-style:disc;">'
    '<li style="font-size:0.85em;color:rgba(255,255,255,0.9);margin-bottom:8px;line-height:1.5;">'
    'Lower the cost of mass-participation club soccer</li>'
    '<li style="font-size:0.85em;color:rgba(255,255,255,0.9);margin-bottom:8px;line-height:1.5;">'
    'Change what a paid coach, fields, and ten months of training costs</li>'
    '<li style="font-size:0.85em;color:rgba(255,255,255,0.9);margin-bottom:8px;line-height:1.5;">'
    'Replicate 100+ years of European accumulated infrastructure overnight</li>'
    '<li style="font-size:0.85em;color:rgba(255,255,255,0.9);line-height:1.5;">'
    'Resolve the demand-side problem that drives prices up</li>'
    '</ul>'
    '</div>'

    '</div>'
    '</div>'
)

# Anchor: from after "What About Promotion and Relegation?</h3>" to before the next divider+h3
SECTION_START = 'What About Promotion and Relegation?</h3>\n\n'
SECTION_END = DIVIDER + '<h3 style="font-size:1.3em;font-weight:800;color:#0F3154;margin:0 0 18px;">The Myth of the Great European Parent Coach</h3>'

for post in posts:
    if 'supply-demand' not in post['slug']:
        continue
    c = post['content']
    start_idx = c.find(SECTION_START)
    end_idx   = c.find(SECTION_END, start_idx)
    if start_idx < 0 or end_idx < 0:
        print('WARNING: anchors not found')
        print('  start:', start_idx, '  end:', end_idx)
        break

    old_body = c[start_idx + len(SECTION_START) : end_idx]
    print(f'Replacing {len(old_body)} chars of body with {len(NEW_SECTION)} chars')

    c = c[:start_idx + len(SECTION_START)] + NEW_SECTION + '\n\n' + c[end_idx:]
    post['content'] = c
    print('New length:', len(c))
    break

with open('src/data/posts.json', 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)
print('Saved.')
