'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

const howItWorksDropdown = [
  { href: '/how-it-works', label: 'For Players' },
  { href: '/for-coaches', label: 'For Coaches & Clubs' },
  { href: '/faq', label: 'FAQ' },
];

const trainingDropdown = [
  { href: 'https://www.anytimecamps.com/', label: '⛺ Summer Camp', external: true },
  { href: 'https://grupup.app/for-parents', label: '⚽ Group Sessions', external: true },
];

const resourcesDropdown: { href: string; label: string; external?: boolean }[] = [
  { href: '/free-resource-hub', label: 'Free Resources' },
  { href: '/blog', label: 'Blog' },
  { href: '/podcast', label: 'Podcast' },
  { href: '/our-picks', label: 'Our Picks' },
  { href: '/merch', label: 'Merch' },
  { href: 'https://app.anytime-soccer.com/leaderboard', label: 'Leaderboard' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [trainingOpen, setTrainingOpen] = useState(false);
  const [mobileHowOpen, setMobileHowOpen] = useState(false);
  const [mobileResOpen, setMobileResOpen] = useState(false);
  const [mobileTrainingOpen, setMobileTrainingOpen] = useState(false);
  const [installOpen, setInstallOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const trainingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
      if (resourcesRef.current && !resourcesRef.current.contains(e.target as Node)) {
        setResourcesOpen(false);
      }
      if (trainingRef.current && !trainingRef.current.contains(e.target as Node)) {
        setTrainingOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-navy sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-white font-bold text-lg">
            <img src="https://media.anytime-soccer.com/wp-content/uploads/2026/02/ast_logo_shield_only_blue.png" alt="Anytime Soccer Training" className="h-8 w-auto" />
            <span className="text-xl">Anytime Soccer Training</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {/* How it Works dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-white/90 hover:text-white text-sm font-medium transition-colors flex items-center gap-1"
              >
                How it Works
                <svg className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-lg shadow-xl py-2 z-50">
                  {howItWorksDropdown.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2.5 text-sm text-navy hover:bg-background hover:text-red transition-colors font-medium"
                      onClick={() => setDropdownOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Training dropdown (Summer Camp + Group Sessions) */}
            <div className="relative" ref={trainingRef}>
              <button
                onClick={() => setTrainingOpen(!trainingOpen)}
                className="text-white/90 hover:text-white text-sm font-medium transition-colors flex items-center gap-1"
              >
                In-Person
                <svg className={`w-3.5 h-3.5 transition-transform ${trainingOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {trainingOpen && (
                <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-lg shadow-xl py-2 z-50">
                  {trainingDropdown.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2.5 text-sm text-navy hover:bg-background hover:text-red transition-colors font-medium"
                      onClick={() => setTrainingOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Resources dropdown */}
            <div className="relative" ref={resourcesRef}>
              <button
                onClick={() => setResourcesOpen(!resourcesOpen)}
                className="text-white/90 hover:text-white text-sm font-medium transition-colors flex items-center gap-1"
              >
                Resources
                <svg className={`w-3.5 h-3.5 transition-transform ${resourcesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {resourcesOpen && (
                <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-lg shadow-xl py-2 z-50">
                  {resourcesDropdown.map((item) => item.external ? (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2.5 text-sm text-navy hover:bg-background hover:text-red transition-colors font-medium"
                      onClick={() => setResourcesOpen(false)}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2.5 text-sm text-navy hover:bg-background hover:text-red transition-colors font-medium"
                      onClick={() => setResourcesOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setInstallOpen(true)}
              className="text-white/90 hover:text-white text-sm font-medium transition-colors inline-flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
              </svg>
              Install App
            </button>
            <Link
              href="https://app.anytime-soccer.com/auth/login"
              className="text-white/90 hover:text-white text-sm font-medium"
            >
              Sign In
            </Link>
            <Link
              href="/pricing"
              className="bg-red hover:bg-red-dark text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              Join for Free
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-white/10">
            <nav className="flex flex-col gap-2 pt-4">
              <button
                onClick={() => setMobileHowOpen(!mobileHowOpen)}
                className="px-3 py-1 text-xs text-white/50 uppercase tracking-wider flex items-center justify-between"
              >
                How it Works
                <svg className={`w-3.5 h-3.5 transition-transform ${mobileHowOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileHowOpen && howItWorksDropdown.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/90 hover:text-white px-6 py-2 text-sm font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-white/10 my-1" />
              <button
                onClick={() => setMobileResOpen(!mobileResOpen)}
                className="px-3 py-1 text-xs text-white/50 uppercase tracking-wider flex items-center justify-between"
              >
                Resources
                <svg className={`w-3.5 h-3.5 transition-transform ${mobileResOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileResOpen && resourcesDropdown.map((link) => link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/90 hover:text-white px-6 py-2 text-sm font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/90 hover:text-white px-6 py-2 text-sm font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-white/10 my-1" />
              <button
                onClick={() => setMobileTrainingOpen(!mobileTrainingOpen)}
                className="px-3 py-1 text-xs text-white/50 uppercase tracking-wider flex items-center justify-between"
              >
                In-Person
                <svg className={`w-3.5 h-3.5 transition-transform ${mobileTrainingOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileTrainingOpen && trainingDropdown.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/90 hover:text-white px-6 py-2 text-sm font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="border-t border-white/10 my-1" />
              <button
                onClick={() => { setMobileOpen(false); setInstallOpen(true); }}
                className="text-white/90 hover:text-white px-3 py-2 text-sm font-medium inline-flex items-center gap-1.5 text-left"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
                </svg>
                Install App
              </button>
              <div className="border-t border-white/10 my-1" />
              <Link
                href="https://app.anytime-soccer.com/auth/login"
                className="bg-red hover:bg-red-dark text-white mx-3 px-4 py-2 rounded-lg text-sm font-semibold text-center transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="https://www.anytime-soccer.com/pricing"
                className="text-white/90 hover:text-white mx-3 px-4 py-2 text-sm font-medium text-center"
              >
                Join for Free
              </Link>
            </nav>
          </div>
        )}
      </div>

      {/* Install App Modal */}
      {installOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 px-4"
          onClick={() => setInstallOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setInstallOpen(false)}
              className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-2xl leading-none"
              aria-label="Close"
            >
              &times;
            </button>

            <div className="text-center mb-6">
              <div className="text-4xl mb-3">📲</div>
              <h3 className="text-xl font-bold text-navy">Get the App</h3>
              <p className="text-sm text-gray-500 mt-1">Train anytime, anywhere.</p>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href="https://apps.apple.com/us/app/anytime-soccer-training/id6755527349"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-black text-white rounded-xl px-5 py-3.5 hover:bg-gray-800 transition-colors"
              >
                <svg className="w-7 h-7 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div>
                  <div className="text-[10px] uppercase tracking-wide opacity-80">Download on the</div>
                  <div className="text-lg font-semibold leading-tight">App Store</div>
                </div>
              </a>

              <a
                href="https://play.google.com/store/apps/details?id=com.anytimesoccer&pcampaignid=web_share"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-black text-white rounded-xl px-5 py-3.5 hover:bg-gray-800 transition-colors"
              >
                <svg className="w-7 h-7 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.18 23.67c-.37-.2-.57-.52-.57-.93V1.26c0-.41.2-.73.57-.93l10.85 11.67L3.18 23.67zm1.44-22.37L15.93 12 4.62 22.7 14.25 13.5 4.62 1.3zm13.26 10.13l-2.22-1.2L18.7 12l-3.04 1.77 2.22 1.2 2.9-1.58c.4-.22.4-.56 0-.78l-2.9-1.58zm-2.22 1.2L5.87 22.37l9.79-9.74z" />
                </svg>
                <div>
                  <div className="text-[10px] uppercase tracking-wide opacity-80">Get it on</div>
                  <div className="text-lg font-semibold leading-tight">Google Play</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
