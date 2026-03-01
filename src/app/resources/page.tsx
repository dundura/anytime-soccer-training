import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Soccer Training Resources & Tips',
  description: 'Expert training advice, drills, and resources to help players, parents, and coaches develop better soccer skills at home.',
};

const categories = [
  { icon: '👨‍👩‍👧‍👦', title: 'Parent Tips', desc: 'Help your child love the game and develop faster', href: 'https://anytime-soccer.com/tag/parent-tips/' },
  { icon: '🎯', title: 'Coaching Tips', desc: 'Resources for coaches to develop better players', href: 'https://anytime-soccer.com/tag/coaching/' },
  { icon: '💡', title: 'Youth Soccer Tips', desc: 'Everything you need to know about youth soccer development', href: 'https://anytime-soccer.com/tag/youth-soccer-tips/' },
  { icon: '⚽', title: 'Gear', desc: 'Equipment reviews and recommendations', href: 'https://anytime-soccer.com/tag/gear/' },
];

export default function ResourcesPage() {
  return (
    <>
      {/* FEATURED CONTENT */}
      <section className="pt-10 pb-20 px-5 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-10">
            <span className="text-[13px] font-bold uppercase tracking-[2px] text-red block mb-4">POPULAR RESOURCES</span>
            <h2 className="text-[clamp(28px,4vw,42px)] font-bold text-navy leading-tight">Featured Training Articles</h2>

            <div className="flex items-center justify-center gap-3 mt-8 max-w-[700px] mx-auto flex-wrap">
              <div className="flex-1 min-w-[280px] max-w-[420px] relative">
                <form action="https://anytime-soccer.com/" method="get">
                  <input
                    type="search"
                    name="s"
                    className="w-full py-[18px] px-6 text-base border-2 border-[#e2e8f0] rounded-full outline-none focus:border-red transition-colors"
                    placeholder="Search articles, tips, drills..."
                    aria-label="Search blog posts"
                  />
                  <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-red text-white border-none py-3 px-7 rounded-full font-bold cursor-pointer hover:bg-red-dark transition-colors">
                    Search
                  </button>
                </form>
              </div>
              <a
                href="https://anytime-soccer.com/category/blog/"
                className="bg-red text-white! font-bold text-sm py-3 px-7 rounded-full no-underline hover:bg-red-dark transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(220,55,62,0.35)] hover:shadow-[0_6px_25px_rgba(220,55,62,0.45)] whitespace-nowrap inline-block"
              >
                View All Posts →
              </a>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { label: 'GETTING STARTED', title: 'New to Home Training?', desc: 'Everything you need to know to start training at home effectively.', href: 'https://anytime-soccer.com/tag/getting-started/', cta: 'Read Articles →' },
              { label: 'TRAINING TIPS', title: 'Top Training Tips', desc: 'Our most-read articles on improving soccer skills at home.', href: 'https://anytime-soccer.com/tag/training-tips/', cta: 'See Popular Posts →' },
              { label: 'INSIGHTS', title: 'Insights', desc: 'Perspectives on youth soccer development, parenting, and the journey.', href: 'https://anytime-soccer.com/tag/insights/', cta: 'Read Insights →' },
            ].map((card) => (
              <div key={card.label} className="bg-white rounded-2xl py-8 px-6 shadow-[0_4px_20px_rgba(15,49,84,0.08)] hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(15,49,84,0.12)] transition-all">
                <span className="text-[13px] font-bold uppercase tracking-[2px] text-red block mb-4">{card.label}</span>
                <h3 className="text-[22px] font-bold text-navy mb-3 leading-tight">{card.title}</h3>
                <p className="text-[#64748b] text-[15px] mb-4">{card.desc}</p>
                <a
                  href={card.href}
                  className="bg-red text-white! font-bold text-base py-4 px-8 rounded-full no-underline hover:bg-red-dark transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(220,55,62,0.35)] hover:shadow-[0_6px_25px_rgba(220,55,62,0.45)] inline-block mt-4"
                >
                  {card.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BROWSE BY CATEGORY */}
      <section className="py-20 px-5 bg-background">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <span className="text-[13px] font-bold uppercase tracking-[2px] text-red block mb-4">FIND WHAT YOU NEED</span>
            <h2 className="text-[clamp(28px,4vw,42px)] font-bold text-navy leading-tight mb-5">Browse Training Resources by Topic</h2>
            <p className="text-lg text-navy max-w-[600px] mx-auto">
              Click any category below to explore articles, videos, and tips.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <a
                key={cat.title}
                href={cat.href}
                className="bg-white rounded-2xl py-8 px-6 shadow-[0_4px_20px_rgba(15,49,84,0.08)] hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(15,49,84,0.12)] transition-all block text-center no-underline"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-red to-[#ff4d56] rounded-[20px] flex items-center justify-center text-[40px] mx-auto mb-5">
                  {cat.icon}
                </div>
                <h3 className="text-[22px] font-bold text-navy mb-3">{cat.title}</h3>
                <p className="text-[15px] text-navy mb-4">{cat.desc}</p>
                <span className="text-red font-bold text-[15px]">View Articles →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* HERO SECTION WITH SEARCH */}
      <section className="py-20 px-5 pb-16 bg-white">
        <div className="max-w-[1200px] mx-auto text-center">
          <div className="bg-background rounded-[20px] py-10 px-6 md:py-16 md:px-10 shadow-[0_4px_30px_rgba(15,49,84,0.1)] max-w-[900px] mx-auto">
            <h1 className="text-[clamp(36px,5vw,56px)] font-bold text-navy leading-tight">
              Soccer Training Resources <span className="text-red">&amp; Tips</span>
            </h1>
            <p className="text-xl text-navy max-w-[700px] mx-auto mt-5 mb-10">
              Expert training advice, drills, and resources to help players, parents, and coaches develop better skills at home.
            </p>

            <div className="max-w-[600px] mx-auto relative">
              <form action="https://anytime-soccer.com/" method="get">
                <input
                  type="search"
                  name="s"
                  className="w-full py-[18px] px-6 text-base border-2 border-[#e2e8f0] rounded-full outline-none focus:border-red transition-colors"
                  placeholder="Search training tips, drills, techniques..."
                  aria-label="Search blog posts"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-red text-white border-none py-3 px-7 rounded-full font-bold cursor-pointer hover:bg-red-dark transition-colors">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 px-5 bg-gradient-to-b from-background to-white text-center">
        <div className="max-w-[700px] mx-auto">
          <h2 className="text-[clamp(28px,4vw,42px)] font-bold text-navy leading-tight mb-5">Ready to Start Training?</h2>
          <p className="text-xl text-[#64748b] mb-8">
            Access 5,000+ follow-along training videos and start improving today.
          </p>
          <Link
            href="/pricing"
            className="bg-red text-white! font-bold text-lg py-4 px-8 rounded-full no-underline hover:bg-red-dark transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(220,55,62,0.35)] hover:shadow-[0_6px_25px_rgba(220,55,62,0.45)] inline-block"
          >
            Join for Free →
          </Link>
        </div>
      </section>
    </>
  );
}
