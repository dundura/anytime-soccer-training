import Link from 'next/link';

export default function CoachBar() {
  return (
    <div className="bg-background pb-4 -mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop: image */}
        <Link href="/team-demo-request-anytime-soccer-training" className="hidden md:block">
          <img
            src="https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1782413027367-q0c5qf.png"
            alt="Built for Coaches & Clubs"
            className="w-full rounded-2xl object-cover"
          />
        </Link>

        {/* Mobile: image */}
        <Link href="/team-demo-request-anytime-soccer-training" className="md:hidden block">
          <img
            src="https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1782412724105-e5vd1i.png"
            alt="Built for Coaches & Clubs"
            className="w-full rounded-2xl object-cover"
          />
        </Link>
      </div>
    </div>
  );
}
