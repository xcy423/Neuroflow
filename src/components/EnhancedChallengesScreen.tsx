import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Plus, Sparkles, MessageCircle } from "lucide-react";
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
  participants: number;
  topUsers: ChallengeUser[];
}

interface EnhancedChallengesScreenProps {
  onNavigateHome: () => void;
  onOpenChallenge: (challenge: Challenge) => void;
  onNavigateToSanctuary?: () => void;
}

export default function EnhancedChallengesScreen({ onNavigateHome, onOpenChallenge, onNavigateToSanctuary }: EnhancedChallengesScreenProps) {
  const [activeTab, setActiveTab] = useState<"my" | "discover">("my");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [sortBy, setSortBy] = useState<"time-asc" | "time-desc" | "points-high" | "points-low" | "title-az" | "title-za">("time-asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateChallenge, setShowCreateChallenge] = useState(false);
  const [createStep, setCreateStep] = useState(1);
  const [challengeTitle, setChallengeTitle] = useState("");
  const [challengeDescription, setChallengeDescription] = useState("");
  const [goalType, setGoalType] = useState("Mental");
  const [targetValue, setTargetValue] = useState("");
  const [unit, setUnit] = useState("");
  const [duration, setDuration] = useState("");
  const [startDay, setStartDay] = useState("");
  const [visibility, setVisibility] = useState("Public");
  const [maxParticipants, setMaxParticipants] = useState("");
  const [badgeName, setBadgeName] = useState("");
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  const [aiButtonPosition, setAiButtonPosition] = useState({ x: 20, y: 500 });
  const [isDragging, setIsDragging] = useState(false);
  const [selectedDiscoverChallenge, setSelectedDiscoverChallenge] = useState<Challenge | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const generateAIDescription = () => {
    if (!challengeTitle.trim()) return;
    setIsGeneratingDescription(true);
    // Simulate AI generation
    setTimeout(() => {
      setChallengeDescription(`Experience the transformative power of ${challengeTitle}. Track your daily progress, build lasting habits, and join a community of motivated individuals working towards similar goals. Stay consistent, celebrate milestones, and unlock your full potential.`);
      setIsGeneratingDescription(false);
    }, 1500);
  };

  const handleCreateChallenge = () => {
    setShowCreateChallenge(true);
    setCreateStep(1);
  };

  const handleCloseCreateChallenge = () => {
    setShowCreateChallenge(false);
    setCreateStep(1);
    // Reset form
    setChallengeTitle("");
    setChallengeDescription("");
    setGoalType("Mental");
    setTargetValue("");
    setUnit("");
    setDuration("");
    setStartDay("");
    setVisibility("Public");
    setMaxParticipants("");
    setBadgeName("");
  };

  const handleNextStep = () => {
    if (createStep < 3) {
      setCreateStep(createStep + 1);
    } else {
      // Submit challenge
      console.log("Challenge created!");
      handleCloseCreateChallenge();
    }
  };

  const handlePrevStep = () => {
    if (createStep > 1) {
      setCreateStep(createStep - 1);
    }
  };

  const challenges: Challenge[] = [
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
      points: 220,
      startDate: new Date("2024-11-13"),
      participants: 134,
      topUsers: [
        { name: "Alex F.", days: 12, avatar: "👤" },
        { name: "Jordan C.", days: 11, avatar: "👤" },
        { name: "Taylor B.", days: 10, avatar: "👤" }
      ]
    },
    {
      id: 10,
      title: "Healthy Eating",
      category: "Physical",
      icon: "🥗",
      description: "Eat 5 servings of fruits and vegetables daily",
      timeLeft: "20d 04h",
      timeLeftMs: 20 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000,
      joined: false,
      points: 190,
      startDate: new Date("2024-11-25"),
      participants: 276,
      topUsers: [
        { name: "Hannah G.", days: 35, avatar: "👤" },
        { name: "Lucas M.", days: 33, avatar: "👤" },
        { name: "Mia K.", days: 31, avatar: "👤" }
      ]
    }
  ];

  // Sort challenges based on selected option
  const getSortedChallenges = () => {
    const challengesToSort = activeTab === "my" ? challenges : discoverChallenges;
    const sorted = [...challengesToSort];

    switch (sortBy) {
      case "time-asc":
        return sorted.sort((a, b) => a.timeLeftMs - b.timeLeftMs);
      case "time-desc":
        return sorted.sort((a, b) => b.timeLeftMs - a.timeLeftMs);
      case "points-high":
        return sorted.sort((a, b) => b.points - a.points);
      case "points-low":
        return sorted.sort((a, b) => a.points - b.points);
      case "title-az":
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case "title-za":
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return sorted;
    }
  };

  const activeChallenges = getSortedChallenges();
  
  const sortOptions = [
    { value: "time-asc", label: "Time (Least First)" },
    { value: "time-desc", label: "Time (Most First)" },
    { value: "points-high", label: "Points (High to Low)" },
    { value: "points-low", label: "Points (Low to High)" },
    { value: "title-az", label: "Title (A-Z)" },
    { value: "title-za", label: "Title (Z-A)" },
  ];

  const currentSortLabel = sortOptions.find(opt => opt.value === sortBy)?.label || "Time";

  const activeCount = challenges.filter(c => c.joined).length;
  const maxStreak = challenges.filter(c => c.joined).reduce((max, c) => {
    const userDays = c.topUsers.find(u => u.name === "You")?.days || 0;
    return Math.max(max, userDays);
  }, 0);

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
    <div className="bg-[#fcfcfc] relative w-full">

      {/* Dimmed Overlay for Header and Bottom Nav when modal is open */}
      <AnimatePresence>
        {(showCreateChallenge || selectedDiscoverChallenge) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Unified Sticky Header: Logo + Tabs + (Stats & Sort when My Challenges) */}
      <div className={`sticky top-0 z-50 bg-[#fcfcfc] transition-all ${(showCreateChallenge || selectedDiscoverChallenge) ? 'relative z-40' : ''}`}>
        {/* Logo */}
        <div className="px-6 pt-4 pb-4">
          <motion.button
            onClick={onNavigateHome}
            className="flex items-center gap-4 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex-shrink-0">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4A90E2] to-[#A8D5BA] flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <span className="text-2xl">🧠</span>
              </div>
            </div>
            <h1
              className="text-[24px] font-bold text-[#2c3e50] group-hover:text-[#4A90E2] transition-colors"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              NeuroFlow
            </h1>
          </motion.button>
        </div>

        {/* Tabs */}
        <div className="px-5 pb-4">
          <div className="bg-[#ecf0f1] flex items-center pl-[2px] pr-[10px] py-[2px] rounded-[100px] w-full max-w-md mx-auto">
            <button
              onClick={() => setActiveTab("my")}
              className={`flex-1 h-[48px] flex items-center justify-center gap-3 px-7 py-[3px] rounded-[100px] font-bold text-[16px] transition-all ${
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
              className={`flex-1 h-[48px] flex items-center justify-center gap-3 px-7 py-[3px] rounded-[100px] font-bold text-[16px] transition-all ${
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

              <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex gap-1 items-center justify-center px-3 py-2 rounded-[8px] hover:bg-[#E8F4FD] transition-all"
              >
                <span className="text-[14px] font-bold text-[#2c3e50]">{currentSortLabel}</span>
                <div className="relative size-[15px]">
                  <div className="absolute flex items-center justify-center left-[14.71%] right-[14.71%] top-1/2 translate-y-[-50%]">
                    <motion.div
                      className="size-[12px]"
                      animate={{ rotate: showSortDropdown ? 90 : 270 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
                        <path d={svgPaths.p3314f5f0} fill="#2C3E50" stroke="#2C3E50" strokeWidth="0.5" />
                      </svg>
                    </motion.div>
                  </div>
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

        {/* Sorting for Discover */}
        {activeTab === "discover" && (
          <div className="px-5 pb-4">
            <div className="flex items-center justify-end">
              <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex gap-1 items-center justify-center px-3 py-2 rounded-[8px] hover:bg-[#E8F4FD] transition-all"
              >
                <span className="text-[14px] font-bold text-[#2c3e50]">{currentSortLabel}</span>
                <div className="relative size-[15px]">
                  <div className="absolute flex items-center justify-center left-[14.71%] right-[14.71%] top-1/2 translate-y-[-50%]">
                    <motion.div
                      className="size-[12px]"
                      animate={{ rotate: showSortDropdown ? 90 : 270 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
                        <path d={svgPaths.p3314f5f0} fill="#2C3E50" stroke="#2C3E50" strokeWidth="0.5" />
                      </svg>
                    </motion.div>
                  </div>
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
                  </div>

                  {/* Description instead of leaderboard for Discover */}
                  <div className="mt-3">
                    <p className="text-[13px] text-[#80646f] leading-relaxed">
                      {challenge.description}
                    </p>
                  </div>

                  {/* Continue button removed; card tap navigates */}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Create Challenge Modal */}
      <AnimatePresence>
        {showCreateChallenge && (
          <>
            {/* Dimmed Background Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[100]"
              onClick={handleCloseCreateChallenge}
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="fixed inset-0 z-[101] flex items-center justify-center p-4"
              onClick={handleCloseCreateChallenge}
            >
              <motion.div
                className="bg-white rounded-[24px] w-full max-w-[380px] max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
              {/* Header */}
              <div className="px-6 py-4 border-b border-[#e2e6e7]">
                <h2 className="text-[20px] font-bold text-[#2c3e50]">Create Challenge</h2>
              </div>

              {/* Progress Bar */}
              <div className="px-6 py-4 bg-[#fcfcfc]">
                <div className="flex items-center justify-between mb-2">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center flex-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[14px] font-bold transition-all ${
                        createStep >= step ? 'bg-[#4A90E2] text-white' : 'bg-[#e2e6e7] text-[#80646f]'
                      }`}>
                        {step}
                      </div>
                      {step < 3 && (
                        <div className={`flex-1 h-1 mx-2 rounded-full transition-all ${
                          createStep > step ? 'bg-[#4A90E2]' : 'bg-[#e2e6e7]'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
                <div className="text-[12px] text-[#80646f] text-center">
                  {createStep === 1 && "Basic Information"}
                  {createStep === 2 && "Goal & Timeline"}
                  {createStep === 3 && "Participation"}
                </div>
              </div>

              {/* Content */}
              <div className="px-6 py-4 max-h-[50vh] overflow-y-auto">
                {createStep === 1 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[14px] font-semibold text-[#2c3e50] mb-2">
                        Challenge Title <span className="text-[#f5a623]">*</span>
                      </label>
                      <input
                        type="text"
                        value={challengeTitle}
                        onChange={(e) => setChallengeTitle(e.target.value)}
                        placeholder="Enter challenge title"
                        className="w-full px-4 py-3 rounded-[12px] border border-[#e2e6e7] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-[14px] font-semibold text-[#2c3e50]">
                          Description <span className="text-[#f5a623]">*</span>
                        </label>
                        <button
                          onClick={generateAIDescription}
                          disabled={!challengeTitle.trim() || isGeneratingDescription}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-[8px] bg-gradient-to-r from-[#f5a623] to-[#f8b44a] text-white text-[12px] font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md transition-all"
                        >
                          <Sparkles className="w-4 h-4" />
                          {isGeneratingDescription ? "Generating..." : "GenAI"}
                        </button>
                      </div>
                      <textarea
                        value={challengeDescription}
                        onChange={(e) => setChallengeDescription(e.target.value)}
                        placeholder="Describe your challenge..."
                        rows={4}
                        className="w-full px-4 py-3 rounded-[12px] border border-[#e2e6e7] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#4A90E2] resize-none"
                      />
                    </div>
                  </div>
                )}

                {createStep === 2 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[14px] font-semibold text-[#2c3e50] mb-2">
                        Goal Type <span className="text-[#f5a623]">*</span>
                      </label>
                      <div className="flex gap-2">
                        {["Mental", "Physical", "Hybrid"].map((type) => (
                          <button
                            key={type}
                            onClick={() => setGoalType(type)}
                            className={`flex-1 px-4 py-3 rounded-[12px] text-[14px] font-semibold transition-all ${
                              goalType === type
                                ? "bg-[#4A90E2] text-white"
                                : "bg-[#f0f0f0] text-[#2c3e50] hover:bg-[#e2e6e7]"
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <label className="block text-[14px] font-semibold text-[#2c3e50] mb-2">
                          Target Value <span className="text-[#f5a623]">*</span>
                        </label>
                        <input
                          type="text"
                          value={targetValue}
                          onChange={(e) => setTargetValue(e.target.value)}
                          placeholder="e.g., 10000"
                          className="w-full px-4 py-3 rounded-[12px] border border-[#e2e6e7] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-[14px] font-semibold text-[#2c3e50] mb-2">
                          Unit <span className="text-[#f5a623]">*</span>
                        </label>
                        <input
                          type="text"
                          value={unit}
                          onChange={(e) => setUnit(e.target.value)}
                          placeholder="e.g., steps/day"
                          className="w-full px-4 py-3 rounded-[12px] border border-[#e2e6e7] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[14px] font-semibold text-[#2c3e50] mb-2">
                        Duration <span className="text-[#f5a623]">*</span>
                      </label>
                      <input
                        type="text"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        placeholder="e.g., 30 days"
                        className="w-full px-4 py-3 rounded-[12px] border border-[#e2e6e7] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
                      />
                    </div>
                    <div>
                      <label className="block text-[14px] font-semibold text-[#2c3e50] mb-2">
                        Start Day <span className="text-[#f5a623]">*</span>
                      </label>
                      <input
                        type="date"
                        value={startDay}
                        onChange={(e) => setStartDay(e.target.value)}
                        className="w-full px-4 py-3 rounded-[12px] border border-[#e2e6e7] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
                      />
                    </div>
                  </div>
                )}

                {createStep === 3 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[14px] font-semibold text-[#2c3e50] mb-2">
                        Visibility <span className="text-[#f5a623]">*</span>
                      </label>
                      <div className="flex gap-2">
                        {["Public", "Friend only", "Private"].map((vis) => (
                          <button
                            key={vis}
                            onClick={() => setVisibility(vis)}
                            className={`flex-1 px-4 py-3 rounded-[12px] text-[12px] font-semibold transition-all ${
                              visibility === vis
                                ? "bg-[#4A90E2] text-white"
                                : "bg-[#f0f0f0] text-[#2c3e50] hover:bg-[#e2e6e7]"
                            }`}
                          >
                            {vis}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-[14px] font-semibold text-[#2c3e50] mb-2">
                        Max Participant <span className="text-[#f5a623]">*</span>
                      </label>
                      <input
                        type="number"
                        value={maxParticipants}
                        onChange={(e) => setMaxParticipants(e.target.value)}
                        placeholder="Enter max participants"
                        className="w-full px-4 py-3 rounded-[12px] border border-[#e2e6e7] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
                      />
                    </div>
                    <div>
                      <label className="block text-[14px] font-semibold text-[#2c3e50] mb-2">
                        Badge Name
                      </label>
                      <input
                        type="text"
                        value={badgeName}
                        onChange={(e) => setBadgeName(e.target.value)}
                        placeholder="Enter badge name"
                        className="w-full px-4 py-3 rounded-[12px] border border-[#e2e6e7] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Footer with side-by-side buttons */}
              <div className="px-6 py-4 border-t border-[#e2e6e7] bg-white">
                <div className="flex items-center justify-center gap-2">
                  {/* Cancel/Back Button - Orange outline, left side */}
                  <button
                    onClick={createStep === 1 ? handleCloseCreateChallenge : handlePrevStep}
                    className="flex-1 max-w-[160px] h-[44px] px-4 rounded-[100px] border-2 border-[#F5A623] text-[#F5A623] text-[14px] font-semibold hover:bg-[#FFF5E6] active:scale-95 transition-all shadow-sm"
                  >
                    {createStep === 1 ? "Cancel" : "Back"}
                  </button>
                  
                  {/* Next/Publish Button - Blue fill, right side */}
                  <button
                    onClick={handleNextStep}
                    className="flex-1 max-w-[160px] h-[44px] px-4 rounded-[100px] bg-[#4A90E2] text-white text-[14px] font-bold hover:bg-[#3d7ec9] active:scale-95 transition-all shadow-md"
                  >
                    {createStep === 3 ? "Publish" : "Next"}
                  </button>
                </div>
                
                {/* AI Assistant Integration Hint */}
                {createStep === 1 && !challengeTitle && (
                  <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-[#80646f]">
                    <Sparkles className="w-3.5 h-3.5 text-[#f5a623]" />
                    <span>Tip: Use GenAI for description ideas!</span>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Search Bar (above bottom nav) */}
      {activeTab === "discover" && !showCreateChallenge && !selectedDiscoverChallenge && (
        <div className="fixed bottom-24 left-0 right-0 z-40 px-4">
          <div className="flex items-center justify-center gap-3 max-w-[400px] mx-auto">
            {/* Search Bar */}
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="flex-1"
            >
              <div className="flex items-center gap-3 bg-white rounded-[100px] shadow-lg border border-[#e2e6e7] py-3 px-5">
                <Search className="w-5 h-5 text-[#80646f] flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search challenges..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-[14px] text-[#2c3e50] placeholder-[#80646f] focus:outline-none min-w-0"
                />
              </div>
            </motion.div>
            
            {/* Plus Button - Exactly matches search bar height */}
            <motion.button
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              onClick={handleCreateChallenge}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-[46px] h-[46px] rounded-full bg-white shadow-lg border-2 border-[#e2e6e7] flex items-center justify-center hover:shadow-xl transition-all flex-shrink-0"
            >
              <Plus className="w-5 h-5 text-[#4A90E2]" strokeWidth={2.5} />
            </motion.button>
          </div>
        </div>
      )}

      {/* Draggable AI Assistant Button */}
      {activeTab === "discover" && !showCreateChallenge && !selectedDiscoverChallenge && (
        <motion.div
          drag
          dragMomentum={false}
          dragElastic={0}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(e, info) => {
            setIsDragging(false);
            setAiButtonPosition({
              x: Math.max(10, Math.min(window.innerWidth - 70, aiButtonPosition.x + info.offset.x)),
              y: Math.max(100, Math.min(window.innerHeight - 200, aiButtonPosition.y + info.offset.y))
            });
          }}
          style={{
            position: 'fixed',
            left: aiButtonPosition.x,
            top: aiButtonPosition.y,
            zIndex: 30
          }}
          className="cursor-move"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <button
            onClick={() => !isDragging && handleCreateChallenge()}
            className="w-14 h-14 rounded-full bg-gradient-to-br from-[#f5a623] to-[#f8b44a] flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
          >
            <Sparkles className="w-7 h-7 text-white" />
          </button>
        </motion.div>
      )}

      {/* Discover Challenge Preview Modal - Slide Up */}
      <AnimatePresence>
        {selectedDiscoverChallenge && (
          <>
            {/* Dimmed Background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[100]"
              onClick={() => setSelectedDiscoverChallenge(null)}
            />
            
            {/* Slide Up Modal */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-[101] bg-white rounded-t-[24px] shadow-2xl max-h-[85vh] overflow-y-auto"
            >
              <div className="p-6">
                {/* Close Handle */}
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-1.5 bg-[#e2e6e7] rounded-full" />
                </div>

                {/* Challenge Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-[16px] bg-gradient-to-br from-[#E8F4FD] to-[#f0f0f0] flex items-center justify-center text-[32px] flex-shrink-0">
                    {selectedDiscoverChallenge.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-[22px] font-bold text-[#2c3e50] mb-2">
                      {selectedDiscoverChallenge.title}
                    </h2>
                    <div className="flex items-center gap-2">
                      <div className="inline-flex px-2 py-1 rounded-[6px] bg-[rgba(168,213,186,0.2)]">
                        <span className="text-[14px] font-semibold text-[#a8d5ba]">{selectedDiscoverChallenge.category}</span>
                      </div>
                      <div className="flex gap-1 items-center">
                        <div className="size-[18px]">
                          <svg className="block size-full" fill="none" viewBox="0 0 15 13">
                            <path d={svgPaths.p35213980} stroke="#80646F" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <span className="text-[14px] font-medium text-[#80646f]">{selectedDiscoverChallenge.participants} participants</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Countdown */}
                <div className="inline-flex items-center gap-2 px-3 py-2 rounded-[12px] bg-[rgba(245,166,35,0.15)] mb-4">
                  <span className="text-[14px] font-bold text-[#f5a623]">{selectedDiscoverChallenge.timeLeft} left to join</span>
                  <span className="text-[16px]">🔥</span>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-[16px] font-bold text-[#2c3e50] mb-2">About This Challenge</h3>
                  <p className="text-[14px] text-[#80646f] leading-relaxed">
                    {selectedDiscoverChallenge.description}
                  </p>
                </div>

                {/* Top Participants */}
                <div className="mb-6">
                  <h3 className="text-[16px] font-bold text-[#2c3e50] mb-3">Top Participants</h3>
                  <div className="bg-[#fcfcfc] rounded-[12px] p-3 space-y-3">
                    {selectedDiscoverChallenge.topUsers.map((user, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4A90E2] to-[#A8D5BA] flex items-center justify-center text-white text-[14px] font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <p className="text-[14px] font-bold text-[#2c3e50]">{user.name}</p>
                            <p className="text-[12px] text-[#80646f]">{user.days} days streak</p>
                          </div>
                        </div>
                        <div className="text-[16px]">🏆</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedDiscoverChallenge(null)}
                    className="flex-1 px-4 py-3 rounded-[100px] border-2 border-[#e2e6e7] text-[#2c3e50] font-semibold hover:bg-[#f0f0f0] transition-all"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      onOpenChallenge(selectedDiscoverChallenge);
                      setSelectedDiscoverChallenge(null);
                    }}
                    className="flex-1 px-4 py-3 rounded-[100px] bg-gradient-to-r from-[#4A90E2] to-[#A8D5BA] text-white font-semibold hover:shadow-lg transition-all"
                  >
                    Join Challenge
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Harmony AI Chat Button - Sticky bottom-right on all screens */}
      {onNavigateToSanctuary && !showCreateChallenge && !selectedDiscoverChallenge && (
        <motion.button
          onClick={onNavigateToSanctuary}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-[120px] right-[20px] z-50 w-[48px] h-[48px] rounded-full bg-gradient-to-br from-[#A8D5BA] to-[#4A90E2] flex items-center justify-center shadow-[0_0_20px_rgba(168,213,186,0.5),0_4px_12px_rgba(0,0,0,0.15)] border-2 border-[#F5A623]"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <MessageCircle className="w-6 h-6 text-white" strokeWidth={2.5} />
          {/* Mint glow effect */}
          <div className="absolute inset-0 rounded-full bg-[#A8D5BA] opacity-30 blur-md animate-pulse" />
        </motion.button>
      )}
    </div>
  );
}
