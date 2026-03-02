import type { Metadata } from 'next';
import GuestPlayingContent from '@/components/GuestPlayingContent';

export const metadata: Metadata = {
  title: 'Guest Playing Guide | Anytime Soccer Training',
  description: 'Everything you need to know about guest playing — understand player cards, carding bodies, costs, and how to get your child more exposure and experience.',
};

export default function GuestPlayingGuidePage() {
  return (
    <section className="bg-background py-16 md:py-20">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* Left - Image + Reviews */}
          <div className="flex flex-col gap-6">
            <img
              src="http://media.anytime-soccer.com/wp-content/uploads/2024/12/is-soccer-in-the-u.s.-really-that-expensive-.png"
              alt="Everything You Need to Know About Guest Playing"
              className="w-full rounded-2xl shadow-[0_24px_48px_rgba(15,49,84,0.15)]"
            />

            {/* Reviews */}
            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-xl p-5 shadow-[0_4px_12px_rgba(15,49,84,0.06)]">
                <div className="text-amber-400 text-lg tracking-wider mb-2">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <p className="text-[15px] text-navy leading-relaxed italic mb-2">
                  &ldquo;I had no idea how player cards and guest playing worked. This guide explained everything — from carding bodies to tournament paperwork. Super helpful!&rdquo;
                </p>
                <span className="text-[13px] text-[#6b7280] font-medium">&mdash; Sarah T., Soccer Parent</span>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-[0_4px_12px_rgba(15,49,84,0.06)]">
                <div className="text-amber-400 text-lg tracking-wider mb-2">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <p className="text-[15px] text-navy leading-relaxed italic mb-2">
                  &ldquo;My son got his first guest playing opportunity because I finally understood how to navigate the process. This ebook is a must-read for competitive soccer parents.&rdquo;
                </p>
                <span className="text-[13px] text-[#6b7280] font-medium">&mdash; Marcus L., Club Soccer Dad</span>
              </div>
            </div>
          </div>

          {/* Right - Content + Form */}
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-[0_8px_24px_rgba(15,49,84,0.08)]">
            <h1 className="text-[clamp(24px,3vw,32px)] font-extrabold text-navy leading-tight mb-2">
              Everything You Need to Know About <span className="text-red">Guest Playing</span>
            </h1>
            <p className="text-[#6b7280] text-base mb-6 leading-relaxed">
              The complete guide to guest player opportunities — understand player cards, carding bodies, costs, and how to get your child more exposure and experience.
            </p>

            <ul className="list-none p-0 m-0 mb-6 space-y-2">
              {[
                'Understand USYS, US Club Soccer & carding bodies',
                'Know the real costs of guest playing',
                'Navigate cross-border opportunities (US & Canada)',
                'Get the paperwork right every time',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-[15px] text-navy font-bold">
                  <span className="text-red font-bold">&#10003;</span>
                  {item}
                </li>
              ))}
            </ul>

            {/* GHL Form */}
            <GuestPlayingContent />

            <p className="text-center text-[13px] text-[#6b7280] mt-4">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
