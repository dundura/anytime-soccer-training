import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Inside Scoop Podcast',
  description: 'Real talk about youth soccer for parents and coaches who want the truth—not the hype.',
};

export default function PodcastPage() {
  return (
    <>
      <section className="bg-navy text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">The Inside Scoop Podcast</h1>
          <p className="text-xl text-white/80 mb-8">
            Real talk about youth soccer for parents and coaches who want the truth &mdash; not the hype. New episodes weekly.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://podcasts.apple.com" target="_blank" rel="noopener noreferrer" className="bg-red hover:bg-red-dark text-white px-6 py-3 rounded-full font-semibold transition-colors inline-flex items-center gap-2">
              🍎 Apple Podcasts
            </a>
            <a href="https://spotify.com" target="_blank" rel="noopener noreferrer" className="border-2 border-white/30 text-white hover:bg-white/10 px-6 py-3 rounded-full font-semibold transition-colors inline-flex items-center gap-2">
              🎧 Spotify
            </a>
            <a href="https://youtube.com/@anytimesoccertraining" target="_blank" rel="noopener noreferrer" className="border-2 border-white/30 text-white hover:bg-white/10 px-6 py-3 rounded-full font-semibold transition-colors inline-flex items-center gap-2">
              📺 YouTube
            </a>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-navy mb-8 text-center">Browse by Topic</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { title: 'Soccer Club Tips', desc: 'Navigating the club soccer landscape', emoji: '🏟️' },
              { title: 'US Soccer', desc: 'News and insights on American soccer', emoji: '🇺🇸' },
              { title: 'Coaching Tips', desc: 'Guidance for improving coaching practices', emoji: '📋' },
              { title: 'Opinions', desc: 'Commentary on youth soccer topics', emoji: '💬' },
            ].map((topic) => (
              <div key={topic.title} className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{topic.emoji}</div>
                <h3 className="font-bold text-navy mb-1">{topic.title}</h3>
                <p className="text-sm text-gray">{topic.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-navy mb-8 text-center">Episode Collections</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Latest', desc: 'Newest conversations about youth soccer development' },
              { title: 'Interviews', desc: 'Discussions with coaches, players, and youth soccer experts' },
              { title: 'Parent Trainer Tips', desc: 'Episodes designed to help parents support players at home' },
            ].map((collection) => (
              <div key={collection.title} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-navy mb-2">{collection.title}</h3>
                <p className="text-sm text-gray">{collection.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-red text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Training Today</h2>
          <p className="text-lg text-white/90 mb-8">Access 5,000+ follow-along training videos and start improving today.</p>
          <Link href="https://app.anytimesoccertraining.com/register" className="bg-white text-red hover:bg-white/90 px-8 py-3 rounded-lg font-semibold text-lg transition-colors inline-block">
            Join for Free
          </Link>
        </div>
      </section>
    </>
  );
}
