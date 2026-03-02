import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Official Merch',
  description: 'Official Anytime Soccer Training merch. Gear for players, parents, and coaches who are ALL IN on development.',
};

const featuredProducts = [
  { title: 'ALL IN Hoodie | Anytime Soccer Training', price: '$38.98', img: 'https://media.anytime-soccer.com/wp-content/uploads/2026/01/all_in.jpg', href: 'https://my-store-10e385f.creator-spring.com/' },
  { title: 'The Parent Trainer Tee | Anytime Soccer', price: '$23.99', img: 'https://media.anytime-soccer.com/wp-content/uploads/2026/01/the_parent_trainer_tee.jpg', href: 'https://my-store-10e385f.creator-spring.com/' },
  { title: 'The Inside Scoop Mug | Podcast', price: '$15.99', img: 'https://media.anytime-soccer.com/wp-content/uploads/2026/01/inside-scoop-mug.jpg', href: 'https://my-store-10e385f.creator-spring.com/' },
  { title: 'Best Coach Ever Hoodie | Anytime Soccer', price: '$38.98', img: 'https://media.anytime-soccer.com/wp-content/uploads/2026/01/best_coach_ever_hoodie.jpg', href: 'https://my-store-10e385f.creator-spring.com/' },
];

const gripSocks = [
  { title: 'Grip Socks - White 3 Pack', img: 'https://media.anytime-soccer.com/wp-content/uploads/2026/01/3_pack_grip_socks.jpg', href: 'https://amzn.to/4plDeBi' },
  { title: 'Grip Socks - White', img: 'https://media.anytime-soccer.com/wp-content/uploads/2026/01/white_grip_socks.jpg', href: 'https://amzn.to/4qxbtGR' },
  { title: 'Grip Socks - Black', img: 'https://media.anytime-soccer.com/wp-content/uploads/2026/01/black_grip_socks.jpg', href: 'https://amzn.to/45CUP0t' },
  { title: 'Grip Socks - Navy', img: 'https://media.anytime-soccer.com/wp-content/uploads/2026/01/navy_grip_socks.jpg', href: 'https://amzn.to/45qamke' },
];

export default function MerchPage() {
  return (
    <>
      {/* PAGE HEADER */}
      <section className="text-center pt-10 pb-16 px-5 bg-gradient-to-b from-background to-white">
        <h1 className="text-[clamp(32px,5vw,48px)] font-bold text-navy mb-4">Official Merch</h1>
        <p className="text-lg text-navy max-w-[600px] mx-auto">
          Wear your commitment. Gear for players, parents, and coaches who are <span className="text-red font-bold">ALL IN</span> on development.
        </p>
      </section>

      {/* FEATURED MERCH */}
      <section className="py-16 px-5">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-10 pb-4 border-b-2 border-[#e2e8f0]">
            <h2 className="text-[clamp(24px,4vw,32px)] font-bold text-navy mb-2">👕 Featured Merch</h2>
            <p className="text-base text-navy mt-2">Each design is available in multiple styles including tees, hoodies, sweatshirts, long sleeves, and mugs.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <div key={product.title} className="bg-white rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(15,49,84,0.08)] hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(15,49,84,0.12)] transition-all flex flex-col">
                <img src={product.img} alt={product.title} className="w-full aspect-square object-contain bg-[#f8fafc] p-4 border-b border-[#f1f5f9]" />
                <div className="p-3 md:p-4 flex flex-col grow">
                  <p className="text-sm font-semibold text-navy mb-2 leading-snug grow">{product.title}</p>
                  <p className="text-base font-bold text-navy mb-3">{product.price}</p>
                  <a
                    href={product.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3 px-4 bg-red text-white! text-center font-semibold text-sm rounded-lg no-underline hover:bg-red-dark transition-colors"
                  >
                    Shop Now
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="https://my-store-10e385f.creator-spring.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block py-4 px-10 bg-navy text-white! font-semibold text-base rounded-lg no-underline hover:bg-navy-light transition-colors"
            >
              View All Products →
            </a>
          </div>
        </div>
      </section>

      {/* GRIP SOCKS */}
      <section className="py-16 px-5 bg-[#f8fafc]">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-10 pb-4 border-b-2 border-[#e2e8f0]">
            <h2 className="text-[clamp(24px,4vw,32px)] font-bold text-navy">🧦 Recommended Grip Socks</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {gripSocks.map((product) => (
              <div key={product.title} className="bg-white rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(15,49,84,0.08)] hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(15,49,84,0.12)] transition-all flex flex-col">
                <img src={product.img} alt={product.title} className="w-full aspect-square object-contain bg-[#f8fafc] p-4 border-b border-[#f1f5f9]" />
                <div className="p-3 md:p-4 flex flex-col grow">
                  <p className="text-sm font-semibold text-navy mb-3 leading-snug grow">{product.title}</p>
                  <a
                    href={product.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3 px-4 bg-red text-white! text-center font-semibold text-sm rounded-lg no-underline hover:bg-red-dark transition-colors"
                  >
                    Buy Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
