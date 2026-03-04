import { useState, useRef } from "react";
import { motion, AnimatePresence, PanInfo } from "motion/react";
import { Flame, Activity, Moon, TrendingUp, Plus, Trash2, Check, MessageCircle, X, Info } from "lucide-react";

interface Widget {
  id: string;
  type: "dailyGoal" | "steps" | "sleep" | "moodTrends" | "water" | "meditation";
  page: number;
  order: number;
  x?: number;
  y?: number;
}

interface FullInteractiveHomePrototypeProps {
  streakDays: number;
  todaySteps: number;
  sleepHours: number;
  onSanctuaryClick: () => void;
  onWidgetClick: (widgetId: string) => void;
  onMoodSelect?: (mood: string) => void;
}

export default function FullInteractiveHomePrototype({
  streakDays,
  todaySteps,
  sleepHours,
  onSanctuaryClick,
  onWidgetClick,
  onMoodSelect,
}: FullInteractiveHomePrototypeProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [showAnnotations, setShowAnnotations] = useState(false);
  const [widgets, setWidgets] = useState<Widget[]>([
    { id: "dailyGoal", type: "dailyGoal", page: 0, order: 0 },
    { id: "steps", type: "steps", page: 0, order: 1 },
    { id: "sleep", type: "sleep", page: 0, order: 2 },
    { id: "moodTrends", type: "moodTrends", page: 0, order: 3 },
  ]);
  const [draggedWidget, setDraggedWidget] = useState<string | null>(null);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const totalPages = 2;

  // EXACT 28px spacing constant - CRITICAL REQUIREMENT
  const WIDGET_SPACING = 28;

  const moods = [
    { emoji: "😊", label: "Happy", value: "happy" },
    { emoji: "😌", label: "Calm", value: "calm" },
    { emoji: "😔", label: "Sad", value: "sad" },
    { emoji: "😰", label: "Anxious", value: "anxious" },
    { emoji: "😴", label: "Tired", value: "tired" },
  ];

  const availableWidgets = [
    { id: "water", type: "water" as const, name: "Water Intake", icon: "💧", color: "from-[#4A90E2] to-[#357ABD]" },
    { id: "meditation", type: "meditation" as const, name: "Meditation", icon: "🧘", color: "from-[#A8D5BA] to-[#88B5A2]" },
    { id: "nutrition", name: "Nutrition", icon: "🥗", color: "from-[#F5A623] to-[#E89520]" },
    { id: "exercise", name: "Exercise", icon: "💪", color: "from-[#4A90E2] to-[#357ABD]" },
  ];

  const handleLongPress = (widgetId: string) => {
    // Long press activates edit mode - NO SHAKE, instant activation
    longPressTimer.current = setTimeout(() => {
      setEditMode(true);
      setDraggedWidget(widgetId);
    }, 500); // 500ms long press
  };

  const handlePressEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const handleDragEnd = (widgetId: string, info: PanInfo) => {
    setDraggedWidget(null);
    // Could implement reordering logic here
  };

  const handleSaveLayout = () => {
    setEditMode(false);
    setShowSaveConfirm(true);
    setTimeout(() => setShowSaveConfirm(false), 2000);
  };

  const handleRemoveWidget = (widgetId: string) => {
    setWidgets((prev) => prev.filter((w) => w.id !== widgetId));
  };

  const handleAddWidget = (type: "water" | "meditation") => {
    const newWidget: Widget = {
      id: `${type}-${Date.now()}`,
      type,
      page: currentPage,
      order: widgets.filter((w) => w.page === currentPage).length,
    };
    setWidgets((prev) => [...prev, newWidget]);
    setShowGallery(false);
  };

  const handleMoodClick = (moodValue: string) => {
    if (!editMode) {
      setSelectedMood(moodValue);
      onMoodSelect?.(moodValue);
    }
  };

  const renderWidget = (widget: Widget) => {
    const isDragged = draggedWidget === widget.id;

    // Common widget wrapper props - NO SHAKE ANIMATION
    const wrapperProps = {
      layout: true,
      drag: editMode,
      dragConstraints: { left: 0, right: 0, top: 0, bottom: 0 },
      dragElastic: 0.1,
      onDragStart: () => setDraggedWidget(widget.id),
      onDragEnd: (e: any, info: PanInfo) => handleDragEnd(widget.id, info),
      onPointerDown: () => !editMode && handleLongPress(widget.id),
      onPointerUp: handlePressEnd,
      onPointerCancel: handlePressEnd,
      onClick: () => !editMode && onWidgetClick(widget.id),
      whileTap: editMode ? {} : { scale: 0.98 }, // Only scale on tap when NOT in edit mode
      // NO animate prop that could cause shake/wiggle
      style: {
        marginBottom: `${WIDGET_SPACING}px`,
        zIndex: isDragged ? 50 : 1,
      },
      className: `bg-white rounded-[20px] p-5 cursor-pointer transition-shadow relative ${
        isDragged ? "shadow-2xl" : "shadow-sm"
      }`,
    };

    switch (widget.type) {
      case "dailyGoal":
        return (
          <motion.div key={widget.id} {...wrapperProps}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-[48px] rounded-full bg-gradient-to-br from-[#F5A623] to-[#FF6B35] flex items-center justify-center">
                  <Flame className="size-[24px] text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-[14px] text-[#868686]">Daily Goal</p>
                  <h3 className="text-[28px] font-bold text-[#2c3e50]">{streakDays} Days</h3>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl mb-1">🔥</div>
                <p className="text-[12px] text-[#F5A623] font-semibold">ON FIRE!</p>
              </div>
            </div>

            {renderEditControls(widget.id)}
          </motion.div>
        );

      case "steps":
        return (
          <motion.div key={widget.id} {...wrapperProps}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="size-[48px] rounded-full bg-gradient-to-br from-[#4A90E2] to-[#357ABD] flex items-center justify-center">
                  <Activity className="size-[24px] text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-[14px] text-[#868686]">Steps</p>
                  <h3 className="text-[28px] font-bold text-[#2c3e50]">{todaySteps.toLocaleString()}</h3>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[20px] font-bold text-[#4A90E2]">73%</p>
                <p className="text-[12px] text-[#868686]">of 10,000</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-[8px] bg-[#E8F4FD] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "73%" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-[#4A90E2] to-[#357ABD] rounded-full"
              />
            </div>

            {/* Mini Bar Graph */}
            <div className="flex items-end gap-2 mt-4 h-[60px]">
              {[40, 65, 55, 80, 73, 60, 70].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className={`w-full rounded-t-md ${
                      i === 4 ? "bg-[#4A90E2]" : "bg-[#E8F4FD]"
                    }`}
                  />
                </div>
              ))}
            </div>

            {renderEditControls(widget.id)}
          </motion.div>
        );

      case "sleep":
        return (
          <motion.div key={widget.id} {...wrapperProps}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-[48px] rounded-full bg-gradient-to-br from-[#A8D5BA] to-[#88B5A2] flex items-center justify-center">
                  <Moon className="size-[24px] text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-[14px] text-[#868686]">Sleep Score</p>
                  <h3 className="text-[28px] font-bold text-[#2c3e50]">{sleepHours}h 24m</h3>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="size-[56px] rounded-full bg-[#E8F4FD] flex items-center justify-center mb-1">
                  <p className="text-[18px] font-bold text-[#A8D5BA]">85</p>
                </div>
                <p className="text-[12px] text-[#868686]">Good</p>
              </div>
            </div>

            {renderEditControls(widget.id)}
          </motion.div>
        );

      case "moodTrends":
        return (
          <motion.div key={widget.id} {...wrapperProps}>
            <div className="flex items-center gap-3 mb-4">
              <div className="size-[48px] rounded-full bg-gradient-to-br from-[#F5A623] to-[#E89520] flex items-center justify-center">
                <TrendingUp className="size-[24px] text-white" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[14px] text-[#868686]">How are you feeling?</p>
                <h3 className="text-[20px] font-bold text-[#2c3e50]">Mood Trends</h3>
              </div>
            </div>

            {/* Mood Emoji Row */}
            <div className="flex justify-between gap-2">
              {moods.map((mood) => (
                <motion.button
                  key={mood.value}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMoodClick(mood.value);
                  }}
                  whileTap={editMode ? {} : { scale: 0.9 }}
                  className={`flex-1 py-3 rounded-[12px] transition-all ${
                    selectedMood === mood.value
                      ? "bg-[#4A90E2] shadow-md"
                      : "bg-[#f8f9fa] hover:bg-[#E8F4FD]"
                  }`}
                >
                  <div className="text-2xl mb-1">{mood.emoji}</div>
                  <p
                    className={`text-[10px] ${
                      selectedMood === mood.value ? "text-white" : "text-[#868686]"
                    }`}
                  >
                    {mood.label}
                  </p>
                </motion.button>
              ))}
            </div>

            {renderEditControls(widget.id)}
          </motion.div>
        );

      case "water":
        return (
          <motion.div key={widget.id} {...wrapperProps}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-[48px] rounded-full bg-gradient-to-br from-[#4A90E2] to-[#357ABD] flex items-center justify-center text-2xl">
                  💧
                </div>
                <div>
                  <p className="text-[14px] text-[#868686]">Water Intake</p>
                  <h3 className="text-[28px] font-bold text-[#2c3e50]">6 / 8</h3>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[20px] font-bold text-[#4A90E2]">75%</p>
                <p className="text-[12px] text-[#868686]">glasses</p>
              </div>
            </div>

            {renderEditControls(widget.id)}
          </motion.div>
        );

      case "meditation":
        return (
          <motion.div key={widget.id} {...wrapperProps}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-[48px] rounded-full bg-gradient-to-br from-[#A8D5BA] to-[#88B5A2] flex items-center justify-center text-2xl">
                  🧘
                </div>
                <div>
                  <p className="text-[14px] text-[#868686]">Meditation</p>
                  <h3 className="text-[28px] font-bold text-[#2c3e50]">12 min</h3>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="size-[56px] rounded-full bg-[#E8F4FD] flex items-center justify-center mb-1">
                  <p className="text-[18px] font-bold text-[#A8D5BA]">5</p>
                </div>
                <p className="text-[12px] text-[#868686]">streak</p>
              </div>
            </div>

            {renderEditControls(widget.id)}
          </motion.div>
        );

      default:
        return null;
    }
  };

  const renderEditControls = (widgetId: string) => {
    if (!editMode) return null;

    return (
      <>
        {/* Remove Button */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveWidget(widgetId);
          }}
          className="absolute -top-2 -right-2 size-[32px] rounded-full bg-red-500 flex items-center justify-center shadow-lg z-10"
        >
          <Trash2 className="size-[16px] text-white" />
        </motion.button>

        {/* Drag Handles - NO SHAKE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-2 right-2 flex gap-1"
        >
          <div className="w-1 h-4 bg-[#868686]/30 rounded-full" />
          <div className="w-1 h-4 bg-[#868686]/30 rounded-full" />
          <div className="w-1 h-4 bg-[#868686]/30 rounded-full" />
        </motion.div>
      </>
    );
  };

  return (
    <div className="h-full bg-gradient-to-b from-[#f8f9fa] to-[#ffffff] relative overflow-hidden">
      {/* CRITICAL: NO BANNER AT ALL - Completely removed as per requirements */}

      {/* Annotation Toggle Button */}
      <motion.button
        onClick={() => setShowAnnotations(!showAnnotations)}
        whileTap={{ scale: 0.95 }}
        className="fixed top-4 right-4 z-50 size-[40px] rounded-full bg-white shadow-lg flex items-center justify-center"
      >
        <Info className="size-[20px] text-[#4A90E2]" />
      </motion.button>

      {/* Annotations Overlay - Shows 28px spacing */}
      <AnimatePresence>
        {showAnnotations && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 pointer-events-none"
          >
            <div className="absolute top-[120px] left-5 right-5 max-w-md mx-auto">
              {/* Spacing Annotations */}
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ marginTop: i === 0 ? 0 : `${WIDGET_SPACING + 120}px` }}>
                  <div className="relative">
                    {/* Vertical spacing indicator */}
                    {i < 2 && (
                      <div className="absolute -bottom-[28px] left-0 flex items-center gap-2">
                        <div className="w-[2px] h-[28px] bg-red-500" />
                        <div className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded">
                          28px
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-[16px] p-4 shadow-lg max-w-[300px]">
              <h4 className="text-[14px] font-bold text-[#2c3e50] mb-2">Design Specs</h4>
              <div className="space-y-2 text-[12px] text-[#868686]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded" />
                  <span>28px exact spacing between widgets</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#4A90E2] rounded" />
                  <span>No shake/wiggle in edit mode</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#A8D5BA] rounded" />
                  <span>Long-press to activate drag</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area with EXACT 28px spacing */}
      <div className="h-full overflow-hidden pt-6 pb-24">
        {/* Swipeable Pages Container */}
        <motion.div
          animate={{ x: `-${currentPage * 100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="flex h-full"
        >
          {Array.from({ length: totalPages }).map((_, pageIndex) => (
            <div
              key={pageIndex}
              className="min-w-full h-full overflow-y-auto px-5"
              style={{ scrollBehavior: "smooth" }}
            >
              {/* Page Content with EXACT 28px spacing */}
              <div className="max-w-md mx-auto">
                {widgets
                  .filter((w) => w.page === pageIndex)
                  .sort((a, b) => a.order - b.order)
                  .map((widget) => renderWidget(widget))}

                {/* Empty state for page 2 */}
                {pageIndex === 1 && widgets.filter((w) => w.page === 1).length === 0 && (
                  <div className="flex flex-col items-center justify-center h-[400px] text-center px-8">
                    <div className="size-[80px] rounded-full bg-[#E8F4FD] flex items-center justify-center mb-4">
                      <Plus className="size-[40px] text-[#4A90E2]" />
                    </div>
                    <h3 className="text-[20px] font-bold text-[#2c3e50] mb-2">
                      Customize Your Dashboard
                    </h3>
                    <p className="text-[14px] text-[#868686] mb-4">
                      Long-press any widget to enter edit mode, then drag to rearrange or tap the + button to add more widgets
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Page Indicators */}
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {Array.from({ length: totalPages }).map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setCurrentPage(i)}
              whileTap={{ scale: 0.9 }}
              className={`h-[6px] rounded-full transition-all ${
                currentPage === i
                  ? "w-[24px] bg-[#4A90E2]"
                  : "w-[6px] bg-[#e2e6e7]"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Sticky Mascot - Bottom Right with Speech Bubble */}
      <motion.button
        onClick={onSanctuaryClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-24 right-5 z-40"
      >
        <div className="relative">
          <div className="size-[60px] rounded-full bg-gradient-to-br from-[#FFA07A] to-[#9B7FDB] flex items-center justify-center shadow-lg border-3 border-white">
            <MessageCircle className="size-[28px] text-white" />
          </div>

          {/* Speech Bubble - Context-aware */}
          <AnimatePresence>
            {!editMode && !showGallery && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                className="absolute bottom-full right-0 mb-2 bg-white rounded-[12px] p-3 shadow-lg max-w-[160px]"
              >
                <p className="text-[11px] text-[#2c3e50]">
                  {streakDays >= 7 
                    ? "Amazing streak! 🔥" 
                    : todaySteps >= 7000 
                    ? "Great progress! 🌟"
                    : "You're doing well! 💚"}
                </p>
                <div className="absolute -bottom-1 right-4 w-3 h-3 bg-white transform rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.button>

      {/* Edit Mode Controls */}
      <AnimatePresence>
        {editMode && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 flex gap-3 z-50"
          >
            <motion.button
              onClick={() => setEditMode(false)}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white rounded-full shadow-lg flex items-center gap-2"
            >
              <X className="size-[16px] text-[#868686]" />
              <span className="text-[14px] font-semibold text-[#868686]">Cancel</span>
            </motion.button>
            <motion.button
              onClick={handleSaveLayout}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-[#4A90E2] rounded-full shadow-lg flex items-center gap-2"
            >
              <Check className="size-[16px] text-white" />
              <span className="text-[14px] font-semibold text-white">Done</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Widget Gallery Modal */}
      <AnimatePresence>
        {showGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end"
            onClick={() => setShowGallery(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-white rounded-t-[24px] p-6 max-h-[70%] overflow-y-auto"
            >
              <div className="w-[40px] h-[4px] bg-[#e2e6e7] rounded-full mx-auto mb-6" />
              
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[20px] font-bold text-[#2c3e50]">Add Widget</h3>
                <button onClick={() => setShowGallery(false)}>
                  <X className="size-[24px] text-[#868686]" />
                </button>
              </div>

              <div className="space-y-3">
                {availableWidgets.map((item) => {
                  const isAdded = widgets.some((w) => w.type === item.type);
                  
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => {
                        if (item.type === "water" || item.type === "meditation") {
                          handleAddWidget(item.type);
                        }
                      }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isAdded || (item.type !== "water" && item.type !== "meditation")}
                      className={`w-full bg-white rounded-[16px] p-4 shadow-sm border border-[#e2e6e7] flex items-center gap-4 transition-all ${
                        isAdded 
                          ? "opacity-50" 
                          : item.type === "water" || item.type === "meditation"
                          ? "hover:shadow-md"
                          : "opacity-30"
                      }`}
                    >
                      <div className={`size-[48px] rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl`}>
                        {item.icon}
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-[16px] font-semibold text-[#2c3e50]">{item.name}</p>
                        <p className="text-[12px] text-[#868686]">
                          {isAdded ? "Already added" : "Track your progress"}
                        </p>
                      </div>
                      {!isAdded && (item.type === "water" || item.type === "meditation") && (
                        <Plus className="size-[20px] text-[#4A90E2]" />
                      )}
                      {isAdded && <Check className="size-[20px] text-[#A8D5BA]" />}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Save Confirmation Toast */}
      <AnimatePresence>
        {showSaveConfirm && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 bg-[#A8D5BA] text-white px-6 py-3 rounded-full shadow-lg z-50 flex items-center gap-2"
          >
            <Check className="size-[16px]" />
            <span className="text-[14px] font-semibold">Layout Saved Successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e2e6e7] z-30">
        <div className="max-w-md mx-auto px-5 py-3 flex items-center justify-around relative">
          {/* Home */}
          <button className="flex flex-col items-center gap-1 py-2">
            <div className="size-[24px] text-[#4A90E2]">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
            </div>
            <span className="text-[10px] font-semibold text-[#4A90E2]">Home</span>
          </button>

          {/* Courses */}
          <button className="flex flex-col items-center gap-1 py-2">
            <div className="size-[24px] text-[#868686]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <path d="M7 8h10M7 12h10M7 16h6" />
              </svg>
            </div>
            <span className="text-[10px] text-[#868686]">Courses</span>
          </button>

          {/* Central Plus Button */}
          <motion.button
            onClick={() => {
              if (editMode) {
                setShowGallery(true);
              } else {
                setShowGallery(true);
              }
            }}
            whileTap={{ scale: 0.9 }}
            className="size-[56px] rounded-full bg-gradient-to-br from-[#4A90E2] to-[#357ABD] flex items-center justify-center shadow-lg -mt-6"
          >
            <Plus className="size-[28px] text-white" strokeWidth={3} />
          </motion.button>

          {/* Challenges */}
          <button className="flex flex-col items-center gap-1 py-2">
            <div className="size-[24px] text-[#868686]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </div>
            <span className="text-[10px] text-[#868686]">Challenges</span>
          </button>

          {/* Profile */}
          <button className="flex flex-col items-center gap-1 py-2">
            <div className="size-[24px] text-[#868686]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="8" r="4" />
                <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
              </svg>
            </div>
            <span className="text-[10px] text-[#868686]">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
