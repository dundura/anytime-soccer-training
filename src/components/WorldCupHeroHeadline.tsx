'use client';

import { motion } from 'framer-motion';

const bebas = { fontFamily: "'Bebas Neue', sans-serif" };

export default function WorldCupHeroHeadline() {
  return (
    <h1
      style={bebas}
      className="text-6xl sm:text-7xl md:text-8xl text-navy leading-[0.9] tracking-wide mb-5"
    >
      <motion.span
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="block"
      >
        Predict the
      </motion.span>
      <motion.span
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
        className="block wc-shimmer"
      >
        2026 World Cup
      </motion.span>
      <style>{`
        .wc-shimmer {
          background: linear-gradient(90deg, #DC373E 0%, #DC373E 35%, #F4C04D 50%, #DC373E 65%, #DC373E 100%);
          background-size: 250% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: wc-shimmer-slide 3.5s linear infinite;
        }
        @keyframes wc-shimmer-slide {
          from { background-position: 125% 0; }
          to { background-position: -125% 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .wc-shimmer { animation: none; color: #DC373E; background: none; }
        }
      `}</style>
    </h1>
  );
}
