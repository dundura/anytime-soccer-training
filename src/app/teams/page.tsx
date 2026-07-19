'use client';

import Link from 'next/link';
import { useState } from 'react';

// metadata moved to layout or head

const GENERAL_GUIDES = [
  { title: 'Getting Started with Anytime Soccer Training', slug: 'getting-started' },
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
  { title: 'Next Level AS', slug: 'next-level-as-getting-started', aliases: ['Next Level AS - Mini Group', 'Next Level AS - Group 3', 'Next Level AS - Group 2', 'Next Level AS - Group 1'] },
  { title: 'Pacific FC 13B', slug: 'pacific-fc-13b-getting-started' },
  { title: 'FSC Boys U13 Red', slug: 'fsc-boys-u13-red-getting-started' },
  { title: 'Butler Falcons', slug: 'butler-falcons-getting-started' },
  { title: 'Pacific FC 15G', slug: 'pacific-fc-15g-getting-started' },
  { title: 'Pacific FC 15G Riptide', slug: 'pacific-fc-15g-riptide-getting-started' },
  { title: 'RBU Renegades', slug: 'rbu-renegades-getting-started' },
  { title: 'DHS Boys Soccer 2026', slug: 'dhs-boys-soccer-2026-getting-started' },
  { title: 'Vortex Soccer Training', slug: 'vortex-soccer-training-getting-started' },
  { title: 'Synergy FC', slug: 'synergy-fc-getting-started' },
  { title: '2015 Legacy Girls', slug: '2015-legacy-girls-getting-started' },
  { title: 'Cheltenham Cheetahs', slug: 'cheetahs-getting-started' },
  { title: 'Ambassadors Football Club 2012 Boys', slug: 'amfc-2012-boys-getting-started' },
  { title: 'Ambassadors FC', slug: 'ambassadors-fc-girls-getting-started', aliases: ['Ambassadors 2012 Girls Blue', 'Ambassadors 2012 White'] },
  { title: 'AFC 2016 Silver', slug: 'afc2016silver', aliases: ['afc2016silver'] },
  { title: 'AFC', slug: 'getting-started-afc' },
  { title: 'Brian Chongtoua | Private Soccer Specialist', slug: 'bc-getting-started' },
  { title: 'Avalanche', slug: 'avalanche-getting-started' },
  { title: 'Carolina Velocity Academy', slug: 'carolina-velocity-academy-getting-started' },
  { title: 'DHL United', slug: 'dhl-united-getting-started' },
  { title: 'Grasshoppers', slug: 'grasshoppers-getting-started' },
  { title: 'Lonestar Soccer Club', slug: 'lonestar' },
  { title: 'Lonestar 14G Red CTX', slug: 'lonestar-14g' },
  { title: 'Lonestar 14B Black CTX', slug: 'lonestar-14b' },
  { title: 'North Boise FC', slug: 'north-boise-fc-getting-started' },
  { title: 'Royal Fox FC', slug: 'royal-fox-fc-getting-started' },
  { title: 'Pekin Pride 2013/14 Girls', slug: 'pekin-pride-2013-14-girls-getting-started' },
  { title: 'South Parkland Mutiny', slug: 'getting-started-south-parkland-mutiny' },
  { title: 'UCSC Soccer', slug: 'ucsc-getting-started' },
  { title: 'ULETE FC', slug: 'ulete-fc-getting-started' },
  { title: 'NPSL', slug: 'getting-started-npsl' },
  { title: 'Red Bluff FC', slug: 'red-bluff-fc-getting-started' },
  { title: 'Wilson Tigers', slug: 'wilson-tigers-getting-started' },
  { title: 'CFC Girls Academy (2013 & 2012)', slug: 'cfc-girls-academy-getting-started', aliases: ['2013 Girls Academy', '2012 Girls Academy', 'CFC 2013', 'CFC 2012'] },
  { title: 'Spokane Legacy', slug: 'spokane-legacy-getting-started', aliases: ['Spokane Legacy GU10 Pink', 'Spokane Legacy GU11', 'Spokane Legacy GU10 Purple'] },
  { title: 'MVP FC', slug: 'mvp-fc-getting-started' },
  { title: 'Pacific FC 14G', slug: 'pacific-fc-14g-getting-started', aliases: ['Pacific FC 09B Blue/Gold', 'Pacific FC 09B'] },
  { title: 'Pacific FC 09B Blue/Gold', slug: 'pacific-fc-14g-getting-started' },
  { title: 'PFC Tsunami 14G', slug: 'pfc-tsunami-14g-getting-started' },
  { title: 'Pacific FC 14G Lightning', slug: 'pacific-fc-14g-lightning-getting-started' },
  { title: 'Pacific FC 17G Spirit', slug: 'pacific-fc-17g-spirit-getting-started' },
  { title: 'WJFC BU13 AM', slug: 'wjfc-bu13-am-getting-started' },
  { title: 'BCSC U13 Girls Target Rep. Team', slug: 'bcsc-u13-girls-target-rep-getting-started' },
  { title: 'Summit FC', slug: 'summit-fc-getting-started' },
  { title: 'Tiger Strike', slug: 'tiger-strike-getting-started' },
];

