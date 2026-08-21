import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Parent Welcome Email Template | Anytime Soccer Training',
  description:
    'Download the parent welcome email template — the note that tells your parents and players what is coming. Available in English and Spanish.',
};

const EN_FILE = '/anytime-soccer-parent-welcome-email.docx';
const ES_FILE = '/anytime-soccer-parent-welcome-email-espanol.docx';

const BUTTON =
  'inline-flex items-center gap-2 font-bold text-[15px] px-7 py-3.5 rounded-xl transition-colors';

export default function WelcomeEmailTemplatePage() {
  return (
    <main>
      {/* Header */}
      <section className="bg-[#0f2642] py-10 md:py-12">
        <div className="max-w-[760px] mx-auto px-5">
          <div className="inline-flex items-center bg-[#DC373E] text-white text-[11px] font-bold tracking-widest uppercase rounded px-3 py-1 mb-5">
            Email Template
          </div>
          <h1 className="text-[clamp(24px,4vw,38px)] font-extrabold text-white leading-tight mb-4">
            Parent Welcome Email
          </h1>
          <p className="text-white/75 text-[15px] leading-relaxed max-w-[560px] mb-7">
            The note that tells your parents and players what is coming. Edit it, add your name, and
            send it.
          </p>

          <div className="flex flex-wrap gap-3">
            <a href={EN_FILE} download className={`${BUTTON} bg-[#DC373E] hover:bg-[#b92d33] text-white`}>
              ⬇ Download the Parent Welcome Template
            </a>
            <a
              href={ES_FILE}
              download
              className={`${BUTTON} bg-white/10 hover:bg-white/20 text-white border border-white/25`}
            >
              ⬇ Español
            </a>
          </div>
        </div>
      </section>

      {/* Instructions */}
      <section className="py-12 md:py-14 bg-white">
        <div className="max-w-[760px] mx-auto px-5">
          <h2 className="text-[#0f2642] text-xl font-extrabold mb-5">How to use it</h2>

          <ol className="space-y-4 mb-10">
            {[
              <>
                <strong className="text-[#0f2642]">Download the file</strong> &mdash; opens in Word.
              </>,
              <>
                <strong className="text-[#0f2642]">Edit and make your own</strong> &mdash; or simply
                add your name at the bottom.
              </>,
              <>
                <strong className="text-[#0f2642]">Send it to your parents and players.</strong> Paste
                it straight into your email, or send the file if you prefer.
              </>,
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#0f2642] text-white font-bold text-sm">
                  {i + 1}
                </span>
                <span className="text-gray-700 leading-relaxed pt-1">{item}</span>
              </li>
            ))}
          </ol>

          <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl px-5 py-4 mb-10">
            <p className="text-[#166534] font-bold text-sm mb-1">Send this before we email anyone.</p>
            <p className="text-[#166534] text-sm leading-relaxed">
              A note from their own coach is what makes families open ours. Parents who hear from you
              first sign up; parents who get a message from a company they have never heard of do not.
            </p>
          </div>

          {/* The letter itself. On the page as well as in the file, because most
              coaches will copy it into an email rather than attach a document. */}
          <h2 className="text-[#0f2642] text-xl font-extrabold mb-4">The email</h2>
          <div className="border border-gray-200 rounded-xl px-6 py-6 mb-10 text-gray-700 leading-relaxed text-[15px] space-y-4">
            <p>Hi Parents and Players,</p>
            <p>
              I&rsquo;m excited to announce that we&rsquo;re partnering with Anytime Soccer Training
              &mdash; a platform designed to help our players sharpen their skills and get those
              all-important extra touches right from home!
            </p>
            <p>
              With this partnership, you&rsquo;ll get free access to over 5,000 training videos covering
              ball mastery, dribbling, juggling, and more. The follow-along format makes it easy and fun
              for everyone.
            </p>
            <p className="font-bold text-[#0f2642]">Here&rsquo;s what to expect:</p>
            <p>
              Once your account is set up, you&rsquo;ll receive an invite to join our team on the app.
              From there, Neil Crawford (founder of Anytime Soccer Training) and I will guide you on how
              to get started. I&rsquo;ll also assign homework, set up team challenges, and add some
              friendly competition to keep things engaging!
            </p>
            <p>
              <strong className="text-[#0f2642]">Our goal:</strong> Have everyone signed up and ready to
              train by the end of this week.
            </p>
            <p>
              Be on the lookout for a welcome email from Anytime Soccer Training &mdash; it&rsquo;ll have
              everything you need to get started.
            </p>
            <p>
              In the meantime, feel free to explore their website at{' '}
              <a href="https://www.anytime-soccer.com" className="text-[#DC373E] font-semibold hover:underline">
                anytime-soccer.com
              </a>{' '}
              and check out their quick intro video at{' '}
              <a
                href="https://youtu.be/ITfUAwCdhRg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#DC373E] font-semibold hover:underline"
              >
                youtu.be/ITfUAwCdhRg
              </a>
              .
            </p>
            <p>
              Let&rsquo;s make this season unforgettable &mdash; the more effort we put in now, the
              greater results we&rsquo;ll see on the field!
            </p>
            <p className="text-gray-400">[Your Name]</p>
          </div>

          <div className="bg-[#f4f5f7] rounded-xl px-5 py-5 text-center">
            <p className="text-gray-700 text-sm mb-4">Grab the template and send it to your team.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href={EN_FILE} download className={`${BUTTON} bg-[#0f2642] hover:opacity-90 text-white`}>
                ⬇ Download the Parent Welcome Template
              </a>
              <a
                href={ES_FILE}
                download
                className={`${BUTTON} bg-white hover:bg-gray-50 text-[#0f2642] border-2 border-[#0f2642]`}
              >
                ⬇ Español
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
