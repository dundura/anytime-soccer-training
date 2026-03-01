const fs = require('fs');
const path = require('path');

// Simple XML parser for WordPress WXR format
const xmlContent = fs.readFileSync(
  path.join(__dirname, '..', '..', 'Downloads', 'anytimesoccertraining.WordPress.2026-03-01.xml'),
  'utf-8'
);

function extractCDATA(text) {
  if (!text) return '';
  const match = text.match(/<!\[CDATA\[([\s\S]*?)\]\]>/);
  return match ? match[1] : text.replace(/<[^>]*>/g, '').trim();
}

function extractTag(xml, tag) {
  const regex = new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`);
  const match = xml.match(regex);
  if (!match) return '';
  // Strip CDATA if present
  const val = match[1].trim();
  const cdataMatch = val.match(/<!\[CDATA\[([\s\S]*?)\]\]>/);
  return cdataMatch ? cdataMatch[1] : val;
}

function extractWPTag(xml, tag) {
  const regex = new RegExp(`<wp:${tag}>([\\s\\S]*?)</wp:${tag}>`);
  const match = xml.match(regex);
  return match ? extractCDATA(match[1]) : '';
}

function extractContentEncoded(xml) {
  const regex = /<content:encoded>([\s\S]*?)<\/content:encoded>/;
  const match = xml.match(regex);
  return match ? extractCDATA(match[1]) : '';
}

function extractExcerptEncoded(xml) {
  const regex = /<excerpt:encoded>([\s\S]*?)<\/excerpt:encoded>/;
  const match = xml.match(regex);
  return match ? extractCDATA(match[1]) : '';
}

function extractCategories(xml) {
  const cats = [];
  const regex = /<category domain="(category|post_tag)"[^>]*><!\[CDATA\[([\s\S]*?)\]\]><\/category>/g;
  let match;
  while ((match = regex.exec(xml)) !== null) {
    cats.push({ type: match[1], name: match[2] });
  }
  return cats;
}

function extractMetaValue(xml, metaKey) {
  const regex = new RegExp(
    `<wp:postmeta>\\s*<wp:meta_key><!\\[CDATA\\[${metaKey}\\]\\]></wp:meta_key>\\s*<wp:meta_value><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></wp:meta_value>\\s*</wp:postmeta>`
  );
  const match = xml.match(regex);
  return match ? match[1] : '';
}

// Split into items
const items = xmlContent.split('<item>').slice(1).map(item => item.split('</item>')[0]);

const posts = [];
const pages = [];
const attachments = {};

for (const item of items) {
  const postType = extractWPTag(item, 'post_type');
  const status = extractWPTag(item, 'status');

  // Collect attachments for featured image lookup
  if (postType === 'attachment') {
    const postId = extractWPTag(item, 'post_id');
    const attachUrlMatch = item.match(/<wp:attachment_url><!\[CDATA\[([\s\S]*?)\]\]><\/wp:attachment_url>/);
    const attachUrl = attachUrlMatch ? attachUrlMatch[1].replace('http://', 'https://') : '';
    if (postId && attachUrl) {
      attachments[postId] = attachUrl;
    }
    continue;
  }

  if (status !== 'publish') continue;

  const title = extractTag(item, 'title');
  const slug = extractWPTag(item, 'post_name');
  const pubDate = extractTag(item, 'pubDate');
  const content = extractContentEncoded(item);
  const excerpt = extractExcerptEncoded(item);
  const categories = extractCategories(item);
  const thumbnailId = extractMetaValue(item, '_thumbnail_id');
  const postId = extractWPTag(item, 'post_id');

  const entry = {
    id: postId,
    title: title || 'Untitled',
    slug: slug || `post-${postId}`,
    date: pubDate || '',
    content: content,
    excerpt: excerpt,
    categories: categories.filter(c => c.type === 'category').map(c => c.name),
    tags: categories.filter(c => c.type === 'post_tag').map(c => c.name),
    thumbnailId: thumbnailId,
    featuredImage: '',
  };

  if (postType === 'post') {
    posts.push(entry);
  } else if (postType === 'page') {
    pages.push(entry);
  }
}

// Resolve featured images
for (const post of [...posts, ...pages]) {
  if (post.thumbnailId && attachments[post.thumbnailId]) {
    post.featuredImage = attachments[post.thumbnailId];
  }
}

// Sort posts by date descending
posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

// Get unique categories
const allCategories = [...new Set(posts.flatMap(p => p.categories))].sort();

console.log(`Parsed ${posts.length} published posts`);
console.log(`Parsed ${pages.length} published pages`);
console.log(`Categories: ${allCategories.join(', ')}`);
console.log(`Attachments found: ${Object.keys(attachments).length}`);

const dataDir = path.join(__dirname, '..', 'src', 'data');
fs.mkdirSync(dataDir, { recursive: true });

fs.writeFileSync(path.join(dataDir, 'posts.json'), JSON.stringify(posts, null, 2));
fs.writeFileSync(path.join(dataDir, 'pages.json'), JSON.stringify(pages, null, 2));
fs.writeFileSync(path.join(dataDir, 'categories.json'), JSON.stringify(allCategories, null, 2));

console.log('Data files written to src/data/');
