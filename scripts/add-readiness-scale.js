const fs = require('fs');
const path = require('path');

const postsPath = path.join(__dirname, '../src/data/posts.json');
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
const post = posts.find(p => p.slug === '10-minute-habit-home-soccer-training-stick');
if (!post) { console.error('Post not found'); process.exit(1); }

const insertAfter = 'Watch how different the energy is.</p></div></div>';
const beforeEbook = '\n\n<div style="background:linear-gradient(135deg,#FFF7ED,#FFEDD5);border-radius:20px;padding:28px 32px;margin:44px 0;border:1px solid #FED7AA;';

const readinessBlock = `

<div style="background:linear-gradient(135deg,#F5F3FF,#EDE9FE);border-radius:18px;padding:28px 30px;margin:36px 0;border:1px solid #DDD6FE;box-shadow:0 2px 14px rgba(124,58,237,0.07);">
  <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
    <span style="font-size:1.4em;">🌡️</span>
    <p style="font-size:0.78em;font-weight:800;color:#7c3aed;text-transform:uppercase;letter-spacing:0.08em;margin:0;">The Readiness Scale — A Tip That Changed Everything</p>
  </div>
  <p style="font-size:1em;line-height:1.85;color:#374151;margin:14px 0 10px;">When Adam was young, he didn't have the language to tell me how he was feeling on any given day. He couldn't articulate nuance. So I borrowed a page from the pain chart they use in hospitals — a simple number, no explanation required — and I gave it to him.</p>
  <p style="font-size:0.9em;font-weight:700;color:#4c1d95;margin:0 0 16px;">Before each session, I'd just ask: <em>"What's your number today?"</em></p>
  <div style="display:flex;flex-direction:column;gap:0;border-radius:12px;overflow:hidden;border:1px solid #DDD6FE;margin:0 0 20px;">
    <div style="display:flex;align-items:stretch;">
      <div style="background:#10b981;color:#fff;font-size:1.1em;font-weight:900;width:48px;min-width:48px;padding:14px 0;text-align:center;display:flex;align-items:center;justify-content:center;">1</div>
      <div style="padding:12px 18px;flex:1;background:#f0fdf4;border-bottom:1px solid #DDD6FE;">
        <p style="font-size:0.9em;font-weight:700;color:#065f46;margin:0 0 2px;">Ready to go.</p>
        <p style="font-size:0.85em;color:#374151;margin:0;line-height:1.55;">Feeling great. Let's train.</p>
      </div>
    </div>
    <div style="display:flex;align-items:stretch;">
      <div style="background:#84cc16;color:#fff;font-size:1.1em;font-weight:900;width:48px;min-width:48px;padding:14px 0;text-align:center;display:flex;align-items:center;justify-content:center;">2</div>
      <div style="padding:12px 18px;flex:1;background:#f7fee7;border-bottom:1px solid #DDD6FE;">
        <p style="font-size:0.9em;font-weight:700;color:#3f6212;margin:0 0 2px;">Ready, but a little tired.</p>
        <p style="font-size:0.85em;color:#374151;margin:0;line-height:1.55;">Still training. Might lean into a lighter session today.</p>
      </div>
    </div>
    <div style="display:flex;align-items:stretch;">
      <div style="background:#f59e0b;color:#fff;font-size:1.1em;font-weight:900;width:48px;min-width:48px;padding:14px 0;text-align:center;display:flex;align-items:center;justify-content:center;">3</div>
      <div style="padding:12px 18px;flex:1;background:#fffbeb;border-bottom:1px solid #DDD6FE;">
        <p style="font-size:0.9em;font-weight:700;color:#92400e;margin:0 0 2px;">Want to train — just not right now.</p>
        <p style="font-size:0.85em;color:#374151;margin:0;line-height:1.55;">Fine. We'll push the session a bit later today.</p>
      </div>
    </div>
    <div style="display:flex;align-items:stretch;">
      <div style="background:#DC373E;color:#fff;font-size:1.1em;font-weight:900;width:48px;min-width:48px;padding:14px 0;text-align:center;display:flex;align-items:center;justify-content:center;">4</div>
      <div style="padding:12px 18px;flex:1;background:#fef2f2;border-bottom:1px solid #DDD6FE;">
        <p style="font-size:0.9em;font-weight:700;color:#991b1b;margin:0 0 2px;">Hard no for today.</p>
        <p style="font-size:0.85em;color:#374151;margin:0;line-height:1.55;">We skip. No argument, no guilt. And if the 4s start stacking up — that's not defiance. That's a signal I need to lighten the load.</p>
      </div>
    </div>
    <div style="display:flex;align-items:stretch;">
      <div style="background:#7c3aed;color:#fff;font-size:1.1em;font-weight:900;width:48px;min-width:48px;padding:14px 0;text-align:center;display:flex;align-items:center;justify-content:center;">5</div>
      <div style="padding:12px 18px;flex:1;background:#f5f3ff;">
        <p style="font-size:0.9em;font-weight:700;color:#4c1d95;margin:0 0 2px;">I want to do extra. 🚀</p>
        <p style="font-size:0.85em;color:#374151;margin:0;line-height:1.55;">I didn't get many of these — but when I did, it was one of the most exciting moments in our training. You don't manufacture a 5. You earn it by making 1s and 2s feel safe.</p>
      </div>
    </div>
  </div>
  <p style="font-size:0.95em;line-height:1.85;color:#374151;margin:0 0 10px;">The goal wasn't compliance — it was honesty. I wanted Adam to feel empowered to tell me the truth without any fear of disappointing me. A kid who can say "4" without bracing for a reaction is a kid who trusts the process. And a kid who trusts the process is a kid who keeps showing up.</p>
  <p style="font-size:0.95em;line-height:1.85;color:#374151;margin:0;">I used the same system later with my younger son Matthew — a completely different personality, completely different energy — and it worked just as well. Because the scale isn't about the number. It's about giving your child a voice in their own development.</p>
</div>`;

const marker = insertAfter + beforeEbook;
const replacement = insertAfter + readinessBlock + beforeEbook;

if (!post.content.includes(marker)) {
  console.error('Marker not found');
  process.exit(1);
}

post.content = post.content.replace(marker, replacement);

const check = post.content.includes('Readiness Scale');
console.log(check ? '✅ Inserted' : '❌ Failed');

fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
console.log('Saved.');
