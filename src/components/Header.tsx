'use client';

import Link from 'next/link';
import { useState } from 'react';

const navLinks = [
  { href: '/how-it-works', label: 'How it Works' },
  { href: '/our-programs', label: 'Programs' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/resources', label: 'Resources' },
  { href: '/blog', label: 'Blog' },
  { href: '/podcast', label: 'Podcast' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-navy sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-white font-bold text-lg">
            <span className="text-xl">Anytime Soccer Training</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/90 hover:text-white text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="https://app.anytimesoccertraining.com"
              className="text-white/90 hover:text-white text-sm font-medium"
            >
              Sign In
            </Link>
            <Link
              href="https://app.anytimesoccertraining.com/register"
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
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/90 hover:text-white px-3 py-2 text-sm font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="https://app.anytimesoccertraining.com"
                className="text-white/90 hover:text-white px-3 py-2 text-sm font-medium"
              >
                Sign In
              </Link>
              <Link
                href="https://app.anytimesoccertraining.com/register"
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
