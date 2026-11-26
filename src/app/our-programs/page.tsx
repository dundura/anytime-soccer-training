import type { Metadata } from 'next';
import Link from 'next/link';

/**
 * Our Programs. This used to render the old WordPress HTML through the catch-all page, but that
 * markup relied on the WordPress theme's Bootstrap CSS, which this site does not load, so it came
 * out unstyled (Neil 2026-11-25). Same words, rebuilt with the site's own styles.
 */

export const metadata: Metadata = {
  title: 'Our Programs',
  description:
    '5,000+ follow-along soccer training videos covering ball mastery, juggling, dribbling, 1v1, passing and more, from absolute beginner to advanced.',
};

const HERO_POINTS = ['Every video is 100% follow-along', 'Every soccer skill is included', 'Set goals and track progress'];

const FEATURES = [
  { title: 'Every video is 100% follow-along', text: 'Hit play one time; videos include demonstrations, verbal instructions, music and timer.' },
  { title: 'Each move has its own dedicated video', text: 'No confusion or frustration. Players can master each skill before moving on.' },
  { title: '5,000+ videos covering everything', text: 'Ball mastery, 1v1, dribbling, passing, finishing and more.' },
  { title: 'Perfect for all ages', text: 'The program goes from absolute beginner to advanced.' },
  { title: '101 fun games and challenges', text: 'Fun games, rewards and skills challenges mean that kids stick with it.' },
  { title: 'It’s free to join', text: 'Annual subscriptions are only $59.98.' },
];

const PROGRAMS = [
  {
    eyebrow: 'Master the Ball',
    title: 'Ball Mastery',
    text: 'Anytime Soccer Training is the most comprehensive ball mastery program in the world.',
    items: ['1,000 Touch Ball Mastery', 'One Cone Ball Mastery', 'Two Cone Ball Mastery', 'Lateral Movement Ball Mastery', 'Dynamic Ball Mastery and more…'],
    video: 'JRfulrCeTlM',
  },
  {
    eyebrow: 'Perfect Aerial Control',
    title: 'Juggling & Aerial Control',
    text: 'Take your juggling record from zero to 1,000 with our step-by-step aerial control program.',
    items: ['Beginner to Advanced Juggling', 'Partner Juggling', 'Tennis Ball & Size One Juggling', 'Aerial Control & Finishing', 'Juggling Challenges and more…'],
    video: 'tascEETaN8A',
  },
  {
    eyebrow: 'Beat Defenders',
    title: 'Dribbling, 1v1 & Finishing',
    text: 'Take on multiple defenders with greater confidence. Our program includes hundreds of dribbling and 1v1 drills.',
    items: ['Freestyle Dribbling', '1v1 Moves & Games', 'Line Cone Dribbling', 'Running with the Ball', '1v1 to Finishing and more…'],
    video: 'l5yHsvwNXfs',
  },
  {
    eyebrow: 'Every Skill Area Included',
    title: 'Thousands More Videos',
    text: 'Anytime Soccer Training is the most comprehensive online training program in the world, and every video is 100% follow-along. Additional areas include:',
    items: ['Wall & Rebounder Passing', 'Partner Passing', 'Soccer tag, chasing, racing & 1v1 games', 'Dynamic Warmup and Stretching', 'Fitness & Agility'],
    video: 'mKefeI8Efs0',
  },
];

const SESSION_POINTS = [
  'Instructions and setup provided',
  '100% follow-along',
  'Slow motion demo & clear voice instructions',
  'Music and timers included in every video',
  'Videos are short with no adverts',
];

const DEMO_URL =
  'https://a360f80d.sibforms.com/serve/MUIFAEaDOdl6ujx14otpRBHCVpH05Kley--cpWODsREmYrDwh13CbgWoM62mJRfEAAHCIV51PgInuTooTcaKXBnNlmbkMtbR3GkMhtbmJIcGX0JqVIi-rlfjIRqRpZzKKXQT9ieML53aMhYclXp-f9qyf9DpQyeNjvOL4LnLRbmC4uFcjomhj5NJ5OZrXxN4IdwfWRW5P11FASoZ';

