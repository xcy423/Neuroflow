import { motion, AnimatePresence } from "motion/react";
import { X, Flame, TrendingUp } from "lucide-react";

interface StreakHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  streakDays: number;
  moodLogCount: number;
}

export default function StreakHistoryModal({
  isOpen,
  onClose,
  streakDays,
  moodLogCount,
}: StreakHistoryModalProps) {
  const weekData = [
    { day: "Sun", completed: true, moodLogged: true },
    { day: "Mon", completed: true, moodLogged: true },
    { day: "Tue", completed: true, moodLogged: true },
    { day: "Wed", completed: true, moodLogged: false },
    { day: "Thu", completed: true, moodLogged: true },
    { day: "Fri", completed: true, moodLogged: true },
    { day: "Sat", completed: true, moodLogged: true },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            // responsive container: bottom sheet on small screens, centered modal on larger
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
          >
            <div className="bg-white rounded-t-[32px] sm:rounded-[16px] pt-4 pb-6 px-6 sm:pt-6 sm:pb-8 sm:px-8 max-h-[80vh] overflow-y-auto w-full sm:max-w-[640px]">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#F5A623]/20 rounded-full flex items-center justify-center">
                    <Flame className="w-6 h-6 text-[#F5A623]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#2c3e50]">Daily Streak</h2>
                    <p className="text-sm text-[#868686]">{streakDays} days strong!</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-[#ecf0f1] flex items-center justify-center hover:bg-[#d9d9d9] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#FFF4E5] border border-[#F5A623]/20 rounded-[16px] p-4">
                  <Flame className="w-8 h-8 text-[#F5A623] mb-2" />
                  <p className="text-2xl font-bold text-[#2c3e50]">{streakDays}</p>
                  <p className="text-xs text-[#868686]">Day Streak</p>
                </div>
                <div className="bg-[#E8F4FD] border border-[#4A90E2]/20 rounded-[16px] p-4">
                  <TrendingUp className="w-8 h-8 text-[#4A90E2] mb-2" />
                  <p className="text-2xl font-bold text-[#2c3e50]">{moodLogCount}</p>
                  <p className="text-xs text-[#868686]">Mood Logs</p>
                </div>
              </div>

              {/* This Week */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-[#2c3e50] mb-4">This Week</h3>
                <div className="flex justify-between gap-2 overflow-x-auto">
                  {weekData.map((day, i) => (
                    <motion.div
                      key={day.day}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: i * 0.05, duration: 0.2 }}
                      className="flex-none w-12 sm:w-14 flex flex-col items-center gap-2"
                    >
                      <div
                        className={`w-full aspect-square rounded-[12px] flex items-center justify-center ${
                          day.completed
                            ? "bg-[#F5A623]/20 border-2 border-[#F5A623]"
                            : "bg-[#ecf0f1] border-2 border-[#d9d9d9]"
                        }`}
                      >
                        {day.completed ? (
                          <Flame className="w-5 h-5 text-[#F5A623]" />
                        ) : (
                          <span className="text-[#868686] text-xs">—</span>
                        )}
                      </div>
                      <p className="text-xs text-[#2c3e50] font-semibold">{day.day}</p>
                      {/* removed small moodLogged dot and legend per request */}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Milestones */}
              <div>
                <h3 className="text-lg font-bold text-[#2c3e50] mb-4">Milestones</h3>
                <div className="space-y-3">
                  <div className={`flex items-center gap-3 p-3 rounded-[12px] ${streakDays >= 7 ? "bg-[#E8F4FD]" : "bg-[#ecf0f1]"}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${streakDays >= 7 ? "bg-[#4A90E2]" : "bg-[#d9d9d9]"}`}>
                      <span className="text-lg">{streakDays >= 7 ? "✓" : "🔒"}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[#2c3e50]">7 Day Warrior</p>
                      <p className="text-xs text-[#868686]">Complete 7 consecutive days</p>
                    </div>
                    {streakDays >= 7 && (
                      <span className="text-xs font-semibold text-[#4A90E2]">Unlocked!</span>
                    )}
                  </div>

                  <div className={`flex items-center gap-3 p-3 rounded-[12px] ${streakDays >= 30 ? "bg-[#FFF4E5]" : "bg-[#ecf0f1]"}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${streakDays >= 30 ? "bg-[#F5A623]" : "bg-[#d9d9d9]"}`}>
                      <span className="text-lg">{streakDays >= 30 ? "⭐" : "🔒"}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[#2c3e50]">30 Day Champion</p>
                      <p className="text-xs text-[#868686]">Complete 30 consecutive days</p>
                    </div>
                    {streakDays < 30 && (
                      <span className="text-xs text-[#868686]">{30 - streakDays} to go</span>
                    )}
                  </div>

                  <div className={`flex items-center gap-3 p-3 rounded-[#12px] ${streakDays >= 100 ? "bg-[#E8F4FD]" : "bg-[#ecf0f1]"}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${streakDays >= 100 ? "bg-gradient-to-br from-[#4A90E2] to-[#A8D5BA]" : "bg-[#d9d9d9]"}`}>
                      <span className="text-lg">{streakDays >= 100 ? "👑" : "🔒"}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[#2c3e50]">100 Day Legend</p>
                      <p className="text-xs text-[#868686]">Complete 100 consecutive days</p>
                    </div>
                    {streakDays < 100 && (
                      <span className="text-xs text-[#868686]">{100 - streakDays} to go</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Motivational Message */}
              <div className="mt-6 bg-gradient-to-br from-[#E8F4FD] to-[#FFF4E5] rounded-[16px] p-5 text-center">
                <p className="text-sm text-[#2c3e50] leading-relaxed">
                  💪 Keep up the amazing work! Consistency is the key to lasting wellness.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
