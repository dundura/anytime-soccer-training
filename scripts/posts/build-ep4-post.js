// Builds the Episode 4 (Beniam) post HTML in the site's inline-styled format and adds it to posts.json.
// Optional env: YT_ID (YouTube video id to embed), IMG (featured image URL).
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// Inline markup: **bold**, [text](url) links (Amazon links get rel=sponsored).
const md = (s) => esc(s)
  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (m, t, u) => `<a href="${u}" style="color:#DC373E;font-weight:600;"${/amzn\.to|amazon\.com/.test(u) ? ' target="_blank" rel="sponsored noopener"' : ''}>${t}</a>`);
const P = (s) => `<p style="font-size:1em;line-height:1.85;color:#374151;">${md(s)}</p>`;
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const H2 = (s) => `<span id="${slugify(s)}" style="display:block;position:relative;top:-80px;visibility:hidden;"></span>\n<h2 style="font-size:1.55em;font-weight:800;color:#0F3154;margin:44px 0 14px;line-height:1.3;">${md(s)}</h2>`;
const H3 = (s) => `<h3 style="font-size:1.2em;font-weight:800;color:#0F3154;margin:30px 0 10px;">${md(s)}</h3>`;
const UL = (a) => `<ul style="font-size:1em;line-height:1.85;color:#374151;padding-left:22px;margin:0 0 18px;">${a.map((x) => `<li style="margin-bottom:8px;">${md(x)}</li>`).join('')}</ul>`;
const OL = (a) => `<ol style="font-size:1em;line-height:1.85;color:#374151;padding-left:24px;margin:0 0 18px;">${a.map((x) => `<li style="margin-bottom:10px;">${md(x)}</li>`).join('')}</ol>`;
const QUOTE = (s) => `<div style="background:linear-gradient(135deg,#FFF1F2 0%,#FFE4E6 100%);border-radius:20px;padding:28px 32px;margin:32px 0;border:1px solid #FECDD3;"><p style="font-size:1.15em;font-weight:700;color:#9F1239;margin:0;line-height:1.6;font-style:italic;">${md(s)}</p></div>`;
const GEAR = (title, text, href, img) => `<div style="background:#F9FAFB;border:1px solid #E5E7EB;border-radius:16px;padding:18px 22px;margin:26px 0;display:flex;gap:16px;align-items:center;"><img src="${img}" alt="${esc(title)}" style="width:72px;height:72px;object-fit:cover;border-radius:10px;flex-shrink:0;" /><div><p style="font-size:0.75em;font-weight:800;color:#6B7280;text-transform:uppercase;letter-spacing:0.09em;margin:0 0 4px;">Gear that helps</p><p style="font-size:0.98em;font-weight:700;color:#111827;margin:0 0 4px;">${esc(title)}</p><p style="font-size:0.88em;color:#4B5563;margin:0 0 8px;line-height:1.55;">${md(text)}</p><a href="${href}" target="_blank" rel="sponsored noopener" style="font-size:0.85em;font-weight:700;color:#DC373E;">See it on Amazon &#8594;</a></div></div>`;
const CTA = `<div style="background:linear-gradient(135deg,#FFF7ED,#FEF3C7);border:1px solid #FCD34D;border-radius:18px;padding:28px 32px;margin:36px 0;display:flex;flex-direction:column;gap:16px;align-items:flex-start;box-shadow:0 2px 16px rgba(251,191,36,0.15);"><img src="https://media.anytime-soccer.com/wp-content/themes/anytime/images/about/new-chalange-image.png" alt="Free 7-Day Training Plan" style="width:72px;height:72px;object-fit:cover;border-radius:10px;flex-shrink:0;" /><div><p style="font-size:0.78em;font-weight:800;color:#92400e;text-transform:uppercase;letter-spacing:0.09em;margin:0 0 4px;">Start Tonight</p><p style="font-size:1.02em;font-weight:700;color:#78350f;margin:0 0 6px;">The Whole Curriculum, On Video, In Order</p><p style="font-size:0.9em;color:#92400e;margin:0 0 14px;line-height:1.6;">Every progression in this post (thigh taps, kick-and-catch, walking dribbles, weak-foot work and jump rope) is a five-minute follow-along video in Anytime Soccer Training, split into modules so you always know where you left off.</p><a href="https://www.anytime-soccer.com/pricing" style="display:inline-block;background:#DC373E;color:#fff;font-weight:700;font-size:0.88em;padding:10px 22px;border-radius:10px;text-decoration:none;">Try It Free for 7 Days &#8594;</a></div></div>`;
const DISCLOSURE = `<p style="font-size:0.8em;color:#9CA3AF;line-height:1.6;margin:28px 0 0;">As an Amazon Associate, Anytime Soccer Training earns from qualifying purchases. Gear links in this post are affiliate links; they cost you nothing extra.</p>`;

