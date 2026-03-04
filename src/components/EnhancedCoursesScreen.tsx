import { useState, useEffect, useRef } from "react";
import { Search, ArrowLeft, Play, ChevronDown, Clock, Users, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Session {
  id: number;
  title: string;
  description: string;
  category: string;
  participants: number;
  duration: string;
  progress: number;
  currentSession: number;
  totalSessions: number;
  enrolledDate: Date;
  guidelines: string[];
}

interface EnhancedCoursesScreenProps {
  onNavigateHome: () => void;
}

const ALL_SESSIONS: Session[] = [
  {
    id: 1,
    title: "Meditation basics",
    description: "Inhale for 4, hold for 4, exhale for 4",
    category: "Mental",
    participants: 100,
    duration: "10 min",
    progress: 25,
    currentSession: 2,
    totalSessions: 8,
    enrolledDate: new Date("2025-11-01"),
    guidelines: ["Find a quiet space", "Sit comfortably", "Close your eyes", "Focus on breath"],
  },
  {
    id: 2,
    title: "Morning Yoga Flow",
    description: "Gentle stretches to start your day",
    category: "Physical",
    participants: 156,
    duration: "15 min",
    progress: 60,
    currentSession: 5,
    totalSessions: 8,
    enrolledDate: new Date("2025-11-08"),
    guidelines: ["Use a yoga mat", "Wear comfortable clothes", "Start slowly", "Listen to your body"],
  },
  {
    id: 3,
    title: "Sleep Meditation",
    description: "Guided meditation for better sleep quality",
    category: "Mental",
    participants: 234,
    duration: "20 min",
    progress: 10,
    currentSession: 1,
    totalSessions: 10,
    enrolledDate: new Date("2025-11-05"),
    guidelines: ["Lie down comfortably", "Dim the lights", "Put phone on silent", "Relax completely"],
  },
  {
    id: 4,
    title: "Body Scan Relaxation",
    description: "Systematic relaxation from head to toe",
    category: "Mental",
    participants: 89,
    duration: "12 min",
    progress: 0,
    currentSession: 0,
    totalSessions: 6,
    enrolledDate: new Date("2025-10-20"),
    guidelines: ["Lie flat on your back", "Breathe naturally", "Scan each body part", "Release tension slowly"],
  },
  {
    id: 5,
    title: "Mindful Walking",
    description: "Stay present with every step you take",
    category: "Physical",
    participants: 72,
    duration: "8 min",
    progress: 0,
    currentSession: 0,
    totalSessions: 5,
    enrolledDate: new Date("2025-10-15"),
    guidelines: ["Find a quiet path", "Walk slowly", "Focus on sensations", "Breathe deeply"],
  },
];

const SORT_OPTIONS = [
  { value: "date-recent", label: "Date (Recent First)" },
  { value: "date-oldest", label: "Date (Oldest First)" },
  { value: "progress-high", label: "Progress (High to Low)" },
  { value: "progress-low", label: "Progress (Low to High)" },
  { value: "title-az", label: "Title (A–Z)" },
  { value: "title-za", label: "Title (Z–A)" },
];

export default function EnhancedCoursesScreen({ onNavigateHome }: EnhancedCoursesScreenProps) {
  const [activeTab, setActiveTab] = useState<"my" | "discover">("my");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCardId, setActiveCardId] = useState<number | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [sortBy, setSortBy] = useState<"date-recent" | "date-oldest" | "progress-high" | "progress-low" | "title-az" | "title-za">("date-recent");
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const courses = ALL_SESSIONS;
  const enrolledCourses = courses.filter(c => c.progress > 0);
  const completedCount = enrolledCourses.filter(c => c.progress === 100).length;
  const enrolledCount = enrolledCourses.length;
  const currentSortLabel = SORT_OPTIONS.find(o => o.value === sortBy)?.label?.split(" ")[0] ?? "Date";

  // Sort courses based on selected option
  const getSortedCourses = () => {
    const coursesToSort = activeTab === "my" ? enrolledCourses : courses;
    let sorted = [...coursesToSort];

    // Apply search filter if in discover tab
    if (activeTab === "discover" && searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      sorted = sorted.filter((course) => {
        return (
          course.title.toLowerCase().includes(query) ||
          course.category.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query)
        );
      });
    }

    switch (sortBy) {
      case "date-recent":
        return sorted.sort((a, b) => b.enrolledDate.getTime() - a.enrolledDate.getTime());
      case "date-oldest":
        return sorted.sort((a, b) => a.enrolledDate.getTime() - b.enrolledDate.getTime());
      case "progress-high":
        return sorted.sort((a, b) => b.progress - a.progress);
      case "progress-low":
        return sorted.sort((a, b) => a.progress - b.progress);
      case "title-az":
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case "title-za":
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return sorted;
    }
  };

  const sortedCourses = getSortedCourses();

  // Handle card tap
  const handleCardTap = (courseId: number) => {
    if (activeCardId === courseId) {
      // Already active, do nothing (wait for button tap)
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
    setActiveCardId(courseId);

    // Set timer to fade out button after 3 seconds
    timerRef.current = setTimeout(() => {
      setActiveCardId(null);
    }, 3000);
  };

  // Handle button tap
  const handleButtonTap = (e: React.MouseEvent, courseId: number) => {
    e.stopPropagation();
    
    // Vibration feedback
    if (window.navigator.vibrate) {
      window.navigator.vibrate(20);
    }

    // Navigate to session screen
    setSelectedCourse(courseId);
    
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

  // Session Detail View
  if (selectedCourse !== null) {
    const course = courses.find(c => c.id === selectedCourse);
    if (!course) return null;
    const circumference = 2 * Math.PI * 30;

    return (
      <div className="bg-white relative size-full overflow-hidden">
        <div className="h-[30px] bg-white" />
        <div className="size-full overflow-y-auto pb-8">
          {/* Header */}
          <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[#E5E7EB] px-5 py-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedCourse(null)}
                className="w-9 h-9 rounded-full bg-[#F3F4F6] flex items-center justify-center hover:bg-[#E5E7EB] transition-all"
              >
                <ArrowLeft className="w-5 h-5 text-[#1F2937]" />
              </button>
              <h1 className="font-bold text-[18px] text-[#1F2937]">{course.title}</h1>
            </div>
          </div>

          <div className="px-5 pt-5">
            {/* Hero progress card */}
            <div className="bg-gradient-to-br from-[#EEF6FF] to-white rounded-[20px] p-5 border border-[#DBEAFE] shadow-[0_4px_20px_rgba(74,159,255,0.10)] mb-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[13px] text-[#6B7280] mb-1">Session Progress</p>
                  <p className="text-[26px] font-bold text-[#4A9FFF]">
                    {course.currentSession} <span className="text-[16px] font-medium text-[#9CA3AF]">/ {course.totalSessions}</span>
                  </p>
                </div>
                <div className="relative size-[72px]">
                  <svg className="size-full -rotate-90" viewBox="0 0 72 72">
                    <circle cx="36" cy="36" r="30" fill="none" stroke="#E5E7EB" strokeWidth="7" />
                    <circle
                      cx="36" cy="36" r="30" fill="none" stroke="#4A9FFF" strokeWidth="7"
                      strokeDasharray={`${(course.progress / 100) * circumference} ${circumference}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[15px] font-bold text-[#4A9FFF] leading-none">{course.progress}%</span>
                  </div>
                </div>
              </div>
              <div className="w-full h-2.5 bg-[#E5E7EB] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#4A9FFF] to-[#A7D8B6] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${course.progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Duration badge */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-2 bg-[#FFF8ED] rounded-[100px] px-4 py-2">
                <Clock className="w-4 h-4 text-[#FFB74D]" />
                <span className="text-[14px] font-bold text-[#FFB74D]">{course.duration}</span>
              </div>
              <div className="flex items-center gap-2 bg-[#ECFDF5] rounded-[100px] px-4 py-2">
                <span className="text-[13px] font-semibold text-[#2D7A52]">{course.category}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#F9FAFB] rounded-[100px] px-3 py-2">
                <Users className="w-4 h-4 text-[#9CA3AF]" />
                <span className="text-[13px] text-[#6B7280]">{course.participants}</span>
              </div>
            </div>

            {/* Guidelines */}
            <div className="bg-white rounded-[20px] border border-[#E5E7EB] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.06)] mb-5">
              <h3 className="text-[15px] font-bold text-[#1F2937] mb-4">Session Guidelines</h3>
              <div className="space-y-3">
                {course.guidelines.map((guideline, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#EEF6FF] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[11px] font-bold text-[#4A9FFF]">{index + 1}</span>
                    </div>
                    <p className="text-[14px] text-[#374151] flex-1">{guideline}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Play area */}
            <div className="bg-white rounded-[20px] border border-[#E5E7EB] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] mb-5 text-center">
              <div className="w-28 h-28 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#4A9FFF] to-[#A7D8B6] flex items-center justify-center shadow-[0_8px_24px_rgba(74,159,255,0.30)]">
                <Play className="w-11 h-11 text-white ml-1" />
              </div>
              <p className="text-[13px] text-[#9CA3AF] mb-1">Session Duration</p>
              <p className="text-[30px] font-bold text-[#1F2937]">{course.duration}</p>
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-gradient-to-r from-[#4A9FFF] to-[#3B82F6] text-white py-4 rounded-[16px] font-bold text-[16px] shadow-[0_4px_14px_rgba(59,130,246,0.35)] flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" />
              Start Session
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  // Main Sessions List View
  const circumference = 2 * Math.PI * 33.75;
  const sortOptions = SORT_OPTIONS;

  return (
    <div className="bg-[#fcfcfc] relative w-full h-full flex flex-col">
      {/* Dynamic Island spacer */}
      <div className="h-[30px] flex-shrink-0" />

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-28">
        <div className="flex flex-col gap-5">

          {/* -- Tab bar -- */}
          <div className="sticky top-0 z-40 bg-[#fcfcfc]/95 backdrop-blur-sm pt-3 pb-1" style={{ paddingLeft: "32px", paddingRight: "32px" }}>
            <div className="bg-[#ecf0f1] flex items-center p-[2px] rounded-[100px]" style={{ height: "56px" }}>
              {/* Sessions (active) */}
              <button
                onClick={() => setActiveTab("my")}
                className="relative h-full flex items-center justify-center gap-3 rounded-[100px] px-7 transition-all shrink-0"
                style={{ width: "187px" }}
              >
                {activeTab === "my" && (
                  <motion.div
                    layoutId="figmaTab"
                    className="absolute inset-0 bg-white rounded-[100px]"
                    style={{ boxShadow: "0px 0px 2px 0px white, 0px 0px 12px 0px rgba(44,62,80,0.12)" }}
                    transition={{ type: "spring", stiffness: 350, damping: 32 }}
                  />
                )}
                <div className="relative z-10 w-5 h-[25px] flex-shrink-0">
                  <svg className="size-full" fill="none" viewBox="0 0 19 25">
                    <path d="M0.5 3.5C0.500013 2.9734 0.638639 2.45609 0.901943 2.00004C1.16525 1.544 1.54395 1.1653 2 0.902V21.5C2 21.8978 2.15804 22.2794 2.43934 22.5607C2.72064 22.842 3.10218 23 3.5 23H15.5C15.8978 23 16.2794 22.842 16.5607 22.5607C16.842 22.2794 17 21.8978 17 21.5V3.5C17 3.10218 16.842 2.72064 16.5607 2.43934C16.2794 2.15804 15.8978 2 15.5 2H12.5V0.5H15.5C16.2956 0.5 17.0587 0.81607 17.6213 1.37868C18.1839 1.94129 18.5 2.70435 18.5 3.5V21.5C18.5 22.2956 18.1839 23.0587 17.6213 23.6213C17.0587 24.1839 16.2956 24.5 15.5 24.5H3.5C2.70435 24.5 1.94129 24.1839 1.37868 23.6213C0.81607 23.0587 0.5 22.2956 0.5 21.5V3.5ZM3.5 0.5V10.25C3.5 10.3893 3.53879 10.5258 3.61201 10.6443C3.68524 10.7628 3.79001 10.8585 3.91459 10.9208C4.03917 10.9831 4.17863 11.0095 4.31735 10.997C4.45608 10.9845 4.58857 10.9336 4.7 10.85L7.25 8.9375L9.8 10.85C9.91143 10.9336 10.0439 10.9845 10.1826 10.997C10.3214 11.0095 10.4608 10.9831 10.5854 10.9208C10.71 10.8585 10.8148 10.7628 10.888 10.6443C10.9612 10.5258 11 10.3893 11 10.25V0.5H3.5ZM5 8.75V2H9.5V8.75L7.7 7.4C7.57018 7.30263 7.41228 7.25 7.25 7.25C7.08772 7.25 6.92982 7.30263 6.8 7.4L5 8.75Z" fill="#2C3E50" stroke="#2C3E50" />
                  </svg>
                </div>
                <span className="relative z-10 font-bold text-[16px] text-[#2c3e50] whitespace-nowrap" style={{ fontFamily: "'Raleway', sans-serif" }}>
                  Sessions
                </span>
              </button>
              {/* Discover */}
              <button
                onClick={() => setActiveTab("discover")}
                className="relative h-full flex items-center justify-center gap-3 rounded-[100px] px-7 transition-all flex-1"
              >
                {activeTab === "discover" && (
                  <motion.div
                    layoutId="figmaTab"
                    className="absolute inset-0 bg-white rounded-[100px]"
                    style={{ boxShadow: "0px 0px 2px 0px white, 0px 0px 12px 0px rgba(44,62,80,0.12)" }}
                    transition={{ type: "spring", stiffness: 350, damping: 32 }}
                  />
                )}
                <span className="relative z-10 font-bold text-[16px] text-[#2c3e50] whitespace-nowrap" style={{ fontFamily: "'Raleway', sans-serif" }}>
                  Discover
                </span>
              </button>
            </div>
          </div>

          {/* -- Sort/Enrolled row (My tab) -- */}
          {activeTab === "my" && (
            <div className="flex items-center justify-between" style={{ paddingLeft: "32px", paddingRight: "32px" }}>
              {/* Enrolled count */}
              <div className="flex gap-2 items-center px-3 py-1">
                <div className="w-5 h-[25px] flex-shrink-0">
                  <svg className="size-full" fill="none" viewBox="0 0 19 25">
                    <path d="M0.5 3.5C0.500013 2.9734 0.638639 2.45609 0.901943 2.00004C1.16525 1.544 1.54395 1.1653 2 0.902V21.5C2 21.8978 2.15804 22.2794 2.43934 22.5607C2.72064 22.842 3.10218 23 3.5 23H15.5C15.8978 23 16.2794 22.842 16.5607 22.5607C16.842 22.2794 17 21.8978 17 21.5V3.5C17 3.10218 16.842 2.72064 16.5607 2.43934C16.2794 2.15804 15.8978 2 15.5 2H12.5V0.5H15.5C16.2956 0.5 17.0587 0.81607 17.6213 1.37868C18.1839 1.94129 18.5 2.70435 18.5 3.5V21.5C18.5 22.2956 18.1839 23.0587 17.6213 23.6213C17.0587 24.1839 16.2956 24.5 15.5 24.5H3.5C2.70435 24.5 1.94129 24.1839 1.37868 23.6213C0.81607 23.0587 0.5 22.2956 0.5 21.5V3.5ZM3.5 0.5V10.25C3.5 10.3893 3.53879 10.5258 3.61201 10.6443C3.68524 10.7628 3.79001 10.8585 3.91459 10.9208C4.03917 10.9831 4.17863 11.0095 4.31735 10.997C4.45608 10.9845 4.58857 10.9336 4.7 10.85L7.25 8.9375L9.8 10.85C9.91143 10.9336 10.0439 10.9845 10.1826 10.997C10.3214 11.0095 10.4608 10.9831 10.5854 10.9208C10.71 10.8585 10.8148 10.7628 10.888 10.6443C10.9612 10.5258 11 10.3893 11 10.25V0.5H3.5ZM5 8.75V2H9.5V8.75L7.7 7.4C7.57018 7.30263 7.41228 7.25 7.25 7.25C7.08772 7.25 6.92982 7.30263 6.8 7.4L5 8.75Z" fill="#2C3E50" stroke="#2C3E50" />
                  </svg>
                </div>
                <span className="font-bold text-[16px] text-[#2c3e50]" style={{ fontFamily: "'Raleway', sans-serif" }}>{enrolledCount}</span>
                <span className="font-medium text-[14px] text-[#2c3e50]" style={{ fontFamily: "'Raleway', sans-serif" }}>Enrolled</span>
              </div>
              {/* Sort dropdown */}
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex items-center gap-1 px-3 py-2 h-9 rounded-[8px] hover:bg-[#E8F4FD] transition-all"
                >
                  <span className="font-bold text-[14px] text-[#2c3e50]" style={{ fontFamily: "'Raleway', sans-serif" }}>{currentSortLabel}</span>
                  <div className="relative size-[15px]">
                    <div className="absolute flex items-center justify-center inset-0">
                      <motion.div
                        className="size-[12px]"
                        animate={{ rotate: showSortDropdown ? 0 : -90 }}
                        transition={{ duration: 0.2 }}
                      >
                        <svg className="block size-full" fill="none" viewBox="0 0 7 12">
                          <path d="M1 1L6 6L1 11" stroke="#2C3E50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                </button>
                <AnimatePresence>
                  {showSortDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-11 right-0 bg-white border border-[#e2e6e7] rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] overflow-hidden z-50 min-w-[210px]"
                    >
                      {sortOptions.map((option, index) => (
                        <button
                          key={option.value}
                          onClick={() => { setSortBy(option.value as typeof sortBy); setShowSortDropdown(false); }}
                          className={`w-full px-4 py-3 text-left text-[14px] transition-all ${
                            sortBy === option.value ? "bg-[#4A90E2] text-white font-semibold" : "text-[#2c3e50] hover:bg-[#E8F4FD]"
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
          )}

          {/* -- Discover search + sort -- */}
          {activeTab === "discover" && (
            <div className="pt-1 pb-1" style={{ paddingLeft: "32px", paddingRight: "32px" }}>
              <div className="flex items-center gap-3 bg-white rounded-[100px] shadow-[0_2px_12px_rgba(0,0,0,0.08)] border border-[#e2e6e7] py-3 px-5 mb-3">
                <Search className="w-4 h-4 text-[#80646f] flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search sessions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-[14px] text-[#2c3e50] placeholder-[#80646f] focus:outline-none"
                />
              </div>
              <div ref={dropdownRef} className="flex justify-end relative">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex items-center gap-1 px-3 py-2 rounded-[8px] hover:bg-[#E8F4FD] transition-all"
                >
                  <span className="font-bold text-[14px] text-[#2c3e50]" style={{ fontFamily: "'Raleway', sans-serif" }}>{currentSortLabel}</span>
                  <motion.div
                    className="size-[12px] ml-0.5"
                    animate={{ rotate: showSortDropdown ? 0 : -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg className="block size-full" fill="none" viewBox="0 0 7 12">
                      <path d="M1 1L6 6L1 11" stroke="#2C3E50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.div>
                </button>
                <AnimatePresence>
                  {showSortDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-11 right-0 bg-white border border-[#e2e6e7] rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] overflow-hidden z-50 min-w-[210px]"
                    >
                      {sortOptions.map((option, index) => (
                        <button
                          key={option.value}
                          onClick={() => { setSortBy(option.value as typeof sortBy); setShowSortDropdown(false); }}
                          className={`w-full px-4 py-3 text-left text-[14px] transition-all ${
                            sortBy === option.value ? "bg-[#4A90E2] text-white font-semibold" : "text-[#2c3e50] hover:bg-[#E8F4FD]"
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
          )}

          {/* -- Session cards -- */}
          <div className="flex flex-col gap-5 pb-6" style={{ paddingLeft: "32px", paddingRight: "32px" }}>
            {sortedCourses.map((session) => {
              const dashLen = (session.progress / 100) * circumference;
              const isActive = activeCardId === session.id;
              return (
                <motion.div
                  key={session.id}
                  onClick={() => handleCardTap(session.id)}
                  whileTap={{ scale: 0.99 }}
                  className="bg-white flex flex-col gap-3 p-4 rounded-[16px] relative cursor-pointer select-none"
                  style={{ boxShadow: "0px 0px 2px 0px white, 0px 0px 12px 0px rgba(44,62,80,0.12)" }}
                >
                  {/* Figma inner shadow overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none rounded-[16px]"
                    style={{ boxShadow: "inset 0px 0px 4px 0px rgba(44,62,80,0.24)" }}
                  />

                  {/* Main content row */}
                  <div className="flex items-start justify-between w-full" style={{ height: "114.312px" }}>
                    {/* Left: title / tags / description — justify-between for equal auto spacing */}
                    <div className="flex flex-col items-start justify-between self-stretch shrink-0" style={{ maxWidth: "calc(100% - 108px)" }}>
                      {/* Title */}
                      <span
                        className="font-bold text-[16px] text-black whitespace-nowrap overflow-hidden text-ellipsis"
                        style={{ fontFamily: "'Raleway', sans-serif" }}
                      >
                        {session.title}
                      </span>

                      {/* Tags: category + participants */}
                      <div className="flex gap-[7px] items-center">
                        <div
                          className="flex items-center justify-center px-[4px] py-[2px] rounded-[4px]"
                          style={{ backgroundImage: "linear-gradient(90deg, rgba(168,213,186,0.2) 0%, rgba(168,213,186,0.2) 100%), linear-gradient(90deg, white 0%, white 100%)" }}
                        >
                          <span className="font-semibold text-[14px] text-[#a8d5ba] whitespace-nowrap" style={{ fontFamily: "'Inter', sans-serif" }}>
                            {session.category}
                          </span>
                        </div>
                        <div className="flex gap-[4px] items-center px-[4px] py-[2px]">
                          <svg className="size-[18px]" fill="none" viewBox="0 0 15 13">
                            <path d="M10.5 6C11.8807 6 13 4.88071 13 3.5C13 2.11929 11.8807 1 10.5 1C9.11929 1 8 2.11929 8 3.5C8 4.88071 9.11929 6 10.5 6Z" stroke="#80646F" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4.5 6C5.88071 6 7 4.88071 7 3.5C7 2.11929 5.88071 1 4.5 1C3.11929 1 2 2.11929 2 3.5C2 4.88071 3.11929 6 4.5 6Z" stroke="#80646F" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M14 12C14 9.79086 12.433 8 10.5 8C9.44921 8 8.50494 8.51427 7.83984 9.33337" stroke="#80646F" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8.16797 9.33337C7.50194 8.51427 6.55862 8 5.50781 8C3.56641 8 2 9.79086 2 12" stroke="#80646F" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span className="font-medium text-[14px] text-[#80646f]" style={{ fontFamily: "'Inter', sans-serif" }}>{session.participants}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <span
                        className="font-medium text-[12px] text-black whitespace-nowrap overflow-hidden text-ellipsis"
                        style={{ fontFamily: "'Raleway', sans-serif" }}
                      >
                        {session.description}
                      </span>
                    </div>

                    {/* Right: time badge + progress ring */}
                    <div className="flex flex-col gap-[12px] items-end self-stretch shrink-0 w-[100px]">
                      {/* Orange time badge */}
                      <div
                        className="flex gap-[4px] items-center justify-center px-[8px] py-[2px] rounded-[4px]"
                        style={{ backgroundImage: "linear-gradient(90deg, rgba(245,166,35,0.2) 0%, rgba(245,166,35,0.2) 100%), linear-gradient(90deg, white 0%, white 100%)" }}
                      >
                        <svg className="size-[16px] shrink-0" fill="none" viewBox="0 0 14 14">
                          <circle cx="7" cy="7" r="5.5" stroke="#F5A623" strokeWidth="1.5" />
                          <path d="M7 4.5V7L8.5 8.5" stroke="#F5A623" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="font-bold text-[14px] text-[#f5a623] whitespace-nowrap" style={{ fontFamily: "'Inter', sans-serif" }}>{session.duration}</span>
                      </div>

                      {/* Progress ring 75�75 */}
                      <div className="relative size-[75px]">
                        <svg className="block size-full -rotate-90" viewBox="0 0 75 75">
                          <circle cx="37.5" cy="37.5" r="33.75" fill="none" stroke="#ECF0F1" strokeWidth="7.5" />
                          <circle
                            cx="37.5" cy="37.5" r="33.75"
                            fill="none" stroke="#4A90E2" strokeWidth="7.5"
                            strokeDasharray={`${dashLen} ${circumference}`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <div className="flex items-baseline leading-none">
                            <span className="font-bold text-[12px] text-[#4a90e2] leading-none" style={{ fontFamily: "'Poppins', sans-serif" }}>
                              {session.currentSession}
                            </span>
                            <span className="font-light text-[9px] text-[#4a90e2] leading-none" style={{ fontFamily: "'Poppins', sans-serif" }}>
                              /{session.totalSessions}
                            </span>
                          </div>
                          <span className="font-light text-[9px] text-[#4a90e2] leading-none" style={{ fontFamily: "'Poppins', sans-serif" }}>
                            {session.progress}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tap-to-reveal CTA */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.button
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        onClick={(e) => handleButtonTap(e, session.id)}
                        className="w-full bg-[#4a90e2] text-white py-3 rounded-[8px] font-bold text-[14px] hover:bg-[#3A80D2] transition-all flex items-center justify-center"
                        style={{ boxShadow: "0px 4px 0px 0px #477baf" }}
                      >
                        {session.progress > 0 ? "Continue Session" : "Join Now"}
                      </motion.button>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}

