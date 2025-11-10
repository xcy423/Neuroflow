import React from 'react';
import { Award, Check, Lock, TrendingUp, Heart, Activity, Users, Target } from 'lucide-react';
import { Progress } from './ui/progress';

interface BadgesScreenProps {
  onBack: () => void;
}

export const BadgesScreen: React.FC<BadgesScreenProps> = ({ onBack }) => {
  const badgeCategories = [
    {
      name: 'Activity Milestones',
      badges: [
        { id: 1, name: 'First Step', description: 'Complete your first challenge', earned: true, icon: <Activity className="w-6 h-6" /> },
        { id: 2, name: 'Week Warrior', description: 'Complete 7 days in a row', earned: true, icon: <Target className="w-6 h-6" /> },
        { id: 3, name: '30-Day Streak', description: 'Maintain a 30-day streak', earned: false, progress: 23, icon: <TrendingUp className="w-6 h-6" /> },
      ],
    },
    {
      name: 'Social Achievements',
      badges: [
        { id: 4, name: 'Social Star', description: 'Connect with 5 friends', earned: true, icon: <Users className="w-6 h-6" /> },
        { id: 5, name: 'Challenge Creator', description: 'Create your first challenge', earned: false, icon: <Award className="w-6 h-6" /> },
      ],
    },
    {
      name: 'Wellness Goals',
      badges: [
        { id: 6, name: 'Mindful Master', description: 'Complete 100 meditation sessions', earned: false, progress: 67, icon: <Heart className="w-6 h-6" /> },
        { id: 7, name: 'Goal Getter', description: 'Achieve 10 personal goals', earned: false, progress: 40, icon: <Target className="w-6 h-6" /> },
      ],
    },
  ];

  const totalBadges = badgeCategories.reduce((acc, cat) => acc + cat.badges.length, 0);
  const earnedBadges = badgeCategories.reduce(
    (acc, cat) => acc + cat.badges.filter(b => b.earned).length,
    0
  );

  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-20">
      {/* Header */}
      <div className="bg-white border-b border-[#E0E0E0] px-4 py-3 sticky top-0 z-10">
        <h1 className="text-[#333]">Badges</h1>
      </div>

      {/* Overall Progress */}
      <div className="bg-white border-b border-[#E0E0E0] p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-[#333]">Your Progress</h2>
          <span className="text-sm text-[#666]">
            {earnedBadges} / {totalBadges}
          </span>
        </div>
        <Progress value={(earnedBadges / totalBadges) * 100} className="h-3 bg-[#E0E0E0]" />
        <p className="text-xs text-[#999] mt-2">
          {totalBadges - earnedBadges} badges left to unlock
        </p>
      </div>

      {/* Badge Categories */}
      <div className="px-4 py-4 space-y-6">
        {badgeCategories.map((category) => (
          <div key={category.name}>
            <h3 className="text-[#333] mb-3">{category.name}</h3>
            <div className="space-y-3">
              {category.badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`bg-white rounded-lg border p-4 ${
                    badge.earned
                      ? 'border-[#666]'
                      : 'border-[#E0E0E0]'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-16 h-16 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        badge.earned
                          ? 'border-[#666] bg-[#E0E0E0] text-[#666]'
                          : 'border-[#CCC] bg-white text-[#CCC]'
                      }`}
                    >
                      {badge.earned ? (
                        <Check className="w-8 h-8" />
                      ) : (
                        <>
                          {badge.icon || <Lock className="w-6 h-6" />}
                        </>
                      )}
                    </div>

                    <div className="flex-1">
                      <h4 className={`mb-1 ${badge.earned ? 'text-[#333]' : 'text-[#999]'}`}>
                        {badge.name}
                      </h4>
                      <p className="text-sm text-[#666] mb-2">{badge.description}</p>

                      {!badge.earned && badge.progress !== undefined && (
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-[#999]">Progress</span>
                            <span className="text-xs text-[#666]">{badge.progress}%</span>
                          </div>
                          <Progress value={badge.progress} className="h-1.5 bg-[#E0E0E0]" />
                        </div>
                      )}

                      {badge.earned && (
                        <div className="inline-block bg-[#E0E0E0] text-[#666] text-xs px-2 py-1 rounded">
                          ✓ Earned
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Motivational Note */}
      <div className="px-4 pb-4">
        <div className="bg-[#E0E0E0] rounded-lg p-4 border border-[#CCC] text-center">
          <p className="text-sm text-[#666]">
            Keep going! You're on track to earn more badges this week 🏆
          </p>
        </div>
      </div>
    </div>
  );
};
