import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, PanInfo } from "motion/react";
import { Settings2, Flower2, TreePine, Grid3x3, Plus, Trash2, Check, X } from "lucide-react";
import svgPaths from "../imports/svg-crqz6vj79k";
import stepsIcon from "figma:asset/95c42c7e0690d226fa0fba3f3608cd43fa7da972.png";

interface WidgetPosition {
  id: string;
  page: number;
  order: number;
  size: "small" | "medium" | "large";
}

interface Widget {
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
  const [widgetPositions, setWidgetPositions] = useState<WidgetPosition[]>([
    { id: "streak", page: 0, order: 0, size: "medium" },
    { id: "steps", page: 0, order: 1, size: "large" },
    { id: "sleep", page: 0, order: 2, size: "large" },
    { id: "hrv", page: 1, order: 0, size: "medium" },
  ]);
  const [draggedWidget, setDraggedWidget] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(3);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);

  const enabledWidgets = widgets.filter(w => w.enabled).sort((a, b) => a.order - b.order);

  const handleLongPress = (widgetId: string) => {
    longPressTimer.current = setTimeout(() => {
      setEditMode(true);
      setDraggedWidget(widgetId);
    }, 500);
  };

  const handlePressEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const handleDragEnd = (widgetId: string, info: PanInfo) => {
    // Handle page switching based on drag position
    const dragX = info.offset.x;
    if (Math.abs(dragX) > 150) {
      const direction = dragX > 0 ? -1 : 1;
      const newPage = Math.max(0, Math.min(totalPages - 1, currentPage + direction));
      
      setWidgetPositions(prev =>
        prev.map(w =>
          w.id === widgetId ? { ...w, page: newPage } : w
        )
      );
      setCurrentPage(newPage);
    }
    setDraggedWidget(null);
  };

  const handleSaveLayout = () => {
    setEditMode(false);
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
    const isBeingDragged = draggedWidget === widgetId;

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
            drag={editMode}
            dragElastic={0.1}
            dragMomentum={false}
            onDragEnd={(e, info) => handleDragEnd(widgetId, info)}
            onPointerDown={() => !editMode && handleLongPress(widgetId)}
            onPointerUp={handlePressEnd}
            onPointerLeave={handlePressEnd}
            whileHover={!editMode ? { scale: 1.01 } : {}}
            whileTap={!editMode ? { scale: 0.99 } : {}}
            onClick={() => !editMode && onStreakClick()}
            className={`bg-white border border-[#e2e6e7] rounded-[20px] cursor-pointer relative transition-shadow duration-200 ${
              isBeingDragged ? "z-50 shadow-2xl" : ""
            } ${editMode ? "shadow-[0_4px_20px_rgba(0,0,0,0.12)]" : "shadow-[0_2px_12px_rgba(0,0,0,0.06)]"}`}
            style={{
              touchAction: editMode ? "none" : "auto",
              padding: "28px",
            }}
          >
            {editMode && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveWidget(widgetId);
                  }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-md z-10"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
                {/* Orange Drag Handle */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 p-2 cursor-move">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F5A623]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F5A623]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F5A623]"></div>
                </div>
              </>
            )}
            
            {/* Main Content Grid */}
            <div className="grid grid-cols-[auto_1fr_auto] gap-6 items-center">
              {/* Left: Large Flame Icon with Glow */}
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
                className="w-[64px] h-[64px] rounded-full flex items-center justify-center relative"
                style={{
                  background: "linear-gradient(135deg, #F5A623 0%, #F8BC4A 100%)",
                  boxShadow: "0 4px 20px rgba(245, 166, 35, 0.4), 0 0 40px rgba(245, 166, 35, 0.2)",
                }}
              >
                <span className="text-[36px]">🔥</span>
              </motion.div>

              {/* Center: Streak Info + Day Circles */}
              <div className="flex flex-col gap-4" style={{ marginRight: "-4px" }}>
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

                {/* Horizontal Day Circles */}
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

              {/* Right: Motivational Note */}
              <div className="text-right">
                <p className="text-[14px] text-[#2C3E50] italic" style={{ fontFamily: "Lora, serif" }}>
                  Mostly positive<br />this week ❤️
                </p>
              </div>
            </div>

            {/* Bottom Right: Mascot Nudge */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white border border-[#e2e6e7] rounded-[12px] px-3 py-2 shadow-md"
              >
                <p className="text-[11px] text-[#4A90E2] font-semibold">Log today's mood?</p>
              </motion.div>
              <motion.div
                animate={{
                  y: [0, -4, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-[#A8D5BA] to-[#4A90E2] flex items-center justify-center text-[16px] shadow-md"
              >
                🌸
              </motion.div>
            </div>
          </motion.div>
        );

      case "steps":
        return (
          <motion.div
            layout
            layoutId={`widget-${widgetId}`}
            drag={editMode}
            dragElastic={0.1}
            dragMomentum={false}
            onDragEnd={(e, info) => handleDragEnd(widgetId, info)}
            onPointerDown={() => !editMode && handleLongPress(widgetId)}
            onPointerUp={handlePressEnd}
            onPointerLeave={handlePressEnd}
            whileHover={!editMode ? { scale: 1.01 } : {}}
            whileTap={!editMode ? { scale: 0.99 } : {}}
            onClick={() => !editMode && onWidgetClick("steps")}
            className={`bg-white border border-[#e2e6e7] rounded-[16px] p-5 cursor-pointer relative transition-shadow duration-200 ${
              isBeingDragged ? "z-50 shadow-2xl" : ""
            } ${editMode ? "shadow-[0_4px_20px_rgba(0,0,0,0.12)]" : "shadow-sm"}`}
          >
            {editMode && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveWidget(widgetId);
                  }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-md z-10"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
                {/* Orange Drag Handle */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 p-2 cursor-move">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F5A623]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F5A623]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F5A623]"></div>
                </div>
              </>
            )}
            
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[16px] text-[#4a90e2]">Steps</h3>
              <div className="w-10 h-10 rounded-full bg-[#B8D9F0] flex items-center justify-center">
                <img src={stepsIcon} alt="Steps" className="w-6 h-6 object-contain" />
              </div>
            </div>

            {/* Main Content: Steps count on left, Progress ring on right */}
            <div className="flex items-center justify-between mb-4">
              {/* Left: Step count */}
              <div className="flex flex-col">
                <p className="text-[24px] text-[#4a90e2] leading-tight mb-[-4px]">6514</p>
                <p className="text-[20px] text-[#868686] leading-tight">/8000</p>
              </div>

              {/* Right: Progress ring */}
              <div className="relative w-[120px] h-[120px]">
                {/* Outer white/blue ring */}
                <div className="absolute left-[7.05px] top-[7px] w-[115px] h-[115px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 115 115">
                    <path d={svgPaths.p2153e100} fill="white" />
                    <path d={svgPaths.p2153e100} fill="#4A90E2" fillOpacity="0.5" />
                  </svg>
                </div>
                
                {/* Progress arc with gradient */}
                <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.9961169958114624)+(var(--transform-inner-height)*0.08803948014974594)))] items-center justify-center left-0 top-0 w-[calc(1px*((var(--transform-inner-height)*0.9961169958114624)+(var(--transform-inner-width)*0.08803948014974594)))]" style={{ "--transform-inner-width": "120", "--transform-inner-height": "120" } as React.CSSProperties}>
                  <div className="flex-none rotate-[95.051deg]">
                    <div className="relative size-[120px]">
                      <div className="absolute bottom-0 left-0 right-[0.23%] top-[11.57%] m-[0px] p-[0px]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 120 107">
                          <path d={svgPaths.p2d995880} fill="#ECF0F1" />
                          <path d={svgPaths.p2d995880} fill="url(#stepsGradient)" fillOpacity="0.8" />
                          <defs>
                            <linearGradient gradientUnits="userSpaceOnUse" id="stepsGradient" x1="1.68096e-05" x2="120" y1="46.1201" y2="46.1201">
                              <stop stopColor="#4A90E2" />
                              <stop offset="1" stopColor="#A8D5BA" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Percentage badge */}
                <div className="absolute left-[62.05px] top-[41px] box-border px-[4px] py-[2px] rounded-[4px]" style={{ backgroundImage: "linear-gradient(90deg, rgba(74, 144, 226, 0.5) 0%, rgba(74, 144, 226, 0.5) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
                  <p className="text-[14px] text-[#4a90e2] text-center">81%</p>
                </div>

                {/* Arrow indicator */}
                <div className="absolute h-[10.5px] left-[86.3px] top-[38px] w-[14.5px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 11">
                    <path d={svgPaths.p3b01e280} fill="white" />
                    <path d={svgPaths.p3b01e280} fill="#4A90E2" fillOpacity="0.5" />
                  </svg>
                </div>
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
            drag={editMode}
            dragElastic={0.1}
            dragMomentum={false}
            onDragEnd={(e, info) => handleDragEnd(widgetId, info)}
            onPointerDown={() => !editMode && handleLongPress(widgetId)}
            onPointerUp={handlePressEnd}
            onPointerLeave={handlePressEnd}
            whileHover={!editMode ? { scale: 1.01 } : {}}
            whileTap={!editMode ? { scale: 0.99 } : {}}
            onClick={() => !editMode && onWidgetClick("sleep")}
            className={`bg-white border border-[#e2e6e7] rounded-[16px] p-6 cursor-pointer relative transition-shadow duration-200 ${
              isBeingDragged ? "z-50 shadow-2xl" : ""
            } ${editMode ? "shadow-[0_4px_20px_rgba(0,0,0,0.12)]" : "shadow-sm"}`}
          >
            {editMode && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveWidget(widgetId);
                  }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-md z-10"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
                {/* Orange Drag Handle */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 p-2 cursor-move">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F5A623]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F5A623]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F5A623]"></div>
                </div>
              </>
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
            drag={editMode}
            dragElastic={0.1}
            dragMomentum={false}
            onDragEnd={(e, info) => handleDragEnd(widgetId, info)}
            onPointerDown={() => !editMode && handleLongPress(widgetId)}
            onPointerUp={handlePressEnd}
            onPointerLeave={handlePressEnd}
            whileHover={!editMode ? { scale: 1.01 } : {}}
            whileTap={!editMode ? { scale: 0.99 } : {}}
            onClick={() => !editMode && onWidgetClick("hrv")}
            className={`bg-white border border-[#e2e6e7] rounded-[16px] p-5 cursor-pointer relative transition-shadow duration-200 ${
              isBeingDragged ? "z-50 shadow-2xl" : ""
            } ${editMode ? "shadow-[0_4px_20px_rgba(0,0,0,0.12)]" : "shadow-sm"}`}
          >
            {editMode && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveWidget(widgetId);
                  }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-md z-10"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
                {/* Orange Drag Handle */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 p-2 cursor-move">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F5A623]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F5A623]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F5A623]"></div>
                </div>
              </>
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
            drag={editMode}
            dragElastic={0.1}
            dragMomentum={false}
            onDragEnd={(e, info) => handleDragEnd(widgetId, info)}
            onPointerDown={() => !editMode && handleLongPress(widgetId)}
            onPointerUp={handlePressEnd}
            onPointerLeave={handlePressEnd}
            whileHover={!editMode ? { scale: 1.01 } : {}}
            whileTap={!editMode ? { scale: 0.99 } : {}}
            onClick={() => !editMode && onWidgetClick("wellnessScore")}
            className={`bg-white border border-[#e2e6e7] rounded-[16px] p-5 cursor-pointer relative transition-shadow duration-200 ${
              isBeingDragged ? "z-50 shadow-2xl" : ""
            } ${editMode ? "shadow-[0_4px_20px_rgba(0,0,0,0.12)]" : "shadow-sm"}`}
          >
            {editMode && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveWidget(widgetId);
                  }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-md z-10"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
                {/* Orange Drag Handle */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 p-2 cursor-move">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F5A623]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F5A623]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F5A623]"></div>
                </div>
              </>
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
            drag={editMode}
            dragElastic={0.1}
            dragMomentum={false}
            onDragEnd={(e, info) => handleDragEnd(widgetId, info)}
            onPointerDown={() => !editMode && handleLongPress(widgetId)}
            onPointerUp={handlePressEnd}
            onPointerLeave={handlePressEnd}
            whileHover={!editMode ? { scale: 1.01 } : {}}
            whileTap={!editMode ? { scale: 0.99 } : {}}
            onClick={() => !editMode && onWidgetClick("moodTrends")}
            className={`bg-white border border-[#e2e6e7] rounded-[16px] p-5 cursor-pointer relative transition-shadow duration-200 ${
              isBeingDragged ? "z-50 shadow-2xl" : ""
            } ${editMode ? "shadow-[0_4px_20px_rgba(0,0,0,0.12)]" : "shadow-sm"}`}
          >
            {editMode && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveWidget(widgetId);
                  }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-md z-10"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
                {/* Orange Drag Handle */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 p-2 cursor-move">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F5A623]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F5A623]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F5A623]"></div>
                </div>
              </>
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
    <div className="relative w-full h-full bg-[#fcfcfc] overflow-hidden">
      {/* Standard Top Spacing for status bar/Dynamic Island - 44px safe area */}
      <div className="h-[44px] bg-[#fcfcfc]" />
      
      {/* Top Greeting Bar - Positioned below status bar */}
      <div className="sticky top-[44px] z-40 bg-[#fcfcfc]/95 backdrop-blur-sm border-b border-[#e2e6e7]/50 px-5 py-5">
        <div className="flex items-center justify-between">
          <div className="bg-white border border-[#e2e6e7] rounded-full px-4 py-2 shadow-sm">
            <p className="text-[14px] font-semibold text-[#2c3e50]">Good Morning</p>
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

      {/* Swipeable Dashboard Pages */}
      <div className="relative h-full overflow-hidden">
        <motion.div
          className="flex h-full"
          animate={{ x: `-${currentPage * 100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {[...Array(totalPages)].map((_, pageIndex) => (
            <div
              key={pageIndex}
              className="min-w-full h-full overflow-y-auto pb-32 px-5 pt-8"
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
