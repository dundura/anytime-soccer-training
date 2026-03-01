'use client';

import { useState } from 'react';
import './pricing.css';

export default function PricingContent() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('annual');

  return (
    <div className="ast-pricing">
      <div className="ast-container">

        {/* Header */}
        <div className="ast-header">
          <h2>Better Players Start Here</h2>
          <p>5,000+ drills. Press play. Improve.</p>
        </div>

        {/* Billing Toggle */}
        <div className="ast-toggle-wrap">
          <div className="ast-toggle">
            <button
              className={`ast-toggle-btn ${billing === 'monthly' ? 'active' : ''}`}
              onClick={() => setBilling('monthly')}
            >
              Monthly
            </button>
            <button
              className={`ast-toggle-btn ${billing === 'annual' ? 'active' : ''}`}
              onClick={() => setBilling('annual')}
            >
              Annual
            </button>
            <span
              className="ast-savings-badge"
              style={{ opacity: billing === 'annual' ? 1 : 0.5 }}
            >
              Save 49%
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="ast-cards">

          {/* Free */}
          <div className="ast-card">
            <span className="ast-badge">Free Forever</span>
            <div className="ast-plan-name">Free</div>
            <div className="ast-price">
              <span className="ast-price-amount">$0</span>
              <span className="ast-price-period">/forever</span>
            </div>
            <p className="ast-price-note">&nbsp;</p>
            <ul className="ast-features">
              <li><span className="ast-check">&#10003;</span> Dozens of free videos forever</li>
              <li><span className="ast-check">&#10003;</span> Ball mastery, dribbling &amp; more</li>
              <li><span className="ast-check">&#10003;</span> Games &amp; 1v1 challenges</li>
              <li><span className="ast-check">&#10003;</span> Free 7-day training plan</li>
              <li><span className="ast-check">&#10003;</span> No credit card required</li>
            </ul>
            <a href="https://app.anytime-soccer.com/auth/registerFree" className="ast-btn ast-btn-outline">
              Get Started
            </a>
          </div>

          {/* All Access */}
          <div className="ast-card featured">
            <span className="ast-badge">Most Popular</span>
            <div className="ast-plan-name">All Access</div>

            {billing === 'monthly' ? (
              <>
                <div className="ast-price">
                  <span className="ast-price-amount">$9.89</span>
                  <span className="ast-price-period">/month</span>
                </div>
                <p className="ast-price-note">Billed monthly. Cancel anytime.</p>
              </>
            ) : (
              <>
                <div className="ast-price">
                  <span className="ast-price-amount">$59.98</span>
                  <span className="ast-price-period">/year</span>
                </div>
                <p className="ast-price-note">
                  Just $5.00/month. <span className="ast-highlight">Save 49%!</span>
                </p>
              </>
            )}

            <ul className="ast-features">
              <li><span className="ast-check">&#10003;</span> 5,000+ training videos</li>
              <li><span className="ast-check">&#10003;</span> 100+ challenges</li>
              <li><span className="ast-check">&#10003;</span> Goals &amp; progress tracking</li>
              <li><span className="ast-check">&#10003;</span> Coach assignments</li>
              <li><span className="ast-check">&#10003;</span> Cancel anytime</li>
            </ul>
            <a href="https://app.anytime-soccer.com/auth/registerFree" className="ast-btn ast-btn-primary">
              Start Free Trial
            </a>
          </div>

          {/* Teams */}
          <div className="ast-card">
            <span className="ast-badge">For Coaches</span>
            <div className="ast-plan-name">Teams</div>
            <div className="ast-price">
              <span className="ast-price-amount">$6</span>
              <span className="ast-price-period">/player/year</span>
            </div>
            <p className="ast-price-note">Minimum 10 players</p>
            <ul className="ast-features">
              <li><span className="ast-check">&#10003;</span> All Access for every player</li>
              <li><span className="ast-check">&#10003;</span> Team goals &amp; reports</li>
              <li><span className="ast-check">&#10003;</span> Progress tracking</li>
              <li><span className="ast-check">&#10003;</span> Auto homework reminders</li>
            </ul>
            <a href="https://anytime-soccer.com/team-demo-request-anytime-soccer-training/" className="ast-btn ast-btn-outline">
              Request Demo
            </a>
          </div>

        </div>

        {/* Additional Players Note */}
        <div className="ast-addon-note">
          <p>
            🎉 <strong>Multiple players?</strong> Add extra players for just{' '}
            <strong>{billing === 'monthly' ? '$3.99/month' : '$19.98/year'}</strong> each
            {billing === 'annual'
              ? ' — save 58%!'
              : ' — switch to annual and save 58%!'}
          </p>
        </div>

        {/* Video */}
        <div className="ast-video-section">
          <h3>See It in Action</h3>
          <div className="ast-video-wrap">
            <iframe
              loading="lazy"
              src="https://www.youtube.com/embed/HsoTlfJn-RA?si=9Cynjmkm-KvaoD8B"
              title="How Anytime Soccer Works"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Reviews */}
        <div className="ast-reviews">
          <h3>Real Results</h3>
          <div className="ast-reviews-grid">

            <div className="ast-review">
              <p className="ast-review-text">
                &ldquo;My sons train every day. The improvement is obvious.&rdquo;
              </p>
              <div className="ast-review-author">
                <div className="ast-review-avatar">AS</div>
                <div>
                  <div className="ast-review-name">Alex Stuart</div>
                  <div className="ast-review-role">Parent, Dallas</div>
                </div>
              </div>
            </div>

            <div className="ast-review">
              <p className="ast-review-text">
                &ldquo;She trained after school every day. Made the ECNL team.&rdquo;
              </p>
              <div className="ast-review-author">
                <div className="ast-review-avatar">CB</div>
                <div>
                  <div className="ast-review-name">Cathy Blount</div>
                  <div className="ast-review-role">Parent, Oakridge</div>
                </div>
              </div>
            </div>

            <div className="ast-review">
              <p className="ast-review-text">
                &ldquo;One coach recommended it. Now our entire club uses it.&rdquo;
              </p>
              <div className="ast-review-author">
                <div className="ast-review-avatar">SG</div>
                <div>
                  <div className="ast-review-name">Sammy Gilford</div>
                  <div className="ast-review-role">Coach, Triangle FC</div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
