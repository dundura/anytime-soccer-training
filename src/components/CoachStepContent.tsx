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
          <div className="mb-8 space-y-6">
            {groups.map((group, gi) => {
              const isOpen = openGroups[gi] ?? false;
              counter = counterStart[gi];
              return (
                <div key={gi} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  {group.heading ? (
                    <button
                      type="button"
                      onClick={() => setOpenGroups((prev) => ({ ...prev, [gi]: !isOpen }))}
                      className="flex items-center justify-between w-full text-left mb-0"
                    >
                      <h2 className="text-sm font-bold uppercase tracking-wide text-red">
                        {group.heading}
                      </h2>
                      <span className={`text-red transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                  ) : null}
                  {(isOpen || !group.heading) && (
                    <ol className={`space-y-5 ${group.heading ? 'mt-3' : ''}`}>
                      {group.items.map((sub) => {
                        counter += 1;
                        return (
                          <li key={sub.title} className="flex gap-4">
                            <span className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-navy text-white font-bold text-sm">
                              {counter}
                            </span>
                            <div>
                              <p className="font-semibold text-navy mb-1">{sub.title}</p>
                              {sub.description && (
                                <p className="text-gray-700 leading-relaxed mb-1">{sub.description}</p>
                              )}
                              <div className="flex flex-wrap gap-x-4 gap-y-1">
                                {sub.extraLinkHref && (
                                  <a
                                    href={sub.extraLinkHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-navy text-sm font-semibold hover:underline"
                                  >
                                    {sub.extraLinkLabel || 'Learn more →'}
                                  </a>
                                )}
                                {sub.videoHref && (
                                  <a
                                    href={sub.videoHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-red text-sm font-semibold hover:underline"
                                  >
                                    📺 Watch Video
                                  </a>
                                )}
                                {sub.moreInfoHref && (
                                  <a
                                    href={sub.moreInfoHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-red text-sm font-semibold hover:underline"
                                  >
                                    How To →
                                  </a>
                                )}
                              </div>
                            </div>
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