const PARENT_GUIDES = [
  { title: 'AFC Parent Guide', slug: 'parent-getting-started-guide-afc' },
  { title: 'South Parkland Parent Guide', slug: 'parent-getting-started-guide-south-parkland' },
  { title: 'ULETE FC Parent Guide', slug: 'parent-getting-started-guide-ulete-fc' },
];

export default function TeamsPage() {
  return (
    <>
    <section className="py-16 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-3">Teams</h1>
          <p className="text-gray text-lg">Getting started guides for coaches, parents, and teams</p>
          <Link
            href="/onboarding-portal?view=index"
            className="inline-block mt-5 bg-red hover:bg-red-dark text-white font-bold py-2.5 px-8 rounded-xl transition-colors"
          >
            Onboarding Portal →
          </Link>
        </div>

        {/* Explore the App */}
        <div className="mb-6">
          <Link href="/for-coaches-learn" className="block bg-red text-white rounded-2xl p-6 hover:bg-red-dark transition-colors no-underline">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold mb-1">Explore the App — Coach Overview</h2>
                <p className="text-white/80 text-sm m-0">See everything coaches can do: homework, tournaments, leaderboards & more</p>
              </div>
              <span className="text-white/70 text-xl">&rarr;</span>
            </div>
          </Link>
        </div>

        {/* Pre Onboarding (step-by-step wizard) */}
        <div className="mb-6">
          <Link href="/pre-onboarding" className="block bg-navy text-white rounded-2xl p-6 hover:bg-navy/90 transition-colors no-underline">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold mb-1">Start Onboarding</h2>
                <p className="text-white/70 text-sm m-0">Step-by-step onboarding site &mdash; get your team set up one step at a time</p>
              </div>
              <span className="text-white/50 text-xl">&rarr;</span>
            </div>
          </Link>
        </div>

        {/* Onboarding Checklist */}
        <div className="mb-10">
          <Link href="/anytime-soccer-training-onboarding-checklist" className="block bg-navy text-white rounded-2xl p-6 hover:bg-navy/90 transition-colors no-underline">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold mb-1">Onboarding Checklist</h2>
                <p className="text-white/70 text-sm m-0">Quick reference for onboarding new teams and players</p>
              </div>
              <span className="text-white/50 text-xl">&rarr;</span>
            </div>
          </Link>
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
        <TeamSearch />

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
    </>
  );
}

function TeamSearch() {
  const [query, setQuery] = useState('');
  const q = query.toLowerCase();
  const filtered = TEAM_PAGES.filter((page) => {
    if (!q) return true;
    if (page.title.toLowerCase().includes(q)) return true;
    if ('aliases' in page && Array.isArray((page as { aliases?: string[] }).aliases)) {
      return (page as { aliases: string[] }).aliases.some((a) => a.toLowerCase().includes(q));
    }
    return false;
  });

  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-navy mb-4">Team Getting Started Pages</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for your team..."
        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-red/30 focus:border-red"
      />
      <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(15,49,84,0.08)] divide-y divide-gray-100">
        {filtered.length === 0 ? (
          <div className="px-6 py-4 text-gray text-sm">No teams found matching &ldquo;{query}&rdquo;</div>
        ) : (
          filtered.map((page) => (
            <Link
              key={page.slug}
              href={`/${page.slug}`}
              className="flex items-center justify-between px-6 py-4 hover:bg-background/50 transition-colors group"
            >
              <span className="text-navy font-medium group-hover:text-red transition-colors">{page.title}</span>
              <span className="text-gray group-hover:text-red transition-colors">&rarr;</span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
