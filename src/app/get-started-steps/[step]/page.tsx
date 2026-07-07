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
          <div className="bg-navy px-8 py-6">
            <span className="inline-block bg-red text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full mb-3">
              Step {stepNumber} of {COACH_ONBOARDING_STEPS.length}
            </span>
            <h1 className="text-white text-2xl font-extrabold">{step.title}</h1>
          </div>

          <div className="px-8 py-8">
            <div
              className="prose prose-p:text-gray-700 prose-p:leading-relaxed max-w-none mb-6"
              dangerouslySetInnerHTML={{ __html: step.body }}
            />

            {step.ctaHref && (
              <a
                href={step.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-red hover:bg-red-dark text-white font-bold py-4 px-6 rounded-xl transition-colors mb-8"
              >
                {step.ctaLabel}
              </a>
            )}

            {isLastStep ? (
              <div className="text-center text-gray font-medium">
                🎉 That&rsquo;s everything &mdash; you&rsquo;re all set!
              </div>
            ) : (
              <Link
                href={`/get-started-steps/${stepNumber + 1}`}
                className="block text-center bg-navy hover:bg-navy-light text-white font-bold py-4 px-6 rounded-xl transition-colors"
              >
                Next →
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
