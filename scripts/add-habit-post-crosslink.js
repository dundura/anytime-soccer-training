const fs = require('fs');
const path = require('path');

const postsPath = path.join(__dirname, '../src/data/posts.json');
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
const post = posts.find(p => p.slug === '10-minute-habit-home-soccer-training-stick');

if (!post) { console.error('10-min habit post not found'); process.exit(1); }

if (post.content.includes('how-to-motivate-your-child-to-practice-soccer-at-home')) {
  console.log('Cross-link already present, skipping.');
  process.exit(0);
}

// Insert after the Quick Tip box at the end of section 1 (Motivation Trap)
// The Quick Tip ends with this text before section 2 begins
const marker = `<p style="font-size:0.93em;color:#064e3b;margin:0;line-height:1.65;"><strong>Stop chasing motivation. Start chasing consistency.</strong> This week, pick just one day to do a 5-minute training session. Just one. Protect it like an appointment. Start there — not with a full schedule.</p></div></div>`;

const relatedBlock = `

<div style="background:linear-gradient(135deg,#FFF7ED,#FFEDD5);border-radius:16px;padding:20px 24px;margin:28px 0;border:1px solid #FED7AA;display:flex;gap:16px;align-items:center;flex-wrap:wrap;">
  <div style="font-size:28px;flex-shrink:0;">📖</div>
  <div style="flex:1;min-width:160px;">
    <p style="font-size:0.74em;font-weight:800;color:#ea580c;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 4px;">Related Reading</p>
    <p style="font-size:1em;font-weight:800;color:#0F3154;margin:0 0 4px;line-height:1.3;">How to Motivate Your Child to Practice Soccer at Home</p>
    <p style="font-size:0.88em;color:#374151;margin:0;line-height:1.5;">The <em>why</em> behind motivation — what it actually is, why kids resist, and how to build the environment where they choose to train. The deeper companion to this post.</p>
  </div>
  <a href="/blog/how-to-motivate-your-child-to-practice-soccer-at-home" style="display:inline-block;background:#DC373E;color:#fff;font-weight:800;font-size:0.88em;padding:10px 22px;border-radius:50px;text-decoration:none;white-space:nowrap;box-shadow:0 4px 14px rgba(220,55,62,0.3);flex-shrink:0;">Read It &rarr;</a>
</div>`;

if (!post.content.includes(marker)) {
  // Try a simpler marker - the closing of the first quick tip box
  const altMarker = 'Start there — not with a full schedule.</p></div></div>';
  const altIdx = post.content.indexOf(altMarker);
  console.log('Alt marker idx:', altIdx);
  if (altIdx > -1) {
    post.content = post.content.replace(altMarker, altMarker + relatedBlock);
    console.log('Inserted after alt marker');
  } else {
    // Fallback: insert before section 2 header (the "2" number box)
    const sec2 = '">2</div><h2 style="font-size:1.6em;font-weight:800;color:#0F3154;margin:0;line-height:1.25;">Why 10 Minutes Is the Magic Number</h2>';
    const sec2Idx = post.content.indexOf(sec2);
    console.log('Section 2 fallback idx:', sec2Idx);
    if (sec2Idx > -1) {
      // find the opening div before the "2"
      const insertBefore = post.content.lastIndexOf('<div style="display:flex;align-items:center;gap:16px;margin:52px 0 8px;">', sec2Idx);
      if (insertBefore > -1) {
        post.content = post.content.slice(0, insertBefore) + relatedBlock + '\n' + post.content.slice(insertBefore);
        console.log('Inserted before section 2 header');
      }
    }
  }
} else {
  post.content = post.content.replace(marker, marker + relatedBlock);
  console.log('Inserted after primary marker');
}

const check = post.content.includes('how-to-motivate-your-child-to-practice-soccer-at-home');
console.log(check ? '✅ Cross-link inserted' : '❌ Insertion failed');

fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
console.log('Saved.');
