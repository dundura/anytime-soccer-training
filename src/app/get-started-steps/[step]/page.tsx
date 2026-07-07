'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { COACH_ONBOARDING_STEPS } from '@/data/coachOnboardingSteps';

const STORAGE_KEY = 'coachOnboardingStep';

export default function CoachOnboardingStepPage() {
  const params = useParams();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const stepNumber = Number(params.step);
  const stepIndex = stepNumber - 1;
  const step = COACH_ONBOARDING_STEPS[stepIndex];
  const isLastStep = stepIndex === COACH_ONBOARDING_STEPS.length - 1;

  useEffect(() => {
    setMounted(true);
    if (step) {
      window.localStorage.setItem(STORAGE_KEY, String(stepNumber));
    }
  }, [step, stepNumber]);

  if (!mounted) return null;

  if (!step) {
    return (
      <section className="py-16 bg-background min-h-screen">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-navy mb-4">Step not found</h1>
          <Link href="/get-started-steps" className="text-red font-semibold hover:underline">
            Back to start
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-background min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-navy px-8 py-6 relative">
            <Link
              href="/pre-onboarding"
              className="absolute top-4 right-6 text-white/80 hover:text-white text-sm font-semibold inline-flex items-center gap-1"
            >
              🏠 Home
            </Link>
            <span className="inline-block bg-red text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full mb-3">
              Step {stepNumber} of {COACH_ONBOARDING_STEPS.length}
            </span>
            <h1 className="text-white text-2xl font-extrabold">{step.title}</h1>
          </div>

          <div className="px-8 py-8">
            <div
              className="mb-6 space-y-4 text-gray-700 leading-relaxed [&_strong]:text-navy [&_strong]:font-semibold"
              dangerouslySetInnerHTML={{ __html: step.body }}
            />

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
              const groups: { heading?: string; items: typeof step.subSteps }[] = [];
              step.subSteps.forEach((sub) => {
                if (sub.sectionHeading || groups.length === 0) {
                  groups.push({ heading: sub.sectionHeading, items: [sub] });
                } else {
                  groups[groups.length - 1].items.push(sub);
                }
              });

              let counter = 0;
              return (
                <div className="mb-8 space-y-6">
                  {groups.map((group, gi) => (
                    <div key={gi} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      {group.heading && (
                        <h2 className="text-sm font-bold uppercase tracking-wide text-red mb-3">
                          {group.heading}
                        </h2>
                      )}
                      <ol className="space-y-5">
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
                    </div>
                  ))}
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

            <div className="flex justify-center items-center gap-4">
              <Link
                href={stepNumber > 1 ? `/get-started-steps/${stepNumber - 1}` : '/pre-onboarding'}
                className="inline-block bg-white border-2 border-navy text-navy hover:bg-gray-light font-bold py-2.5 px-8 rounded-xl transition-colors"
              >
                ← Back
              </Link>

              {isLastStep ? (
                <div className="text-center text-gray font-medium">
                  🎉 That&rsquo;s everything &mdash; you&rsquo;re all set!
                </div>
              ) : (
                <Link
                  href={`/get-started-steps/${stepNumber + 1}`}
                  className="inline-block bg-navy hover:bg-navy-light text-white font-bold py-2.5 px-8 rounded-xl transition-colors"
                >
                  Next →
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-navy rounded-2xl px-8 py-8 text-center text-white">
          <h3 className="text-lg font-bold mb-4">Questions? We&rsquo;re Here to Help!</h3>
          <div className="flex flex-col items-center gap-2">
            <span className="font-semibold text-base">Megan Chambers</span>
            <span className="text-white/70 text-sm">Team Success Manager</span>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mt-3">
              <a href="mailto:megan@anytime-soccer.com" className="text-white/90 hover:text-white text-sm">
                megan@anytime-soccer.com
              </a>
              <a href="tel:803-431-1028" className="text-white/90 hover:text-white text-sm">
                (M) 803-431-1028
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
