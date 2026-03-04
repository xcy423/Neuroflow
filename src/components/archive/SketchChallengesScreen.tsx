import React, { useState } from 'react';
import { Plus, Check, Users, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

interface SketchChallengesScreenProps {
  onCreateChallenge: () => void;
}

export const SketchChallengesScreen: React.FC<SketchChallengesScreenProps> = ({
  onCreateChallenge
}) => {
  const [activeTab, setActiveTab] = useState<'my' | 'discover'>('my');

  const myChallenges = [
    {
      id: '1',
      title: 'Mindfulness Streak',
      progress: 70,
      currentValue: 3,
      targetValue: 7,
      unit: 'days',
      completed: false,
    },
    {
      id: '2',
      title: '20k Steps Challenge',
      progress: 75,
      currentValue: 15000,
      targetValue: 20000,
      unit: 'steps',
      completed: true,
    },
    {
      id: '3',
      title: 'Sleep Quality',
      progress: 60,
      currentValue: 6,
      targetValue: 10,
      unit: 'nights',
      completed: false,
    },
  ];

  const suggestedChallenges = [
    {
      id: '4',
      title: 'Morning Meditation',
      description: '5 min daily meditation',
      participants: 1234,
      aiSuggested: true,
    },
    {
      id: '5',
      title: 'Hydration Goal',
      description: '8 glasses of water daily',
      participants: 892,
      aiSuggested: true,
    },
  ];

  return (
    <div className="min-h-screen pb-24 relative z-10">
      {/* Header with tabs */}
      <div className="bg-white/95 border-b-[3px] border-black px-4 py-4 sticky top-0 z-20"
           style={{ boxShadow: '0 3px 0px rgba(0,0,0,0.1)' }}>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('my')}
            className={`flex-1 py-2 px-4 rounded-[12px] border-[3px] border-black font-heading text-[18px] transition-all ${
              activeTab === 'my'
                ? 'bg-[#4A90E2] text-white'
                : 'bg-white text-[#1a1a1a]'
            }`}
            style={{
              borderRadius: '50% 50% 48% 52% / 52% 48% 52% 48%',
              boxShadow: activeTab === 'my' ? '3px 3px 0px rgba(0,0,0,0.2)' : 'none',
              transform: activeTab === 'my' ? 'rotate(-1deg)' : 'none'
            }}
          >
            My Challenges
          </button>
          <button
            onClick={() => setActiveTab('discover')}
            className={`flex-1 py-2 px-4 rounded-[12px] border-[3px] border-black font-heading text-[18px] transition-all ${
              activeTab === 'discover'
                ? 'bg-[#4A90E2] text-white'
                : 'bg-white text-[#1a1a1a]'
            }`}
            style={{
              borderRadius: '48% 52% 50% 50% / 50% 52% 48% 52%',
              boxShadow: activeTab === 'discover' ? '3px 3px 0px rgba(0,0,0,0.2)' : 'none',
              transform: activeTab === 'discover' ? 'rotate(1deg)' : 'none'
            }}
          >
            Discover
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-4 pb-6">
        {activeTab === 'my' ? (
          <div className="space-y-4">
            {/* Annotation about scrolling */}
            <div className="bg-[#FFF9C4] border-[2px] border-[#F9A825] px-3 py-2 rotate-[-2deg] mb-4"
                 style={{ 
                   boxShadow: '3px 3px 8px rgba(0,0,0,0.15)',
                   borderRadius: '50% 50% 48% 52% / 52% 48% 52% 48%'
                 }}>
              <p className="text-[14px] font-handwriting text-[#666]">
                Scroll down → search bar appears
              </p>
            </div>

            {myChallenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/90 border-[3px] border-black p-4 rounded-[16px]"
                style={{
                  borderRadius: '50% 50% 48% 52% / 52% 48% 52% 48%',
                  boxShadow: '4px 4px 0px rgba(0,0,0,0.15)'
                }}
              >
                <div className="flex gap-4">
                  {/* Circular progress ring - hand-drawn */}
                  <div className="shrink-0 relative w-20 h-20">
                    <svg viewBox="0 0 100 100" className="transform -rotate-90">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#E0E0E0"
                        strokeWidth="8"
                        filter="url(#hand-drawn)"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#4A90E2"
                        strokeWidth="8"
                        strokeDasharray="251"
                        strokeDashoffset={251 - (251 * challenge.progress) / 100}
                        strokeLinecap="round"
                        filter="url(#hand-drawn)"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-[18px] font-heading text-[#1a1a1a]">{challenge.progress}%</p>
                    </div>
                  </div>

                  {/* Challenge details */}
                  <div className="flex-1">
                    <h3 className="text-[20px] font-heading text-[#1a1a1a] mb-1">{challenge.title}</h3>
                    <p className="text-[16px] text-[#666] mb-2">
                      {challenge.currentValue}/{challenge.targetValue} {challenge.unit}
                    </p>
                    
                    {/* Progress bar */}
                    <div className="h-3 bg-gray-200 rounded-full mb-3 overflow-hidden border-[2px] border-black"
                         style={{ borderRadius: '50% 50% 50% 50% / 50% 50% 50% 50%' }}>
                      <div
                        className="h-full bg-[#A8D5BA]"
                        style={{
                          width: `${challenge.progress}%`,
                          borderRadius: '50% 50% 50% 50% / 50% 50% 50% 50%'
                        }}
                      />
                    </div>

                    {/* Action button */}
                    {challenge.completed ? (
                      <button
                        disabled
                        className="w-full bg-[#A8D5BA] border-[3px] border-black text-white py-2 rounded-[12px] font-heading text-[16px] flex items-center justify-center gap-2"
                        style={{
                          borderRadius: '50% 50% 48% 52% / 52% 48% 52% 48%',
                          opacity: 0.8
                        }}
                      >
                        <Check className="w-5 h-5" strokeWidth={3} />
                        Completed Today!
                      </button>
                    ) : (
                      <button
                        className="w-full bg-[#F5A623] border-[3px] border-black text-white py-2 rounded-[12px] font-heading text-[16px] hover:shadow-md transition-shadow"
                        style={{
                          borderRadius: '48% 52% 50% 50% / 50% 52% 48% 52%',
                          boxShadow: '3px 3px 0px rgba(0,0,0,0.2)'
                        }}
                      >
                        Mark Complete
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {/* AI annotation */}
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-[#4A90E2]" strokeWidth={3} />
              <p className="text-[18px] text-[#4A90E2] font-handwriting">AI-suggested for you</p>
            </div>

            {suggestedChallenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/90 border-[3px] border-black p-4 rounded-[16px]"
                style={{
                  borderRadius: '52% 48% 50% 50% / 48% 50% 50% 52%',
                  boxShadow: '4px 4px 0px rgba(0,0,0,0.15)'
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-[20px] font-heading text-[#1a1a1a] mb-1">{challenge.title}</h3>
                    <p className="text-[16px] text-[#666]">{challenge.description}</p>
                  </div>
                  {challenge.aiSuggested && (
                    <div className="bg-[#4A90E2] text-white px-2 py-1 rounded-[8px] text-[12px] font-heading border-[2px] border-black"
                         style={{ borderRadius: '50% 50% 48% 52% / 52% 48% 52% 48%' }}>
                      AI
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 mb-3 text-[14px] text-[#666]">
                  <Users className="w-4 h-4" strokeWidth={3} />
                  <span>{challenge.participants} joined</span>
                </div>

                <button
                  className="w-full bg-[#A8D5BA] border-[3px] border-black text-white py-2 rounded-[12px] font-heading text-[16px] hover:shadow-md transition-shadow"
                  style={{
                    borderRadius: '50% 50% 52% 48% / 52% 48% 50% 50%',
                    boxShadow: '3px 3px 0px rgba(0,0,0,0.2)'
                  }}
                >
                  Join Challenge
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Floating + button */}
      <div className="fixed bottom-28 right-6 z-30">
        <button
          onClick={onCreateChallenge}
          className="w-14 h-14 rounded-full bg-[#F5A623] border-[4px] border-black flex items-center justify-center"
          style={{
            borderRadius: '48% 52% 50% 50% / 52% 48% 52% 48%',
            boxShadow: '5px 5px 0px rgba(0,0,0,0.25)'
          }}
        >
          <Plus className="w-7 h-7 text-white" strokeWidth={4} />
        </button>
        
        {/* Annotation */}
        <div className="absolute -top-8 -left-20 text-[14px] text-[#FF6B6B] font-handwriting whitespace-nowrap rotate-[-5deg]">
          Create new →
        </div>
      </div>
    </div>
  );
};
