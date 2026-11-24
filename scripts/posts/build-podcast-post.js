// Builds an Inside Scoop episode blog post from a small markdown file and adds/updates it in posts.json.
//
//   node scripts/posts/build-podcast-post.js scripts/posts/episodes/ep05.md
//
// File format: front matter, then the body.
//   ---
//   title: Youth Soccer in Germany vs. the US: A Parent's Guide from Kaiserslautern
//   slug: youth-soccer-germany-vs-us-parents-guide-kaiserslautern
//   episode: 5
//   date: Tue, 24 Nov 2026 10:00:00 +0000
//   image: /images/blog/ep05-germany-vs-usa.jpg
//   excerpt: One or two sentences for cards and SEO.
//   categories: Blog, Podcast, Parent Guide
//   tags: the inside scoop, podcast, germany
//   youtube: VIDEO_ID            (optional; embeds the episode near the top)
//   ---
//   > Lead answer (shown as the big pull quote)
//   Plain paragraphs. **bold**, [text](url).
//   ## Section heading            (goes in the table of contents)
//   ### Sub heading
//   - bullet
//   1. numbered item
//   | Col | Col | Col |           (table; first row is the header)
//   [[gear:cones]]                (affiliate product box; keys in GEAR below)
//   [[cta]]                       (7-day free trial box)
//   [[img:/images/blog/x.jpg|alt text]]  (full-width in-post image)
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..', '..');

