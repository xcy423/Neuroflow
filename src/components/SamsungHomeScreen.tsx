import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, PanInfo } from "motion/react";
import { Plus, Trash2, Check, X } from "lucide-react";
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
      case "streak": {
        const weekMoods = [
          { emoji: "🔥", filled: true },
          { emoji: "🔥", filled: true },
          { emoji: "🔥", filled: true },
          { emoji: "🔥", filled: true },
          { emoji: "", filled: false },
          { emoji: "", filled: false },
          { emoji: "", filled: false },
        ];
        const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return (
          <motion.div
            layout
            layoutId={`widget-${widgetId}`}
            whileHover={!editMode ? { scale: 1.01 } : {}}
            whileTap={!editMode ? { scale: 0.99 } : {}}
            onClick={() => handleWidgetClick(widgetId)}
            className={`bg-white rounded-[20px] cursor-pointer relative w-full flex flex-col justify-between items-start ${
              isSelected ? "border-2 border-[#4A90E2] ring-4 ring-[#4A90E2]/30" : ""
            } ${editMode ? "animate-wiggle" : ""}`}
            style={{ boxShadow: "0px 0px 2px 0px #fff, 0px 0px 12px 0px rgba(44,62,80,0.12)", border: isSelected ? undefined : "1px solid #E2E6E7", height: "200px", padding: "16px 20px" }}
          >
            {editMode && (
              <button onClick={() => handleRemoveWidget(widgetId)} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-md z-10">
                <X className="w-4 h-4 text-white" />
              </button>
            )}
            {/* Title row */}
            <p className="text-[15px] font-bold text-[#2c3e50]">Mood Log Streak</p>
            {/* Streak count + day circles side by side */}
            <div className="flex items-center gap-3">
              {/* Flame + count */}
              <div className="flex flex-col items-center flex-shrink-0 mr-1">
                <motion.span
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="text-[32px] leading-none"
                >🔥</motion.span>
                <p className="text-[13px] font-bold text-[#2c3e50] mt-1">{moodLogCount} Days</p>
              </div>
              {/* Day circles */}
              <div className="flex flex-col gap-1 flex-1">
                <div className="flex items-center justify-between">
                  {weekMoods.map((mood, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-[16px]"
                        style={{
                          background: mood.filled ? "#FFF3DC" : "transparent",
                          border: mood.filled ? "1.5px solid #F5A623" : "1.5px dashed #d0d5d8",
                        }}
                      >
                        {mood.filled ? mood.emoji : ""}
                      </div>
                      <span className="text-[9px] text-[#b0b0b0]">{dayLabels[i]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );
      }

      case "steps":
        return (
          <motion.div
            key={`steps-widget-${currentPage}`}
            layout
            whileHover={!editMode ? { scale: 1.01 } : {}}
            whileTap={!editMode ? { scale: 0.99 } : {}}
            onClick={() => handleWidgetClick(widgetId)}
            className={`bg-white rounded-[20px] cursor-pointer relative w-full flex flex-col justify-between items-start ${
              isSelected ? "border-2 border-[#4A90E2] ring-4 ring-[#4A90E2]/30" : ""
            } ${editMode ? "animate-wiggle" : ""}`}
            style={{ boxShadow: "0px 0px 2px 0px #fff, 0px 0px 12px 0px rgba(44,62,80,0.12)", border: isSelected ? undefined : "1px solid #E2E6E7", height: "200px", padding: "16px 20px" }}
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
            <div className="flex items-center justify-between w-full">
              <h3 className="text-[16px] text-[#4a90e2]">Steps</h3>
              <div className="w-10 h-10 rounded-full bg-[#B8D9F0] flex items-center justify-center">
                <span className="text-2xl">{stepsIcon}</span>
              </div>
            </div>

            {/* Main Content: Steps count on left, Progress ring on right */}
            <div className="flex items-center justify-between w-full">
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

      case "sleep": {
        // Each entry: total bar height in px (blue top + green bottom, equal halves)
        const sleepBars = [60, 60, 70, 60, 50, 60, 80, 88, 90, 100, 100, 90];
        return (
          <motion.div
            layout
            layoutId={`widget-${widgetId}`}
            whileHover={!editMode ? { scale: 1.01 } : {}}
            whileTap={!editMode ? { scale: 0.99 } : {}}
            onClick={() => handleWidgetClick(widgetId)}
            className={`bg-white rounded-[16px] cursor-pointer relative w-full flex flex-col ${
              isSelected ? "border-2 border-[#4A90E2] ring-4 ring-[#4A90E2]/30" : ""
            } ${editMode ? "animate-wiggle" : ""}`}
            style={{
              boxShadow: "0px 0px 2px 0px #fff, 0px 0px 12px 0px rgba(44,62,80,0.12)",
              border: isSelected ? undefined : "1px solid #E2E6E7",
              height: "200px",
              padding: "16px 20px 16px 20px",
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

            {/* Header row: title + score on left, moon icon on right */}
            <div className="flex items-start justify-between w-full mb-1">
              <div>
                <p className="text-[16px] font-bold text-[#4A90E2] leading-tight">Sleep Score</p>
                <p className="text-[13px] text-[#868686] mt-0.5">Actual Sleep&nbsp;&nbsp;7.5 h</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-[22px] font-bold text-[#4A90E2]">78</span>
                <div
                  className="p-[6px] rounded-full flex items-center justify-center"
                  style={{ background: "rgba(168,213,186,0.5)" }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                      fill="#A8D5BA"
                      stroke="#A8D5BA"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Dual-segment bar chart — fills remaining vertical space, bottom-aligned */}
            <div className="flex items-end justify-between flex-1 w-full">
              {sleepBars.map((totalH, i) => {
                const half = totalH / 2;
                return (
                  <div
                    key={i}
                    className="flex flex-col items-stretch justify-end"
                    style={{ width: "12px", height: `${totalH}px` }}
                  >
                    {/* Blue top segment */}
                    <motion.div
                      className="w-full rounded-[100px]"
                      initial={{ height: 0 }}
                      animate={{ height: `${half}px` }}
                      transition={{ duration: 0.5, delay: i * 0.04, ease: "easeOut" }}
                      style={{ background: "rgba(74,144,226,0.5)", marginBottom: "2px", flexShrink: 0 }}
                    />
                    {/* Green bottom segment */}
                    <motion.div
                      className="w-full rounded-[100px]"
                      initial={{ height: 0 }}
                      animate={{ height: `${half}px` }}
                      transition={{ duration: 0.5, delay: i * 0.04 + 0.05, ease: "easeOut" }}
                      style={{ background: "rgba(168,213,186,0.5)", flexShrink: 0 }}
                    />
                  </div>
                );
              })}
            </div>
          </motion.div>
        );
      }

      case "hrv":
        return (
          <motion.div
            layout
            layoutId={`widget-${widgetId}`}
            whileHover={!editMode ? { scale: 1.01 } : {}}
            whileTap={!editMode ? { scale: 0.99 } : {}}
            onClick={() => handleWidgetClick(widgetId)}
            className={`bg-white rounded-[16px] cursor-pointer relative w-full flex flex-col justify-between items-start ${
              isSelected ? "border-2 border-[#4A90E2] ring-4 ring-[#4A90E2]/30" : ""
            } ${editMode ? "animate-wiggle" : ""}`}
            style={{ boxShadow: "0px 0px 2px 0px #fff, 0px 0px 12px 0px rgba(44,62,80,0.12)", border: isSelected ? undefined : "1px solid #E2E6E7", height: "200px", padding: "16px 20px" }}
          >
            {editMode && (
              <button
                onClick={() => handleRemoveWidget(widgetId)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-md z-10"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            )}
            <div className="flex items-center justify-between w-full">
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
            className={`bg-white rounded-[16px] cursor-pointer relative w-full flex flex-col justify-between items-start ${
              isSelected ? "border-2 border-[#4A90E2] ring-4 ring-[#4A90E2]/30" : ""
            } ${editMode ? "animate-wiggle" : ""}`}
            style={{ boxShadow: "0px 0px 2px 0px #fff, 0px 0px 12px 0px rgba(44,62,80,0.12)", border: isSelected ? undefined : "1px solid #E2E6E7", height: "200px", padding: "16px 20px" }}
          >
            {editMode && (
              <button
                onClick={() => handleRemoveWidget(widgetId)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-md z-10"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            )}
            <h3 className="text-[14px] font-semibold text-[#2c3e50]">Wellness Score</h3>
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
            className={`bg-white rounded-[16px] cursor-pointer relative w-full flex flex-col justify-between items-start ${
              isSelected ? "border-2 border-[#4A90E2] ring-4 ring-[#4A90E2]/30" : ""
            } ${editMode ? "animate-wiggle" : ""}`}
            style={{ boxShadow: "0px 0px 2px 0px #fff, 0px 0px 12px 0px rgba(44,62,80,0.12)", border: isSelected ? undefined : "1px solid #E2E6E7", height: "200px", padding: "16px 20px" }}
          >
            {editMode && (
              <button
                onClick={() => handleRemoveWidget(widgetId)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-md z-10"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            )}
            <h3 className="text-[14px] font-semibold text-[#2c3e50]">Mood Trends</h3>
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
  <div className="absolute inset-0 w-full min-h-screen bg-[#f4f6f8] overflow-x-hidden">

      {/* Sticky top: DI + NeuroFlow + Greeting */}
      <div className="sticky top-0 z-40 bg-[#f4f6f8]">
        {/* DI spacer */}
        <div className="h-[30px]" />

        {/* NeuroFlow animated header with inline edit button */}
        <AnimatedHomeHeader
          editMode={editMode}
          onEditClick={() => setEditMode(true)}
          onSaveClick={handleSaveLayout}
        />
      </div>
      {/* End sticky top */}

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
              className="w-full flex-shrink-0"
              style={{ padding: "20px 32px 56px 32px" }}>
              {/* Widgets — gap 20px, full-width */}
              <div className="flex flex-col gap-5 items-stretch w-full">
                <AnimatePresence mode="popLayout">
                  {getWidgetsByPage(pageIndex).map((position) => (
                    <div key={position.id} className="w-full">
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