function Video({ id, title }: { id: string; title: string }) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(15,49,84,0.15)] bg-navy">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        className="w-full aspect-video block"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        title={title}
      />
    </div>
  );
}

function Checks({ items }: { items: string[] }) {
  return (
    <ul className="list-none p-0 m-0 space-y-2.5">
      {items.map((it) => (
        <li key={it} className="flex items-start gap-2.5 text-[15px] md:text-[16px] font-bold text-navy leading-snug">
          <span className="text-red font-bold flex-shrink-0">&#10003;</span>
          {it}
        </li>
      ))}
    </ul>
  );
}

const JoinButton = () => (
  <Link
    href="/pricing"
    className="inline-block bg-red text-white font-bold text-[16px] px-8 py-3.5 rounded-xl shadow-[0_8px_20px_rgba(220,55,62,0.3)] hover:opacity-90 transition-opacity"
  >
    Join for Free
  </Link>
);

export default function OurProgramsPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="py-12 md:py-16 px-4 sm:px-6">
        <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <h1 className="text-[2rem] md:text-[2.6rem] font-bold text-navy leading-tight mb-6">
              Everything You Need in <span className="text-red">One Place</span>
            </h1>
            <div className="mb-8">
              <Checks items={HERO_POINTS} />
            </div>
            <div className="flex flex-wrap gap-3">
              <JoinButton />
              <a
                href={DEMO_URL}
                className="inline-block border-2 border-red text-red font-bold text-[16px] px-8 py-3 rounded-xl hover:bg-red hover:text-white transition-colors"
              >
                Request Team Demo
              </a>
            </div>
          </div>
          <Video id="R__kQPcB2EM" title="Anytime Soccer Training programs" />
        </div>
      </section>

      {/* The only training app */}
      <section className="py-12 md:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-[1.6rem] md:text-[2.2rem] font-bold text-navy text-center leading-tight mb-10">
            <span className="text-red">The Only</span> Training App <span className="text-red">You Will Ever Need</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <div key={f.title} className="bg-background rounded-2xl p-6">
                <h3 className="text-[17px] font-bold text-navy leading-snug mb-2">
                  <span className="text-red mr-1">{i + 1}.</span> {f.title}
                </h3>
                <p className="text-[15px] text-navy/70 leading-relaxed m-0">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-12 md:py-16 px-4 sm:px-6">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-[1.6rem] md:text-[2.2rem] font-bold text-navy text-center leading-tight mb-12">
            5,000+ Videos <span className="text-red">Covering Every Skill from</span> Beginner to Advanced
          </h2>
          <div className="space-y-14 md:space-y-20">
            {PROGRAMS.map((p, i) => (
              <div key={p.title} className="grid md:grid-cols-2 gap-8 lg:gap-14 items-center">
                <div className={i % 2 ? 'md:order-2' : ''}>
                  <p className="text-[13px] font-bold uppercase tracking-[2px] text-red mb-2">{p.eyebrow}</p>
                  <h3 className="text-[1.6rem] md:text-[2rem] font-bold text-navy leading-tight mb-3">{p.title}</h3>
                  <p className="text-[16px] text-navy/70 leading-relaxed mb-5">{p.text}</p>
                  <div className="mb-6">
                    <Checks items={p.items} />
                  </div>
                  <JoinButton />
                </div>
                <div className={i % 2 ? 'md:order-1' : ''}>
                  <Video id={p.video} title={p.title} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Session of the month */}
      <section className="py-12 md:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-[1.6rem] md:text-[2.2rem] font-bold text-navy text-center leading-tight mb-10">
            Training Session <span className="text-red">of the Month</span>
          </h2>
          <div className="grid md:grid-cols-[5fr_7fr] gap-8 lg:gap-14 items-center">
            <div>
              <h3 className="text-[1.4rem] font-bold text-navy mb-3">What’s Included:</h3>
              <p className="text-[16px] text-navy/70 leading-relaxed mb-5">
                With Anytime Soccer Training, parents hit play, players get better and coaches track progress.
              </p>
              <Checks items={SESSION_POINTS} />
            </div>
            <Video id="zULXabRsxco" title="Training session of the month" />
          </div>
        </div>
      </section>
    </div>
  );
}
