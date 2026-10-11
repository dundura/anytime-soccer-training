'use client';

import type { CoachOnboardingStep } from '@/data/coachOnboardingSteps';

/** Renders a coach onboarding step's full instructions (body, checklist,
 * grouped sub-steps, CTA, hint). Shared by the get-started-steps pages and
 * the Onboarding Portal wizard. */
export default function CoachStepContent({ step, hideCta }: { step: CoachOnboardingStep; hideCta?: boolean }) {
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
              counter = counterStart[gi];
              return (
                <div key={gi}>
                  {/* A label, not a control. It used to be a toggle that started
                      closed, which hid the steps behind a click nobody knew to
                      make. */}
                  {group.heading ? (
                    <h2 className="text-[13px] font-extrabold uppercase tracking-wide text-red mb-3">
                      {group.heading}
                    </h2>
                  ) : null}
                  {/* Each step is a card like the rows on the hub: a number tile, a bold title, the detail
                      under it, and the links as buttons. */}
                  <ol className="space-y-3">
                    {group.items.map((sub) => {
                      counter += 1;
                      const hasLinks = !!(sub.extraLinkHref || sub.videoHref || sub.moreInfoHref);
                      return (
                        <li key={sub.title} className="flex items-start gap-3.5 bg-white border-2 border-blue-200 rounded-xl px-4 py-3.5 shadow-sm">
                          <span className="flex-shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg bg-blue-50 text-navy font-extrabold text-base">
                            {counter}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="font-bold text-navy leading-snug">{sub.title}</p>
                            {sub.description && (
                              <p className="text-gray-600 text-sm leading-relaxed mt-0.5">{sub.description}</p>
                            )}
                            {sub.bullets && (
                              <ul className="list-disc pl-5 mt-1 space-y-1 text-gray-600 text-sm leading-relaxed marker:text-red">
                                {sub.bullets.map((b) => (
                                  <li key={b}>{b}</li>
                                ))}
                              </ul>
                            )}
                            {hasLinks && (
                              <div className="flex flex-wrap items-center gap-2 mt-2.5">
                                {sub.videoHref && (
                                  <a
                                    href={sub.videoHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 bg-white border-2 border-navy text-navy text-xs font-bold rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors"
                                  >
                                    📺 Watch Video
                                  </a>
                                )}
                                {sub.moreInfoHref && (
                                  <a
                                    href={sub.moreInfoHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 bg-red text-white text-xs font-bold rounded-lg px-3 py-1.5 hover:bg-red-dark transition-colors"
                                  >
                                    How To →
                                  </a>
                                )}
                                {sub.extraLinkHref && (
                                  <span className="text-gray-600 text-sm">
                                    {sub.extraLinkPrefix ? `${sub.extraLinkPrefix} ` : ''}
                                    <a
                                      href={sub.extraLinkHref}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-red font-bold hover:underline"
                                    >
                                      {sub.extraLinkLabel || 'Learn more →'}
                                    </a>
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              );
            })}
          </div>
        );
      })()}

      {step.afterSteps && (
        <div
          className="mb-6 space-y-4 text-gray-700 leading-relaxed [&_strong]:text-navy [&_strong]:font-semibold"
          dangerouslySetInnerHTML={{ __html: step.afterSteps }}
        />
      )}

      {step.ctaHref && !hideCta && (
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
