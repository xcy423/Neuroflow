import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface StickyMascotProps {
  currentScreen: "home" | "courses" | "challenges" | "profile";
  moodLogCount: number;
  wellnessScore: number;
  completedChallenges: number;
  quoteIndex?: number;
  onMascotClick?: () => void;
}

export default function StickyMascot({
  currentScreen,
  moodLogCount,
  wellnessScore,
  completedChallenges,
  quoteIndex = 0,
  onMascotClick,
}: StickyMascotProps) {
  const [showBubble, setShowBubble] = useState(true);
  const [message, setMessage] = useState("");

  const homeQuotes = [
    "Good to see you! Ready to check in and start your wellness journey today? 🌟",
    "Remember: Small steps lead to big changes. Keep going! 💪",
    "Your consistency is inspiring! Every day counts. ✨",
    "Take a moment to breathe deeply. You've got this! 🌸",
    "Reflect on your progress today. You're doing amazing! 🌱"
  ];

  useEffect(() => {
    // Set message based on current screen and data
    let newMessage = "";
    
    switch (currentScreen) {
      case "home":
        if (wellnessScore >= 80 && quoteIndex === 0) {
          newMessage = "Amazing wellness score! You're doing great! ✨";
        } else {
          newMessage = homeQuotes[quoteIndex % homeQuotes.length];
        }
        break;
      case "courses":
        newMessage = "Your HRV suggests a restorative course might help. Try 'Sleep Meditation'! 😴";
        break;
      case "challenges":
        if (completedChallenges >= 5) {
          newMessage = "You've been consistent! Ready for the 'Mindfulness Streak' challenge? 🔥";
        } else {
          newMessage = "Start a new challenge to boost your wellness journey! 💪";
        }
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
  }, [currentScreen, moodLogCount, wellnessScore, completedChallenges, quoteIndex]);

  return (
    <div className="fixed bottom-[100px] right-[20px] z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* Speech Bubble */}
      {showBubble && message && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 10 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="bg-[#fcfcfc] border border-[#e2e6e7] rounded-[12px] p-3 shadow-lg max-w-[200px] sm:max-w-[240px] pointer-events-auto relative"
        >
          <p className="text-[12px] sm:text-[13px] text-[#2c3e50] leading-relaxed">
            {message}
          </p>
          {/* Speech bubble tail */}
          <div className="absolute -bottom-1 right-[20px] w-3 h-3 bg-[#fcfcfc] border-r border-b border-[#e2e6e7] transform rotate-45" />
          
          {/* Action Buttons */}
          {currentScreen === "home" && (
            <div className="flex gap-2 mt-3 pt-3 border-t border-[#e2e6e7]">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowBubble(false);
                }}
                className="flex-1 px-2 py-1 text-[10px] font-semibold text-[#868686] hover:text-[#2c3e50] transition-colors"
              >
                Dismiss
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onMascotClick?.();
                }}
                className="flex-1 px-2 py-1 text-[10px] font-semibold text-[#4A90E2] bg-[#E8F4FD] rounded-md hover:bg-[#D0E8F7] transition-colors"
              >
                Reflect More
              </button>
            </div>
          )}
        </motion.div>
      )}

      {/* Mascot Avatar - Always visible */}
      <motion.button
        onClick={onMascotClick || (() => setShowBubble(!showBubble))}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="overflow-clip rounded-full size-[50px] sm:size-[55px] border-2 border-white shadow-lg pointer-events-auto bg-white flex items-center justify-center"
        aria-label="Mascot"
        title="Harmony"
      >
        <div className="w-full h-full flex items-center justify-center text-[26px]">
          😊
        </div>
      </motion.button>
    </div>
  );
}
