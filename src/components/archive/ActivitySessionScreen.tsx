import { motion } from "motion/react";
import { Pause, Play, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Progress } from "./ui/progress";

interface ActivitySessionScreenProps {
  activityType: string;
  onClose: () => void;
}

export function ActivitySessionScreen({ activityType, onClose }: ActivitySessionScreenProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [heartRate, setHeartRate] = useState(72);
  const [showSummary, setShowSummary] = useState(false);

  const totalTime = activityType === "mental" ? 600 : 900; // 10 or 15 minutes in seconds

  useEffect(() => {
    if (!isPaused && !showSummary) {
      const interval = setInterval(() => {
        setTimeElapsed((prev) => {
          if (prev >= totalTime) {
            setShowSummary(true);
            return prev;
          }
          return prev + 1;
        });
        // Simulate heart rate changes
        setHeartRate((prev) => prev + Math.floor(Math.random() * 3 - 1));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isPaused, showSummary, totalTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = (timeElapsed / totalTime) * 100;

  if (showSummary) {
    return (
      <div className="min-h-screen bg-[#E8F4FD] pb-24 pt-12 px-6 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <span className="text-6xl mb-4 block">🎉</span>
            <h2 className="text-[#4A90E2] mb-2">Great Job!</h2>
            <p className="text-[#4A90E2]/70">You completed the session</p>
          </div>

          {/* Buddy Encouragement */}
          <motion.div
            className="bg-white rounded-3xl p-5 mb-8 shadow-md relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="absolute -top-3 left-6 w-6 h-6 bg-white transform rotate-45"></div>
            <p className="text-[#4A90E2]">
              Proud of you! Your commitment is <span className="text-[#F5A623]">inspiring</span> ✨
            </p>
          </motion.div>

          {/* Mood Improvement Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
            <h4 className="text-[#4A90E2] mb-4">Mood Improvement</h4>
            <div className="flex items-end justify-around gap-4 h-40">
              <div className="flex flex-col items-center gap-2 flex-1">
                <motion.div
                  className="bg-[#F5A623] w-full rounded-t-lg"
                  initial={{ height: 0 }}
                  animate={{ height: "60%" }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
                <p className="text-sm text-[#4A90E2]">Before</p>
              </div>
              <div className="flex flex-col items-center gap-2 flex-1">
                <motion.div
                  className="bg-[#A8D5BA] w-full rounded-t-lg"
                  initial={{ height: 0 }}
                  animate={{ height: "90%" }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                />
                <p className="text-sm text-[#4A90E2]">After</p>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-[#A8D5BA] text-white py-4 rounded-xl"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E8F4FD]/80 backdrop-blur-sm pb-24 pt-12 px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col h-full"
      >
        {/* Close Button */}
        <button onClick={onClose} className="self-end mb-4">
          <X className="w-6 h-6 text-[#4A90E2]" />
        </button>

        {/* Real-time Metrics */}
        <motion.div
          className="bg-white rounded-2xl p-6 shadow-md mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-around">
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-2">
                <svg className="transform -rotate-90 w-24 h-24">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="#E8F4FD"
                    strokeWidth="8"
                    fill="none"
                  />
                  <motion.circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="#A8D5BA"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - heartRate / 120)}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl text-[#4A90E2] font-heading">{heartRate}</span>
                </div>
              </div>
              <p className="text-sm text-[#4A90E2]/70">Heart Rate</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center h-24 mb-2">
                <span className="text-4xl text-[#4A90E2] font-heading">
                  {formatTime(timeElapsed)}
                </span>
              </div>
              <p className="text-sm text-[#4A90E2]/70">Time Elapsed</p>
            </div>
          </div>

          <Progress value={progressPercent} className="h-2 bg-[#E8F4FD] mt-4" />
        </motion.div>

        {/* Buddy Encouragement */}
        <motion.div
          className="flex-1 flex items-center justify-center mb-6"
          key={Math.floor(timeElapsed / 30)}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-3xl p-6 shadow-md relative max-w-sm">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rotate-45"></div>
            <p className="text-center text-[#4A90E2]">
              {activityType === "mental" 
                ? "You're doing great—deep breath in... and out..." 
                : "Keep that pace! You're crushing it! 💪"}
            </p>
          </div>
        </motion.div>

        {/* Control Buttons */}
        <div className="flex gap-4">
          <motion.button
            onClick={() => setIsPaused(!isPaused)}
            className="flex-1 bg-[#F5A623] text-white py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg"
            whileTap={{ scale: 0.95 }}
          >
            {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
            <span>{isPaused ? "Resume" : "Pause"}</span>
          </motion.button>
          <motion.button
            onClick={() => setShowSummary(true)}
            className="bg-[#A8D5BA] text-white px-6 py-4 rounded-xl shadow-lg"
            whileTap={{ scale: 0.95 }}
          >
            Finish
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
