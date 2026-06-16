import sys, json
sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/posts.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

OLD = (
    'But even an open, transparent youth pyramid does not resolve the demand-side problem. '
    'Parents will still want paid coaches with playing experience. Families will still want '
    'multiple training sessions a week. The cultural expectation that elite-level programming '
    'should be available to average players does not disappear because the league structure is '
    'cleaner. <strong>You can build the best pyramid in the world and the bill at the bottom '
    'of it is still going to reflect what it costs to deliver what American families are '
    'asking for.</strong>'
)

NEW = (
    'But even an open, transparent youth pyramid does not resolve the demand-side problem.</p>'

    '\n\n<p style="font-size:0.9em;color:#92400e;margin:0 0 10px;line-height:1.7;">'
    'Parents will still want paid coaches with playing experience. Families will still want '
    'multiple training sessions a week. The cultural expectation that elite-level programming '
    'should be available to average players does not disappear because the league structure '
    'is cleaner.</p>'

    '\n\n<p style="font-size:0.9em;color:#92400e;margin:0;line-height:1.7;">'
    '<strong>You can build the best pyramid in the world and the bill at the bottom of it '
    'is still going to reflect what it costs to deliver what American families are '
    'asking for.</strong>'
)

for post in posts:
    if 'supply-demand' not in post['slug']:
        continue
    if OLD in post['content']:
        post['content'] = post['content'].replace(OLD, NEW, 1)
        print('Done. Length:', len(post['content']))
    else:
        print('WARNING: not found')
    break

with open('src/data/posts.json', 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)
print('Saved.')
