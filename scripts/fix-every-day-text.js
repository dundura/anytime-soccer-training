const fs = require('fs');
const path = require('path');

const postsPath = path.join(__dirname, '../src/data/posts.json');
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
const post = posts.find(p => p.slug === '10-minute-habit-home-soccer-training-stick');

if (!post) { console.error('Post not found'); process.exit(1); }

const replacements = [
  // Instance 1 — main catch paragraph
  [
    "Not when you feel like it. Not when there's nothing else going on. Every day.",
    "Not when you feel like it. Not when there's nothing else going on. <strong>Almost every day.</strong>"
  ],
  // Instance 5 — identity of someone who trains
  [
    "the identity of being someone who trains every day.</strong>",
    "the identity of being someone who trains almost every day.</strong>"
  ],
  // Instance 6 — 5-minute session example
  [
    "A 5-minute session that happens every day for 30 days",
    "A 5-minute session that happens almost every day for 30 days"
  ],
  // Instance 9 — bottom line paragraph
  [
    "Ten minutes. Same time every day.",
    "Ten minutes. Same time almost every day."
  ],
];

let changed = 0;
for (const [oldText, newText] of replacements) {
  if (post.content.includes(oldText)) {
    post.content = post.content.replace(oldText, newText);
    console.log('✅ Replaced:', oldText.slice(0, 60));
    changed++;
  } else {
    console.warn('⚠️  Not found:', oldText.slice(0, 60));
  }
}

console.log(`\n${changed}/${replacements.length} replacements made.`);

// Verify no remaining "every day" about training frequency
const remaining = [];
const regex = /every day/gi;
let m;
while ((m = regex.exec(post.content)) !== null) {
  remaining.push(post.content.slice(Math.max(0, m.index - 40), m.index + 60));
}
console.log('\nRemaining "every day" instances (should all be about anchors/calendar):');
remaining.forEach((r, i) => console.log(`  [${i+1}] ...${r}...`));

fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
console.log('\nSaved.');
