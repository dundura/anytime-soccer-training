import Link from 'next/link';
import type { Metadata } from 'next';
import PodcastContactForm from '@/components/PodcastContactForm';

export const metadata: Metadata = {
  title: 'The Inside Scoop Podcast — Anytime Soccer Training',
  description: 'A weekly podcast where youth soccer parents and coaches from across the globe break down how the game is played and developed in their corner of the world.',
};

const INFO_ROWS = [
  { label: 'Host', value: 'Neil Crawford' },
  { label: 'Category', value: 'Youth Soccer' },
  { label: 'Location', value: 'Cary, North Carolina' },
  { label: 'Website', value: 'Apple Podcasts', href: 'https://podcasts.apple.com/us/podcast/the-inside-scoop-with-anytime-soccer-training/id1518478885' },
  { label: 'All Episodes', value: 'Subscribe', href: 'https://podcasters.spotify.com/pod/show/anytime-soccer' },
  { label: 'Email', value: 'Contact', href: 'mailto:neil@anytime-soccer.com' },
];

const TOP_EPISODES = [
  {
    title: "You're Hired! My Quick Pitch for Improving a Competitive Youth Soccer Club",
    description: "What would you change if you were suddenly in charge of a youth soccer club? Neil lays out his quick-hit pitch for the improvements competitive clubs should be making right now.",
    url: 'https://open.spotify.com/episode/4DbBlEEF27tqKt6fuUUQvQ?si=3s-xlX5dSl-BJLCDE9DsyQ',
  },
];

const RECENT_EPISODES = [
  { title: "My Game Model (From a Dad Who Never Played)", date: 'Feb 22, 2026', duration: '18 min', url: 'https://podcasters.spotify.com/pod/show/anytime-soccer/episodes/My-Game-Model-From-a-Dad-Who-Never-Played-e3fegtk' },
  { title: "Recap of Some of My Core Beliefs About Youth Soccer Development", date: 'Feb 22, 2026', duration: '19 min', url: 'https://podcasters.spotify.com/pod/show/anytime-soccer/episodes/Recap-of-Some-of-My-Core-Beliefs-About-Youth-Soccer-Development-e3fegqm' },
  { title: "How Anytime Soccer Training Actually Works (And What It Can't Do)", date: 'Feb 22, 2026', duration: '31 min', url: 'https://podcasters.spotify.com/pod/show/anytime-soccer/episodes/How-Anytime-Soccer-Training-Actually-Works-And-What-It-Cant-Do-e3fegma' },
  { title: "Quick Clarification on Pro/Rel in Youth Soccer", date: 'Feb 18, 2026', duration: '10 min', url: 'https://podcasters.spotify.com/pod/show/anytime-soccer/episodes/Quick-Clarification-on-ProRel-in-Youth-Soccer-e3f8or3' },
  { title: "Are we Moralizing Club's Too Much — A Reformed Parent's Perspective", date: 'Feb 17, 2026', duration: '39 min', url: 'https://podcasters.spotify.com/pod/show/anytime-soccer/episodes/Are-we-Moralizing-Clubs-Too-Much---A-Reformed-Parents-Perspective-e3f7vpn' },
  { title: "They Don't Care About Development — Why I'm Defending the Clubs", date: 'Feb 15, 2026', duration: '23 min', url: 'https://podcasters.spotify.com/pod/show/anytime-soccer/episodes/They-Dont-Care-About-Development--Why-Im-Defending-the-Clubs-e3f4717' },
  { title: "The State of Grassroots Soccer: Why Fundamentals Still Matter — with Coach Jesse Nova", date: 'Feb 14, 2026', duration: '17 min', url: 'https://podcasters.spotify.com/pod/show/anytime-soccer/episodes/The-State-of-Grassroots-Soccer-Why-Fundamentals-Still-Matter---with-Coach-Jesse-Nova-e3f3n8r' },
  { title: "The Problem With Scrimmages (And What to Do Instead)", date: 'Feb 8, 2026', duration: '25 min', url: 'https://podcasters.spotify.com/pod/show/anytime-soccer/episodes/The-Problem-With-Scrimmages-And-What-to-Do-Instead-e3eqhjb' },
  { title: "From Brazilian Orphan to Soccer Coach: Jesse Novatski's Journey", date: 'Jan 23, 2026', duration: '43 min', url: 'https://podcasters.spotify.com/pod/show/anytime-soccer/episodes/From-Brazilian-Orphan-to-Soccer-Coach-Jesse-Novatskis-Journey-e3e365v' },
];

const VIDEO_IDS = ['gGYWD_uzlZE', 'ZkkJqZscFso', 'l5IWHHn62U0'];

