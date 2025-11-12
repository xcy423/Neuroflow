import { useState } from "react";
import { motion } from "motion/react";

/**
 * SwipeIndicator Component
 * 
 * Add this to your app to show visual feedback while users are swiping.
 * This helps users understand the swipe gesture feature.
 * 
 * Usage in App.tsx:
 * import { SwipeIndicator } from "./components/SwipeIndicator";
 * 
 * Then add inside your main container:
 * <SwipeIndicator currentPage={currentScreen} totalPages={4} />
 */

interface SwipeIndicatorProps {
  currentPage: string;
  totalPages: number;
  pageOrder?: string[];
}

export function SwipeIndicator({ currentPage, totalPages, pageOrder = [] }: SwipeIndicatorProps) {
  const [showHint, setShowHint] = useState(true);

  const currentIndex = pageOrder.indexOf(currentPage);
  const canSwipeLeft = currentIndex < totalPages - 1;
  const canSwipeRight = currentIndex > 0;

  // Auto-hide hint after 5 seconds
  setTimeout(() => setShowHint(false), 5000);

  return (
    <>
      {/* Swipe Hint (shows for first 5 seconds) */}
      {showHint && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute top-24 left-1/2 -translate-x-1/2 z-10 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm"
        >
          👈 Swipe to navigate 👉
        </motion.div>
      )}

      {/* Page Indicators */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {Array.from({ length: totalPages }).map((_, index) => (
          <motion.div
            key={index}
            animate={{
              width: currentIndex === index ? 24 : 8,
              backgroundColor: currentIndex === index ? "#4A90E2" : "#e2e6e7",
            }}
            className="h-2 rounded-full"
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        ))}
      </div>

      {/* Swipe Edge Indicators */}
      {canSwipeRight && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 pointer-events-none"
        >
          <div className="bg-gradient-to-r from-[#4A90E2]/20 to-transparent w-12 h-32 rounded-r-full" />
          <div className="absolute left-2 top-1/2 -translate-y-1/2 text-2xl">👈</div>
        </motion.div>
      )}

      {canSwipeLeft && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 pointer-events-none"
        >
          <div className="bg-gradient-to-l from-[#4A90E2]/20 to-transparent w-12 h-32 rounded-l-full" />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-2xl">👉</div>
        </motion.div>
      )}
    </>
  );
}
