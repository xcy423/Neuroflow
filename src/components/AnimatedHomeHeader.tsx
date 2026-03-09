import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import logoSvg from "../assets/neuroflow-logo.png";

interface AnimatedHomeHeaderProps {
  editMode?: boolean;
  onEditClick?: () => void;
  onSaveClick?: () => void;
}

export default function AnimatedHomeHeader({
  editMode = false,
  onEditClick,
  onSaveClick,
}: AnimatedHomeHeaderProps) {
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
    <div key={key} className="w-full bg-gradient-to-b from-[#4A90E2]/5 to-transparent pt-6 pb-4" style={{ paddingLeft: "32px", paddingRight: "32px" }}>
      {/* Outer row: [logo + text frame] spaced apart from [edit button] */}
      <div className="flex items-center justify-between">

        {/* LEFT FRAME: logo + title/slogan */}
        <div className="flex items-center gap-3">
          {/* Logo */}
          <motion.div
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            className="flex-shrink-0"
          >
            <img
              src={logoSvg}
              alt="NeuroFlow logo"
              style={{ width: 52, height: 52, objectFit: "contain" }}
            />
          </motion.div>

          {/* Title + slogan stacked */}
          <div className="flex flex-col justify-center">
            <motion.h1
              variants={logoVariants}
              initial="hidden"
              animate="visible"
              className="text-[24px] font-bold text-[#2c3e50] leading-tight"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              NeuroFlow
            </motion.h1>
            <motion.p
              variants={sloganVariants}
              initial="hidden"
              animate="visible"
              className="text-[12px] text-[#868686] italic leading-tight"
              style={{ fontFamily: "Lora, serif" }}
            >
              Caring for your mind, one step at a time
            </motion.p>
          </div>
        </div>
        {/* END LEFT FRAME */}

        {/* RIGHT: Edit / Save button — 44×44 */}
        {editMode ? (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onSaveClick}
            style={{
              display: "flex",
              width: 44,
              height: 44,
              padding: 5,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
              aspectRatio: "1/1",
              flexShrink: 0,
              borderRadius: "50%",
              background: "#A8D5BA",
              border: "none",
              cursor: "pointer",
              boxShadow: "0px 3px 0px 0px #dfdfdf",
            }}
          >
            <Check size={18} color="white" />
          </motion.button>
        ) : (
          <motion.button
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            whileTap={{ scale: 0.9 }}
            onClick={onEditClick}
            style={{
              display: "flex",
              width: 44,
              height: 44,
              padding: 5,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
              aspectRatio: "1/1",
              flexShrink: 0,
              borderRadius: "50%",
              background: "white",
              border: "1px solid #E2E6E7",
              cursor: "pointer",
              boxShadow: "0px 3px 0px 0px #dfdfdf",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="#2c3e50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="#2c3e50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
        )}

      </div>
    </div>
  );
}
