import React from 'react';
import { Plus, Heart, Activity, Moon, TrendingUp, Droplets } from 'lucide-react';
import { motion } from 'motion/react';

interface SketchHomeScreenProps {
  onMoodLog: () => void;
  onHarmonyClick: () => void;
}

export const SketchHomeScreen: React.FC<SketchHomeScreenProps> = ({
  onMoodLog,
  onHarmonyClick
}) => {
  return (
    <div className="min-h-screen pb-24 px-4 pt-6 relative z-10">
      {/* Header with annotations */}
      <div className="relative mb-6">
        <div className="bg-white/90 border-[3px] border-black p-4 rounded-[12px] relative wiggle" 
             style={{ 
               borderRadius: '45% 55% 50% 50% / 50% 48% 52% 50%',
               boxShadow: '4px 4px 0px rgba(0,0,0,0.2)'
             }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[24px] font-heading text-[#1a1a1a]">Good Morning!</p>
              <p className="text-[18px] text-[#666]">Oliver 👋</p>
            </div>
            {/* Harmony mascot icon - annotated */}
            <button 
              onClick={onHarmonyClick}
              className="relative"
            >
              <div className="w-12 h-12 rounded-full bg-[#F5A623] border-[3px] border-black relative"
                   style={{
                     borderRadius: '48% 52% 45% 55% / 52% 48% 52% 48%',
                     boxShadow: '3px 3px 0px rgba(0,0,0,0.15)'
                   }}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20px]">
                  🌟
                </div>
              </div>
              {/* Red annotation */}
              <div className="absolute -top-6 -right-12 text-[14px] text-[#FF6B6B] font-handwriting whitespace-nowrap rotate-[-5deg]">
                Harmony →
              </div>
            </button>
          </div>
        </div>
        
        {/* Sticky note annotation */}
        <div className="absolute -right-2 -top-8 bg-[#FFF9C4] border-[2px] border-[#F9A825] px-3 py-2 rotate-[3deg] shadow-md">
          <p className="text-[14px] font-handwriting text-[#666]">Tap to visit</p>
          <p className="text-[14px] font-handwriting text-[#666]">Sanctuary!</p>
        </div>
      </div>

      {/* HRV Emotional Gauge */}
      <div className="mb-6 relative">
        <div className="bg-white/90 border-[3px] border-black p-5 rounded-[16px]"
             style={{ 
               borderRadius: '48% 52% 50% 50% / 50% 50% 50% 50%',
               boxShadow: '4px 4px 0px rgba(0,0,0,0.2)'
             }}>
          <h3 className="text-[22px] font-heading text-[#1a1a1a] mb-4">Emotional Gauge</h3>
          
          {/* Circular HRV visualization - hand-drawn style */}
          <div className="flex justify-center items-center mb-4">
            <div className="relative w-32 h-32">
              {/* Background circle */}
              <svg className="absolute inset-0" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#E0E0E0"
                  strokeWidth="8"
                  strokeLinecap="round"
                  filter="url(#hand-drawn)"
                />
                {/* Progress circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#A8D5BA"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="251"
                  strokeDashoffset="75"
                  transform="rotate(-90 50 50)"
                  filter="url(#hand-drawn)"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-[28px] font-heading text-[#1a1a1a]">72%</p>
                <p className="text-[14px] text-[#666]">Calm</p>
              </div>
            </div>
          </div>
          
          {/* Blue annotation */}
          <div className="text-center">
            <p className="text-[16px] text-[#4A90E2] font-handwriting">HRV-based reading</p>
          </div>
        </div>
        
        {/* Doodled arrow */}
        <div className="absolute -left-8 top-12 text-[#4A90E2] text-[32px] rotate-[20deg]">
          ←
        </div>
        <div className="absolute -left-20 top-8 text-[14px] text-[#4A90E2] font-handwriting whitespace-nowrap rotate-[5deg]">
          Live from
        </div>
        <div className="absolute -left-20 top-16 text-[14px] text-[#4A90E2] font-handwriting whitespace-nowrap rotate-[5deg]">
          wearable
        </div>
      </div>

      {/* Widget Grid - hand-drawn style */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Steps Widget */}
        <div className="bg-white/90 border-[3px] border-black p-4 rounded-[12px]"
             style={{ 
               borderRadius: '50% 50% 48% 52% / 52% 48% 52% 48%',
               boxShadow: '3px 3px 0px rgba(0,0,0,0.15)'
             }}>
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-[#4A90E2]" strokeWidth={3} />
            <p className="text-[16px] font-heading text-[#1a1a1a]">Steps</p>
          </div>
          <p className="text-[26px] font-heading text-[#1a1a1a]">6,514</p>
          <p className="text-[14px] text-[#666]">/8,000</p>
          {/* Hand-drawn progress bar */}
          <div className="mt-2 h-2 bg-gray-200 rounded-full relative overflow-hidden"
               style={{ borderRadius: '50% 50% 50% 50% / 50% 50% 50% 50%' }}>
            <div className="absolute top-0 left-0 h-full w-[75%] bg-[#4A90E2]"
                 style={{ borderRadius: '50% 50% 50% 50% / 50% 50% 50% 50%' }} />
          </div>
        </div>

        {/* Heart Rate Widget */}
        <div className="bg-white/90 border-[3px] border-black p-4 rounded-[12px]"
             style={{ 
               borderRadius: '48% 52% 50% 50% / 50% 52% 48% 52%',
               boxShadow: '3px 3px 0px rgba(0,0,0,0.15)'
             }}>
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-5 h-5 text-[#FF6B6B]" strokeWidth={3} />
            <p className="text-[16px] font-heading text-[#1a1a1a]">Heart</p>
          </div>
          <p className="text-[26px] font-heading text-[#1a1a1a]">72</p>
          <p className="text-[14px] text-[#666]">bpm</p>
        </div>

        {/* Sleep Widget */}
        <div className="bg-white/90 border-[3px] border-black p-4 rounded-[12px]"
             style={{ 
               borderRadius: '52% 48% 50% 50% / 48% 50% 50% 52%',
               boxShadow: '3px 3px 0px rgba(0,0,0,0.15)'
             }}>
          <div className="flex items-center gap-2 mb-2">
            <Moon className="w-5 h-5 text-[#A8D5BA]" strokeWidth={3} />
            <p className="text-[16px] font-heading text-[#1a1a1a]">Sleep</p>
          </div>
          <p className="text-[26px] font-heading text-[#1a1a1a]">7.5h</p>
          <p className="text-[14px] text-[#666]">last night</p>
        </div>

        {/* Mood Widget */}
        <div className="bg-white/90 border-[3px] border-black p-4 rounded-[12px]"
             style={{ 
               borderRadius: '50% 50% 52% 48% / 52% 48% 50% 50%',
               boxShadow: '3px 3px 0px rgba(0,0,0,0.15)'
             }}>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-[#F5A623]" strokeWidth={3} />
            <p className="text-[16px] font-heading text-[#1a1a1a]">Mood</p>
          </div>
          <p className="text-[26px] font-heading text-[#1a1a1a]">😊</p>
          <p className="text-[14px] text-[#666]">Happy</p>
        </div>
      </div>

      {/* Central + Button with annotation */}
      <div className="fixed bottom-28 left-1/2 -translate-x-1/2 z-30">
        <div className="relative">
          <motion.button
            onClick={onMoodLog}
            whileTap={{ scale: 0.95 }}
            className="w-16 h-16 rounded-full bg-[#F5A623] border-[4px] border-black flex items-center justify-center relative"
            style={{
              borderRadius: '48% 52% 50% 50% / 52% 48% 52% 48%',
              boxShadow: '5px 5px 0px rgba(0,0,0,0.25)'
            }}
          >
            <Plus className="w-8 h-8 text-white" strokeWidth={4} />
          </motion.button>
          
          {/* Red annotation with arrow */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <p className="text-[16px] text-[#FF6B6B] font-handwriting">Quick mood log!</p>
            <div className="text-center text-[#FF6B6B] text-[24px]">↑</div>
          </div>
        </div>
      </div>

      {/* Daily Streak - sticky note style */}
      <div className="bg-[#E8F4FD] border-[3px] border-[#4A90E2] p-4 rounded-[12px] rotate-[-1deg]"
           style={{
             borderRadius: '50% 50% 48% 52% / 52% 48% 52% 48%',
             boxShadow: '4px 4px 0px rgba(74, 144, 226, 0.3)'
           }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[18px] font-heading text-[#1a1a1a]">Daily Streak 🔥</p>
            <p className="text-[32px] font-heading text-[#F5A623]">23 Days</p>
          </div>
          <div className="flex gap-1">
            {[1,2,3,4,5,6,7].map((_, i) => (
              <div
                key={i}
                className="w-2 h-8 bg-[#F5A623]/40 rounded-full border border-[#F5A623]"
                style={{ borderRadius: '50% 50% 50% 50% / 50% 50% 50% 50%' }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
