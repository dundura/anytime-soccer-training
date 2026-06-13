import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Follow Us — Communities & Social',
  description:
    'Join our free Facebook communities for soccer parents and coaches, and follow Anytime Soccer Training on Instagram, YouTube, TikTok, and the podcast.',
};

const COMMUNITIES = [
  {
    title: 'Anytime Soccer Training Group',
    description: 'A safe space for soccer parents to ask questions, share wins, and support each other.',
    image: 'https://media.anytime-soccer.com/wp-content/uploads/2021/04/anytime_facebook_group_770_445.jpg',
    href: 'https://www.facebook.com/groups/anytimesoccerparents',
  },
  {
    title: 'Youth Soccer Coach Group',
    description: 'Tips, resources, and support for youth soccer coaches at every level.',
    image: 'https://media.anytime-soccer.com/wp-content/uploads/2021/04/youth_soccer_coach_770_445.jpg',
    href: 'https://www.facebook.com/groups/youthsoccercoach',
  },
  {
    title: 'Guest Player Opportunities',
    description: 'Find and post guest playing opportunities. Get your player on the field.',
    image: 'https://media.anytime-soccer.com/wp-content/uploads/2021/04/youth_soccer_guest_players_770_445.jpg',
    href: 'https://www.facebook.com/groups/guestplayers',
  },
];

const CHANNELS = [
  {
    name: 'Instagram',
    emoji: '📸',
    handle: '@anytimesoccertraining',
    description: 'Training clips, player highlights, and daily motivation.',
    href: 'https://www.instagram.com/anytimesoccertraining',
    cta: 'Follow on Instagram',
  },
  {
    name: 'YouTube',
    emoji: '▶️',
    handle: '@anytimesoccertraining',
    description: 'Free follow-along training videos and program previews.',
    href: 'https://www.youtube.com/@anytimesoccertraining',
    cta: 'Subscribe on YouTube',
  },
  {
    name: 'TikTok',
    emoji: '🎵',
    handle: '@anytimesoccertraining',
    description: 'Quick skills, drills, and behind-the-scenes fun.',
    href: 'https://www.tiktok.com/@anytimesoccertraining',
    cta: 'Follow on TikTok',
  },
  {
    name: 'The Podcast',
    emoji: '🎙️',
    handle: 'Anytime Soccer Training Podcast',
    description: 'Conversations on player development for parents and coaches.',
    href: '/podcast',
    cta: 'Listen to the Podcast',
    internal: true,
  },
];

export default function FollowUsPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-navy pt-14 pb-12 relative overflow-hidden">
        <div
          className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-[radial-gradient(circle,rgba(220,55,62,0.13)_0%,transparent_65%)] pointer-events-none"
          aria-hidden
        />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">Follow Us</h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto">
            Join the conversation — free communities, daily training content, and the podcast.
          </p>
        </div>
      </section>

      {/* Communities */}
      <section className="pt-14 pb-10 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[2px] text-red mb-4 block">COMMUNITY</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-3">Join Our Free Communities</h2>
            <p className="text-lg text-navy max-w-xl mx-auto">
              Connect with thousands of parents and coaches navigating the youth soccer journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {COMMUNITIES.map((group) => (
              <a
                key={group.title}
                href={group.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(15,49,84,0.08)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(15,49,84,0.12)] transition-all block"
              >
                <div className="w-full aspect-video overflow-hidden">
                  <img src={group.image} alt={group.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-bold text-navy mb-3">{group.title}</h3>
                  <p className="text-sm text-gray mb-4">{group.description}</p>
                  <span className="bg-red text-white font-bold py-4 px-8 rounded-full text-base shadow-[0_4px_20px_rgba(220,55,62,0.35)] w-full text-center block">
                    Join Group &rarr;
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Social channels */}
      <section className="pt-6 pb-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[2px] text-red mb-4 block">SOCIAL</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-3">Follow Along Everywhere</h2>
            <p className="text-lg text-navy max-w-xl mx-auto">
              Free training content, every day, on your favorite platform.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CHANNELS.map((ch) => (
              <a
                key={ch.name}
                href={ch.href}
                {...(ch.internal ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                className="bg-white rounded-2xl p-7 text-center shadow-[0_4px_20px_rgba(15,49,84,0.08)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(15,49,84,0.12)] transition-all block"
              >
                <div className="text-4xl mb-3">{ch.emoji}</div>
                <h3 className="text-lg font-bold text-navy mb-1">{ch.name}</h3>
                <p className="text-xs text-gray font-semibold mb-3">{ch.handle}</p>
                <p className="text-sm text-gray mb-5">{ch.description}</p>
                <span className="bg-navy text-white font-bold py-3 px-5 rounded-full text-sm w-full text-center block">
                  {ch.cta} &rarr;
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
