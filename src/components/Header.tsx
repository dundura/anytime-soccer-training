'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

const howItWorksDropdown = [
  { href: '/how-it-works', label: 'For Players' },
  { href: '/for-coaches', label: 'For Coaches & Clubs' },
  { href: '/faq', label: 'FAQ' },
];

const resourcesDropdown = [
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
  const dropdownRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
      if (resourcesRef.current && !resourcesRef.current.contains(e.target as Node)) {
        setResourcesOpen(false);
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
            <img src="https://anytime-soccer.com/wp-content/uploads/2026/02/ast_logo_shield_only_blue.png" alt="Anytime Soccer Training" className="h-8 w-auto" />
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
                  {resourcesDropdown.map((item) => (
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
              <div className="px-3 py-1 text-xs text-white/50 uppercase tracking-wider">How it Works</div>
              {howItWorksDropdown.map((link) => (
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
              <div className="px-3 py-1 text-xs text-white/50 uppercase tracking-wider">Resources</div>
              {resourcesDropdown.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/90 hover:text-white px-6 py-2 text-sm font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="https://app.anytime-soccer.com/auth/login"
                className="text-white/90 hover:text-white px-3 py-2 text-sm font-medium"
              >
                Sign In
              </Link>
              <Link
                href="/pricing"
                className="bg-red hover:bg-red-dark text-white mx-3 px-4 py-2 rounded-lg text-sm font-semibold text-center transition-colors"
              >
                Join for Free
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
