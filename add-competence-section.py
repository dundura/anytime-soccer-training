import json, re

with open('src/data/posts.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

NEW_SECTION = """<div style="display:flex;align-items:center;gap:12px;margin:44px 0;"><div style="flex:1;height:1px;background:linear-gradient(to right,transparent,#CBD5E1);"></div><div style="width:6px;height:6px;border-radius:50%;background:#DC373E;"></div><div style="width:10px;height:10px;border-radius:50%;background:#0F3154;"></div><div style="width:6px;height:6px;border-radius:50%;background:#DC373E;"></div><div style="flex:1;height:1px;background:linear-gradient(to left,transparent,#CBD5E1);"></div></div><div style="display:flex;align-items:center;gap:16px;margin:52px 0 20px;"><div style="background:linear-gradient(135deg,#DC373E,#b91c1c);color:#fff;font-size:1em;font-weight:800;width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 4px 12px rgba(220,55,62,0.35);">7</div><h2 style="font-size:1.6em;font-weight:800;color:#0F3154;margin:0;line-height:1.25;">Competence Builds Confidence. Confidence Makes It Fun.</h2></div>

<p>Here's something nobody tells you at the start: the fun you're trying to manufacture in the backyard today is not the only kind of fun that matters. There's a different kind — deeper, harder to explain, and impossible to shortcut. It's the fun that comes from being genuinely <em>good</em> at something. From being selected. From belonging to something you earned your way into.</p>

<p>The three things are inseparable: <strong>competence, confidence, and fun</strong>. When a player gets measurably better at something, they feel capable. When they feel capable, the game becomes more enjoyable — not just fun in the "I-want-to-go-home" sense, but fun in the way that makes them want to push further. And when they enjoy it at that level, the training takes care of itself. The backyard sessions weren't just building skill. They were building access to a better kind of fun.</p>

<div style="position:relative;background:linear-gradient(135deg,#F8FAFF 0%,#EEF4FF 100%);border-radius:16px;padding:32px 36px 28px;margin:32px 0;overflow:hidden;border:1px solid #C7D7FA;box-shadow:0 2px 12px rgba(15,49,84,0.07);"><div style="position:absolute;top:-10px;left:20px;font-size:7em;color:rgba(15,49,84,0.06);font-family:Georgia,serif;line-height:1;pointer-events:none;">&ldquo;</div><p style="font-size:1.08em;font-style:italic;color:#0F3154;line-height:1.75;margin:0;position:relative;z-index:1;">"The backyard sessions feel small in the moment. But they're not building a skill — they're building an identity. A player who believes they can get better, actually does."</p><p style="font-size:0.82em;font-weight:700;color:#DC373E;margin:14px 0 0;letter-spacing:0.05em;text-transform:uppercase;">&mdash; Neil Crawford</p></div>

<p>As I write this, Adam is an Academy player in Charlotte — one of the most competitive youth programs in the region. Matthew is in the CLT Discovery program. Both of them got there the same way: Tuesday and Thursday evenings in the backyard, sessions that felt ordinary at the time, progress that was invisible week to week but undeniable year to year.</p>

<p>That's fun. Watching your son be selected. Watching him compete at a level that asks everything of him and seeing him belong there. That's an accomplishment you cannot give a kid. You cannot buy it, you cannot arrange it, and you cannot skip the work it took to earn it. The only path to that kind of fun runs directly through the sessions that feel the least fun — the ones where they'd rather be inside, where the ball isn't cooperating, where the progress is invisible.</p>

<p>Those sessions are the investment. The Academy uniform, the Discovery roster spot — those are the return.</p>

<div style="background:linear-gradient(135deg,#FFF7ED,#FEF3C7);border:1px solid #FCD34D;border-radius:18px;padding:28px 32px;margin:36px 0;display:flex;gap:20px;align-items:center;box-shadow:0 2px 16px rgba(251,191,36,0.15);"><div style="font-size:2.4em;flex-shrink:0;">&#127942;</div><div><p style="font-size:0.78em;font-weight:800;color:#92400e;text-transform:uppercase;letter-spacing:0.09em;margin:0 0 6px;">The Payoff</p><p style="font-size:1.0em;font-weight:700;color:#78350f;margin:0 0 8px;line-height:1.4;">The fun on the other side is different from the fun you're trying to create today.</p><p style="font-size:0.9em;color:#92400e;margin:0;line-height:1.65;">The fun of being <em>selected</em> — of competing at a level you earned — is only available to kids who did the boring work early. That's the longer game you're playing in the backyard.</p></div></div>

<div style="background:linear-gradient(135deg,#ecfdf5,#d1fae5);border:1px solid #6ee7b7;border-radius:14px;padding:18px 22px;margin:28px 0;display:flex;gap:14px;align-items:flex-start;box-shadow:0 2px 12px rgba(16,185,129,0.1);"><div style="background:#10b981;border-radius:8px;padding:6px 8px;flex-shrink:0;margin-top:2px;"><span style="font-size:1em;">&#128161;</span></div><div><p style="font-size:0.76em;font-weight:800;color:#065f46;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 5px;">Something to Remember</p><p style="font-size:0.93em;color:#064e3b;margin:0;line-height:1.65;">The discipline and consistency you're building today are not in competition with fun. They're the prerequisite for a deeper, lasting kind of it. Protect the process — and trust that the payoff is coming.</p></div></div>"""

ANCHOR = '<h2 style="font-size:1.6em;font-weight:800;color:#0F3154;margin:40px 0 16px;">The Bigger Picture</h2>'

TARGET_SLUG = 'how-to-motivate-your-child-to-practice-soccer-at-home'

updated = 0
for post in posts:
    if post.get('slug') == TARGET_SLUG:
        content = post['content']
        if ANCHOR in content:
            post['content'] = content.replace(ANCHOR, NEW_SECTION + '\n\n' + ANCHOR, 1)
            updated += 1
            print(f"Updated post: {post['title']}")
        else:
            print("ANCHOR NOT FOUND — check the anchor string")

if updated == 0:
    print("No posts updated.")

with open('src/data/posts.json', 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)

print("Done.")
