import { useState, useRef } from "react";
import { motion, AnimatePresence, PanInfo } from "motion/react";
import { Flame, Activity, Moon, TrendingUp, Plus, Trash2, Check, MessageCircle } from "lucide-react";

interface Widget {
  id: string;
  type: "dailyGoal" | "steps" | "sleep" | "moodTrends";
  page: number;
  order: number;
}

interface PolishedHomeScreenProps {
  streakDays: number;
  todaySteps: number;
  sleepHours: number;
  onSanctuaryClick: () => void;
  onWidgetClick: (widgetId: string) => void;
  onPlusClick: () => void;
}

export default function PolishedHomeScreen({
  streakDays,
  todaySteps,
  sleepHours,
  onSanctuaryClick,
  onWidgetClick,
  onPlusClick,
}: PolishedHomeScreenProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
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

  // EXACT 28px spacing constant
  const WIDGET_SPACING = 28;

  const moods = [
    { emoji: "😊", label: "Happy", value: "happy" },
    { emoji: "😌", label: "Calm", value: "calm" },
    { emoji: "😔", label: "Sad", value: "sad" },
    { emoji: "😰", label: "Anxious", value: "anxious" },
    { emoji: "😴", label: "Tired", value: "tired" },
  ];

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
    setDraggedWidget(null);
  };

  const handleSaveLayout = () => {
    setEditMode(false);
    setShowSaveConfirm(true);
    setTimeout(() => setShowSaveConfirm(false), 2000);
  };

  const handleRemoveWidget = (widgetId: string) => {
    setWidgets((prev) => prev.filter((w) => w.id !== widgetId));
  };

  const pageWidgets = widgets.filter((w) => w.page === currentPage);

  const renderWidget = (widget: Widget) => {
    const isDragged = draggedWidget === widget.id;

    switch (widget.type) {
      case "dailyGoal":
        return (
          <motion.div
            key={widget.id}
            layout
            drag={editMode}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.1}
            onDragEnd={(e, info) => handleDragEnd(widget.id, info)}
            onPointerDown={() => !editMode && handleLongPress(widget.id)}
            onPointerUp={handlePressEnd}
            onPointerCancel={handlePressEnd}
            onClick={() => !editMode && onWidgetClick(widget.id)}
            whileTap={editMode ? {} : { scale: 0.98 }}
            style={{
              marginBottom: `${WIDGET_SPACING}px`,
              zIndex: isDragged ? 50 : 1,
            }}
            className={`bg-white rounded-[20px] p-5 cursor-pointer transition-shadow relative ${
              isDragged ? "shadow-2xl" : "shadow-sm"
            }`}
          >
            {/* Daily Goal Widget */}
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

            {/* Edit Mode: Remove Button */}
            {editMode && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveWidget(widget.id);
                }}
                className="absolute -top-2 -right-2 size-[32px] rounded-full bg-red-500 flex items-center justify-center shadow-lg z-10"
              >
                <Trash2 className="size-[16px] text-white" />
              </motion.button>
            )}

            {/* Edit Mode: Drag Indicator */}
            {editMode && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute top-2 right-2 flex gap-1"
              >
                <div className="w-1 h-4 bg-[#868686]/30 rounded-full" />
                <div className="w-1 h-4 bg-[#868686]/30 rounded-full" />
                <div className="w-1 h-4 bg-[#868686]/30 rounded-full" />
              </motion.div>
            )}
          </motion.div>
        );

      case "steps":
        return (
          <motion.div
            key={widget.id}
            layout
            drag={editMode}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.1}
            onDragEnd={(e, info) => handleDragEnd(widget.id, info)}
            onPointerDown={() => !editMode && handleLongPress(widget.id)}
            onPointerUp={handlePressEnd}
            onPointerCancel={handlePressEnd}
            onClick={() => !editMode && onWidgetClick(widget.id)}
            whileTap={editMode ? {} : { scale: 0.98 }}
            style={{
              marginBottom: `${WIDGET_SPACING}px`,
              zIndex: isDragged ? 50 : 1,
            }}
            className={`bg-white rounded-[20px] p-5 cursor-pointer transition-shadow relative ${
              isDragged ? "shadow-2xl" : "shadow-sm"
            }`}
          >
            {/* Steps Widget */}
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

            {editMode && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveWidget(widget.id);
                }}
                className="absolute -top-2 -right-2 size-[32px] rounded-full bg-red-500 flex items-center justify-center shadow-lg z-10"
              >
                <Trash2 className="size-[16px] text-white" />
              </motion.button>
            )}

            {editMode && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute top-2 right-2 flex gap-1"
              >
                <div className="w-1 h-4 bg-[#868686]/30 rounded-full" />
                <div className="w-1 h-4 bg-[#868686]/30 rounded-full" />
                <div className="w-1 h-4 bg-[#868686]/30 rounded-full" />
              </motion.div>
            )}
          </motion.div>
        );

      case "sleep":
        return (
          <motion.div
            key={widget.id}
            layout
            drag={editMode}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.1}
            onDragEnd={(e, info) => handleDragEnd(widget.id, info)}
            onPointerDown={() => !editMode && handleLongPress(widget.id)}
            onPointerUp={handlePressEnd}
            onPointerCancel={handlePressEnd}
            onClick={() => !editMode && onWidgetClick(widget.id)}
            whileTap={editMode ? {} : { scale: 0.98 }}
            style={{
              marginBottom: `${WIDGET_SPACING}px`,
              zIndex: isDragged ? 50 : 1,
            }}
            className={`bg-white rounded-[20px] p-5 cursor-pointer transition-shadow relative ${
              isDragged ? "shadow-2xl" : "shadow-sm"
            }`}
          >
            {/* Sleep Score Widget */}
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

            {editMode && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveWidget(widget.id);
                }}
                className="absolute -top-2 -right-2 size-[32px] rounded-full bg-red-500 flex items-center justify-center shadow-lg z-10"
              >
                <Trash2 className="size-[16px] text-white" />
              </motion.button>
            )}

            {editMode && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute top-2 right-2 flex gap-1"
              >
                <div className="w-1 h-4 bg-[#868686]/30 rounded-full" />
                <div className="w-1 h-4 bg-[#868686]/30 rounded-full" />
                <div className="w-1 h-4 bg-[#868686]/30 rounded-full" />
              </motion.div>
            )}
          </motion.div>
        );

      case "moodTrends":
        return (
          <motion.div
            key={widget.id}
            layout
            drag={editMode}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.1}
            onDragEnd={(e, info) => handleDragEnd(widget.id, info)}
            onPointerDown={() => !editMode && handleLongPress(widget.id)}
            onPointerUp={handlePressEnd}
            onPointerCancel={handlePressEnd}
            onClick={() => !editMode && onWidgetClick(widget.id)}
            whileTap={editMode ? {} : { scale: 0.98 }}
            style={{
              marginBottom: `${WIDGET_SPACING}px`,
              zIndex: isDragged ? 50 : 1,
            }}
            className={`bg-white rounded-[20px] p-5 cursor-pointer transition-shadow relative ${
              isDragged ? "shadow-2xl" : "shadow-sm"
            }`}
          >
            {/* Mood Trends Widget */}
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
                    if (!editMode) setSelectedMood(mood.value);
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

            {editMode && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveWidget(widget.id);
                }}
                className="absolute -top-2 -right-2 size-[32px] rounded-full bg-red-500 flex items-center justify-center shadow-lg z-10"
              >
                <Trash2 className="size-[16px] text-white" />
              </motion.button>
            )}

            {editMode && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute top-2 right-2 flex gap-1"
              >
                <div className="w-1 h-4 bg-[#868686]/30 rounded-full" />
                <div className="w-1 h-4 bg-[#868686]/30 rounded-full" />
                <div className="w-1 h-4 bg-[#868686]/30 rounded-full" />
              </motion.div>
            )}
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-full bg-gradient-to-b from-[#f8f9fa] to-[#ffffff] relative overflow-hidden">
      {/* NO BANNER - Completely removed */}

      {/* Main Content Area with EXACT spacing */}
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
            >
              {/* Page Content with EXACT 28px spacing */}
              <div className="max-w-md mx-auto">
                {widgets
                  .filter((w) => w.page === pageIndex)
                  .map((widget) => renderWidget(widget))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Page Indicators */}
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 flex gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`h-[6px] rounded-full transition-all ${
                currentPage === i
                  ? "w-[24px] bg-[#4A90E2]"
                  : "w-[6px] bg-[#e2e6e7]"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Sticky Mascot - Bottom Right */}
      <motion.button
        onClick={onSanctuaryClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-24 right-5 z-40"
      >
        {/* Mascot Container */}
        <div className="relative">
          <div className="size-[60px] rounded-full bg-gradient-to-br from-[#FFA07A] to-[#9B7FDB] flex items-center justify-center shadow-lg border-3 border-white">
            <MessageCircle className="size-[28px] text-white" />
          </div>

          {/* Speech Bubble - Appears randomly */}
          <AnimatePresence>
            {!editMode && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                className="absolute bottom-full right-0 mb-2 bg-white rounded-[12px] p-3 shadow-lg max-w-[160px]"
              >
                <p className="text-[11px] text-[#2c3e50]">
                  Great progress today! 🌟
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
              <h3 className="text-[20px] font-bold text-[#2c3e50] mb-4">Add Widget</h3>

              <div className="space-y-3">
                {/* Available Widgets */}
                {[
                  { id: "water", name: "Water Intake", icon: "💧" },
                  { id: "meditation", name: "Meditation", icon: "🧘" },
                  { id: "nutrition", name: "Nutrition", icon: "🥗" },
                  { id: "exercise", name: "Exercise", icon: "💪" },
                ].map((item) => (
                  <button
                    key={item.id}
                    className="w-full bg-white rounded-[16px] p-4 shadow-sm border border-[#e2e6e7] flex items-center gap-4 hover:shadow-md transition-shadow"
                  >
                    <div className="size-[48px] rounded-full bg-gradient-to-br from-[#E8F4FD] to-[#A8D5BA] flex items-center justify-center text-2xl">
                      {item.icon}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-[16px] font-semibold text-[#2c3e50]">{item.name}</p>
                      <p className="text-[12px] text-[#868686]">Track your progress</p>
                    </div>
                    <Plus className="size-[20px] text-[#4A90E2]" />
                  </button>
                ))}
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
            <span className="text-[14px] font-semibold">Layout Saved!</span>
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
                onPlusClick();
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
