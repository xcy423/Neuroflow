import React, { useState } from 'react';
import { Search, User, Play, ChevronDown, ChevronUp, Award, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';

interface MyCoursesScreenProps {
  onExploreMore: () => void;
  onStartSession: (courseId: string) => void;
}

export const MyCoursesScreen: React.FC<MyCoursesScreenProps> = ({ 
  onExploreMore,
  onStartSession
}) => {
  const [expandedGuidelines, setExpandedGuidelines] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const courses = [
    {
      id: '1',
      title: 'Guided Meditation Basics',
      type: 'meditation',
      progress: 40,
      currentSession: 4,
      totalSessions: 10,
      duration: '10 min',
      isEnrolled: true,
      snippet: 'Inhale for 4, hold for 4, exhale for 4',
      guidelines: [
        { step: 1, instruction: 'Find a quiet space and sit comfortably', duration: '1 min' },
        { step: 2, instruction: 'Close your eyes and focus on breathing', duration: '2 min' },
        { step: 3, instruction: 'Inhale for 4 counts, hold for 4', duration: '4 min' },
        { step: 4, instruction: 'Exhale slowly for 4 counts', duration: '3 min' },
      ],
      motivationalNote: null,
      hasTimer: true,
    },
    {
      id: '2',
      title: 'Stress Relief Yoga',
      type: 'yoga',
      progress: 40,
      currentSession: 2,
      totalSessions: 5,
      duration: '15 min',
      isEnrolled: true,
      snippet: 'Module 2/5: Core stretches',
      guidelines: [
        { step: 1, instruction: 'Pose 1: Child\'s Pose—hold 30s', duration: '30 sec' },
        { step: 2, instruction: 'Pose 2: Cat-Cow Stretch—10 reps', duration: '1 min' },
        { step: 3, instruction: 'Pose 3: Downward Dog—hold 45s', duration: '45 sec' },
        { step: 4, instruction: 'Pose 4: Seated Forward Bend—hold 60s', duration: '1 min' },
      ],
      motivationalNote: 'Aligned with your HRV trends',
      hasTimer: true,
    },
    {
      id: '3',
      title: 'Sleep Hygiene Workshop',
      type: 'sleep',
      progress: 0,
      currentSession: 0,
      totalSessions: 7,
      duration: '12 min',
      isEnrolled: false,
      snippet: '7 sessions, 12 min each',
      guidelines: [
        { step: 1, instruction: 'Understanding circadian rhythms', duration: '3 min' },
        { step: 2, instruction: 'Pre-sleep routine essentials', duration: '4 min' },
        { step: 3, instruction: 'Environment optimization', duration: '5 min' },
      ],
      motivationalNote: null,
      hasTimer: false,
    },
    {
      id: '4',
      title: 'Mindful Walking Practice',
      type: 'mindfulness',
      progress: 66,
      currentSession: 4,
      totalSessions: 6,
      duration: '20 min',
      isEnrolled: true,
      snippet: 'Session 4/6: Urban walking meditation',
      guidelines: [
        { step: 1, instruction: 'Choose a quiet outdoor route', duration: '5 min' },
        { step: 2, instruction: 'Focus on each footstep mindfully', duration: '10 min' },
        { step: 3, instruction: 'Notice surroundings without judgment', duration: '5 min' },
      ],
      motivationalNote: 'Great for lowering anxiety',
      hasTimer: true,
    },
  ];

  const enrolledCount = courses.filter(c => c.isEnrolled).length;
  const totalCompletedSessions = courses.reduce((acc, c) => acc + c.currentSession, 0);

  const toggleGuidelines = (courseId: string) => {
    setExpandedGuidelines(expandedGuidelines === courseId ? null : courseId);
  };

  const filteredCourses = courses.filter(course => {
    if (!searchQuery) return true;
    return course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           course.type.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F4FD] via-[#F0F8FF] to-[#E8F4FD] pb-32 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#A8D5BA]/10 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#4A90E2]/10 rounded-full blur-3xl translate-y-32 -translate-x-32"></div>

      {/* Top Navigation */}
      <div className="bg-white/80 backdrop-blur-md border-b border-[#E0E0E0]/50 px-6 py-4 sticky top-0 z-20">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-[#4A90E2]">My Courses</h1>
            <p className="text-xs text-[#4A90E2]/60 mt-0.5">Continue your wellness journey</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4A90E2] to-[#A8D5BA] flex items-center justify-center text-white shadow-md">
            O
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#4A90E2]/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#E8F4FD] border border-[#E0E0E0]/0 rounded-2xl text-sm text-[#4A90E2] placeholder-[#4A90E2]/40 focus:outline-none focus:ring-2 focus:ring-[#4A90E2]/20 transition-all"
          />
        </div>
      </div>

      {/* Courses List */}
      <div className="px-6 py-6 space-y-4 relative z-10">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <Award className="w-4 h-4 text-[#F5A623]" />
            </div>
            <p className="text-xl font-heading text-[#4A90E2]">
              {filteredCourses.filter(c => c.isEnrolled).length}
            </p>
            <p className="text-xs text-[#4A90E2]/60">Enrolled</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="w-4 h-4 text-[#A8D5BA]" />
            </div>
            <p className="text-xl font-heading text-[#4A90E2]">
              {filteredCourses.filter(c => c.progress === 100).length}
            </p>
            <p className="text-xs text-[#4A90E2]/60">Completed</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-[#4A90E2]" />
            </div>
            <p className="text-xl font-heading text-[#4A90E2]">42%</p>
            <p className="text-xs text-[#4A90E2]/60">Avg. Progress</p>
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#4A90E2]">
            {searchQuery ? `Results for "${searchQuery}"` : 'Continue Learning'}
          </h3>
        </div>

        {/* Course Cards */}
        {filteredCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg p-5"
          >
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
                    stroke={course.isEnrolled ? '#4A90E2' : '#CCC'}
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 30}`}
                    strokeDashoffset={`${2 * Math.PI * 30 * (1 - course.progress / 100)}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute top-0 left-0 w-[70px] h-[70px] flex items-center justify-center">
                  <span className="text-base font-heading text-[#4A90E2]">{course.progress}%</span>
                </div>
              </div>

              {/* Course Details */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-[#4A90E2] flex-1">{course.title}</h3>
                  <div className="flex items-center gap-1 text-xs text-[#4A90E2]/60 bg-[#E8F4FD] px-2 py-1 rounded-full">
                    <Clock className="w-3 h-3" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                {/* Session Progress Snippet */}
                <p className="text-xs text-[#4A90E2]/70 mb-3">
                  {course.snippet}
                </p>

                {/* Horizontal Progress Bar for Modules */}
                {course.isEnrolled && (
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-[#4A90E2]/60">Sessions</span>
                      <span className="text-xs font-heading text-[#4A90E2]">
                        {course.currentSession}/{course.totalSessions}
                      </span>
                    </div>
                    <div className="relative h-2.5 w-full bg-[#E8F4FD] rounded-full overflow-hidden">
                      <div 
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#4A90E2] to-[#A8D5BA] transition-all duration-300 rounded-full"
                        style={{ width: `${(course.currentSession / course.totalSessions) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Motivational Note */}
                {course.motivationalNote && (
                  <div className="bg-[#FFF8E1] border border-[#FFC107]/20 rounded-2xl px-3 py-2 mb-3 flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#F5A623] shrink-0 mt-0.5" />
                    <p className="text-xs text-[#8B6914]">{course.motivationalNote}</p>
                  </div>
                )}

                {/* Guidelines Accordion */}
                {course.isEnrolled && (
                  <div className="mb-3">
                    <button
                      onClick={() => toggleGuidelines(course.id)}
                      className="w-full flex items-center justify-between py-2 px-3 bg-[#F5F5F5] hover:bg-[#E0E0E0] rounded-lg transition-colors text-sm text-[#666]"
                    >
                      <span className="flex items-center gap-2">
                        {course.hasTimer && <Clock className="w-4 h-4" />}
                        View Guidelines
                      </span>
                      {expandedGuidelines === course.id ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>

                    <AnimatePresence>
                      {expandedGuidelines === course.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-2 space-y-2 pl-3 border-l-2 border-[#E0E0E0]">
                            {course.guidelines.map((guideline) => (
                              <div key={guideline.step} className="pl-3">
                                <div className="flex items-start justify-between">
                                  <p className="text-xs text-[#666] flex-1">
                                    <span className="text-[#333]">Step {guideline.step}:</span> {guideline.instruction}
                                  </p>
                                  <span className="text-xs text-[#999] ml-2 shrink-0">
                                    {guideline.duration}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                          {course.hasTimer && (
                            <div className="mt-2 text-xs text-[#999] pl-3 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>Integrated timer available during session</span>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {course.isEnrolled ? (
                    <button
                      onClick={() => onStartSession(course.id)}
                      className="flex-1 bg-gradient-to-r from-[#4A90E2] to-[#A8D5BA] hover:shadow-lg text-white py-3 rounded-2xl font-heading flex items-center justify-center gap-2 transition-shadow"
                    >
                      <Play className="w-4 h-4" />
                      Continue Session
                    </button>
                  ) : (
                    <button className="flex-1 bg-white border-2 border-[#4A90E2] text-[#4A90E2] py-3 rounded-2xl font-heading hover:bg-[#E8F4FD] transition-colors">
                      Enroll Now
                    </button>
                  )}
                </div>

                {/* Unenrolled Teaser Metrics */}
                {!course.isEnrolled && (
                  <div className="mt-2 flex items-center gap-3 text-xs text-[#4A90E2]/60">
                    <span>{course.totalSessions} sessions</span>
                    <span>•</span>
                    <span>{course.duration} each</span>
                  </div>
                )}
              </div>
            </div>

            {/* Tap-to-expand annotation */}
            {course.isEnrolled && index === 0 && expandedGuidelines !== course.id && (
              <div className="absolute -top-2 -right-2 bg-[#666] text-white text-xs px-2 py-1 rounded">
                👆 Tap to expand
              </div>
            )}
          </motion.div>
        ))}

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-8">
            <p className="text-[#999]">No courses found for "{searchQuery}"</p>
          </div>
        )}
      </div>

      {/* Summary Section */}
      <div className="fixed bottom-20 left-0 right-0 bg-white border-t border-[#E0E0E0] p-4 max-w-[390px] mx-auto">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-xs text-[#999]">Active Courses</p>
              <p className="text-2xl text-[#333]">{enrolledCount}</p>
            </div>
            <div className="h-12 w-px bg-[#E0E0E0]" />
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#E0E0E0] flex items-center justify-center">
                <Award className="w-5 h-5 text-[#666]" />
              </div>
              <div>
                <p className="text-xs text-[#999]">Sessions Done</p>
                <p className="text-lg text-[#333]">{totalCompletedSessions}</p>
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={onExploreMore}
          className="w-full bg-[#333] hover:bg-[#222] text-white flex items-center justify-center gap-2"
        >
          Explore More Courses
        </Button>
      </div>
    </div>
  );
};
