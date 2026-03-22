'use client';

import { motion } from 'framer-motion';

const lines = [
  { text: 'LCYSA Special Offer.', color: 'text-red' },
  { text: 'Train Anytime. Anywhere.', color: 'text-white' },
  { text: 'Watch Your Player Soar.', color: 'text-white' },
];

export default function LCYSAHeadline() {
  return (
    <h1 className="text-[clamp(26px,5vw,42px)] font-extrabold leading-[1.15] text-white mb-4">
      {lines.map((line, i) => (
        <motion.span
          key={i}
          className={`${line.color} block`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: i * 0.4,
            ease: 'easeOut',
          }}
        >
          {line.text}
        </motion.span>
      ))}
    </h1>
  );
}
