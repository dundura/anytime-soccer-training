import TournamentWorksheet from '@/components/TournamentWorksheet';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tournament Budget Worksheet | Anytime Soccer Training',
  description: 'Plan your soccer tournament finances — estimate revenue from entry fees and expenses like fields, refs, and prizes. Get a quick net profit view.',
  openGraph: {
    images: ['https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1779461643370-zk99k2.png'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1779461643370-zk99k2.png'],
  },
};

export default function TournamentWorksheetPage() {
  return (
    <main>
      <section className="bg-[#0f2642] py-8 md:py-10">
        <div className="max-w-[680px] mx-auto px-5">
          <div className="inline-flex items-center bg-[#DC373E] text-white text-[11px] font-bold tracking-widest uppercase rounded px-3 py-1 mb-5">
            Free Worksheet
          </div>
          <h1 className="text-[clamp(24px,4vw,38px)] font-extrabold text-white leading-tight mb-4">
            Tournament Budget Worksheet
          </h1>
          <p className="text-white/75 text-[15px] leading-relaxed max-w-[520px]">
            Estimate your tournament revenue and expenses — see your projected net at a glance.
          </p>
        </div>
      </section>
      <TournamentWorksheet />
    </main>
  );
}