const A = {
  ball1: 'https://amzn.to/4aM3st9', cones: 'https://amzn.to/4soWKzv', speaker: 'https://amzn.to/4sGL2Rc',
  rope: 'https://www.amazon.com/s?k=kids+jump+rope&i=sporting&tag=anytimeamazon-20',
};
const IMG = {
  ball1: 'https://media.anytime-soccer.com/wp-content/uploads/2026/01/size_one-soccer-balls.jpg',
  cones: 'https://media.anytime-soccer.com/wp-content/uploads/2026/01/training-cones.jpg',
  speaker: 'https://media.anytime-soccer.com/wp-content/uploads/2026/01/blue_tooth_speaker.jpg',
};

const S = []; const toc = [];
const sec = (t) => { toc.push(t); S.push(H2(t)); };
const ps = (arr) => arr.forEach((t) => S.push(P(t)));

S.push(`<p style="font-size:0.85em;font-weight:700;color:#DC373E;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:10px;display:inline-block;background:#FFF1F2;padding:4px 12px;border-radius:20px;">The Inside Scoop &middot; Episode 4</p>`);
S.push(`<p style="font-size:0.9em;color:#6B7280;margin:0 0 18px;">By Neil Crawford &middot; The Inside Scoop &middot; Nov 24, 2026</p>`);
S.push(QUOTE('If your child is four, five or six and you are asking "where do I start?", the answer is smaller and simpler than you think: five minutes at a time, a few days a week, one skill at a time, and a lot less talking from you.'));
S.push('%%TOC%%');
ps([
  'That question lands in front of me more than any other. I have trained my own sons from recreational soccer to elite academies, and I did it with no soccer background of my own. When parents ask, they usually want a drill. What I give them first is a framework, because once the framework is in place the soccer part is easy.',
  'I recently sat down with Beniam, a dad from Cary, North Carolina, to walk through exactly this. His son is six and loves the game. The family has done YMCA seasons here and there, but between seasons there has been nothing structured. Beniam is not chasing a pro contract for his boy. He wants him to be active, to build enough skill to play with confidence at school, and to feel good about himself. What he did not know was what a parent can actually do at home so the progress does not vanish whenever the league is not running.',
  'Beniam told me it had been confusing and that it bugged him for a long time. I was in the same boat. I spent hours and hours on YouTube working it out, and I am trying to save you that time. This post is the full version of that conversation, in the order I wish someone had given it to me.',
]);
S.push('%%MEDIA%%');

sec('First, it is not really about the soccer');
ps([
  'The first thing I told Beniam is the one that surprises people: it is not about the soccer.',
  'Physical activity matters, and I said so. But if physical activity were the whole goal, my advice would be different. You would send your child outside to play. Soccer instruction adds something beyond that, and the reason I bring it up is that your child may grow out of soccer one day and walk away from it. If the soccer is all you built, that day feels like a loss.',
  'So from the very beginning I decided to use soccer as a vehicle. The real thing I am teaching my children is the value of **deliberate practice**. If you spend five or ten minutes, two or three days a week, on something, you will get better at it. It will not always be fun. You will still enjoy what you get from doing it.',
  'That belief transfers. It gives you a shared vocabulary for talking to your child about everything else in their life. I think of it as a little extra homework, the same principle as academics. If you do not believe in deliberate practice, the rest of this post is probably not for you. If you do, keep reading.',
]);

