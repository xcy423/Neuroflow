import React, { useState } from 'react';
import { Filter, User, Check, TrendingUp, Bell, ChevronRight, Plus, Award, Flame } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { motion } from 'motion/react';

interface MyChallengesScreenProps {
  onCreateChallenge: () => void;
  onViewChallengeDetails: (challengeId: string) => void;
}

export const MyChallengesScreen: React.FC<MyChallengesScreenProps> = ({ 
  onCreateChallenge,
  onViewChallengeDetails 
}) => {
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'mental' | 'physical'>('all');

  const activeChallenges = [
    {
      id: '1',
      title: 'Mindfulness Streak',
      type: 'mental',
      progress: 70,
      currentValue: 3,
      targetValue: 7,
      unit: 'days',
      description: 'Log your mood via + icon',
      isActive: true,
      todayCompleted: false,
      motivationalNote: null,
      notifications: true,
    },
    {
      id: '2',
      title: '20k Steps Challenge',
      type: 'physical',
      progress: 75,
      currentValue: 15000,
      targetValue: 20000,
      unit: 'steps',
      description: 'Tracked via wearable',
      isActive: true,
      todayCompleted: true,
      motivationalNote: 'Great job—HRV improved!',
      notifications: false,
    },
    {
      id: '3',
      title: 'Sleep Quality Tracker',
      type: 'physical',
      progress: 60,
      currentValue: 6,
      targetValue: 10,
      unit: 'nights',
      description: 'Track sleep for insights',
      isActive: true,
      todayCompleted: false,
      motivationalNote: 'Better sleep = better mood',
      notifications: true,
    },
    {
      id: '4',
      title: 'Morning Meditation',
      type: 'mental',
      progress: 0,
      currentValue: 0,
      targetValue: 21,
      unit: 'days',
      description: 'Start your day mindfully',
      isActive: false,
      todayCompleted: false,
      motivationalNote: null,
      notifications: false,
    },
  ];

  const activeCount = activeChallenges.filter(c => c.isActive).length;
  const currentStreak = 12; // Example streak

  const handleMarkComplete = (challengeId: string) => {
    console.log('Mark complete:', challengeId);
    // Would update state here
  };

  const filteredChallenges = activeChallenges.filter(challenge => {
    if (selectedFilter === 'all') return true;
    return challenge.type === selectedFilter;
  });

  return (
    <div className="min-h-screen pb-32 relative z-10">
      {/* Stats Cards */}
      <div className="px-6 pt-6 pb-4">
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4A90E2] to-[#A8D5BA] flex items-center justify-center shadow-md">
                <Award className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-3xl font-heading text-[#4A90E2] mb-1">{activeCount}</p>
            <p className="text-xs text-[#4A90E2]/60">Active Challenges</p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F5A623] to-[#FF6B6B] flex items-center justify-center shadow-md">
                <Flame className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-3xl font-heading text-[#4A90E2] mb-1">{currentStreak}</p>
            <p className="text-xs text-[#4A90E2]/60">Day Streak</p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-heading transition-all ${
              selectedFilter === 'all'
                ? 'bg-gradient-to-r from-[#4A90E2] to-[#A8D5BA] text-white shadow-md'
                : 'bg-white/80 text-[#4A90E2] hover:bg-white'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedFilter('mental')}
            className={`px-4 py-2 rounded-full text-sm font-heading transition-all ${
              selectedFilter === 'mental'
                ? 'bg-gradient-to-r from-[#4A90E2] to-[#A8D5BA] text-white shadow-md'
                : 'bg-white/80 text-[#4A90E2] hover:bg-white'
            }`}
          >
            Mental
          </button>
          <button
            onClick={() => setSelectedFilter('physical')}
            className={`px-4 py-2 rounded-full text-sm font-heading transition-all ${
              selectedFilter === 'physical'
                ? 'bg-gradient-to-r from-[#4A90E2] to-[#A8D5BA] text-white shadow-md'
                : 'bg-white/80 text-[#4A90E2] hover:bg-white'
            }`}
          >
            Physical
          </button>
        </div>
      </div>

      {/* Challenges List */}
      <div className="px-6 pb-6 space-y-4">
        {/* Challenge Cards */}
        {filteredChallenges.map((challenge, index) => (
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg p-5 relative"
          >
            {/* Notification bell */}
            {challenge.notifications && (
              <div className="absolute top-5 right-5">
                <div className="w-8 h-8 rounded-full bg-[#F5A623]/20 flex items-center justify-center">
                  <Bell className="w-4 h-4 text-[#F5A623]" />
                </div>
              </div>
            )}

            <div className="flex gap-4">
              {/* Circular Progress Ring */}
              <div className="shrink-0 relative">
                <svg width="70" height="70" className="transform -rotate-90">
                  <circle
                    cx="35"
                    cy="35"
                    r="30"
                    stroke="#E8F4FD"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="35"
                    cy="35"
                    r="30"
                    stroke={challenge.isActive ? '#4A90E2' : '#CCC'}
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 30}`}
                    strokeDashoffset={`${2 * Math.PI * 30 * (1 - challenge.progress / 100)}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute top-0 left-0 w-[70px] h-[70px] flex items-center justify-center">
                  <span className="text-base font-heading text-[#4A90E2]">{challenge.progress}%</span>
                </div>
              </div>

              {/* Challenge Details */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-[#4A90E2]">{challenge.title}</h3>
                  <span className={`text-xs px-2.5 py-1 rounded-full capitalize font-heading ${
                    challenge.type === 'mental' 
                      ? 'bg-[#F3E5F5] text-[#9C27B0]' 
                      : 'bg-[#E1F5FE] text-[#03A9F4]'
                  }`}>
                    {challenge.type}
                  </span>
                </div>

                {/* Progress Value */}
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-2xl font-heading text-[#4A90E2]">
                    {challenge.currentValue.toLocaleString()}
                  </span>
                  <span className="text-sm text-[#4A90E2]/60">
                    / {challenge.targetValue.toLocaleString()} {challenge.unit}
                  </span>
                </div>

                <p className="text-xs text-[#4A90E2]/60 mb-3">
                  {challenge.description}
                </p>

                {/* Horizontal Progress Bar */}
                <div className="mb-3">
                  <div className="relative h-2.5 w-full bg-[#E8F4FD] rounded-full overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#4A90E2] to-[#A8D5BA] transition-all duration-300 rounded-full"
                      style={{ width: `${challenge.progress}%` }}
                    />
                  </div>
                </div>

                {/* Motivational Note */}
                {challenge.motivationalNote && (
                  <div className="bg-[#FFF8E1] border border-[#FFC107]/20 rounded-2xl px-3 py-2 mb-3 flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-[#F5A623] shrink-0 mt-0.5" />
                    <p className="text-xs text-[#8B6914]">{challenge.motivationalNote}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {challenge.isActive ? (
                    <>
                      {challenge.todayCompleted ? (
                        <button
                          disabled
                          className="flex-1 bg-[#A8D5BA] text-white py-2.5 rounded-2xl font-heading flex items-center justify-center gap-2 cursor-not-allowed opacity-80"
                        >
                          <Check className="w-4 h-4" />
                          Completed Today
                        </button>
                      ) : (
                        <button
                          onClick={() => handleMarkComplete(challenge.id)}
                          className="flex-1 bg-gradient-to-r from-[#4A90E2] to-[#A8D5BA] hover:shadow-lg text-white py-2.5 rounded-2xl font-heading transition-shadow"
                        >
                          Mark Complete
                        </button>
                      )}
                      <button
                        onClick={() => onViewChallengeDetails(challenge.id)}
                        className="w-12 h-10 bg-white border-2 border-[#4A90E2] rounded-2xl flex items-center justify-center hover:bg-[#E8F4FD] transition-colors"
                      >
                        <ChevronRight className="w-4 h-4 text-[#4A90E2]" />
                      </button>
                    </>
                  ) : (
                    <button className="w-full bg-white border-2 border-[#4A90E2] text-[#4A90E2] py-2.5 rounded-2xl font-heading hover:bg-[#E8F4FD] transition-colors">
                      Join Challenge
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating Create Button */}
      <div className="fixed bottom-24 left-0 right-0 px-6 max-w-[390px] mx-auto z-20">
        <button
          onClick={onCreateChallenge}
          className="w-full bg-gradient-to-r from-[#4A90E2] to-[#A8D5BA] text-white py-4 rounded-3xl font-heading flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-shadow"
        >
          <Plus className="w-5 h-5" />
          Create New Challenge
        </button>
      </div>

    </div>
  );
};
