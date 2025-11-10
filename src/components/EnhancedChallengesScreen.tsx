import { useState, useEffect, useRef } from "react";
import { Flame, Clock, Search, ArrowLeft, CheckCircle2, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function EnhancedChallengesScreen() {
  const [activeTab, setActiveTab] = useState<"my" | "discover">("my");
  const [activeCardId, setActiveCardId] = useState<number | null>(null);
  const [selectedChallenge, setSelectedChallenge] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const challenges = [
    {
      id: 1,
      title: "7-Day Mindfulness",
      description: "Practice mindfulness meditation daily",
      category: "Mental",
      duration: "7 Days",
      difficulty: "Easy",
      participants: 342,
      progress: 57,
      currentDay: 4,
      totalDays: 7,
      joined: true,
      dailyTasks: ["Morning meditation", "Breathing exercises", "Evening reflection", "Gratitude journal"],
    },
    {
      id: 2,
      title: "Morning Energy Boost",
      description: "Start each day with a 10-min workout",
      category: "Physical",
      duration: "14 Days",
      difficulty: "Medium",
      participants: 218,
      progress: 35,
      currentDay: 5,
      totalDays: 14,
      joined: true,
      dailyTasks: ["Warm-up stretches", "Core exercises", "Cardio burst", "Cool down"],
    },
    {
      id: 3,
      title: "30-Day Wellness",
      description: "Complete wellness journey",
      category: "Mental",
      duration: "30 Days",
      difficulty: "Hard",
      participants: 567,
      progress: 0,
      currentDay: 0,
      totalDays: 30,
      joined: false,
      dailyTasks: ["Morning routine", "Healthy meal", "Exercise", "Meditation", "Sleep tracking"],
    },
  ];

  const myChallenges = challenges.filter(c => c.joined);
  const activeChallenges = myChallenges.filter(c => c.progress < 100).length;
  const completedChallenges = myChallenges.filter(c => c.progress === 100).length;

  // Handle card tap
  const handleCardTap = (challengeId: number) => {
    if (activeCardId === challengeId) {
      return;
    }

    // Vibration feedback
    if (window.navigator.vibrate) {
      window.navigator.vibrate(10);
    }

    // Clear existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Set active card
    setActiveCardId(challengeId);

    // Set timer to fade out button after 3 seconds
    timerRef.current = setTimeout(() => {
      setActiveCardId(null);
    }, 3000);
  };

  // Handle button tap
  const handleButtonTap = (e: React.MouseEvent, challengeId: number) => {
    e.stopPropagation();
    
    // Vibration feedback
    if (window.navigator.vibrate) {
      window.navigator.vibrate(20);
    }

    // Navigate to challenge detail screen
    setSelectedChallenge(challengeId);
    
    // Clear timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Challenge Detail Screen
  if (selectedChallenge !== null) {
    const challenge = challenges.find(c => c.id === selectedChallenge);
    if (!challenge) return null;

    return (
      <div className="bg-[#fcfcfc] relative size-full overflow-hidden">
        {/* CRITICAL: Extra Top Spacing for Dynamic Island */}
        <div className="h-[80px] bg-[#fcfcfc]" />
        
        <div className="size-full overflow-y-auto pb-8">
          {/* Header */}
          <div className="sticky top-[80px] z-40 bg-[#fcfcfc]/95 backdrop-blur-sm border-b border-[#e2e6e7]/30 px-5 py-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedChallenge(null)}
                className="w-9 h-9 rounded-full bg-white border border-[#e2e6e7] shadow-sm flex items-center justify-center hover:bg-[#E8F4FD] transition-all"
              >
                <ArrowLeft className="w-5 h-5 text-[#2c3e50]" />
              </button>
              <h1 className="font-bold text-[18px] text-[#2c3e50]">{challenge.title}</h1>
            </div>
          </div>

          {/* Challenge Content */}
          <div className="px-5 pt-6">
            {/* Progress Overview */}
            <div className="bg-gradient-to-br from-[#E8F4FD] to-white rounded-[16px] p-6 border border-[#4A90E2]/20 shadow-sm mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[14px] text-[#868686] mb-1">Challenge Progress</p>
                  <p className="text-[24px] font-bold text-[#4A90E2]">
                    Day {challenge.currentDay} / {challenge.totalDays}
                  </p>
                </div>
                <div className="relative size-20">
                  <svg className="block size-full -rotate-90" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r="36" fill="none" stroke="#ECF0F1" strokeWidth="8" />
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      fill="none"
                      stroke="#4A90E2"
                      strokeWidth="8"
                      strokeDasharray={`${(challenge.progress / 100) * 226} 226`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[16px] font-bold text-[#4A90E2]">{challenge.progress}%</span>
                  </div>
                </div>
              </div>
              <div className="w-full h-3 bg-white rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#4A90E2] to-[#A8D5BA] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${challenge.progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Today's Tasks */}
            <div className="bg-white rounded-[16px] border border-[#e2e6e7] p-5 shadow-sm mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[16px] font-bold text-[#2c3e50]">Today's Tasks</h3>
                <Calendar className="w-5 h-5 text-[#4A90E2]" />
              </div>
              <div className="space-y-3">
                {challenge.dailyTasks.map((task, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-[#E8F4FD] rounded-[12px] hover:bg-[#d8e9fa] transition-all cursor-pointer"
                  >
                    <div className="w-5 h-5 rounded-full border-2 border-[#4A90E2] flex-shrink-0" />
                    <p className="text-[14px] text-[#2c3e50] flex-1">{task}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Challenge Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-[16px] border border-[#e2e6e7] p-4 shadow-sm text-center">
                <Flame className="w-8 h-8 text-[#F5A623] mx-auto mb-2" />
                <p className="text-[24px] font-bold text-[#2c3e50]">{challenge.currentDay}</p>
                <p className="text-[12px] text-[#868686]">Current Streak</p>
              </div>
              <div className="bg-white rounded-[16px] border border-[#e2e6e7] p-4 shadow-sm text-center">
                <CheckCircle2 className="w-8 h-8 text-[#A8D5BA] mx-auto mb-2" />
                <p className="text-[24px] font-bold text-[#2c3e50]">{Math.floor(challenge.progress / (100 / challenge.totalDays))}</p>
                <p className="text-[12px] text-[#868686]">Days Completed</p>
              </div>
            </div>

            {/* Community */}
            <div className="bg-white rounded-[16px] border border-[#e2e6e7] p-5 shadow-sm mb-6">
              <h3 className="text-[16px] font-bold text-[#2c3e50] mb-3">Community</h3>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4A90E2] to-[#A8D5BA] border-2 border-white" />
                  ))}
                </div>
                <p className="text-[14px] text-[#868686]">
                  {challenge.participants} participants
                </p>
              </div>
            </div>

            {/* Check-In Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-[#4A90E2] to-[#5BA0F2] text-white py-4 rounded-[16px] font-bold text-[16px] shadow-lg flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              {challenge.joined ? "Complete Today's Tasks" : "Join Challenge"}
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  // Main Challenges List View
  return (
    <div className="bg-[#fcfcfc] relative size-full overflow-hidden">
      {/* CRITICAL: Extra Top Spacing for Dynamic Island */}
      <div className="h-[80px] bg-[#fcfcfc]" />
      
      <div className="size-full overflow-y-auto pb-24">
        {/* Sticky Tab Navigation */}
        <div className="sticky top-[80px] z-40 bg-[#fcfcfc]/95 backdrop-blur-sm px-5 py-3 border-b border-[#e2e6e7]/30">
          <div className="bg-[#ecf0f1] flex items-center pl-[2px] pr-[10px] py-[2px] rounded-[100px] w-full max-w-md mx-auto">
            <button
              onClick={() => setActiveTab("my")}
              className={`flex-1 h-[54.476px] flex items-center justify-center gap-3 px-7 py-[3px] rounded-[100px] font-bold text-[16px] transition-all ${
                activeTab === "my"
                  ? "bg-white text-[#2c3e50] shadow-sm"
                  : "text-[#2c3e50]"
              }`}
            >
              {activeTab === "my" && (
                <div className="relative size-5 flex-shrink-0">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 25">
                    <path d="M0.5 3.5C0.500013 2.9734 0.638639 2.45609 0.901943 2.00004C1.16525 1.544 1.54395 1.1653 2 0.902V21.5C2 21.8978 2.15804 22.2794 2.43934 22.5607C2.72064 22.842 3.10218 23 3.5 23H15.5C15.8978 23 16.2794 22.842 16.5607 22.5607C16.842 22.2794 17 21.8978 17 21.5V3.5C17 3.10218 16.842 2.72064 16.5607 2.43934C16.2794 2.15804 15.8978 2 15.5 2H12.5V0.5H15.5C16.2956 0.5 17.0587 0.81607 17.6213 1.37868C18.1839 1.94129 18.5 2.70435 18.5 3.5V21.5C18.5 22.2956 18.1839 23.0587 17.6213 23.6213C17.0587 24.1839 16.2956 24.5 15.5 24.5H3.5C2.70435 24.5 1.94129 24.1839 1.37868 23.6213C0.81607 23.0587 0.5 22.2956 0.5 21.5V3.5ZM3.5 0.5V10.25C3.5 10.3893 3.53879 10.5258 3.61201 10.6443C3.68524 10.7628 3.79001 10.8585 3.91459 10.9208C4.03917 10.9831 4.17863 11.0095 4.31735 10.997C4.45608 10.9845 4.58857 10.9336 4.7 10.85L7.25 8.9375L9.8 10.85C9.91143 10.9336 10.0439 10.9845 10.1826 10.997C10.3214 11.0095 10.4608 10.9831 10.5854 10.9208C10.71 10.8585 10.8148 10.7628 10.888 10.6443C10.9612 10.5258 11 10.3893 11 10.25V0.5H3.5ZM5 8.75V2H9.5V8.75L7.7 7.4C7.57018 7.30263 7.41228 7.25 7.25 7.25C7.08772 7.25 6.92982 7.30263 6.8 7.4L5 8.75Z" fill="#2C3E50" stroke="#2C3E50" />
                  </svg>
                </div>
              )}
              <span className="whitespace-nowrap">My Challenges</span>
            </button>
            <button
              onClick={() => setActiveTab("discover")}
              className={`flex-1 h-[54.476px] flex items-center justify-center gap-3 px-7 py-[3px] rounded-[100px] font-bold text-[16px] transition-all ${
                activeTab === "discover"
                  ? "bg-white text-[#2c3e50] shadow-sm"
                  : "text-[#2c3e50]"
              }`}
            >
              <span className="whitespace-nowrap">Discover</span>
              {activeTab === "discover" && <Search className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="px-5 sm:px-8 pt-5">
          {/* Challenge Stats */}
          {activeTab === "my" && (
            <div className="flex gap-5 mb-7 flex-wrap justify-center">
              <div className="flex-1 min-w-[150px] max-w-[170px] bg-white border border-[#e2e6e7] rounded-[12px] p-3 flex items-center gap-3">
                <Flame className="w-7 h-7 text-[#F5A623] flex-shrink-0" />
                <div className="font-bold text-[16px] text-[#2c3e50]">{activeChallenges}</div>
                <div className="font-medium text-[12px] text-[#2c3e50]">Active</div>
              </div>

              <div className="flex-1 min-w-[150px] max-w-[170px] bg-white border border-[#e2e6e7] rounded-[12px] p-3 flex items-center gap-3">
                <div className="size-7 flex-shrink-0 bg-[#A8D5BA] rounded-full flex items-center justify-center">
                  <svg className="size-4" fill="none" viewBox="0 0 12 9">
                    <path d="M1 4.7333L4.18164 8L11 1" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
                <div className="font-bold text-[16px] text-[#2c3e50]">{completedChallenges}</div>
                <div className="font-medium text-[12px] text-[#2c3e50]">Done</div>
              </div>
            </div>
          )}

          {/* Challenge List */}
          <div className="flex flex-col gap-5 pb-8">
            {(activeTab === "my" ? myChallenges : challenges).map((challenge) => (
              <motion.div
                key={challenge.id}
                onClick={() => handleCardTap(challenge.id)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`bg-white rounded-[16px] border border-[#e2e6e7] p-4 cursor-pointer transition-all ${
                  activeCardId === challenge.id
                    ? "shadow-[2px_8px_24px_0px_rgba(74,144,226,0.25)]"
                    : "shadow-sm hover:shadow-md"
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  {/* Challenge Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h3 className="font-bold text-[16px] text-[#2c3e50]">{challenge.title}</h3>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-[4px] text-[11px] font-semibold ${
                        challenge.difficulty === "Easy" ? "bg-[#A8D5BA]/20 text-[#A8D5BA]" :
                        challenge.difficulty === "Medium" ? "bg-[#F5A623]/20 text-[#F5A623]" :
                        "bg-[#F5A623]/30 text-[#F5A623]"
                      }`}>
                        {challenge.difficulty}
                      </span>
                    </div>
                    <p className="text-[13px] text-[#868686] mb-3">{challenge.description}</p>

                    <div className="flex items-center gap-3 flex-wrap text-[12px] text-[#868686]">
                      <div className="flex items-center gap-1">
                        <div className="px-2 py-0.5 rounded-[4px] bg-[rgba(168,213,186,0.2)]">
                          <span className="text-[12px] font-semibold text-[#a8d5ba]">{challenge.category}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{challenge.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <span>{challenge.participants} joined</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Badge */}
                  {challenge.joined && (
                    <div className="flex-shrink-0">
                      <div className="relative size-16">
                        <svg className="block size-full -rotate-90" viewBox="0 0 64 64">
                          <circle cx="32" cy="32" r="28" fill="none" stroke="#ECF0F1" strokeWidth="6" />
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            fill="none"
                            stroke="#4A90E2"
                            strokeWidth="6"
                            strokeDasharray={`${(challenge.progress / 100) * 176} 176`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-[14px] font-bold text-[#4a90e2]">{challenge.currentDay}</span>
                          <span className="text-[10px] font-light text-[#4a90e2]">/{challenge.totalDays}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Progress Bar */}
                {challenge.joined && (
                  <div className="mb-4">
                    <div className="w-full h-2.5 bg-[#E8F4FD] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#4A90E2] to-[#A8D5BA] rounded-full transition-all"
                        style={{ width: `${challenge.progress}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-[#4A90E2] mt-1 text-right">{challenge.progress}% complete</p>
                  </div>
                )}

                {/* Tap-to-Reveal Button */}
                <AnimatePresence>
                  {activeCardId === challenge.id && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      onClick={(e) => handleButtonTap(e, challenge.id)}
                      className="w-full bg-[#4a90e2] text-white py-3 rounded-[8px] font-bold text-[14px] hover:bg-[#3A80D2] active:translate-y-[2px] active:shadow-[0px_2px_0px_0px_#477baf] transition-all flex items-center justify-center shadow-[0px_4px_0px_0px_#477baf]"
                    >
                      {challenge.joined ? "Continue Challenge" : "Join Challenge"}
                    </motion.button>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