export default function PodcastPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* ── Sidebar ── */}
        <aside className="md:w-72 shrink-0 space-y-5">
          {/* Cover Art */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <img
              src="https://anytime-soccer.com/wp-content/uploads/2026/01/inside-scoop-mug.jpg"
              alt="The Inside Scoop Podcast"
              className="w-full aspect-square object-cover"
            />
          </div>

          {/* Info Table */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                {INFO_ROWS.map((row, i) => (
                  <tr key={row.label} className={i > 0 ? 'border-t border-gray-200' : ''}>
                    <td className="px-4 py-3 text-gray whitespace-nowrap">{row.label}</td>
                    <td className="px-4 py-3 text-right">
                      {row.href ? (
                        <a href={row.href} target="_blank" rel="noopener noreferrer" className="font-bold text-red hover:text-red-dark transition-colors">
                          {row.value} &#8599;
                        </a>
                      ) : (
                        <span className="font-bold text-navy">{row.value}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Be a Guest CTA */}
          <a href="#be-a-guest" className="block w-full py-3 text-center rounded-xl bg-red text-white font-semibold hover:bg-red-dark transition-colors">
            Be a Guest
          </a>
        </aside>

        {/* ── Main Content ── */}
        <div className="flex-1 min-w-0 space-y-6">
          {/* Hero Banner */}
          <div className="relative rounded-2xl overflow-hidden h-48 md:h-64">
            <img
              src="https://anytime-soccer.com/wp-content/uploads/2024/12/dall%C2%B7e-2024-12-13-08.58.54-a-vibrant-podcast-thumbnail-in-red-white-and-blue-featuring-a-soccer-ball-prominently-in-the-center.-the-design-includes-dynamic-motion-lines-and-p.webp"
              alt="The Inside Scoop Podcast"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">The Inside Scoop Podcast</h1>
              <p className="text-white/70 text-sm">Hosted by Neil Crawford &middot; Cary, North Carolina</p>
            </div>
          </div>

          {/* About */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-navy mb-3">About</h2>
            <p className="text-sm leading-relaxed text-gray">
              A weekly podcast where youth soccer parents and coaches from across the globe break down how the game is played and developed in their corner of the world.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <a
                href="https://podcasts.apple.com/us/podcast/the-inside-scoop-with-anytime-soccer-training/id1518478885"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red text-white font-semibold text-sm hover:bg-red-dark transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Listen Now
              </a>
              <a
                href="https://podcasts.apple.com/us/podcast/the-inside-scoop-with-anytime-soccer-training/id1518478885"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red text-red font-semibold text-sm hover:bg-red hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                Follow
              </a>
              <a
                href="#be-a-guest"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-navy text-navy font-semibold text-sm hover:bg-background transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Request a Topic
              </a>
            </div>
          </div>

          {/* Top Episodes (manual) */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-navy mb-4">Top Episodes</h2>
            <div className="space-y-3">
              {TOP_EPISODES.map((ep, i) => (
                <a
                  key={i}
                  href={ep.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-3 rounded-xl border border-gray-200 hover:bg-background transition-colors group"
                >
                  <span className="shrink-0 w-8 h-8 rounded-lg bg-red/10 text-red flex items-center justify-center text-sm font-bold">{i + 1}</span>
                  <div className="min-w-0">
                    <span className="block font-semibold text-sm text-navy group-hover:text-red transition-colors">{ep.title}</span>
                    {ep.description && <span className="block text-xs text-gray mt-0.5 line-clamp-2">{ep.description}</span>}
                  </div>
                  <span className="shrink-0 text-gray text-xs ml-auto">&#8599;</span>
                </a>
              ))}
            </div>
          </div>

          {/* Recent Episodes (from RSS) */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-navy mb-4">Recent Episodes</h2>
            <div className="space-y-3">
              {RECENT_EPISODES.map((ep, i) => (
                <a
                  key={i}
                  href={ep.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-3 rounded-xl border border-gray-200 hover:bg-background transition-colors group"
                >
                  <span className="shrink-0 w-8 h-8 rounded-lg bg-red/10 text-red flex items-center justify-center text-sm font-bold">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <span className="block font-semibold text-sm text-navy group-hover:text-red transition-colors">{ep.title}</span>
                    <span className="block text-xs text-gray mt-1">{ep.date} &middot; {ep.duration}</span>
                  </div>
                  <span className="shrink-0 text-gray text-xs ml-auto">&#8599;</span>
                </a>
              ))}
            </div>
          </div>

          {/* Episode Videos */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-navy mb-4">Episode Videos</h2>
            <div className="space-y-4">
              {VIDEO_IDS.map((id) => (
                <div key={id} className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute inset-0 w-full h-full rounded-xl"
                    src={`https://www.youtube.com/embed/${id}`}
                    title="Episode Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Be a Guest Form */}
          <div id="be-a-guest" className="bg-white rounded-2xl border-2 border-red/20 p-6">
            <h2 className="text-lg font-bold text-navy mb-1">Be a Guest on This Podcast</h2>
            <p className="text-gray text-sm mb-5">Have a story to share or expertise to offer? Reach out to appear on The Inside Scoop Podcast.</p>
            <PodcastContactForm />
          </div>

          {/* Social Links */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-navy mb-4">Connect</h2>
            <div className="flex flex-wrap gap-3">
              <a href="https://podcasts.apple.com/us/podcast/the-inside-scoop-with-anytime-soccer-training/id1518478885" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-navy text-sm font-medium hover:bg-background transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                Website
              </a>
              <a href="https://www.facebook.com/groups/anytimesoccerparents" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-navy text-sm font-medium hover:bg-background transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Facebook Group
              </a>
              <a href="https://www.instagram.com/anytimesoccertraining/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-navy text-sm font-medium hover:bg-background transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                Instagram
              </a>
              <a href="https://www.youtube.com/@AnytimeSoccerTraining" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-navy text-sm font-medium hover:bg-background transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                YouTube
              </a>
            </div>
          </div>

          {/* Recommended Resource CTA */}
          <div className="bg-navy rounded-2xl p-6 flex items-center gap-6">
            <div className="flex-1">
              <p className="text-red text-xs font-semibold uppercase tracking-wider mb-1">Recommended Resource</p>
              <h3 className="text-xl font-bold text-white mb-2">Supplement Team Training with 5,000+ Videos</h3>
              <p className="text-white/70 text-sm mb-4">Anytime Soccer Training offers structured follow-along sessions your player can do at home, in the backyard, or at the park.</p>
              <Link href="/pricing" className="inline-flex items-center px-5 py-2.5 rounded-lg bg-red text-white font-semibold text-sm hover:bg-red-dark transition-colors">
                Try It Free &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
