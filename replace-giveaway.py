import json, re

with open('src/data/posts.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

OLD = '<div style="background:linear-gradient(135deg,#7c3aed,#4f46e5);border-radius:20px;padding:36px 40px;margin:48px 0;text-align:center;position:relative;overflow:hidden;box-shadow:0 8px 32px rgba(79,70,229,0.3);"><div style="position:absolute;top:-30px;right:-30px;width:140px;height:140px;border-radius:50%;background:rgba(255,255,255,0.05);"></div><div style="position:absolute;bottom:-20px;left:-20px;width:100px;height:100px;border-radius:50%;background:rgba(255,255,255,0.05);"></div><p style="font-size:1.8em;margin:0 0 8px;">&#127873;</p><p style="font-size:0.75em;font-weight:800;color:rgba(255,255,255,0.6);text-transform:uppercase;letter-spacing:0.12em;margin:0 0 8px;">Free Giveaway</p><h3 style="font-size:1.4em;font-weight:800;color:#ffffff;margin:0 0 12px;line-height:1.3;">Win 3 Months of Anytime Soccer Training — Free</h3><p style="color:rgba(255,255,255,0.75);margin:0 0 24px;font-size:0.93em;max-width:420px;margin-left:auto;margin-right:auto;">Take our 2-minute soccer training survey and you\'ll be entered to win a free 3-month membership. We use your answers to build better training plans for families like yours.</p><a href="https://www.anytime-soccer.com/soccer-training-survey" style="display:inline-block;background:#ffffff;color:#4f46e5;font-weight:800;font-size:0.95em;padding:14px 32px;border-radius:12px;text-decoration:none;box-shadow:0 4px 12px rgba(0,0,0,0.15);">Take the Survey &amp; Enter to Win &#8594;</a></div>'

NEW = '''<div style="background:linear-gradient(135deg,#0F3154,#1a4a78);border-radius:20px;overflow:hidden;margin:48px 0;box-shadow:0 8px 32px rgba(15,49,84,0.25);">
  <img src="https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1779541227299-xijein.png" alt="How does your child's training compare to elite academy players?" style="width:100%;height:220px;object-fit:cover;object-position:center;display:block;" />
  <div style="padding:36px 40px 40px;">
    <p style="font-size:0.72em;font-weight:800;color:#DC373E;text-transform:uppercase;letter-spacing:0.12em;margin:0 0 10px;">Free Benchmark Report</p>
    <h3 style="font-size:1.4em;font-weight:800;color:#ffffff;margin:0 0 14px;line-height:1.3;">How does your child&#39;s training compare to the world&#39;s elite?</h3>
    <p style="color:rgba(255,255,255,0.8);margin:0 0 12px;font-size:0.93em;line-height:1.7;">We studied how much players at top academies around the world train — MLS Next, ECNL, Manchester City Academy, and more — broken down by age group and training type.</p>
    <p style="color:rgba(255,255,255,0.8);margin:0 0 20px;font-size:0.93em;line-height:1.7;">We combined that research with responses from our own members to build a real benchmark every soccer parent can use. Fill in your child&#39;s training hours in the survey below. We’ll send you a free PDF showing exactly how they compare — broken down by every training category.</p>
    <p style="color:rgba(255,255,255,0.55);margin:0 0 24px;font-size:0.83em;font-style:italic;">The more parents who respond, the more accurate the comparison becomes — so share it with your team.</p>
    <a href="https://www.anytime-soccer.com/soccer-training-survey" style="display:inline-block;background:#DC373E;color:#ffffff;font-weight:800;font-size:0.95em;padding:14px 32px;border-radius:12px;text-decoration:none;box-shadow:0 4px 16px rgba(220,55,62,0.45);">Take the Survey — Get Your Free PDF &#8594;</a>
  </div>
</div>'''

TARGET_SLUG = 'how-to-motivate-your-child-to-practice-soccer-at-home'

updated = 0
for post in posts:
    if post.get('slug') == TARGET_SLUG:
        content = post.get('content', '')
        if OLD in content:
            post['content'] = content.replace(OLD, NEW, 1)
            updated += 1
            print(f"Updated: {post['title']}")
        else:
            # Try to find a looser match
            if 'Win 3 Months' in content:
                print("Found 'Win 3 Months' but exact match failed — check OLD string")
            else:
                print("Giveaway block not found in this post")

print(f"Total updated: {updated}")

with open('src/data/posts.json', 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)
