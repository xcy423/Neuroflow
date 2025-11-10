import React from 'react';
import { Award, TrendingUp, Heart, Activity } from 'lucide-react';

export const SketchProfileScreen = () => {
  return (
    <div className="min-h-screen pb-24 px-4 pt-6 relative z-10">
      {/* Profile Header */}
      <div className="bg-white/90 border-[3px] border-black p-6 rounded-[16px] mb-6"
           style={{
             borderRadius: '50% 50% 48% 52% / 52% 48% 52% 48%',
             boxShadow: '4px 4px 0px rgba(0,0,0,0.15)'
           }}>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 bg-gradient-to-br from-[#4A90E2] to-[#A8D5BA] border-[4px] border-black rounded-full flex items-center justify-center"
               style={{
                 borderRadius: '45% 55% 50% 50% / 52% 48% 52% 48%',
                 boxShadow: '3px 3px 0px rgba(0,0,0,0.2)'
               }}>
            <span className="text-[32px] text-white font-heading">O</span>
          </div>
          <div>
            <h2 className="text-[28px] font-heading text-[#1a1a1a]">Oliver</h2>
            <p className="text-[16px] text-[#666]">Wellness Warrior</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#E8F4FD] border-[2px] border-[#4A90E2] p-3 rounded-[12px]"
               style={{ borderRadius: '50% 50% 48% 52% / 52% 48% 52% 48%' }}>
            <p className="text-[24px] font-heading text-[#4A90E2]">23</p>
            <p className="text-[14px] text-[#666]">Day Streak</p>
          </div>
          <div className="bg-[#FFF9C4] border-[2px] border-[#F9A825] p-3 rounded-[12px]"
               style={{ borderRadius: '48% 52% 50% 50% / 50% 52% 48% 52%' }}>
            <p className="text-[24px] font-heading text-[#F5A623]">12</p>
            <p className="text-[14px] text-[#666]">Badges Earned</p>
          </div>
        </div>
      </div>

      {/* Badge Wall */}
      <div className="bg-white/90 border-[3px] border-black p-5 rounded-[16px] mb-6"
           style={{
             borderRadius: '52% 48% 50% 50% / 48% 50% 50% 52%',
             boxShadow: '4px 4px 0px rgba(0,0,0,0.15)'
           }}>
        <h3 className="text-[22px] font-heading text-[#1a1a1a] mb-4">Badge Collection</h3>
        
        <div className="grid grid-cols-4 gap-3">
          {[
            { icon: '🏆', name: 'First Week', color: '#F5A623' },
            { icon: '⭐', name: 'Consistency', color: '#4A90E2' },
            { icon: '💪', name: '10K Steps', color: '#A8D5BA' },
            { icon: '🧘', name: 'Zen Master', color: '#9B59B6' },
            { icon: '😊', name: 'Happy Mood', color: '#FF6B6B' },
            { icon: '🌙', name: 'Sleep Pro', color: '#6C5CE7' },
            { icon: '💧', name: 'Hydration', color: '#74B9FF' },
            { icon: '🎯', name: 'Goal Getter', color: '#FD79A8' },
          ].map((badge, i) => (
            <div
              key={i}
              className="aspect-square border-[3px] border-black rounded-[12px] flex flex-col items-center justify-center p-2"
              style={{
                backgroundColor: `${badge.color}20`,
                borderColor: badge.color,
                borderRadius: i % 2 === 0 
                  ? '50% 50% 48% 52% / 52% 48% 52% 48%'
                  : '48% 52% 50% 50% / 50% 52% 48% 52%',
                boxShadow: '2px 2px 0px rgba(0,0,0,0.1)'
              }}
            >
              <span className="text-[20px] mb-1">{badge.icon}</span>
              <p className="text-[10px] text-center font-handwriting text-[#666]">{badge.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Historical Metrics */}
      <div className="bg-white/90 border-[3px] border-black p-5 rounded-[16px]"
           style={{
             borderRadius: '50% 50% 52% 48% / 52% 48% 50% 50%',
             boxShadow: '4px 4px 0px rgba(0,0,0,0.15)'
           }}>
        <h3 className="text-[22px] font-heading text-[#1a1a1a] mb-4">This Week</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#4A90E2]/20 border-[2px] border-[#4A90E2] rounded-[8px] flex items-center justify-center"
                   style={{ borderRadius: '50% 50% 48% 52% / 52% 48% 52% 48%' }}>
                <Activity className="w-5 h-5 text-[#4A90E2]" strokeWidth={3} />
              </div>
              <div>
                <p className="text-[16px] font-heading text-[#1a1a1a]">Avg Steps</p>
                <p className="text-[14px] text-[#666]">Daily average</p>
              </div>
            </div>
            <p className="text-[24px] font-heading text-[#4A90E2]">7,245</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#A8D5BA]/20 border-[2px] border-[#A8D5BA] rounded-[8px] flex items-center justify-center"
                   style={{ borderRadius: '48% 52% 50% 50% / 50% 52% 48% 52%' }}>
                <TrendingUp className="w-5 h-5 text-[#A8D5BA]" strokeWidth={3} />
              </div>
              <div>
                <p className="text-[16px] font-heading text-[#1a1a1a]">Mood Score</p>
                <p className="text-[14px] text-[#666]">Average feeling</p>
              </div>
            </div>
            <p className="text-[24px] font-heading text-[#A8D5BA]">8.2/10</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FF6B6B]/20 border-[2px] border-[#FF6B6B] rounded-[8px] flex items-center justify-center"
                   style={{ borderRadius: '50% 50% 52% 48% / 52% 48% 50% 50%' }}>
                <Heart className="w-5 h-5 text-[#FF6B6B]" strokeWidth={3} />
              </div>
              <div>
                <p className="text-[16px] font-heading text-[#1a1a1a]">Avg Heart Rate</p>
                <p className="text-[14px] text-[#666]">Resting BPM</p>
              </div>
            </div>
            <p className="text-[24px] font-heading text-[#FF6B6B]">68</p>
          </div>
        </div>
      </div>
    </div>
  );
};