// Affiliate products (amzn.to links are tagged anytimeamazon-20). Same list as src/components/BlogGear.tsx.
const GEAR = {
  ball:    ['Adidas MLS Training Soccer Ball', 'https://amzn.to/4q6yUY3', 'adidas-mls-soccer-ball.jpg', 'A durable size 4 or 5 ball for every session at home.'],
  ball1:   ['Size One Soccer Ball', 'https://amzn.to/4aM3st9', 'size_one-soccer-balls.jpg', 'A small, light ball for quick feet, thigh taps and kick-and-catch.'],
  cones:   ['Disc Training Cones (Set of 40)', 'https://amzn.to/4soWKzv', 'training-cones.jpg', 'Enough for boxes, weave courses and anything else you set up in the backyard.'],
  goals:   ['PUGG Pop-Up Soccer Goals (Set of 2)', 'https://amzn.to/4qA1Kj9', 'popup-goals.jpg', 'Pop-up goals for small-sided games and finishing at home.'],
  rebounder: ['Soccer Rebounder', 'https://amzn.to/4qFkfD1', 'soccer-rebounder.jpg', 'A passing partner that never gets tired: first touch and passing on your own.'],
  ladder:  ['Agility Ladder Set', 'https://amzn.to/4spLHX1', 'soccer_agility_ladder.jpg', 'Footwork, balance and coordination in five minutes.'],
  pump:    ['Portable Ball Pump', 'https://amzn.to/3YZtSQU', 'portable_ball_pump.jpg', 'Keep every ball properly inflated.'],
  speaker: ['Bluetooth Speaker', 'https://amzn.to/4sGL2Rc', 'blue_tooth_speaker.jpg', 'Play the follow-along video or interval timer out loud in the yard.'],
};
const IMG_BASE = 'https://media.anytime-soccer.com/wp-content/uploads/2026/01/';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const md = (s) => esc(s)
  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (m, t, u) => `<a href="${u}" style="color:#DC373E;font-weight:600;"${/amzn\.to|amazon\.com/.test(u) ? ' target="_blank" rel="sponsored noopener"' : ''}>${t}</a>`);
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const P = (s) => `<p style="font-size:1em;line-height:1.85;color:#374151;">${md(s)}</p>`;
const H2 = (s) => `<span id="${slugify(s)}" style="display:block;position:relative;top:-80px;visibility:hidden;"></span>\n<h2 style="font-size:1.55em;font-weight:800;color:#0F3154;margin:44px 0 14px;line-height:1.3;">${md(s)}</h2>`;
const H3 = (s) => `<h3 style="font-size:1.2em;font-weight:800;color:#0F3154;margin:30px 0 10px;">${md(s)}</h3>`;
const UL = (a) => `<ul style="font-size:1em;line-height:1.85;color:#374151;padding-left:22px;margin:0 0 18px;">${a.map((x) => `<li style="margin-bottom:8px;">${md(x)}</li>`).join('')}</ul>`;
const OL = (a) => `<ol style="font-size:1em;line-height:1.85;color:#374151;padding-left:24px;margin:0 0 18px;">${a.map((x) => `<li style="margin-bottom:10px;">${md(x)}</li>`).join('')}</ol>`;
const QUOTE = (s) => `<div style="background:linear-gradient(135deg,#FFF1F2 0%,#FFE4E6 100%);border-radius:20px;padding:28px 32px;margin:32px 0;border:1px solid #FECDD3;"><p style="font-size:1.15em;font-weight:700;color:#9F1239;margin:0;line-height:1.6;font-style:italic;">${md(s)}</p></div>`;
const TABLE = (rows) => {
  const [head, ...body] = rows;
  const th = head.map((c) => `<th style="text-align:left;padding:10px 12px;background:#0F3154;color:#fff;font-size:0.9em;">${md(c)}</th>`).join('');
  const tr = body.map((r, i) => `<tr style="background:${i % 2 ? '#F9FAFB' : '#fff'};">${r.map((c, j) => `<td style="padding:10px 12px;border-top:1px solid #E5E7EB;font-size:0.9em;color:#374151;vertical-align:top;${j === 0 ? 'font-weight:700;color:#0F3154;' : ''}">${md(c)}</td>`).join('')}</tr>`).join('');
  return `<div style="overflow-x:auto;margin:24px 0;border:1px solid #E5E7EB;border-radius:14px;"><table style="width:100%;border-collapse:collapse;min-width:520px;"><thead><tr>${th}</tr></thead><tbody>${tr}</tbody></table></div>`;
};
const GEARBOX = (key) => {
  const g = GEAR[key]; if (!g) throw new Error(`Unknown gear key: ${key}`);
  const [title, href, img, text] = g;
  return `<div style="background:#F9FAFB;border:1px solid #E5E7EB;border-radius:16px;padding:18px 22px;margin:26px 0;display:flex;gap:16px;align-items:center;"><img src="${IMG_BASE}${img}" alt="${esc(title)}" style="width:72px;height:72px;object-fit:cover;border-radius:10px;flex-shrink:0;" /><div><p style="font-size:0.75em;font-weight:800;color:#6B7280;text-transform:uppercase;letter-spacing:0.09em;margin:0 0 4px;">Gear that helps</p><p style="font-size:0.98em;font-weight:700;color:#111827;margin:0 0 4px;">${esc(title)}</p><p style="font-size:0.88em;color:#4B5563;margin:0 0 8px;line-height:1.55;">${esc(text)}</p><a href="${href}" target="_blank" rel="sponsored noopener" style="font-size:0.85em;font-weight:700;color:#DC373E;">See it on Amazon &#8594;</a></div></div>`;
};
const CTA = `<div style="background:linear-gradient(135deg,#FFF7ED,#FEF3C7);border:1px solid #FCD34D;border-radius:18px;padding:28px 32px;margin:36px 0;display:flex;flex-direction:column;gap:16px;align-items:flex-start;box-shadow:0 2px 16px rgba(251,191,36,0.15);"><img src="https://media.anytime-soccer.com/wp-content/themes/anytime/images/about/new-chalange-image.png" alt="Free 7-Day Training Plan" style="width:72px;height:72px;object-fit:cover;border-radius:10px;flex-shrink:0;" /><div><p style="font-size:0.78em;font-weight:800;color:#92400e;text-transform:uppercase;letter-spacing:0.09em;margin:0 0 4px;">The Part You Control</p><p style="font-size:1.02em;font-weight:700;color:#78350f;margin:0 0 6px;">Extra Training at Home, Without Guessing What to Do</p><p style="font-size:0.9em;color:#92400e;margin:0 0 14px;line-height:1.6;">Whatever system your child plays in, the extra work usually falls to the family. Anytime Soccer Training gives you 5,000+ follow-along videos (ball mastery, juggling, first touch and more) in a set order, so you always know what to do next.</p><a href="https://www.anytime-soccer.com/pricing" style="display:inline-block;background:#DC373E;color:#fff;font-weight:700;font-size:0.88em;padding:10px 22px;border-radius:10px;text-decoration:none;">Try It Free for 7 Days &#8594;</a></div></div>`;
const DISCLOSURE = `<p style="font-size:0.8em;color:#9CA3AF;line-height:1.6;margin:28px 0 0;">As an Amazon Associate, Anytime Soccer Training earns from qualifying purchases. Gear links in this post are affiliate links; they cost you nothing extra.</p>`;

