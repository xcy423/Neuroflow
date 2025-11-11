import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search } from "lucide-react";
import svgPaths from "../imports/svg-snij5ma8dm";

interface ChallengeUser {
  name: string;
  days: number;
  avatar: string;
}

interface Challenge {
  id: number;
  title: string;
  category: string;
  icon: string;
  description: string;
  timeLeft: string;
  timeLeftMs: number;
  joined: boolean;
  points: number;
  startDate: Date;
  topUsers: ChallengeUser[];
}

export default function EnhancedChallengesScreen() {
  const [activeTab, setActiveTab] = useState<"my" | "discover">("my");
  const [activeCardId, setActiveCardId] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const challenges: Challenge[] = [
    {
      id: 1,
      title: "Mindfulness Streak",
      category: "Mental",
      icon: "🧘",
      description: "Complete 10 minutes of meditation daily for 30 days",
      timeLeft: "03d 03h 20m",
      timeLeftMs: 3 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000 + 20 * 60 * 1000,
      joined: true,
  points: 100,
      startDate: new Date("2024-11-01"),
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
      timeLeft: "05d 12h 45m",
      timeLeftMs: 5 * 24 * 60 * 60 * 1000 + 12 * 60 * 60 * 1000 + 45 * 60 * 1000,
      joined: true,
  points: 150,
      startDate: new Date("2024-11-08"),
      topUsers: [
        { name: "Emma W.", days: 15, avatar: "👤" },
        { name: "You", days: 14, avatar: "👤" },
        { name: "Alex K.", days: 13, avatar: "👤" }
      ]
    }
  ];

  const discoverChallenges: Challenge[] = [
    {
      id: 3,
      title: "Hydration Hero",
      category: "Physical",
      icon: "💧",
      description: "Drink 8 glasses of water daily for 14 days",
      timeLeft: "10d 00h 00m",
      timeLeftMs: 10 * 24 * 60 * 60 * 1000,
      joined: false,
  points: 200,
      startDate: new Date("2024-11-15"),
      topUsers: [
        { name: "Mike T.", days: 25, avatar: "👤" },
        { name: "Lisa R.", days: 22, avatar: "👤" },
        { name: "Tom H.", days: 20, avatar: "👤" }
      ]
    },
    {
      id: 4,
      title: "Gratitude Journal",
      category: "Mental",
      icon: "📝",
      description: "Write 3 things you're grateful for every day",
      timeLeft: "07d 06h 30m",
      timeLeftMs: 7 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000 + 30 * 60 * 1000,
      joined: false,
  points: 120,
      startDate: new Date("2024-11-12"),
      topUsers: [
        { name: "Nina P.", days: 18, avatar: "👤" },
        { name: "Chris B.", days: 17, avatar: "👤" },
        { name: "Amy L.", days: 16, avatar: "👤" }
      ]
    }
  ];

  const sortChallenges = (challengesList: Challenge[]) => {
    return [...challengesList].sort((a, b) =>
      sortDir === "asc" ? a.timeLeftMs - b.timeLeftMs : b.timeLeftMs - a.timeLeftMs
    );
  };

  const activeChallenges = activeTab === "my" ? sortChallenges(challenges) : sortChallenges(discoverChallenges);
  const enrolledCount = challenges.filter(c => c.joined).length;
  const completedCount = 0; // no completion data yet; wire up when available

  const toggleSortDir = () => setSortDir((d) => (d === "asc" ? "desc" : "asc"));

  // Tap-to-reveal button like Courses page
  const handleCardTap = (challengeId: number) => {
    if (activeCardId === challengeId) return;
    if (window.navigator.vibrate) window.navigator.vibrate(10);
    if (timerRef.current) clearTimeout(timerRef.current);
    setActiveCardId(challengeId);
    timerRef.current = setTimeout(() => setActiveCardId(null), 3000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);



  return (
  <div className="bg-[#fcfcfc] relative w-full min-h-screen">

      {/* Sticky Tab Navigation (matched to Courses) */}
  <div className="sticky top-0 z-40 bg-[#fcfcfc]/95 backdrop-blur-sm px-5 py-3 border-b border-[#e2e6e7]/30">
        <div className="bg-[#ecf0f1] flex items-center pl-[2px] pr-[10px] py-[2px] rounded-[100px] w-full max-w-md mx-auto">
          <button
            onClick={() => setActiveTab("my")}
            className={`flex-1 h-[54.476px] flex items-center justify-center gap-3 px-7 py-[3px] rounded-[100px] font-bold text-[16px] transition-all ${
              activeTab === "my" ? "bg-white text-[#2c3e50] shadow-sm" : "text-[#2c3e50]"
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
              activeTab === "discover" ? "bg-white text-[#2c3e50] shadow-sm" : "text-[#2c3e50]"
            }`}
          >
            <span className="whitespace-nowrap">Discover</span>
            {activeTab === "discover" && <Search className="w-5 h-5" />}
          </button>
        </div>

        {/* Stats cards (match Courses), only on My */}
        {activeTab === "my" && (
          <div className="flex gap-5 mt-4 mb-1 flex-wrap justify-center">
            <div className="flex-1 min-w-[150px] max-w-[170px] bg-white border border-[#e2e6e7] rounded-[12px] p-3 flex items-center gap-3">
              <div className="relative size-[28px] flex-shrink-0">
                <div className="absolute aspect-[19.8/26.4] left-[24.24%] right-[21.21%] top-[calc(50%+0.5px)] translate-y-[-50%]">
                  <div className="absolute inset-[-2.58%_-3.27%_-2.46%_-3.27%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 22">
                      <path d={svgPaths.p2e388800} fill="#2C3E50" stroke="#2C3E50" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="font-bold text-[16px] text-[#2c3e50]">{enrolledCount}</div>
              <div className="font-medium text-[12px] text-[#2c3e50]">Enrolled</div>
            </div>

            <div className="flex-1 min-w-[150px] max-w-[170px] bg-white border border-[#e2e6e7] rounded-[12px] p-3 flex items-center gap-3">
              <div className="size-[28px] flex-shrink-0 bg-[#2c3e50] rounded-full flex items-center justify-center">
                <svg className="size-[10px]" fill="none" viewBox="0 0 12 9">
                  <path d="M1 4.7333L4.18164 8L11 1" stroke="#FCFCFC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
              <div className="font-bold text-[16px] text-[#2c3e50]">{completedCount}</div>
              <div className="font-medium text-[12px] text-[#2c3e50]">Completed</div>
            </div>
          </div>
        )}

        {/* Sticky Time Sort Control (keep fixed per request) */}
        <div className="mt-3 flex justify-end">
          <button
            onClick={toggleSortDir}
            className="flex items-center gap-2 px-3 py-2 bg-white border border-[#e2e6e7] rounded-[8px] text-[13px] font-semibold text-[#2c3e50] hover:bg-[#f5f5f5] transition-all"
          >
            <span>⏰</span>
            <span>Time</span>
            <span className="ml-1">{sortDir === "asc" ? "↑" : "↓"}</span>
          </button>
        </div>
      </div>

  {/* Content Area - no extra top padding, generous side padding for card gutters */}
  <div className="px-5 pt-2 pb-32 sm:px-8">
        <AnimatePresence mode="wait">
          {activeTab === "my" ? (
            <motion.div
              key="my-challenges"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-7"
            >

              {/* Challenge Cards */}
              {activeChallenges.map((challenge) => (
                <motion.div
                  key={challenge.id}
                  onClick={() => handleCardTap(challenge.id)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`bg-white rounded-[16px] border border-[#4a90e2] p-4 relative overflow-hidden cursor-pointer transition-all max-w-[420px] mx-auto ${
                    activeCardId === challenge.id
                      ? "shadow-[2px_8px_24px_0px_rgba(74,144,226,0.25)]"
                      : "shadow-[2px_4px_20px_0px_inset_rgba(168,213,186,0.1)]"
                  }`}
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
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 rounded-[12px] bg-gradient-to-br from-[#E8F4FD] to-[#f0f0f0] flex items-center justify-center text-[24px] flex-shrink-0">
                      {challenge.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-[16px] font-bold text-[#2c3e50]">
                            {challenge.title}
                          </h3>
                          {/* Category label styled like Courses */}
                          <div className="mt-1 inline-flex px-1 py-0.5 rounded-[4px] bg-[rgba(168,213,186,0.2)]">
                            <span className="text-[12px] font-semibold text-[#a8d5ba]">{challenge.category}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[14px] font-bold text-[#F5A623]">
                            {challenge.timeLeft}
                          </p>
                          <p className="text-[9px] text-[#868686]">left</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-[13px] text-[#868686] mb-4">
                    {challenge.description}
                  </p>

                  {/* Leaderboard Top 3 */}
                  <div className="bg-[#fcfcfc] rounded-[12px] p-3 mb-4">
                    <p className="text-[11px] font-semibold text-[#2c3e50] mb-3">
                      🏆 Leaderboard Top 3
                    </p>
                    <div className="flex items-center gap-2">
                      {challenge.topUsers.map((user: ChallengeUser, index: number) => (
                        <div
                          key={index}
                          className="flex-1 bg-white rounded-[8px] p-2 border border-[#e2e6e7] flex items-center gap-2"
                        >
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#4A90E2] to-[#A8D5BA] flex items-center justify-center text-white text-[10px] font-bold">
                            {user.avatar || "👤"}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-bold text-[#2c3e50] truncate">{user.name}</p>
                          </div>
                          <div className="text-[10px] font-bold text-[#F5A623] whitespace-nowrap">{user.days}d</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tap-to-Reveal Button */}
                  <AnimatePresence>
                    {activeCardId === challenge.id && (
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="w-full mt-2 bg-[#4a90e2] text-white py-3 rounded-[8px] font-bold text-[14px] hover:bg-[#3A80D2] active:translate-y-[2px] active:shadow-[0px_2px_0px_0px_#477baf] transition-all flex items-center justify-center shadow-[0px_4px_0px_0px_#477baf]"
                      >
                        {challenge.joined ? "Continue" : "Join Now"}
                      </motion.button>
                    )}
                  </AnimatePresence>
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
              className="space-y-7"
            >
              {/* Discover challenges */}
              {activeChallenges.map((challenge) => (
                <motion.div
                  key={challenge.id}
                  onClick={() => handleCardTap(challenge.id)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`bg-white rounded-[16px] border border-[#4a90e2] p-4 relative overflow-hidden cursor-pointer transition-all max-w-[420px] mx-auto ${
                    activeCardId === challenge.id
                      ? "shadow-[2px_8px_24px_0px_rgba(74,144,226,0.25)]"
                      : "shadow-[2px_4px_20px_0px_inset_rgba(168,213,186,0.1)]"
                  }`}
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
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 rounded-[12px] bg-gradient-to-br from-[#E8F4FD] to-[#f0f0f0] flex items-center justify-center text-[24px] flex-shrink-0">
                      {challenge.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-[16px] font-bold text-[#2c3e50]">
                            {challenge.title}
                          </h3>
                          <div className="mt-1 inline-flex px-1 py-0.5 rounded-[4px] bg-[rgba(168,213,186,0.2)]">
                            <span className="text-[12px] font-semibold text-[#a8d5ba]">{challenge.category}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[14px] font-bold text-[#F5A623]">
                            {challenge.timeLeft}
                          </p>
                          <p className="text-[9px] text-[#868686]">left</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-[13px] text-[#868686] mb-4">
                    {challenge.description}
                  </p>

                  <div className="bg-[#fcfcfc] rounded-[12px] p-3 mb-4">
                    <p className="text-[11px] font-semibold text-[#2c3e50] mb-3">
                      🏆 Leaderboard Top 3
                    </p>
                    <div className="flex items-center gap-2">
                      {challenge.topUsers.map((user: ChallengeUser, index: number) => (
                        <div
                          key={index}
                          className="flex-1 bg-white rounded-[8px] p-2 border border-[#e2e6e7] flex items-center gap-2"
                        >
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#4A90E2] to-[#A8D5BA] flex items-center justify-center text-white text-[10px] font-bold">
                            {user.avatar || "👤"}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-bold text-[#2c3e50] truncate">{user.name}</p>
                          </div>
                          <div className="text-[10px] font-bold text-[#F5A623] whitespace-nowrap">{user.days}d</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tap-to-Reveal Button */}
                  <AnimatePresence>
                    {activeCardId === challenge.id && (
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="w-full mt-2 bg-[#4a90e2] text-white py-3 rounded-[8px] font-bold text-[14px] hover:bg-[#3A80D2] active:translate-y-[2px] active:shadow-[0px_2px_0px_0px_#477baf] transition-all flex items-center justify-center shadow-[0px_4px_0px_0px_#477baf]"
                      >
                        {challenge.joined ? "Continue" : "Join Now"}
                      </motion.button>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
