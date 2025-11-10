import { useState } from "react";
import { X } from "lucide-react";

interface MoodInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (mood: string, note?: string) => void;
}

export default function MoodInputModal({
  isOpen,
  onClose,
  onSubmit,
}: MoodInputModalProps) {
  const [selectedMood, setSelectedMood] = useState("");
  const [note, setNote] = useState("");

  const moods = [
    { emoji: "😊", label: "Happy", color: "#A8D5BA" },
    { emoji: "😌", label: "Calm", color: "#4A90E2" },
    { emoji: "😐", label: "Neutral", color: "#868686" },
    { emoji: "😔", label: "Sad", color: "#8D9DB6" },
    { emoji: "😫", label: "Stressed", color: "#F5A623" },
  ];

  const handleSubmit = () => {
    if (selectedMood) {
      onSubmit(selectedMood, note);
      setSelectedMood("");
      setNote("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end animate-fade-in">
      <div className="bg-white w-full max-w-[440px] mx-auto rounded-t-[32px] p-8 animate-slide-up max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-[24px] text-[#2c3e50]">
            How are you feeling?
          </h2>
          <button
            onClick={onClose}
            className="size-[32px] rounded-full bg-[#ecf0f1] flex items-center justify-center hover:bg-[#d9d9d9] transition-colors"
          >
            <X className="size-[20px]" strokeWidth={2} />
          </button>
        </div>

        {/* Mood Selection */}
        <div className="mb-6">
          <p className="font-semibold text-[16px] text-[#2c3e50] mb-4">
            Select your mood
          </p>
          <div className="grid grid-cols-5 gap-3">
            {moods.map((mood) => (
              <button
                key={mood.label}
                onClick={() => setSelectedMood(mood.label)}
                className={`flex flex-col items-center gap-2 p-4 rounded-[16px] transition-all ${
                  selectedMood === mood.label
                    ? "bg-[#4A90E2]/10 border-2 border-[#4A90E2] scale-105"
                    : "bg-[#ecf0f1] border-2 border-transparent"
                }`}
                style={{
                  backgroundColor:
                    selectedMood === mood.label ? `${mood.color}15` : undefined,
                }}
              >
                <span className="text-3xl">{mood.emoji}</span>
                <span className="text-[12px] font-medium text-[#2c3e50]">
                  {mood.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Mood Intensity Slider */}
        {selectedMood && (
          <div className="mb-6">
            <p className="font-semibold text-[16px] text-[#2c3e50] mb-4">
              How intense?
            </p>
            <div className="px-2">
              <input
                type="range"
                min="1"
                max="10"
                defaultValue="5"
                className="w-full h-2 bg-[#ecf0f1] rounded-full appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-5
                  [&::-webkit-slider-thumb]:h-5
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-[#4A90E2]
                  [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-webkit-slider-thumb]:shadow-lg
                  [&::-moz-range-thumb]:w-5
                  [&::-moz-range-thumb]:h-5
                  [&::-moz-range-thumb]:rounded-full
                  [&::-moz-range-thumb]:bg-[#4A90E2]
                  [&::-moz-range-thumb]:border-0
                  [&::-moz-range-thumb]:cursor-pointer"
              />
              <div className="flex justify-between text-xs text-[#868686] mt-2">
                <span>Mild</span>
                <span>Moderate</span>
                <span>Intense</span>
              </div>
            </div>
          </div>
        )}

        {/* Optional Note */}
        <div className="mb-6">
          <p className="font-semibold text-[16px] text-[#2c3e50] mb-4">
            Add a note (optional)
          </p>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What's on your mind? Any triggers or highlights?"
            className="w-full h-[120px] p-4 bg-[#ecf0f1] rounded-[16px] text-[14px] text-[#2c3e50] placeholder:text-[#868686] resize-none focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
          />
          <p className="text-xs text-[#868686] mt-2">
            💡 Tip: Journaling helps identify patterns in your mood
          </p>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!selectedMood}
          className={`w-full py-4 rounded-[16px] font-bold text-[16px] transition-all ${
            selectedMood
              ? "bg-[#4A90E2] text-white hover:bg-[#3A80D2] active:scale-95"
              : "bg-[#ecf0f1] text-[#868686] cursor-not-allowed"
          }`}
        >
          Save Mood Log
        </button>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
