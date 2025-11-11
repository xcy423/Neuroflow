import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function AnimatedHomeHeader() {
  const [key, setKey] = useState(0);

  // Re-trigger animation when component mounts (e.g., returning to Home page)
  useEffect(() => {
    setKey(prev => prev + 1);
  }, []);

  // Animation variants for the logo
  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  // Animation variants for the slogan (fades in + slides right)
  const sloganVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 1, // Waits for logo to finish (1 second)
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  return (
    <div key={key} className="w-full bg-gradient-to-b from-[#4A90E2]/5 to-transparent px-6 pt-6 pb-4">
      <div className="flex items-center gap-4">
        {/* Logo - Fades in with subtle scale */}
        <motion.div
          variants={logoVariants}
          initial="hidden"
          animate="visible"
          className="flex-shrink-0"
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4A90E2] to-[#A8D5BA] flex items-center justify-center shadow-lg">
            <span className="text-2xl">🧠</span>
          </div>
        </motion.div>

        {/* App Name & Slogan Container */}
        <div className="flex-1 overflow-hidden">
          {/* App Name - Fades in with logo */}
          <motion.h1
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            className="text-[24px] font-bold text-[#2c3e50] mb-1"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            NeuroFlow
          </motion.h1>

          {/* Slogan - Fades in AND slides right after logo */}
          <motion.p
            variants={sloganVariants}
            initial="hidden"
            animate="visible"
            className="text-[13px] text-[#868686] italic"
            style={{ fontFamily: "Lora, serif" }}
          >
            Caring for your mind, one step at a time
          </motion.p>
        </div>
      </div>
    </div>
  );
}
