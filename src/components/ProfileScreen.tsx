import { Settings, ChevronRight, X, Camera } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
// @ts-ignore
import bearImg from "figma:asset/a6e30b99b1b5110ddc2504b6f21c7a9407ff4343.png";

// ── Reusable Off/On segmented toggle ──
function OffOnToggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div
      className="flex items-center flex-shrink-0"
      style={{ background: "#ecf0f1", borderRadius: "6px", padding: "2px" }}
    >
      {([false, true] as const).map((opt) => (
        <button
          key={String(opt)}
          onClick={() => onChange(opt)}
          className="px-4 py-[5px] text-[13px] font-bold transition-all rounded-[4px]"
          style={{
            background: value === opt ? "#fff" : "transparent",
            color: "#2c3e50",
            boxShadow: value === opt ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
          }}
        >
          {opt ? "On" : "Off"}
        </button>
      ))}
    </div>
  );
}

interface ProfileScreenProps {
  onNavigateHome: () => void;
}

export default function ProfileScreen({ onNavigateHome }: ProfileScreenProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showAllAchievements, setShowAllAchievements] = useState(false);
  const [userName, setUserName] = useState("Oliver Smith");
  const [tempUserName, setTempUserName] = useState("Oliver Smith");

  // Settings state
  const [appearance, setAppearance] = useState<"Auto" | "Light" | "Dark">("Auto");
  const [textSize, setTextSize] = useState<"Small" | "Medium" | "Large">("Medium");
  const [aiMode, setAiMode] = useState(false);
  const [smartNudges, setSmartNudges] = useState(false);
  const [dailyCheckIn, setDailyCheckIn] = useState(true);

  const xpPercent = 62;

  const allAchievements = [
    { 
      name: "First Step", 
      icon: "🌱", 
      date: "Oct 20, 2025", 
      description: "Log your first mood entry",
      unlocked: true 
    },
    { 
      name: "Wellness Warrior", 
      icon: "⚔️", 
      date: "Oct 25, 2025", 
      description: "Complete 3 daily goals and 1 challenge in a day",
      unlocked: true 
    },
    { 
      name: "Mind Master", 
      icon: "🧠", 
      date: "Nov 5, 2025", 
      description: "Complete your first meditation course",
      unlocked: true 
    },
    { 
      name: "Streak Keeper", 
      icon: "🔥", 
      date: "", 
      description: "Maintain a 7-day mood logging streak",
      unlocked: false 
    },
    { 
      name: "Early Bird", 
      icon: "🌅", 
      date: "", 
      description: "Complete morning yoga 5 times",
      unlocked: false 
    },
    { 
      name: "Night Owl", 
      icon: "🌙", 
      date: "", 
      description: "Complete sleep meditation 7 times",
      unlocked: false 
    },
    { 
      name: "Challenge Champion", 
      icon: "🏆", 
      date: "", 
      description: "Complete 5 different challenges",
      unlocked: false 
    },
    { 
      name: "Social Butterfly", 
      icon: "🦋", 
      date: "", 
      description: "Join 3 group challenges",
      unlocked: false 
    },
    { 
      name: "Zen Master", 
      icon: "🧘", 
      date: "", 
      description: "Complete 50 meditation sessions",
      unlocked: false 
    },
    { 
      name: "Perfect Week", 
      icon: "✨", 
      date: "", 
      description: "Hit all daily goals for 7 consecutive days",
      unlocked: false 
    },
    { 
      name: "Step Counter", 
      icon: "👟", 
      date: "", 
      description: "Reach 10,000 steps in a single day",
      unlocked: false 
    },
    { 
      name: "Course Collector", 
      icon: "📚", 
      date: "", 
      description: "Enroll in 10 different courses",
      unlocked: false 
    },
  ];

  const recentAchievements = allAchievements.filter(a => a.unlocked).slice(0, 3);

  return (
    <div className="bg-[#f4f6f8] relative w-full h-full overflow-y-auto">
      {/* DI Spacer */}
      <div className="h-[30px] bg-[#f4f6f8]" />

      <div
        className="flex flex-col items-end w-full pb-32"
        style={{ padding: "40px 32px 0 32px", gap: "20px" }}
      >

        {/* ── Settings icon (top-right, no title) ── */}
        <button
          onClick={() => setShowSettings(true)}
          className="size-[40px] rounded-full bg-white flex items-center justify-center flex-shrink-0"
          style={{ boxShadow: "0px 0px 2px 0px #fff, 0px 0px 12px 0px rgba(44,62,80,0.12)" }}
        >
          <Settings size={20} className="text-[#2c3e50]" />
        </button>

        {/* ── Profile Card ── */}
        <div
          className="bg-white rounded-[20px] flex flex-col items-center px-6 pt-4 pb-6 w-full"
          style={{ border: "1px solid #E2E6E7", boxShadow: "0px 0px 2px 0px #fff, 0px 0px 12px 0px rgba(44,62,80,0.12)" }}
        >
          {/* Avatar with circle border */}
          <div className="w-[80px] h-[80px] rounded-full border-2 border-[#2c3e50] flex items-center justify-center mb-3 overflow-hidden bg-[#ecf0f1]">
            <svg viewBox="0 0 80 80" width="80" height="80" fill="none">
              {/* Simple avatar illustration */}
              <circle cx="40" cy="32" r="18" fill="#2c3e50" />
              <ellipse cx="40" cy="72" rx="26" ry="18" fill="#2c3e50" />
              {/* Hair */}
              <path d="M22 28 Q24 14 40 16 Q56 14 58 28" fill="#1a252f" />
              {/* Face highlight */}
              <circle cx="40" cy="32" r="14" fill="#f5d6b8" />
              {/* Eyes */}
              <circle cx="35" cy="31" r="2" fill="#2c3e50" />
              <circle cx="45" cy="31" r="2" fill="#2c3e50" />
              {/* Mouth */}
              <path d="M36 37 Q40 40 44 37" stroke="#2c3e50" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </svg>
          </div>

          {/* Name */}
          <p className="text-[20px] font-bold text-[#2c3e50] mb-[2px]">{userName}</p>
          {/* Level */}
          <p className="text-[14px] text-[#868686] mb-4">Level 3 • Explorer</p>

          {/* XP Progress Bar */}
          <div className="w-full h-[8px] rounded-full bg-[#e2e6e7] overflow-hidden">
            <div
              className="h-full rounded-full bg-[#4A90E2]"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
        </div>

        {/* ── Weekly Report Card ── */}
        <div
          className="bg-white rounded-[20px] px-6 py-5 w-full"
          style={{ border: "1px solid #E2E6E7", boxShadow: "0px 0px 2px 0px #fff, 0px 0px 12px 0px rgba(44,62,80,0.12)" }}
        >
          <p className="text-[16px] font-bold text-[#2c3e50] mb-[2px]">Weekly Report</p>
          <p className="text-[12px] text-[#868686] mb-4">Feb 15–21</p>

          <div className="flex items-stretch gap-0">
            {/* Focus Flow Streak */}
            <div className="flex-1 flex flex-col gap-[6px]">
              <p className="text-[13px] font-semibold text-[#2c3e50]">Focus Flow Streak</p>
              <p className="text-[14px] font-bold text-[#4A90E2]">5 Days 🔥</p>
              <div className="flex items-center gap-[6px]">
                {/* Up arrow */}
                <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                  <path d="M5.5 0L11 8H0L5.5 0Z" fill="#A8D5BA" />
                </svg>
                <span className="text-[12px] text-[#868686]">2 Days</span>
              </div>
            </div>

            {/* Divider */}
            <div className="w-[1px] bg-[#e2e6e7] mx-4 self-stretch" />

            {/* Check in */}
            <div className="flex-1 flex flex-col gap-[6px]">
              <p className="text-[13px] font-semibold text-[#2c3e50]">Check in</p>
              <p className="text-[14px] font-bold text-[#4A90E2]">12 times in last week</p>
              <div className="flex items-center gap-[6px]">
                <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                  <path d="M5.5 0L11 8H0L5.5 0Z" fill="#A8D5BA" />
                </svg>
                <span className="text-[12px] text-[#868686]">11 times</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Badges / Recent Achievements Card ── */}
        <div
          className="bg-white rounded-[20px] px-6 py-5 w-full"
          style={{ border: "1px solid #E2E6E7", boxShadow: "0px 0px 2px 0px #fff, 0px 0px 12px 0px rgba(44,62,80,0.12)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-[16px] font-bold text-[#2c3e50]">Badges</p>
            <button
              onClick={() => setShowAllAchievements(true)}
              className="flex items-center justify-center"
            >
              <ChevronRight size={20} className="text-[#868686]" />
            </button>
          </div>

          {/* Recent achievements — existing row design */}
          <div className="space-y-3">
            {recentAchievements.map((achievement) => (
              <div
                key={achievement.name}
                className="flex items-center gap-4 p-3 rounded-[12px] bg-[#f4f6f8]"
              >
                <div className="size-[48px] rounded-full bg-white border-2 border-[#A8D5BA] flex items-center justify-center text-2xl flex-shrink-0">
                  {achievement.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[#2c3e50] text-[14px]">
                    {achievement.name}
                  </p>
                  <p className="text-[12px] text-[#868686]">
                    {achievement.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Harmony Speech Bubble ── */}
        <div className="flex flex-col items-start gap-0 w-full">
          {/* Bubble */}
          <div
            className="relative px-5 py-4 rounded-[16px] max-w-[280px]"
            style={{ background: "#fff", border: "1px solid #E2E6E7", boxShadow: "0px 0px 2px 0px #fff, 0px 0px 12px 0px rgba(44,62,80,0.12)" }}
          >
            <p className="text-[13px] text-[#2c3e50] leading-snug">
              Good to see you! Ready to check in and start your wellness journey today? 🌟
            </p>
            {/* Tail pointing down-left toward bear */}
            <div
              className="absolute -bottom-[9px] left-[24px] w-0 h-0"
              style={{
                borderLeft: "9px solid transparent",
                borderRight: "0px solid transparent",
                borderTop: "9px solid #E2E6E7",
              }}
            />
            <div
              className="absolute -bottom-[7px] left-[25px] w-0 h-0"
              style={{
                borderLeft: "8px solid transparent",
                borderRight: "0px solid transparent",
                borderTop: "8px solid #fff",
              }}
            />
          </div>

          {/* Bear */}
          <div className="w-[64px] h-[64px] ml-2">
            <img src={bearImg} alt="Harmony" className="w-full h-full object-contain" />
          </div>
        </div>

      </div>


      {/* ─── Settings Full-Screen Page ─── */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 bg-white z-[60] overflow-y-auto"
          >
            {/* DI spacer */}
            <div className="h-[30px]" />

            {/* Back button */}
            <div className="px-8 pt-4 pb-2">
              <button
                onClick={() => setShowSettings(false)}
                className="flex items-center justify-center w-8 h-8"
              >
                <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
                  <path d="M9 1L1 9L9 17" stroke="#2c3e50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            <div
              className="flex flex-col items-center w-full pb-32"
              style={{ padding: "40px 32px 0 32px", gap: "20px" }}
            >

              {/* ── Preferences header ── */}
              <div className="flex items-center gap-3 w-full">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <circle cx="6" cy="6" r="2" stroke="#2c3e50" strokeWidth="2"/>
                  <path d="M6 2v2M6 8v14" stroke="#2c3e50" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="18" cy="18" r="2" stroke="#2c3e50" strokeWidth="2"/>
                  <path d="M18 2v14M18 20v2" stroke="#2c3e50" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="12" cy="12" r="2" stroke="#2c3e50" strokeWidth="2"/>
                  <path d="M12 2v8M12 14v8" stroke="#2c3e50" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <h2 className="text-[20px] font-bold text-[#2c3e50]">Preferences</h2>
              </div>

              {/* Appearance */}
              <div className="flex items-center justify-between w-full">
                <span className="text-[15px] text-[#2c3e50]">Appearance</span>
                <div className="flex items-center" style={{ background: "#ecf0f1", borderRadius: "6px", padding: "2px" }}>
                  {(["Auto", "Light", "Dark"] as const).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setAppearance(opt)}
                      className="px-4 py-[5px] text-[13px] font-bold transition-all rounded-[4px]"
                      style={{
                        background: appearance === opt ? "#fff" : "transparent",
                        color: "#2c3e50",
                        boxShadow: appearance === opt ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Size */}
              <div className="flex items-center justify-between w-full">
                <span className="text-[15px] text-[#2c3e50]">Text Size</span>
                <div className="flex items-center" style={{ background: "#ecf0f1", borderRadius: "6px", padding: "2px" }}>
                  {(["Small", "Medium", "Large"] as const).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setTextSize(opt)}
                      className="px-4 py-[5px] font-bold transition-all rounded-[4px]"
                      style={{
                        background: textSize === opt ? "#fff" : "transparent",
                        color: "#2c3e50",
                        fontSize: opt === "Small" ? "12px" : opt === "Medium" ? "14px" : "16px",
                        boxShadow: textSize === opt ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Language */}
              <div className="flex items-center justify-between w-full">
                <span className="text-[15px] text-[#2c3e50]">Language</span>
                <button className="flex items-center gap-1 text-[14px] text-[#2c3e50]">
                  English
                  <ChevronRight size={16} className="text-[#868686]" />
                </button>
              </div>

              {/* Divider */}
              <div className="h-[1px] bg-[#E2E6E7] w-full" />

              {/* ── AI & Privacy header ── */}
              <div className="flex items-center gap-3 w-full">
                <svg width="20" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L3 7v6c0 5.25 3.75 10.15 9 11.35C17.25 23.15 21 18.25 21 13V7L12 2z" fill="#2c3e50"/>
                  <circle cx="12" cy="13" r="2.5" fill="white"/>
                  <path d="M12 9v1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <h2 className="text-[20px] font-bold text-[#2c3e50]">AI & Privacy</h2>
              </div>

              {/* AI Mode */}
              <div className="flex items-start justify-between w-full">
                <div className="flex-1 pr-4">
                  <p className="text-[15px] font-semibold text-[#2c3e50]">AI Mode</p>
                  <p className="text-[12px] text-[#868686] mt-[2px] italic">
                    "Process data on-device for personalized insights"
                  </p>
                </div>
                <OffOnToggle value={aiMode} onChange={setAiMode} />
              </div>

              {/* Smart Nudges */}
              <div className="flex items-start justify-between w-full">
                <div className="flex-1 pr-4">
                  <p className="text-[15px] font-semibold text-[#2c3e50]">Smart Nudges</p>
                  <p className="text-[12px] text-[#868686] mt-[2px] italic">
                    "Only when stressed" (AI-driven)
                  </p>
                </div>
                <OffOnToggle value={smartNudges} onChange={setSmartNudges} />
              </div>

              {/* App Lock */}
              <div className="flex items-center justify-between w-full">
                <span className="text-[15px] text-[#2c3e50]">App Lock</span>
                <button className="flex items-center gap-1 text-[14px] text-[#2c3e50]">
                  Disabled
                  <ChevronRight size={16} className="text-[#868686]" />
                </button>
              </div>

              {/* Divider */}
              <div className="h-[1px] bg-[#E2E6E7] w-full" />

              {/* ── Notifications header ── */}
              <div className="flex items-center gap-3 w-full">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#2c3e50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#2c3e50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h2 className="text-[20px] font-bold text-[#2c3e50]">Notifications</h2>
              </div>

              {/* Daily Check-in */}
              <div className="flex items-center justify-between w-full">
                <span className="text-[15px] text-[#2c3e50]">Daily Check-in</span>
                <OffOnToggle value={dailyCheckIn} onChange={setDailyCheckIn} />
              </div>

              {/* Alert Time */}
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <span className="text-[15px] text-[#2c3e50]">Alert Time</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="#2c3e50" strokeWidth="2"/>
                    <path d="M12 7v5l3 3" stroke="#2c3e50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-[40px] h-[40px] rounded-[10px] flex items-center justify-center text-[16px] font-semibold text-[#2c3e50]"
                    style={{ border: "1px solid #E2E6E7" }}
                  >
                    21
                  </div>
                  <div
                    className="w-[40px] h-[40px] rounded-[10px] flex items-center justify-center text-[16px] font-semibold text-[#2c3e50]"
                    style={{ border: "1px solid #E2E6E7" }}
                  >
                    00
                  </div>
                </div>
              </div>

              {/* ── Harmony bear speech bubble ── */}
              <div className="flex flex-col items-start w-full mt-4">
                <div
                  className="rounded-[16px] px-4 py-3 max-w-[80%] relative"
                  style={{ background: "#fff", border: "1px solid #E2E6E7", boxShadow: "0px 0px 8px 0px rgba(44,62,80,0.08)" }}
                >
                  <p className="text-[13px] text-[#2c3e50] leading-[1.5]">
                    Good to see you! Ready to check in and start your wellness journey today? 🌟
                  </p>
                  <div
                    className="absolute -bottom-[9px] left-6 w-0 h-0"
                    style={{ borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: "9px solid #fff" }}
                  />
                  <div
                    className="absolute -bottom-[10px] left-[22px] w-0 h-0"
                    style={{ borderLeft: "10px solid transparent", borderRight: "10px solid transparent", borderTop: "10px solid #E2E6E7", zIndex: -1 }}
                  />
                </div>
                <div className="w-[64px] h-[64px] ml-2 mt-1">
                  <img src={bearImg} alt="Harmony" className="w-full h-full object-contain" />
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {showEditProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[60] flex items-end"
            onClick={() => setShowEditProfile(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full rounded-t-[24px] pb-8"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-[#e2e6e7] px-6 py-4 flex items-center justify-between">
                <h2 className="text-[24px] font-bold text-[#2c3e50]">Edit Profile</h2>
                <button
                  onClick={() => setShowEditProfile(false)}
                  className="size-10 rounded-full bg-[#E8F4FD] hover:bg-[#D0E7FA] flex items-center justify-center transition-all"
                >
                  <X className="text-[#4A90E2]" size={20} />
                </button>
              </div>

              {/* Edit Form */}
              <div className="px-6 pt-6 space-y-6">
                {/* Profile Picture */}
                <div className="flex flex-col items-center gap-3">
                  <div className="relative">
                    <div className="size-[100px] rounded-full bg-gradient-to-br from-[#4A90E2] to-[#A8D5BA] flex items-center justify-center text-white text-[40px] font-bold">
                      O
                    </div>
                    <button className="absolute bottom-0 right-0 size-10 rounded-full bg-[#4A90E2] border-4 border-white flex items-center justify-center hover:bg-[#3A80D2] transition-all shadow-lg">
                      <Camera className="text-white" size={20} />
                    </button>
                  </div>
                  <p className="text-[14px] text-[#868686]">Change profile picture</p>
                </div>

                {/* Name Input */}
                <div>
                  <label className="block text-[14px] font-semibold text-[#2c3e50] mb-2">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={tempUserName}
                    onChange={(e) => setTempUserName(e.target.value)}
                    className="w-full px-4 py-3 rounded-[12px] border border-[#e2e6e7] focus:border-[#4A90E2] focus:outline-none focus:ring-2 focus:ring-[#4A90E2]/20 transition-all"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Bio Input */}
                <div>
                  <label className="block text-[14px] font-semibold text-[#2c3e50] mb-2">
                    Bio
                  </label>
                  <textarea
                    className="w-full px-4 py-3 rounded-[12px] border border-[#e2e6e7] focus:border-[#4A90E2] focus:outline-none focus:ring-2 focus:ring-[#4A90E2]/20 transition-all resize-none"
                    placeholder="Tell us about yourself..."
                    rows={3}
                  />
                </div>

                {/* Save Button */}
                <button
                  onClick={() => {
                    setUserName(tempUserName);
                    setShowEditProfile(false);
                  }}
                  className="w-full bg-[#4A90E2] hover:bg-[#3A80D2] text-white font-bold py-4 rounded-[16px] transition-all"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* All Achievements Modal */}
      <AnimatePresence>
        {showAllAchievements && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[60] flex items-end"
            onClick={() => setShowAllAchievements(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full rounded-t-[24px] max-h-[85vh] overflow-y-auto pb-8"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-[#e2e6e7] px-6 py-4 flex items-center justify-between z-10">
                <div>
                  <h2 className="text-[24px] font-bold text-[#2c3e50]">All Achievements</h2>
                  <p className="text-[14px] text-[#868686]">{allAchievements.filter(a => a.unlocked).length} of {allAchievements.length} unlocked</p>
                </div>
                <button
                  onClick={() => setShowAllAchievements(false)}
                  className="size-10 rounded-full bg-[#E8F4FD] hover:bg-[#D0E7FA] flex items-center justify-center transition-all"
                >
                  <X className="text-[#4A90E2]" size={20} />
                </button>
              </div>

              {/* Achievements Grid */}
              <div className="px-6 pt-4 space-y-3">
                {allAchievements.map((achievement) => (
                  <div
                    key={achievement.name}
                    className={`p-4 rounded-[16px] border-2 transition-all ${
                      achievement.unlocked
                        ? "bg-white border-[#A8D5BA] shadow-sm"
                        : "bg-[#fcfcfc] border-[#e2e6e7] opacity-60"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`size-[56px] rounded-full flex items-center justify-center text-3xl border-2 ${
                        achievement.unlocked 
                          ? "bg-white border-[#A8D5BA] shadow-md" 
                          : "bg-[#f5f5f5] border-[#e2e6e7]"
                      }`}>
                        {achievement.unlocked ? achievement.icon : "🔒"}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="font-bold text-[16px] text-[#2c3e50]">
                            {achievement.name}
                          </h4>
                          {achievement.unlocked && (
                            <span className="text-[12px] text-[#A8D5BA] font-semibold">
                              ✓ Unlocked
                            </span>
                          )}
                        </div>
                        <p className="text-[13px] text-[#868686] mb-2">
                          {achievement.description}
                        </p>
                        {achievement.unlocked && achievement.date && (
                          <p className="text-[12px] text-[#4A90E2]">
                            {achievement.date}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
