import { notFound } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';
import type { Metadata } from 'next';
import { getPostBySlug, getAllSlugs, formatDate, getExcerpt } from '@/lib/posts';

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.title,
    description: getExcerpt(post.content, 160),
    openGraph: {
      title: post.title,
      description: getExcerpt(post.content, 160),
      images: post.featuredImage ? [{ url: post.featuredImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: getExcerpt(post.content, 160),
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="pt-4 pb-12 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-gray">
          <Link href="/" className="hover:text-navy transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-navy transition-colors">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-navy">{post.title}</span>
        </nav>

        <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(15,49,84,0.08)] p-8 md:p-12">
          {/* Categories */}
          {post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((cat) => (
                <span key={cat} className="text-xs font-bold text-red uppercase tracking-wider bg-red/10 px-3 py-1 rounded-full">
                  {cat}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4">{post.title}</h1>
          <p className="text-gray mb-8">{formatDate(post.date)}</p>

          {/* WordPress content — strip leading h1/h2 to avoid duplicate title */}
          <div
            className="wp-content prose max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content.replace(/^\s*<h[12][^>]*>.*?<\/h[12]>\s*/i, '') }}
          />

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-background text-navy px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="mt-8 bg-navy text-white rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold mb-2">Ready to improve?</h3>
          <p className="text-white/80 mb-4">Access 5,000+ follow-along training videos.</p>
          <Link href="/pricing" className="bg-red hover:bg-red-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-block">
            Join for Free
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Link href="/blog" className="text-red font-semibold hover:text-red-dark transition-colors">
            &larr; Back to Blog
          </Link>
        </div>
      </div>

      {/* Instagram embed script for posts with Instagram embeds */}
      <Script src="https://www.instagram.com/embed.js" strategy="lazyOnload" />
    </article>
  );
}
