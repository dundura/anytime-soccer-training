import type { Metadata } from 'next';
import Link from 'next/link';

/**
 * The Player Portal used to live here, with its own login and its own set of
 * pages. It now lives inside the app, so this route is a signpost only — it
 * deliberately renders none of the old portal (no login, no Index, no steps),
 * because a second place to sign in was the thing worth removing.
 */

export const metadata: Metadata = {
  title: 'Player Portal has moved | Anytime Soccer Training',
  description: 'The Player Portal now lives inside the Anytime Soccer Training app — sign in and find it under How-To Guide.',
};

const APP_GUIDE_URL = 'https://app.anytime-soccer.com/how-to-guide';
const APP_URL = 'https://app.anytime-soccer.com';

export default function PlayerPortalMovedPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16 sm:py-24">
      <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.14em] text-red">
        Player Portal
      </p>

      <h1 className="text-navy text-3xl font-extrabold leading-tight sm:text-4xl">
        This has moved inside the app
      </h1>

      <p className="text-gray mt-5 text-base leading-relaxed sm:text-lg">
        Everything the Player Portal covered — how to get started, what to train, and
        where to find it — is now part of the app itself. You no longer need a separate
        portal login: sign in once, and it&rsquo;s all in there with your training.
      </p>

      <div className="mt-8 rounded-2xl border border-[#DFE5EE] bg-white p-6 shadow-sm">
        <p className="text-navy text-sm font-extrabold uppercase tracking-wider">
          Where to find it
        </p>
        <p className="text-gray mt-3 text-base leading-relaxed">
          Sign in to the app and open <strong className="text-navy font-semibold">How-To Guide</strong> from
          the menu. Your progress, plans and guide all sit in the same place now.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={APP_GUIDE_URL}
            className="bg-red hover:bg-red-dark inline-flex items-center justify-center rounded-xl px-7 py-3.5 text-base font-extrabold text-white transition-colors"
          >
            Open the guide in the app →
          </a>
          <a
            href={APP_URL}
            className="text-navy hover:border-red hover:text-red inline-flex items-center justify-center rounded-xl border border-[#DFE5EE] bg-white px-7 py-3.5 text-base font-bold transition-colors"
          >
            Sign in to the app
          </a>
        </div>
      </div>

      <p className="text-gray mt-8 text-sm leading-relaxed">
        Don&rsquo;t have an account yet? <Link href="/getting-started" className="text-navy font-semibold underline">Start here</Link>.
        Stuck on anything, email{' '}
        <a href="mailto:megan@anytime-soccer.com" className="text-navy font-semibold underline">
          megan@anytime-soccer.com
        </a>{' '}
        and we&rsquo;ll get you in.
      </p>
    </div>
  );
}
