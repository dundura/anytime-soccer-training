const fs = require('fs');
const path = require('path');

const postsPath = path.join(__dirname, '../src/data/posts.json');
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
const post = posts.find(p => p.slug === 'how-to-motivate-your-child-to-practice-soccer-at-home');

if (!post) { console.error('Post not found'); process.exit(1); }

const marker = 'Fun is the entry point. Visible progress is what keeps them coming back.</p>';

const relatedBlock = `

<div style="background:linear-gradient(135deg,#FFF7ED,#FFEDD5);border-radius:16px;padding:20px 24px;margin:28px 0;border:1px solid #FED7AA;display:flex;gap:16px;align-items:center;flex-wrap:wrap;">
  <div style="font-size:28px;flex-shrink:0;">📖</div>
  <div style="flex:1;min-width:160px;">
    <p style="font-size:0.74em;font-weight:800;color:#ea580c;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 4px;">Related Reading</p>
    <p style="font-size:1em;font-weight:800;color:#0F3154;margin:0 0 4px;line-height:1.3;">The 10-Minute Habit: How to Make Home Soccer Training Stick</p>
    <p style="font-size:0.88em;color:#374151;margin:0;line-height:1.5;">Motivation gets you started. Habit is what keeps you going. This post covers the exact 4-step system for turning home training into something that just happens — automatically, every day, no willpower required.</p>
  </div>
  <a href="/blogs/10-minute-habit-home-soccer-training-stick" style="display:inline-block;background:#DC373E;color:#fff;font-weight:800;font-size:0.88em;padding:10px 22px;border-radius:50px;text-decoration:none;white-space:nowrap;box-shadow:0 4px 14px rgba(220,55,62,0.3);flex-shrink:0;">Read It &rarr;</a>
</div>`;

if (!post.content.includes(marker)) {
  console.error('Marker not found in post content');
  process.exit(1);
}

if (post.content.includes('10-Minute Habit: How to Make Home Soccer Training Stick')) {
  console.log('Cross-link already inserted, skipping.');
  process.exit(0);
}

post.content = post.content.replace(marker, marker + relatedBlock);

const checkIdx = post.content.indexOf('10-Minute Habit: How to Make Home Soccer Training Stick');
console.log(checkIdx > 0 ? '✅ Inserted successfully at idx ' + checkIdx : '❌ Insertion failed');

fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
console.log('Saved.');
