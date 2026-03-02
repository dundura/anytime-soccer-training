import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getPageBySlug, getCatchAllSlugs } from '@/lib/pages';

export async function generateStaticParams() {
  return getCatchAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageBySlug(slug);
  if (!page) return { title: 'Page Not Found' };
  return { title: page.title };
}

export default async function CatchAllPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getPageBySlug(slug);
  if (!page) notFound();

  const hasOwnLayout = /class="(ast-(ebook|team-access|aerial|profile|youth-soccer|showcase|recruiting|offball|pyramid|training-landing|dribbling|teamcode|onboarding|agenda|homework|account|team[ "]|7day|leadmagnet|yt-library|video-library|form-section)|checklist-container)/.test(page.content);

  if (hasOwnLayout) {
    return (
      <article>
        <div
          className="wp-content"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </article>
    );
  }

  return (
    <article className="py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="mb-6 text-sm text-gray">
          <Link href="/" className="hover:text-navy transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-navy">{page.title}</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-navy mb-8">{page.title}</h1>

        {page.featuredImage && (
          <img src={page.featuredImage} alt={page.title} className="w-full rounded-xl mb-8 shadow-md" />
        )}

        <div
          className="wp-content prose max-w-none"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />

        <div className="mt-12 bg-navy text-white rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold mb-2">Ready to start training?</h3>
          <p className="text-white/80 mb-4">Access 5,000+ follow-along training videos.</p>
          <Link href="/pricing" className="bg-red hover:bg-red-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-block">
            Join for Free
          </Link>
        </div>
      </div>
    </article>
  );
}
