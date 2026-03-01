import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Soccer training resources, articles, tips and guides for players, parents, and coaches.',
};

export default function ResourcesPage() {
  return (
    <>
      <section className="bg-navy text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Resources</h1>
          <p className="text-lg text-white/80">Tips, drills, and advice for players, parents, and coaches.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {[
              { title: 'Getting Started', desc: 'Everything you need to know to start training at home effectively.', href: '/blog?category=Blog', cta: 'Read Articles' },
              { title: 'Training Tips', desc: 'Our most-read articles on improving soccer skills at home.', href: '/blog?category=Tips', cta: 'See Popular Posts' },
              { title: 'Insights', desc: 'Perspectives on youth soccer development, parenting, and the journey.', href: '/blog?category=Blog', cta: 'Read Insights' },
              { title: 'All Articles', desc: 'Browse our complete library of soccer training content.', href: '/blog', cta: 'View All Posts' },
            ].map((section) => (
              <Link key={section.title} href={section.href} className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow block">
                <h2 className="text-xl font-bold text-navy mb-2">{section.title}</h2>
                <p className="text-gray mb-4">{section.desc}</p>
                <span className="text-red font-semibold text-sm">{section.cta} &rarr;</span>
              </Link>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-navy mb-8 text-center">Browse by Topic</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Parent Tips', desc: 'Help your child love the game and develop faster' },
              { title: 'Coaching Tips', desc: 'Resources for coaches to develop better players' },
              { title: 'Youth Soccer Tips', desc: 'Everything about youth soccer development' },
              { title: 'Gear', desc: 'Equipment reviews and recommendations' },
            ].map((topic) => (
              <Link key={topic.title} href="/blog" className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow block">
                <h3 className="font-bold text-navy mb-1">{topic.title}</h3>
                <p className="text-sm text-gray">{topic.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Access 5,000+ Follow-Along Training Videos</h2>
          <p className="text-lg text-white/80 mb-8">Start improving today.</p>
          <Link href="/pricing" className="bg-red hover:bg-red-dark text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors inline-block">
            Join for Free
          </Link>
        </div>
      </section>
    </>
  );
}
