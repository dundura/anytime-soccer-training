import type { Metadata } from 'next';
import './homework.css';

export const metadata: Metadata = {
  title: 'How to Access Your Homework',
  description: 'Step-by-step guide to accessing and completing your assigned homework on Anytime Soccer Training.',
};

const steps = [
  {
    number: 1,
    title: 'Sign In & Go to Your Dashboard',
    content: (
      <>Once you sign in, click your <span className="ast-homework-highlight">player profile</span> to access your dashboard.</>
    ),
  },
  {
    number: 2,
    title: 'Quick Links (Fastest Way)',
    content: (
      <>
        Go to <span className="ast-homework-highlight">Quick Links</span> &rarr; <span className="ast-homework-highlight">My Homework</span>. Select your team name from the dropdown to see the homework your coach has assigned.
      </>
    ),
    tip: 'When you complete a video, the red X turns into a green check ✓',
  },
  {
    number: 3,
    title: 'My Teams (Manage Homework)',
    content: (
      <>
        From your dashboard, go to <span className="ast-homework-highlight">My Teams</span> &rarr; click your team &rarr; click <span className="ast-homework-highlight">Homework</span>. Here you&apos;ll see due dates and all assigned folders.
      </>
    ),
  },
  {
    number: 4,
    title: 'Mark Homework as Done',
    content: (
      <>
        When you finish all videos in a folder, go back to your homework and click <span className="ast-homework-highlight">Done</span>. You and your coach will receive a confirmation email.
      </>
    ),
    tip: 'We recommend hiding completed folders to keep things organized.',
  },
  {
    number: 5,
    title: 'Access via IDP Icon',
    content: (
      <>
        From your roster, click the <span className="ast-homework-highlight">red IDP icon</span> to jump directly to the homework your coach has specifically assigned to you.
      </>
    ),
  },
  {
    number: 6,
    title: 'All Programs Area',
    content: (
      <>
        Since you have access to all content, your <span className="ast-homework-highlight">My Homework</span> folders are also located in the All Programs area for easy access.
      </>
    ),
  },
  {
    number: 7,
    title: 'Set Your Own Due Dates',
    content: (
      <>
        Click the <span className="ast-homework-highlight">calendar icon</span> to set your own personal due date. That homework will then appear in <span className="ast-homework-highlight">My Training Calendar</span>.
      </>
    ),
  },
];

export default function HomeworkPage() {
  return (
    <div className="ast-homework">
      <div className="ast-homework-header">
        <h1>How to Access Your Homework</h1>
        <p>Welcome to Anytime Soccer Training</p>
      </div>

      <div className="ast-homework-wrapper">
        <div className="ast-homework-video">
          <div className="ast-homework-video-container">
            <iframe
              src="https://www.youtube.com/embed/y16pec7IIFQ"
              title="How to Access Your Homework"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        <div className="ast-homework-steps">
          {steps.map((step) => (
            <div key={step.number} className="ast-homework-step">
              <div className="ast-homework-step-header">
                <span className="ast-homework-step-number">{step.number}</span>
                <h3 className="ast-homework-step-title">{step.title}</h3>
              </div>
              <div className="ast-homework-step-content">
                {step.content}
                {step.tip && (
                  <div className="ast-homework-tip">
                    <p>{step.tip}</p>
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className="ast-homework-footer">
            <h3>It&apos;s never been easier to become more technical and confident on the ball.</h3>
            <p>If you have any questions, reach out to us. Let&apos;s get better together.</p>
            <p style={{ marginTop: 16, color: '#fff' }}>
              <a href="tel:803-431-1082">803-431-1082</a> &nbsp;|&nbsp;{' '}
              <a href="mailto:megan@anytime-soccer.com">megan@anytime-soccer.com</a>
            </p>
            <p className="ast-homework-signature">&mdash; Neil Crawford, Founder</p>
          </div>
        </div>
      </div>
    </div>
  );
}
