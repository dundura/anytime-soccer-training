// The Inside Scoop podcast feed.
//
// The episode list on /podcast used to be a hand-written array. It went five
// months stale (newest entry Feb 2026, read in August) because nothing prompts
// you to edit a constant. This reads the show's own RSS instead, so publishing
// an episode is all it takes to have it appear.
//
// Feed URL is the one Apple has on file for the show — the canonical source,
// not a guess. Anchor/Spotify serves it.
const FEED_URL = 'https://anchor.fm/s/1f9b165c/podcast/rss';

// Re-read hourly. The show publishes a few times a week, so this is far more
// often than needed and still costs one request an hour per region.
const REVALIDATE_SECONDS = 3600;

export interface Episode {
  title: string;
  date: string; // already formatted for display, e.g. "Aug 2, 2026"
  duration: string; // e.g. "17 min"
  url: string;
}

// Parsed with regex rather than an XML library on purpose: this is one known
// feed with a fixed shape, and the alternative is a dependency for a single
// page. If the feed ever moves to a different generator, prefer swapping in a
// real parser over growing these patterns.
function tag(block: string, name: string): string {
  // Matches <name>…</name> and <name><![CDATA[…]]></name>.
  const m = block.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`));
  if (!m) return '';
  const raw = m[1].trim();
  const cdata = raw.match(/^<!\[CDATA\[([\s\S]*?)\]\]>$/);
  return decode((cdata ? cdata[1] : raw).trim());
}

function decode(s: string): string {
  return s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&'); // last, so a literal &amp;lt; survives intact
}

// "00:17:05" -> "17 min". Anything under a minute still reads as "1 min"
// rather than "0 min".
function formatDuration(hhmmss: string): string {
  const parts = hhmmss.split(':').map(Number);
  if (parts.some(Number.isNaN) || !parts.length) return '';
  const seconds = parts.reduce((total, p) => total * 60 + p, 0);
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${Math.max(1, minutes)} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h} hr ${m} min` : `${h} hr`;
}

function formatDate(pubDate: string): string {
  const d = new Date(pubDate);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/**
 * Newest episodes first. Returns [] if the feed cannot be read — callers should
 * fall back to something rather than render an empty section, since a blank
 * episode list looks like a dead podcast.
 */
export async function getRecentEpisodes(limit = 9): Promise<Episode[]> {
  let xml: string;
  try {
    const res = await fetch(FEED_URL, { next: { revalidate: REVALIDATE_SECONDS } });
    if (!res.ok) throw new Error(`feed responded ${res.status}`);
    xml = await res.text();
  } catch (err) {
    console.error('[podcast] could not read feed:', err instanceof Error ? err.message : err);
    return [];
  }

  const blocks = xml.match(/<item>[\s\S]*?<\/item>/g) || [];
  const episodes: Episode[] = [];

  for (const block of blocks) {
    const title = tag(block, 'title');
    const url = tag(block, 'link');
    if (!title || !url) continue; // a malformed entry should skip, not break the page
    episodes.push({
      title,
      url,
      date: formatDate(tag(block, 'pubDate')),
      duration: formatDuration(tag(block, 'itunes:duration')),
    });
    if (episodes.length >= limit) break; // the feed carries 475 items; stop early
  }

  return episodes;
}
