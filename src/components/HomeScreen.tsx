import { Settings2 } from "lucide-react";

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

interface HomeScreenProps {
  widgets: Widget[];
  userSettings: UserSettings;
  moodLogCount: number;
  wellnessScore: number;
  onLayoutClick: () => void;
  onPlusClick: () => void;
  onSanctuaryClick: () => void;
}

export default function HomeScreen({
  widgets,
  userSettings,
  moodLogCount,
  wellnessScore,
  onLayoutClick,
  onPlusClick,
  onSanctuaryClick,
}: HomeScreenProps) {
  const enabledWidgets = widgets.filter(w => w.enabled).sort((a, b) => a.order - b.order);

  return (
    <div className="relative w-full h-full bg-[#fcfcfc] overflow-y-auto pb-28">
      <div className="pt-[70px] px-5 sm:px-8 min-h-full">
        {/* Header with Layout Button */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-[24px] sm:text-[28px] font-bold text-[#2c3e50] mb-1">
              Good Morning
            </h1>
            <p className="text-[14px] text-[#868686]">Monday, Nov 10</p>
          </div>
          <button
            onClick={onLayoutClick}
            className="bg-white border-2 border-[#4A90E2] rounded-full p-2.5 shadow-md hover:bg-[#E8F4FD] transition-all flex-shrink-0"
          >
            <Settings2 className="w-5 h-5 text-[#4A90E2]" />
          </button>
        </div>

        {/* Wellness Score Widget */}
        <div className="mb-6">
          <div className="bg-white border border-[#e2e6e7] rounded-[16px] p-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#4A90E2] to-[#A8D5BA] flex items-center justify-center flex-shrink-0">
                <span className="text-white text-[20px] font-bold">{wellnessScore}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] text-[#868686] mb-1">Wellness Score</p>
                <div className="flex items-center gap-2">
                  <p className="text-[18px] sm:text-[20px] font-bold text-[#4A90E2]">{wellnessScore}%</p>
                  <span className="text-[14px] text-[#A8D5BA] font-semibold">Great!</span>
                </div>
                <div className="w-full h-2 bg-[#E8F4FD] rounded-full overflow-hidden mt-2">
                  <div
                    className="h-full bg-gradient-to-r from-[#4A90E2] to-[#A8D5BA] rounded-full transition-all"
                    style={{ width: `${wellnessScore}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Streak */}
        <div className="mb-6">
          <div className="bg-white border border-[#e2e6e7] rounded-[16px] p-4 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-[16px] font-bold text-[#2c3e50]">Daily Streak</h3>
              <span className="text-[#F5A623] font-bold flex items-center gap-1">
                🔥 <span className="text-[14px]">{moodLogCount} Days</span>
              </span>
            </div>
            <div className="w-full h-3 bg-[#E8F4FD] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#F5A623] rounded-full transition-all"
                style={{ width: `${(moodLogCount / 30) * 100}%` }}
              />
            </div>
            <div className="mt-2 flex justify-between items-center">
              <p className="text-[12px] text-[#868686]">Goal: 30 days</p>
              <p className="text-[12px] text-[#4A90E2] font-semibold">{moodLogCount} mood logs</p>
            </div>
          </div>
        </div>

        {/* Health Widgets Grid - Responsive with no overlaps */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[18px] font-bold text-[#2c3e50]">Health Metrics</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {enabledWidgets.map((widget) => (
              <div
                key={widget.id}
                className="bg-white border border-[#e2e6e7] rounded-[16px] p-4 shadow-sm min-h-[140px] flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-[14px] font-semibold text-[#2c3e50] mb-2">{widget.name}</h4>
                  {widget.id === "steps" && (
                    <>
                      <p className="text-[24px] font-bold text-[#4A90E2]">6,514</p>
                      <p className="text-[12px] text-[#868686]">of 8,000 steps</p>
                    </>
                  )}
                  {widget.id === "sleep" && (
                    <>
                      <p className="text-[24px] font-bold text-[#A8D5BA]">7.5h</p>
                      <p className="text-[12px] text-[#868686]">Sleep score: 78</p>
                    </>
                  )}
                  {widget.id === "hrv" && (
                    <>
                      <p className="text-[24px] font-bold text-[#F5A623]">73.2</p>
                      <p className="text-[12px] text-[#868686]">bpm</p>
                    </>
                  )}
                  {widget.id === "streak" && (
                    <>
                      <p className="text-[24px] font-bold text-[#4A90E2]">{moodLogCount}</p>
                      <p className="text-[12px] text-[#868686]">day streak</p>
                    </>
                  )}
                </div>
                <div className="w-full h-2 bg-[#E8F4FD] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#4A90E2] rounded-full"
                    style={{ width: widget.id === "steps" ? "81%" : widget.id === "sleep" ? "78%" : "85%" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h3 className="text-[18px] font-bold text-[#2c3e50] mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={onSanctuaryClick}
              className="bg-gradient-to-br from-[#A8D5BA] to-[#8BC5A8] text-white p-4 rounded-[16px] shadow-md hover:shadow-lg transition-all active:scale-98"
            >
              <div className="text-3xl mb-2">🏞️</div>
              <p className="text-[14px] font-bold">Visit Sanctuary</p>
            </button>
            <button
              onClick={onPlusClick}
              className="bg-gradient-to-br from-[#4A90E2] to-[#3A80D2] text-white p-4 rounded-[16px] shadow-md hover:shadow-lg transition-all active:scale-98"
            >
              <div className="text-3xl mb-2">📝</div>
              <p className="text-[14px] font-bold">Log Mood</p>
            </button>
          </div>
        </div>

        {/* Motivation Card */}
        <div className="mb-6">
          <div className="bg-gradient-to-br from-[#E8F4FD] to-white border border-[#4A90E2]/20 rounded-[16px] p-5 shadow-sm">
            <p className="text-[14px] text-[#2c3e50] leading-relaxed">
              💡 <span className="font-semibold">Tip of the day:</span> Take 5 deep breaths when you feel stressed. It helps activate your parasympathetic nervous system.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
