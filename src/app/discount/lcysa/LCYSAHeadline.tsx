'use client';

import { motion } from 'framer-motion';

const phrases = [
  { text: 'LCYSA Special Offer.', color: 'text-red' },
  { text: ' Train Anytime.', color: 'text-red' },
  { text: ' Watch Your Player Soar.', color: 'text-red' },
];

const CYCLE = 4.5;

export default function LCYSAHeadline() {
  return (
    <h1 className="text-[clamp(26px,5vw,42px)] font-extrabold leading-[1.1] mb-4">
      {phrases.map((phrase, i) => (
        <motion.span
          key={i}
          className={phrase.color}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [20, 0, 0, 0],
          }}
          transition={{
            duration: CYCLE,
            delay: i * 0.5,
            times: [0, 0.1, 0.7, 0.85],
            repeat: Infinity,
            repeatDelay: 0,
          }}
        >
          {phrase.text}
        </motion.span>
      ))}
    </h1>
  );
}
