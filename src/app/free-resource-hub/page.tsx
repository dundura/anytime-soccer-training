import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Resources — Anytime Soccer Training',
  description: 'Free training plans, ebooks, calculators, and community groups for soccer players, parents, and coaches.',
  openGraph: {
    images: ['https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1779461643370-zk99k2.png'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1779461643370-zk99k2.png'],
  },
};

const TRAINING_PLANS = [
  {
    title: '7-Day Training Plan',
    description: 'See results in just one week. Short daily sessions your player can do in 10 minutes or less.',
    image: 'https://media.anytime-soccer.com/wp-content/themes/anytime/images/about/new-chalange-image.png',
    href: '/blog/free-7-day-soccer-skills-challenge',
    cta: 'Get Free Plan',
  },
  {
    title: '30-Day Training Plan',
    description: 'A personalized training schedule based on your player\'s skill level. Step-by-step videos delivered daily.',
    gradient: true,
    gradientContent: { big: 'FREE 30-DAY', small: 'Training Plan' },
    href: '/free-30-day-training-plan',
    cta: 'Get Free Plan',
  },
  {
    title: '100+ YouTube Video Library',
    description: 'Curated YouTube drills organized by age group (U6–Advanced). Just click and train!',
    gradient: true,
    gradientContent: { big: '100+', small: 'YouTube Videos' },
    href: '/free-soccer-training-videos-100-youtube-drills-by-age-group',
    cta: 'Download Free',
  },
];

const EBOOKS = [
  {
    title: 'The Most Important Skill Never Taught',
    description: 'This powerful (yet simple) tip will change your child\'s game forever.',
    image: 'https://media.anytime-soccer.com/wp-content/uploads/2021/01/ast_facebook_image_3.jpg',
    href: '/the-most-important-skill-in-youth-soccer',
  },
  {
    title: 'Must-Have Guide to In-Home Training',
    description: 'Everything you need to know to start training at home effectively.',
    image: 'https://media.anytime-soccer.com/wp-content/themes/anytime/images/home/bg-1.png',
    href: '/must-have-guide-for-serious-soccer-parents',
  },
  {
    title: '20 Questions for Every Club',
    description: 'Essential questions to ask before joining any youth soccer club.',
    image: 'https://media.anytime-soccer.com/wp-content/themes/anytime/images/ebook/ebook-1.png',
    href: '/20-questions-every-parent-should-ask',
  },
  {
    title: 'Become a Rec Coach SuperHero',
    description: 'Transform your rec coaching with practical tips and strategies.',
    image: 'https://media.anytime-soccer.com/wp-content/themes/anytime/images/ebook/ebook-2.png',
    href: '/become-a-rec-coach-superhero',
    cta: 'Get Guide',
  },
  {
    title: 'Everything About Guest Playing',
    description: 'Navigate guest playing opportunities like a pro.',
    image: 'https://media.anytime-soccer.com/wp-content/themes/anytime/images/ebook/ebook-3.png',
    href: '/everything-you-need-to-know-about-guest-playing',
  },
  {
    title: 'Monopoly: Issues Facing US Youth Soccer',
    description: 'A candid look at what\'s holding back American soccer from one parent\'s perspective.',
    image: 'https://media.anytime-soccer.com/wp-content/uploads/2024/07/us_soccer-768x596.png',
    href: '/monopoly-addressing-issues-facing-youth-soccer-ebook',
  },
  {
    title: 'The Parent Trainer\'s Playbook',
    description: '20 unconventional tips for raising a competitive soccer player from one soccer dad\'s journey.',
    image: 'https://media.anytime-soccer.com/wp-content/uploads/2024/08/the-playbook-20-unconventional-tips-for-raising-a-compeitive-soccer-player-thus-far-1024x789.png',
    href: '/the-parent-trainers-playbook',
  },
  {
    title: 'Player Cards Guide',
    description: 'Stay informed about eligibility requirements and avoid missed tournament opportunities.',
    image: 'https://media.anytime-soccer.com/wp-content/uploads/2024/11/pro-tips-for-college-showcases-1.png',
    href: '/everything-you-need-to-know-about-player-cards',
  },
];

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

