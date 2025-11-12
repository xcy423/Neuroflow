import { useState, useEffect, useRef } from "react";
import { Search, ArrowLeft, Play } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import svgPaths from "../imports/svg-snij5ma8dm";

interface EnhancedCoursesScreenProps {
  onNavigateHome: () => void;
}

export default function EnhancedCoursesScreen({ onNavigateHome }: EnhancedCoursesScreenProps) {
  const [activeTab, setActiveTab] = useState<"my" | "discover">("my");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCardId, setActiveCardId] = useState<number | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [sortBy, setSortBy] = useState<"date-recent" | "date-oldest" | "progress-high" | "progress-low" | "title-az" | "title-za">("date-recent");
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const courses = [
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
      category: "Mental",
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
      description: "Guided meditation for better sleep",
      category: "Mental",
      participants: 234,
      duration: "20 min",
      progress: 0,
      currentSession: 0,
      totalSessions: 10,
      enrolledDate: new Date("2025-11-05"),
      guidelines: ["Lie down comfortably", "Dim the lights", "Put phone on silent", "Relax completely"],
    },
  ];

  const enrolledCourses = courses.filter(c => c.progress > 0);
  const completedCount = enrolledCourses.filter(c => c.progress === 100).length;
  const enrolledCount = enrolledCourses.length;

  // Sort courses based on selected option
  const getSortedCourses = () => {
    const coursesToSort = activeTab === "my" ? enrolledCourses : courses;
    const sorted = [...coursesToSort];

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

  const sortOptions = [
    { value: "date-recent", label: "Date (Recent First)" },
    { value: "date-oldest", label: "Date (Oldest First)" },
    { value: "progress-high", label: "Progress (High to Low)" },
    { value: "progress-low", label: "Progress (Low to High)" },
    { value: "title-az", label: "Title (A-Z)" },
    { value: "title-za", label: "Title (Z-A)" },
  ];

  const currentSortLabel = sortOptions.find(opt => opt.value === sortBy)?.label || "Date";

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

  // Session Screen View
  if (selectedCourse !== null) {
    const course = courses.find(c => c.id === selectedCourse);
    if (!course) return null;

    return (
      <div className="bg-[#fcfcfc] relative size-full overflow-hidden">
        {/* CRITICAL: Extra Top Spacing for Dynamic Island */}
        <div className="h-[80px] bg-[#fcfcfc]" />
        
        <div className="size-full overflow-y-auto pb-8">
          {/* Header */}
          <div className="sticky top-[80px] z-40 bg-[#fcfcfc]/95 backdrop-blur-sm border-b border-[#e2e6e7]/30 px-5 py-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedCourse(null)}
                className="w-9 h-9 rounded-full bg-white border border-[#e2e6e7] shadow-sm flex items-center justify-center hover:bg-[#E8F4FD] transition-all"
              >
                <ArrowLeft className="w-5 h-5 text-[#2c3e50]" />
              </button>
              <h1 className="font-bold text-[18px] text-[#2c3e50]">{course.title}</h1>
            </div>
          </div>

          {/* Session Content */}
          <div className="px-5 pt-6">
            {/* Course Progress */}
            <div className="bg-gradient-to-br from-[#E8F4FD] to-white rounded-[16px] p-6 border border-[#4A90E2]/20 shadow-sm mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[14px] text-[#868686] mb-1">Session Progress</p>
                  <p className="text-[24px] font-bold text-[#4A90E2]">
                    {course.currentSession} / {course.totalSessions}
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
                      strokeDasharray={`${(course.progress / 100) * 226} 226`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[16px] font-bold text-[#4A90E2]">{course.progress}%</span>
                  </div>
                </div>
              </div>
              <div className="w-full h-3 bg-white rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#4A90E2] to-[#A8D5BA] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${course.progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Session Guidelines */}
            <div className="bg-white rounded-[16px] border border-[#e2e6e7] p-5 shadow-sm mb-6">
              <h3 className="text-[16px] font-bold text-[#2c3e50] mb-4">Session Guidelines</h3>
              <div className="space-y-3">
                {course.guidelines.map((guideline, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#E8F4FD] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[12px] font-bold text-[#4A90E2]">{index + 1}</span>
                    </div>
                    <p className="text-[14px] text-[#2c3e50] flex-1">{guideline}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Session Timer Display */}
            <div className="bg-white rounded-[16px] border border-[#e2e6e7] p-6 shadow-sm mb-6 text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#4A90E2] to-[#A8D5BA] flex items-center justify-center shadow-lg">
                <Play className="w-12 h-12 text-white" />
              </div>
              <p className="text-[14px] text-[#868686] mb-2">Session Duration</p>
              <p className="text-[32px] font-bold text-[#2c3e50]">{course.duration}</p>
            </div>

            {/* Start Session Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-[#4A90E2] to-[#5BA0F2] text-white py-4 rounded-[16px] font-bold text-[16px] shadow-lg flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" />
              Start Session
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  // Main Courses List View
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
        <div className="sticky top-0 z-40 bg-[#fcfcfc]/95 backdrop-blur-sm px-5 py-3 border-b border-[#e2e6e7]/30">
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
              <span className="whitespace-nowrap">My Course</span>
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
          {/* Course Stats */}
          {activeTab === "my" && (
            <div className="flex gap-5 mb-7 flex-wrap justify-center">
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

          {/* Sort Dropdown */}
          {activeTab === "my" && (
            <div ref={dropdownRef} className="relative flex justify-end mb-7">
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

              {/* Dropdown Menu */}
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
          )}

          {/* Course List */}
          <div className="flex flex-col gap-7 pb-8">
            {sortedCourses.map((course) => (
              <motion.div
                key={course.id}
                onClick={() => handleCardTap(course.id)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`bg-white rounded-[16px] border border-[#4a90e2] p-4 relative overflow-hidden cursor-pointer transition-all ${
                  activeCardId === course.id
                    ? "shadow-[2px_8px_24px_0px_rgba(74,144,226,0.25)]"
                    : "shadow-[2px_4px_20px_0px_inset_rgba(168,213,186,0.1)]"
                }`}
              >
                {/* Background decoration */}
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

                <div className="relative z-10 flex items-start justify-between gap-4">
                  {/* Course Info */}
                  <div className="flex-1 flex flex-col justify-between min-h-[120px]">
                    <div className="flex gap-2 items-center mb-3">
                      <h3 className="font-bold text-[16px] text-black">{course.title}</h3>
                    </div>

                    <div className="flex gap-2 items-center mb-3 flex-wrap">
                      <div className="px-1 py-0.5 rounded-[4px] bg-[rgba(168,213,186,0.2)]">
                        <span className="text-[14px] font-semibold text-[#a8d5ba]">{course.category}</span>
                      </div>
                      <div className="flex gap-1 items-center px-1 py-0.5">
                        <div className="size-[18px]">
                          <svg className="block size-full" fill="none" viewBox="0 0 15 13">
                            <path d={svgPaths.p35213980} stroke="#80646F" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <span className="text-[14px] font-medium text-[#80646f]">{course.participants}</span>
                      </div>
                    </div>

                    <p className="text-[12px] text-black mb-0">{course.description}</p>
                  </div>

                  {/* Progress Circle & Duration */}
                  <div className="flex flex-col gap-3 items-end flex-shrink-0 w-[100px]">
                    <div className="px-2 py-0.5 rounded-[4px] bg-[rgba(245,166,35,0.2)] flex gap-1 items-center">
                      <div className="size-[16px]">
                        <svg className="block size-full" fill="none" viewBox="0 0 14 14">
                          <path d={svgPaths.p22243200} stroke="#F5A623" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                      </div>
                      <span className="text-[14px] font-bold text-[#f5a623]">{course.duration}</span>
                    </div>

                    {/* Progress Circle */}
                    <div className="relative size-[75px]">
                      <svg className="block size-full -rotate-90" viewBox="0 0 75 75">
                        <circle cx="37.5" cy="37.5" r="33.75" fill="none" stroke="#ECF0F1" strokeWidth="7.5" />
                        <circle
                          cx="37.5"
                          cy="37.5"
                          r="33.75"
                          fill="none"
                          stroke="#4A90E2"
                          strokeWidth="7.5"
                          strokeDasharray={`${(course.progress / 100) * 212} 212`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-[12px] font-bold text-[#4a90e2]">{course.currentSession}</span>
                        <span className="text-[9px] font-light text-[#4a90e2]">/{course.totalSessions}</span>
                        <span className="text-[9px] font-light text-[#4a90e2]">{course.progress}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tap-to-Reveal Button */}
                <AnimatePresence>
                  {activeCardId === course.id && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      onClick={(e) => handleButtonTap(e, course.id)}
                      className="w-full mt-4 bg-[#4a90e2] text-white py-3 rounded-[8px] font-bold text-[14px] hover:bg-[#3A80D2] active:translate-y-[2px] active:shadow-[0px_2px_0px_0px_#477baf] transition-all flex items-center justify-center shadow-[0px_4px_0px_0px_#477baf]"
                    >
                      {course.progress > 0 ? "Continue Course" : "Join Now"}
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
