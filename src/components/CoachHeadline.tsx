'use client';

import { motion } from 'framer-motion';

const phrases = [
  { text: 'Your players want to improve.', color: 'text-white' },
  { text: ' Give them a system that works.', color: 'text-red' },
];

export default function CoachHeadline() {
  return (
    <h1 className="text-[clamp(32px,5vw,48px)] font-extrabold leading-[1.1] mb-5">
      {phrases.map((phrase, i) => (
        <motion.span
          key={i}
          className={phrase.color}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.7, ease: 'easeOut' }}
        >
          {phrase.text}
        </motion.span>
      ))}
    </h1>
  );
}