const file = process.argv[2];
if (!file) { console.error('usage: node build-podcast-post.js <episode.md>'); process.exit(1); }
const raw = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
if (!m) throw new Error('missing front matter');
const meta = Object.fromEntries(m[1].split('\n').filter(Boolean).map((l) => { const i = l.indexOf(':'); return [l.slice(0, i).trim(), l.slice(i + 1).trim()]; }));
for (const k of ['title', 'slug', 'episode', 'date', 'excerpt']) if (!meta[k]) throw new Error(`front matter needs ${k}`);

// Readability: each "## " section is a card (alternating backgrounds), its first paragraph (the answer-first
// sentence) is a highlighted key-point callout, "**Label.** text" paragraphs become small callout cards, and
// lists sit in a tinted box.
const SECTION_OPEN = (n) => `<section style="background:${n % 2 ? '#F8FAFC' : '#FFFFFF'};border:1px solid #E5E7EB;border-radius:20px;padding:4px 22px 18px;margin:36px 0;box-shadow:0 1px 8px rgba(15,49,84,0.05);">`;
const KEY = (s) => `<div style="background:#EFF6FF;border-left:5px solid #1D4ED8;border-radius:12px;padding:16px 20px;margin:4px 0 20px;"><p style="font-size:0.72em;font-weight:800;color:#1D4ED8;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 6px;">Key point</p><p style="font-size:1.08em;font-weight:700;color:#0F3154;line-height:1.6;margin:0;">${md(s)}</p></div>`;
const LABEL = (s) => `<div style="background:#FFFBEB;border:1px solid #FDE68A;border-left:5px solid #F59E0B;border-radius:12px;padding:14px 18px;margin:16px 0;"><p style="font-size:1em;line-height:1.8;color:#374151;margin:0;">${md(s)}</p></div>`;
const LISTBOX = (html) => `<div style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:14px;padding:14px 18px 2px;margin:18px 0;">${html}</div>`;

const out = []; const toc = []; let usedGear = false; let inSection = false; let afterH2 = false;
const lines = m[2].split('\n');
for (let i = 0; i < lines.length;) {
  const l = lines[i].trim();
  if (!l) { i++; continue; }
  if (l.startsWith('## ')) {
    if (inSection) out.push('</section>');
    out.push(SECTION_OPEN(toc.length) + H2(l.slice(3)).replace('margin:44px 0 14px', 'margin:22px 0 14px'));
    toc.push(l.slice(3)); inSection = true; afterH2 = true; i++; continue;
  }
  const first = afterH2; afterH2 = false;
  if (l.startsWith('### ')) { out.push(H3(l.slice(4))); i++; continue; }
  if (l.startsWith('> ')) { out.push(QUOTE(l.slice(2))); i++; continue; }
  if (l === '[[cta]]') { out.push(CTA); i++; continue; }
  const im = l.match(/^\[\[img:([^|\]]+)\|([^\]]*)\]\]$/); if (im) { out.push(`<figure style="margin:26px 0;"><img src="${im[1]}" alt="${esc(im[2])}" loading="lazy" style="width:100%;height:auto;display:block;border-radius:16px;box-shadow:0 4px 18px rgba(15,49,84,0.12);" /></figure>`); i++; continue; }
  const g = l.match(/^\[\[gear:(\w+)\]\]$/); if (g) { out.push(GEARBOX(g[1])); usedGear = true; i++; continue; }
  if (/^[-•] /.test(l)) { const a = []; while (i < lines.length && /^[-•] /.test(lines[i].trim())) a.push(lines[i++].trim().slice(2)); out.push(LISTBOX(UL(a))); continue; }
  if (/^\d+\.\s/.test(l)) { const a = []; while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) a.push(lines[i++].trim().replace(/^\d+\.\s+/, '')); out.push(LISTBOX(OL(a))); continue; }
  if (l.startsWith('|')) { const rows = []; while (i < lines.length && lines[i].trim().startsWith('|')) { const r = lines[i++].trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim()); if (!r.every((c) => /^:?-+:?$/.test(c))) rows.push(r); } out.push(TABLE(rows)); continue; }
  if (first) out.push(KEY(l));
  else if (/^\*\*[^*]{2,60}\*\*/.test(l)) out.push(LABEL(l));
  else out.push(P(l));
  i++;
}
if (inSection) out.push('</section>');
if (/amzn\.to|amazon\.com/.test(m[2])) usedGear = true;

