import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Settings2, Flower2, TreePine, Grid3x3, Plus, Check, X } from "lucide-react";
import AnimatedHomeHeader from "./AnimatedHomeHeader";

const stepsIcon = "👟";

export type Widget = {
  id: string; // unique id in app state
  name: string;
  enabled: boolean;
  order: number;
  type: "streak" | "steps" | "sleep" | "hrv" | "wellnessScore" | "moodTrends";
};

interface SamsungHomeScreenProps {
  widgets: Widget[];
  userSettings: { showMascot: boolean; showSearchBar: boolean; showPlusButton: boolean };
  moodLogCount: number;
  streakDays: number;
  wellnessScore: number;
  onLayoutClick: () => void;
  onPlusClick: () => void;
  onSanctuaryClick: () => void;
  onWidgetClick: (id: string) => void;
  onStreakClick: () => void;
}

const availableWidgets = [
  { id: "steps", name: "Steps", icon: stepsIcon },
  { id: "sleep", name: "Sleep", icon: "😴" },
  { id: "moodTrends", name: "Mood Trends", icon: "😊" },
  { id: "hrv", name: "HRV", icon: "💓" },
  { id: "wellnessScore", name: "Wellness Score", icon: "📊" },
];

const dailyGoals = [
  { id: 1, label: "Walk 8,000 steps", completed: true },
  { id: 2, label: "Log mood", completed: true },
  { id: 3, label: "Drink water", completed: false },
];

