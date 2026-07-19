'use client';

import { useState } from 'react';

const OFFERINGS: React.ReactNode[] = [
  <><strong className="text-navy font-semibold">Well over 5,000+ follow-along videos</strong> — every skill, age, and level covered.</>,
  <><strong className="text-navy font-semibold">Homework & training plans</strong> from your coach, right in the app.</>,
  <><strong className="text-navy font-semibold">Challenges, leaderboards & awards</strong> that keep training fun.</>,
  <><strong className="text-navy font-semibold">Progress & streak tracking</strong> so you can see how far you&rsquo;ve come.</>,
];

const HOW_IT_WORKS: React.ReactNode[] = [
  <>When you finish a step, hit <strong className="text-navy font-semibold">Mark Complete &#10003;</strong>.</>,
  <>You can <strong className="text-navy font-semibold">skip a step</strong> and come back to it.</>,
  <>Have a question? Click <strong className="text-navy font-semibold">Ask us here</strong> and we&rsquo;ll be in touch.</>,
];

type Screen = 'welcome' | 'how' | 'steps';

export default function PlayerPortal() {
  const [screen, setScreen] = useState<Screen>('welcome');

  return (
    <section className="py-16 bg-background min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-navy px-8 py-6">
            <h1 className="text-white text-2xl font-extrabold">Welcome to Anytime Soccer Training! &#9917;</h1>
          </div>

          <div className="px-8 py-8">
            {screen === 'welcome' ? (
              <div>
                <h2 className="text-navy text-xl font-extrabold mb-3">Getting Started</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Anytime Soccer Training is like having an <strong className="text-navy font-semibold">assistant coach and trainer working with your child every day</strong> &mdash; anytime, anywhere. Every video is <strong className="text-navy font-semibold">100% follow-along</strong>, and the curriculum covers <strong className="text-navy font-semibold">everything</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">Here&rsquo;s what the program gives you:</p>

                <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-5 mb-4">
                  <ol className="space-y-4">
                    {OFFERINGS.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-navy text-white font-bold text-sm">{i + 1}</span>
                        <span className="text-gray-700 leading-relaxed pt-1">{item}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <p className="text-gray-700 leading-relaxed mb-5">
                  This quick portal will help you <strong className="text-navy font-semibold">get started</strong> &mdash; a few simple steps and answers to common questions, so your player can be <strong className="text-navy font-semibold">training from day one</strong>.
                </p>

                <button
                  onClick={() => setScreen('how')}
                  className="w-full bg-red hover:bg-red-dark text-white font-bold py-3 rounded-xl transition-colors"
                >
                  Get Started &rarr;
                </button>
              </div>
            ) : screen === 'how' ? (
              <div>
                <h2 className="text-navy text-xl font-extrabold mb-3">How it Works</h2>
                <p className="text-gray-700 leading-relaxed mb-4">We&rsquo;ve broken the key features and training information into pages you can reference. Use this as a guide to get the most out of the program.</p>

                <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-5 mb-6">
                  <ol className="space-y-4">
                    {HOW_IT_WORKS.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="flex-shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full bg-navy text-white font-bold text-base">{i + 1}</span>
                        <span className="text-gray-700 leading-relaxed pt-1">{item}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-2">
                  <button
                    onClick={() => setScreen('welcome')}
                    className="w-full sm:w-auto bg-white border-2 border-navy text-navy hover:bg-gray-50 font-bold py-2.5 px-8 rounded-xl transition-colors"
                  >
                    &larr; Back
                  </button>
                  <button
                    onClick={() => setScreen('steps')}
                    className="w-full sm:w-auto bg-red hover:bg-red-dark text-white font-bold py-2.5 px-8 rounded-xl transition-colors"
                  >
                    Next &rarr;
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-navy text-xl font-extrabold mb-3">Your steps</h2>
                <p className="text-gray-700 leading-relaxed mb-5">Your step-by-step guide and FAQs will appear here.</p>
                <button
                  onClick={() => setScreen('how')}
                  className="w-full sm:w-auto bg-white border-2 border-navy text-navy hover:bg-gray-50 font-bold py-2.5 px-8 rounded-xl transition-colors"
                >
                  &larr; Back
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
