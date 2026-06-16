import sys, json
sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/posts.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

# Remove the thought-experiment paragraph + entire tier table,
# replace with a clear framing question about adult vs youth pro/rel

OLD_INTRO = (
    '<p>Pro/rel comes up in almost every conversation about fixing American soccer. '
    'And it is worth taking seriously &mdash; but it needs to be understood for what it '
    'actually does and does not do.</p>\n\n'
    '<p>Here is a useful thought experiment: <strong>if the US adopted a full pro/rel pyramid '
    'tomorrow, which kids in our current leagues would be next in line to play for a Tier 2 '
    'professional academy? Then Tier 3? Tier 4 and 5?</strong></p>\n\n'
)

# The table runs from the opening <div style="overflow-x:auto... to </table></div>
# We'll replace OLD_INTRO + TABLE with NEW_INTRO
# Find the table end marker that follows it
TABLE_END_MARKER = '</table></div><p>This is where pro/rel genuinely helps.'
NEW_AFTER_TABLE = '<p>This is where pro/rel genuinely helps.'

NEW_INTRO = (
    '<p>Pro/rel comes up in almost every conversation about fixing American soccer. '
    'And it is worth taking seriously &mdash; but before we can have that conversation, '
    'we need to be clear about what we are actually talking about. '
    '<strong>Are we discussing pro/rel at the adult league level, or pro/rel at the youth level? '
    'Because those are two very different things &mdash; and they have two very different '
    'effects on cost.</strong></p>\n\n'

    '<p>Most people who raise pro/rel in this debate are talking about the adult pyramid &mdash; '
    'MLS, USL, and below. The argument is that a connected, promotion-and-relegation system '
    'would attract foreign investment, create real competitive stakes, and develop a broader '
    'pipeline for talented players who are currently being missed. All of that is largely true. '
    'But it does not directly change what a family pays for their 12-year-old to train three '
    'days a week.</p>\n\n'
)

for post in posts:
    if 'supply-demand' not in post['slug']:
        continue
    c = post['content']

    # Find and remove OLD_INTRO + table block
    old_start = c.find(OLD_INTRO)
    if old_start < 0:
        print('WARNING: intro not found')
        break

    # Find end of table (the marker after the closing </table></div>)
    table_end_pos = c.find(TABLE_END_MARKER, old_start)
    if table_end_pos < 0:
        print('WARNING: table end marker not found')
        break

    old_block = c[old_start : table_end_pos + len(TABLE_END_MARKER)]
    new_block = NEW_INTRO + NEW_AFTER_TABLE

    c = c.replace(old_block, new_block, 1)
    print('✓ Pro/Rel intro rewritten. Length:', len(c))
    post['content'] = c
    break

with open('src/data/posts.json', 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)
print('Saved.')
