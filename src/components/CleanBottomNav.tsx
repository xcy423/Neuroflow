import { motion } from "motion/react";
import { Home, BookOpen, Trophy, User, Plus } from "lucide-react";

interface CleanBottomNavProps {
  currentScreen: "home" | "courses" | "challenges" | "sanctuary" | "profile";
  onNavigate: (screen: "home" | "courses" | "challenges" | "sanctuary" | "profile") => void;
  onPlusClick: () => void;
  showPlusButton?: boolean;
}

export default function CleanBottomNav({ 
  currentScreen, 
  onNavigate, 
  onPlusClick, 
  showPlusButton = true 
}: CleanBottomNavProps) {
  const navItems = [
    { id: "home" as const, label: "Home", icon: Home },
    { id: "courses" as const, label: "Courses", icon: BookOpen },
    { id: "challenges" as const, label: "Challenges", icon: Trophy },
    { id: "profile" as const, label: "Profile", icon: User },
  ];

  return (
    <div 
      className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-[#e2e6e7] shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-50"
      style={{
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <div className="relative flex items-center justify-around h-[70px] px-2 max-w-[440px] mx-auto">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              whileTap={{ scale: 0.95 }}
              className={`flex flex-col items-center justify-center gap-1 flex-1 h-full transition-all ${
                index === 1 && showPlusButton ? "mr-12" : ""
              } ${index === 2 && showPlusButton ? "ml-12" : ""}`}
            >
              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                  y: isActive ? -2 : 0,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <Icon
                  size={22}
                  strokeWidth={2.5}
                  className={`transition-colors ${
                    isActive ? "text-[#4A90E2]" : "text-[#868686]"
                  }`}
                />
              </motion.div>
              <span
                className={`text-[10px] font-semibold transition-colors ${
                  isActive ? "text-[#4A90E2]" : "text-[#868686]"
                }`}
              >
                {item.label}
              </span>
            </motion.button>
          );
        })}

        {/* Center Floating Action Button - Dark Blue */}
        {showPlusButton && (
          <motion.button
            onClick={onPlusClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute left-1/2 -translate-x-1/2 -top-[22px] w-[56px] h-[56px] bg-[#4A90E2] rounded-full shadow-[0_6px_20px_rgba(74,144,226,0.4)] flex items-center justify-center z-50"
            style={{
              boxShadow: '0 6px 20px rgba(74, 144, 226, 0.4), 0 2px 8px rgba(0, 0, 0, 0.12)'
            }}
          >
            <Plus className="w-6 h-6 text-white" strokeWidth={3} />
          </motion.button>
        )}
      </div>
    </div>
  );
}
