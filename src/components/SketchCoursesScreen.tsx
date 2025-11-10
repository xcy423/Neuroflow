import React, { useState } from 'react';
import { Play, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface SketchCoursesScreenProps {
  onStartSession: (courseId: string) => void;
}

export const SketchCoursesScreen: React.FC<SketchCoursesScreenProps> = ({
  onStartSession
}) => {
  const [activeTab, setActiveTab] = useState<'my' | 'discover'>('my');

  const courses = [
    {
      id: '1',
      title: '5-Min Breathing',
      progress: 45,
      currentSession: 3,
      totalSessions: 7,
      duration: '5 min',
      enrolled: true,
      hasTimer: true,
    },
    {
      id: '2',
      title: 'Sleep Better',
      progress: 25,
      currentSession: 2,
      totalSessions: 10,
      duration: '10 min',
      enrolled: true,
      hasTimer: true,
    },
    {
      id: '3',
      title: 'Stress Management',
      progress: 0,
      currentSession: 0,
      totalSessions: 8,
      duration: '7 min',
      enrolled: false,
      hasTimer: false,
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
                ? 'bg-[#A8D5BA] text-white'
                : 'bg-white text-[#1a1a1a]'
            }`}
            style={{
              borderRadius: '50% 50% 48% 52% / 52% 48% 52% 48%',
              boxShadow: activeTab === 'my' ? '3px 3px 0px rgba(0,0,0,0.2)' : 'none',
              transform: activeTab === 'my' ? 'rotate(-1deg)' : 'none'
            }}
          >
            My Courses
          </button>
          <button
            onClick={() => setActiveTab('discover')}
            className={`flex-1 py-2 px-4 rounded-[12px] border-[3px] border-black font-heading text-[18px] transition-all ${
              activeTab === 'discover'
                ? 'bg-[#A8D5BA] text-white'
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
      <div className="px-4 pt-4 pb-6 space-y-4">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/90 border-[3px] border-black p-5 rounded-[16px] relative"
            style={{
              borderRadius: index % 2 === 0 
                ? '50% 50% 48% 52% / 52% 48% 52% 48%'
                : '52% 48% 50% 50% / 48% 50% 50% 52%',
              boxShadow: '4px 4px 0px rgba(0,0,0,0.15)'
            }}
          >
            {/* Timer annotation */}
            {course.hasTimer && course.enrolled && index === 0 && (
              <div className="absolute -top-6 -right-2 bg-[#E8F4FD] border-[2px] border-[#4A90E2] px-2 py-1 rotate-[3deg]"
                   style={{
                     borderRadius: '50% 50% 48% 52% / 52% 48% 52% 48%',
                     boxShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                   }}>
                <p className="text-[12px] font-handwriting text-[#4A90E2]">Timer included!</p>
              </div>
            )}

            <div className="flex gap-4">
              {/* Circular progress */}
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
                    stroke="#A8D5BA"
                    strokeWidth="8"
                    strokeDasharray="251"
                    strokeDashoffset={251 - (251 * course.progress) / 100}
                    strokeLinecap="round"
                    filter="url(#hand-drawn)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-[18px] font-heading text-[#1a1a1a]">{course.progress}%</p>
                </div>
              </div>

              {/* Course details */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-[20px] font-heading text-[#1a1a1a]">{course.title}</h3>
                  <div className="flex items-center gap-1 bg-[#E8F4FD] px-2 py-1 rounded-[8px] border-[2px] border-[#4A90E2]"
                       style={{ borderRadius: '50% 50% 48% 52% / 52% 48% 52% 48%' }}>
                    <Clock className="w-3 h-3 text-[#4A90E2]" strokeWidth={3} />
                    <span className="text-[12px] text-[#4A90E2] font-handwriting">{course.duration}</span>
                  </div>
                </div>

                {course.enrolled && (
                  <>
                    <p className="text-[16px] text-[#666] mb-3">
                      Session {course.currentSession}/{course.totalSessions}
                    </p>
                    
                    {/* Progress bar */}
                    <div className="h-3 bg-gray-200 rounded-full mb-3 overflow-hidden border-[2px] border-black"
                         style={{ borderRadius: '50% 50% 50% 50% / 50% 50% 50% 50%' }}>
                      <div
                        className="h-full bg-[#A8D5BA]"
                        style={{
                          width: `${(course.currentSession / course.totalSessions) * 100}%`,
                          borderRadius: '50% 50% 50% 50% / 50% 50% 50% 50%'
                        }}
                      />
                    </div>

                    {/* Guidelines section */}
                    {index === 0 && (
                      <div className="bg-[#FFF9C4]/50 border-[2px] border-[#F9A825] rounded-[12px] p-3 mb-3"
                           style={{ borderRadius: '50% 50% 48% 52% / 52% 48% 52% 48%' }}>
                        <p className="text-[14px] font-handwriting text-[#666] mb-2">Session Guidelines:</p>
                        <div className="space-y-1">
                          <p className="text-[14px] text-[#666]">• Step 1: Find quiet space (2min)</p>
                          <p className="text-[14px] text-[#666]">• Step 2: Deep breathing (3min)</p>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* Action button */}
                {course.enrolled ? (
                  <button
                    onClick={() => onStartSession(course.id)}
                    className="w-full bg-[#F5A623] border-[3px] border-black text-white py-2 rounded-[12px] font-heading text-[16px] flex items-center justify-center gap-2 hover:shadow-md transition-shadow"
                    style={{
                      borderRadius: '48% 52% 50% 50% / 50% 52% 48% 52%',
                      boxShadow: '3px 3px 0px rgba(0,0,0,0.2)'
                    }}
                  >
                    <Play className="w-5 h-5" strokeWidth={3} fill="white" />
                    Start Session
                  </button>
                ) : (
                  <button
                    className="w-full bg-white border-[3px] border-[#A8D5BA] text-[#A8D5BA] py-2 rounded-[12px] font-heading text-[16px] hover:bg-[#A8D5BA] hover:text-white transition-colors"
                    style={{
                      borderRadius: '50% 50% 52% 48% / 52% 48% 50% 50%',
                      boxShadow: '2px 2px 0px rgba(168, 213, 186, 0.3)'
                    }}
                  >
                    Enroll Now
                  </button>
                )}

                {!course.enrolled && (
                  <p className="text-[14px] text-[#666] text-center mt-2">
                    {course.totalSessions} sessions • {course.duration} each
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
