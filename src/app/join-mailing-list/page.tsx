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

        {/* What each reader actually gets. The old list answered the three
            objections to any signup form but never said what was in it, which
            is the thing somebody is deciding on. */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {[
            {
              who: 'If you are a parent',
              lines: [
                'Drills your child can follow at home without you coaching them',
                'What to look for in a club, and what to ask before you sign',
                'How to keep them improving without taking the fun out of it',
              ],
            },
            {
              who: 'If you are a coach',
              lines: [
                'Sessions you can set as homework between practices',
                'Ways to see who is actually doing the work',
                'What other coaches are running, and what is working',
              ],
            },
          ].map((group) => (
            <div key={group.who}>
              <p className="text-[13px] font-bold uppercase tracking-wide text-navy mb-3">{group.who}</p>
              <ul className="space-y-2.5">
                {group.lines.map((line) => (
                  <li key={line} className="flex items-start gap-2.5 text-[15px] text-gray-600">
                    <span className="text-red font-bold leading-6">&#10003;</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Exactly what happens next, because a signup that does not say is a
            signup people hesitate over. */}
        <p className="mt-8 text-center text-sm text-gray-500 max-w-sm mx-auto">
          You will get one thank-you email straight away, then about one a month.
          Leave in one click, whenever you like.
        </p>
      </div>
    </div>
  );
}
