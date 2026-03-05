import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Plus, Sparkles, MessageCircle, X } from "lucide-react";
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
  onCreateChallengeModalChange?: (isOpen: boolean) => void;
  onNavigateToSanctuary?: () => void;
}

export default function EnhancedChallengesScreen({ onNavigateHome, onOpenChallenge, onCreateChallengeModalChange, onNavigateToSanctuary }: EnhancedChallengesScreenProps) {
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
    onCreateChallengeModalChange?.(true);
    setCreateStep(1);
  };

  const handleCloseCreateChallenge = () => {
    setShowCreateChallenge(false);
    onCreateChallengeModalChange?.(false);
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

  const isStepValid = () => {
    if (createStep === 1) {
      return challengeTitle.trim() !== "" && challengeDescription.trim() !== "";
    }
    if (createStep === 2) {
      return goalType !== "" && targetValue.trim() !== "" && unit.trim() !== "" && duration.trim() !== "" && startDay.trim() !== "";
    }
    if (createStep === 3) {
      return visibility !== "" && maxParticipants.trim() !== "";
    }
    return false;
  };

  const handleNextStep = () => {
    // Validation for Step 1
    if (createStep === 1) {
      if (!challengeTitle.trim()) {
        alert("Please enter a challenge title");
        return;
      }
      if (!challengeDescription.trim()) {
        alert("Please enter a challenge description");
        return;
      }
    }
    
    // Validation for Step 2
    if (createStep === 2) {
      if (!goalType) {
        alert("Please select a goal type");
        return;
      }
      if (!targetValue.trim()) {
        alert("Please enter a target value");
        return;
      }
      if (!unit.trim()) {
        alert("Please enter a unit");
        return;
      }
      if (!duration.trim()) {
        alert("Please enter a duration");
        return;
      }
      if (!startDay.trim()) {
        alert("Please select a start day");
        return;
      }
    }
    
    // Validation for Step 3
    if (createStep === 3) {
      if (!visibility) {
        alert("Please select visibility");
        return;
      }
      if (!maxParticipants.trim()) {
        alert("Please enter max participants");
        return;
      }
    }

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

  // Sort and filter challenges based on selected option and search query
  const getSortedChallenges = () => {
    const challengesToSort = activeTab === "my" ? challenges : discoverChallenges;
    
    // First, filter by search query if in discover tab
    let filtered = [...challengesToSort];
    if (activeTab === "discover" && searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(challenge => 
        challenge.title.toLowerCase().includes(query) ||
        challenge.category.toLowerCase().includes(query) ||
        challenge.description?.toLowerCase().includes(query)
      );
    }

    // Then sort the filtered results
    switch (sortBy) {
      case "time-asc":
        return filtered.sort((a, b) => a.timeLeftMs - b.timeLeftMs);
      case "time-desc":
        return filtered.sort((a, b) => b.timeLeftMs - a.timeLeftMs);
      case "points-high":
        return filtered.sort((a, b) => b.points - a.points);
      case "points-low":
        return filtered.sort((a, b) => a.points - b.points);
      case "title-az":
        return filtered.sort((a, b) => a.title.localeCompare(b.title));
      case "title-za":
        return filtered.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return filtered;
    }
  };

  const activeChallenges = getSortedChallenges();
  
  const sortOptions = [
    { value: "time-asc", label: "Date" },
    { value: "time-desc", label: "Date (Latest)" },
    { value: "points-high", label: "Points (High-Low)" },
    { value: "points-low", label: "Points (Low-High)" },
    { value: "title-az", label: "Title (A-Z)" },
    { value: "title-za", label: "Title (Z-A)" },
  ];

  const currentSortLabel = sortOptions.find(opt => opt.value === sortBy)?.label || "Date";

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

      {/* Dimmed Overlay for Header when discover challenge is open */}
      <AnimatePresence>
        {selectedDiscoverChallenge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Unified Sticky Header: Tabs + (Stats & Sort when My Challenges) */}
      <div className={`sticky top-0 bg-[#fcfcfc] transition-all z-50 ${selectedDiscoverChallenge ? 'relative z-40' : ''}`}>
        <div className="h-[30px] bg-[#fcfcfc]" />
        
        {/* Tabs */}
        <div className="z-40 bg-[#fcfcfc]/95 backdrop-blur-sm pt-3 pb-5" style={{ paddingLeft: "32px", paddingRight: "32px" }}>
          {/* Figma: display flex, padding 2px, align-items center, gap -8px (overlap), flex 1 0 0, align-self stretch */}
          <div
            className="bg-[#ecf0f1] rounded-[100px] w-full max-w-md mx-auto"
            style={{ display: "flex", padding: "2px", alignItems: "stretch", gap: "0px", height: "56px" }}
          >
            {/* My Challenges tab */}
            <button
              onClick={() => setActiveTab("my")}
              className="relative flex-1 h-full flex items-center justify-center gap-[12px] rounded-[100px] font-bold text-[16px] text-[#2c3e50] transition-all"
              style={{ padding: "3px 28px" }}
            >
              {activeTab === "my" && (
                <motion.div
                  layoutId="activeChallengeTab"
                  className="absolute inset-0 bg-white rounded-[100px]"
                  style={{ boxShadow: "0px 1px 3px 0px rgba(44,62,80,0.12)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {/* Person/group icon — 24×24, always shown on My Challenges */}
              <svg className="relative z-10 size-[20px] flex-shrink-0" viewBox="0 0 24 24" fill="none">
                <circle cx="9" cy="7" r="3.5" fill="#2C3E50" />
                <path d="M2 20C2 16.134 5.13401 13 9 13C12.866 13 16 16.134 16 20" stroke="#2C3E50" strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="17" cy="8" r="2.5" fill="#2C3E50" />
                <path d="M15 20C15 17.791 16.791 16 19 16C20.105 16 21.105 16.448 21.828 17.172" stroke="#2C3E50" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <span className="relative z-10 whitespace-nowrap">My Challenges</span>
            </button>
            {/* Discover tab */}
            <button
              onClick={() => setActiveTab("discover")}
              className="relative flex-1 h-full flex items-center justify-center gap-[12px] rounded-[100px] font-bold text-[16px] text-[#2c3e50] transition-all"
              style={{ padding: "3px 28px" }}
            >
              {activeTab === "discover" && (
                <motion.div
                  layoutId="activeChallengeTab"
                  className="absolute inset-0 bg-white rounded-[100px]"
                  style={{ boxShadow: "0px 1px 3px 0px rgba(44,62,80,0.12)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 whitespace-nowrap">Discover</span>
            </button>
          </div>
        </div>
        {/* Active + Sort (only for My Challenges) */}
        {activeTab === "my" && (
          <div className="pt-5 pb-0" style={{ paddingLeft: "32px", paddingRight: "32px" }}>
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-[8px] px-[12px] py-[4px] rounded-[8px]">
                {/* Medal / achievement badge icon — Figma node 220-2283 */}
                <svg className="size-[20px] flex-shrink-0" viewBox="0 0 20 20" fill="none">
                  {/* Badge ribbon left */}
                  <path d="M7 11.5L5 17L8 15.5L10 17.5L10 12" fill="#2C3E50" opacity="0.7"/>
                  {/* Badge ribbon right */}
                  <path d="M13 11.5L15 17L12 15.5L10 17.5L10 12" fill="#2C3E50" opacity="0.7"/>
                  {/* Badge circle */}
                  <circle cx="10" cy="8" r="5.5" fill="#2C3E50"/>
                  {/* Star inside */}
                  <path d="M10 5L10.9 7.1L13.2 7.4L11.6 8.9L12.1 11.2L10 10L7.9 11.2L8.4 8.9L6.8 7.4L9.1 7.1L10 5Z" fill="white"/>
                </svg>
                <span className="text-[16px] font-bold text-[#2c3e50]">{activeCount}</span>
                <span className="text-[14px] font-medium text-[#2c3e50]">Active Challenges</span>
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
          <div className="pb-4 pt-4" style={{ paddingLeft: "32px", paddingRight: "32px" }}>
            {/* Search Bar - Above sorting dropdown - Always visible */}
            <div className="mb-4 flex justify-center">
              {/* Search Bar with Plus Button inside */}
              <div className="w-full max-w-md">
                <div className="flex items-center gap-3 bg-white rounded-[100px] shadow-md border border-[#e2e6e7] py-3 px-5">
                  <Search className="w-5 h-5 text-[#80646f] flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search challenges..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent text-[14px] text-[#2c3e50] placeholder-[#80646f] focus:outline-none min-w-0"
                  />
                  <button
                    onClick={handleCreateChallenge}
                    className="w-[40px] h-[40px] rounded-full bg-gradient-to-br from-[#4A90E2] to-[#5BA3E8] flex items-center justify-center hover:shadow-lg active:scale-95 transition-all flex-shrink-0"
                  >
                    <Plus className="w-5 h-5 text-white" strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            </div>
            
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
  <div className="pt-5 pb-8" style={{ paddingLeft: "32px", paddingRight: "32px" }}>

        <AnimatePresence mode="wait">
          {activeTab === "my" ? (
            <motion.div
              key="my-challenges"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-5 pb-6"
            >

              {/* Challenge Cards */}
              {activeChallenges.map((challenge) => {
                const userDays = challenge.topUsers.find(u => u.name === "You")?.days ?? 0;
                const progressPct = Math.min((userDays / 30) * 100, 100);
                return (
                <motion.div
                  key={challenge.id}
                  onClick={() => onOpenChallenge(challenge)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="bg-white flex flex-col items-start gap-3 p-4 rounded-[16px] relative cursor-pointer select-none w-full"
                  style={{ boxShadow: "0px 0px 2px 0px white, 0px 0px 12px 0px rgba(44,62,80,0.12)" }}
                >
                  {/* Top section: icon thumbnail + content — Figma Frame 73 + Frame 86, gap 12px */}
                  <div className="flex gap-[12px] items-stretch w-full">
                    {/* Icon container — Figma Frame 73: 54×54, inner padding 8px */}
                    <div
                      className="flex items-center justify-center flex-shrink-0 bg-[#ecf0f1] rounded-[8px]"
                      style={{ width: "54px", height: "54px", padding: "8px" }}
                    >
                      <span className="text-[28px] leading-none">{challenge.icon}</span>
                    </div>
                    {/* Right content — Figma Frame 86: flex-col justify-between, stretches to icon height */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      {/* Row 1: title + time-left — aligns with TOP of icon */}
                      <div className="flex items-center justify-between w-full">
                        <h3 className="text-[16px] font-bold text-[#2c3e50] leading-[100%] flex-1 min-w-0 pr-[6px]">
                          {challenge.title}
                        </h3>
                        <div className="flex items-center gap-[2px] flex-shrink-0">
                          <span className="text-[12px] font-bold text-[#f5a623] whitespace-nowrap">{challenge.timeLeft} left!</span>
                          <div className="relative size-[15px] flex-shrink-0">
                            <svg className="absolute block size-full" viewBox="0 0 12 15" fill="none">
                              <path d="M6 14C8.76142 14 11 11.7614 11 9C11 7 9.75 5.25 8.5 4C8.5 5.25 7.5 6 6.75 6C7.5 4.25 6.75 2 5 0.5C5 2 4.25 3.25 3 4.25C1.75 5.25 1 7 1 9C1 11.7614 3.23858 14 6 14Z" fill="#F5A623"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                      {/* Row 2: category pill + participants — aligns with BOTTOM of icon */}
                      <div className="flex items-center justify-between w-full">
                        <div
                          className="inline-flex items-center justify-center px-[4px] py-[2px] rounded-[4px] shrink-0"
                          style={{ background: "linear-gradient(90deg, rgba(168,213,186,0.2) 0%, rgba(168,213,186,0.2) 100%), linear-gradient(90deg, #fff 0%, #fff 100%)" }}
                        >
                          <span className="text-[14px] font-semibold text-[#a8d5ba]">{challenge.category}</span>
                        </div>
                        <div className="flex items-center gap-[4px] px-[4px] py-[2px] rounded-[4px]">
                          {/* People / group icon */}
                          <svg className="size-[18px] flex-shrink-0" viewBox="0 0 20 20" fill="none">
                            <circle cx="7" cy="6.5" r="2.5" fill="#2C3E50" />
                            <path d="M1.5 16C1.5 13.015 4.015 10.5 7 10.5" stroke="#2C3E50" strokeWidth="1.5" strokeLinecap="round" />
                            <circle cx="13" cy="6.5" r="3" fill="#2C3E50" />
                            <path d="M7 17C7 13.686 9.686 11 13 11C16.314 11 19 13.686 19 17" stroke="#2C3E50" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                          <span className="text-[14px] font-medium text-[#2c3e50]">{challenge.participants}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Progress + Top 3 section */}
                  <div className="flex flex-col gap-[8px] w-full">
                    {/* Progress label row */}
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[11px] font-semibold text-[#4a90e2]">Your Progress</span>
                      <span className="text-[11px] font-bold text-[#4a90e2]">{userDays} / 30 days</span>
                    </div>
                    {/* Progress bar + top 3 avatars side by side */}
                    <div className="flex items-center gap-[20px] w-full">
                      {/* Progress bar — padded right so track doesn't crowd the avatars */}
                      <div className="flex-1 min-w-0" style={{ paddingTop: "22px", paddingRight: "18px" }}>
                        {/* Outer: overflow visible so badge + glow dot can escape */}
                        <div className="relative w-full" style={{ height: "6px", overflow: "visible" }}>
                          {/* Gray track — full width, always visible */}
                          <div
                            className="absolute inset-0 rounded-[100px]"
                            style={{
                              background: "#E2E6E7",
                              boxShadow: "inset 0px 1px 3px rgba(0,0,0,0.08)",
                            }}
                          />
                          {/* Fill wrapper — clips fill to track bounds */}
                          <div
                            className="absolute inset-0 rounded-[100px]"
                            style={{ overflow: "hidden" }}
                          >
                            <motion.div
                              className="absolute left-0 top-0 bottom-0 rounded-[100px]"
                              style={{
                                background: "linear-gradient(90deg, #4A90E2 0%, #A8D5BA 100%)",
                              }}
                              initial={{ width: 0 }}
                              animate={{ width: `${progressPct}%` }}
                              transition={{ duration: 0.9, ease: "easeOut" }}
                            />
                          </div>
                          {/* Glow dot + % badge — positioned absolutely relative to outer, tracks fill tip */}
                          <motion.div
                            className="absolute top-0 bottom-0"
                            style={{ left: 0, width: `${progressPct}%`, overflow: "visible" }}
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPct}%` }}
                            transition={{ duration: 0.9, ease: "easeOut" }}
                          >
                            {/* Glow dot */}
                            <div
                              className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 rounded-full"
                              style={{
                                width: "10px",
                                height: "10px",
                                background: "#4A90E2",
                                boxShadow: "0px 0px 6px 2px rgba(74,144,226,0.55)",
                              }}
                            />
                            {/* Floating % pill badge */}
                            <motion.div
                              className="absolute flex items-center justify-center bg-white rounded-[100px]"
                              style={{
                                top: "-20px",
                                right: "0px",
                                transform: "translateX(50%)",
                                padding: "1px 5px",
                                minWidth: "28px",
                                border: "1px solid #D0D8E0",
                                boxShadow: "0px 1px 4px 0px rgba(74,144,226,0.30)",
                              }}
                              initial={{ opacity: 0, scale: 0.6 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.35, delay: 0.75 }}
                            >
                              <span style={{ fontSize: "9px", fontWeight: 700, color: "#4A90E2", lineHeight: "14px", whiteSpace: "nowrap" }}>
                                {Math.round(progressPct)}%
                              </span>
                            </motion.div>
                          </motion.div>
                        </div>
                      </div>
                      {/* Top 3 avatar icons — 32×32, 12px gap, "You" highlighted */}
                      <div className="flex items-center flex-shrink-0 gap-[12px]">
                        {challenge.topUsers.slice(0, 3).map((user: ChallengeUser, index: number) => {
                          const rankColors = ["#F5A623", "#A8A8B3", "#CD7F32"];
                          const isYou = user.name === "You";
                          return (
                            <div
                              key={index}
                              className="relative size-[32px] flex-shrink-0 rounded-full flex items-center justify-center"
                              style={{
                                background: isYou ? "#c2d9f5" : "#d8e4f0",
                                border: isYou ? "1.5px solid #4A90E2" : "1.5px solid transparent",
                              }}
                              title={`#${index + 1} ${user.name} — ${user.days}d`}
                            >
                              <svg className="size-[18px]" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="8" r="4" fill="#4a90e2" />
                                <path d="M4 20C4 16.134 7.58172 13 12 13C16.4183 13 20 16.134 20 20" stroke="#4a90e2" strokeWidth="2" strokeLinecap="round" />
                              </svg>
                              {/* Rank badge — gold / silver / bronze */}
                              <div
                                className="absolute -top-[5px] -right-[4px] size-[14px] rounded-full flex items-center justify-center"
                                style={{ background: rankColors[index], boxShadow: "0px 1px 3px rgba(0,0,0,0.22)" }}
                              >
                                <span className="text-[8px] font-bold text-white leading-none">{index + 1}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Inner shadow overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none rounded-[16px]"
                    style={{ boxShadow: "inset 0px 0px 4px 0px rgba(44,62,80,0.24)" }}
                  />
                </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="discover"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-5 pb-6"
            >
              {/* Discover challenges */}
              {activeChallenges.map((challenge) => (
                <motion.div
                  key={challenge.id}
                  onClick={() => setSelectedDiscoverChallenge(challenge)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="bg-white flex flex-col gap-3 p-4 rounded-[16px] relative cursor-pointer select-none"
                  style={{ boxShadow: "0px 0px 2px 0px white, 0px 0px 12px 0px rgba(44,62,80,0.12)" }}
                >
                  {/* Top section: same auto-layout as My Challenges cards — Figma Frame 73 + Frame 86, gap 12px */}
                  <div className="flex gap-[12px] items-stretch w-full">
                    {/* Icon container — Figma Frame 73: 54×54, inner padding 8px */}
                    <div
                      className="flex items-center justify-center flex-shrink-0 bg-[#ecf0f1] rounded-[8px]"
                      style={{ width: "54px", height: "54px", padding: "8px" }}
                    >
                      <span className="text-[28px] leading-none">{challenge.icon}</span>
                    </div>
                    {/* Right content — Figma Frame 86: flex-col justify-between, stretches to icon height */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      {/* Row 1: title + time-left — aligns with TOP of icon */}
                      <div className="flex items-center justify-between w-full">
                        <h3 className="text-[16px] font-bold text-[#2c3e50] leading-[100%] flex-1 min-w-0 pr-[6px]">
                          {challenge.title}
                        </h3>
                        <div className="flex items-center gap-[2px] flex-shrink-0">
                          <span className="text-[12px] font-bold text-[#f5a623] whitespace-nowrap">{challenge.timeLeft} left!</span>
                          <div className="relative size-[15px] flex-shrink-0">
                            <svg className="absolute block size-full" viewBox="0 0 12 15" fill="none">
                              <path d="M6 14C8.76142 14 11 11.7614 11 9C11 7 9.75 5.25 8.5 4C8.5 5.25 7.5 6 6.75 6C7.5 4.25 6.75 2 5 0.5C5 2 4.25 3.25 3 4.25C1.75 5.25 1 7 1 9C1 11.7614 3.23858 14 6 14Z" fill="#F5A623"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                      {/* Row 2: category pill + participants — aligns with BOTTOM of icon */}
                      <div className="flex items-center justify-between w-full">
                        <div
                          className="inline-flex items-center justify-center px-[4px] py-[2px] rounded-[4px] shrink-0"
                          style={{ background: "linear-gradient(90deg, rgba(168,213,186,0.2) 0%, rgba(168,213,186,0.2) 100%), linear-gradient(90deg, #fff 0%, #fff 100%)" }}
                        >
                          <span className="text-[14px] font-semibold text-[#a8d5ba]">{challenge.category}</span>
                        </div>
                        <div className="flex items-center gap-[4px] px-[4px] py-[2px] rounded-[4px]">
                          {/* People / group icon */}
                          <svg className="size-[18px] flex-shrink-0" viewBox="0 0 20 20" fill="none">
                            <circle cx="7" cy="6.5" r="2.5" fill="#2C3E50" />
                            <path d="M1.5 16C1.5 13.015 4.015 10.5 7 10.5" stroke="#2C3E50" strokeWidth="1.5" strokeLinecap="round" />
                            <circle cx="13" cy="6.5" r="3" fill="#2C3E50" />
                            <path d="M7 17C7 13.686 9.686 11 13 11C16.314 11 19 13.686 19 17" stroke="#2C3E50" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                          <span className="text-[14px] font-medium text-[#2c3e50]">{challenge.participants}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-[13px] text-[#80646f] leading-relaxed">
                    {challenge.description}
                  </p>

                  {/* Inner shadow overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none rounded-[16px]"
                    style={{ boxShadow: "inset 0px 0px 4px 0px rgba(44,62,80,0.24)" }}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Create Challenge Modal */}
      <AnimatePresence>
        {showCreateChallenge && (
          <div 
            className="fixed inset-0 bg-black/50 z-50 flex items-end animate-fade-in"
            onClick={handleCloseCreateChallenge}
          >
            <div 
              className="bg-white w-full max-w-[440px] mx-auto rounded-t-[32px] p-8 animate-slide-up max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-[24px] text-[#2c3e50]">
                  Create Challenge
                </h2>
                <button
                  onClick={handleCloseCreateChallenge}
                  className="size-[32px] rounded-full bg-[#ecf0f1] flex items-center justify-center hover:bg-[#d9d9d9] transition-colors"
                >
                  <X className="size-[20px]" strokeWidth={2} />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
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
                
              {/* AI Assistant Integration Hint */}
              {createStep === 1 && !challengeTitle && (
                <div className="mb-6 flex items-center justify-center gap-2 text-[11px] text-[#80646f]">
                  <Sparkles className="w-3.5 h-3.5 text-[#f5a623]" />
                  <span>Tip: Use GenAI for description ideas!</span>
                </div>
              )}

              {/* Content */}
              <div className="space-y-6">
                {createStep === 1 && (
                  <div className="space-y-8">
                    <div className="mb-8">
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
              <div className="flex items-center justify-center gap-2 mt-6">
                {/* Cancel/Back Button */}
                <button
                  onClick={createStep === 1 ? handleCloseCreateChallenge : handlePrevStep}
                  className="flex-1 py-4 rounded-[16px] font-bold text-[16px] transition-all bg-[#ecf0f1] text-[#2c3e50] hover:bg-[#d9d9d9] active:scale-95"
                >
                  {createStep === 1 ? "Cancel" : "Back"}
                </button>
                
                {/* Next/Publish Button */}
                <button
                  onClick={handleNextStep}
                  disabled={!isStepValid()}
                  className={`flex-1 py-4 rounded-[16px] font-bold text-[16px] transition-all ${
                    isStepValid()
                      ? "bg-[#4A90E2] text-white hover:bg-[#3A80D2] active:scale-95"
                      : "bg-[#ecf0f1] text-[#868686] cursor-not-allowed"
                  }`}
                >
                  {createStep === 3 ? "Publish" : "Next"}
                </button>
              </div>
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
        )}
      </AnimatePresence>

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
          className="fixed bottom-[120px] right-[20px] z-50 w-[48px] h-[48px] rounded-full overflow-hidden flex items-center justify-center shadow-[0_0_20px_rgba(168,213,186,0.5),0_4px_12px_rgba(0,0,0,0.15)]"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <img 
            src="https://i.postimg.cc/Jy5SJ4G0/image.png" 
            alt="AI Chat" 
            className="w-full h-full object-cover"
          />
        </motion.button>
      )}
    </div>
  );
}