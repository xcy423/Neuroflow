import { useState } from "react";
import { Flame, Clock, Search } from "lucide-react";

export default function ChallengesScreen() {
  const [activeTab, setActiveTab] = useState<"my" | "discover">("my");

  const challenges = [
    {
      id: 1,
      title: "7-Day Mindfulness",
      description: "Practice mindfulness meditation daily",
      category: "Mental",
      duration: "7 Days",
      difficulty: "Easy",
      participants: 342,
      progress: 57,
      currentDay: 4,
      totalDays: 7,
      joined: true,
    },
    {
      id: 2,
      title: "Morning Energy Boost",
      description: "Start each day with a 10-min workout",
      category: "Physical",
      duration: "14 Days",
      difficulty: "Medium",
      participants: 218,
      progress: 35,
      currentDay: 5,
      totalDays: 14,
      joined: true,
    },
    {
      id: 3,
      title: "30-Day Wellness",
      description: "Complete wellness journey",
      category: "Mental",
      duration: "30 Days",
      difficulty: "Hard",
      participants: 567,
      progress: 0,
      currentDay: 0,
      totalDays: 30,
      joined: false,
    },
  ];

  const myChallenges = challenges.filter(c => c.joined);
  const activeChallenges = myChallenges.filter(c => c.progress < 100).length;
  const completedChallenges = myChallenges.filter(c => c.progress === 100).length;

  return (
    <div className="bg-[#fcfcfc] relative size-full overflow-hidden">
      <div className="size-full overflow-y-auto pb-24">
        {/* Sticky Tab Navigation */}
        <div className="sticky top-0 z-40 bg-[#fcfcfc]/95 backdrop-blur-sm px-5 py-3 border-b border-[#e2e6e7]/30">
          <div className="bg-[#ecf0f1] flex items-center pl-[2px] pr-[10px] py-[2px] rounded-[100px] w-full max-w-md mx-auto">
            <button
              onClick={() => setActiveTab("my")}
              className={`flex-1 h-[54.476px] flex items-center justify-center gap-3 px-7 py-[3px] rounded-[100px] font-bold text-[16px] transition-all ${
                activeTab === "my"
                  ? "bg-white text-[#2c3e50] shadow-sm"
                  : "text-[#2c3e50]"
              }`}
            >
              {activeTab === "my" && (
                <div className="relative size-5 flex-shrink-0">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 25">
                    <path d="M0.5 3.5C0.500013 2.9734 0.638639 2.45609 0.901943 2.00004C1.16525 1.544 1.54395 1.1653 2 0.902V21.5C2 21.8978 2.15804 22.2794 2.43934 22.5607C2.72064 22.842 3.10218 23 3.5 23H15.5C15.8978 23 16.2794 22.842 16.5607 22.5607C16.842 22.2794 17 21.8978 17 21.5V3.5C17 3.10218 16.842 2.72064 16.5607 2.43934C16.2794 2.15804 15.8978 2 15.5 2H12.5V0.5H15.5C16.2956 0.5 17.0587 0.81607 17.6213 1.37868C18.1839 1.94129 18.5 2.70435 18.5 3.5V21.5C18.5 22.2956 18.1839 23.0587 17.6213 23.6213C17.0587 24.1839 16.2956 24.5 15.5 24.5H3.5C2.70435 24.5 1.94129 24.1839 1.37868 23.6213C0.81607 23.0587 0.5 22.2956 0.5 21.5V3.5ZM3.5 0.5V10.25C3.5 10.3893 3.53879 10.5258 3.61201 10.6443C3.68524 10.7628 3.79001 10.8585 3.91459 10.9208C4.03917 10.9831 4.17863 11.0095 4.31735 10.997C4.45608 10.9845 4.58857 10.9336 4.7 10.85L7.25 8.9375L9.8 10.85C9.91143 10.9336 10.0439 10.9845 10.1826 10.997C10.3214 11.0095 10.4608 10.9831 10.5854 10.9208C10.71 10.8585 10.8148 10.7628 10.888 10.6443C10.9612 10.5258 11 10.3893 11 10.25V0.5H3.5ZM5 8.75V2H9.5V8.75L7.7 7.4C7.57018 7.30263 7.41228 7.25 7.25 7.25C7.08772 7.25 6.92982 7.30263 6.8 7.4L5 8.75Z" fill="#2C3E50" stroke="#2C3E50" />
                  </svg>
                </div>
              )}
              <span className="whitespace-nowrap">My Challenges</span>
            </button>
            <button
              onClick={() => setActiveTab("discover")}
              className={`flex-1 h-[54.476px] flex items-center justify-center gap-3 px-7 py-[3px] rounded-[100px] font-bold text-[16px] transition-all ${
                activeTab === "discover"
                  ? "bg-white text-[#2c3e50] shadow-sm"
                  : "text-[#2c3e50]"
              }`}
            >
              <span className="whitespace-nowrap">Discover</span>
              {activeTab === "discover" && <Search className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="px-5 sm:px-8 pt-5">
          {/* Challenge Stats */}
          {activeTab === "my" && (
            <div className="flex gap-5 mb-7 flex-wrap justify-center">
              <div className="flex-1 min-w-[150px] max-w-[170px] bg-white border border-[#e2e6e7] rounded-[12px] p-3 flex items-center gap-3">
                <Flame className="w-7 h-7 text-[#F5A623] flex-shrink-0" />
                <div className="font-bold text-[16px] text-[#2c3e50]">{activeChallenges}</div>
                <div className="font-medium text-[12px] text-[#2c3e50]">Active</div>
              </div>

              <div className="flex-1 min-w-[150px] max-w-[170px] bg-white border border-[#e2e6e7] rounded-[12px] p-3 flex items-center gap-3">
                <div className="size-7 flex-shrink-0 bg-[#A8D5BA] rounded-full flex items-center justify-center">
                  <svg className="size-4" fill="none" viewBox="0 0 12 9">
                    <path d="M1 4.7333L4.18164 8L11 1" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
                <div className="font-bold text-[16px] text-[#2c3e50]">{completedChallenges}</div>
                <div className="font-medium text-[12px] text-[#2c3e50]">Done</div>
              </div>
            </div>
          )}

          {/* Challenge List */}
          <div className="flex flex-col gap-5 pb-8">
            {(activeTab === "my" ? myChallenges : challenges).map((challenge) => (
              <div
                key={challenge.id}
                className="bg-white rounded-[16px] border border-[#e2e6e7] p-4 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  {/* Challenge Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h3 className="font-bold text-[16px] text-[#2c3e50]">{challenge.title}</h3>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-[4px] text-[11px] font-semibold ${
                        challenge.difficulty === "Easy" ? "bg-[#A8D5BA]/20 text-[#A8D5BA]" :
                        challenge.difficulty === "Medium" ? "bg-[#F5A623]/20 text-[#F5A623]" :
                        "bg-[#F5A623]/30 text-[#F5A623]"
                      }`}>
                        {challenge.difficulty}
                      </span>
                    </div>
                    <p className="text-[13px] text-[#868686] mb-3">{challenge.description}</p>

                    <div className="flex items-center gap-3 flex-wrap text-[12px] text-[#868686]">
                      <div className="flex items-center gap-1">
                        <div className="px-2 py-0.5 rounded-[4px] bg-[rgba(168,213,186,0.2)]">
                          <span className="text-[12px] font-semibold text-[#a8d5ba]">{challenge.category}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{challenge.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <span>{challenge.participants} joined</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Badge */}
                  {challenge.joined && (
                    <div className="flex-shrink-0">
                      <div className="relative size-16">
                        <svg className="block size-full -rotate-90" viewBox="0 0 64 64">
                          <circle cx="32" cy="32" r="28" fill="none" stroke="#ECF0F1" strokeWidth="6" />
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            fill="none"
                            stroke="#4A90E2"
                            strokeWidth="6"
                            strokeDasharray={`${(challenge.progress / 100) * 176} 176`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-[14px] font-bold text-[#4a90e2]">{challenge.currentDay}</span>
                          <span className="text-[10px] font-light text-[#4a90e2]">/{challenge.totalDays}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Progress Bar */}
                {challenge.joined && (
                  <div className="mb-4">
                    <div className="w-full h-2.5 bg-[#E8F4FD] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#4A90E2] to-[#A8D5BA] rounded-full transition-all"
                        style={{ width: `${challenge.progress}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-[#4A90E2] mt-1 text-right">{challenge.progress}% complete</p>
                  </div>
                )}

                {/* Action Button - Centered with full width */}
                <button className="w-full bg-[#4A90E2] text-white py-3 rounded-[12px] font-bold text-[14px] hover:bg-[#3A80D2] active:scale-98 transition-all">
                  {challenge.joined ? "Continue Challenge" : "Join Challenge"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