const day = new Date(meta.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
const head = [
  `<p style="font-size:0.85em;font-weight:700;color:#DC373E;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:10px;display:inline-block;background:#FFF1F2;padding:4px 12px;border-radius:20px;">The Inside Scoop &middot; Episode ${meta.episode}</p>`,
  `<p style="font-size:0.9em;color:#6B7280;margin:0 0 18px;">By Neil Crawford &middot; The Inside Scoop, Episode ${meta.episode} &middot; ${day}</p>`,
];
const tocHtml = toc.length ? `<div style="background:#F0F9FF;border:1px solid #BAE6FD;border-radius:16px;padding:24px 28px;margin:32px 0;"><p style="font-size:0.78em;font-weight:800;color:#0369A1;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 14px;">In this post</p><ol style="font-size:1em;line-height:1.9;color:#0369A1;margin:0;padding-left:20px;">${toc.map((t) => `<li><a href="#${slugify(t)}" style="color:#0369A1;font-weight:600;">${esc(t)}</a></li>`).join('')}</ol></div>` : '';
const video = meta.youtube ? `<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:14px;margin:28px 0;"><iframe src="https://www.youtube.com/embed/${meta.youtube}" title="The Inside Scoop Episode ${meta.episode}" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>` : '';
// Lead quote, then table of contents, then the episode video, then the body.
const firstQuote = out.findIndex((h) => h.includes('linear-gradient(135deg,#FFF1F2'));
const body = firstQuote === 0 ? [out[0], tocHtml, video, ...out.slice(1)] : [tocHtml, video, ...out];
const content = `<div class="post-content">\n\n${[...head, ...body].filter(Boolean).join('\n\n')}${usedGear ? '\n\n' + DISCLOSURE : ''}\n\n</div>`;

const postsPath = path.join(ROOT, 'src/data/posts.json');
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
const list = (s, d) => (s ? s.split(',').map((x) => x.trim()).filter(Boolean) : d);
const post = {
  title: meta.title, slug: meta.slug, date: meta.date, content, excerpt: meta.excerpt,
  categories: list(meta.categories, ['Blog', 'Podcast', 'Parent Guide']),
  tags: list(meta.tags, ['the inside scoop', 'podcast']),
  featuredImage: meta.image || 'https://d2vm0l3c6tu9qp.cloudfront.net/Boys10.jpg',
  thumbnailId: '',
};
const idx = posts.findIndex((p) => p.slug === post.slug);
if (idx >= 0) posts[idx] = { ...post, id: posts[idx].id };
else posts.unshift({ id: posts.reduce((mx, p) => Math.max(mx, Number(p.id) || 0), 0) + 1, ...post });
fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
console.log(`${idx >= 0 ? 'updated' : 'added'} https://www.anytime-soccer.com/blog/${post.slug} (${content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length} words, ${toc.length} sections)`);
