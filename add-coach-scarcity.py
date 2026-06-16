import sys, json
sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/posts.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

COACH_SCARCITY = (
    '<p>There is another supply-side angle that does not get talked about enough: '
    '<strong>the scarcity of the coaches themselves.</strong></p>\n\n'

    '<p>American parents &mdash; and this is a real cultural expectation, not a criticism '
    '&mdash; want a paid coach who has actual playing experience. Not just someone who watched '
    'a lot of YouTube. We are talking college level or above, ideally. Think about what that '
    'means mathematically. At any given time, only roughly 7 to 10 percent of the kids who '
    'play youth soccer go on to play at the college level or higher. That is your entire '
    'pool of coaches who meet the standard that most parents consider acceptable.</p>\n\n'

    '<p>Now take that pool and ask: how many of them actually want to coach? Some go into '
    'other careers entirely. Some are not interested in working with kids. Some move away. '
    'The pool shrinks considerably. And then factor in geography &mdash; those coaches are '
    'dispersed across the entire country, across thousands of clubs, across hundreds of '
    'markets at every level of competition. You are not pulling from a deep, centralized '
    'labor supply. You are recruiting from a genuinely thin, geographically scattered pool '
    'of qualified people who know the game at the level families expect.</p>\n\n'

    '<p>Basic economics: scarce supply plus strong demand equals higher prices. '
    'A coach who played Division I soccer and wants to coach U12s on Tuesday and '
    'Thursday afternoons has options. They know what they are worth. And clubs that '
    'want to keep them have to pay accordingly. This is not a negotiating failure. '
    'It is just the market working exactly as you would expect it to.</p>\n\n'
)

# Insert before the closing Supply Side paragraph
ANCHOR = (
    '<p>The supply side problems are real, but they\'re not the whole story &mdash; '
    'and fixing them alone won\'t solve the cost problem if the demand hasn\'t changed.</p>'
)

NEW_ANCHOR = COACH_SCARCITY + ANCHOR

for post in posts:
    if 'supply-demand' not in post['slug']:
        continue
    c = post['content']
    if ANCHOR in c:
        c = c.replace(ANCHOR, NEW_ANCHOR, 1)
        print('✓ Coach scarcity section inserted')
    else:
        print('WARNING: anchor not found')
        # Try to find approximate location
        idx = c.find("supply side problems are real")
        if idx >= 0:
            print('  Found approximate at:', idx)
            print('  Text:', repr(c[idx:idx+150]))
    post['content'] = c
    print('New length:', len(c))
    break

with open('src/data/posts.json', 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)
print('Saved.')
