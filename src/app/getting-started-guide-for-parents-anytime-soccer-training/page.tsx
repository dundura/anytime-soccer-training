import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Getting Started Guide for Parents — Anytime Soccer Training',
  description: 'A step-by-step guide for parents to set up a training plan, add player profiles, and get the most out of Anytime Soccer Training.',
  openGraph: {
    title: 'Getting Started Guide for Parents — Anytime Soccer Training',
    description: 'Set up a full training plan for your child and start tracking progress today.',
    images: [{ url: 'https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1774959685241-1scke0.png', width: 1200, height: 630 }],
  },
};

export default function ParentsGettingStartedPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-6 pb-6 md:pt-8 md:pb-8 bg-background">
        <div className="max-w-[700px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold text-[#6b7280] mb-2">For Parents</p>
            <h1 className="text-[clamp(22px,4vw,34px)] font-extrabold leading-[1.15] text-navy mb-3">
              Getting Started Guide for Parents
            </h1>
            <p className="text-[#5a7089] text-base max-w-xl mx-auto">
              Watch the videos below to get the most out of Anytime Soccer Training.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-[700px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-16 bg-background">

        {/* VIDEO 1 */}
        <div>
          <div className="mb-3">
            <p className="text-xs font-bold text-red uppercase tracking-widest mb-1">Video 1</p>
            <h2 className="text-xl font-extrabold text-navy leading-snug">
              Setting up a Full Training Plan Using the Full Curriculum
            </h2>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(15,49,84,0.12)] bg-black">
            <iframe
              src="https://www.youtube.com/embed/hYRoOMLeiD8"
              title="Setting up a Full Training Plan Using the Full Curriculum"
              className="w-full aspect-video border-none block"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* VIDEO 2 */}
        <div>
          <div className="mb-3">
            <p className="text-xs font-bold text-red uppercase tracking-widest mb-1">Video 2</p>
            <h2 className="text-xl font-extrabold text-navy leading-snug">
              How to Use the All Programs Section to Build Your Player&apos;s Training Session
            </h2>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(15,49,84,0.12)] bg-black">
            <iframe
              src="https://www.youtube.com/embed/Kpx_pv6HYyQ"
              title="How to Use the All Programs Section to Build Your Player's Training Session"
              className="w-full aspect-video border-none block"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* VIDEO 3 */}
        <div>
          <div className="mb-3">
            <p className="text-xs font-bold text-red uppercase tracking-widest mb-1">Video 3</p>
            <h2 className="text-xl font-extrabold text-navy leading-snug">
              How to Create Custom Training Session Folders on Anytime Soccer Training
            </h2>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(15,49,84,0.12)] bg-black">
            <iframe
              src="https://www.youtube.com/embed/Wln60q78WsI"
              title="How to Create Custom Training Session Folders on Anytime Soccer Training"
              className="w-full aspect-video border-none block"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-2 pb-4">
          <a
            href="https://anytime-soccer.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-red hover:bg-red-dark text-white px-8 py-4 rounded-full font-bold text-base transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(220,55,62,0.35)] no-underline"
          >
            Get Started Free &rarr;
          </a>
        </div>

        {/* Contact */}
        <div className="text-center pb-8 text-[#6b7280] text-[15px]">
          Questions? Email{' '}
          <a href="mailto:megan@anytime-soccer.com" className="text-red font-semibold no-underline">
            megan@anytime-soccer.com
          </a>{' '}
          or call{' '}
          <a href="tel:803-431-1082" className="text-red font-semibold no-underline">
            803-431-1082
          </a>
        </div>
      </div>
    </>
  );
}
