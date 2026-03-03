import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface EnhancedChallengesScreenProps {
  onNavigateHome: () => void;
}

export default function EnhancedChallengesScreen({ onNavigateHome }: EnhancedChallengesScreenProps) {
  const [activeTab, setActiveTab] = useState<"my" | "discover">("my");
  const [activeCardId, setActiveCardId] = useState<number | null>(null);
  const [selectedChallenge, setSelectedChallenge] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const challenges = [
    {
      id: 1,
      title: "Mindfulness Streak",
      category: "Mental",
      icon: "🧘",
      description: "Complete 10 minutes of meditation daily for 30 days",
      timeLeft: "03d 03h",
      timeLeftMs: 3 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000,
      joined: true,
  points: 100,
      startDate: new Date("2024-11-01"),
      participants: 120,
      topUsers: [
        { name: "You", days: 20, avatar: "👤" },
        { name: "Sarah M.", days: 19, avatar: "👤" },
        { name: "John D.", days: 18, avatar: "👤" }
      ]
    },
    {
      id: 2,
      title: "7-Day Sleep Challenge",
      category: "Physical",
      icon: "😴",
      description: "Get 8 hours of quality sleep every night for a week",
      timeLeft: "05d 12h",
      timeLeftMs: 5 * 24 * 60 * 60 * 1000 + 12 * 60 * 60 * 1000,
      joined: true,
  points: 150,
      startDate: new Date("2024-11-08"),
      participants: 95,
      topUsers: [
        { name: "Emma W.", days: 15, avatar: "👤" },
        { name: "You", days: 14, avatar: "👤" },
        { name: "Alex K.", days: 13, avatar: "👤" }
      ]
    },
    {
      id: 3,
      title: "Morning Workout",
      category: "Physical",
      icon: "💪",
      description: "Exercise for 30 minutes every morning for 21 days",
      timeLeft: "01d 08h",
      timeLeftMs: 1 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000,
      joined: true,
      points: 180,
      startDate: new Date("2024-11-10"),
      participants: 64,
      topUsers: [
        { name: "Mike T.", days: 12, avatar: "👤" },
        { name: "You", days: 10, avatar: "👤" },
        { name: "Lisa R.", days: 9, avatar: "👤" }
      ]
    }
  ];

  const discoverChallenges: Challenge[] = [
    {
      id: 4,
      title: "Hydration Hero",
      category: "Physical",
      icon: "💧",
      description: "Drink 8 glasses of water daily for 14 days",
      timeLeft: "10d 00h",
      timeLeftMs: 10 * 24 * 60 * 60 * 1000,
      joined: false,
      points: 200,
      startDate: new Date("2024-11-15"),
      participants: 210,
      topUsers: [
        { name: "Mike T.", days: 25, avatar: "👤" },
        { name: "Lisa R.", days: 22, avatar: "👤" },
        { name: "Tom H.", days: 20, avatar: "👤" }
      ]
    },
    {
      id: 5,
      title: "Gratitude Journal",
      category: "Mental",
      icon: "📝",
      description: "Write 3 things you're grateful for every day",
      timeLeft: "07d 06h",
      timeLeftMs: 7 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000 + 30 * 60 * 1000,
      joined: false,
      points: 120,
      startDate: new Date("2024-11-12"),
      participants: 188,
      topUsers: [
        { name: "Nina P.", days: 18, avatar: "👤" },
        { name: "Chris B.", days: 17, avatar: "👤" },
        { name: "Amy L.", days: 16, avatar: "👤" }
      ]
    },
    {
      id: 6,
      title: "Reading Challenge",
      category: "Mental",
      icon: "📚",
      description: "Read for 30 minutes every day for 21 days",
      timeLeft: "15d 10h",
      timeLeftMs: 15 * 24 * 60 * 60 * 1000 + 10 * 60 * 60 * 1000,
      joined: false,
      points: 180,
      startDate: new Date("2024-11-20"),
      participants: 156,
      topUsers: [
        { name: "Emily R.", days: 30, avatar: "👤" },
        { name: "David K.", days: 28, avatar: "👤" },
        { name: "Sophie L.", days: 26, avatar: "👤" }
      ]
    },
    {
      id: 7,
      title: "Step Master",
      category: "Physical",
      icon: "👟",
      description: "Walk 10,000 steps daily for 30 days",
      timeLeft: "12d 18h",
      timeLeftMs: 12 * 24 * 60 * 60 * 1000 + 18 * 60 * 60 * 1000,
      joined: false,
      points: 250,
      startDate: new Date("2024-11-18"),
      participants: 342,
      topUsers: [
        { name: "Mark W.", days: 45, avatar: "👤" },
        { name: "Rachel T.", days: 42, avatar: "👤" },
        { name: "Ben S.", days: 40, avatar: "👤" }
      ]
    },
    {
      id: 8,
      title: "Yoga Flow",
      category: "Physical",
      icon: "🧘‍♀️",
      description: "Complete 20 minutes of yoga every morning",
      timeLeft: "08d 14h",
      timeLeftMs: 8 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000,
      joined: false,
      points: 160,
      startDate: new Date("2024-11-14"),
      participants: 198,
      topUsers: [
        { name: "Olivia M.", days: 21, avatar: "👤" },
        { name: "James P.", days: 20, avatar: "👤" },
        { name: "Sophia H.", days: 19, avatar: "👤" }
      ]
    },
    {
      id: 9,
      title: "Digital Detox",
      category: "Mental",
      icon: "📵",
      description: "Limit screen time to 2 hours per day for 14 days",
      timeLeft: "06d 22h",
      timeLeftMs: 6 * 24 * 60 * 60 * 1000 + 22 * 60 * 60 * 1000,
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

  // Direct navigation on card tap; no reveal button

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSortDropdown(false);
      }
    };

    if (showSortDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSortDropdown]);



  return (
    <div className="bg-[#fcfcfc] relative w-full h-full">
      {/* CRITICAL: Extra Top Spacing for Dynamic Island */}
      <div className="h-[30px] bg-[#fcfcfc]" />
      
      {/* Logo and Company Name Header */}
      <div className="sticky top-0 z-50 bg-[#fcfcfc] px-6 pt-6 pb-4">
        <motion.button
          onClick={onNavigateHome}
          className="flex items-center gap-4 group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Logo - Clickable */}
          <div className="flex-shrink-0">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4A90E2] to-[#A8D5BA] flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <span className="text-2xl">🧠</span>
            </div>
          </div>

          {/* App Name - Clickable */}
          <h1
            className="text-[24px] font-bold text-[#2c3e50] group-hover:text-[#4A90E2] transition-colors"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            NeuroFlow
          </h1>
        </motion.button>
      </div>
      
      <div className="w-full h-full pb-24">
        {/* Sticky Tab Navigation */}
        <div className="sticky top-[110px] z-40 bg-[#fcfcfc]/95 backdrop-blur-sm px-5 py-3 border-b border-[#e2e6e7]/30">
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
                <motion.div
                  layoutId="activeChallengeTab"
                  className="absolute inset-0 bg-white rounded-[100px] shadow-sm"
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                  }}
                />
              )}
              {activeTab === "my" && (
                <div className="relative size-5 flex-shrink-0 z-10">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 25">
                    <path d="M0.5 3.5C0.500013 2.9734 0.638639 2.45609 0.901943 2.00004C1.16525 1.544 1.54395 1.1653 2 0.902V21.5C2 21.8978 2.15804 22.2794 2.43934 22.5607C2.72064 22.842 3.10218 23 3.5 23H15.5C15.8978 23 16.2794 22.842 16.5607 22.5607C16.842 22.2794 17 21.8978 17 21.5V3.5C17 3.10218 16.842 2.72064 16.5607 2.43934C16.2794 2.15804 15.8978 2 15.5 2H12.5V0.5H15.5C16.2956 0.5 17.0587 0.81607 17.6213 1.37868C18.1839 1.94129 18.5 2.70435 18.5 3.5V21.5C18.5 22.2956 18.1839 23.0587 17.6213 23.6213C17.0587 24.1839 16.2956 24.5 15.5 24.5H3.5C2.70435 24.5 1.94129 24.1839 1.37868 23.6213C0.81607 23.0587 0.5 22.2956 0.5 21.5V3.5ZM3.5 0.5V10.25C3.5 10.3893 3.53879 10.5258 3.61201 10.6443C3.68524 10.7628 3.79001 10.8585 3.91459 10.9208C4.03917 10.9831 4.17863 11.0095 4.31735 10.997C4.45608 10.9845 4.58857 10.9336 4.7 10.85L7.25 8.9375L9.8 10.85C9.91143 10.9336 10.0439 10.9845 10.1826 10.997C10.3214 11.0095 10.4608 10.9831 10.5854 10.9208C10.71 10.8585 10.8148 10.7628 10.888 10.6443C10.9612 10.5258 11 10.3893 11 10.25V0.5H3.5ZM5 8.75V2H9.5V8.75L7.7 7.4C7.57018 7.30263 7.41228 7.25 7.25 7.25C7.08772 7.25 6.92982 7.30263 6.8 7.4L5 8.75Z" fill="#2C3E50" stroke="#2C3E50" />
                  </svg>
                </div>
              )}
              <span className="relative z-10 whitespace-nowrap">My Challenges</span>
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
        {/* Active + Sort (only for My Challenges) */}
        {activeTab === "my" && (
          <div className="px-5 pb-4">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-[24px] bg-white border border-[#e2e6e7] shadow-sm">
                <div className="size-[20px] flex items-center justify-center rounded-full bg-[#2c3e50]">
                  <svg className="size-[10px]" fill="none" viewBox="0 0 12 9">
                    <path d="M1 4.7333L4.18164 8L11 1" stroke="#FCFCFC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
                <span className="text-[14px] font-bold text-[#2c3e50]">Active: {activeCount}</span>
              </div>

              <div className="flex-1 min-w-[150px] max-w-[170px] bg-white border border-[#e2e6e7] rounded-[12px] p-3 flex items-center gap-3">
                <div className="size-7 flex-shrink-0 bg-[#A8D5BA] rounded-full flex items-center justify-center">
                  <svg className="size-4" fill="none" viewBox="0 0 12 9">
                    <path d="M1 4.7333L4.18164 8L11 1" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
              </button>
              <AnimatePresence>
                {showSortDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-12 right-0 bg-white border border-[#e2e6e7] rounded-[12px] shadow-lg overflow-hidden z-50 min-w-[200px]"
                  >
                    {sortOptions.map((option, index) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value as any);
                          setShowSortDropdown(false);
                        }}
                        className={`w-full px-4 py-3 text-left text-[14px] transition-all ${
                          sortBy === option.value
                            ? "bg-[#4A90E2] text-white font-semibold"
                            : "text-[#2c3e50] hover:bg-[#E8F4FD]"
                        } ${index > 0 ? "border-t border-[#e2e6e7]" : ""}`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              </div>
            </div>
          </div>
        )}

      </div>

  {/* Cards Content (page scroll handles this) */}
  <div className="px-5 sm:px-8 pt-6 pb-8">

        <AnimatePresence mode="wait">
          {activeTab === "my" ? (
            <motion.div
              key="my-challenges"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-6 pb-8"
            >

              {/* Challenge Cards */}
              {activeChallenges.map((challenge) => (
                <motion.div
                  key={challenge.id}
                  onClick={() => onOpenChallenge(challenge)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`bg-white rounded-[16px] border border-[#4a90e2] p-4 relative overflow-hidden cursor-pointer transition-all shadow-[2px_4px_20px_0px_inset_rgba(168,213,186,0.1)]`}
                >
                  {/* Background decoration to match Courses */}
                  <div className="absolute left-[-82px] top-[-24.48px] pointer-events-none opacity-50 mix-blend-multiply">
                    <svg width="393" height="137" fill="none" viewBox="0 0 393 137">
                      <path d={svgPaths.pb4d74c0} stroke="url(#paint0_radial)" strokeWidth="20" />
                      <defs>
                        <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(266.99 90.3718 -143.527 168.111 31.2421 23.3579)">
                          <stop offset="0.117544" stopColor="#4A90E2" stopOpacity="0.3" />
                          <stop offset="0.5" stopColor="white" stopOpacity="0.5" />
                          <stop offset="1" stopColor="#4A90E2" stopOpacity="0.5" />
                        </radialGradient>
                      </defs>
                    </svg>
                  </div>

                  {/* Card Header */}
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-[#E8F4FD] to-[#f0f0f0] flex items-center justify-center text-[24px] flex-shrink-0">
                      {challenge.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[16px] font-bold text-[#2c3e50] mb-1">
                        {challenge.title}
                      </h3>
                      {/* Category label on left */}
                      <div className="inline-flex px-1 py-0.5 rounded-[4px] bg-[rgba(168,213,186,0.2)]">
                        <span className="text-[14px] font-semibold text-[#a8d5ba]">{challenge.category}</span>
                      </div>
                    </div>
                    {/* Countdown and participants aligned right */}
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] bg-[rgba(245,166,35,0.15)]">
                        <span className="text-[12px] font-bold text-[#f5a623]">{challenge.timeLeft} left</span>
                        <span className="text-[12px]">🔥</span>
                      </div>
                      <div className="flex gap-1 items-center">
                        <div className="size-[18px]">
                          <svg className="block size-full" fill="none" viewBox="0 0 15 13">
                            <path d={svgPaths.p35213980} stroke="#80646F" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <span className="text-[14px] font-medium text-[#80646f]">{challenge.participants}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description removed per request */}

                  {/* Leaderboard preview (compact, no label, restored bg/padding alignment) */}
                  <div className="bg-[#fcfcfc] rounded-[12px] p-3">
                    <div className="flex items-center justify-between gap-2">
                      {challenge.topUsers.map((user: ChallengeUser, index: number) => (
                        <div key={index} className="flex items-center gap-2 min-w-0">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#4A90E2] to-[#A8D5BA] flex items-center justify-center text-white text-[10px] font-bold">
                            {user.avatar || "👤"}
                          </div>
                          <p className="text-[10px] font-bold text-[#2c3e50] truncate max-w-[80px]">{user.name}</p>
                          <span className="text-[10px] font-bold text-[#F5A623] whitespace-nowrap">{user.days}d</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Continue button removed; card tap navigates */}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="discover"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-6 pb-8"
            >
              {/* Discover challenges */}
              {activeChallenges.map((challenge) => (
                <motion.div
                  key={challenge.id}
                  onClick={() => setSelectedDiscoverChallenge(challenge)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`bg-white rounded-[16px] border border-[#4a90e2] p-4 relative overflow-hidden cursor-pointer transition-all shadow-[2px_4px_20px_0px_inset_rgba(168,213,186,0.1)]`}
                >
                  {/* Background decoration to match Courses */}
                  <div className="absolute left-[-82px] top-[-24.48px] pointer-events-none opacity-50 mix-blend-multiply">
                    <svg width="393" height="137" fill="none" viewBox="0 0 393 137">
                      <path d={svgPaths.pb4d74c0} stroke="url(#paint0_radial)" strokeWidth="20" />
                      <defs>
                        <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(266.99 90.3718 -143.527 168.111 31.2421 23.3579)">
                          <stop offset="0.117544" stopColor="#4A90E2" stopOpacity="0.3" />
                          <stop offset="0.5" stopColor="white" stopOpacity="0.5" />
                          <stop offset="1" stopColor="#4A90E2" stopOpacity="0.5" />
                        </radialGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-[#E8F4FD] to-[#f0f0f0] flex items-center justify-center text-[24px] flex-shrink-0">
                      {challenge.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[16px] font-bold text-[#2c3e50] mb-1">
                        {challenge.title}
                      </h3>
                      {/* Category label on left */}
                      <div className="inline-flex px-1 py-0.5 rounded-[4px] bg-[rgba(168,213,186,0.2)]">
                        <span className="text-[14px] font-semibold text-[#a8d5ba]">{challenge.category}</span>
                      </div>
                    </div>
                    {/* Countdown and participants aligned right */}
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] bg-[rgba(245,166,35,0.15)]">
                        <span className="text-[12px] font-bold text-[#f5a623]">{challenge.timeLeft} left</span>
                        <span className="text-[12px]">🔥</span>
                      </div>
                      <div className="flex gap-1 items-center">
                        <div className="size-[18px]">
                          <svg className="block size-full" fill="none" viewBox="0 0 15 13">
                            <path d={svgPaths.p35213980} stroke="#80646F" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <span className="text-[14px] font-medium text-[#80646f]">{challenge.participants}</span>
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