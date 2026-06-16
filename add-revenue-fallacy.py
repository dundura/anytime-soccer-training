import json

with open('src/data/posts.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

FOURTH_POINT = (
    "<p><strong>Fourth &mdash; The Revenue Fallacy:</strong> there is a version of this argument "
    "that goes: European clubs can afford to run cheap programs because they generate revenue from "
    "training compensation fees, proceeds from the first team, and player sales. And there is some "
    "truth to that. Training compensation is real. Sell-on clauses are real. A club that develops "
    "a player who eventually moves up the pyramid does receive money. That matters, and it is worth "
    "acknowledging.</p>\n\n"

    "<p>But that revenue is not what is covering paid coaching staff, facility costs, and administrative "
    "overhead at the level of a typical US club team. Not even close. The clubs generating meaningful "
    "sell-on revenue are operating at a completely different tier &mdash; they have identified and "
    "are developing elite talent, the kind of player who has a realistic pathway to professional "
    "soccer. That revenue flows back into elite development programs, not into subsidizing "
    "mass participation.</p>\n\n"

    "<p>Said plainly: <strong>European clubs are not using first-team revenue or player sale proceeds "
    "to pay for average kids with average ability to receive ECNL or MLS NEXT level programming.</strong> "
    "That is not what is happening. The average grassroots player in Europe is coached by a parent "
    "volunteer on a community pitch, not cross-subsidized by Champions League prize money. "
    "The two tiers &mdash; elite and grassroots &mdash; operate almost entirely independently "
    "of each other financially.</p>\n\n"

    "<p>When people point to the revenue streams of a Barcelona or a Bayern and suggest that is why "
    "European youth soccer is cheap, they are conflating two completely separate systems. The elite "
    "academy is a talent pipeline funded by professional club revenue. The grassroots club is a "
    "community institution funded by dues and volunteers. They share a country and sometimes a name. "
    "They do not share a budget.</p>\n\n"
)

# Insert after "You cannot separate the low cost from the community context that produces it."
# which is the closing line of the Third point
ANCHOR = (
    "You cannot separate the low cost from the community context that produces it.</p>\n\n"
    '<div style="position:relative;background:linear-gradient(135deg,#F8FAFF'
)

NEW_ANCHOR = (
    "You cannot separate the low cost from the community context that produces it.</p>\n\n"
    + FOURTH_POINT
    + '<div style="position:relative;background:linear-gradient(135deg,#F8FAFF'
)

for post in posts:
    if 'supply-demand' not in post['slug']:
        continue
    if ANCHOR in post['content']:
        post['content'] = post['content'].replace(ANCHOR, NEW_ANCHOR, 1)
        print('Revenue fallacy section inserted.')
    else:
        print('WARNING: anchor not found')
    print('New length:', len(post['content']))
    break

with open('src/data/posts.json', 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)
print('Saved.')
