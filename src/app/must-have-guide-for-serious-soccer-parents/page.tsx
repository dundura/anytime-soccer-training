import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'The Must-Have Guide to In-Home Soccer Training — Anytime Soccer Training',
  description: 'A free ebook packed with practical tips from a passionate soccer parent and coach. Help your child practice at home effectively.',
};

export default function MustHaveGuidePage() {
  return (
    <>
      <section className="bg-background py-16 px-6 min-h-screen">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">

            {/* Left — Image + Reviews */}
            <div className="flex flex-col gap-6">
              <div>
                <img
                  src="https://img.mailinblue.com/4496497/images/rnb/original/6491dbaae73a6110193556a9.png"
                  alt="The Must-Have Guide to In-Home Soccer Training"
                  className="w-full rounded-2xl shadow-[0_24px_48px_rgba(15,49,84,0.15)]"
                />
              </div>

              {/* Reviews */}
              <div className="flex flex-col gap-4">
                <div className="bg-white rounded-xl p-5 shadow-[0_4px_12px_rgba(15,49,84,0.06)]">
                  <div className="text-[#facc15] text-lg tracking-[2px] mb-2">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                  <p className="text-[15px] text-navy leading-relaxed italic mb-2">
                    &ldquo;This guide helped me understand exactly how to support my son&rsquo;s training at home. Game changer!&rdquo;
                  </p>
                  <span className="text-[13px] text-gray font-medium">&mdash; Sarah M., Soccer Mom</span>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-[0_4px_12px_rgba(15,49,84,0.06)]">
                  <div className="text-[#facc15] text-lg tracking-[2px] mb-2">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                  <p className="text-[15px] text-navy leading-relaxed italic mb-2">
                    &ldquo;Finally, practical advice that actually works. My daughter improved so much in just a few weeks.&rdquo;
                  </p>
                  <span className="text-[13px] text-gray font-medium">&mdash; David R., Soccer Dad</span>
                </div>
              </div>
            </div>

            {/* Right — Form Content */}
            <div className="bg-white rounded-2xl p-10 shadow-[0_8px_24px_rgba(15,49,84,0.08)]">
              <h2 className="text-[1.75rem] font-bold text-navy leading-tight mb-2">
                The Must-Have Guide to <span className="text-red">In-Home Soccer Training</span>
              </h2>
              <p className="text-gray mb-6 text-base leading-relaxed">
                A free ebook packed with practical tips from a passionate soccer parent and coach.
              </p>

              <ul className="list-none p-0 mb-6 space-y-2">
                {[
                  'Help your child practice at home effectively',
                  'Know what to look for in a club',
                  "Support your player's development",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-[15px] text-navy font-bold">
                    <span className="text-red font-bold">&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* GHL Form */}
              <div className="min-h-[536px] my-6">
                <iframe
                  src="https://api.leadconnectorhq.com/widget/form/V3lq2xI6NRyCJ1OKrcMn"
                  style={{ width: '100%', height: '536px', border: 'none', borderRadius: '3px' }}
                  id="inline-V3lq2xI6NRyCJ1OKrcMn"
                  data-layout="{'id':'INLINE'}"
                  data-trigger-type="alwaysShow"
                  data-activation-type="alwaysActivated"
                  data-deactivation-type="neverDeactivate"
                  data-form-name="In-home Training Ebook"
                  data-height="536"
                  data-layout-iframe-id="inline-V3lq2xI6NRyCJ1OKrcMn"
                  data-form-id="V3lq2xI6NRyCJ1OKrcMn"
                  title="In-home Training Ebook"
                />
              </div>

              <p className="text-center text-[13px] text-gray mt-4">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </div>

          </div>
        </div>
      </section>

      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
    </>
  );
}
