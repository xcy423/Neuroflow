import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, PanInfo } from "motion/react";
import { Settings2, Flower2, TreePine, Grid3x3, Plus, Trash2, Check, X } from "lucide-react";
import AnimatedHomeHeader from "./AnimatedHomeHeader";
import svgPaths from "../imports/svg-crqz6vj79k";
// Using a default emoji for stepsIcon since the figma asset import is invalid
const stepsIcon = "👟";

interface WidgetPosition {
  id: string;
  page: number;
  order: number;
  size: "small" | "medium" | "large";
}

export interface Widget {
  id: string;
  name: string;
  enabled: boolean;
  order: number;
  type: "streak" | "steps" | "sleep" | "hrv" | "wellnessScore" | "moodTrends";
}

interface UserSettings {
  showMascot: boolean;
  showSearchBar: boolean;
  showPlusButton: boolean;
}

interface SamsungHomeScreenProps {
  widgets: Widget[];
  userSettings: UserSettings;
  moodLogCount: number;
  streakDays: number;
  wellnessScore: number;
  onLayoutClick: () => void;
  onPlusClick: () => void;
  onSanctuaryClick: () => void;
  onWidgetClick: (widgetId: string) => void;
  onStreakClick: () => void;
}

export default function SamsungHomeScreen({
  widgets,
  userSettings,
  moodLogCount,
  streakDays,
  wellnessScore,
  onLayoutClick,
  onPlusClick,
  onSanctuaryClick,
  onWidgetClick,
  onStreakClick,
}: SamsungHomeScreenProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null);
  const [widgetPositions, setWidgetPositions] = useState<WidgetPosition[]>([
    { id: "streak", page: 0, order: 0, size: "medium" },
    { id: "steps", page: 0, order: 1, size: "large" },
    { id: "sleep", page: 0, order: 2, size: "large" },
    { id: "hrv", page: 1, order: 0, size: "medium" },
  ]);
  const [totalPages, setTotalPages] = useState(3);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);

  // Daily goals tracking
  const dailyGoals = [
    { id: "mood", label: "Log Mood", completed: moodLogCount > 0 },
    { id: "meditation", label: "Meditate", completed: true },
    { id: "exercise", label: "Exercise", completed: false },
  ];
  const completedGoals = dailyGoals.filter(g => g.completed).length;
  const totalGoals = dailyGoals.length;

  const enabledWidgets = widgets.filter(w => w.enabled).sort((a, b) => a.order - b.order);

  const handleSwapWidgets = (widgetId1: string, widgetId2: string) => {
    setWidgetPositions(prev => {
      const widget1 = prev.find(w => w.id === widgetId1);
      const widget2 = prev.find(w => w.id === widgetId2);
      
      if (!widget1 || !widget2) return prev;
      
      // Swap their positions
      return prev.map(w => {
        if (w.id === widgetId1) {
          return { ...w, page: widget2.page, order: widget2.order };
        }
        if (w.id === widgetId2) {
          return { ...w, page: widget1.page, order: widget1.order };
        }
        return w;
      });
    });
  };

  const handleWidgetClick = (widgetId: string) => {
    if (editMode) {
      if (selectedWidget === null) {
        // First widget selected
        setSelectedWidget(widgetId);
      } else if (selectedWidget === widgetId) {
        // Clicking the same widget - deselect
        setSelectedWidget(null);
      } else {
        // Second widget selected - swap them
        handleSwapWidgets(selectedWidget, widgetId);
        setSelectedWidget(null);
      }
    } else {
      // Normal mode - trigger widget actions
      if (widgetId === "streak") {
        onStreakClick();
      } else {
        onWidgetClick(widgetId);
      }
    }
  };

  const handleSaveLayout = () => {
    setEditMode(false);
    setSelectedWidget(null);
    setShowSaveConfirm(true);
    setTimeout(() => setShowSaveConfirm(false), 2000);
  };

  const handleAddWidget = (widgetType: string) => {
    const newPosition: WidgetPosition = {
      id: widgetType,
      page: currentPage,
      order: widgetPositions.filter(w => w.page === currentPage).length,
      size: "medium",
    };
    setWidgetPositions([...widgetPositions, newPosition]);
    setShowGallery(false);
  };

  const handleRemoveWidget = (widgetId: string) => {
    setWidgetPositions(widgetPositions.filter(w => w.id !== widgetId));
  };

  const getWidgetsByPage = (page: number) => {
    return widgetPositions
      .filter(w => w.page === page)
      .sort((a, b) => a.order - b.order);
  };

  const availableWidgets = [
    { id: "streak", name: "Mood Log Streak", icon: "🔥" },
    { id: "steps", name: "Steps", icon: "👟" },
    { id: "sleep", name: "Sleep Score", icon: "😴" },
    { id: "hrv", name: "HRV", icon: "💓" },
    { id: "wellnessScore", name: "Wellness Score", icon: "✨" },
    { id: "moodTrends", name: "Mood Trends", icon: "😊" },
  ].filter(w => !widgetPositions.find(wp => wp.id === w.id));

  const renderWidget = (widgetId: string, position: WidgetPosition) => {
    const isSelected = selectedWidget === widgetId;

    switch (widgetId) {
      case "streak":
        // Mock mood data for the week (Sun-Sat)
        const weekMoods = [
          { emoji: "😊", filled: true, color: "#A8D5BA" }, // Sun - positive
          { emoji: "😌", filled: true, color: "#B8D9F0" }, // Mon - calm
          { emoji: "😊", filled: true, color: "#A8D5BA" }, // Tue - positive
          { emoji: "😔", filled: true, color: "#C8DFED" }, // Wed - low
          { emoji: "😊", filled: true, color: "#A8D5BA" }, // Thu - positive
          { emoji: "😊", filled: true, color: "#A8D5BA" }, // Fri - positive
          { emoji: "", filled: false, color: "#F5A623" },  // Sat (Today) - pending
        ];
        const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        
        return (
          <motion.div
            layout
            layoutId={`widget-${widgetId}`}
            whileHover={!editMode ? { scale: 1.01 } : {}}
            whileTap={!editMode ? { scale: 0.99 } : {}}
            onClick={() => handleWidgetClick(widgetId)}
            className={`bg-white border-2 rounded-[20px] shadow-[0_2px_12px_rgba(0,0,0,0.06)] cursor-pointer relative ${
              isSelected ? "border-[#4A90E2] ring-4 ring-[#4A90E2]/30" : "border-[#e2e6e7]"
            } ${editMode ? "animate-wiggle" : ""}`}
            style={{
              padding: "28px",
            }}
          >
            {editMode && (
              <button
                onClick={() => handleRemoveWidget(widgetId)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-md z-10"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            )}
            
            {/* Main Content - Vertical Layout */}
            <div className="flex flex-col gap-4">
              {/* Top Row: Flame Icon + Streak Info */}
              <div className="flex items-center gap-3">
                {/* Flame Icon - Smaller */}
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-[48px] h-[48px] rounded-full flex items-center justify-center relative flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #F5A623 0%, #F8BC4A 100%)",
                    boxShadow: "0 4px 20px rgba(245, 166, 35, 0.4), 0 0 40px rgba(245, 166, 35, 0.2)",
                  }}
                >
                  <span className="text-[28px]">🔥</span>
                </motion.div>

                {/* Streak Number and Title */}
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[48px] font-bold text-[#2C3E50] leading-none tracking-tight" style={{ fontFamily: "Poppins, sans-serif" }}>
                      {moodLogCount}
                    </span>
                    <span className="text-[18px] font-bold text-[#2C3E50]" style={{ fontFamily: "Poppins, sans-serif" }}>
                      Days
                    </span>
                  </div>
                  <p className="text-[14px] text-[#868686] mt-1">Mood Log Streak</p>
                </div>
              </div>
              {/* End of Top Row */}

              {/* Bottom Row: Day Circles */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    {weekMoods.map((mood, index) => {
                      const isToday = index === 6;
                      return (
                        <motion.div
                          key={index}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="relative flex flex-col items-center"
                        >
                          {/* Day Circle */}
                          <motion.div
                            animate={
                              mood.filled && !isToday
                                ? {
                                    scale: [1, 1.05, 1],
                                  }
                                : {}
                            }
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: index * 0.3,
                              ease: "easeInOut",
                            }}
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-[18px] transition-all ${
                              isToday
                                ? "border-3 border-[#F5A623] bg-white ring-4 ring-[#F5A623]/20"
                                : mood.filled
                                ? "border-2"
                                : "border-2 border-[#F5A623] border-dashed"
                            }`}
                            style={{
                              backgroundColor: mood.filled && !isToday ? mood.color : isToday ? "white" : "transparent",
                              borderColor: mood.filled && !isToday ? mood.color : "#F5A623",
                              boxShadow: isToday ? "0 0 20px rgba(245, 166, 35, 0.3)" : "none",
                            }}
                          >
                            {mood.filled ? mood.emoji : ""}
                            {isToday && (
                              <motion.span
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="text-[#F5A623] text-[20px]"
                              >
                                🔥
                              </motion.span>
                            )}
                          </motion.div>
                        </motion.div>
                      );
                    })}
                  </div>
                  
                  {/* Day Labels */}
                  <div className="flex items-center gap-2">
                    {dayLabels.map((label, index) => (
                      <div key={index} className="w-10 text-center">
                        <span className={`text-[9px] ${index === 6 ? "text-[#F5A623] font-semibold" : "text-[#b0b0b0]"}`}>
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Today Label */}
                  <div className="flex items-center justify-end" style={{ marginLeft: "calc(6 * 48px)" }}>
                    <span className="text-[11px] text-[#F5A623] font-semibold">Today</span>
                  </div>
                </div>
              </div>
            
            {/* Bottom Left: Mascot Nudge - Clickable to log mood */}
            <div 
              onClick={(e) => {
                e.stopPropagation(); // Prevent widget click
                onPlusClick();
              }}
              className="absolute bottom-4 left-4 flex items-center gap-2 cursor-pointer group"
            >
              {/* Mascot Emoji - on the left */}
              <motion.div
                animate={{
                  y: [0, -4, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-[#A8D5BA] to-[#4A90E2] flex items-center justify-center text-[16px] shadow-md group-hover:scale-110 transition-transform"
              >
                🌸
              </motion.div>
              
              {/* Text Bubble - on the right */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white border border-[#e2e6e7] rounded-[12px] px-3 py-2 shadow-md group-hover:border-[#4A90E2] group-hover:shadow-lg transition-all"
              >
                <p className="text-[11px] text-[#4A90E2] font-semibold">Log today's mood?</p>
              </motion.div>
            </div>
          </motion.div>
        );

      case "steps":
        return (
          <motion.div
            key={`steps-widget-${currentPage}`}
            layout
            whileHover={!editMode ? { scale: 1.01 } : {}}
            whileTap={!editMode ? { scale: 0.99 } : {}}
            onClick={() => handleWidgetClick(widgetId)}
            className={`bg-white border-2 rounded-[16px] p-5 shadow-sm cursor-pointer relative ${
              isSelected ? "border-[#4A90E2] ring-4 ring-[#4A90E2]/30" : "border-[#e2e6e7]"
            } ${editMode ? "animate-wiggle" : ""}`}
          >
            {editMode && (
              <button
                onClick={() => handleRemoveWidget(widgetId)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-md z-10"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            )}
            
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[16px] text-[#4a90e2]">Steps</h3>
              <div className="w-10 h-10 rounded-full bg-[#B8D9F0] flex items-center justify-center">
                <span className="text-2xl">{stepsIcon}</span>
              </div>
            </div>

            {/* Main Content: Steps count on left, Progress ring on right */}
            <div className="flex items-center justify-between mb-4">
              {/* Left: Step count */}
              <div className="flex items-baseline gap-1">
                <p className="text-[24px] text-[#4a90e2] font-bold leading-tight">6514</p>
                <p className="text-[20px] text-[#868686] leading-tight">/8000</p>
              </div>

              {/* Right: Animated Progress Ring */}
              <div className="relative w-[120px] h-[120px]">
                {/* Background circle */}
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="#ECF0F1"
                    strokeWidth="10"
                    fill="none"
                  />
                </svg>
                
                {/* Animated progress circle - starts at 12 o'clock, fills clockwise */}
                <svg className="absolute inset-0 w-full h-full -rotate-90" key={`steps-progress-${currentPage}`}>
                  <defs>
                    <linearGradient id="stepsGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#4A90E2" />
                      <stop offset="100%" stopColor="#A8D5BA" />
                    </linearGradient>
                  </defs>
                  <motion.circle
                    key={`steps-circle-${currentPage}`}
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="url(#stepsGradient)"
                    strokeWidth="10"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: "314", strokeDashoffset: "314" }}
                    animate={{ strokeDashoffset: "59.66" }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                  />
                </svg>

                {/* Percentage badge with fade-in - no background box */}
                <motion.div
                  key={`steps-badge-${currentPage}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <p className="text-[20px] font-bold text-[#4a90e2]">81%</p>
                </motion.div>
              </div>
            </div>

            {/* Footer: Date */}
            <p className="text-[12px] text-[#868686]">6 Nov 2025</p>
          </motion.div>
        );

      case "sleep":
        return (
          <motion.div
            layout
            layoutId={`widget-${widgetId}`}
            whileHover={!editMode ? { scale: 1.01 } : {}}
            whileTap={!editMode ? { scale: 0.99 } : {}}
            onClick={() => handleWidgetClick(widgetId)}
            className={`bg-white border-2 rounded-[16px] p-6 shadow-sm cursor-pointer relative ${
              isSelected ? "border-[#4A90E2] ring-4 ring-[#4A90E2]/30" : "border-[#e2e6e7]"
            } ${editMode ? "animate-wiggle" : ""}`}
          >
            {editMode && (
              <button
                onClick={() => handleRemoveWidget(widgetId)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-md z-10"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            )}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-[16px] font-bold text-[#2c3e50]">Sleep Score</h3>
                <p className="text-[12px] text-[#868686] mt-1">Last night</p>
              </div>
              <div className="text-right">
                <p className="text-[28px] font-bold text-[#A8D5BA]">78</p>
                <p className="text-[12px] text-[#868686]">7.5 hours</p>
              </div>
            </div>

            <div className="flex items-end justify-between h-20 gap-2">
              {[65, 72, 78, 81, 75, 70, 78].map((score, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-[#E8F4FD] rounded-t-md overflow-hidden relative">
                    <motion.div
                      className="w-full bg-gradient-to-t from-[#4A90E2] to-[#A8D5BA]"
                      initial={{ height: 0 }}
                      animate={{ height: `${score}px` }}
                      transition={{ delay: i * 0.1, duration: 0.3 }}
                    />
                  </div>
                  <p className="text-[9px] text-[#868686]">
                    {["S", "M", "T", "W", "T", "F", "S"][i]}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        );

      case "hrv":
        return (
          <motion.div
            layout
            layoutId={`widget-${widgetId}`}
            whileHover={!editMode ? { scale: 1.01 } : {}}
            whileTap={!editMode ? { scale: 0.99 } : {}}
            onClick={() => handleWidgetClick(widgetId)}
            className={`bg-white border-2 rounded-[16px] p-5 shadow-sm cursor-pointer relative ${
              isSelected ? "border-[#4A90E2] ring-4 ring-[#4A90E2]/30" : "border-[#e2e6e7]"
            } ${editMode ? "animate-wiggle" : ""}`}
          >
            {editMode && (
              <button
                onClick={() => handleRemoveWidget(widgetId)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-md z-10"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            )}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[14px] font-semibold text-[#2c3e50]">HRV</h3>
                <p className="text-[24px] font-bold text-[#F5A623] mt-1">73.2</p>
                <p className="text-[11px] text-[#868686]">ms • Good</p>
              </div>
              <div className="w-24 h-16 relative">
                <svg className="w-full h-full" viewBox="0 0 100 60">
                  <motion.path
                    d="M 5,30 Q 15,20 25,25 T 45,30 Q 55,35 65,28 T 85,32 L 95,30"
                    fill="none"
                    stroke="#F5A623"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        );

      case "wellnessScore":
        return (
          <motion.div
            layout
            layoutId={`widget-${widgetId}`}
            whileHover={!editMode ? { scale: 1.01 } : {}}
            whileTap={!editMode ? { scale: 0.99 } : {}}
            onClick={() => handleWidgetClick(widgetId)}
            className={`bg-white border-2 rounded-[16px] p-5 shadow-sm cursor-pointer relative ${
              isSelected ? "border-[#4A90E2] ring-4 ring-[#4A90E2]/30" : "border-[#e2e6e7]"
            } ${editMode ? "animate-wiggle" : ""}`}
          >
            {editMode && (
              <button
                onClick={() => handleRemoveWidget(widgetId)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-md z-10"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            )}
            <h3 className="text-[14px] font-semibold text-[#2c3e50] mb-3">Wellness Score</h3>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#4A90E2] to-[#A8D5BA] flex items-center justify-center flex-shrink-0">
                <span className="text-white text-[20px] font-bold">{wellnessScore}</span>
              </div>
              <div className="flex-1">
                <div className="w-full h-3 bg-[#ECF0F1] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#4A90E2] to-[#A8D5BA] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${wellnessScore}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
                <p className="text-[11px] text-[#868686] mt-2">Great progress! 🌟</p>
              </div>
            </div>
          </motion.div>
        );

      case "moodTrends":
        return (
          <motion.div
            layout
            layoutId={`widget-${widgetId}`}
            whileHover={!editMode ? { scale: 1.01 } : {}}
            whileTap={!editMode ? { scale: 0.99 } : {}}
            onClick={() => handleWidgetClick(widgetId)}
            className={`bg-white border-2 rounded-[16px] p-5 shadow-sm cursor-pointer relative ${
              isSelected ? "border-[#4A90E2] ring-4 ring-[#4A90E2]/30" : "border-[#e2e6e7]"
            } ${editMode ? "animate-wiggle" : ""}`}
          >
            {editMode && (
              <button
                onClick={() => handleRemoveWidget(widgetId)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-md z-10"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            )}
            <h3 className="text-[14px] font-semibold text-[#2c3e50] mb-3">Mood Trends</h3>
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                {["😊", "😌", "😊", "😃", "😌", "😊", "😃"].map((emoji, i) => (
                  <div key={i} className="w-8 h-8 bg-[#E8F4FD] rounded-full flex items-center justify-center text-sm">
                    {emoji}
                  </div>
                ))}
              </div>
            </div>
            <p className="text-[11px] text-[#868686] mt-3">Mostly positive this week 💙</p>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
  <div className="absolute inset-0 w-full min-h-screen bg-[#fcfcfc] overflow-x-hidden">
      
      {/* Combined Top Section: Dynamic Island Space + Greeting Bar - Sticky with 100% opacity */}
      <div className="sticky top-0 z-40 bg-[#fcfcfc] backdrop-blur-sm">
        {/* CRITICAL: Extra Top Spacing for Dynamic Island - Reduced to 30px */}
        <div className="h-[30px]" />
        
        {/* Animated Header with Logo and Slogan */}
        <AnimatedHomeHeader />
        
        {/* Daily Goal Progress Bar */}
        <div className="border-b border-[#e2e6e7]/50 px-5 pt-3 pb-5">
          <div className="flex items-center justify-between">
          {/* Left: Goal Progress */}
          <div className="flex items-center gap-3 flex-1">
            <div className="bg-gradient-to-br from-[#4A90E2] to-[#A8D5BA] rounded-full px-4 py-2 shadow-sm">
              <p className="text-[14px] font-bold text-white">
                {completedGoals}/{totalGoals} Goals
              </p>
            </div>
            
            {/* Progress Dots */}
            <div className="flex items-center gap-1.5">
              {dailyGoals.map((goal) => (
                <div
                  key={goal.id}
                  className={`w-2 h-2 rounded-full transition-all ${
                    goal.completed 
                      ? "bg-[#A8D5BA] scale-110" 
                      : "bg-[#e2e6e7]"
                  }`}
                  title={goal.label}
                />
              ))}
            </div>
            
            {/* Completion indicator */}
            {completedGoals === totalGoals && (
              <span className="text-[14px]">✨</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-full bg-white border border-[#e2e6e7] shadow-sm flex items-center justify-center hover:bg-[#E8F4FD] transition-all">
              <Flower2 className="w-4 h-4 text-[#A8D5BA]" />
            </button>
            <button className="w-9 h-9 rounded-full bg-white border border-[#e2e6e7] shadow-sm flex items-center justify-center hover:bg-[#E8F4FD] transition-all">
              <TreePine className="w-4 h-4 text-[#A8D5BA]" />
            </button>
            <button className="w-9 h-9 rounded-full bg-white border border-[#e2e6e7] shadow-sm flex items-center justify-center hover:bg-[#E8F4FD] transition-all">
              <Grid3x3 className="w-4 h-4 text-[#868686]" />
            </button>
            
            {editMode ? (
              <button
                onClick={handleSaveLayout}
                className="w-9 h-9 rounded-full bg-[#A8D5BA] shadow-md flex items-center justify-center hover:bg-[#98C5AA] transition-all ml-1"
              >
                <Check className="w-4 h-4 text-white" />
              </button>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="w-9 h-9 rounded-full bg-[#4A90E2] shadow-md flex items-center justify-center hover:bg-[#3A80D2] transition-all ml-1"
              >
                <Settings2 className="w-4 h-4 text-white" />
              </button>
            )}
          </div>
          </div>
        </div>
      </div>
      {/* End of sticky top section */}

      {/* Edit Mode Instructions */}
      <AnimatePresence>
        {editMode && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-[#4A90E2] text-white px-6 py-3 text-center"
          >
            <p className="text-[13px] font-semibold">
              {selectedWidget ? "Tap another widget to swap positions" : "Tap a widget to select it"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Swipeable Dashboard Pages */}
      <div className="relative overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: `-${currentPage * 100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {[...Array(totalPages)].map((_, pageIndex) => (
            <div
              key={pageIndex}
              className="w-full flex-shrink-0 pb-32 px-5 pt-8"
            >
              {/* Widgets for this page - 28px spacing between widgets */}
              <div className="flex flex-col gap-[28px]">
                <AnimatePresence mode="popLayout">
                  {getWidgetsByPage(pageIndex).map((position) => (
                    <div key={position.id}>
                      {renderWidget(position.id, position)}
                    </div>
                  ))}
                </AnimatePresence>

                {/* Add Widget Button (only in edit mode) */}
                {editMode && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => setShowGallery(true)}
                    className="w-full bg-white border-2 border-dashed border-[#4A90E2] rounded-[16px] p-8 flex flex-col items-center justify-center gap-2 hover:bg-[#E8F4FD] transition-all"
                  >
                    <Plus className="w-8 h-8 text-[#4A90E2]" />
                    <p className="text-[14px] font-semibold text-[#4A90E2]">Add Widget</p>
                  </motion.button>
                )}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Page Indicators */}
        <div className="absolute bottom-24 left-0 right-0 flex items-center justify-center gap-2 pointer-events-none">
          {[...Array(totalPages)].map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === currentPage
                  ? "w-6 bg-[#4A90E2]"
                  : "w-2 bg-[#e2e6e7]"
              }`}
            />
          ))}
        </div>

        {/* Page Navigation Arrows (in edit mode) */}
        {editMode && totalPages > 1 && (
          <>
            {currentPage > 0 && (
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center"
              >
                <span className="text-[#4A90E2]">←</span>
              </button>
            )}
            {currentPage < totalPages - 1 && (
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center"
              >
                <span className="text-[#4A90E2]">→</span>
              </button>
            )}
          </>
        )}
      </div>

      {/* Widget Gallery Modal */}
      <AnimatePresence>
        {showGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end"
            onClick={() => setShowGallery(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-white rounded-t-[24px] p-6 max-h-[70vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[20px] font-bold text-[#2c3e50]">Add Widgets</h2>
                <button
                  onClick={() => setShowGallery(false)}
                  className="w-8 h-8 rounded-full bg-[#f0f0f0] flex items-center justify-center"
                >
                  <X className="w-5 h-5 text-[#868686]" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {availableWidgets.map((widget) => (
                  <motion.button
                    key={widget.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAddWidget(widget.id)}
                    className="bg-gradient-to-br from-[#E8F4FD] to-[#f5f5f5] border border-[#e2e6e7] rounded-[16px] p-6 flex flex-col items-center gap-3 hover:shadow-md transition-all"
                  >
                    <div className="text-4xl">{widget.icon}</div>
                    <p className="text-[14px] font-semibold text-[#2c3e50]">{widget.name}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Save Confirmation */}
      <AnimatePresence>
        {showSaveConfirm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-1/2 -translate-x-1/2 bg-[#A8D5BA] text-white px-6 py-3 rounded-full shadow-lg z-50"
          >
            <p className="text-[14px] font-semibold flex items-center gap-2">
              <Check className="w-4 h-4" />
              Layout Saved!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
