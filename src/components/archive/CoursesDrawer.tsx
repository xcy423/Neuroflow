import { motion, AnimatePresence } from "motion/react";
import { X, Play, Clock, Star } from "lucide-react";
import { Button } from "./ui/button";

interface Course {
  id: string;
  title: string;
  type: string;
  duration: string;
  level: string;
  description: string;
  icon: string;
  rating: number;
  color: string;
}

interface CoursesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onStartCourse: (courseId: string) => void;
}

export function CoursesDrawer({ isOpen, onClose, onStartCourse }: CoursesDrawerProps) {
  const courses: Course[] = [
    {
      id: "mindfulness-basics",
      title: "Mindfulness Basics",
      type: "Meditation",
      duration: "7 days",
      level: "Beginner",
      description: "Learn foundational mindfulness techniques to reduce stress and increase awareness",
      icon: "🧘‍♀️",
      rating: 4.8,
      color: "#A8D5BA",
    },
    {
      id: "morning-yoga",
      title: "Morning Yoga Flow",
      type: "Yoga",
      duration: "14 days",
      level: "All Levels",
      description: "Start your day with energizing yoga sequences designed for busy professionals",
      icon: "🌅",
      rating: 4.9,
      color: "#4A90E2",
    },
    {
      id: "breathwork",
      title: "Breathwork Mastery",
      type: "Breathing",
      duration: "5 days",
      level: "Beginner",
      description: "Master breathing techniques to manage anxiety and boost energy instantly",
      icon: "💨",
      rating: 4.7,
      color: "#F5A623",
    },
    {
      id: "hiit-workouts",
      title: "HIIT for Desk Workers",
      type: "Fitness",
      duration: "21 days",
      level: "Intermediate",
      description: "Quick, effective workouts perfect for Hong Kong's busy professionals",
      icon: "💪",
      rating: 4.6,
      color: "#A8D5BA",
    },
    {
      id: "sleep-meditation",
      title: "Better Sleep Program",
      type: "Sleep",
      duration: "10 days",
      level: "All Levels",
      description: "Wind down with guided meditations designed to improve sleep quality",
      icon: "🌙",
      rating: 4.9,
      color: "#4A90E2",
    },
    {
      id: "stress-relief",
      title: "Stress Relief Toolkit",
      type: "Mental Health",
      duration: "7 days",
      level: "Beginner",
      description: "Practical techniques to manage workplace stress and prevent burnout",
      icon: "🎯",
      rating: 4.8,
      color: "#F5A623",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-h-[80vh] overflow-y-auto"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Handle Bar */}
            <div className="sticky top-0 bg-white pt-4 pb-3 px-6 border-b border-gray-200">
              <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-[#4A90E2]">Wellness Courses</h2>
                  <p className="text-sm text-[#4A90E2]/70">Continue your journey</p>
                </div>
                <button onClick={onClose} className="p-2">
                  <X className="w-6 h-6 text-[#4A90E2]" />
                </button>
              </div>
            </div>

            {/* Buddy Message */}
            <div className="px-6 pt-4 pb-2">
              <motion.div
                className="bg-[#E8F4FD] rounded-3xl p-4 relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="absolute -top-2 left-6 w-4 h-4 bg-[#E8F4FD] transform rotate-45"></div>
                <p className="text-[#4A90E2] text-sm">
                  Great job checking in! Here are some <span className="text-[#A8D5BA]">personalized courses</span> to keep growing <span className="text-[#F5A623]">🌱</span>
                </p>
              </motion.div>
            </div>

            {/* Courses Grid */}
            <div className="px-6 pb-6 space-y-4">
              {courses.map((course, index) => (
                <motion.div
                  key={course.id}
                  className="bg-white border-2 border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className="flex items-start gap-4 mb-3">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                      style={{ backgroundColor: `${course.color}30` }}
                    >
                      {course.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[#4A90E2] mb-1">{course.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-[#4A90E2]/70 mb-2">
                        <span className="bg-[#E8F4FD] px-2 py-1 rounded-full">
                          {course.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {course.duration}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-4 h-4 fill-[#F5A623] text-[#F5A623]" />
                        <span className="text-sm text-[#4A90E2]">{course.rating}</span>
                        <span className="text-xs text-[#4A90E2]/70 ml-1">• {course.level}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-[#4A90E2]/70 mb-4">
                    {course.description}
                  </p>

                  <Button
                    onClick={() => onStartCourse(course.id)}
                    className="w-full bg-[#A8D5BA] hover:bg-[#8BC5A0] text-white flex items-center justify-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    Start Course
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
