import type { Metadata } from 'next';
import MailingListForm from '@/components/MailingListForm';

export const metadata: Metadata = {
  title: 'Join the Mailing List | Anytime Soccer Training',
  description:
    'Soccer training tips, drills and updates from Anytime Soccer Training, sent to your inbox.',
  openGraph: {
    title: 'Join the Mailing List | Anytime Soccer Training',
    description:
      'Soccer training tips, drills and updates from Anytime Soccer Training, sent to your inbox.',
  },
};

/**
 * The mailing list signup.
 *
 * Its own page rather than the old link to the 7-day challenge: somebody
 * clicking "Join Mailing List" is asking for the list, and sending them to a
 * different lead magnet answers a question they did not ask.
 *
 * Signups land in the evergreen sequence.
 */
export default function JoinMailingListPage() {
  return (
    <div className="py-14 sm:py-20 px-4">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-red mb-4">Anytime Soccer Training</p>
          <h1 className="text-3xl sm:text-[42px] font-bold text-navy leading-[1.15] mb-5">
            Welcome to our newsletter
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Soccer training tips, drills and updates, sent straight to your inbox.
          </p>
        </div>

        <MailingListForm />
      </div>
    </div>
  );
}