sec('Know your role and set expectations');
ps([
  'Before any drills, settle two things: what you expect from your child, and what your job is.',
  '**Expectations.** I cannot tell you exactly how to talk to your particular child, because every child is different. I can tell you how I talk to mine, and it is simple. In my house there are two things: school, and whatever else you want to do. You have to be good at school. And you have to practice something else and get good at it.',
  'That something does not have to be soccer. We have tried karate, music and robotics. The rule is that you practice something. If it is soccer, I am here to support you. My boys understand this, even though it can sound harsh when you say it out loud.',
  '**Your role.** You are not the teacher, and you are not the coach. This is my opinion, and it is my show, but I strongly believe a parent should supplement what the coach is already doing rather than replace it. The best way to do that is to help your child get repetitions on things they already know.',
  'School is the easiest comparison. I am not teaching my children language arts as the content comes up in class. I make sure they read twenty minutes every day, because it is the repetitions that matter. Soccer works the same way.',
  'The mistake I see most often is a parent who spends thirty minutes talking about the soccer and two minutes on all the expectation-setting that actually drives the kid crazy. That leaves everyone frustrated. Get the framework right first.',
]);

sec('Focus on repetitions, not variety');
ps([
  'One skill, practiced often, beats a dozen skills practiced once.',
  'Our free skill-of-the-week videos at Anytime Soccer Training are built on this idea. Your child follows along for five minutes, working one skill in short intervals: thirty seconds on, ten seconds off, five repetitions. If they do that three days a week, they will become proficient in that skill.',
  'What I see parents do all the time is throw fifteen different skills at their kid. The kid is frustrated, the parent is frustrated, and the coach has not even covered those skills yet.',
  'Here is what to do instead:',
]);
S.push(UL([
  '**Watch a practice.** Unlike school, where you have to guess what your child is working on, you can see it with your own eyes.',
  '**Pick one or two things** and focus only on those.',
  '**Stay with a skill for a month.** One skill a month is twelve skills by the end of the year, and twenty-four in two years.',
]));
ps([
  'Think about that second number. If your son is proficient in twenty-four skills by the time he is eight, he will have real confidence. He will be technical. He will enjoy the game more. And you might just find yourself buying season tickets.',
  'That is the heart of how I think about training my kids: it is about deliberate practice and creating healthy habits that carry over into the rest of their lives. The open question is how to do it consistently without driving your child, or yourself, crazy.',
]);

sec('Rewind, and talk less');
ps([
  'To practice consistently without wearing out your child, start easier than feels necessary and say less than you want to.',
  'I call the first part **remediation**. Whatever your child can do, rewind two or three skills below it and practice that first. The mastery required is so large that your child probably needs the equivalent of two grade levels below where they are anyway.',
  'My older son can juggle 3,000 times. I am a proud papa about that. But when we get to the field, he still kicks the ball and catches it, and juggles five times and catches it. I do not want him frustrated with Daddy, and he is not going to wear himself out for me. I would rather not ask him for things he cannot do yet. The coaches can pull that extra effort out of him. He is excited with them, he is around his buddies, and I am just helping him collect repetitions until they feel almost effortless.',
  'I do the same with school. When I supplement my children’s education, I often rewind a couple of grade levels, because teachers rarely have time to dig deep into arithmetic.',
  'There is a second rule for staying off your child’s last nerve: **if you are giving loads of instructions on the field, you are probably doing something too advanced for them.** Break it down and take it to a lower level. Children have their entire lives to master these skills. If you are asking them to run and they are barely walking, just walk that week.',
]);

sec('Four buckets for helping at home');
ps([
  'It does not take long. We are talking about ten to fifteen minutes of consistent supplemental help. If you want your child in the Manchester United youth academy, that is a different conversation. If you want them proficient, technical and holding the foundational skills while they are young enough not to question why you are doing it, this is enough. They get a positive experience in soccer, and if they want to go further, you are there to support them.',
  'I group the ways a parent can help into four buckets:',
]);
S.push(OL([
  '**Aerial control:** juggling, and handling the ball when it is in the air.',
  '**Dribbling:** traveling with the ball at your feet.',
  '**The weak foot:** deliberately working the foot they favor less.',
  '**Balance and coordination:** the athletic base under everything else.',
]));
ps(['I lean on that last one because many school districts have reduced gym and PE programs, and kids get less free play than they used to. Parents should introduce balance and coordination exercises at a young age.']);

