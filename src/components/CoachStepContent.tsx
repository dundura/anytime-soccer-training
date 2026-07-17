'use client';

import { useState } from 'react';
import type { CoachOnboardingStep } from '@/data/coachOnboardingSteps';

/** Renders a coach onboarding step's full instructions (body, checklist,
 * grouped sub-steps, CTA, hint). Shared by the get-started-steps pages and
 * the Onboarding Portal wizard. */
export default function CoachStepContent({ step }: { step: CoachOnboardingStep }) {
  const [openGroups, setOpenGroups] = useState<Record<number, boolean>>({});

  return (
    <>
      <div
        className="mb-6 space-y-4 text-gray-700 leading-relaxed [&_strong]:text-navy [&_strong]:font-semibold"
        dangerouslySetInnerHTML={{ __html: step.body }}
      />

      {(step.videoHref || step.moreInfoHref) && (
        <div className="flex flex-wrap gap-x-4 gap-y-1 mb-6">
          {step.videoHref && (
            <a
              href={step.videoHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-red text-sm font-semibold hover:underline"
            >
              📺 Watch Video
            </a>
          )}
          {step.moreInfoHref && (
            <a
              href={step.moreInfoHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-red text-sm font-semibold hover:underline"
            >
              How To →
            </a>
          )}
        </div>
      )}

      {step.checklist && (
        <ul className="mb-6 space-y-3">
          {step.checklist.map((item) => (
            <li key={item} className="flex items-start gap-3 text-gray-700">
              <span className="text-red font-bold mt-0.5">✅</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      {step.subSteps && (() => {
        const groups: { heading?: string; items: NonNullable<typeof step.subSteps> }[] = [];
        step.subSteps.forEach((sub) => {
          if (sub.sectionHeading || groups.length === 0) {
            groups.push({ heading: sub.sectionHeading, items: [sub] });
          } else {
            groups[groups.length - 1].items.push(sub);
          }
        });

        let counter = 0;
        const counterStart: number[] = [];
        groups.forEach((group) => {
          counterStart.push(counter);
          counter += group.items.length;
        });
        counter = 0;

        return (
          <div className="mb-8 space-y-4">
            {groups.map((group, gi) => {
              const isOpen = openGroups[gi] ?? true;
              counter = counterStart[gi];
              return (
                <div key={gi} className="border border-gray-200 rounded-lg overflow-hidden">
                  {group.heading ? (
                    <button
                      type="button"
                      onClick={() => setOpenGroups((prev) => ({ ...prev, [gi]: !isOpen }))}
                      className="flex items-center justify-between w-full text-left px-4 py-3 bg-gray-50 border-b border-gray-200"
                    >
                      <h2 className="text-sm font-bold uppercase tracking-wide text-red">
                        {group.heading}
                      </h2>
                      <span className={`text-red transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                  ) : null}
                  {(isOpen || !group.heading) && (
                    <ol className="divide-y divide-gray-100">
                      {group.items.map((sub) => {
                        counter += 1;
                        return (
                          <li key={sub.title} className="flex items-start gap-3 px-4 py-3">
                            <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-navy text-white font-bold text-xs mt-0.5">
                              {counter}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-navy text-sm leading-snug">{sub.title}</p>
                              {sub.description && (
                                <p className="text-gray-600 text-sm leading-relaxed mt-0.5">{sub.description}</p>
                              )}
                            </div>
                            {(sub.videoHref || sub.moreInfoHref) && (
                              <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-3 flex-shrink-0">
                                {sub.videoHref && (
                                  <a
                                    href={sub.videoHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-red text-xs font-bold hover:underline whitespace-nowrap"
                                  >
                                    📺 Watch Video
                                  </a>
                                )}
                                {sub.moreInfoHref && (
                                  <a
                                    href={sub.moreInfoHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-red text-xs font-bold hover:underline whitespace-nowrap"
                                  >
                                    How To →
                                  </a>
                                )}
                              </div>
                            )}
                          </li>
                        );
                      })}
                    </ol>
                  )}
                </div>
              );
            })}
          </div>
        );
      })()}

      {step.ctaHref && (
        <a
          href={step.ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`block text-center bg-red hover:bg-red-dark text-white font-bold py-4 px-6 rounded-xl transition-colors ${step.hint ? 'mb-2' : 'mb-8'}`}
        >
          {step.ctaLabel}
        </a>
      )}

      {step.hint && (
        <p className="text-navy text-sm text-center bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 mb-8">{step.hint}</p>
      )}
    </>
  );
}
