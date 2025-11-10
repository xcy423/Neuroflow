import { useState } from "react";
import { Search } from "lucide-react";
import svgPaths from "../imports/svg-snij5ma8dm";

export default function CoursesScreen() {
  const [activeTab, setActiveTab] = useState<"my" | "discover">("my");
  const [searchQuery, setSearchQuery] = useState("");

  const courses = [
    {
      id: 1,
      title: "Meditation basics",
      description: "Inhale for 4, hold for 4, exhale for 4",
      category: "Mental",
      participants: 100,
      duration: "10 min",
      progress: 25,
      currentSession: 2,
      totalSessions: 8,
    },
    {
      id: 2,
      title: "Morning Yoga Flow",
      description: "Gentle stretches to start your day",
      category: "Mental",
      participants: 156,
      duration: "15 min",
      progress: 60,
      currentSession: 5,
      totalSessions: 8,
    },
    {
      id: 3,
      title: "Sleep Meditation",
      description: "Guided meditation for better sleep",
      category: "Mental",
      participants: 234,
      duration: "20 min",
      progress: 0,
      currentSession: 0,
      totalSessions: 10,
    },
  ];

  const enrolledCourses = courses.filter(c => c.progress > 0);
  const completedCount = enrolledCourses.filter(c => c.progress === 100).length;
  const enrolledCount = enrolledCourses.length;

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
              <span className="whitespace-nowrap">My Course</span>
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
          {/* Course Stats */}
          {activeTab === "my" && (
            <div className="flex gap-5 mb-7 flex-wrap justify-center">
              <div className="flex-1 min-w-[150px] max-w-[170px] bg-white border border-[#e2e6e7] rounded-[12px] p-3 flex items-center gap-3">
                <div className="relative size-[28px] flex-shrink-0">
                  <div className="absolute aspect-[19.8/26.4] left-[24.24%] right-[21.21%] top-[calc(50%+0.5px)] translate-y-[-50%]">
                    <div className="absolute inset-[-2.58%_-3.27%_-2.46%_-3.27%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 22">
                        <path d={svgPaths.p2e388800} fill="#2C3E50" stroke="#2C3E50" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="font-bold text-[16px] text-[#2c3e50]">{enrolledCount}</div>
                <div className="font-medium text-[12px] text-[#2c3e50]">Enrolled</div>
              </div>

              <div className="flex-1 min-w-[150px] max-w-[170px] bg-white border border-[#e2e6e7] rounded-[12px] p-3 flex items-center gap-3">
                <div className="size-[28px] flex-shrink-0 bg-[#2c3e50] rounded-full flex items-center justify-center">
                  <svg className="size-[10px]" fill="none" viewBox="0 0 12 9">
                    <path d="M1 4.7333L4.18164 8L11 1" stroke="#FCFCFC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
                <div className="font-bold text-[16px] text-[#2c3e50]">{completedCount}</div>
                <div className="font-medium text-[12px] text-[#2c3e50]">Completed</div>
              </div>
            </div>
          )}

          {/* Sort Dropdown */}
          {activeTab === "my" && (
            <div className="flex justify-end mb-7">
              <button className="flex gap-1 items-center justify-center px-3 py-2 rounded-[8px]">
                <span className="text-[14px] font-bold text-[#2c3e50]">Date</span>
                <div className="relative size-[15px]">
                  <div className="absolute flex items-center justify-center left-[14.71%] right-[14.71%] top-1/2 translate-y-[-50%]">
                    <div className="rotate-[270deg] size-[12px]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
                        <path d={svgPaths.p3314f5f0} fill="#2C3E50" stroke="#2C3E50" strokeWidth="0.5" />
                      </svg>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          )}

          {/* Course List */}
          <div className="flex flex-col gap-7 pb-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-[16px] border border-[#4a90e2] p-4 shadow-[2px_4px_20px_0px_inset_rgba(168,213,186,0.1)] relative overflow-hidden"
              >
                {/* Background decoration */}
                <div className="absolute left-[-82px] top-[-24.48px] pointer-events-none opacity-50 mix-blend-multiply">
                  <svg width="393" height="137" fill="none" viewBox="0 0 393 137">
                    <path d={svgPaths.pb4d74c0} stroke="url(#paint0_radial)" strokeWidth="20" />
                    <defs>
                      <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(266.99 90.3718 -143.527 168.111 31.2421 23.3579)">
                        <stop offset="0.117544" stopColor="#4A90E2" stopOpacity="0.3" />
                        <stop offset="0.5" stopColor="white" stopOpacity="0.5" />
                        <stop offset="1" stopColor="#4A90E2" stopOpacity="0.5" />
                      </radialGradient>
                    </defs>
                  </svg>
                </div>

                <div className="relative z-10 flex items-start justify-between gap-4">
                  {/* Course Info */}
                  <div className="flex-1 flex flex-col justify-between min-h-[120px]">
                    <div className="flex gap-2 items-center mb-3">
                      <h3 className="font-bold text-[16px] text-black">{course.title}</h3>
                    </div>

                    <div className="flex gap-2 items-center mb-3 flex-wrap">
                      <div className="px-1 py-0.5 rounded-[4px] bg-[rgba(168,213,186,0.2)]">
                        <span className="text-[14px] font-semibold text-[#a8d5ba]">{course.category}</span>
                      </div>
                      <div className="flex gap-1 items-center px-1 py-0.5">
                        <div className="size-[18px]">
                          <svg className="block size-full" fill="none" viewBox="0 0 15 13">
                            <path d={svgPaths.p35213980} stroke="#80646F" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <span className="text-[14px] font-medium text-[#80646f]">{course.participants}</span>
                      </div>
                    </div>

                    <p className="text-[12px] text-black mb-0">{course.description}</p>
                  </div>

                  {/* Progress Circle & Duration */}
                  <div className="flex flex-col gap-3 items-end flex-shrink-0 w-[100px]">
                    <div className="px-2 py-0.5 rounded-[4px] bg-[rgba(245,166,35,0.2)] flex gap-1 items-center">
                      <div className="size-[16px]">
                        <svg className="block size-full" fill="none" viewBox="0 0 14 14">
                          <path d={svgPaths.p22243200} stroke="#F5A623" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                      </div>
                      <span className="text-[14px] font-bold text-[#f5a623]">{course.duration}</span>
                    </div>

                    {/* Progress Circle */}
                    <div className="relative size-[75px]">
                      <svg className="block size-full -rotate-90" viewBox="0 0 75 75">
                        <circle cx="37.5" cy="37.5" r="33.75" fill="none" stroke="#ECF0F1" strokeWidth="7.5" />
                        <circle
                          cx="37.5"
                          cy="37.5"
                          r="33.75"
                          fill="none"
                          stroke="#4A90E2"
                          strokeWidth="7.5"
                          strokeDasharray={`${(course.progress / 100) * 212} 212`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-[12px] font-bold text-[#4a90e2]">{course.currentSession}</span>
                        <span className="text-[9px] font-light text-[#4a90e2]">/{course.totalSessions}</span>
                        <span className="text-[9px] font-light text-[#4a90e2]">{course.progress}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Continue/Join Button - Centered with full width on mobile */}
                <button className="w-full mt-4 bg-[#4A90E2] text-white py-3 rounded-[12px] font-bold text-[14px] hover:bg-[#3A80D2] active:scale-98 transition-all flex items-center justify-center">
                  {course.progress > 0 ? "Continue Course" : "Join Now"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
