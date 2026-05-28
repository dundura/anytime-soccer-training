const fs = require('fs');
const path = require('path');

const postsPath = path.join(__dirname, '../src/data/posts.json');
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
const post = posts.find(p => p.slug === '10-minute-habit-home-soccer-training-stick');
if (!post) { console.error('Post not found'); process.exit(1); }

// ── 1. Add id="" to each H2 ─────────────────────────────────────────────────
const headingMap = [
  { text: 'The Motivation Trap',                      id: 'the-motivation-trap' },
  { text: 'Why 10 Minutes Is the Magic Number',       id: 'why-10-minutes' },
  { text: 'The Science of Habit Formation (In Plain English)', id: 'the-science-of-habit-formation' },
  { text: 'The 4-Step System That Actually Works',    id: 'the-4-step-system' },
  { text: "The Parent's Role: Show Up, Don't Coach",  id: 'the-parents-role' },
  { text: 'What 30, 60, and 90 Days Looks Like',      id: 'what-30-60-and-90-days-looks-like' },
  { text: 'A Note on Setbacks (Because They Will Happen)', id: 'a-note-on-setbacks' },
  { text: 'The Bottom Line',                          id: 'the-bottom-line' },
];

for (const { text, id } of headingMap) {
  // Find the h2 tag that contains this text and add an id to the wrapper div before it
  const h2Pattern = `>${text}</h2>`;
  if (!post.content.includes(h2Pattern)) {
    console.warn('⚠️  H2 not found:', text);
    continue;
  }
  // The section header lives inside a flex div — inject an <a> anchor before that div
  // Find the opening flex div for this section (look back from h2)
  const h2Idx = post.content.indexOf(h2Pattern);
  const divStart = post.content.lastIndexOf('<div style="display:flex;align-items:center;gap:16px;margin:', h2Idx);
  if (divStart === -1) { console.warn('⚠️  Wrapper div not found for:', text); continue; }

  const anchorTag = `<a id="${id}" style="display:block;position:relative;top:-80px;visibility:hidden;"></a>`;
  // Only inject if not already there
  if (!post.content.slice(divStart - 60, divStart).includes(`id="${id}"`)) {
    post.content = post.content.slice(0, divStart) + anchorTag + '\n' + post.content.slice(divStart);
    console.log('✅ Anchor added:', id);
  } else {
    console.log('⏭  Already has anchor:', id);
  }
}

// ── 2. Add anchor to Readiness Scale block ──────────────────────────────────
const rsAnchor = '<a id="the-readiness-scale" style="display:block;position:relative;top:-80px;visibility:hidden;"></a>';
const rsMarker = '<div style="background:linear-gradient(135deg,#F5F3FF,#EDE9FE);border-radius:18px;padding:28px 30px;margin:36px 0;border:1px solid #DDD6FE;';
if (!post.content.includes(rsAnchor) && post.content.includes(rsMarker)) {
  post.content = post.content.replace(rsMarker, rsAnchor + '\n' + rsMarker);
  console.log('✅ Readiness Scale anchor added');
} else {
  console.log('⏭  Readiness Scale anchor already present or marker missing');
}

// ── 3. Build TOC block ───────────────────────────────────────────────────────
const tocBlock = `
<div style="background:linear-gradient(135deg,#F8FAFF,#EEF4FF);border-radius:16px;padding:24px 28px;margin:32px 0 40px;border:1px solid #C7D7FA;box-shadow:0 2px 12px rgba(15,49,84,0.06);">
  <p style="font-size:0.76em;font-weight:800;color:#0F3154;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 16px;display:flex;align-items:center;gap:8px;">📋 &nbsp;In This Post</p>
  <ol style="margin:0;padding-left:20px;display:flex;flex-direction:column;gap:8px;">
    <li style="font-size:0.93em;color:#374151;line-height:1.5;"><a href="#the-motivation-trap" style="color:#0F3154;text-decoration:none;font-weight:600;">The Motivation Trap</a></li>
    <li style="font-size:0.93em;color:#374151;line-height:1.5;"><a href="#why-10-minutes" style="color:#0F3154;text-decoration:none;font-weight:600;">Why 10 Minutes Is the Magic Number</a></li>
    <li style="font-size:0.93em;color:#374151;line-height:1.5;"><a href="#the-science-of-habit-formation" style="color:#0F3154;text-decoration:none;font-weight:600;">The Science of Habit Formation</a></li>
    <li style="font-size:0.93em;color:#374151;line-height:1.5;"><a href="#the-4-step-system" style="color:#0F3154;text-decoration:none;font-weight:600;">The 4-Step System That Actually Works</a></li>
    <li style="font-size:0.93em;color:#374151;line-height:1.5;"><a href="#the-parents-role" style="color:#0F3154;text-decoration:none;font-weight:600;">The Parent's Role: Show Up, Don't Coach</a>
      <ul style="margin:6px 0 0;padding-left:18px;list-style:none;display:flex;flex-direction:column;gap:5px;">
        <li style="font-size:0.88em;"><a href="#the-readiness-scale" style="color:#7c3aed;text-decoration:none;font-weight:600;">🌡️ The Readiness Scale — A Tip That Changed Everything</a></li>
      </ul>
    </li>
    <li style="font-size:0.93em;color:#374151;line-height:1.5;"><a href="#what-30-60-and-90-days-looks-like" style="color:#0F3154;text-decoration:none;font-weight:600;">What 30, 60, and 90 Days Looks Like</a></li>
    <li style="font-size:0.93em;color:#374151;line-height:1.5;"><a href="#a-note-on-setbacks" style="color:#0F3154;text-decoration:none;font-weight:600;">A Note on Setbacks</a></li>
    <li style="font-size:0.93em;color:#374151;line-height:1.5;"><a href="#the-bottom-line" style="color:#0F3154;text-decoration:none;font-weight:600;">The Bottom Line</a></li>
  </ol>
</div>

`;

// Insert TOC after the category tag line and before the first paragraph
const insertAfterTag = '<p style="font-size:0.82em;font-weight:700;color:#DC373E;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:10px;display:inline-block;background:#FFF1F2;padding:4px 12px;border-radius:20px;">Home Training &amp; Habit Building</p>';

if (!post.content.includes('In This Post') && post.content.includes(insertAfterTag)) {
  post.content = post.content.replace(insertAfterTag, insertAfterTag + tocBlock);
  console.log('✅ TOC inserted');
} else {
  console.log('⏭  TOC already present or tag not found');
}

fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
console.log('\nSaved.');
