"use client";

import { useState } from "react";

interface Step {
  text: React.ReactNode;
  link?: { href: string; label: string };
  optional?: boolean;
}

interface Section {
  step: string;
  title: string;
  optional?: boolean;
  steps: Step[];
}

const sections: Section[] = [
  {
    step: "STEP 1",
    title: "ROSTER UPDATE",
    steps: [
      {
        text: (<>Submit updated team roster to <strong className="text-navy">Megan Chambers</strong> (skip if club already submitted)</>),
        link: { href: "https://drive.google.com/drive/u/1/folders/1UPIjsWN0pkbryFxMselsTOs3Gs2voNqa", label: "Roster Template" },
      },
      { text: "Pay online invoice (sent via Stripe)" },
      { text: "Remove players who aren't returning — go to your roster, click the player's name, and remove them from the team" },
    ],
  },
  {
    step: "STEP 2",
    title: "SEND NOTIFICATIONS",
    steps: [
      {
        text: "Coach sends introduction email to parents using template",
        link: { href: "https://docs.google.com/document/d/1VAVT_sHrtvvb1rUbuNX4muqUthq1Tgn0/edit", label: "Email Template" },
      },
      {
        text: (<>Coach notifies <strong className="text-navy">Megan Chambers</strong> that parents have been notified</>),
        link: { href: "mailto:megan@anytime-soccer.com", label: "Email" },
      },
    ],
  },
];

export default function CoachRenewalChecklist() {
  const [collapsed, setCollapsed] = useState<Record<number, boolean>>({});

  const toggle = (i: number) => setCollapsed((prev) => ({ ...prev, [i]: !prev[i] }));

  return (
    <section className="pb-20 bg-background">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
        {sections.map((section, si) => (
          <div key={si} className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(15,49,84,0.08)] overflow-hidden">
            {/* Section Header */}
            <button
              onClick={() => toggle(si)}
              className={`w-full flex items-center gap-3 px-6 py-4 text-left transition-colors cursor-pointer ${
                section.optional ? "bg-navy/80 hover:bg-navy/90" : "bg-navy hover:bg-navy-light"
              }`}
            >
              <span className="bg-red text-white text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap">
                {section.step}
              </span>
              <span className="text-white font-bold text-sm tracking-wide">{section.title}</span>
              {section.optional && (
                <span className="bg-white/20 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">OPTIONAL</span>
              )}
              <svg
                className={`w-5 h-5 text-white ml-auto transition-transform flex-shrink-0 ${collapsed[si] ? "-rotate-90" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Section Content */}
            {!collapsed[si] && (
              <div>
                {/* Table Header */}
                <div className="grid grid-cols-[1fr_160px] bg-[#e9ecef] px-6 py-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-[#555]">Step</span>
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-[#555] text-center">Link / Video</span>
                </div>

                {/* Rows */}
                {section.steps.map((step, ri) => (
                  <div
                    key={ri}
                    className={`grid grid-cols-[1fr_160px] px-6 py-4 items-center ${
                      ri < section.steps.length - 1 ? "border-b border-[#e9ecef]" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 bg-navy text-white rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0">
                        {ri + 1}
                      </span>
                      <span className="text-[15px] text-navy">
                        {step.text}
                        {step.optional && (
                          <span className="bg-[#e9ecef] text-[#555] text-[11px] font-semibold px-2 py-0.5 rounded ml-2">Optional</span>
                        )}
                      </span>
                    </div>
                    <div className="text-center">
                      {step.link ? (
                        <a
                          href={step.link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 bg-red hover:bg-red-dark text-white text-xs font-bold px-4 py-2 rounded-md transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(220,55,62,0.3)] no-underline"
                        >
                          {step.link.label}
                        </a>
                      ) : (
                        <span className="text-[#e9ecef] text-lg">&mdash;</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Contact Section */}
        <div className="bg-navy rounded-2xl p-8 text-center text-white mt-4">
          <h3 className="font-bold text-lg mb-4">Questions? We&apos;re Here to Help!</h3>
          <div className="flex flex-col items-center gap-1">
            <span className="font-semibold text-lg">Megan Chambers</span>
            <span className="text-white/70 text-sm">Team Success Manager</span>
            <div className="flex gap-5 mt-3 flex-wrap justify-center">
              <a href="mailto:megan@anytime-soccer.com" className="text-white hover:text-red transition-colors text-[15px] no-underline flex items-center gap-2">
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                megan@anytime-soccer.com
              </a>
              <a href="tel:803-431-1028" className="text-white hover:text-red transition-colors text-[15px] no-underline flex items-center gap-2">
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                (M) 803-431-1028
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