export default function FreeResourceHubPage() {
  return (
    <>
      {/* ===== TRAINING PLANS ===== */}
      <section className="pt-10 pb-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-[2px] text-red mb-4 block">TRAINING PLANS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-3">Free Training Plans</h2>
            <p className="text-lg text-navy max-w-xl mx-auto">
              Structured plans delivered to your inbox. Just press play and train.
            </p>
          </div>

          {/* 7-Day Plan — horizontal banner */}
          <Link
            href={TRAINING_PLANS[0].href}
            className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(15,49,84,0.08)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(15,49,84,0.12)] transition-all block mb-6"
          >
            <div className="grid md:grid-cols-[320px_1fr] gap-0 items-stretch">
              <div className="aspect-[16/10] md:aspect-auto rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none overflow-hidden">
                <img src={TRAINING_PLANS[0].image!} alt={TRAINING_PLANS[0].title} className="w-full h-full object-cover" />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-bold text-navy mb-3">{TRAINING_PLANS[0].title}</h3>
                <p className="text-gray text-base md:text-lg mb-6">{TRAINING_PLANS[0].description}</p>
                <span className="bg-red hover:bg-red-dark text-white font-bold py-4 px-8 rounded-full text-base shadow-[0_4px_20px_rgba(220,55,62,0.35)] transition-all self-start">
                  {TRAINING_PLANS[0].cta} &rarr;
                </span>
              </div>
            </div>
          </Link>

          {/* Remaining plans — 3-column grid with plan builder first */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Free Training Plan Builder */}
            <Link
              href="/free-training-plan"
              className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(15,49,84,0.08)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(15,49,84,0.12)] transition-all flex flex-col text-center"
            >
              <div className="w-full aspect-[16/10] rounded-xl overflow-hidden mb-5 bg-background">
                <img src="https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1778974402995-sa4a36.png" alt="Free Plan Builder" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">Free Training Plan</h3>
              <p className="text-gray text-[15px] mb-5 flex-1">Pick your skill areas, set your schedule, and get a custom PDF plan emailed to you in 60 seconds.</p>
              <span className="bg-red hover:bg-red-dark text-white font-bold py-4 px-8 rounded-full text-base shadow-[0_4px_20px_rgba(220,55,62,0.35)] transition-all w-full text-center">
                Build Free Plan &rarr;
              </span>
            </Link>

            {TRAINING_PLANS.slice(1).map((plan) => (
              <Link
                key={plan.title}
                href={plan.href}
                className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(15,49,84,0.08)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(15,49,84,0.12)] transition-all flex flex-col text-center"
              >
                <div className="w-full aspect-[16/10] rounded-xl overflow-hidden mb-5 bg-background">
                  {plan.image ? (
                    <img src={plan.image} alt={plan.title} className="w-full h-full object-cover" />
                  ) : plan.gradient ? (
                    <div className="w-full h-full bg-gradient-to-br from-[#0f2642] to-[#1e3a5f] flex items-center justify-center">
                      <div className="text-center text-white p-5">
                        <div className="text-3xl font-extrabold leading-tight">{plan.gradientContent?.big.split(' ').map((word, i) => (
                          <span key={i}>{i > 0 && ' '}<span className={word === '30-DAY' || word === '100+' ? 'text-red' : ''}>{word === '100+' ? <>100<span className="text-red">+</span></> : word}</span></span>
                        ))}</div>
                        <div className="text-sm uppercase tracking-[2px] opacity-80 mt-1">{plan.gradientContent?.small}</div>
                      </div>
                    </div>
                  ) : null}
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">{plan.title}</h3>
                <p className="text-gray text-[15px] mb-5 flex-1">{plan.description}</p>
                <span className="bg-red hover:bg-red-dark text-white font-bold py-4 px-8 rounded-full text-base shadow-[0_4px_20px_rgba(220,55,62,0.35)] transition-all w-full text-center">
                  {plan.cta || 'Download'} &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CALCULATORS ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">

            {/* Club Budget Calculator */}
            <Link
              href="/soccer-club-cost-calculator"
              className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(15,49,84,0.08)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(15,49,84,0.12)] transition-all block"
            >
              <div className="flex flex-col items-center p-8 md:p-10 text-center h-full">
                <div className="w-full aspect-[16/9] rounded-xl overflow-hidden mb-6">
                  <img src="https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1779461643370-zk99k2.png" alt="Club Budget Calculator" className="w-full h-full object-cover" />
                </div>
                <span className="text-sm font-bold uppercase tracking-[2px] text-red mb-3 block">CALCULATOR</span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-navy mb-4 leading-tight">Free Club Budget Calculator</h3>
                <p className="text-base md:text-lg text-gray mb-6 flex-1">Find out exactly what it costs to run a youth soccer club — coaching, facilities, insurance, and more. Get a free PDF report.</p>
                <span className="bg-red text-white font-bold py-4 px-8 rounded-full text-base shadow-[0_4px_20px_rgba(220,55,62,0.35)] inline-block w-full text-center">
                  Open Calculator &rarr;
                </span>
              </div>
            </Link>

            {/* Age Group Calculator */}
            <Link
              href="/calculator"
              className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(15,49,84,0.08)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(15,49,84,0.12)] transition-all block"
            >
              <div className="flex flex-col items-center p-8 md:p-10 text-center h-full">
                <div className="w-full aspect-[16/9] rounded-xl overflow-hidden mb-6">
                  <img src="https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1779479187840-js2usr.png" alt="Age Group Calculator" className="w-full h-full object-cover" />
                </div>
                <span className="text-sm font-bold uppercase tracking-[2px] text-red mb-3 block">CALCULATOR</span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-navy mb-4 leading-tight">Free Age Group Calculator</h3>
                <p className="text-base md:text-lg text-gray mb-6 flex-1">Find the correct U6, U8, U10 age group for any season. Get instant results for all three formation cycles.</p>
                <span className="bg-red text-white font-bold py-4 px-8 rounded-full text-base shadow-[0_4px_20px_rgba(220,55,62,0.35)] inline-block w-full text-center">
                  Calculate Age Group &rarr;
                </span>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* ===== EBOOKS ===== */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-[2px] text-red mb-4 block">EBOOKS &amp; GUIDES</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-3">Free Ebooks for Parents &amp; Coaches</h2>
            <p className="text-lg text-navy max-w-xl mx-auto">
              Practical guides packed with tips from a passionate soccer parent and coach.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {EBOOKS.map((ebook) => (
              <Link
                key={ebook.title}
                href={ebook.href}
                className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(15,49,84,0.08)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(15,49,84,0.12)] transition-all flex flex-col text-center"
              >
                <div className="w-full aspect-[16/10] rounded-xl overflow-hidden mb-5 bg-background">
                  <img src={ebook.image} alt={ebook.title} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">{ebook.title}</h3>
                <p className="text-gray text-[15px] mb-5 flex-1">{ebook.description}</p>
                <span className="bg-red text-white font-bold py-4 px-8 rounded-full text-base shadow-[0_4px_20px_rgba(220,55,62,0.35)] w-full text-center">
                  {ebook.cta || 'Download'} &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COMMUNITY ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
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

      {/* ===== FINAL CTA ===== */}
      <section className="bg-navy py-20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready for the Full Training Experience?</h2>
          <p className="text-xl text-white/90 mb-8">Access 5,000+ follow-along training videos and take your player&rsquo;s development to the next level.</p>
          <Link href="/pricing" className="bg-white text-navy hover:bg-background font-bold py-4 px-10 rounded-full text-lg transition-all inline-block hover:-translate-y-0.5">
            Join for Free &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
