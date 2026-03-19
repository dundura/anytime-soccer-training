const fs = require('fs');
const path = require('path');

const pages = JSON.parse(fs.readFileSync('src/data/pages.json', 'utf8'));
const existingSlugs = new Set(pages.map(p => p.slug));

// All pages to add - content will be read from temp-pages2/ directory
const pageConfigs = [
  { slug: 'parent-getting-started-guide-grasshoppers', title: 'Parent Getting Started Guide - Grasshoppers', file: 'grasshoppers.html' },
  { slug: 'everything-you-need-to-know-about-player-cards', title: 'Everything You Need to Know About Player Cards', file: 'player-cards.html' },
  { slug: 'the-parent-trainers-playbook', title: "The Parent Trainer's Playbook", file: 'playbook.html' },
  { slug: 'monopoly-discussing-issues-facing-us-youth-soccer', title: 'Monopoly: Discussing Issues Facing US Youth Soccer', file: 'monopoly.html' },
  { slug: 'player-getting-started-guide-dhlus', title: 'Player Getting Started Guide - DHLUS', file: 'dhlus.html' },
  { slug: 'parent-getting-started-guide-pekin-pride', title: 'Parent Getting Started Guide - Pekin Pride', file: 'pekin-pride.html' },
  { slug: 'parent-getting-started-guide-ulete-fc', title: 'Parent Getting Started Guide - ULETE FC', file: 'ulete-fc.html' },
  { slug: 'parent-getting-started-guide-2015-legacy', title: 'Parent Getting Started Guide - 2015 Legacy Girls', file: '2015-legacy.html' },
  { slug: 'creating-teams-with-anytime-soccer-training', title: 'Creating Teams With Anytime Soccer Training', file: 'creating-teams.html' },
  { slug: 'complete-the-sign-up-form', title: 'Complete the Sign-up Form', file: 'signup-form.html' },
  { slug: 'joining-anytime-soccer-training-team', title: 'Joining an Anytime Soccer Training Team', file: 'joining-team.html' },
  { slug: 'adding-an-anytime-soccer-training-player-profile', title: 'Adding an Anytime Soccer Training Player Profile', file: 'adding-profile.html' },
  { slug: 'how-to-create-your-anytime-soccer-training-account', title: 'How to Create Your Anytime Soccer Training Account', file: 'create-account.html' },
];

const dir = 'temp-pages2';
let added = 0;

for (const config of pageConfigs) {
  if (existingSlugs.has(config.slug)) {
    console.log('SKIP (exists):', config.slug);
    continue;
  }

  const filePath = path.join(dir, config.file);
  if (!fs.existsSync(filePath)) {
    console.log('SKIP (no file):', config.slug);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Extract body content from full HTML documents
  const bodyMatch = content.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  const styleMatches = content.match(/<style[^>]*>[\s\S]*?<\/style>/gi) || [];
  const linkMatches = (content.match(/<link[^>]*>/gi) || []).filter(l =>
    l.includes('fonts.googleapis') || l.includes('fonts.gstatic')
  );
  const scriptMatches = content.match(/<script[^>]*>[\s\S]*?<\/script>/gi) || [];

  if (bodyMatch) {
    content = [
      ...styleMatches,
      ...linkMatches,
      bodyMatch[1].trim(),
      ...scriptMatches
    ].join('\n');
  }

  pages.push({
    id: String(Date.now() + added),
    title: config.title,
    slug: config.slug,
    date: new Date().toUTCString(),
    content: content,
    excerpt: '',
    categories: [],
    tags: [],
    thumbnailId: '',
    featuredImage: ''
  });

  added++;
  existingSlugs.add(config.slug);
  console.log('ADDED:', config.slug);
}

fs.writeFileSync('src/data/pages.json', JSON.stringify(pages, null, 2));
console.log(`\nDone. Added ${added} pages. Total: ${pages.length}`);
