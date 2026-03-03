import { User, Settings, Award, TrendingUp, Calendar, Edit2, Bell, Lock, Palette, LogOut, ChevronRight, X, Camera } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

interface ProfileScreenProps {
  onNavigateHome: () => void;
}

export default function ProfileScreen({ onNavigateHome }: ProfileScreenProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showAllAchievements, setShowAllAchievements] = useState(false);
  const [userName, setUserName] = useState("Oliver Smith");
  const [tempUserName, setTempUserName] = useState("Oliver Smith");

  const stats = [
    { label: "Active Days", value: "23", icon: Calendar, color: "#4A90E2" },
    { label: "Challenges", value: "5", icon: Award, color: "#F5A623" },
    { label: "Courses", value: "8", icon: TrendingUp, color: "#A8D5BA" },
  ];

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
    <div className="bg-[#fcfcfc] relative w-full h-full">
      {/* CRITICAL: Extra Top Spacing for Dynamic Island */}
      <div className="h-[30px] bg-[#fcfcfc]" />
      
      <div className="pt-[20px] px-[32px] pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-[28px] font-bold text-[#2c3e50]">Profile</h1>
          <button 
            onClick={() => setShowSettings(true)}
            className="size-[40px] rounded-full bg-white border border-[#e2e6e7] flex items-center justify-center hover:bg-[#E8F4FD] transition-all"
          >
            <Settings className="text-[#4A90E2]" size={20} />
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white border border-[#e2e6e7] rounded-[24px] p-6 mb-6 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <div className="size-[80px] rounded-full bg-gradient-to-br from-[#4A90E2] to-[#A8D5BA] flex items-center justify-center text-white text-[32px] font-bold">
                O
              </div>
              <button 
                onClick={() => setShowEditProfile(true)}
                className="absolute -bottom-1 -right-1 size-8 rounded-full bg-[#4A90E2] border-2 border-white flex items-center justify-center hover:bg-[#3A80D2] transition-all shadow-md"
              >
                <Camera className="text-white" size={16} />
              </button>
            </div>
            <div className="flex-1">
              <h2 className="text-[24px] font-bold text-[#2c3e50] mb-1">
                {userName}
              </h2>
              <p className="text-[14px] text-[#868686]">Level 2 · 2558 pts</p>
            </div>
            <button
              onClick={() => setShowEditProfile(true)}
              className="p-2 rounded-full bg-[#E8F4FD] hover:bg-[#D0E7FA] transition-all"
            >
              <Edit2 className="text-[#4A90E2]" size={18} />
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="flex flex-col items-center gap-2 p-4 rounded-[16px] bg-[#fcfcfc]"
                >
                  <Icon size={24} style={{ color: stat.color }} />
                  <p className="text-[20px] font-bold text-[#2c3e50]">
                    {stat.value}
                  </p>
                  <p className="text-[12px] text-[#868686] text-center">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white border border-[#e2e6e7] rounded-[24px] p-6 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[20px] font-bold text-[#2c3e50]">
              Recent Achievements
            </h3>
            <button
              onClick={() => setShowAllAchievements(true)}
              className="text-[14px] text-[#4A90E2] font-semibold hover:underline"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {recentAchievements.map((achievement) => (
              <div
                key={achievement.name}
                className="flex items-center gap-4 p-3 rounded-[12px] bg-[#fcfcfc]"
              >
                <div className="size-[48px] rounded-full bg-white border-2 border-[#A8D5BA] flex items-center justify-center text-2xl">
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-[#2c3e50]">
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

        {/* Wellness Metrics */}
        <div className="bg-white border border-[#e2e6e7] rounded-[24px] p-6 shadow-sm">
          <h3 className="text-[20px] font-bold text-[#2c3e50] mb-4">
            Weekly Summary
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-[14px] text-[#2c3e50]">
                  Meditation Time
                </span>
                <span className="text-[14px] font-semibold text-[#4A90E2]">
                  95 min
                </span>
              </div>
              <div className="w-full h-3 bg-[#E8F4FD] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#4A90E2] rounded-full"
                  style={{ width: "75%" }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-[14px] text-[#2c3e50]">
                  Steps Goal
                </span>
                <span className="text-[14px] font-semibold text-[#A8D5BA]">
                  45,628
                </span>
              </div>
              <div className="w-full h-3 bg-[#E8F4FD] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#A8D5BA] rounded-full"
                  style={{ width: "82%" }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-[14px] text-[#2c3e50]">
                  Sleep Quality
                </span>
                <span className="text-[14px] font-semibold text-[#F5A623]">
                  78%
                </span>
              </div>
              <div className="w-full h-3 bg-[#E8F4FD] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#F5A623] rounded-full"
                  style={{ width: "78%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[60] flex items-end"
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full rounded-t-[24px] max-h-[80vh] overflow-y-auto pb-8"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-[#e2e6e7] px-6 py-4 flex items-center justify-between">
                <h2 className="text-[24px] font-bold text-[#2c3e50]">Settings</h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="size-10 rounded-full bg-[#E8F4FD] hover:bg-[#D0E7FA] flex items-center justify-center transition-all"
                >
                  <X className="text-[#4A90E2]" size={20} />
                </button>
              </div>

              {/* Settings Options */}
              <div className="px-6 pt-4 space-y-2">
                <button className="w-full flex items-center justify-between p-4 rounded-[16px] bg-white border border-[#e2e6e7] hover:bg-[#E8F4FD] transition-all">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-[#E8F4FD] flex items-center justify-center">
                      <Bell className="text-[#4A90E2]" size={20} />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-[#2c3e50]">Notifications</p>
                      <p className="text-[12px] text-[#868686]">Manage your alerts</p>
                    </div>
                  </div>
                  <ChevronRight className="text-[#868686]" size={20} />
                </button>

                <button className="w-full flex items-center justify-between p-4 rounded-[16px] bg-white border border-[#e2e6e7] hover:bg-[#E8F4FD] transition-all">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-[#E8F4FD] flex items-center justify-center">
                      <Lock className="text-[#4A90E2]" size={20} />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-[#2c3e50]">Privacy & Security</p>
                      <p className="text-[12px] text-[#868686]">Control your data</p>
                    </div>
                  </div>
                  <ChevronRight className="text-[#868686]" size={20} />
                </button>

                <button className="w-full flex items-center justify-between p-4 rounded-[16px] bg-white border border-[#e2e6e7] hover:bg-[#E8F4FD] transition-all">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-[#E8F4FD] flex items-center justify-center">
                      <Palette className="text-[#4A90E2]" size={20} />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-[#2c3e50]">Appearance</p>
                      <p className="text-[12px] text-[#868686]">Theme and display</p>
                    </div>
                  </div>
                  <ChevronRight className="text-[#868686]" size={20} />
                </button>

                <button className="w-full flex items-center justify-between p-4 rounded-[16px] bg-white border border-[#e2e6e7] hover:bg-[#E8F4FD] transition-all">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-[#E8F4FD] flex items-center justify-center">
                      <User className="text-[#4A90E2]" size={20} />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-[#2c3e50]">Account</p>
                      <p className="text-[12px] text-[#868686]">Email, password, etc.</p>
                    </div>
                  </div>
                  <ChevronRight className="text-[#868686]" size={20} />
                </button>

                <div className="pt-4">
                  <button className="w-full flex items-center justify-center gap-3 p-4 rounded-[16px] bg-red-50 border border-red-200 hover:bg-red-100 transition-all">
                    <LogOut className="text-red-500" size={20} />
                    <p className="font-semibold text-red-500">Log Out</p>
                  </button>
                </div>
              </div>
            </motion.div>
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
