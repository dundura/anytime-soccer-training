'use client';

import Link from 'next/link';
import './camps.css';

export default function CampsContent() {
  return (
    <div className="camps-page">
      {/* Hero */}
      <section className="camps-hero">
        <div className="camps-container">
          <span className="camps-badge">For Camp Directors</span>
          <h1 className="camps-hero-title">
            Give Your Campers the Best<br />Soccer Training Experience
          </h1>
          <p className="camps-hero-sub">
            5,000+ follow-along training videos. Your campers get <strong>free access</strong> to train on their own. You manage the experience.
          </p>
          <div className="camps-hero-btns">
            <a href="mailto:programs@fusion-training.com?subject=Summer%20Camp%20Program%20Interest" className="camps-btn camps-btn-primary">
              Join the Program
            </a>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="camps-section">
        <div className="camps-container">
          <h2 className="camps-section-title">How It Works</h2>
          <p className="camps-section-sub">Set it up in minutes. Your campers train all summer and beyond.</p>
          <div className="camps-steps">
            <div className="camps-step">
              <div className="camps-step-num">1</div>
              <h3>Sign Up Your Camp</h3>
              <p>Email us to join. We handle all the setup and onboarding so your campers get free access.</p>
            </div>
            <div className="camps-step">
              <div className="camps-step-num">2</div>
              <h3>Manage During Camp</h3>
              <p>Assign training plans, track progress, and keep campers engaged with structured daily sessions.</p>
            </div>
            <div className="camps-step">
              <div className="camps-step-num">3</div>
              <h3>Keep Them Training</h3>
              <p>After camp ends, players keep access. Populate programs you think would benefit them all year long.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What Your Campers Get */}
      <section className="camps-section camps-section-alt">
        <div className="camps-container">
          <h2 className="camps-section-title">What Your Campers Get</h2>
          <div className="camps-features">
            <div className="camps-feature">
              <div className="camps-feature-icon">&#9917;</div>
              <h3>5,000+ Training Videos</h3>
              <p>Ball mastery, dribbling, passing, juggling, finishing, 1v1 moves, and more. All follow-along.</p>
            </div>
            <div className="camps-feature">
              <div className="camps-feature-icon">&#128197;</div>
              <h3>Weekly Plans</h3>
              <p>Structured week-by-week programs that keep players progressing through camp and beyond.</p>
            </div>
            <div className="camps-feature">
              <div className="camps-feature-icon">&#9889;</div>
              <h3>Quick Sessions</h3>
              <p>10-15 minute focused sessions your campers can do at home, at the field, or anywhere with a ball.</p>
            </div>
            <div className="camps-feature">
              <div className="camps-feature-icon">&#128202;</div>
              <h3>Progress Tracking</h3>
              <p>See which players are training, how much time they are putting in, and who is leading the pack.</p>
            </div>
            <div className="camps-feature">
              <div className="camps-feature-icon">&#127942;</div>
              <h3>Leaderboards</h3>
              <p>Built-in competition keeps campers motivated. Weekly and all-time rankings drive engagement.</p>
            </div>
            <div className="camps-feature">
              <div className="camps-feature-icon">&#128241;</div>
              <h3>Works on Any Device</h3>
              <p>Phone, tablet, or computer. No downloads required. Players log in and press play.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get as a Camp Director */}
      <section className="camps-section">
        <div className="camps-container">
          <h2 className="camps-section-title">What You Get as a Director</h2>
          <div className="camps-director-grid">
            <div className="camps-director-card">
              <h3>Your Own Team Dashboard</h3>
              <p>Manage all your campers from one place. See who is training, assign homework, and track participation.</p>
            </div>
            <div className="camps-director-card">
              <h3>Marketing Resources</h3>
              <p>Logos, graphics, and messaging you can add to your website and camp materials to promote the program.</p>
            </div>
            <div className="camps-director-card">
              <h3>Free for Your Campers</h3>
              <p>Your camp covers the cost. Your campers get full access at no charge. It is a value-add that sets your program apart.</p>
            </div>
            <div className="camps-director-card">
              <h3>Year-Round Value</h3>
              <p>Your camp ends in a few weeks. The training doesn't have to. Give families a reason to remember your program all year.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Case */}
      <section className="camps-section camps-section-alt">
        <div className="camps-container">
          <div className="camps-usecase">
            <h2 className="camps-section-title">Built for Directors Like You</h2>
            <blockquote className="camps-quote">
              &ldquo;I want to manage their use of the platform during the month of July and then encourage them to continue utilizing it all year. After my program ends, I&rsquo;ll populate a bunch of options I think would be beneficial for them.&rdquo;
            </blockquote>
            <p className="camps-quote-attr">&mdash; Camp Director preparing for Summer 2026</p>
            <p className="camps-usecase-text">
              This is exactly how Anytime Soccer Training is designed to work. You run the show during camp.
              You pick the programs. You track the progress. And when camp is over, the players keep going
              with the foundation you built for them.
            </p>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="camps-section">
        <div className="camps-container">
          <h2 className="camps-section-title">What&apos;s Included</h2>
          <div className="camps-pricing">
            <div className="camps-price-card">
              <div className="camps-price-amount">FREE</div>
              <div className="camps-price-per">for your campers</div>
              <ul className="camps-price-list">
                <li>Full platform access</li>
                <li>5,000+ training videos</li>
                <li>Team dashboard for directors</li>
                <li>Progress tracking and leaderboards</li>
                <li>Marketing resources and logos</li>
                <li>Year-round access for players</li>
              </ul>
              <a href="mailto:programs@fusion-training.com?subject=Summer%20Camp%20Program%20Interest" className="camps-btn camps-btn-primary camps-btn-full">
                Email to Join
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="camps-cta">
        <div className="camps-container">
          <h2>Ready to Level Up Your Camp?</h2>
          <p>Email us and we will get you set up before summer starts.</p>
          <div className="camps-hero-btns">
            <a href="mailto:programs@fusion-training.com?subject=Summer%20Camp%20Program%20Interest" className="camps-btn camps-btn-white">
              Email programs@fusion-training.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
