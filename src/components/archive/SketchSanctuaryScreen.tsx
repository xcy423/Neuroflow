import React from 'react';
import { Sparkles, Award, Sun } from 'lucide-react';
import { motion } from 'motion/react';

interface SketchSanctuaryScreenProps {
  onClose: () => void;
}

export const SketchSanctuaryScreen: React.FC<SketchSanctuaryScreenProps> = ({
  onClose
}) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Atmosphere background - evolving from dim to sunrise */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFE8CC] via-[#FFD5A3] to-[#FFC47A] opacity-90" />
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-16 h-16 bg-[#FFF9C4] rounded-full border-[3px] border-black opacity-50"
           style={{ 
             borderRadius: '45% 55% 50% 50% / 52% 48% 52% 48%',
             filter: 'blur(2px)'
           }} />
      <div className="absolute top-32 right-16 w-24 h-24 bg-[#E8F4FD] rounded-full border-[3px] border-black opacity-40"
           style={{ 
             borderRadius: '50% 50% 55% 45% / 48% 52% 48% 52%',
             filter: 'blur(3px)'
           }} />

      {/* Content */}
      <div className="relative z-10 px-6 pt-12 pb-24">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-[32px] font-heading text-[#1a1a1a] mb-2">Harmony's Sanctuary</h2>
          <p className="text-[18px] font-handwriting text-[#666]">Your peaceful wellness space</p>
        </div>

        {/* Floating Harmony Mascot - orange-purple blob */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [-2, 2, -2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mx-auto mb-8"
        >
          <div className="relative w-48 h-48 mx-auto">
            {/* Main blob shape */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#F5A623] to-[#9B59B6] border-[4px] border-black"
                 style={{
                   borderRadius: '45% 55% 52% 48% / 48% 45% 55% 52%',
                   boxShadow: '6px 6px 0px rgba(0,0,0,0.2)'
                 }}>
              {/* Face */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="flex gap-4 mb-2">
                  <div className="w-3 h-3 bg-black rounded-full" />
                  <div className="w-3 h-3 bg-black rounded-full" />
                </div>
                <div className="w-8 h-4 border-b-[3px] border-black rounded-b-full" />
              </div>
              
              {/* Sparkle effect */}
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-white" strokeWidth={3} />
            </div>

            {/* Shadow */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-4 bg-black/20 rounded-full blur-sm"
                 style={{ borderRadius: '50% 50% 50% 50% / 50% 50% 50% 50%' }} />
          </div>
        </motion.div>

        {/* Harmony Quote */}
        <div className="bg-white/90 border-[3px] border-black p-6 rounded-[16px] mb-8"
             style={{
               borderRadius: '50% 50% 48% 52% / 52% 48% 52% 48%',
               boxShadow: '5px 5px 0px rgba(0,0,0,0.15)'
             }}>
          <div className="text-center mb-3">
            <Sparkles className="w-6 h-6 text-[#F5A623] mx-auto mb-2" strokeWidth={3} />
            <p className="text-[20px] font-heading text-[#1a1a1a] mb-2">"Balance is not something you find,</p>
            <p className="text-[20px] font-heading text-[#1a1a1a]">it's something you create."</p>
          </div>
          <p className="text-center text-[16px] text-[#666] font-handwriting">- Harmony</p>
        </div>

        {/* Unlocked Items Wall */}
        <div className="bg-white/90 border-[3px] border-black p-5 rounded-[16px] mb-6"
             style={{
               borderRadius: '52% 48% 50% 50% / 48% 50% 50% 52%',
               boxShadow: '4px 4px 0px rgba(0,0,0,0.15)'
             }}>
          <h3 className="text-[22px] font-heading text-[#1a1a1a] mb-4">Unlocked Rewards</h3>
          
          <div className="grid grid-cols-3 gap-4">
            {/* Plant */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 bg-[#A8D5BA] border-[3px] border-black rounded-[12px] flex items-center justify-center"
                   style={{
                     borderRadius: '50% 50% 48% 52% / 52% 48% 52% 48%',
                     boxShadow: '3px 3px 0px rgba(0,0,0,0.1)'
                   }}>
                <span className="text-[28px]">🌱</span>
              </div>
              <p className="text-[14px] font-handwriting text-[#666]">Peace Plant</p>
            </div>

            {/* Light */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 bg-[#FFF9C4] border-[3px] border-black rounded-[12px] flex items-center justify-center"
                   style={{
                     borderRadius: '48% 52% 50% 50% / 50% 52% 48% 52%',
                     boxShadow: '3px 3px 0px rgba(0,0,0,0.1)'
                   }}>
                <Sun className="w-8 h-8 text-[#F5A623]" strokeWidth={3} />
              </div>
              <p className="text-[14px] font-handwriting text-[#666]">Warm Light</p>
            </div>

            {/* Badge */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 bg-[#E8F4FD] border-[3px] border-black rounded-[12px] flex items-center justify-center"
                   style={{
                     borderRadius: '50% 50% 52% 48% / 52% 48% 50% 50%',
                     boxShadow: '3px 3px 0px rgba(0,0,0,0.1)'
                   }}>
                <Award className="w-8 h-8 text-[#4A90E2]" strokeWidth={3} />
              </div>
              <p className="text-[14px] font-handwriting text-[#666]">7-Day Streak</p>
            </div>
          </div>

          {/* Annotation */}
          <div className="mt-4 bg-[#FFF9C4] border-[2px] border-[#F9A825] px-3 py-2 rotate-[-1deg]"
               style={{
                 borderRadius: '50% 50% 48% 52% / 52% 48% 52% 48%',
                 boxShadow: '2px 2px 4px rgba(0,0,0,0.1)'
               }}>
            <p className="text-[14px] font-handwriting text-[#666]">
              Complete challenges to unlock more!
            </p>
          </div>
        </div>

        {/* Atmosphere indicator */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 border-[2px] border-black px-4 py-2 rounded-[12px]"
               style={{
                 borderRadius: '50% 50% 48% 52% / 52% 48% 52% 48%',
                 boxShadow: '3px 3px 0px rgba(0,0,0,0.1)'
               }}>
            <div className="w-3 h-3 bg-[#F5A623] rounded-full animate-pulse" />
            <p className="text-[16px] font-handwriting text-[#666]">Atmosphere: Peaceful Sunrise</p>
          </div>
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-50 w-12 h-12 bg-white border-[3px] border-black rounded-full flex items-center justify-center"
        style={{
          borderRadius: '48% 52% 50% 50% / 52% 48% 52% 48%',
          boxShadow: '3px 3px 0px rgba(0,0,0,0.2)'
        }}
      >
        <span className="text-[24px] text-[#1a1a1a]">✕</span>
      </button>
    </div>
  );
};
