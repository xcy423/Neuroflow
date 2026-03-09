import { motion } from "motion/react";
import { UserPlus, Settings2, Users, Trophy, ArrowLeft, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { useState } from "react";

interface SocialMatchingScreenProps {
  onBack: () => void;
  onCreateChallenge?: () => void;
}

export function SocialMatchingScreen({ onBack, onCreateChallenge }: SocialMatchingScreenProps) {
  const [showPreferences, setShowPreferences] = useState(false);
  const [ageRange, setAgeRange] = useState([25, 35]);
  const [activityLevel, setActivityLevel] = useState([60]);

  const matches = [
    {
      name: "Sarah L.",
      age: 28,
      interests: "Meditation, Yoga",
      matchScore: 92,
      avatar: "👩",
    },
    {
      name: "Mike T.",
      age: 32,
      interests: "Running, HIIT",
      matchScore: 87,
      avatar: "👨",
    },
    {
      name: "Emma C.",
      age: 26,
      interests: "Mindfulness, Walking",
      matchScore: 85,
      avatar: "👱‍♀️",
    },
  ];

  const challenges = [
    {
      title: "30-Day Mindfulness Streak",
      type: "mental",
      participants: 124,
      icon: "🧘‍♀️",
      streak: "12 days",
    },
    {
      title: "Running Relay Team",
      type: "physical",
      participants: 48,
      icon: "🏃‍♀️",
      rank: "3rd place",
    },
  ];

  return (
    <div className="min-h-screen bg-[#E8F4FD] pb-24 pt-12 px-6">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <button onClick={onBack} className="mr-3">
              <ArrowLeft className="w-6 h-6 text-[#4A90E2]" />
            </button>
            <h2 className="text-[#4A90E2]">Connect & Challenge</h2>
          </div>
          <button onClick={() => setShowPreferences(!showPreferences)}>
            <Settings2 className="w-6 h-6 text-[#4A90E2]" />
          </button>
        </div>

        {/* Buddy Prompt */}
        <motion.div
          className="bg-white rounded-3xl p-5 mb-6 shadow-md relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="absolute -top-3 left-6 w-6 h-6 bg-white transform rotate-45"></div>
          <p className="text-[#4A90E2]">
            Found a great <span className="text-[#A8D5BA]">fit</span>—team up or go solo? <span className="text-[#F5A623]">🤝</span>
          </p>
        </motion.div>

        {/* Preferences Panel */}
        {showPreferences && (
          <motion.div
            className="bg-[#E8F4FD] border-2 border-[#4A90E2] rounded-2xl p-5 mb-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <h4 className="text-[#4A90E2] mb-4">Match Preferences</h4>
            
            <div className="mb-4">
              <label className="text-sm text-[#4A90E2] mb-2 block">
                Age Range: {ageRange[0]} - {ageRange[1]}
              </label>
              <Slider
                value={ageRange}
                onValueChange={setAgeRange}
                min={20}
                max={40}
                step={1}
                className="mb-4"
              />
            </div>

            <div className="mb-4">
              <label className="text-sm text-[#4A90E2] mb-2 block">
                Activity Level: {activityLevel[0]}%
              </label>
              <Slider
                value={activityLevel}
                onValueChange={setActivityLevel}
                min={0}
                max={100}
                step={10}
              />
            </div>

            <Button className="w-full bg-[#A8D5BA] hover:bg-[#8BC5A0] text-white">
              Save Preferences
            </Button>
          </motion.div>
        )}

        {/* Invite Friend Button */}
        <motion.button
          className="w-full bg-white border-2 border-[#A8D5BA] text-[#4A90E2] py-4 rounded-xl mb-6 flex items-center justify-center gap-2 shadow-md"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <UserPlus className="w-5 h-5 text-[#A8D5BA]" />
          <span>Invite Friends from Contacts</span>
        </motion.button>

        {/* Auto-matches Section */}
        <div className="mb-8">
          <h3 className="text-[#4A90E2] mb-4">Suggested Matches</h3>
          <div className="space-y-3">
            {matches.map((match, index) => (
              <motion.div
                key={index}
                className="bg-[#4A90E2] text-white rounded-2xl p-4 shadow-md"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-4xl">{match.avatar}</span>
                  <div className="flex-1">
                    <h4 className="text-white mb-1">{match.name}</h4>
                    <p className="text-sm text-white/70">{match.interests}</p>
                  </div>
                  <div className="text-right">
                    <div className="bg-[#A8D5BA] text-[#4A90E2] px-3 py-1 rounded-full text-sm font-heading">
                      {match.matchScore}% match
                    </div>
                  </div>
                </div>
                <Button className="w-full bg-[#A8D5BA] hover:bg-[#8BC5A0] text-white">
                  Connect
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Challenge Previews */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#4A90E2]">Active Challenges</h3>
            {onCreateChallenge && (
              <button
                onClick={onCreateChallenge}
                className="flex items-center gap-1 text-[#A8D5BA] hover:text-[#8BC5A0]"
              >
                <Plus className="w-5 h-5" />
                <span className="text-sm">Create</span>
              </button>
            )}
          </div>
          <div className="space-y-3">
            {challenges.map((challenge, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-5 shadow-md border-2 border-[#A8D5BA]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-4xl">{challenge.icon}</span>
                  <div className="flex-1">
                    <h4 className="text-[#4A90E2] mb-1">{challenge.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-[#4A90E2]/70">
                      <Users className="w-4 h-4" />
                      <span>{challenge.participants} participants</span>
                    </div>
                  </div>
                </div>

                {challenge.type === "mental" && challenge.streak && (
                  <div className="bg-[#E8F4FD] rounded-xl p-3 mb-3 flex items-center gap-2">
                    <span className="text-[#F5A623]">🔥</span>
                    <p className="text-sm text-[#4A90E2]">Your streak: {challenge.streak}</p>
                  </div>
                )}

                {challenge.type === "physical" && challenge.rank && (
                  <div className="bg-[#E8F4FD] rounded-xl p-3 mb-3 flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-[#F5A623]" />
                    <p className="text-sm text-[#4A90E2]">Team rank: {challenge.rank}</p>
                  </div>
                )}

                <Button className="w-full bg-[#A8D5BA] hover:bg-[#8BC5A0] text-white">
                  View Challenge
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
