import { motion } from "motion/react";
import { Settings2, Flower2, TreePine, Grid3x3 } from "lucide-react";

interface Widget {
  id: string;
  name: string;
  enabled: boolean;
  order: number;
}

interface UserSettings {
  showMascot: boolean;
  showSearchBar: boolean;
  showPlusButton: boolean;
}

interface CleanHomeScreenProps {
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

export default function CleanHomeScreen({
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
}: CleanHomeScreenProps) {
  const enabledWidgets = widgets.filter(w => w.enabled).sort((a, b) => a.order - b.order);

  return (
    <div className="relative w-full h-full bg-[#fcfcfc] overflow-y-auto pb-32">
      {/* Top Greeting Bar */}
      <div className="sticky top-0 z-40 bg-[#fcfcfc]/95 backdrop-blur-sm border-b border-[#e2e6e7]/50 px-5 py-4">
        <div className="flex items-center justify-between">
          {/* Greeting Pill */}
          <div className="bg-white border border-[#e2e6e7] rounded-full px-4 py-2 shadow-sm">
            <p className="text-[14px] font-semibold text-[#2c3e50]">Good Morning</p>
          </div>

          {/* Badge Icons */}
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
            
            {/* Layout Button */}
            <button
              onClick={onLayoutClick}
              className="w-9 h-9 rounded-full bg-[#4A90E2] shadow-md flex items-center justify-center hover:bg-[#3A80D2] transition-all ml-1"
            >
              <Settings2 className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Content Area with 20px padding */}
      <div className="px-5 pt-5 space-y-5">
        {/* Blue Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#4A90E2] to-[#5BA0F2] rounded-[16px] px-4 py-3 shadow-sm"
        >
          <p className="text-white text-[13px] font-semibold text-center">
            👆 Tap widgets for details
          </p>
        </motion.div>

        {/* Daily Goal Streak Widget */}
        {enabledWidgets.find(w => w.id === "streak") && (
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={onStreakClick}
            className="bg-white border border-[#e2e6e7] rounded-[16px] p-5 shadow-sm cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#FFF4E5] rounded-full flex items-center justify-center">
                  <span className="text-2xl">🔥</span>
                </div>
                <div>
                  <p className="text-[14px] text-[#868686]">Daily Goal</p>
                  <p className="text-[28px] font-bold text-[#F5A623] leading-none mt-1">
                    {streakDays} Days
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[12px] text-[#868686]">Current Streak</p>
                <p className="text-[14px] font-semibold text-[#4A90E2] mt-1">Keep it up! 🌟</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Steps Widget */}
        {enabledWidgets.find(w => w.id === "steps") && (
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => onWidgetClick("steps")}
            className="bg-white border border-[#e2e6e7] rounded-[16px] p-6 shadow-sm cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[16px] font-bold text-[#2c3e50]">Steps</h3>
              <p className="text-[12px] text-[#868686]">Today</p>
            </div>
            
            {/* Circular Progress */}
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-36 h-36">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 144 144">
                  <circle
                    cx="72"
                    cy="72"
                    r="64"
                    fill="none"
                    stroke="#ECF0F1"
                    strokeWidth="12"
                  />
                  <circle
                    cx="72"
                    cy="72"
                    r="64"
                    fill="none"
                    stroke="#4A90E2"
                    strokeWidth="12"
                    strokeDasharray={`${(6514 / 8000) * 402} 402`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-[32px] font-bold text-[#4A90E2]">6,514</p>
                  <p className="text-[12px] text-[#868686]">of 8,000</p>
                  <p className="text-[14px] font-semibold text-[#A8D5BA] mt-1">81%</p>
                </div>
              </div>
            </div>
            
            <p className="text-[12px] text-[#868686] text-center">
              Nov 10, 2025 • 🚶 Keep moving!
            </p>
          </motion.div>
        )}

        {/* Sleep Widget */}
        {enabledWidgets.find(w => w.id === "sleep") && (
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => onWidgetClick("sleep")}
            className="bg-white border border-[#e2e6e7] rounded-[16px] p-6 shadow-sm cursor-pointer"
          >
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

            {/* Bar Graph */}
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
        )}

        {/* HRV Widget */}
        {enabledWidgets.find(w => w.id === "hrv") && (
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => onWidgetClick("hrv")}
            className="bg-white border border-[#e2e6e7] rounded-[16px] p-5 shadow-sm cursor-pointer"
          >
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
        )}

        {/* Wellness Score Widget */}
        {enabledWidgets.find(w => w.id === "wellnessScore") && (
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => onWidgetClick("wellnessScore")}
            className="bg-white border border-[#e2e6e7] rounded-[16px] p-5 shadow-sm cursor-pointer"
          >
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
        )}

        {/* Mood Trends Widget */}
        {enabledWidgets.find(w => w.id === "moodTrends") && (
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => onWidgetClick("moodTrends")}
            className="bg-white border border-[#e2e6e7] rounded-[16px] p-5 shadow-sm cursor-pointer"
          >
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
        )}

        {/* Bottom spacing for mascot */}
        <div className="h-24" />
      </div>
    </div>
  );
}
