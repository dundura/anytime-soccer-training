import json

with open('src/data/posts.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

TARGET = "how-to-motivate-your-child-to-practice-soccer-at-home"
AVATAR = "https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1779745975826-iqel6b.png"

OLD_BIO = '<p style="font-size:0.88em;color:#94a3b8;margin-top:32px;font-style:italic;">Neil Crawford is the founder of Anytime Soccer Training and a soccer dad to Adam and Matthew. He built the platform because he couldn\'t find one that worked for real families with real schedules — and because he made enough mistakes in his own backyard to fill a book.</p>'

NEW_BIO = f"""<div style="display:flex;align-items:flex-start;gap:20px;background:#F8FAFC;border-radius:16px;padding:24px 28px;margin-top:40px;border:1px solid #E1E8EF;">
  <img src="{AVATAR}" alt="Neil Crawford" style="width:64px;height:64px;border-radius:50%;object-fit:cover;flex-shrink:0;border:3px solid #fff;box-shadow:0 2px 8px rgba(15,49,84,0.15);" />
  <div>
    <p style="font-size:0.78em;font-weight:700;color:#DC373E;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 4px;">About the Author</p>
    <p style="font-size:0.95em;font-weight:700;color:#0F3154;margin:0 0 6px;">Neil Crawford</p>
    <p style="font-size:0.88em;color:#64748b;margin:0;line-height:1.65;">Founder of Anytime Soccer Training and soccer dad to Adam and Matthew. He built the platform because he couldn't find one that worked for real families with real schedules — and because he made enough mistakes in his own backyard to fill a book.</p>
  </div>
</div>"""

for post in posts:
    if post['slug'] == TARGET:
        if OLD_BIO in post['content']:
            post['content'] = post['content'].replace(OLD_BIO, NEW_BIO)
            print("✅ Author bio updated with profile picture.")
        else:
            print("⚠️  Old bio string not found — check for differences.")
        break

with open('src/data/posts.json', 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)

print("Done.")
