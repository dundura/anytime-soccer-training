import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Request a Team Demo',
  description: 'See how top coaches use Anytime Soccer Training to develop players faster. Request a free 15-minute demo.',
};

export default function TeamDemoPage() {
  return (
    <>
      <div className="bg-gradient-to-br from-[#0f2642] via-[#1a3a5c] to-[#0f2642] py-16 px-5 text-[#333]" style={{ fontFamily: "'Source Sans Pro', sans-serif" }}>
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-white text-[clamp(2.2rem,5vw,3rem)] tracking-[2px] mb-2.5" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              GIVE YOUR TEAM <span className="text-[#c80b3d]">THE EDGE</span>
            </h1>
            <p className="text-white/80 text-xl max-w-[500px] mx-auto">
              See how top coaches use Anytime Soccer Training to develop players faster
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Benefits - Left Side */}
            <div className="py-5 order-2 lg:order-1">
              <h2 className="text-white text-[clamp(2rem,4vw,2.5rem)] mb-8 tracking-[1px]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                WHAT YOU <span className="text-[#c80b3d]">GET</span>
              </h2>

              {[
                { icon: '📋', title: 'Assign Team & Individual Homework', desc: 'Send specific training to your entire team or customize plans for individual players based on their needs.' },
                { icon: '📊', title: 'Track Training Volume', desc: "See exactly who's putting in the work at home. Real data, real accountability, real results." },
                { icon: '🏆', title: 'Set Contests & Challenges', desc: 'Motivate players with friendly competition. Leaderboards and challenges keep them coming back for more.' },
                { icon: '🎬', title: '5,000+ Training Videos', desc: 'From beginner fundamentals to advanced techniques — every skill level covered with pro-quality instruction.' },
              ].map((benefit) => (
                <div
                  key={benefit.title}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-5 border border-white/10 transition-all hover:translate-x-2.5 hover:bg-white/15"
                >
                  <h3 className="text-white text-lg font-bold mb-2 flex items-center gap-3">
                    <span className="w-10 h-10 bg-[#c80b3d] rounded-full flex items-center justify-center text-xl flex-shrink-0">
                      {benefit.icon}
                    </span>
                    {benefit.title}
                  </h3>
                  <p className="text-white/70 pl-[52px]">{benefit.desc}</p>
                </div>
              ))}

              {/* Price Badge */}
              <div className="bg-gradient-to-br from-[#c80b3d] to-[#e91e63] rounded-2xl p-8 text-center mt-8 relative overflow-hidden">
                <div className="text-white text-[3.5rem] leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  ONLY $6
                </div>
                <div className="text-white/90 text-lg mt-1">per player, per year</div>
                <div className="mt-4 pt-4 border-t border-white/30 text-white font-bold text-xl">
                  &#10003; Unlimited Access to All Features
                </div>
              </div>

              {/* Testimonial */}
              <div className="mt-8 p-5 bg-white/5 rounded-xl border-l-4 border-[#c80b3d]">
                <p className="text-white/90 italic leading-relaxed">
                  &ldquo;Finally, a way to know my players are actually training between practices. The tracking feature alone is worth it.&rdquo;
                </p>
                <div className="text-white/70 text-sm mt-2.5 not-italic">
                  &mdash; Club Director, Texas
                </div>
              </div>
            </div>

            {/* Form - Right Side */}
            <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-[0_25px_50px_rgba(0,0,0,0.3)] order-1 lg:order-2">
              <h2 className="text-[#0f2642] text-3xl text-center mb-2.5 tracking-[1px]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                REQUEST A FREE DEMO
              </h2>
              <p className="text-center text-gray-500 mb-8">
                See how it works for your team in 15 minutes
              </p>

              {/* GHL Form */}
              <div className="min-h-[754px]">
                <iframe
                  src="https://api.leadconnectorhq.com/widget/form/Ooz8uy0XcXwo8oO2TQh9"
                  style={{ width: '100%', height: '754px', border: 'none', borderRadius: '3px' }}
                  id="inline-Ooz8uy0XcXwo8oO2TQh9"
                  data-layout="{'id':'INLINE'}"
                  data-trigger-type="alwaysShow"
                  data-activation-type="alwaysActivated"
                  data-deactivation-type="neverDeactivate"
                  data-form-name="Team Demo Request Form"
                  data-height="754"
                  data-layout-iframe-id="inline-Ooz8uy0XcXwo8oO2TQh9"
                  data-form-id="Ooz8uy0XcXwo8oO2TQh9"
                  title="Team Demo Request Form"
                />
              </div>

              <p className="text-center text-gray-400 text-sm mt-5">
                &#128274; We respect your privacy. No spam, ever.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-10 mt-16 border-t border-white/10 text-white/60 text-sm">
            <p>
              &copy; 2025 Anytime Soccer Training &middot;{' '}
              <a href="https://app.anytime-soccer.com/privacyPolicy" className="text-white/80 hover:text-white hover:underline transition-colors">
                Privacy Policy
              </a>{' '}
              &middot;{' '}
              <a href="https://app.anytime-soccer.com/termsNconditions" className="text-white/80 hover:text-white hover:underline transition-colors">
                Terms &amp; Conditions
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* GHL Form Script */}
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
    </>
  );
}
