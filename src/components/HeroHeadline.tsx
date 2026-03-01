'use client';

import { motion } from 'framer-motion';

const phrases = [
  { text: 'Stop Guessing.', color: 'text-white' },
  { text: ' Stop Searching.', color: 'text-white' },
  { text: ' Start Training.', color: 'text-red' },
];

// Total cycle: 3s visible + 1s fade out + 0.5s pause = 4.5s loop
const CYCLE = 4.5;

export default function HeroHeadline() {
  return (
    <h1 className="text-[clamp(40px,5vw,56px)] font-extrabold leading-[1.1] mb-5">
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
