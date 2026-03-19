const posts = JSON.parse(require('fs').readFileSync('src/data/posts.json', 'utf8'));

// Categorize posts by format
let widget = 0, postContent = 0, doctype = 0, comment = 0, plain = 0;
const plainExamples = [];

for (const p of posts) {
  const c = p.content;
  const s = c.trim();
  if (c.includes('ast-success-widget')) { widget++; }
  else if (c.includes('post-content')) { postContent++; }
  else if (s.startsWith('<!DOCTYPE') || s.startsWith('<html')) { doctype++; }
  else if (s.startsWith('<!--')) { comment++; }
  else {
    plain++;
    if (plainExamples.length < 3) {
      plainExamples.push({ title: p.title, slug: p.slug, start: s.substring(0, 200) });
    }
  }
}

console.log('=== Blog Post Format Breakdown ===');
console.log('Total posts:', posts.length);
console.log('ast-success-widget (already styled):', widget);
console.log('post-content wrapper (WP export):', postContent);
console.log('Full HTML docs:', doctype);
console.log('HTML comment widgets:', comment);
console.log('Plain HTML (need formatting):', plain);
console.log('');
console.log('=== Plain HTML Samples ===');
plainExamples.forEach(e => {
  console.log(e.title, '(' + e.slug + ')');
  console.log('  ', e.start.replace(/\n/g, ' '));
  console.log('');
});

// Check the HBCU post specifically - what makes it look good
const hbcu = posts.find(p => p.slug.includes('hbcu'));
if (hbcu) {
  console.log('=== HBCU Reference Post ===');
  console.log('Has ast-success-widget:', hbcu.content.includes('ast-success-widget'));
  console.log('Has post-content:', hbcu.content.includes('post-content'));
  // Find key CSS classes
  const classes = hbcu.content.match(/class="[^"]*"/g) || [];
  const unique = [...new Set(classes)].slice(0, 20);
  console.log('Key classes:', unique.join('\n  '));
}
