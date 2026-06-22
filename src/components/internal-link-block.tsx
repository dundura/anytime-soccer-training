type Resource = { label: string; href: string; desc: string; emoji: string };

const CATEGORY_RESOURCES: Record<string, Resource[]> = {
  "Anytime Skills Challenges": [
    { emoji: "🆓", label: "Free Training Plan", href: "/free-training-plan", desc: "Get a free 30-day plan" },
    { emoji: "⚽", label: "Free Soccer Drills", href: "/free-soccer-drills-for-kids", desc: "Drills for kids at home" },
    { emoji: "🎯", label: "Ball Mastery Program", href: "/programs/ball-mastery", desc: "Master the ball with daily reps" },
  ],
  "Anytime Soccer Training": [
    { emoji: "🆓", label: "Free Resource Hub", href: "/free-resource-hub", desc: "Free guides, plans, and tools" },
    { emoji: "▶️", label: "How It Works", href: "/how-it-works", desc: "See how the platform works" },
    { emoji: "💰", label: "Pricing", href: "/pricing", desc: "Plans for players and teams" },
  ],
  Blog: [
    { emoji: "🆓", label: "Free Resource Hub", href: "/free-resource-hub", desc: "Free guides, plans, and tools" },
    { emoji: "▶️", label: "How It Works", href: "/how-it-works", desc: "See how the platform works" },
    { emoji: "💰", label: "Pricing", href: "/pricing", desc: "Start your free trial" },
  ],
  Faq: [
    { emoji: "▶️", label: "How It Works", href: "/how-it-works", desc: "Full walkthrough of the platform" },
    { emoji: "🚀", label: "Getting Started", href: "/getting-started", desc: "New player quick-start guide" },
    { emoji: "💰", label: "Pricing", href: "/pricing", desc: "Plans and pricing" },
  ],
  "Our Programs": [
    { emoji: "⚽", label: "Ball Mastery", href: "/programs/ball-mastery", desc: "Daily ball mastery reps" },
    { emoji: "🏃", label: "Dribbling", href: "/programs/dribbling", desc: "1v1 dribbling moves" },
    { emoji: "🔢", label: "Juggling", href: "/programs/juggling", desc: "Juggling from 0 to 1000+" },
    { emoji: "🎯", label: "1v1 Finishing", href: "/programs/1v1-finishing", desc: "Clinical finishing skills" },
  ],
  "Lesson Plans": [
    { emoji: "📋", label: "For Coaches", href: "/for-coaches", desc: "Tools built for coaches" },
    { emoji: "🆓", label: "Free Resource Hub", href: "/free-resource-hub", desc: "Free guides and lesson plans" },
    { emoji: "⚽", label: "Programs", href: "/programs/ball-mastery", desc: "Browse all training programs" },
  ],
  Coaching: [
    { emoji: "📋", label: "For Coaches", href: "/for-coaches", desc: "Coaching tools and resources" },
    { emoji: "🏢", label: "Club Partnership", href: "/club-partnership", desc: "Partner your club with AST" },
    { emoji: "🆓", label: "Free Resource Hub", href: "/free-resource-hub", desc: "Free guides and drills" },
  ],
  Podcast: [
    { emoji: "🎙️", label: "AST Podcast", href: "/podcast", desc: "Listen to all episodes" },
    { emoji: "🆓", label: "Free Resource Hub", href: "/free-resource-hub", desc: "Free guides and resources" },
    { emoji: "▶️", label: "How It Works", href: "/how-it-works", desc: "See the platform in action" },
  ],
  Community: [
    { emoji: "🆓", label: "Free Training Plan", href: "/free-training-plan", desc: "Start training for free" },
    { emoji: "💰", label: "Pricing", href: "/pricing", desc: "Join the community" },
    { emoji: "📲", label: "Install the App", href: "/install", desc: "Get the app on your phone" },
  ],
  "Parent Guide": [
    { emoji: "📘", label: "Parent Guide", href: "/getting-started-guide-for-parents-anytime-soccer-training", desc: "Complete guide for parents" },
    { emoji: "🆓", label: "Free Resource Hub", href: "/free-resource-hub", desc: "Free tools for families" },
    { emoji: "💰", label: "Pricing", href: "/pricing", desc: "Affordable plans for families" },
  ],
  "Home Training": [
    { emoji: "🆓", label: "Free Soccer Drills", href: "/free-soccer-drills-for-kids", desc: "Drills you can do at home" },
    { emoji: "⚽", label: "Ball Mastery", href: "/programs/ball-mastery", desc: "Daily ball mastery program" },
    { emoji: "🔢", label: "Juggling Program", href: "/programs/juggling", desc: "Build juggling from scratch" },
  ],
  "Ball Mastery": [
    { emoji: "⚽", label: "Ball Mastery Program", href: "/programs/ball-mastery", desc: "Structured ball mastery reps" },
    { emoji: "🆓", label: "Free Training Plan", href: "/free-training-plan", desc: "Try a free 30-day plan" },
    { emoji: "🏃", label: "Dribbling Program", href: "/programs/dribbling", desc: "Combine with dribbling skills" },
  ],
  "College Recruiting": [
    { emoji: "🆓", label: "Free Resource Hub", href: "/free-resource-hub", desc: "Guides and resources" },
    { emoji: "▶️", label: "How It Works", href: "/how-it-works", desc: "Train smarter, get recruited" },
    { emoji: "💰", label: "Pricing", href: "/pricing", desc: "Start your free trial" },
  ],
  "Club Soccer": [
    { emoji: "🏢", label: "Club Partnership", href: "/club-partnership", desc: "Bring AST to your club" },
    { emoji: "👥", label: "For Teams", href: "/teams", desc: "Team accounts and homework tools" },
    { emoji: "🆓", label: "Free Resource Hub", href: "/free-resource-hub", desc: "Free tools for clubs" },
  ],
  "Youth Soccer": [
    { emoji: "🚀", label: "Getting Started", href: "/getting-started", desc: "New player quick-start guide" },
    { emoji: "🆓", label: "Free Soccer Drills", href: "/free-soccer-drills-for-kids", desc: "Free drills for young players" },
    { emoji: "⚽", label: "Programs", href: "/programs/ball-mastery", desc: "Browse all training programs" },
  ],
  "Training Gear": [
    { emoji: "📋", label: "Our Picks", href: "/our-picks", desc: "Gear we recommend" },
    { emoji: "🆓", label: "Free Training Plan", href: "/free-training-plan", desc: "Train with what you have" },
    { emoji: "⚽", label: "Programs", href: "/programs/ball-mastery", desc: "Get started training today" },
  ],
};

