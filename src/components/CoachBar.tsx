import Link from 'next/link';

export default function CoachBar() {
  return (
    <div className="bg-background pb-4 -mt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy rounded-2xl py-6 px-6 md:px-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
          <img
            src="https://media.anytime-soccer.com/wp-content/uploads/2026/03/pacific_quote_photo.png"
            alt="Coach"
            className="w-[70px] h-[70px] rounded-full object-cover flex-shrink-0 hidden md:block"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-bold text-lg mb-2">&#127942; Built for Coaches &amp; Clubs</h3>
            <ul className="list-none p-0 m-0 grid sm:grid-cols-2 gap-x-6 gap-y-1">
              <li className="text-white/90 text-sm">&#10004; Assign homework to every player</li>
              <li className="text-white/90 text-sm">&#10004; Track progress in real time</li>
              <li className="text-white/90 text-sm">&#10004; Create team competitions</li>
              <li className="text-white/90 text-sm">&#10004; Only <strong className="text-[#22C55E]">$6 per player per year</strong> — coaches always free</li>
            </ul>
          </div>
          <Link
            href="/team-demo-request-anytime-soccer-training"
            className="bg-red hover:bg-red-dark text-white px-6 py-3 rounded-full font-bold text-sm transition-all whitespace-nowrap flex-shrink-0 text-center"
          >
            Request Team Demo &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
