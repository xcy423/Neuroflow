import { motion } from "motion/react";
import { Play, ChevronRight } from "lucide-react";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";

interface Course {
  id: string;
  title: string;
  type: string;
  progress: number;
  totalDays: number;
  currentDay: number;
  icon: string;
  color: string;
  description: string;
}

interface CoursesCarouselProps {
  onStartCourse: (courseId: string) => void;
  onViewAll: () => void;
}

export function CoursesCarousel({ onStartCourse, onViewAll }: CoursesCarouselProps) {
  const courses: Course[] = [
    {
      id: "mindfulness-basics",
      title: "Mindfulness Basics",
      type: "Meditation",
      progress: 42,
      totalDays: 7,
      currentDay: 3,
      icon: "🧘‍♀️",
      color: "#A8D5BA",
      description: "Daily practice to build awareness",
    },
    {
      id: "morning-yoga",
      title: "Morning Yoga Flow",
      type: "Yoga",
      progress: 28,
      totalDays: 14,
      currentDay: 4,
      icon: "🌅",
      color: "#4A90E2",
      description: "Energize your mornings",
    },
    {
      id: "stress-relief",
      title: "Stress Relief Toolkit",
      type: "Mental Health",
      progress: 71,
      totalDays: 7,
      currentDay: 5,
      icon: "🎯",
      color: "#F5A623",
      description: "Manage workplace stress",
    },
  ];

  return (
    <div className="mb-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[#4A90E2]">Your Courses</h3>
        <button
          onClick={onViewAll}
          className="flex items-center gap-1 text-sm text-[#A8D5BA]"
        >
          View All
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Carousel */}
      <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            className="min-w-[280px] bg-white rounded-2xl p-5 shadow-md snap-start"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {/* Course Icon & Title */}
            <div className="flex items-start gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ backgroundColor: `${course.color}30` }}
              >
                {course.icon}
              </div>
              <div className="flex-1">
                <h4 className="text-[#4A90E2] mb-1">{course.title}</h4>
                <p className="text-xs text-[#4A90E2]/70">{course.description}</p>
              </div>
            </div>

            {/* Progress Info */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#4A90E2]">
                  Day {course.currentDay} of {course.totalDays}
                </span>
                <span className="text-sm text-[#A8D5BA] font-heading">
                  {course.progress}%
                </span>
              </div>
              <Progress value={course.progress} className="h-2 bg-[#E8F4FD]" />
            </div>

            {/* Action Button */}
            <Button
              onClick={() => onStartCourse(course.id)}
              className="w-full bg-[#A8D5BA] hover:bg-[#8BC5A0] text-white flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4" />
              Continue
            </Button>
          </motion.div>
        ))}

        {/* Add New Course Card */}
        <motion.div
          className="min-w-[280px] bg-gradient-to-br from-[#E8F4FD] to-[#A8D5BA]/20 rounded-2xl p-5 border-2 border-dashed border-[#A8D5BA] flex flex-col items-center justify-center text-center snap-start cursor-pointer"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: courses.length * 0.1 }}
          onClick={onViewAll}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3">
            <span className="text-3xl">➕</span>
          </div>
          <h4 className="text-[#4A90E2] mb-2">Explore More</h4>
          <p className="text-sm text-[#4A90E2]/70">
            Discover new courses to boost your wellness
          </p>
        </motion.div>
      </div>

      {/* Custom scrollbar hide style */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
