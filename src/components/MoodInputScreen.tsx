import { motion } from "motion/react";
import { Play, MapPin, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface MoodInputScreenProps {
  selectedMood: string;
  onBack: () => void;
  onStartActivity: (activity: string) => void;
}

export function MoodInputScreen({ selectedMood, onBack, onStartActivity }: MoodInputScreenProps) {
  const [currentMood, setCurrentMood] = useState(selectedMood);
  const [showRecommendations, setShowRecommendations] = useState(!!selectedMood);

  const moods = [
    { emoji: "😊", label: "Happy", value: "happy" },
    { emoji: "😰", label: "Anxious", value: "anxious" },
    { emoji: "😴", label: "Tired", value: "tired" },
    { emoji: "😌", label: "Calm", value: "calm" },
    { emoji: "😤", label: "Stressed", value: "stressed" },
    { emoji: "😔", label: "Sad", value: "sad" },
  ];

  const handleMoodSelect = (mood: string) => {
    setCurrentMood(mood);
    setShowRecommendations(true);
    
    // Mark the check-in
    const today = new Date().toDateString();
    localStorage.setItem("lastCheckInDate", today);
  };

  const recommendations = {
    anxious: [
      {
        type: "mental",
        title: "10-min Mindfulness Meditation",
        description: "Guided breathing to calm your mind",
        icon: "🧘‍♀️",
      },
      {
        type: "physical",
        title: "Brisk 15-min Run",
        description: "Release tension with outdoor movement",
        icon: "🏃‍♀️",
      },
    ],
    happy: [
      {
        type: "mental",
        title: "Gratitude Journaling",
        description: "Reflect on what brings you joy",
        icon: "📝",
      },
      {
        type: "physical",
        title: "Energetic Dance Session",
        description: "Celebrate with movement",
        icon: "💃",
      },
    ],
    tired: [
      {
        type: "mental",
        title: "Power Nap Meditation",
        description: "20-min restorative rest",
        icon: "😴",
      },
      {
        type: "physical",
        title: "Gentle Stretching",
        description: "Light movement to energize",
        icon: "🤸‍♀️",
      },
    ],
    calm: [
      {
        type: "mental",
        title: "Mindful Walking",
        description: "Enjoy peaceful awareness",
        icon: "🚶‍♀️",
      },
      {
        type: "physical",
        title: "Yoga Flow",
        description: "Maintain your calm energy",
        icon: "🧘",
      },
    ],
    stressed: [
      {
        type: "mental",
        title: "Stress Relief Breathing",
        description: "Quick techniques to decompress",
        icon: "💨",
      },
      {
        type: "physical",
        title: "Boxing Workout",
        description: "Release stress with intensity",
        icon: "🥊",
      },
    ],
    sad: [
      {
        type: "mental",
        title: "Compassion Meditation",
        description: "Self-care and kindness",
        icon: "💙",
      },
      {
        type: "physical",
        title: "Nature Walk",
        description: "Gentle outdoor movement",
        icon: "🌳",
      },
    ],
  };

  const currentRecommendations = recommendations[currentMood as keyof typeof recommendations] || recommendations.anxious;

  return (
    <div className="min-h-screen bg-[#E8F4FD] pb-24 pt-12 px-6">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <div className="flex items-center mb-6">
          <button onClick={onBack} className="mr-3">
            <ArrowLeft className="w-6 h-6 text-[#4A90E2]" />
          </button>
          <h2 className="text-[#4A90E2]">
            {showRecommendations ? "Your Recommendations" : "How are you feeling?"}
          </h2>
        </div>

        {/* Initial Mood Selection - shown on first entry */}
        {!showRecommendations && (
          <>
            <motion.div
              className="bg-white rounded-3xl p-5 mb-6 shadow-md relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="absolute -top-3 left-6 w-6 h-6 bg-white transform rotate-45"></div>
              <p className="text-[#4A90E2]">
                Take a moment to check in with yourself. How are you feeling today? <span className="text-[#F5A623]">✨</span>
              </p>
            </motion.div>

            <div className="grid grid-cols-3 gap-3">
              {moods.map((mood, index) => (
                <motion.button
                  key={mood.value}
                  onClick={() => handleMoodSelect(mood.value)}
                  className="flex flex-col items-center gap-2 bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <span className="text-4xl">{mood.emoji}</span>
                  <span className="text-sm text-[#4A90E2]">{mood.label}</span>
                </motion.button>
              ))}
            </div>
          </>
        )}

        {/* Recommendations - shown after mood selection */}
        {showRecommendations && (
          <>
            {/* Buddy Response */}
            <motion.div
              className="bg-white rounded-3xl p-5 mb-8 shadow-md relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="absolute -top-3 left-6 w-6 h-6 bg-white transform rotate-45"></div>
              <p className="text-[#4A90E2]">
                I get it—start with <span className="text-[#F5A623]">breathing</span> to ease in? <span className="text-[#F5A623]">💙</span>
              </p>
            </motion.div>

            {/* Recommendations */}
            <div className="space-y-4">
              {currentRecommendations.map((rec, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl p-5 border-2 border-[#A8D5BA] shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-4xl">{rec.icon}</span>
                    <div className="flex-1">
                      <h4 className="text-[#4A90E2] mb-1">{rec.title}</h4>
                      <p className="text-sm text-[#4A90E2]/70">{rec.description}</p>
                    </div>
                  </div>

                  {rec.type === "physical" && (
                    <div className="bg-[#E8F4FD] rounded-xl p-3 mb-4 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#A8D5BA]" />
                      <p className="text-sm text-[#4A90E2]">Route preview: Victoria Park Loop</p>
                    </div>
                  )}

                  {rec.type === "mental" && (
                    <div className="bg-[#E8F4FD] rounded-xl p-3 mb-4 flex items-center gap-2">
                      <Play className="w-4 h-4 text-[#A8D5BA]" />
                      <p className="text-sm text-[#4A90E2]">Audio guide included</p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button
                      onClick={() => onStartActivity(rec.type)}
                      className="flex-1 bg-[#A8D5BA] hover:bg-[#8BC5A0] text-white"
                    >
                      Start Now
                    </Button>
                    <Button
                      variant="outline"
                      className="border-[#4A90E2] text-[#4A90E2]"
                    >
                      Learn More
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}