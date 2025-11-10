import { User, Settings, Award, TrendingUp, Calendar } from "lucide-react";

export default function ProfileScreen() {
  const stats = [
    { label: "Active Days", value: "23", icon: Calendar, color: "#4A90E2" },
    { label: "Challenges", value: "5", icon: Award, color: "#F5A623" },
    { label: "Courses", value: "8", icon: TrendingUp, color: "#A8D5BA" },
  ];

  const achievements = [
    { name: "First Step", icon: "🌱", date: "Oct 20, 2025" },
    { name: "Wellness Warrior", icon: "⚔️", date: "Oct 25, 2025" },
    { name: "Mind Master", icon: "🧠", date: "Nov 5, 2025" },
  ];

  return (
    <div className="bg-[#fcfcfc] relative size-full overflow-y-auto pb-24">
      {/* CRITICAL: Extra Top Spacing for Dynamic Island */}
      <div className="h-[80px] bg-[#fcfcfc]" />
      
      <div className="pt-[20px] px-[32px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-[28px] font-bold text-[#2c3e50]">Profile</h1>
          <button className="size-[40px] rounded-full bg-white border border-[#e2e6e7] flex items-center justify-center hover:bg-[#E8F4FD] transition-all">
            <Settings className="text-[#4A90E2]" size={20} />
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white border border-[#e2e6e7] rounded-[24px] p-6 mb-6 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="size-[80px] rounded-full bg-gradient-to-br from-[#4A90E2] to-[#A8D5BA] flex items-center justify-center text-white text-[32px] font-bold">
              O
            </div>
            <div className="flex-1">
              <h2 className="text-[24px] font-bold text-[#2c3e50] mb-1">
                Oliver Smith
              </h2>
              <p className="text-[14px] text-[#868686]">Level 2 · 2558 pts</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="flex flex-col items-center gap-2 p-4 rounded-[16px] bg-[#fcfcfc]"
                >
                  <Icon size={24} style={{ color: stat.color }} />
                  <p className="text-[20px] font-bold text-[#2c3e50]">
                    {stat.value}
                  </p>
                  <p className="text-[12px] text-[#868686] text-center">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white border border-[#e2e6e7] rounded-[24px] p-6 mb-6 shadow-sm">
          <h3 className="text-[20px] font-bold text-[#2c3e50] mb-4">
            Recent Achievements
          </h3>
          <div className="space-y-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.name}
                className="flex items-center gap-4 p-3 rounded-[12px] bg-[#fcfcfc]"
              >
                <div className="size-[48px] rounded-full bg-white border-2 border-[#A8D5BA] flex items-center justify-center text-2xl">
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-[#2c3e50]">
                    {achievement.name}
                  </p>
                  <p className="text-[12px] text-[#868686]">
                    {achievement.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wellness Metrics */}
        <div className="bg-white border border-[#e2e6e7] rounded-[24px] p-6 shadow-sm">
          <h3 className="text-[20px] font-bold text-[#2c3e50] mb-4">
            Weekly Summary
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-[14px] text-[#2c3e50]">
                  Meditation Time
                </span>
                <span className="text-[14px] font-semibold text-[#4A90E2]">
                  95 min
                </span>
              </div>
              <div className="w-full h-3 bg-[#E8F4FD] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#4A90E2] rounded-full"
                  style={{ width: "75%" }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-[14px] text-[#2c3e50]">
                  Steps Goal
                </span>
                <span className="text-[14px] font-semibold text-[#A8D5BA]">
                  45,628
                </span>
              </div>
              <div className="w-full h-3 bg-[#E8F4FD] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#A8D5BA] rounded-full"
                  style={{ width: "82%" }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-[14px] text-[#2c3e50]">
                  Sleep Quality
                </span>
                <span className="text-[14px] font-semibold text-[#F5A623]">
                  78%
                </span>
              </div>
              <div className="w-full h-3 bg-[#E8F4FD] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#F5A623] rounded-full"
                  style={{ width: "78%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