const DEFAULT_RESOURCES: Resource[] = [
  { emoji: "🆓", label: "Free Resource Hub", href: "/free-resource-hub", desc: "Free guides, plans, and tools" },
  { emoji: "▶️", label: "How It Works", href: "/how-it-works", desc: "See how the platform works" },
  { emoji: "💰", label: "Pricing", href: "/pricing", desc: "Start your free trial today" },
];

export function InternalLinkBlock({ categories }: { categories: string[] }) {
  // Use the first matching category
  const resources =
    categories.map((c) => CATEGORY_RESOURCES[c]).find(Boolean) ?? DEFAULT_RESOURCES;

  return (
    <div className="my-10 rounded-2xl border border-gray-200 bg-gray-50 p-6">
      <h3 className="text-base font-bold mb-4 text-navy">Explore More Resources</h3>
      <div className="grid sm:grid-cols-3 gap-3">
        {resources.map((r) => (
          <a
            key={r.href}
            href={r.href}
            className="flex items-start gap-3 rounded-xl bg-white border border-gray-200 p-4 hover:shadow-md hover:border-red transition-all group"
          >
            <span className="text-2xl flex-shrink-0">{r.emoji}</span>
            <div>
              <div className="font-semibold text-sm text-navy group-hover:text-red transition-colors">
                {r.label}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">{r.desc}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
