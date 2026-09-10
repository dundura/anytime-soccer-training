import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Unsubscribed | Anytime Soccer Training',
  description: 'You have been removed from the Anytime Soccer Training mailing list.',
  robots: { index: false, follow: false },
};

/**
 * Where the unsubscribe link lands.
 *
 * The API does the work before it redirects here, so by the time this page
 * renders the person is already off the list. It had no page to land on,
 * which is the worst possible way for an unsubscribe to fail: it had actually
 * worked, and a 404 told them it had not — so they replied to the email
 * instead and we heard about it by hand.
 *
 * Says it plainly, gives the way back for a mis-click, and does not ask for a
 * reason. Somebody who has just asked to be left alone is not the person to
 * put a survey in front of.
 */
export default function UnsubscribedPage() {
  return (
    <div className="py-20 sm:py-28 px-4">
      <div className="max-w-lg mx-auto text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-red mb-4">Mailing List</p>
        <h1 className="text-3xl sm:text-[40px] font-bold text-navy leading-[1.15] mb-5">
          You&rsquo;re unsubscribed.
        </h1>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-3">
          You won&rsquo;t get any more newsletter emails from us. Nothing else to do.
        </p>
        <p className="text-sm text-gray-500 leading-relaxed mb-10">
          Emails about your own team or account are separate and still come through.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-block bg-navy hover:bg-navy/90 text-white font-bold py-3 px-8 rounded-xl transition-colors"
          >
            Back to the site
          </Link>
          <Link
            href="/join-mailing-list"
            className="inline-block border-2 border-gray-200 hover:border-gray-300 text-navy font-bold py-3 px-8 rounded-xl transition-colors"
          >
            Unsubscribed by mistake?
          </Link>
        </div>
      </div>
    </div>
  );
}
