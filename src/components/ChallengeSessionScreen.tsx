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
  const [showAllRanks, setShowAllRanks] = useState(false);

  const userRank = challenge.topUsers?.find((u: ChallengeUserRank) => u.name === "You");
  const userDays = userRank?.days ?? 0;
  const totalDays = 30;
  const progressPct = Math.min((userDays / totalDays) * 100, 100);
  const ringRadius = 40;
  const ringCircumference = 2 * Math.PI * ringRadius;

  const handleComplete = () => {
    if (!completedToday) {
      setCompletedToday(true);
      onCompleteToday?.(challenge.id);
      toast.success("Progress logged! Keep it up ðŸ’ª");
    } else {
      toast("Already logged for today âœ…");
    }
  };

  const ranks: ChallengeUserRank[] = challenge.topUsers || [];
  const podium = ranks.slice(0, 3);
  const secondary = ranks.slice(3, 5);
  const remaining = ranks.slice(5);

  const medalColors = ["#F5A623", "#868686", "#C87941"];
  const medalLabels = ["1st", "2nd", "3rd"];
  const podiumOrder = [1, 0, 2]; // silver, gold, bronze visual order

  return (
    <div className="w-full h-full flex flex-col bg-[#fcfcfc]">
      {/* Sticky Header */}
      <div
        className="sticky top-0 z-20 bg-[#fcfcfc] px-5 pt-4 pb-3 flex items-center gap-3"
        style={{ boxShadow: "0px 1px 0px 0px #E2E6E7" }}
      >
        <button
          onClick={onBack}
          aria-label="Back"
          className="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0 active:scale-95 transition-all"
          style={{ background: "#f0f4f8" }}
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 12 12">
            <path d="M7.5 2.5L3.5 6l4 3.5" stroke="#2C3E50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1 min-w-0">
          <h2 className="text-[17px] font-bold text-[#2c3e50] truncate leading-tight">{challenge.title}</h2>
          <div className="flex items-center gap-2 mt-0.5">
            <span
              className="text-[11px] font-semibold px-2 py-0.5 rounded-[4px]"
              style={{ background: "rgba(168,213,186,0.25)", color: "#2c3e50" }}
            >
              {challenge.category}
            </span>
            <span className="text-[11px] font-medium text-[#F5A623]">{challenge.timeLeft} left</span>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-20 flex flex-col gap-4">

        {/* Challenge Overview Card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-[16px] overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #EBF4FF 0%, #F0FBF4 100%)",
            border: "1px solid #E2E6E7",
            boxShadow: "0px 0px 12px 0px rgba(44,62,80,0.08)",
          }}
        >
          {/* Gradient top stripe */}
          <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #4A90E2 0%, #A8D5BA 100%)" }} />
          <div className="p-4 flex items-start gap-3">
            <div
              className="w-14 h-14 rounded-[14px] flex items-center justify-center text-[28px] flex-shrink-0"
              style={{ background: "white", boxShadow: "0px 2px 8px rgba(44,62,80,0.10)" }}
            >
              {challenge.icon}
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <p className="text-[13px] text-[#2c3e50] leading-relaxed">{challenge.description}</p>
              <div className="flex items-center gap-1 mt-2">
                <svg className="size-[14px] flex-shrink-0" viewBox="0 0 20 20" fill="none">
                  <circle cx="7" cy="6.5" r="2.5" fill="#80646f" />
                  <path d="M1.5 16C1.5 13.015 4.015 10.5 7 10.5" stroke="#80646f" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="13" cy="6.5" r="3" fill="#80646f" />
                  <path d="M7 17C7 13.686 9.686 11 13 11C16.314 11 19 13.686 19 17" stroke="#80646f" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span className="text-[12px] text-[#80646f]">{challenge.participants} participants</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Your Progress Card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="bg-white rounded-[16px] p-4"
          style={{ border: "1px solid #E2E6E7", boxShadow: "0px 0px 12px 0px rgba(44,62,80,0.06)" }}
        >
          <h4 className="text-[14px] font-bold text-[#2c3e50] mb-4">Your Progress</h4>
          <div className="flex items-center gap-5">
            {/* Animated ring */}
            <div className="relative flex-shrink-0" style={{ width: 96, height: 96 }}>
              <svg width="96" height="96" viewBox="0 0 96 96" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="48" cy="48" r={ringRadius} fill="none" stroke="#E2E6E7" strokeWidth="7" strokeLinecap="round" />
                <motion.circle
                  cx="48" cy="48" r={ringRadius}
                  fill="none"
                  stroke="url(#ringGrad)"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeDasharray={ringCircumference}
                  initial={{ strokeDashoffset: ringCircumference }}
                  animate={{ strokeDashoffset: ringCircumference - (progressPct / 100) * ringCircumference }}
                  transition={{ duration: 1.1, ease: "easeOut", delay: 0.2 }}
                />
                <defs>
                  <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#4A90E2" />
                    <stop offset="100%" stopColor="#A8D5BA" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                  className="text-[19px] font-bold text-[#4a90e2] leading-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  {Math.round(progressPct)}%
                </motion.span>
                <span className="text-[9px] font-medium text-[#80646f] mt-0.5">done</span>
              </div>
            </div>
            {/* Stats */}
            <div className="flex flex-col gap-3 flex-1">
              <div>
                <p className="text-[11px] font-medium text-[#80646f] mb-0.5">Days Completed</p>
                <p className="text-[20px] font-bold text-[#2c3e50] leading-none">
                  {userDays} <span className="text-[12px] font-medium text-[#80646f]">/ {totalDays} days</span>
                </p>
              </div>
              <div>
                <div className="relative h-[6px] w-full rounded-[100px] bg-[#E2E6E7] mb-1.5" style={{ overflow: "visible" }}>
                  <div className="absolute inset-0 rounded-[100px]" style={{ overflow: "hidden" }}>
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 rounded-[100px]"
                      style={{ background: "linear-gradient(90deg, #4A90E2 0%, #A8D5BA 100%)" }}
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPct}%` }}
                      transition={{ duration: 1.1, ease: "easeOut", delay: 0.2 }}
                    />
                  </div>
                  <motion.div
                    className="absolute top-1/2 rounded-full"
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

        {/* Today's Task Card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.08 }}
          className="bg-white rounded-[16px] p-4"
          style={{ border: "1px solid #E2E6E7", boxShadow: "0px 0px 12px 0px rgba(44,62,80,0.06)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-[14px] font-bold text-[#2c3e50]">Today's Task</h4>
            {completedToday && (
              <span
                className="text-[11px] font-semibold px-2 py-0.5 rounded-[100px]"
                style={{ background: "rgba(168,213,186,0.3)", color: "#2c3e50" }}
              >
                Done âœ…
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2 mb-4">
            {[
              { emoji: "ðŸŒ±", text: "Spend 5 minutes on mindful breathing." },
              { emoji: "ðŸ“", text: "Journal one positive thought." },
              { emoji: "ðŸ’§", text: "Drink a glass of water after completing the above." },
            ].map((task, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-[10px]"
                style={{ background: "#f8fafc", border: "1px solid #E2E6E7" }}
              >
                <span className="text-[14px] flex-shrink-0">{task.emoji}</span>
                <p className="text-[12px] text-[#2c3e50] leading-snug">{task.text}</p>
              </div>
            ))}
          </div>
          <button
            onClick={handleComplete}
            className="w-full py-3 rounded-[100px] font-bold text-[14px] transition-all flex items-center justify-center"
            style={
              completedToday
                ? { background: "rgba(168,213,186,0.25)", border: "1.5px solid #A8D5BA", color: "#2c3e50" }
                : { background: "#4a90e2", color: "white", boxShadow: "0px 4px 12px rgba(74,144,226,0.35)" }
            }
          >
            {completedToday ? "Logged for Today âœ…" : "Mark Today Complete"}
          </button>
        </motion.div>

        {/* Leaderboard Card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white rounded-[16px] p-4"
          style={{ border: "1px solid #E2E6E7", boxShadow: "0px 0px 12px 0px rgba(44,62,80,0.06)" }}
        >
          <h4 className="text-[14px] font-bold text-[#2c3e50] mb-4">Leaderboard</h4>

          {/* Podium â€” visual order: 2nd | 1st | 3rd */}
          <div className="flex items-end justify-center gap-2 mb-4 px-2">
            {podiumOrder.map((rankIdx) => {
              const u = podium[rankIdx];
              if (!u) return null;
              const isFirst = rankIdx === 0;
              const podiumHeights = [76, 56, 48];
              return (
                <div key={u.name} className="flex flex-col items-center gap-1 flex-1">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold relative"
                    style={{
                      background: isFirst
                        ? "linear-gradient(135deg, #4A90E2, #A8D5BA)"
                        : "linear-gradient(135deg, #d8dde2, #c4cacf)",
                      color: "white",
                      boxShadow: isFirst ? "0px 2px 8px rgba(74,144,226,0.4)" : "none",
                      fontSize: isFirst ? "16px" : "14px",
                    }}
                  >
                    {u.avatar || "ðŸ‘¤"}
                  </div>
                  <p className="text-[10px] font-semibold text-[#2c3e50] text-center truncate w-full px-1 leading-tight">{u.name}</p>
                  <p className="text-[10px] font-bold" style={{ color: medalColors[rankIdx] }}>{u.days}d</p>
                  <div
                    className="w-full rounded-t-[8px] flex items-center justify-center"
                    style={{
                      height: podiumHeights[rankIdx],
                      background: isFirst
                        ? "linear-gradient(180deg, rgba(74,144,226,0.12) 0%, rgba(74,144,226,0.05) 100%)"
                        : "rgba(236,240,241,0.7)",
                      border: isFirst ? "1px solid rgba(74,144,226,0.18)" : "1px solid #E2E6E7",
                      borderBottom: "none",
                    }}
                  >
                    <span className="text-[13px] font-bold" style={{ color: medalColors[rankIdx] }}>
                      {medalLabels[rankIdx]}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Secondary ranks */}
          <div className="flex flex-col gap-2">
            {secondary.map((u, idx) => (
              <div
                key={u.name}
                className="flex items-center gap-3 rounded-[10px] px-3 py-2.5"
                style={{ background: "#f8fafc", border: "1px solid #E2E6E7" }}
              >
                <span className="text-[11px] font-bold text-[#4A90E2] w-6 text-center flex-shrink-0">#{idx + 4}</span>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #4A90E2, #A8D5BA)" }}
                >
                  {u.avatar || "ðŸ‘¤"}
                </div>
                <p className="text-[12px] font-semibold text-[#2c3e50] flex-1 truncate">{u.name}</p>
                <span className="text-[11px] font-bold text-[#F5A623] whitespace-nowrap">{u.days}d</span>
              </div>
            ))}
          </div>

          {/* Collapsible remaining */}
          {remaining.length > 0 && (
            <div className="mt-2">
              <AnimatePresence>
                {showAllRanks && remaining.map((u, idx) => (
                  <motion.div
                    key={u.name}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-3 rounded-[10px] px-3 py-2.5 mb-2"
                    style={{ background: "#f8fafc", border: "1px solid #E2E6E7" }}
                  >
                    <span className="text-[11px] font-bold text-[#4A90E2] w-6 text-center flex-shrink-0">#{idx + 6}</span>
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, #4A90E2, #A8D5BA)" }}
                    >
                      {u.avatar || "ðŸ‘¤"}
                    </div>
                    <p className="text-[12px] font-semibold text-[#2c3e50] flex-1 truncate">{u.name}</p>
                    <span className="text-[11px] font-bold text-[#F5A623] whitespace-nowrap">{u.days}d</span>
                  </motion.div>
                ))}
              </AnimatePresence>
              <button
                onClick={() => setShowAllRanks(prev => !prev)}
                className="w-full mt-1 py-2.5 rounded-[100px] text-[12px] font-semibold transition-all"
                style={{ background: "rgba(74,144,226,0.08)", border: "1px solid rgba(74,144,226,0.15)", color: "#4A90E2" }}
              >
                {showAllRanks ? "Show Less" : `Show ${remaining.length} More`}
              </button>
            </div>
          )}
        </motion.div>

        {/* Community Card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.13 }}
          className="bg-white rounded-[16px] p-4"
          style={{ border: "1px solid #E2E6E7", boxShadow: "0px 0px 12px 0px rgba(44,62,80,0.06)" }}
        >
          <h4 className="text-[14px] font-bold text-[#2c3e50] mb-3">Community</h4>
          <div
            className="flex items-start gap-3 rounded-[12px] p-3"
            style={{
              background: "linear-gradient(135deg, rgba(74,144,226,0.06) 0%, rgba(168,213,186,0.08) 100%)",
              border: "1px solid rgba(74,144,226,0.12)",
            }}
          >
            <span className="text-[20px] flex-shrink-0">ðŸ†</span>
            <div>
              <p className="text-[13px] font-semibold text-[#2c3e50] mb-0.5">{challenge.participants} participants active today</p>
              <p className="text-[11px] text-[#80646f] leading-relaxed">Share a win â€” small public commitments can lift completion by 30%.</p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
