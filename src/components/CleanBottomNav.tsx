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
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
      style={{
        paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 16px)',
      }}
    >
      {/* Floating Navigation Bar */}
      <div 
        className="relative bg-white rounded-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] pointer-events-auto"
        style={{
          width: 'calc(100vw - 128px)',
          maxWidth: '420px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
          gap: '0px',
          alignItems: 'center',
        }}
      >
        {/* Home Button */}
        {(() => {
          const item = navItems[0];
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          return (
            <motion.button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center justify-center gap-1 h-[70px] transition-all"
            >
              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                  y: isActive ? -2 : 0,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <Icon
                  size={24}
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
        })()}

        {/* Courses Button */}
        {(() => {
          const item = navItems[1];
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          return (
            <motion.button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center justify-center gap-1 h-[70px] transition-all"
            >
              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                  y: isActive ? -2 : 0,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <Icon
                  size={24}
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
        })()}

        {/* Center Plus Button */}
        {showPlusButton && (
          <motion.button
            onClick={onPlusClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="-mt-6 w-[56px] h-[56px] bg-[#4A90E2] rounded-full shadow-[0_6px_20px_rgba(74,144,226,0.4)] flex items-center justify-center z-50 mx-auto"
            style={{
              boxShadow: '0 6px 20px rgba(74, 144, 226, 0.4), 0 2px 8px rgba(0, 0, 0, 0.12)'
            }}
          >
            <Plus className="w-6 h-6 text-white" strokeWidth={3} />
          </motion.button>
        )}

        {/* Challenges Button */}
        {(() => {
          const item = navItems[2];
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          return (
            <motion.button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center justify-center gap-1 h-[70px] transition-all"
            >
              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                  y: isActive ? -2 : 0,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <Icon
                  size={24}
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
        })()}

        {/* Profile Button */}
        {(() => {
          const item = navItems[3];
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          return (
            <motion.button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center justify-center gap-1 h-[70px] transition-all"
            >
              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                  y: isActive ? -2 : 0,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <Icon
                  size={24}
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
        })()}
      </div>
    </div>
  );
}