export default function SamsungHomeScreen(props: SamsungHomeScreenProps) {
  const [editMode, setEditMode] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  // Map incoming app widgets into local layout widgets (single page for now)
  const mappedFromProps = useMemo(() => {
    const dict: Record<string, { id: string; name: string; icon: string }> = Object.fromEntries(
      availableWidgets.map((w) => [w.id, w])
    );
    return props.widgets
      .filter((w) => w.enabled)
      .map((w) => ({
        id: w.type,
        name: dict[w.type]?.name ?? w.name,
        icon: dict[w.type]?.icon ?? "",
        page: 0,
        order: w.order ?? 0,
        size: "medium" as const,
      }))
      .sort((a, b) => a.order - b.order);
  }, [props.widgets]);

  const [widgets, setWidgets] = useState(mappedFromProps);
  useEffect(() => {
    // keep in sync when props.widgets changes (e.g., from customizer)
    setWidgets(mappedFromProps);
  }, [mappedFromProps]);
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 1;

  const completedGoals = dailyGoals.filter((g) => g.completed).length;
  const totalGoals = dailyGoals.length;

  function getWidgetsByPage(page: number) {
    return widgets.filter((w) => w.page === page).sort((a, b) => a.order - b.order);
  }

  function handleWidgetClick(widgetId: string) {
    if (!editMode) {
      props.onWidgetClick?.(widgetId);
      return;
    }
    if (selectedWidget === null) {
      setSelectedWidget(widgetId);
    } else if (selectedWidget !== widgetId) {
      // Swap order
      setWidgets((prev) => {
        const a = prev.find((w) => w.id === selectedWidget);
        const b = prev.find((w) => w.id === widgetId);
        if (!a || !b) return prev;
        return prev.map((w) => {
          if (w.id === a.id) return { ...w, order: b.order };
          if (w.id === b.id) return { ...w, order: a.order };
          return w;
        });
      });
      setSelectedWidget(null);
    }
  }

  function handleRemoveWidget(widgetId: string) {
    setWidgets((prev) => prev.filter((w) => w.id !== widgetId));
  }

  function handleAddWidget(widgetId: string) {
    const widget = availableWidgets.find((w) => w.id === widgetId);
    if (!widget) return;
    setWidgets((prev) => {
      const newItem = {
        ...widget,
        page: currentPage,
        order: prev.length,
        size: "medium" as const,
      } as { id: "streak" | "steps" | "sleep" | "hrv" | "wellnessScore" | "moodTrends"; name: string; icon: string; page: number; order: number; size: "medium" };
      return [...prev, newItem];
    });
    setShowGallery(false);
  }

  function handleSaveLayout() {
    setEditMode(false);
    setSelectedWidget(null);
    setShowSaveConfirm(true);
    setTimeout(() => setShowSaveConfirm(false), 1200);
  }

  function renderWidget(widgetId: string) {
    const widget = widgets.find((w) => w.id === widgetId);
    if (!widget) return null;
    const isSelected = selectedWidget === widgetId;
    switch (widgetId) {
      case "steps":
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
              <div className="relative w-[60px] h-[60px]">
                {/* Background circle */}
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle
                    cx="30"
                    cy="30"
                    r="25"
                    stroke="#ECF0F1"
                    strokeWidth="6"
                    fill="none"
                  />
                </svg>
                {/* Animated progress circle */}
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <defs>
                    <linearGradient id="stepsGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#4A90E2" />
                      <stop offset="100%" stopColor="#A8D5BA" />
                    </linearGradient>
                  </defs>
                  <motion.circle
                    cx="30"
                    cy="30"
                    r="25"
                    stroke="url(#stepsGradient)"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: 157, strokeDashoffset: 157 }}
                    animate={{ strokeDashoffset: 30 }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                  />
                </svg>
              </div>
            </div>
            <p className="text-[11px] text-[#868686] mt-2">Great progress! 🌟</p>
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
      case "sleep":
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
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[16px] text-[#a8d5ba]">Sleep</h3>
              <div className="w-10 h-10 rounded-full bg-[#E8F4FD] flex items-center justify-center">
                <span className="text-xl">😴</span>
              </div>
            </div>
            {/* Main Content: Score on left, Progress ring on right */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                  <p className="text-[24px] text-[#2c3e50] font-bold leading-tight">82</p>
                  <p className="text-[12px] text-[#868686] leading-tight">/100</p>
                </div>
                <p className="text-[12px] text-[#868686]">7h 15m last night</p>
              </div>
              <div className="relative w-[60px] h-[60px]">
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle cx="30" cy="30" r="25" stroke="#ECF0F1" strokeWidth="6" fill="none" />
                </svg>
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <defs>
                    <linearGradient id="sleepGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#A8D5BA" />
                      <stop offset="100%" stopColor="#4A90E2" />
                    </linearGradient>
                  </defs>
                  <motion.circle
                    cx="30"
                    cy="30"
                    r="25"
                    stroke="url(#sleepGradient)"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: 157, strokeDashoffset: 157 }}
                    animate={{ strokeDashoffset: 28 }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                  />
                </svg>
              </div>
            </div>
            <p className="text-[11px] text-[#868686] mt-2">Well rested! 🌙</p>
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
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[16px] text-[#4a90e2]">HRV</h3>
              <div className="w-10 h-10 rounded-full bg-[#B8D9F0] flex items-center justify-center">
                <span className="text-xl">💓</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-1">
                <p className="text-[24px] text-[#2c3e50] font-bold leading-tight">62</p>
                <p className="text-[12px] text-[#868686] leading-tight">ms</p>
              </div>
              <div className="h-10 w-20 bg-gradient-to-r from-[#E8F4FD] to-[#A8D5BA]/40 rounded-[8px]" />
            </div>
            <p className="text-[11px] text-[#868686] mt-2">Stable variability</p>
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
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[16px] text-[#2c3e50]">Wellness</h3>
              <div className="w-10 h-10 rounded-full bg-[#E8F4FD] flex items-center justify-center">
                <span className="text-xl">📊</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-1">
                <p className="text-[24px] text-[#4a90e2] font-bold leading-tight">81</p>
                <p className="text-[12px] text-[#868686] leading-tight">/100</p>
              </div>
              <div className="relative w-[60px] h-[60px]">
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle cx="30" cy="30" r="25" stroke="#ECF0F1" strokeWidth="6" fill="none" />
                </svg>
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <motion.circle
                    cx="30"
                    cy="30"
                    r="25"
                    stroke="#4A90E2"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: 157, strokeDashoffset: 157 }}
                    animate={{ strokeDashoffset: 30 }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                  />
                </svg>
              </div>
            </div>
            <p className="text-[11px] text-[#868686] mt-2">Keep it up!</p>
          </motion.div>
        );
      default:
        return null;
    }
  }

  return (
    <div className="absolute inset-0 w-full min-h-screen bg-[#fcfcfc] overflow-x-hidden">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-[#fcfcfc] backdrop-blur-sm">
        <div className="h-[30px]" />
        <AnimatedHomeHeader />
        {/* Daily Goal Progress Bar */}
        <div className="border-b border-[#e2e6e7]/50 px-5 pt-3 pb-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="bg-gradient-to-br from-[#4A90E2] to-[#A8D5BA] rounded-full px-4 py-2 shadow-sm">
                <p className="text-[14px] font-bold text-white">
                  {completedGoals}/{totalGoals} Goals
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                {dailyGoals.map((goal) => (
                  <div
                    key={goal.id}
                    className={`w-2 h-2 rounded-full transition-all ${
                      goal.completed ? "bg-[#A8D5BA] scale-110" : "bg-[#e2e6e7]"
                    }`}
                    title={goal.label}
                  />
                ))}
              </div>
              {completedGoals === totalGoals && <span className="text-[14px]">✨</span>}
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
      {/* Dashboard Pages */}
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
              <div className="flex flex-col gap-[28px]">
                <AnimatePresence mode="popLayout">
                  {getWidgetsByPage(pageIndex).map((position) => (
                    <div key={position.id}>{renderWidget(position.id)}</div>
                  ))}
                </AnimatePresence>
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
                i === currentPage ? "w-6 bg-[#4A90E2]" : "w-2 bg-[#e2e6e7]"
              }`}
            />
          ))}
        </div>
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

