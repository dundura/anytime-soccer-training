import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Teams | Anytime Soccer Training',
  description: 'Getting started guides for teams, coaches, and parents using Anytime Soccer Training.',
};

const GENERAL_GUIDES = [
  { title: 'Getting Started with Anytime Soccer Training', slug: 'getting-started-with-anytime-soccer-training' },
  { title: 'Getting Started Guide for Coaches', slug: 'getting-started-guide-for-coaches-anytime-soccer-training' },
  { title: 'Getting Started Guide for Parents', slug: 'getting-started-guide-for-parents' },
  { title: 'Creating an Anytime Soccer Training Team', slug: 'creating-an-anytime-soccer-training-team' },
  { title: 'Joining an Anytime Soccer Training Team', slug: 'joining-anytime-soccer-training-team' },
  { title: 'Applying Team Code to Existing Account', slug: 'applying-team-code-to-existing-account' },
  { title: 'Onboarding Checklist', slug: 'anytime-soccer-training-onboarding-checklist' },
  { title: 'Free Team Access for the Season', slug: 'free-team-access-for-the-season' },
  { title: 'Coach Contact Information', slug: 'coach-contact-information' },
];

const TEAM_PAGES = [
  { title: '2015 Legacy Girls', slug: '2015-legacy-girls-getting-started' },
  { title: 'AFC', slug: 'getting-started-afc' },
  { title: 'Brian Chongtoua | Private Soccer Specialist', slug: 'bc-getting-started' },
  { title: 'Avalanche', slug: 'avalanche-getting-started' },
  { title: 'Carolina Velocity Academy', slug: 'carolina-velocity-academy-getting-started' },
  { title: 'DHL United', slug: 'dhl-united-getting-started' },
  { title: 'Grasshoppers', slug: 'grasshoppers-getting-started' },
  { title: 'North Boise FC', slug: 'north-boise-fc-getting-started' },
  { title: 'Royal Fox FC', slug: 'royal-fox-fc-getting-started' },
  { title: 'Pekin Pride 2013/14 Girls', slug: 'pekin-pride-2013-14-girls-getting-started' },
  { title: 'South Parkland Mutiny', slug: 'getting-started-south-parkland-mutiny' },
  { title: 'ULETE FC', slug: 'ulete-fc-getting-started' },
];

const PARENT_GUIDES = [
  { title: 'AFC Parent Guide', slug: 'parent-getting-started-guide-afc' },
  { title: 'South Parkland Parent Guide', slug: 'parent-getting-started-guide-south-parkland' },
  { title: 'ULETE FC Parent Guide', slug: 'parent-getting-started-guide-ulete-fc' },
];

export default function TeamsPage() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-3">Teams</h1>
          <p className="text-gray text-lg">Getting started guides for coaches, parents, and teams</p>
        </div>

        {/* General Guides */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-navy mb-4">Getting Started Guides</h2>
          <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(15,49,84,0.08)] divide-y divide-gray-100">
            {GENERAL_GUIDES.map((page) => (
              <Link
                key={page.slug}
                href={`/${page.slug}`}
                className="flex items-center justify-between px-6 py-4 hover:bg-background/50 transition-colors group"
              >
                <span className="text-navy font-medium group-hover:text-red transition-colors">{page.title}</span>
                <span className="text-gray group-hover:text-red transition-colors">&rarr;</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Team Pages */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-navy mb-4">Team Getting Started Pages</h2>
          <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(15,49,84,0.08)] divide-y divide-gray-100">
            {TEAM_PAGES.map((page) => (
              <Link
                key={page.slug}
                href={`/${page.slug}`}
                className="flex items-center justify-between px-6 py-4 hover:bg-background/50 transition-colors group"
              >
                <span className="text-navy font-medium group-hover:text-red transition-colors">{page.title}</span>
                <span className="text-gray group-hover:text-red transition-colors">&rarr;</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Parent Guides */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-navy mb-4">Parent Guides</h2>
          <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(15,49,84,0.08)] divide-y divide-gray-100">
            {PARENT_GUIDES.map((page) => (
              <Link
                key={page.slug}
                href={`/${page.slug}`}
                className="flex items-center justify-between px-6 py-4 hover:bg-background/50 transition-colors group"
              >
                <span className="text-navy font-medium group-hover:text-red transition-colors">{page.title}</span>
                <span className="text-gray group-hover:text-red transition-colors">&rarr;</span>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray mb-4">Need a custom getting started page for your team?</p>
          <Link href="/contact" className="bg-red hover:bg-red-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-block">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
