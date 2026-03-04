import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

interface NotificationOverlayProps {
  show: boolean;
  onDismiss: () => void;
  onTryIt: () => void;
}

export function NotificationOverlay({ show, onDismiss, onTryIt }: NotificationOverlayProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed top-0 left-0 right-0 z-50 px-6 pt-12"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", damping: 20 }}
        >
          <div className="bg-[#F5A623] rounded-2xl p-5 shadow-2xl relative">
            <button
              onClick={onDismiss}
              className="absolute top-3 right-3 text-white/80 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start gap-3 mb-4">
              <span className="text-3xl">💡</span>
              <div>
                <h4 className="text-white mb-1">Wellness Check-In</h4>
                <p className="text-white/90 text-sm">
                  Noticed you're stressed after that meeting—quick stretch? 🧘‍♀️
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onTryIt}
                className="flex-1 bg-[#A8D5BA] text-white py-3 rounded-xl"
              >
                Try It
              </button>
              <button
                onClick={onDismiss}
                className="bg-white/20 text-white px-6 py-3 rounded-xl"
              >
                Later
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
