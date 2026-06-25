import Link from 'next/link';

export default function CoachBar() {
  return (
    <div className="bg-background pb-4 -mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop: image */}
        <Link href="/team-demo-request-anytime-soccer-training" className="hidden md:block">
          <img
            src="https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1782411287448-5m1o37.png"
            alt="Built for Coaches & Clubs"
            className="w-full rounded-2xl object-cover"
          />
        </Link>

        {/* Mobile: original bar */}
        <div className="md:hidden bg-navy rounded-2xl py-6 px-6 flex flex-col gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-bold text-lg mb-2">&#127942; Built for Coaches &amp; Clubs</h3>
            <ul className="list-none p-0 m-0 grid sm:grid-cols-2 gap-x-6 gap-y-1">
              <li className="text-white/90 text-sm"><span className="text-[#DC373E]">&#10004;</span> Assign homework to every player</li>
              <li className="text-white/90 text-sm"><span className="text-[#DC373E]">&#10004;</span> Track progress in real time</li>
              <li className="text-white/90 text-sm"><span className="text-[#DC373E]">&#10004;</span> Create team competitions</li>
              <li className="text-white/90 text-sm"><span className="text-[#DC373E]">&#10004;</span> Only <strong className="text-[#22C55E]">$6 per player per year</strong> — coaches free</li>
            </ul>
          </div>
          <Link
            href="/team-demo-request-anytime-soccer-training"
            className="bg-red hover:bg-red-dark text-white px-6 py-3 rounded-full font-bold text-sm transition-all text-center"
          >
            Request Team Demo &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
