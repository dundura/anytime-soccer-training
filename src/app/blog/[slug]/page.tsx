import { notFound } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';
import type { Metadata } from 'next';
import { getPostBySlug, getAllSlugs, formatDate, getExcerpt } from '@/lib/posts';
import { InternalLinkBlock } from '@/components/internal-link-block';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function buildTOC(html: string): { toc: { id: string; text: string }[]; content: string } {
  const toc: { id: string; text: string }[] = [];
  const usedIds = new Map<string, number>();

  const content = html.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/gi, (match, attrs, inner) => {
    const text = inner.replace(/<[^>]+>/g, '').trim();
    if (!text) return match;
    let id = slugify(text);
    if (usedIds.has(id)) {
      const n = usedIds.get(id)! + 1;
      usedIds.set(id, n);
      id = `${id}-${n}`;
    } else {
      usedIds.set(id, 1);
    }
    toc.push({ id, text });
    return `<h2 id="${id}"${attrs}>${inner}</h2>`;
  });

  return { toc, content };
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };
  const description = post.excerpt
    ? post.excerpt.length > 160 ? post.excerpt.substring(0, 157) + '...' : post.excerpt
    : getExcerpt(post.content, 160);
  const url = `https://www.anytime-soccer.com/blog/${slug}`;
  return {
    title: post.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description,
      siteName: 'Anytime Soccer Training',
      publishedTime: post.date,
      tags: post.tags,
      images: post.featuredImage ? [{ url: post.featuredImage, width: 1200, height: 630, alt: post.title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { toc, content: contentWithIds } = buildTOC(post.content);
  const showTOC = toc.length >= 3;

  return (
    <article className="pt-4 pb-12 bg-background">
      <div className="max-w-3xl mx-auto px-0 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-gray px-4 sm:px-0">
          <Link href="/" className="hover:text-navy transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-navy transition-colors">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-navy">{post.title}</span>
        </nav>

        <div className="bg-white rounded-none sm:rounded-2xl shadow-[0_4px_20px_rgba(15,49,84,0.08)] p-5 sm:p-8 md:p-12">
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
          <p className="text-gray mb-6">{formatDate(post.date)}</p>

          {post.featuredImage && (
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full rounded-xl mb-8 shadow-md object-cover"
              style={{ maxHeight: '420px', objectPosition: 'center 30%' }}
            />
          )}

          {/* Table of Contents — shown for posts with 3+ sections */}
          {showTOC && (
            <nav className="rounded-2xl border border-[#e2eaf2] bg-[#f8fafc] px-6 py-5 mb-8">
              <p className="text-xs font-bold text-[#94a3b8] uppercase tracking-widest mb-3">In this article</p>
              <ol className="space-y-2 list-none m-0 p-0">
                {toc.map(({ id, text }, i) => (
                  <li key={id}>
                    <a href={`#${id}`} className="flex items-start gap-3 group no-underline">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red text-white text-xs font-bold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-[#0f3154] text-[15px] font-medium group-hover:text-red transition-colors leading-snug">
                        {text}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {/* WordPress content — strip leading h1/h2 to avoid duplicate title */}
          <div
            className="wp-content"
            dangerouslySetInnerHTML={{ __html: contentWithIds.replace(/^\s*<h[12][^>]*>[\s\S]*?<\/h[12]>\s*/i, '') }}
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

        {/* Internal links */}
        <InternalLinkBlock categories={post.categories} />

        {/* CTA */}
        <div className="mt-6 bg-navy text-white rounded-none sm:rounded-2xl p-6 sm:p-8 text-center">
          <h3 className="text-xl font-bold mb-2">Ready to improve?</h3>
          <p className="text-white/80 mb-4">Access 5,000+ follow-along training videos.</p>
          <Link href="/pricing" className="bg-red hover:bg-red-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-block">
            Join for Free
          </Link>
        </div>

        <div className="mt-6 mb-4 text-center px-4 sm:px-0">
          <Link href="/blog" className="text-red font-semibold hover:text-red-dark transition-colors">
            &larr; Back to Blog
          </Link>
        </div>
      </div>

      {/* Instagram embed script for posts with Instagram embeds */}
      <Script src="https://www.instagram.com/embed.js" strategy="lazyOnload" />
      {/* Budget calculator — loaded only on posts that contain the calculator widget */}
      {post.content.includes('id="sbc-reg"') && (
        <Script src="/js/soccer-budget-calc.js" strategy="afterInteractive" />
      )}

      {/* JSON-LD Article schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.excerpt || getExcerpt(post.content, 160),
            image: post.featuredImage || '',
            datePublished: post.date,
            dateModified: post.date,
            author: {
              '@type': 'Person',
              name: 'Neil Crawford',
              url: 'https://www.anytime-soccer.com',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Anytime Soccer Training',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.anytime-soccer.com/logo.png',
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://www.anytime-soccer.com/blog/${slug}`,
            },
            keywords: post.tags.join(', '),
          }),
        }}
      />
    </article>
  );
}
