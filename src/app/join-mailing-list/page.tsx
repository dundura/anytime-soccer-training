import type { Metadata } from 'next';
import MailingListForm from '@/components/MailingListForm';

export const metadata: Metadata = {
  title: 'Join the Mailing List | Anytime Soccer Training',
  description:
    'Training tips, new drills and what actually works at home — from a soccer dad who had to figure it out the hard way.',
  openGraph: {
    title: 'Join the Mailing List | Anytime Soccer Training',
    description:
      'Training tips, new drills and what actually works at home — from a soccer dad who had to figure it out the hard way.',
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
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
          Get better with your player.
        </h1>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-10">
          Training tips, new drills, and what actually works at home — from a soccer dad who had to figure it
          out the hard way. No spam, and you can leave whenever you like.
        </p>

        <MailingListForm />
      </div>
    </div>
  );
}
