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
            I had no soccer background and two sons falling behind. What I worked out over the next decade is
            what I send here: drills that work at home, and the things I wish somebody had told me sooner.
          </p>
        </div>

        <MailingListForm />

        {/* Three lines, because the objection to any signup form is always the
            same three questions: how often, is it worth reading, and can I get
            out again. */}
        <ul className="mt-8 space-y-2.5 max-w-sm mx-auto">
          {[
            'A short email when there is something worth sending',
            'Written by a parent, not a marketing team',
            'Leave in one click, whenever you like',
          ].map((line) => (
            <li key={line} className="flex items-start gap-2.5 text-[15px] text-gray-600">
              <span className="text-red font-bold leading-6">&#10003;</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
