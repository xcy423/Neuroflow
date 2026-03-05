import { motion, AnimatePresence } from "motion/react";
import { ChallengeInfo, ChallengeUserRank } from "../types/challenge";
import { toast } from "sonner";
import { useState } from "react";

interface ChallengeSessionScreenProps {
  challenge: ChallengeInfo;
  onBack: () => void;
  onCompleteToday?: (challengeId: number) => void;
}

export default function ChallengeSessionScreen({ challenge, onBack, onCompleteToday }: ChallengeSessionScreenProps) {
  const [completedToday, setCompletedToday] = useState(false);

  // Progress ring calculations
  const userRank = challenge.topUsers?.find((u: ChallengeUserRank) => u.name === "You");
  const userDays = userRank?.days ?? 0;
  const totalDays = 30;
  const progressPct = Math.min((userDays / totalDays) * 100, 100);
  const ringRadius = 40;
  const ringCircumference = 2 * Math.PI * ringRadius; // ≈ 251.33

  const handleComplete = () => {
    if (!completedToday) {
      setCompletedToday(true);
      onCompleteToday?.(challenge.id);
      toast.success("Progress logged! Keep it up 💪");
    } else {
      toast("Already logged for today ✅");
    }
  };

  const [showAllRanks, setShowAllRanks] = useState(false);
  const ranks: ChallengeUserRank[] = challenge.topUsers || [];

  const podium = ranks.slice(0, 3);
  const secondary = ranks.slice(3, 5);
  const remaining = ranks.slice(5);

  return (
    <div className="w-full h-full flex flex-col bg-[#fcfcfc]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 bg-[#fcfcfc] px-5 sm:px-8 pt-4 pb-3 border-b border-[#e2e6e7] flex items-center gap-4">
        <button
          onClick={onBack}
          aria-label="Back"
          className="p-2 rounded-[8px] hover:bg-[#E8F4FD] active:scale-95 transition-all flex items-center justify-center"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 12 12">
            <path d="M7.5 2.5L3.5 6l4 3.5" stroke="#2C3E50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h2 className="text-[18px] font-bold text-[#2c3e50] truncate">{challenge.title}</h2>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 sm:px-8 pt-5 pb-16">
        {/* Challenge Overview */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-[16px] border border-[#4a90e2] p-4 mb-6 relative overflow-hidden"
        >
          <div className="absolute left-[-82px] top-[-24.48px] pointer-events-none opacity-40 mix-blend-multiply">
            <svg width="393" height="137" fill="none" viewBox="0 0 393 137">
              <path d="M31.2421 23.3579C58.6309 13.6943 87.9153 7.70171 117.653 6.61813C206.964 3.31907 296.607 43.8255 357.232 110.735C327.6 129.053 295.559 130.743 265.145 118.262C234.73 105.78 206.671 87.3399 178.083 72.1646C149.495 56.9894 118.6 43.3399 88.7703 34.2535C69.5017 28.5224 50.2668 25.042 31.2421 23.3579Z" stroke="url(#paint0_radial)" strokeWidth="20" />
              <defs>
                <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(266.99 90.3718 -143.527 168.111 31.2421 23.3579)">
                  <stop offset="0.117544" stopColor="#4A90E2" stopOpacity="0.3" />
                  <stop offset="0.5" stopColor="white" stopOpacity="0.4" />
                  <stop offset="1" stopColor="#4A90E2" stopOpacity="0.4" />
                </radialGradient>
              </defs>
            </svg>
          </div>

          <div className="relative z-10 flex items-start gap-4">
            <div className="w-12 h-12 rounded-[12px] bg-gradient-to-br from-[#E8F4FD] to-[#f0f0f0] flex items-center justify-center text-[28px]">
              {challenge.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-[18px] font-bold text-[#2c3e50] mb-2">{challenge.title}</h3>
              <div className="inline-flex px-2 py-1 rounded-[6px] bg-[rgba(168,213,186,0.25)] mb-2">
                <span className="text-[13px] font-semibold text-[#2c3e50]">{challenge.category}</span>
              </div>
              <p className="text-[13px] text-[#2c3e50] leading-relaxed mb-0">{challenge.description}</p>
            </div>
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              <div className="px-2 py-1 rounded-[4px] bg-[rgba(245,166,35,0.2)] flex gap-1 items-center">
                <span className="text-[12px] font-bold text-[#f5a623]">{challenge.timeLeft}</span>
              </div>
              <div className="flex gap-1 items-center">
                <div className="size-[18px]">
                  <svg className="block size-full" fill="none" viewBox="0 0 15 13">
                    <path d="M4.75 4.25C5.57843 4.25 6.25 3.57843 6.25 2.75C6.25 1.92157 5.57843 1.25 4.75 1.25C3.92157 1.25 3.25 1.92157 3.25 2.75C3.25 3.57843 3.92157 4.25 4.75 4.25Z" stroke="#2C3E50" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8.75 6.75C8.75 7.44765 8.47344 8.1176 7.98223 8.60881C7.49102 9.10002 6.82107 9.37658 6.12342 9.37658C5.42577 9.37658 4.75582 9.10002 4.26461 8.60881C3.7734 8.1176 3.49683 7.44765 3.49683 6.75" stroke="#2C3E50" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M11.25 4.25C12.0784 4.25 12.75 3.57843 12.75 2.75C12.75 1.92157 12.0784 1.25 11.25 1.25C10.4216 1.25 9.75 1.92157 9.75 2.75C9.75 3.57843 10.4216 4.25 11.25 4.25Z" stroke="#2C3E50" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15.25 6.75C15.25 7.44765 14.9734 8.1176 14.4822 8.60881C13.991 9.10002 13.3211 9.37658 12.6234 9.37658C11.9258 9.37658 11.2558 9.10002 10.7646 8.60881C10.2734 8.1176 9.99683 7.44765 9.99683 6.75" stroke="#2C3E50" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-[13px] font-medium text-[#2c3e50]">{challenge.participants}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Your Progress Ring */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="bg-white rounded-[16px] border border-[#e2e6e7] p-4 mb-6"
        >
          <h4 className="text-[15px] font-bold text-[#2c3e50] mb-4">Your Progress</h4>
          <div className="flex items-center gap-5">
            {/* Animated SVG ring */}
            <div className="relative flex-shrink-0" style={{ width: 100, height: 100 }}>
              <svg width="100" height="100" viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
                {/* Gray track */}
                <circle
                  cx="50" cy="50" r={ringRadius}
                  fill="none"
                  stroke="#E2E6E7"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                {/* Animated fill */}
                <motion.circle
                  cx="50" cy="50" r={ringRadius}
                  fill="none"
                  stroke="url(#ringGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={ringCircumference}
                  initial={{ strokeDashoffset: ringCircumference }}
                  animate={{ strokeDashoffset: ringCircumference - (progressPct / 100) * ringCircumference }}
                  transition={{ duration: 1.1, ease: "easeOut", delay: 0.2 }}
                />
                <defs>
                  <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#4A90E2" />
                    <stop offset="100%" stopColor="#A8D5BA" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Center label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                  className="text-[20px] font-bold text-[#4a90e2] leading-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  {Math.round(progressPct)}%
                </motion.span>
                <span className="text-[9px] font-medium text-[#80646f] mt-0.5">done</span>
              </div>
            </div>
            {/* Stats beside ring */}
            <div className="flex flex-col gap-3 flex-1">
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-medium text-[#80646f]">Days Completed</span>
                <span className="text-[18px] font-bold text-[#2c3e50]">{userDays} <span className="text-[13px] font-medium text-[#80646f]">/ {totalDays} days</span></span>
              </div>
              {/* Mini linear bar */}
              <div className="flex flex-col gap-1.5">
                <div className="relative h-[6px] w-full rounded-[100px] bg-[#E2E6E7]" style={{ overflow: "visible" }}>
                  <div className="absolute inset-0 rounded-[100px]" style={{ overflow: "hidden" }}>
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 rounded-[100px]"
                      style={{ background: "linear-gradient(90deg, #4A90E2 0%, #A8D5BA 100%)" }}
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPct}%` }}
                      transition={{ duration: 1.1, ease: "easeOut", delay: 0.2 }}
                    />
                  </div>
                  {/* Glow dot */}
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 rounded-full"
                    style={{
                      width: 10, height: 10,
                      background: "#4A90E2",
                      boxShadow: "0px 0px 6px 2px rgba(74,144,226,0.55)",
                      right: `${100 - progressPct}%`,
                      transform: "translateY(-50%) translateX(50%)",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                  />
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] text-[#80646f]">Start</span>
                  <span className="text-[10px] text-[#80646f]">Goal</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Today's Task */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="bg-white rounded-[16px] border border-[#e2e6e7] p-4 mb-6"
        >
          <h4 className="text-[15px] font-bold text-[#2c3e50] mb-3">Today's Task</h4>
          <ul className="space-y-2 mb-4">
            <li className="flex items-start gap-2">
              <span className="text-[12px]">🌱</span>
              <p className="text-[12px] text-[#2c3e50] leading-relaxed">Spend 5 minutes on mindful breathing.</p>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[12px]">📝</span>
              <p className="text-[12px] text-[#2c3e50] leading-relaxed">Journal one positive thought.</p>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[12px]">💧</span>
              <p className="text-[12px] text-[#2c3e50] leading-relaxed">Drink a glass of water after completing the above.</p>
            </li>
          </ul>
          <button
            onClick={handleComplete}
            className={`w-full py-3 rounded-[8px] font-bold text-[14px] transition-all flex items-center justify-center shadow-[0px_4px_0px_0px_#477baf] active:translate-y-[2px] active:shadow-[0px_2px_0px_0px_#477baf] ${completedToday ? "bg-[#A8D5BA] text-[#2c3e50]" : "bg-[#4a90e2] text-white hover:bg-[#3A80D2]"}`}
          >
            {completedToday ? "Logged for Today ✅" : "Mark Today's Task Complete"}
          </button>
        </motion.div>

        {/* Compact Leaderboard / Ranking */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white rounded-[16px] border border-[#e2e6e7] p-4 mb-6"
        >
          <h4 className="text-[15px] font-bold text-[#2c3e50] mb-3">Leaderboard</h4>
          {/* Podium */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {podium.map((u, idx) => (
              <div key={u.name} className={`flex flex-col items-center justify-end rounded-[12px] p-2 ${idx===1? 'bg-[#E8F4FD]':'bg-[#ecf0f1]'} min-h-[90px] relative`}>
                <div className="absolute top-1 left-1 text-[10px] font-bold text-[#4A90E2]">#{idx+1}</div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4A90E2] to-[#A8D5BA] flex items-center justify-center text-white text-[12px] font-bold mb-1">{u.avatar || '👤'}</div>
                <p className="text-[10px] font-semibold text-[#2c3e50] text-center truncate w-full">{u.name}</p>
                <span className="text-[10px] font-bold text-[#F5A623]">{u.days}d</span>
              </div>
            ))}
          </div>
          {/* Secondary ranks */}
          <div className="space-y-2 mb-3">
            {secondary.map((u, idx) => (
              <div key={u.name} className="flex items-center gap-3 bg-[#fcfcfc] border border-[#e2e6e7] rounded-[10px] p-2">
                <span className="text-[11px] font-bold text-[#4A90E2] w-6 text-center">#{idx+4}</span>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4A90E2] to-[#A8D5BA] flex items-center justify-center text-white text-[11px] font-bold">{u.avatar || '👤'}</div>
                <p className="text-[11px] font-semibold text-[#2c3e50] flex-1 truncate">{u.name}</p>
                <span className="text-[11px] font-bold text-[#F5A623] whitespace-nowrap">{u.days}d</span>
              </div>
            ))}
          </div>
          {/* Remaining collapsible */}
          {remaining.length > 0 && (
            <div className="mb-2">
              <AnimatePresence>
                {showAllRanks && remaining.map((u, idx) => (
                  <motion.div
                    key={u.name}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-3 bg-white border border-[#e2e6e7] rounded-[10px] p-2 mb-2"
                  >
                    <span className="text-[11px] font-bold text-[#4A90E2] w-6 text-center">#{idx+6}</span>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4A90E2] to-[#A8D5BA] flex items-center justify-center text-white text-[11px] font-bold">{u.avatar || '👤'}</div>
                    <p className="text-[11px] font-semibold text-[#2c3e50] flex-1 truncate">{u.name}</p>
                    <span className="text-[11px] font-bold text-[#F5A623] whitespace-nowrap">{u.days}d</span>
                  </motion.div>
                ))}
              </AnimatePresence>
              <button
                onClick={() => setShowAllRanks(prev => !prev)}
                className="w-full mt-1 py-2 rounded-[8px] bg-[#ecf0f1] hover:bg-[#E8F4FD] text-[12px] font-semibold text-[#2c3e50] transition-all"
              >
                {showAllRanks ? 'Show Less' : `Show ${remaining.length} More`}
              </button>
            </div>
          )}
        </motion.div>

        {/* Community / Motivation (condensed) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="bg-white rounded-[16px] border border-[#e2e6e7] p-4 mb-6"
        >
          <h4 className="text-[15px] font-bold text-[#2c3e50] mb-3">Community</h4>
          <p className="text-[12px] text-[#2c3e50] leading-relaxed mb-2">{challenge.participants} participants active today.</p>
          <p className="text-[12px] text-[#2c3e50] leading-relaxed mb-0">Share a win tomorrow—small public commitments can lift completion by 30%.</p>
        </motion.div>
      </div>
    </div>
  );
}
