import Link from 'next/link';

export default function CoachBar() {
  return (
    <div className="bg-background pb-4 -mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop (≥1024px) */}
        <Link href="/team-demo-request-anytime-soccer-training" className="hidden lg:block">
          <img
            src="https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1782413027367-q0c5qf.png"
            alt="Built for Coaches & Clubs"
            className="w-full rounded-2xl object-cover"
          />
        </Link>

        {/* Tablet (768px–1023px) */}
        <Link href="/team-demo-request-anytime-soccer-training" className="hidden md:block lg:hidden">
          <img
            src="https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1782413313347-esj7re.png"
            alt="Built for Coaches & Clubs"
            className="w-full rounded-2xl object-cover"
          />
        </Link>

        {/* Mobile (<768px) */}
        <Link href="/team-demo-request-anytime-soccer-training" className="block md:hidden">
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
