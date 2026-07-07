'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { COACH_ONBOARDING_STEPS } from '@/data/coachOnboardingSteps';

const STORAGE_KEY = 'coachOnboardingStep';

export default function GetStartedStepsEntryPage() {
  const router = useRouter();

  useEffect(() => {
    const saved = Number(window.localStorage.getItem(STORAGE_KEY));
    const step = saved >= 1 && saved <= COACH_ONBOARDING_STEPS.length ? saved : 1;
    router.replace(`/get-started-steps/${step}`);
  }, [router]);

  return null;
}
