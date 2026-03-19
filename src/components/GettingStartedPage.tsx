'use client';

import { useState } from 'react';

interface Props {
  teamName: string;
  teamCode: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
}

function CollapsibleStep({ number, title, children, defaultOpen = false }: { number: string; title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(15,49,84,0.08)] overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 px-6 py-5 text-left hover:bg-background/50 transition-colors"
      >
        <span className="w-9 h-9 bg-red text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">{number}</span>
        <h3 className="text-lg font-bold text-navy flex-1">{title}</h3>
        <svg className={`w-5 h-5 text-gray transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && <div className="px-6 pb-6">{children}</div>}
    </div>
  );
}

function Step({ num, children }: { num: number; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 mb-4 last:mb-0">
      <span className="w-6 h-6 bg-navy/10 text-navy rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">{num}</span>
      <div className="text-[#5a7089] text-[15px] leading-relaxed">{children}</div>
    </div>
  );
}

function VideoButton({ url, label }: { url: string; label?: string }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-red/10 text-red font-semibold text-sm rounded-lg hover:bg-red/20 transition-colors no-underline">
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
      {label || 'Watch Video'}
    </a>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-red/[0.08] border-l-[3px] border-red py-3 px-4 rounded-r-lg mt-3">
      <p className="text-navy text-sm m-0">{children}</p>
    </div>
  );
}

export default function GettingStartedPage({ teamName, teamCode, contactName, contactEmail, contactPhone }: Props) {
  return (
    <>
      {/* HERO */}
      <section className="pt-6 pb-10 md:pt-8 md:pb-14 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-navy mb-2">Parent Getting Started Guide</h1>
          <p className="text-gray">Follow these 3 simple steps to get your player training with Anytime Soccer Training</p>
        </div>
      </section>

      {/* TEAM INFO BOX */}
      <section className="pb-8 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-navy to-[#1a3f6b] rounded-2xl p-8 text-center text-white">
            <p className="text-white/60 text-sm mb-1">Team Name</p>
            <h2 className="text-xl md:text-2xl font-bold mb-4">{teamName}</h2>
            <p className="text-white/60 text-sm mb-2">Team Code</p>
            <div className="inline-block bg-white rounded-xl px-6 py-3">
              <span className="text-2xl font-mono font-bold text-red tracking-wider select-all">{teamCode}</span>
            </div>
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="pb-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">

          {/* Step 1: Create Your Account */}
          <CollapsibleStep number="1" title="Create Your Account" defaultOpen>
            <Step num={1}>
              Visit <a href="https://app.anytime-soccer.com" target="_blank" rel="noopener noreferrer" className="text-red font-semibold no-underline hover:underline">app.anytime-soccer.com</a>
            </Step>
            <Step num={2}>
              Click <span className="text-red font-semibold">&ldquo;Join for Free&rdquo;</span> and fill out the registration form with your player&apos;s information.
            </Step>
            <Step num={3}>
              When prompted, enter your team code: <span className="bg-navy text-white font-mono font-bold px-3 py-1.5 rounded-lg text-sm tracking-wider select-all">{teamCode}</span>
            </Step>
            <Step num={4}>
              Check your inbox for the <span className="text-red font-semibold">Welcome Email</span> and click <span className="text-red font-semibold">&ldquo;Verify Address&rdquo;</span>.
              <Tip>Don&apos;t see it? Check your spam or junk folder!</Tip>
            </Step>
            <Step num={5}>
              Log in at <a href="https://app.anytime-soccer.com" target="_blank" rel="noopener noreferrer" className="text-red font-semibold no-underline hover:underline">app.anytime-soccer.com</a> with your email and password.
            </Step>
            <VideoButton url="https://www.youtube.com/watch?v=Vd2IkI3bQdM" />
          </CollapsibleStep>

          {/* Step 2: Add Player Profile */}
          <CollapsibleStep number="2" title="Add Player Profile">
            <Step num={1}>
              After logging in, click <span className="text-red font-semibold">&ldquo;Add Profile&rdquo;</span> on your dashboard.
            </Step>
            <Step num={2}>
              Enter your player&apos;s name, age, and position.
            </Step>
            <Step num={3}>
              One email works for <span className="font-semibold text-navy">multiple player profiles</span> (up to 4 players per account).
            </Step>
            <Step num={4}>
              Click <span className="text-red font-semibold">&ldquo;Save&rdquo;</span> and your player profile is ready!
            </Step>
            <VideoButton url="https://www.youtube.com/watch?v=Vd2IkI3bQdM" />
          </CollapsibleStep>

          {/* Step 3: Join Your Team */}
          <CollapsibleStep number="3" title="Join Your Team">
            <Step num={1}>
              Click <span className="text-red font-semibold">&ldquo;Login&rdquo;</span> and go to your dashboard.
            </Step>
            <Step num={2}>
              Navigate to <span className="text-red font-semibold">&ldquo;MY TEAMS&rdquo;</span> in the menu.
            </Step>
            <Step num={3}>
              Search for your team: <span className="font-semibold text-navy">{teamName}</span>
            </Step>
            <Step num={4}>
              Click <span className="text-red font-semibold">&ldquo;Request to Join&rdquo;</span> and your coach will approve you.
            </Step>
            <Tip>Can&apos;t find the team? Try searching a partial name (e.g. first word only).</Tip>
            <VideoButton url="https://www.youtube.com/watch?v=Vd2IkI3bQdM" />
          </CollapsibleStep>

          {/* Bonus: Already Have an Account */}
          <CollapsibleStep number="+" title="Already Have an Account?">
            <Step num={1}>
              Sign in at <a href="https://app.anytime-soccer.com" target="_blank" rel="noopener noreferrer" className="text-red font-semibold no-underline hover:underline">app.anytime-soccer.com</a>
            </Step>
            <Step num={2}>
              Go to <span className="text-red font-semibold">&ldquo;Account Management&rdquo;</span> in your settings.
            </Step>
            <Step num={3}>
              Enter your team code: <span className="bg-navy text-white font-mono font-bold px-3 py-1.5 rounded-lg text-sm tracking-wider select-all">{teamCode}</span> and click Apply.
            </Step>
            <Tip>Applying a team code unlocks your subscription. Joining the team in &ldquo;MY TEAMS&rdquo; is a separate step for team features like homework and leaderboards.</Tip>
          </CollapsibleStep>

        </div>
      </section>

      {/* CONTACT */}
      <section className="pb-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy rounded-2xl p-8 text-center text-white">
            <h3 className="text-xl font-bold mb-2">Need Help? We&apos;re Here for You!</h3>
            <p className="text-white/70 text-sm mb-4">{contactName || 'Megan Chambers, Team Success Manager'}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href={`mailto:${contactEmail || 'megan@anytime-soccer.com'}`} className="text-red font-semibold no-underline hover:underline">
                {contactEmail || 'megan@anytime-soccer.com'}
              </a>
              {(contactPhone || true) && (
                <a href={`tel:${contactPhone || '803-431-1082'}`} className="text-white/80 font-semibold no-underline hover:underline">
                  {contactPhone || '803-431-1082'}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
