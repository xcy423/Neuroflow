import { motion } from "motion/react";
import { ArrowLeft, Plus, TrendingUp, Activity, Moon, Heart } from "lucide-react";
import { Button } from "./ui/button";

type WidgetType = "steps" | "sleep" | "hrv" | "streak" | "bloodOxygen" | "moodTrends" | "wellnessScore";

interface WidgetDetailScreenProps {
  widgetType: WidgetType;
  onBack: () => void;
  onLogActivity: () => void;
}

export default function WidgetDetailScreen({
  widgetType,
  onBack,
  onLogActivity,
}: WidgetDetailScreenProps) {
  const renderStepsDetail = () => (
    <div className="space-y-6">
      {/* Progress Circle */}
      <div className="flex items-center justify-center">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
            <defs>
              <linearGradient id="stepsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4A90E2" />
                <stop offset="100%" stopColor="#A8D5BA" />
              </linearGradient>
            </defs>
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="#ECF0F1"
              strokeWidth="16"
            />
            <motion.circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="url(#stepsGradient)"
              strokeWidth="16"
              strokeDasharray={`${(6514 / 8000) * 565} 565`}
              strokeLinecap="round"
              initial={{ strokeDasharray: "0 565" }}
              animate={{ strokeDasharray: `${(6514 / 8000) * 565} 565` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-5xl font-bold text-[#4A90E2]">6,514</p>
            <p className="text-lg text-[#868686]">of 8,000 steps</p>
            <p className="text-sm text-[#4A90E2] mt-2">81% complete</p>
          </div>
        </div>
      </div>

      {/* Activity Map Placeholder */}
      <div className="bg-white border border-[#e2e6e7] rounded-[16px] p-6">
        <h3 className="text-lg font-bold text-[#2c3e50] mb-4">Today's Activity</h3>
        <div className="h-48 bg-[#E8F4FD] rounded-[12px] flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-[#4A90E2] rounded-full"
                style={{
                  width: `${Math.random() * 60 + 20}px`,
                  height: `${Math.random() * 60 + 20}px`,
                  left: `${Math.random() * 80 + 10}%`,
                  top: `${Math.random() * 80 + 10}%`,
                }}
              />
            ))}
          </div>
          <Activity className="w-16 h-16 text-[#4A90E2] opacity-50" />
        </div>
        <p className="text-sm text-[#868686] mt-2 text-center">
          🚶 Morning walk: 3,200 steps • 🏃 Afternoon jog: 2,100 steps
        </p>
      </div>

      {/* Hourly Breakdown */}
      <div className="bg-white border border-[#e2e6e7] rounded-[16px] p-6">
        <h3 className="text-lg font-bold text-[#2c3e50] mb-4">Hourly Breakdown</h3>
        <div className="flex items-end justify-between h-32 gap-2">
          {[420, 180, 650, 890, 720, 550, 680, 920, 450, 310, 640, 520].map((steps, i) => (
            <div key={i} className="flex-1 flex flex-col items-center">
              <motion.div
                className="w-full bg-gradient-to-t from-[#4A90E2] to-[#A8D5BA] rounded-t-md"
                initial={{ height: 0 }}
                animate={{ height: `${(steps / 1000) * 100}%` }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
              />
              <p className="text-[9px] text-[#868686] mt-1">{i + 6}am</p>
            </div>
          ))}
        </div>
      </div>

      {/* Log Extra Activity Button */}
      <Button
        onClick={onLogActivity}
        className="w-full bg-[#4A90E2] hover:bg-[#3A80D2] text-white py-6 rounded-[16px] font-bold text-lg"
      >
        <Plus className="w-5 h-5 mr-2" />
        Log Extra Activity
      </Button>
    </div>
  );

  const renderSleepDetail = () => (
    <div className="space-y-6">
      {/* Sleep Score */}
      <div className="bg-white border border-[#e2e6e7] rounded-[16px] p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-[#2c3e50]">Sleep Score</h3>
          <div className="flex items-center gap-2">
            <Moon className="w-5 h-5 text-[#A8D5BA]" />
            <span className="text-2xl font-bold text-[#A8D5BA]">78</span>
          </div>
        </div>
        <p className="text-sm text-[#868686]">Good quality sleep last night</p>
      </div>

      {/* Weekly Sleep Chart */}
      <div className="bg-white border border-[#e2e6e7] rounded-[16px] p-6">
        <h3 className="text-lg font-bold text-[#2c3e50] mb-4">Weekly Sleep Pattern</h3>
        <div className="flex items-end justify-between h-40 gap-2">
          {[
            { deep: 4, light: 3.5 },
            { deep: 3.5, light: 4 },
            { deep: 4.5, light: 3 },
            { deep: 3, light: 4.5 },
            { deep: 4, light: 3.5 },
            { deep: 4.5, light: 3.5 },
            { deep: 4, light: 3.5 },
          ].map((day, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <motion.div
                className="w-full bg-[#4A90E2] rounded-t-md"
                initial={{ height: 0 }}
                animate={{ height: `${day.deep * 20}px` }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
              />
              <motion.div
                className="w-full bg-[#A8D5BA]"
                initial={{ height: 0 }}
                animate={{ height: `${day.light * 20}px` }}
                transition={{ delay: i * 0.1 + 0.15, duration: 0.3 }}
              />
              <p className="text-[10px] text-[#868686] mt-1">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i]}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#4A90E2] rounded-sm" />
            <span className="text-xs text-[#868686]">Deep Sleep</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#A8D5BA] rounded-sm" />
            <span className="text-xs text-[#868686]">Light Sleep</span>
          </div>
        </div>
      </div>

      {/* Sleep Tips */}
      <div className="bg-[#E8F4FD] border border-[#4A90E2]/20 rounded-[16px] p-6">
        <h3 className="text-lg font-bold text-[#4A90E2] mb-3">💡 Tips for Better Sleep</h3>
        <ul className="space-y-2 text-sm text-[#2c3e50]">
          <li>✓ Keep a consistent sleep schedule</li>
          <li>✓ Avoid screens 1 hour before bed</li>
          <li>✓ Try meditation or deep breathing</li>
          <li>✓ Keep your room cool and dark</li>
        </ul>
      </div>
    </div>
  );

  const renderHRVDetail = () => (
    <div className="space-y-6">
      {/* Current HRV */}
      <div className="bg-white border border-[#e2e6e7] rounded-[16px] p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-[#2c3e50]">Current HRV</h3>
          <Heart className="w-6 h-6 text-[#F5A623]" />
        </div>
        <div className="text-center">
          <p className="text-5xl font-bold text-[#F5A623]">73.2</p>
          <p className="text-lg text-[#868686] mt-1">ms (milliseconds)</p>
          <p className="text-sm text-[#A8D5BA] mt-2">✓ Good variability</p>
        </div>
      </div>

      {/* HRV Trend */}
      <div className="bg-white border border-[#e2e6e7] rounded-[16px] p-6">
        <h3 className="text-lg font-bold text-[#2c3e50] mb-4">7-Day HRV Trend</h3>
        <div className="h-32 relative">
          <svg className="w-full h-full" viewBox="0 0 300 100">
            <motion.path
              d="M 10,60 C 30,50 50,45 70,40 C 90,35 110,30 130,35 C 150,40 170,50 190,45 C 210,40 230,35 250,30 C 270,25 290,20 290,20"
              fill="none"
              stroke="#F5A623"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] text-[#868686]">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>
      </div>

      {/* Breathing Exercise Recommendation */}
      <div className="bg-[#FFF4E5] border border-[#F5A623]/20 rounded-[16px] p-6">
        <h3 className="text-lg font-bold text-[#F5A623] mb-3">🫁 Breathing Exercise</h3>
        <p className="text-sm text-[#2c3e50] mb-4">
          Your HRV suggests starting with a calming breathing exercise
        </p>
        <Button
          onClick={onLogActivity}
          className="w-full bg-[#F5A623] hover:bg-[#E59613] text-white py-3 rounded-[12px] font-semibold"
        >
          Start 4-7-8 Breathing
        </Button>
      </div>
    </div>
  );

  const getTitle = () => {
    switch (widgetType) {
      case "steps": return "Steps Tracker";
      case "sleep": return "Sleep Analysis";
      case "hrv": return "Heart Rate Variability";
      case "bloodOxygen": return "Blood Oxygen";
      case "moodTrends": return "Mood Trends";
      case "wellnessScore": return "Wellness Score";
      case "streak": return "Daily Streak";
      default: return "Details";
    }
  };

  return (
    <div className="relative w-full h-full bg-[#fcfcfc] overflow-y-auto pb-8">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-[#fcfcfc]/90 backdrop-blur-sm border-b border-[#e2e6e7] px-6 py-4"
      >
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 rounded-full bg-white border border-[#e2e6e7] hover:bg-[#E8F4FD] transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-[#2c3e50]" />
          </button>
          <h1 className="text-xl font-bold text-[#2c3e50]">{getTitle()}</h1>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="px-6 pt-6"
      >
        {widgetType === "steps" && renderStepsDetail()}
        {widgetType === "sleep" && renderSleepDetail()}
        {widgetType === "hrv" && renderHRVDetail()}
        {widgetType === "bloodOxygen" && (
          <div className="text-center py-20">
            <p className="text-lg text-[#868686]">Blood Oxygen details coming soon...</p>
          </div>
        )}
        {widgetType === "moodTrends" && (
          <div className="text-center py-20">
            <p className="text-lg text-[#868686]">Mood Trends details coming soon...</p>
          </div>
        )}
        {widgetType === "wellnessScore" && (
          <div className="text-center py-20">
            <p className="text-lg text-[#868686]">Wellness Score details coming soon...</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
