'use client';

import { motion } from 'framer-motion';

const phrases = [
  { text: 'LCYSA Special Offer.', color: 'text-red' },
  { text: 'Train Anytime.', color: 'text-white' },
  { text: 'Your Player Gets Better.', color: 'text-white' },
];

const CYCLE = 7;

export default function LCYSAHeadline() {
  return (
    <h1 className="text-[clamp(32px,6vw,56px)] font-extrabold leading-[1.1] mb-4">
      {phrases.map((phrase, i) => (
        <motion.span
          key={i}
          className={`${phrase.color} block whitespace-nowrap`}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [20, 0, 0, 0],
          }}
          transition={{
            duration: CYCLE,
            delay: i * 0.8,
            times: [0, 0.08, 0.75, 0.9],
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
