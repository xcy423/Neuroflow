import { Home, BookOpen, Trophy, User } from "lucide-react";

interface BottomNavProps {
  currentScreen: "home" | "courses" | "challenges" | "sanctuary" | "profile";
  onNavigate: (screen: "home" | "courses" | "challenges" | "sanctuary" | "profile") => void;
  onPlusClick: () => void;
  showPlusButton?: boolean;
}

export default function BottomNav({ currentScreen, onNavigate, onPlusClick, showPlusButton = true }: BottomNavProps) {
  const navItems = [
    { id: "home" as const, label: "Home", icon: Home },
    { id: "courses" as const, label: "Course", icon: BookOpen },
    { id: "challenges" as const, label: "Challenge", icon: Trophy },
    { id: "profile" as const, label: "Profile", icon: User },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center pb-2 px-4">
      <div className="bg-white/80 backdrop-blur-sm border-2 border-[#e7e7e7] rounded-[110px] shadow-[0px_2.2px_4.4px_0px_rgba(0,0,0,0.15)] h-[64px] w-full max-w-[360px] flex items-center justify-between px-[2px] py-[2px] relative">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center h-full flex-1 rounded-[110px] transition-all ${
                isActive ? "bg-[rgba(74,144,226,0.05)]" : ""
              }`}
              style={{
                marginLeft: index === 0 ? "0" : index === 2 && showPlusButton ? "40px" : "-4.4px",
                marginRight: index === 1 && showPlusButton ? "40px" : index === navItems.length - 1 ? "0" : "0",
              }}
            >
              <div className="relative w-[36px] h-[36px] flex items-center justify-center">
                <Icon
                  size={22}
                  strokeWidth={2.5}
                  className={`transition-colors ${isActive ? "text-[#4A90E2]" : "text-[#868686]"}`}
                />
              </div>
              <span
                className={`text-[10px] font-semibold mt-0.5 transition-colors ${
                  isActive ? "text-[#4A90E2]" : "text-[#868686]"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Center Plus Button */}
        {showPlusButton && (
          <button
            onClick={onPlusClick}
            className="absolute left-1/2 -translate-x-1/2 -top-[20px] w-[60px] h-[60px] bg-[#2C3E50] rounded-full shadow-[0px_0px_20px_0px_rgba(44,62,80,0.2)] flex items-center justify-center transition-all hover:scale-105 active:scale-95 z-10"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
