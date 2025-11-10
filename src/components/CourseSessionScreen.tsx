import React, { useState, useEffect } from 'react';
import { X, Play, Pause, SkipForward, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'motion/react';

interface CourseSessionScreenProps {
  courseTitle: string;
  sessionNumber: number;
  guidelines: Array<{ step: number; instruction: string; duration: string }>;
  onClose: () => void;
}

export const CourseSessionScreen: React.FC<CourseSessionScreenProps> = ({
  courseTitle,
  sessionNumber,
  guidelines,
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(240); // 4 minutes in seconds
  const [totalTime] = useState(240);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsPlaying(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((totalTime - timeRemaining) / totalTime) * 100;

  const handleNext = () => {
    if (currentStep < guidelines.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleReset = () => {
    setTimeRemaining(totalTime);
    setIsPlaying(false);
    setCurrentStep(0);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-[#E0E0E0] px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-[#999]">Session {sessionNumber}</p>
            <h1 className="text-[#333]">{courseTitle}</h1>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#F5F5F5] rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-[#666]" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-[#E0E0E0] px-4 py-2">
        <div className="relative h-1 w-full bg-[#E0E0E0] rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-[#666] transition-all duration-1000 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Timer Display */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-8"
        >
          {/* Circular Timer */}
          <div className="relative">
            <svg width="200" height="200" className="transform -rotate-90">
              <circle
                cx="100"
                cy="100"
                r="90"
                stroke="#E0E0E0"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="100"
                cy="100"
                r="90"
                stroke="#666"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 90}`}
                strokeDashoffset={`${2 * Math.PI * 90 * (timeRemaining / totalTime)}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
              <span className="text-5xl text-[#333] font-heading">
                {formatTime(timeRemaining)}
              </span>
              <span className="text-sm text-[#999] mt-1">remaining</span>
            </div>
          </div>
        </motion.div>

        {/* Current Guideline */}
        <div className="bg-white rounded-lg border border-[#E0E0E0] p-6 mb-6 w-full max-w-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-[#999]">Step {currentStep + 1} of {guidelines.length}</span>
            <span className="text-xs bg-[#E0E0E0] text-[#666] px-2 py-1 rounded">
              {guidelines[currentStep]?.duration}
            </span>
          </div>
          <p className="text-lg text-[#333] leading-relaxed">
            {guidelines[currentStep]?.instruction}
          </p>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={handleReset}
            className="p-4 bg-white border border-[#E0E0E0] rounded-full hover:bg-[#F5F5F5] transition-colors"
          >
            <RotateCcw className="w-5 h-5 text-[#666]" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-6 bg-[#666] hover:bg-[#555] rounded-full transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 text-white" />
            ) : (
              <Play className="w-8 h-8 text-white" />
            )}
          </button>

          <button
            onClick={handleNext}
            disabled={currentStep >= guidelines.length - 1}
            className="p-4 bg-white border border-[#E0E0E0] rounded-full hover:bg-[#F5F5F5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <SkipForward className="w-5 h-5 text-[#666]" />
          </button>
        </div>

        {/* Step Indicators */}
        <div className="flex gap-2">
          {guidelines.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 w-8 rounded-full transition-colors ${
                index === currentStep
                  ? 'bg-[#666]'
                  : index < currentStep
                  ? 'bg-[#999]'
                  : 'bg-[#E0E0E0]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Guidelines List */}
      <div className="bg-white border-t border-[#E0E0E0] px-4 py-4 max-h-48 overflow-y-auto">
        <h3 className="text-sm text-[#666] mb-3">Session Guidelines</h3>
        <div className="space-y-2">
          {guidelines.map((guideline, index) => (
            <div
              key={guideline.step}
              className={`flex items-start gap-3 p-2 rounded-lg ${
                index === currentStep ? 'bg-[#F5F5F5]' : ''
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs ${
                  index < currentStep
                    ? 'bg-[#666] text-white'
                    : index === currentStep
                    ? 'bg-[#333] text-white'
                    : 'bg-[#E0E0E0] text-[#999]'
                }`}
              >
                {guideline.step}
              </div>
              <div className="flex-1">
                <p className={`text-sm ${index === currentStep ? 'text-[#333]' : 'text-[#666]'}`}>
                  {guideline.instruction}
                </p>
                <p className="text-xs text-[#999] mt-0.5">{guideline.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
