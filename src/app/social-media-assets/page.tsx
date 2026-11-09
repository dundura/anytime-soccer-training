import type { Metadata } from 'next';
import { COMMUNITIES } from '@/lib/communities';

export const metadata: Metadata = {
  title: 'Our Social Media Communities — Anytime Soccer Training',
  description: 'The free Facebook communities Anytime Soccer Training shares to: coaches, parents and guest players.',
};

export default function SocialMediaAssetsPage() {
  return (
    <section className="pt-12 md:pt-20 pb-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-3">Join Our Free Communities</h1>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
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
                <h2 className="text-lg font-bold text-navy mb-3">{group.title}</h2>
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
  );
}
