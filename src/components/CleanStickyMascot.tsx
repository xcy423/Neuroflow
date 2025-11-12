import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
// Bear mascot variants (local assets)
import bearMeditation from "../assets/352d9f9fae606db62e48e15296173040c4a16a9a.png"; // seated/meditation
import bearStanding from "../assets/6f9556f595abd7625507fcafbe4580f443721a2f.png"; // standing neutral
import bearWaveSmall from "../assets/95c42c7e0690d226fa0fba3f3608cd43fa7da972.png"; // small wave
import bearWaveLeaves from "../assets/ee663eeb412631a8b9a8000169398cf5360facdd.png"; // wave with leaves
import bearFront from "../assets/a6e30b99b1b5110ddc2504b6f21c7a9407ff4343.png"; // front-facing
import bearPawUp from "../assets/cb93522203c02758e286f789d42463135a58c30f.png"; // paw up

interface CleanStickyMascotProps {
  currentScreen: "home" | "courses" | "challenges" | "profile";
  moodLogCount: number;
  wellnessScore: number;
  onMascotClick: () => void;
}

export default function CleanStickyMascot({
  currentScreen,
  moodLogCount,
  wellnessScore,
  onMascotClick,
}: CleanStickyMascotProps) {
  const [showBubble, setShowBubble] = useState(false);
  const [message, setMessage] = useState("");

  // Choose bear variant contextually
  const mascotVariant = useMemo(() => {
    // Default variant
    let src = bearFront;
    let alt = "Friendly bear";

    if (currentScreen === "courses") {
      // Meditation pose for Courses
      src = bearMeditation;
      alt = "Meditating bear";
    } else if (currentScreen === "home") {
      // Welcoming wave on Home
      src = bearWaveSmall;
      alt = "Bear waving hello";
    } else if (currentScreen === "challenges") {
      // Energetic/paw-up for Challenges
      src = bearPawUp;
      alt = "Bear cheering with paw up";
    } else if (currentScreen === "profile") {
      // Calm standing or celebratory if score is high
      src = wellnessScore >= 80 ? bearWaveLeaves : bearStanding;
      alt = wellnessScore >= 80 ? "Bear celebrating with leaves" : "Bear standing";
    }

    return { src, alt };
  }, [currentScreen, wellnessScore]);

  useEffect(() => {
    // Only show bubble 15% of the time (randomly)
    const shouldShow = Math.random() < 0.15;
    
    if (!shouldShow) {
      setShowBubble(false);
      return;
    }
    
    let newMessage = "";
    
    switch (currentScreen) {
      case "home":
        if (wellnessScore >= 80) {
          newMessage = "Amazing wellness score! You're doing great! ✨";
        } else if (moodLogCount > 20) {
          newMessage = "Good to see you! Ready to check in and start your wellness journey today? 🌟";
        } else {
          newMessage = "Welcome back! Tap me to visit your Sanctuary 🏞️";
        }
        break;
      case "courses":
        newMessage = "Your HRV suggests a restorative course might help. Try 'Sleep Meditation'! 😴";
        break;
      case "challenges":
        newMessage = "Ready for a new challenge? Let's boost your wellness journey! 💪";
        break;
      case "profile":
        newMessage = "Your progress is inspiring! Keep growing! 🌱";
        break;
    }
    
    setMessage(newMessage);
    setShowBubble(true);

    // Auto-hide bubble after 8 seconds
    const timer = setTimeout(() => {
      setShowBubble(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, [currentScreen, moodLogCount, wellnessScore]);

  return (
    <div className="fixed bottom-[90px] right-[20px] z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* Speech Bubble */}
      <AnimatePresence>
        {showBubble && message && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 10 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="bg-white border-2 border-[#4A90E2]/20 rounded-[16px] p-4 shadow-lg max-w-[220px] pointer-events-auto relative"
          >
            <p className="text-[13px] text-[#2c3e50] leading-relaxed">
              {message}
            </p>
            
            {/* Tail */}
            <div className="absolute -bottom-2 right-[24px] w-4 h-4 bg-white border-r-2 border-b-2 border-[#4A90E2]/20 transform rotate-45" />
            
            {/* Dismiss Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowBubble(false);
              }}
              className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#ecf0f1] flex items-center justify-center hover:bg-[#d9d9d9] transition-colors"
            >
              <span className="text-[10px] text-[#868686]">✕</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mascot Avatar - Contextual Bear */}
      <motion.button
        onClick={onMascotClick}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="overflow-clip rounded-full w-[56px] h-[56px] border-3 border-white shadow-xl pointer-events-auto bg-white relative"
      >
        <img src={mascotVariant.src} alt={mascotVariant.alt} className="w-full h-full object-contain" />
        
        {/* Pulse Animation */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-[#4A90E2]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.button>
    </div>
  );
}
