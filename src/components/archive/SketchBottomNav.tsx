import React from 'react';
import { Home, Trophy, BookOpen, Sparkles, User } from 'lucide-react';

interface SketchBottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const SketchBottomNav: React.FC<SketchBottomNavProps> = ({
  activeTab,
  onTabChange
}) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'challenges', icon: Trophy, label: 'Challenges' },
    { id: 'courses', icon: BookOpen, label: 'Courses' },
    { id: 'sanctuary', icon: Sparkles, label: 'Sanctuary' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 max-w-[390px] mx-auto">
      <div className="bg-white/95 border-t-[4px] border-black px-2 py-3"
           style={{
             borderRadius: '24px 24px 0 0',
             boxShadow: '0 -4px 0px rgba(0,0,0,0.1)',
             backdropFilter: 'blur(10px)'
           }}>
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="flex flex-col items-center gap-1 relative"
              >
                {/* Icon with sketch style */}
                <div className={`p-2 rounded-[12px] border-[2.5px] transition-all ${
                  isActive 
                    ? 'bg-[#F5A623] border-black' 
                    : 'bg-transparent border-transparent'
                }`}
                style={{
                  borderRadius: isActive ? '48% 52% 50% 50% / 52% 48% 52% 48%' : '50%',
                  boxShadow: isActive ? '2px 2px 0px rgba(0,0,0,0.15)' : 'none',
                  transform: isActive ? 'rotate(-2deg)' : 'none'
                }}>
                  <Icon 
                    className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#1a1a1a]'}`}
                    strokeWidth={3}
                  />
                </div>
                
                {/* Label with handwriting font */}
                <span className={`text-[12px] font-handwriting ${
                  isActive ? 'text-[#1a1a1a]' : 'text-[#666]'
                }`}>
                  {tab.label}
                </span>
                
                {/* Active indicator - doodled underline */}
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#F5A623] rounded-full"
                       style={{
                         borderRadius: '50% 50% 50% 50% / 50% 50% 50% 50%',
                         transform: 'translateX(-50%) rotate(1deg)'
                       }} />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
