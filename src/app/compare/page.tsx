import type { Metadata } from 'next';
import './comparison.css';

export const metadata: Metadata = {
  title: 'YouTube vs. Anytime Soccer Training',
  description: 'See the difference between searching YouTube for soccer drills and using Anytime Soccer Training — structured, follow-along sessions with real progression.',
};

export default function ComparePage() {
  return (
    <div className="ast-comparison">
      {/* Header */}
      <div className="ast-comparison-header">
        <h1>YouTube vs. Anytime Soccer Training</h1>
        <p>
          YouTube is great for ideas — but most videos aren&apos;t follow-along,
          and it&apos;s hard to build real consistency.
        </p>
      </div>

      {/* Side by Side Videos */}
      <div className="ast-comparison-main">
        {/* Left: YouTube Example */}
        <div>
          <p className="ast-video-label">Typical YouTube Video</p>
          <div className="ast-comparison-video">
            <iframe
              src="https://www.youtube.com/embed/vnngDOCy9C8"
              title="YouTube Dribbling Video Example"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Right: AST Example */}
        <div>
          <p className="ast-video-label">Anytime Soccer Training</p>
          <div className="ast-comparison-video">
            <iframe
              src="https://www.youtube.com/embed/0hjcAaHnUic"
              title="Free Anytime Soccer Training Session"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="ast-comparison-grid">
        {/* YouTube Card */}
        <div className="ast-comparison-card youtube">
          <h3>YouTube</h3>
          <ul>
            <li>
              <span className="video-title">&ldquo;8 Cone Dribbling Drills for Soccer&rdquo;</span>
            </li>
            <li>
              <span className="video-title">
                &ldquo;6 Simple Cone Weave Dribbling Drills for Beginners&rdquo;
              </span>
            </li>
            <li>
              <span className="video-title">
                &ldquo;Improve Your Dribbling | 10 Easy Close Control Exercises&rdquo;
              </span>
            </li>
            <li>Great for ideas and examples</li>
            <li>Format varies video to video</li>
            <li>No clear progression to follow</li>
            <li>Hard to build consistency</li>
          </ul>
        </div>

        {/* AST Card */}
        <div className="ast-comparison-card ast">
          <h3>Anytime Soccer Training</h3>
          <ul>
            <li>100% follow-along sessions</li>
            <li>Clear progression built in</li>
            <li>Kids train independently</li>
            <li>Thousands of touches per session</li>
            <li>No guesswork</li>
            <li>Same drills — organized and structured</li>
            <li>Real consistency, real results</li>
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="ast-comparison-cta">
        <a href="https://app.anytime-soccer.com/auth/login" target="_blank" rel="noopener noreferrer">
          Try It Free &rarr;
        </a>
      </div>
    </div>
  );
}
