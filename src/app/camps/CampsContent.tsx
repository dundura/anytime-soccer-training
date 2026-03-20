'use client';

import './camps.css';

export default function CampsContent() {
  return (
    <div className="camps-page">
      {/* Hero */}
      <section className="camps-hero">
        <div className="camps-container">
          <h1 className="camps-hero-title">
            Free Soccer Training<br />for Your Campers
          </h1>
          <p className="camps-hero-sub">
            Your campers get free access to 5,000+ follow-along training videos. You manage the experience during camp and beyond.
          </p>
          <a href="mailto:programs@fusion-training.com?subject=Summer%20Camp%20Program&body=Camp%20Name%3A%20%0ANumber%20of%20Players%3A%20%0ACamp%20Dates%3A%20%0AContact%20Name%3A%20%0A" className="camps-btn camps-btn-primary">
            Email to Join
          </a>
        </div>
      </section>

      {/* What Campers Get */}
      <section className="camps-section">
        <div className="camps-container">
          <h2 className="camps-section-title">What Your Campers Get</h2>
          <div className="camps-features">
            <div className="camps-feature">
              <div className="camps-feature-icon">&#9917;</div>
              <h3>5,000+ Training Videos</h3>
              <p>Ball mastery, dribbling, passing, juggling, finishing, 1v1 moves. All follow-along.</p>
            </div>
            <div className="camps-feature">
              <div className="camps-feature-icon">&#128197;</div>
              <h3>Structured Plans</h3>
              <p>Weekly and daily plans that keep players progressing through camp and all year.</p>
            </div>
            <div className="camps-feature">
              <div className="camps-feature-icon">&#128202;</div>
              <h3>Progress Tracking</h3>
              <p>See who is training, how much time they put in, and who is leading the pack.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What Directors Get */}
      <section className="camps-section camps-section-alt">
        <div className="camps-container">
          <h2 className="camps-section-title">What You Get as a Director</h2>
          <div className="camps-steps">
            <div className="camps-step">
              <div className="camps-step-num">&#9733;</div>
              <h3>Team Dashboard</h3>
              <p>Manage all your campers, assign training, and track participation from one place.</p>
            </div>
            <div className="camps-step">
              <div className="camps-step-num">&#9733;</div>
              <h3>Marketing Resources</h3>
              <p>Logos and graphics to add to your website and camp materials.</p>
            </div>
            <div className="camps-step">
              <div className="camps-step-num">&#9733;</div>
              <h3>Year-Round Value</h3>
              <p>Camp ends but the training continues. Players keep access all year.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="camps-cta">
        <div className="camps-container">
          <h2>Ready to Join?</h2>
          <p className="camps-cta-sub">Email <strong>programs@fusion-training.com</strong> with:</p>
          <ul className="camps-email-list">
            <li>Your camp name</li>
            <li>Number of players</li>
            <li>Camp dates</li>
            <li>Your contact name</li>
          </ul>
          <a href="mailto:programs@fusion-training.com?subject=Summer%20Camp%20Program&body=Camp%20Name%3A%20%0ANumber%20of%20Players%3A%20%0ACamp%20Dates%3A%20%0AContact%20Name%3A%20%0A" className="camps-btn camps-btn-white">
            Send Email Now
          </a>
        </div>
      </section>
    </div>
  );
}
