import ClubBudgetCalculator from '@/components/ClubBudgetCalculator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Real Cost of Running a Soccer Club | Anytime Soccer Training',
  description: "See exactly what it costs to run a youth soccer club — coaching, facilities, insurance, and more. Enter the numbers and find out what you're really paying for.",
};

export default function BudgetCalculatorPage() {
  return (
    <main>
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '2rem 1rem 0' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '10px' }}>
          The real cost of running a soccer club
        </h1>
        <p style={{ fontSize: '15px', color: '#374151', marginBottom: '10px', lineHeight: '1.7' }}>
          Everyone has an opinion on pay-to-play. But before you weigh in, do you actually know what it costs to run a youth soccer club? Most people don&apos;t. This calculator walks through the real numbers — coaching, field time, insurance, admin — so you can see exactly where the money goes and what you&apos;re paying per hour of training.
        </p>
        <a
          href="https://www.anytime-soccer.com/blog/stop-complaining-about-pay-to-play-before-you-answer-these-questions"
          style={{ fontSize: '13px', color: '#9ca3af', textDecoration: 'none', borderBottom: '1px solid #e5e7eb', paddingBottom: '1px', display: 'inline-block', marginBottom: '2rem' }}
        >
          Related: Stop Complaining About Pay-to-Play Before You Answer These Questions →
        </a>
      </div>
      <ClubBudgetCalculator />
    </main>
  );
}
