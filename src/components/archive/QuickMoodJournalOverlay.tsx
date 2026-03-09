import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface QuickMoodJournalOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (mood: string, note: string) => void;
}

export function QuickMoodJournalOverlay({ isOpen, onClose, onSubmit }: QuickMoodJournalOverlayProps) {
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [journalNote, setJournalNote] = useState<string>("");

  const moods = [
    { emoji: "😊", label: "Happy", value: "happy" },
    { emoji: "😌", label: "Calm", value: "calm" },
    { emoji: "😰", label: "Anxious", value: "anxious" },
    { emoji: "😴", label: "Tired", value: "tired" },
    { emoji: "😤", label: "Stressed", value: "stressed" },
    { emoji: "😔", label: "Sad", value: "sad" },
  ];

  const handleSubmit = () => {
    if (selectedMood) {
      onSubmit(selectedMood, journalNote);
      setSelectedMood("");
      setJournalNote("");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Overlay Form */}
          <motion.div
            className="fixed bottom-24 right-6 left-6 bg-white rounded-3xl z-50 shadow-2xl max-w-sm mx-auto"
            initial={{ scale: 0, opacity: 0, originX: 1, originY: 1 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[#4A90E2]">Quick Check-In</h3>
                <button onClick={onClose} className="p-1">
                  <X className="w-5 h-5 text-[#4A90E2]" />
                </button>
              </div>

              {/* Buddy Message */}
              <div className="bg-[#E8F4FD] rounded-2xl p-3 mb-4">
                <p className="text-sm text-[#4A90E2]">
                  How are you feeling right now? <span className="text-[#F5A623]">💭</span>
                </p>
              </div>

              {/* Mood Grid */}
              <div className="mb-4">
                <label className="text-sm text-[#4A90E2] mb-2 block">Select your mood</label>
                <div className="grid grid-cols-3 gap-2">
                  {moods.map((mood) => (
                    <motion.button
                      key={mood.value}
                      onClick={() => setSelectedMood(mood.value)}
                      className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all ${
                        selectedMood === mood.value
                          ? "border-[#A8D5BA] bg-[#A8D5BA]/10"
                          : "border-gray-200 bg-white"
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-2xl">{mood.emoji}</span>
                      <span className="text-xs text-[#4A90E2]">{mood.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Optional Journal Note */}
              <div className="mb-4">
                <label className="text-sm text-[#4A90E2] mb-2 block">
                  Add a note (optional)
                </label>
                <Textarea
                  value={journalNote}
                  onChange={(e) => setJournalNote(e.target.value)}
                  placeholder="What's on your mind?"
                  className="resize-none h-20 border-[#4A90E2]/30 focus:border-[#A8D5BA]"
                />
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleSubmit}
                disabled={!selectedMood}
                className="w-full bg-[#A8D5BA] hover:bg-[#8BC5A0] text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Check-In
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