sec('Aerial control (juggling)');
ps([
  'There is a big debate in the soccer community about how important juggling is. I look at it differently: where does a parent get the most bang for the buck? Ninety-nine percent of a team practice goes to team activities and dribbling work, not to you kicking the ball in the air to yourself. Most children will not do it on their own, and they will definitely not do it with their weak foot. This is where a parent adds real value.',
  'The progression I used with my son Matthew, in order:',
]);
S.push(OL([
  '**Hold the ball and tap it with your thighs.** Jog in place, tap the ball with your thighs, never let go of it. I use an interval timer set to ten seconds on and five seconds off. First beat, right thigh. Second, left thigh. Third, alternate. You are also teaching a taxonomy of left and right, and at this age that works fine.',
  '**Loosen the hands.** Once that is comfortable, tell them to loosen their grip so the ball bounces a little while it is still in their hands. This is how basic it needs to be. You want early wins, and five minutes later you are done.',
  '**Bounce it off the thigh and catch it.** Same ten-on, five-off interval, both thighs.',
  '**Add the foot after about a month.** Do not ask for kick-and-catch right away. Tell them the ball can bounce twice before they catch it. They love it. When that is easy, drop it to one bounce.',
  `**Shrink the box.** Set up four [cones](${A.cones}) and slowly make the box smaller. Kick, let it bounce, catch it, alternating feet. Do it enough that they memorize it.`,
  '**Vary the part of the foot.** The default is the laces, but they can also use the inside of the foot and let the ball drop.',
]));
S.push(GEAR('Size One Soccer Ball', 'A small, light ball makes thigh taps and kick-and-catch far easier for little legs.', A.ball1, IMG.ball1));
ps(['The interval structure matters. It is like a run-walk program: a minute running, thirty seconds walking, done consistently, is not very different for cardio from running continuously. Kick it, catch it, kick it twice, catch it. My older son juggled 3,000 times, and we built that over years.']);
S.push(GEAR('Bluetooth Speaker', 'Play the interval timer (or the follow-along video) out loud in the yard so nobody has to stare at a phone.', A.speaker, IMG.speaker));
ps(['You do not need to memorize any of this. The full curriculum is on video at [Anytime Soccer Training](https://www.anytime-soccer.com/). But I would be a hypocrite if I said you needed me to get started with these very basic skills. Introduce the idea, and as they gain confidence you will see them doing it on their own, for free.']);

sec('Dribbling: touch the ball with every single step');
ps([
  'For children this age, the gold standard of dribbling is to **touch the ball with every single step**.',
  'I think dribbling is one of the areas of soccer that is not taught properly at this age, so here is the concept and a demonstration you can try at home tonight.',
]);
S.push(H3('The living-room demonstration'));
ps([
  'Have your child close their eyes and put a hand on your shoulder. Walk in a gentle zigzag, not too fast. He will have no trouble keeping up. Now tell him to keep his eyes closed and tap your shoulder as quickly as he can while you walk. Still easy, because he is right there feeling you. Then tell him to tap your shoulder only every three seconds. He cannot do it, because you will have moved by the time his hand comes back.',
  'In that analogy, your body is the ball and his hand is the foot. Touch the ball rarely and you lose it.',
]);
S.push(H3('Where the idea came from'));
ps([
  'This came from pure trial and error, watching my son’s practices and the other kids. The ones who dribbled really well were getting many touches while covering the same distance as the ones who could not. I am a finance person, so my instinct was to ask what the optimal number of touches is. Too many and you are not moving fast enough. Too few and you lose control. But how do you explain an optimum number of touches to a six-year-old? You cannot do it with a 26-year-old either. So you say something universal: touch the ball with every single step.',
  'Here is how to teach it:',
]);
S.push(OL([
  '**Walk, do not run.** Have your child walk around the yard touching the ball with every step. This can take weeks to get comfortable with.',
  '**Let them discover the toes problem.** They will realize they cannot use their toes, because a toe poke sends the ball too far. They naturally start using their laces.',
  '**Add a little pace.**',
  '**Add a change of direction.**',
  `**Bring in simple cone drills,** weaving around the [cones](${A.cones}).`,
  '**Keep the rule in every drill from now on.**',
]));
S.push(GEAR('Disc Training Cones (Set of 40)', 'Enough for the shrinking box, a weave course and anything else you dream up in the backyard.', A.cones, IMG.cones));
ps(['How hard you push this depends on your child’s motivation and how serious a player they want to be. But as a standard, it is the one I would build on. Anytime Soccer Training includes hundreds of dribbling drills, including the walking one.']);

