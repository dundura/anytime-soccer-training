import type { Metadata } from 'next';
import MailingListForm from '@/components/MailingListForm';

export const metadata: Metadata = {
  title: 'Join the Mailing List | Anytime Soccer Training',
  description:
    'Drills that work at home, and the things I wish somebody had told me sooner. From a soccer dad who had to work it out.',
  openGraph: {
    title: 'Join the Mailing List | Anytime Soccer Training',
    description:
      'Drills that work at home, and the things I wish somebody had told me sooner. From a soccer dad who had to work it out.',
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
          <p className="text-xs font-bold uppercase tracking-widest text-red mb-4">The Newsletter</p>
          <h1 className="text-3xl sm:text-[42px] font-bold text-navy leading-[1.15] mb-5">
            Ten minutes a day beats talent.
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            I had no soccer background and two sons falling behind. It took me ten years to work out what
            actually helps. Now I send it to you: drills you can do at home, and the things I wish someone had
            told me sooner.
          </p>
        </div>

        <MailingListForm />
      </div>
    </div>
  );
}
