import Link from 'next/link';
import postsData from '@/data/posts.json';

interface Post {
  id: string;
  title: string;
  slug: string;
  date: string;
  content: string;
  categories: string[];
  featuredImage: string;
}

function getExcerpt(content: string, maxLength = 120): string {
  const stripped = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  if (stripped.length <= maxLength) return stripped;
  return stripped.substring(0, maxLength).replace(/\s\S*$/, '') + '...';
}

export default function HomePage() {
  const recentPosts = (postsData as Post[]).slice(0, 3);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-background to-white relative overflow-hidden">
        <div className="absolute -top-1/2 -right-1/5 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(220,55,62,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <span>&#9889;</span> <span className="text-red">5,000+</span> Follow-Along Videos
              </div>
              <h1 className="text-[clamp(40px,5vw,56px)] font-extrabold leading-[1.1] mb-5 text-navy">
                Your Player Deserves <span className="text-red">Real Progress.</span>
              </h1>
              <p className="text-xl text-gray mb-8 max-w-[480px]">
                Stop guessing. Our step-by-step videos turn at-home training into real results&mdash;for players and coaches.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <Link href="/pricing" className="bg-red hover:bg-red-dark text-white px-8 py-4 rounded-full font-bold text-base transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(220,55,62,0.35)] hover:shadow-[0_6px_25px_rgba(220,55,62,0.45)] inline-flex items-center gap-2">
                  Start Training Free <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                </Link>
                <Link href="/team-demo-request-anytime-soccer-training" className="bg-transparent text-navy border-2 border-navy px-8 py-4 rounded-full font-bold text-base transition-all hover:bg-navy hover:text-white inline-flex items-center gap-2">
                  Request Team Demo
                </Link>
              </div>
              <div className="flex items-center gap-5 pt-6 border-t border-gray-200 flex-wrap">
                <div className="flex items-center gap-2.5">
                  <div className="flex gap-0.5">
                    {[1,2,3,4].map((i) => (
                      <span key={i} className="inline-flex items-center justify-center w-6 h-6 bg-[#00b67a] text-white text-xs rounded-[3px]">&#9733;</span>
                    ))}
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-gradient-to-r from-[#00b67a] from-50% to-[#dcdce6] to-50% text-white text-xs rounded-[3px]">&#9733;</span>
                  </div>
                  <span className="text-sm font-semibold text-navy">4.9 (9,651)</span>
                </div>
                <div className="w-px h-8 bg-gray-200 hidden sm:block" />
                <div className="text-sm text-gray">
                  <strong className="text-navy block">Trusted by 50,000+ players</strong>
                  in 80+ countries worldwide
                </div>
              </div>
            </div>
            <div className="relative">
              <a href="https://vimeo.com/817761649" target="_blank" rel="noopener noreferrer" className="block bg-navy rounded-2xl shadow-[0_25px_80px_rgba(15,49,84,0.15)] overflow-hidden md:transform md:perspective-[1000px] md:rotate-y-[-5deg] hover:md:rotate-y-0 transition-transform duration-500 relative">
                <div className="w-full aspect-video bg-gradient-to-br from-navy to-[#0a2340] flex flex-col items-center justify-center text-white">
                  <div className="text-5xl mb-3">&#9917;</div>
                  <div className="text-lg font-semibold opacity-90">Watch Demo Video</div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-red rounded-full flex items-center justify-center text-white text-3xl shadow-[0_8px_30px_rgba(220,55,62,0.5)] hover:scale-110 transition-transform">
                  &#9654;
                </div>
              </a>
              {/* Floating cards */}
              <div className="hidden lg:flex absolute -bottom-5 -left-8 bg-white rounded-xl px-5 py-4 shadow-[0_10px_40px_rgba(15,49,84,0.12)] items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="w-11 h-11 rounded-xl bg-[rgba(16,185,129,0.15)] flex items-center justify-center text-xl">&#10003;</div>
                <div className="text-sm text-gray"><strong className="text-navy block">Track Progress</strong>See every completed session</div>
              </div>
              <div className="hidden lg:flex absolute top-5 -right-5 bg-white rounded-xl px-5 py-4 shadow-[0_10px_40px_rgba(15,49,84,0.12)] items-center gap-3 animate-bounce" style={{ animationDuration: '3s', animationDelay: '1.5s' }}>
                <div className="w-11 h-11 rounded-xl bg-[rgba(15,49,84,0.1)] flex items-center justify-center text-xl">&#128202;</div>
                <div className="text-sm text-gray"><strong className="text-navy block">Assign Homework</strong>Coaches monitor training</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== THE PROBLEM ===== */}
      <section className="py-8 pb-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-xs font-bold uppercase tracking-[2px] text-red mb-4">The Problem</p>
          <h2 className="text-[clamp(28px,4vw,40px)] font-bold text-navy mb-10">
            Team Practice Isn&apos;t Enough. Without Extra Training, Players Fall Behind.
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '&#128547;', title: 'Inconsistent Progress', desc: 'Players improve slowly without structured at-home training.' },
              { icon: '&#10067;', title: 'No Accountability', desc: "Coaches can't track who's actually putting in the work." },
              { icon: '&#9200;', title: 'Wasted Time', desc: 'Parents search endlessly for good drills online.' },
            ].map((item) => (
              <div key={item.title} className="bg-background rounded-2xl p-8 text-center hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(15,49,84,0.1)] transition-all">
                <div className="text-4xl mb-4" dangerouslySetInnerHTML={{ __html: item.icon }} />
                <h3 className="text-lg font-bold text-navy mb-2">{item.title}</h3>
                <p className="text-sm text-gray">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== THE SOLUTION ===== */}
      <section className="py-24 bg-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-50" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-[2px] text-white/60 mb-4">The Solution</p>
            <h2 className="text-[clamp(28px,4vw,40px)] font-bold">Three Steps to Better Players</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { num: '1', title: 'Pick a Plan', desc: 'Choose from training plans organized by age and skill level.' },
              { num: '2', title: 'Press Play', desc: 'Follow along with guided videos—no guessing, just training.' },
              { num: '3', title: 'Track Progress', desc: 'Watch your player improve with every completed session.' },
            ].map((step, i) => (
              <div key={step.num} className="text-center relative">
                {i < 2 && <div className="hidden md:block absolute right-[-30px] top-10 text-3xl text-white/30">&rarr;</div>}
                <div className="w-16 h-16 bg-red rounded-full flex items-center justify-center text-3xl font-extrabold mx-auto mb-5">{step.num}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-white/70">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FREE RESOURCES ===== */}
      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-[2px] text-red mb-4">Free Resources</p>
            <h2 className="text-[clamp(28px,4vw,40px)] font-bold text-navy">Start Training Today&mdash;No Credit Card Required</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* 7-Day Plan */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(15,49,84,0.08)] hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(15,49,84,0.15)] transition-all">
              <div className="bg-gradient-to-br from-navy to-[#0a2340] p-10 text-center text-white relative overflow-hidden">
                <div className="absolute -top-1/2 -right-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(220,55,62,0.2)_0%,transparent_50%)]" />
                <span className="relative z-10 inline-block bg-red text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4">&#127873; FREE</span>
                <div className="relative z-10 text-[clamp(36px,5vw,52px)] font-black leading-none">7<span className="text-red">-DAY</span></div>
                <div className="relative z-10 text-lg font-semibold tracking-[2px] uppercase mt-2 opacity-90">Training Plan</div>
              </div>
              <div className="p-8">
                <p className="text-gray mb-6">Fix inconsistent progress in just one week. Seven unique follow-along videos sent straight to your inbox.</p>
                <ul className="space-y-3 mb-6">
                  {['100% follow-along format', 'Works for all skill levels', 'Train anywhere—backyard or living room'].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-navy">
                      <span className="w-5 h-5 bg-[rgba(16,185,129,0.15)] text-[#10b981] rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">&#10003;</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/free-7-day-soccer-training-plan-anytime-soccer-training" className="bg-red hover:bg-red-dark text-white w-full py-4 rounded-full font-bold text-center transition-all block shadow-[0_4px_20px_rgba(220,55,62,0.35)]">
                  Get Free Plan &rarr;
                </Link>
              </div>
            </div>
            {/* 100+ YouTube Videos */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(15,49,84,0.08)] hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(15,49,84,0.15)] transition-all">
              <div className="bg-gradient-to-br from-navy to-[#0a2340] p-10 text-center text-white relative overflow-hidden">
                <div className="absolute -top-1/2 -right-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(220,55,62,0.2)_0%,transparent_50%)]" />
                <span className="relative z-10 inline-block bg-red text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4">&#127873; FREE DOWNLOAD</span>
                <div className="relative z-10 text-[clamp(36px,5vw,52px)] font-black leading-none">100<span className="text-red">+</span></div>
                <div className="relative z-10 text-lg font-semibold tracking-[2px] uppercase mt-2 opacity-90">YouTube Videos</div>
              </div>
              <div className="p-8">
                <p className="text-gray mb-6">Curated drills organized by age group (U6&ndash;Advanced). Just click and train&mdash;we did the searching for you.</p>
                <ul className="space-y-3 mb-6">
                  {['Organized by U6, U8, U10, U12, Advanced', 'Clickable spreadsheet format', 'Best free content from YouTube'].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-navy">
                      <span className="w-5 h-5 bg-[rgba(16,185,129,0.15)] text-[#10b981] rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">&#10003;</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/free-soccer-training-videos-100-youtube-drills-by-age-group" className="bg-red hover:bg-red-dark text-white w-full py-4 rounded-full font-bold text-center transition-all block shadow-[0_4px_20px_rgba(220,55,62,0.35)]">
                  Download Free &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== REVIEWS ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-[2px] text-red mb-4">Real Results</p>
            <h2 className="text-[clamp(28px,4vw,40px)] font-bold text-navy">See What Parents, Coaches & Clubs Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Parent Reactions', href: 'https://www.instagram.com/reel/C0VSBMCr8a4/' },
              { title: 'Coach Reactions', href: 'https://www.instagram.com/reel/C2U6xM6rLug/' },
              { title: 'Club Reactions', href: 'https://www.facebook.com/reel/1273977504005434' },
            ].map((review) => (
              <a key={review.title} href={review.href} target="_blank" rel="noopener noreferrer" className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-gradient-to-br from-navy to-[#0a2340] group block">
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-transparent to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <div className="w-16 h-16 bg-red rounded-full flex items-center justify-center text-2xl shadow-[0_4px_20px_rgba(220,55,62,0.4)] group-hover:scale-110 transition-transform mb-4">&#9654;</div>
                </div>
                <div className="absolute bottom-6 left-6 text-white font-bold text-lg">{review.title}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOR COACHES ===== */}
      <section className="py-24 bg-gradient-to-br from-background to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[2px] text-red mb-4">For Coaches & Clubs</p>
              <h2 className="text-[clamp(28px,4vw,36px)] font-bold text-navy mb-5">Assign Training. Track Progress. Build Better Players.</h2>
              <p className="text-lg text-gray mb-6">
                Tired of players not improving between practices? Anytime Soccer Training gives you the tools to assign homework, set goals, and monitor who&apos;s actually training.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  { icon: '&#128203;', text: 'Assign custom training to your entire roster' },
                  { icon: '&#128202;', text: "Track completion and see who's putting in work" },
                  { icon: '&#128176;', text: 'Less than $5 per player per year' },
                ].map((item) => (
                  <li key={item.text} className="flex items-start gap-3.5 text-base">
                    <span className="text-xl flex-shrink-0" dangerouslySetInnerHTML={{ __html: item.icon }} />
                    {item.text}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4">
                <Link href="/pricing" className="bg-red hover:bg-red-dark text-white px-8 py-4 rounded-full font-bold transition-all shadow-[0_4px_20px_rgba(220,55,62,0.35)] inline-flex items-center gap-2">
                  Join Free &rarr;
                </Link>
                <Link href="/team-demo-request-anytime-soccer-training" className="border-2 border-navy text-navy hover:bg-navy hover:text-white px-8 py-4 rounded-full font-bold transition-all">
                  Request Demo &amp; Get 20% Off
                </Link>
              </div>
            </div>
            <div className="relative">
              <a href="https://www.youtube.com/watch?v=HsoTlfJn-RA" target="_blank" rel="noopener noreferrer" className="block rounded-2xl overflow-hidden shadow-[0_25px_80px_rgba(15,49,84,0.15)] relative">
                <img src="https://img.youtube.com/vi/HsoTlfJn-RA/maxresdefault.jpg" alt="Anytime Soccer Training for Clubs" className="w-full aspect-video object-cover" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70px] h-[70px] bg-red rounded-full flex items-center justify-center text-white text-2xl shadow-[0_8px_30px_rgba(220,55,62,0.5)] hover:scale-110 transition-transform">&#9654;</div>
              </a>
              <div className="absolute -bottom-5 -right-5 bg-red text-white px-6 py-4 rounded-xl font-bold shadow-[0_10px_30px_rgba(220,55,62,0.3)]">
                <span className="block text-2xl">20% OFF</span>
                First Team
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== LEADERBOARD ===== */}
      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-xs font-bold uppercase tracking-[2px] text-red mb-4">Compete & Improve</p>
          <h2 className="text-[clamp(28px,4vw,40px)] font-bold text-navy mb-8">See How You Rank Against Players Worldwide</h2>
          <Link href="https://app.anytime-soccer.com/leaderboard" target="_blank" className="bg-red hover:bg-red-dark text-white px-9 py-5 rounded-full font-bold text-lg transition-all shadow-[0_4px_20px_rgba(220,55,62,0.35)] inline-flex items-center gap-2">
            View Top 100 Leaderboard &rarr;
          </Link>
        </div>
      </section>

      {/* ===== BLOG ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[2px] text-red mb-4">Latest from the Blog</p>
            <h2 className="text-[clamp(28px,4vw,40px)] font-bold text-navy">Tips, Drills & Advice for Soccer Parents</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            {recentPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(15,49,84,0.08)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(15,49,84,0.12)] transition-all group block">
                <div className="aspect-[16/10] bg-background overflow-hidden">
                  {post.featuredImage ? (
                    <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl bg-gradient-to-br from-background to-white">&#9917;</div>
                  )}
                </div>
                <div className="p-6">
                  {post.categories[0] && (
                    <span className="text-xs font-bold text-red uppercase tracking-wider">{post.categories[0]}</span>
                  )}
                  <h3 className="font-bold text-navy text-lg mt-1 mb-2 line-clamp-2 group-hover:text-red transition-colors leading-snug">{post.title}</h3>
                  <p className="text-sm text-gray line-clamp-2">{getExcerpt(post.content)}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link href="/blog" className="border-2 border-navy text-navy hover:bg-navy hover:text-white px-8 py-4 rounded-full font-bold transition-all inline-flex items-center gap-2">
              View All Articles &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ===== PODCAST ===== */}
      <section className="py-24 bg-navy text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[2px] text-white/60 mb-4">The Podcast</p>
              <h2 className="text-[clamp(28px,4vw,40px)] font-bold mb-4">Anytime Soccer Training Podcast</h2>
              <p className="text-lg opacity-85 mb-8 leading-relaxed">
                Conversations with coaches, parents, and players about youth soccer development, training tips, and the beautiful game.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/podcast" className="bg-red text-white px-6 py-3.5 rounded-full font-semibold transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(220,55,62,0.4)] inline-flex items-center gap-2">
                  &#127908; Listen Now
                </Link>
                <a href="https://podcasts.apple.com" target="_blank" rel="noopener noreferrer" className="border-2 border-white/30 text-white px-6 py-3.5 rounded-full font-semibold hover:bg-white/10 hover:border-white/50 transition-all inline-flex items-center gap-2">
                  &#127822; Apple Podcasts
                </a>
                <a href="https://spotify.com" target="_blank" rel="noopener noreferrer" className="border-2 border-white/30 text-white px-6 py-3.5 rounded-full font-semibold hover:bg-white/10 hover:border-white/50 transition-all inline-flex items-center gap-2">
                  &#127911; Spotify
                </a>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-[280px] h-[280px] bg-gradient-to-br from-red to-[#a02a30] rounded-3xl flex flex-col items-center justify-center shadow-[0_20px_60px_rgba(0,0,0,0.3)] rotate-3 hover:rotate-0 hover:scale-[1.02] transition-all p-8">
                <img src="https://anytime-soccer.com/wp-content/uploads/2025/12/ast_rounded_facebook_logo_2.png" alt="AST" className="w-24 h-24 rounded-full mb-4 object-contain" />
                <div className="text-lg font-bold text-center text-white leading-snug">Anytime Soccer<br />Training Podcast</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== EBOOKS ===== */}
      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[2px] text-red mb-4">Free Resources</p>
            <h2 className="text-[clamp(28px,4vw,40px)] font-bold text-navy">Ebooks Every Soccer Parent & Coach Should Read</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: '20 Questions for Every Club', emoji: '&#128203;', href: '/20-questions-every-parent-should-ask' },
              { title: 'Become a Rec Coach SuperHero', emoji: '&#129464;', href: '/become-a-rec-coach-superhero' },
              { title: 'Everything About Guest Playing', emoji: '&#127919;', href: '/everything-you-need-to-know-about-guest-playing' },
              { title: 'Must-Have Guide to In-Home Training', emoji: '&#128218;', href: '/must-have-guide-for-serious-soccer-parents' },
            ].map((ebook) => (
              <div key={ebook.title} className="bg-white rounded-2xl p-6 text-center shadow-[0_4px_20px_rgba(15,49,84,0.06)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(15,49,84,0.12)] transition-all">
                <div className="aspect-[3/4] bg-background rounded-xl mb-4 flex items-center justify-center text-5xl" dangerouslySetInnerHTML={{ __html: ebook.emoji }} />
                <h3 className="font-bold text-navy text-sm mb-4 leading-snug">{ebook.title}</h3>
                <Link href={ebook.href} className="bg-red hover:bg-red-dark text-white px-5 py-3 rounded-full font-bold text-xs transition-all inline-block">Download Free</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-24 bg-navy text-white text-center relative overflow-hidden">
        <div className="absolute top-[-100%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(220,55,62,0.2)_0%,transparent_60%)]" />
        <div className="max-w-[700px] mx-auto px-4 relative z-10">
          <h2 className="text-[clamp(32px,5vw,48px)] font-extrabold mb-5">Ready to See Real Progress?</h2>
          <p className="text-xl opacity-85 mb-10">Join thousands of players and coaches who stopped guessing and started improving.</p>
          <Link href="/pricing" className="bg-red hover:bg-red-dark text-white px-10 py-5 rounded-full font-bold text-lg transition-all shadow-[0_4px_20px_rgba(220,55,62,0.35)] hover:shadow-[0_6px_25px_rgba(220,55,62,0.45)] hover:-translate-y-0.5 inline-flex items-center gap-2">
            Start Training Free &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