sec('The weak foot: no one will work on it but you');
ps([
  'I love coaches. I am one, and I am a trainer. But no coach will take more interest in your child’s weak foot than you will. That is not going to happen.',
  'Here is what I did with my sons. My older son became so good with his weak foot that parents and other coaches assumed for years that he was left-footed. It was only when he got older and started shooting from distance that they saw he actually preferred his right.',
  'Two things got him there.',
  '**1. Build it into the aerial-control work.** In every drill, put real emphasis on the weak foot. Remember that at this age you have to be more committed to it than your child is.',
  '**2. Make one rule, and one silent signal.** When my older son started playing club soccer at seven, I made him a promise: Daddy is not going to say a word to you on that pitch. Not during practice, and definitely not during games. There was one rule. Whenever the coach gives you a choice, or does not care which way you go, you use your left foot.',
  'A seven-year-old is not going to remember that on his own, and I was not going to embarrass him in the middle of practice. So I borrowed from baseball. You have seen the third-base coach flashing signals to the batter. I had exactly one signal. I would call his name, tap my thigh, and that was it: start using your left foot.',
  'He is not going to use his weak foot for the whole practice, of course. But the signal gave him a jolt of two or three minutes with it. The cumulative effect of those two or three minutes added up until he was two-footed.',
  'Six is a little young for this system. Right now, the first step is enough: work the weak foot into your juggling and ball-control routines. Give thought to the signal when he is older and actually wants to take it to another level.',
]);

sec('Balance and coordination: the fun basics');
ps([
  'Balance and coordination work is the simplest bucket, and it can look like play.',
  `Start with basic, fun exercises, like standing on one toe with your knee raised. Do them together. As your child gets older, add [jump rope](${A.rope}). My older son is ten now, and jump roping is part of how he trains. In the Anytime Soccer Training curriculum, you might do a ball-mastery drill for thirty seconds, then jump rope for thirty seconds on your right foot, and so on.`,
  `Jump rope is an art form that our kids do not do as much as they should. For a six-year-old, a full jump-rope routine is a bit much, so just have them jump and hop. We recently bought some [jump ropes](${A.rope}) ourselves. Because the school year may not give your child much of this, a few minutes at home goes a long way.`,
]);

sec('Keep it fun, build a soccer culture, and join in');
ps([
  'The thing that should go without saying is that this is about fun. In youth sports we forget that more often than we admit.',
  'But make no mistake: you should not feel guilty for encouraging, even borderline forcing, your children to adopt healthy and consistent habits. What you should feel guilty about is screaming at them, getting frustrated with them, or asking them to do too much. A five-minute skill-of-the-week video is not going to ruin anyone’s childhood, and even if your child does not end up loving soccer, it is not the end of the world.',
  '**Build a soccer culture at home.** If you think your child may get really into the game, start early and do not wait until they are ten. Watch games together and talk about them. Get some jerseys. Have your kids read, and bring soccer into their reading: I look for books with soccer stories, including one about a girl who transfers schools and joins a soccer team. The earlier you start, the easier it is.',
  '**Do it with them.** This is the postscript I added after we stopped recording, and it may be the most important tip in the post. Nothing motivates your child more than seeing you do the exercise. Jump in. Do everything we talked about right alongside them, and even make some mistakes. That is what really gets the younger ones going.',
]);
S.push(CTA);

