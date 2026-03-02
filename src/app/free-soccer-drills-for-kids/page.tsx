import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Free 7-Day Soccer Training Plan | Anytime Soccer Training',
  description: 'Get a free 7-day soccer training plan delivered to your inbox. Follow-along video training, just 10 minutes a day. Perfect for ages 6-14.',
};

export default function FreeSoccerDrillsPage() {
  return (
    <>
      <div
        className="ast-7day-landing-page"
        dangerouslySetInnerHTML={{
          __html: `
<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,700&family=Fraunces:opsz,wght@9..144,600;9..144,700&display=swap');

.ast-7day-landing {
  --ast-navy: #0F3154;
  --ast-red: #DC373E;
  --ast-ice: #ECF1F7;
  --ast-white: #ffffff;
  --ast-gray: #6b7280;
  --ast-radius: 16px;
  font-family: 'DM Sans', sans-serif;
  background: var(--ast-ice);
  padding: 60px 24px;
  min-height: 100vh;
}

.ast-7day-landing * {
  box-sizing: border-box;
}

.ast-7day-landing-container {
  max-width: 1100px;
  margin: 0 auto;
}

.ast-7day-landing-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: start;
}

@media (max-width: 800px) {
  .ast-7day-landing-grid {
    grid-template-columns: 1fr;
  }
}

.ast-7day-landing-left {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.ast-7day-landing-graphic {
  background: var(--ast-white);
  border-radius: var(--ast-radius);
  padding: 32px;
  box-shadow: 0 24px 48px rgba(15, 49, 84, 0.15);
}

.ast-7day-landing-badge {
  display: inline-block;
  background: var(--ast-red);
  color: var(--ast-white);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 6px 14px;
  border-radius: 100px;
  margin-bottom: 16px;
}

.ast-7day-landing-graphic h3 {
  font-family: 'DM Sans', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--ast-navy);
  line-height: 1;
  margin-bottom: 4px;
}

.ast-7day-landing-graphic .plan-subtitle {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--ast-navy);
  letter-spacing: 0.05em;
  margin-bottom: 20px;
}

.ast-7day-landing-graphic .plan-description {
  font-size: 0.9375rem;
  color: var(--ast-gray);
  line-height: 1.6;
  margin-bottom: 24px;
}

.ast-7day-landing-days {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ast-7day-landing-day {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  background: var(--ast-ice);
  border-radius: 10px;
  transition: transform 0.2s ease;
}

.ast-7day-landing-day:hover {
  transform: translateX(4px);
}

.ast-7day-landing-day-number {
  background: var(--ast-navy);
  color: var(--ast-white);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
  flex-shrink: 0;
}

.ast-7day-landing-day-info {
  flex: 1;
}

.ast-7day-landing-day-title {
  font-weight: 700;
  font-size: 0.9375rem;
  color: var(--ast-navy);
}

.ast-7day-landing-day-duration {
  font-size: 0.8125rem;
  color: var(--ast-gray);
}

.ast-7day-landing-day-icon {
  font-size: 1.25rem;
}

.ast-7day-landing-reviews {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.ast-7day-landing-review {
  background: var(--ast-white);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(15, 49, 84, 0.06);
}

.ast-7day-landing-stars {
  color: #facc15;
  font-size: 1.125rem;
  margin-bottom: 8px;
  letter-spacing: 2px;
}

.ast-7day-landing-review p {
  font-size: 0.9375rem;
  color: var(--ast-navy);
  line-height: 1.5;
  font-style: italic;
  margin-bottom: 8px;
}

.ast-7day-landing-reviewer {
  font-size: 0.8125rem;
  color: var(--ast-gray);
  font-weight: 500;
}

.ast-7day-landing-content {
  background: var(--ast-white);
  border-radius: var(--ast-radius);
  padding: 40px;
  box-shadow: 0 8px 24px rgba(15, 49, 84, 0.08);
}

.ast-7day-landing-content h2 {
  font-family: 'DM Sans', sans-serif;
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--ast-navy);
  margin-bottom: 8px;
  line-height: 1.2;
  margin-top: 0;
}

.ast-7day-landing-content h2 span {
  color: var(--ast-red);
  font-family: inherit;
}

.ast-7day-landing-content .ast-subtitle {
  color: var(--ast-gray);
  margin-bottom: 24px;
  font-size: 1rem;
  line-height: 1.5;
}

.ast-7day-landing-content .ast-benefits {
  list-style: none;
  margin-bottom: 24px;
  padding: 0;
}

.ast-7day-landing-content .ast-benefits li {
  padding: 8px 0;
  font-size: 0.9375rem;
  color: var(--ast-navy);
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
}

.ast-7day-landing-content .ast-benefits li::before {
  content: "\\2713";
  font-weight: 700;
  color: var(--ast-red);
}

.ast-7day-landing-form-container {
  width: 100%;
  min-height: 500px;
  position: relative;
  margin-top: -40px;
  overflow: hidden;
}

.ast-7day-landing-form-container iframe {
  margin-top: -60px;
}

.ast-7day-landing-footer {
  text-align: center;
  margin-top: 16px;
  font-size: 0.8125rem;
  color: var(--ast-gray);
}
</style>

<div class="ast-7day-landing">
  <div class="ast-7day-landing-container">
    <div class="ast-7day-landing-grid">

      <div class="ast-7day-landing-left">
        <div class="ast-7day-landing-graphic">
          <span class="ast-7day-landing-badge">🎁 100% Free</span>
          <h3>7-Day</h3>
          <div class="plan-subtitle">TRAINING PLAN</div>
          <p class="plan-description">Follow-along video training sent to your inbox. Just 10 minutes a day to transform your player's skills.</p>

          <div class="ast-7day-landing-days">
            <div class="ast-7day-landing-day">
              <div class="ast-7day-landing-day-number">1</div>
              <div class="ast-7day-landing-day-info">
                <div class="ast-7day-landing-day-title">Ball Mastery</div>
                <div class="ast-7day-landing-day-duration">10 min • Follow-along</div>
              </div>
              <div class="ast-7day-landing-day-icon">⚽</div>
            </div>
            <div class="ast-7day-landing-day">
              <div class="ast-7day-landing-day-number">2</div>
              <div class="ast-7day-landing-day-info">
                <div class="ast-7day-landing-day-title">Juggling Basics</div>
                <div class="ast-7day-landing-day-duration">10 min • Follow-along</div>
              </div>
              <div class="ast-7day-landing-day-icon">⚽</div>
            </div>
            <div class="ast-7day-landing-day">
              <div class="ast-7day-landing-day-number">3</div>
              <div class="ast-7day-landing-day-info">
                <div class="ast-7day-landing-day-title">Cone Drills</div>
                <div class="ast-7day-landing-day-duration">10 min • Follow-along</div>
              </div>
              <div class="ast-7day-landing-day-icon">⚽</div>
            </div>
            <div class="ast-7day-landing-day">
              <div class="ast-7day-landing-day-number">4</div>
              <div class="ast-7day-landing-day-info">
                <div class="ast-7day-landing-day-title">Dribbling Skills</div>
                <div class="ast-7day-landing-day-duration">10 min • Follow-along</div>
              </div>
              <div class="ast-7day-landing-day-icon">⚽</div>
            </div>
            <div class="ast-7day-landing-day">
              <div class="ast-7day-landing-day-number">5</div>
              <div class="ast-7day-landing-day-info">
                <div class="ast-7day-landing-day-title">+ 3 More Days...</div>
                <div class="ast-7day-landing-day-duration">Passing, Shooting & Skills Test</div>
              </div>
              <div class="ast-7day-landing-day-icon">🏆</div>
            </div>
          </div>
        </div>

        <div class="ast-7day-landing-reviews">
          <div class="ast-7day-landing-review">
            <div class="ast-7day-landing-stars">★★★★★</div>
            <p>"My son completed all 7 days and asked for more. He's never been this motivated to train on his own."</p>
            <span class="ast-7day-landing-reviewer">— Chris M., Soccer Dad</span>
          </div>
          <div class="ast-7day-landing-review">
            <div class="ast-7day-landing-stars">★★★★★</div>
            <p>"Finally, a plan I can just hand to my daughter. She presses play and knows exactly what to do."</p>
            <span class="ast-7day-landing-reviewer">— Rachel K., Soccer Mom</span>
          </div>
        </div>
      </div>

      <div class="ast-7day-landing-content">
        <h2>Get Your Free <span>7-Day Training Plan</span></h2>
        <p class="ast-subtitle">7 daily emails with follow-along video training. Just 10 minutes a day. No credit card required.</p>

        <ul class="ast-benefits">
          <li>100% follow-along — just press play</li>
          <li>Covers all major skill areas</li>
          <li>Perfect for ages 6-14</li>
          <li>Delivered straight to your inbox</li>
        </ul>

        <div class="ast-7day-landing-form-container">
          <iframe
            src="https://api.leadconnectorhq.com/widget/form/4LIIpjpk2wNBl31YAQbv"
            style="width:100%;height:100%;border:none;border-radius:3px"
            id="inline-4LIIpjpk2wNBl31YAQbv"
            data-layout='{"id":"INLINE"}'
            data-trigger-type="alwaysShow"
            data-trigger-value=""
            data-activation-type="alwaysActivated"
            data-activation-value=""
            data-deactivation-type="neverDeactivate"
            data-deactivation-value=""
            data-form-name="7-Day Training Plan"
            data-height="undefined"
            data-layout-iframe-id="inline-4LIIpjpk2wNBl31YAQbv"
            data-form-id="4LIIpjpk2wNBl31YAQbv"
            title="7-Day Training Plan"
          ></iframe>
        </div>

        <p class="ast-7day-landing-footer">We respect your privacy. Unsubscribe anytime.</p>
      </div>

    </div>
  </div>
</div>
          `,
        }}
      />
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
    </>
  );
}
