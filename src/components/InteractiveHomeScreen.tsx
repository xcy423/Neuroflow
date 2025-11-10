import Home from "../imports/Home-45-2136";
import { motion } from "motion/react";

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

interface InteractiveHomeScreenProps {
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

export default function InteractiveHomeScreen({
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
}: InteractiveHomeScreenProps) {
  return (
    <div className="relative w-full h-full bg-[#fcfcfc] overflow-y-auto pb-28">
      {/* Figma Design Base */}
      <div className="relative">
        <Home />
      </div>

      {/* Interactive Overlays */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Layout Button - Top Right */}
        <motion.button
          onClick={onLayoutClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-[76px] right-[40px] pointer-events-auto bg-white/90 backdrop-blur-sm border-2 border-[#4A90E2] rounded-full p-2.5 shadow-lg hover:shadow-xl transition-all z-50"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4A90E2" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
          </svg>
        </motion.button>

        {/* Plus Button Overlay */}
        {userSettings.showPlusButton && (
          <motion.button
            onClick={onPlusClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute bottom-[95px] left-[calc(50%-30px)] w-[60px] h-[60px] rounded-full pointer-events-auto z-40"
            aria-label="Open mood log"
          />
        )}

        {/* Daily Goal Streak - Clickable */}
        <motion.div
          onClick={onStreakClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="absolute top-[168px] left-[32px] w-[370px] h-[80px] rounded-[16px] pointer-events-auto cursor-pointer transition-all hover:shadow-lg"
          aria-label="View streak history"
        />

        {/* Steps Widget - Clickable */}
        {widgets.find(w => w.id === "steps")?.enabled && (
          <motion.div
            onClick={() => onWidgetClick("steps")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="absolute top-[276px] left-[32px] w-[370px] h-[180px] rounded-[16px] pointer-events-auto cursor-pointer transition-all hover:shadow-lg"
            aria-label="View steps details"
          />
        )}

        {/* Sleep Widget - Clickable */}
        {widgets.find(w => w.id === "sleep")?.enabled && (
          <motion.div
            onClick={() => onWidgetClick("sleep")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="absolute top-[484px] left-[32px] w-[370px] h-[200px] rounded-[16px] pointer-events-auto cursor-pointer transition-all hover:shadow-lg"
            aria-label="View sleep details"
          />
        )}

        {/* HRV Widget - Clickable */}
        {widgets.find(w => w.id === "hrv")?.enabled && (
          <motion.div
            onClick={() => onWidgetClick("hrv")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="absolute top-[712px] left-[32px] w-[177px] h-[177px] rounded-[16px] pointer-events-auto cursor-pointer transition-all hover:shadow-lg"
            aria-label="View HRV details"
          />
        )}

        {/* Blood Oxygen Widget - Clickable */}
        {widgets.find(w => w.id === "bloodOxygen")?.enabled && (
          <motion.div
            onClick={() => onWidgetClick("bloodOxygen")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="absolute top-[712px] left-[225px] w-[177px] h-[177px] rounded-[16px] pointer-events-auto cursor-pointer transition-all hover:shadow-lg"
            aria-label="View blood oxygen details"
          />
        )}

        {/* Mascot Speech Bubble - Clickable for Sanctuary */}
        {userSettings.showMascot && (
          <motion.div
            onClick={onSanctuaryClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="absolute bottom-[115px] left-[32px] w-[291px] h-[100px] rounded-[8px] pointer-events-auto cursor-pointer transition-all"
            aria-label="Visit sanctuary"
          />
        )}

        {/* Hide mascot if setting is off */}
        {!userSettings.showMascot && (
          <div className="absolute bottom-[115px] left-[32px] w-[330px] h-[120px] bg-[#fcfcfc] z-30" />
        )}

        {/* Tooltip Hints */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="absolute top-[140px] right-[100px] pointer-events-auto bg-[#4A90E2] text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg z-40"
        >
          👆 Tap widgets for details
        </motion.div>
      </div>
    </div>
  );
}