sec('Your action plan for this week');
ps(['If you remember nothing else, commit to these small things, in this order:']);
S.push(OL([
  '**Pick a skill-of-the-week video** and do it one day at a time, three days a week. Each is only five minutes.',
  '**Play with the ball and the thigh.** Have your child bounce the ball off a thigh and catch it, or use the thigh and the ball in any way they like. Just commit to doing it every once in a while.',
  '**Kick, drop, catch.** Have them kick the ball into the air, let it drop, and catch it. Try ten times with the right foot, then ten with the left. I do not care if the ball bounces four times.',
  '**Walk with the ball.** Get the ball out, even in the house, and encourage your child to walk while touching the ball with every step. Make it a habit.',
  '**Think about the weak foot** as he gets older and wants to take it to another level, because no one else is going to work on it but you.',
  '**Do it alongside them.**',
]));
ps(['That is how I would start with my own child, and it fits inside the larger framework: deliberate practice, your role as supplement, and a lot of patience.']);

sec('What Beniam took away, and where to go next');
ps([
  'When we wrapped up, I asked Beniam for his reflections. He had expected the dribbling and aerial-control pieces. The weak foot was a brand-new idea to him, something he had never thought about being deliberate with. The balance and coordination piece was also something he would not have thought to do.',
  'He also asked a practical question: how easy would it be to use all of this out on the field? Fair point. Parents make excuses over small, annoying things like having to search for a video. That is why the Anytime Soccer Training site is mobile-friendly, and why the curriculum is split into modules, each broken into playlists. As your child finishes a video, its red X turns into a green check, so you always know where you left off.',
  'If you want to start today, grab a free skill-of-the-week video from the Anytime Soccer Training YouTube channel and do one a day, three days a week. For more, including ball-mastery and juggling videos that cover much of what is in this post, visit [anytime-soccer.com](https://www.anytime-soccer.com/).',
  'And who knows? Maybe your child turns out to be the next star. Even if not, they will get focus, discipline and a life lesson out of it, and you will have a better way to talk to them about all of it.',
]);
S.push(DISCLOSURE);

const tocHtml = `<div style="background:#F0F9FF;border:1px solid #BAE6FD;border-radius:16px;padding:24px 28px;margin:32px 0;"><p style="font-size:0.78em;font-weight:800;color:#0369A1;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 14px;">In this post</p><ol style="font-size:1em;line-height:1.9;color:#0369A1;margin:0;padding-left:20px;">${toc.map((t) => `<li><a href="#${slugify(t)}" style="color:#0369A1;font-weight:600;">${esc(t)}</a></li>`).join('')}</ol></div>`;
const yt = process.env.YT_ID;
const media = yt ? `<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:14px;margin:28px 0;"><iframe src="https://www.youtube.com/embed/${yt}" title="The Inside Scoop Episode 4" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>` : '';
const content = `<div class="post-content">\n\n${S.join('\n\n').replace('%%TOC%%', tocHtml).replace('%%MEDIA%%', media)}\n\n</div>`;
fs.writeFileSync(path.join(ROOT, 'blog-post-ep4-where-do-i-start.html'), content);

const postsPath = path.join(ROOT, 'src/data/posts.json');
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
const post = {
  title: 'Where Do I Start? How to Train Your 4-, 5-, or 6-Year-Old in Soccer (Without Driving Them or Yourself Crazy)',
  slug: 'where-do-i-start-how-to-train-your-4-5-or-6-year-old-in-soccer',
  date: 'Tue, 24 Nov 2026 10:00:00 +0000',
  content,
  excerpt: 'If your child is four, five or six and you are asking "where do I start?", the answer is smaller and simpler than you think: five minutes at a time, a few days a week, one skill at a time, and a lot less talking from you. Here is the full framework from The Inside Scoop, Episode 4.',
  categories: ['Blog', 'Podcast', 'Parent Guide', 'At-Home Training'],
  tags: ['the inside scoop', 'podcast', 'young players', 'u6 soccer', 'at-home training', 'juggling', 'dribbling', 'weak foot', 'jump rope', 'deliberate practice', 'parent trainer'],
  featuredImage: process.env.IMG || 'https://d2vm0l3c6tu9qp.cloudfront.net/Boys10.jpg',
  thumbnailId: '',
};
const i = posts.findIndex((p) => p.slug === post.slug);
if (i >= 0) posts[i] = { ...post, id: posts[i].id };
else posts.unshift({ id: posts.reduce((m, p) => Math.max(m, Number(p.id) || 0), 0) + 1, ...post });
fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
console.log(`${i >= 0 ? 'updated' : 'added'} /blog/${post.slug} (${content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length} words)`);
