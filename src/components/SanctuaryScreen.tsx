import { useState } from "react";
import { ArrowLeft, Award } from "lucide-react";
import imgWhatsAppImage20251109At163959D16307Ea1 from "figma:asset/a6e30b99b1b5110ddc2504b6f21c7a9407ff4343.png";

interface SanctuaryScreenProps {
  completedChallenges: number;
  onBack: () => void;
}

export default function SanctuaryScreen({
  completedChallenges,
  onBack,
}: SanctuaryScreenProps) {
  const [atmosphere, setAtmosphere] = useState<"dawn" | "day" | "dusk" | "night">("day");

  const atmospheres = {
    dawn: {
      bg: "linear-gradient(to bottom, #FFB6C1, #FFA07A, #FFE4B5)",
      label: "Dawn",
    },
    day: {
      bg: "linear-gradient(to bottom, #87CEEB, #E0F6FF, #FFFFFF)",
      label: "Day",
    },
    dusk: {
      bg: "linear-gradient(to bottom, #FF6B6B, #FFB347, #4A90E2)",
      label: "Dusk",
    },
    night: {
      bg: "linear-gradient(to bottom, #1a1a2e, #16213e, #0f3460)",
      label: "Night",
    },
  };

  const badges = [
    {
      id: 1,
      name: "First Step",
      icon: "🌱",
      unlocked: completedChallenges >= 1,
      position: "top" as const, // 12 o'clock
    },
    {
      id: 2,
      name: "Wellness Warrior",
      icon: "⚔️",
      unlocked: completedChallenges >= 2,
      position: "right" as const, // 3 o'clock
    },
    {
      id: 3,
      name: "Mind Master",
      icon: "🧠",
      unlocked: completedChallenges >= 5,
      position: "bottom" as const, // 6 o'clock
    },
    {
      id: 4,
      name: "Zen Champion",
      icon: "🏆",
      unlocked: completedChallenges >= 10,
      position: "left" as const, // 9 o'clock
    },
  ];

  // Get positioning styles for compass points around mascot
  const getPositionStyles = (position: "top" | "right" | "bottom" | "left") => {
    const distance = 100; // Distance from mascot center in pixels
    const badgeSize = 60; // Size of badge
    const mascotSize = 120; // Size of mascot

    switch (position) {
      case "top":
        return {
          top: -(distance + badgeSize / 2),
          left: mascotSize / 2 - badgeSize / 2,
        };
      case "right":
        return {
          top: mascotSize / 2 - badgeSize / 2,
          left: mascotSize + distance,
        };
      case "bottom":
        return {
          top: mascotSize + distance,
          left: mascotSize / 2 - badgeSize / 2,
        };
      case "left":
        return {
          top: mascotSize / 2 - badgeSize / 2,
          left: -(distance + badgeSize / 2),
        };
    }
  };

  const mascotStage = completedChallenges >= 10 ? "master" : completedChallenges >= 5 ? "advanced" : completedChallenges >= 2 ? "growing" : "beginner";

  return (
    <div className="bg-[#fcfcfc] relative size-full overflow-hidden">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-8 left-8 z-20 size-[40px] rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-colors"
      >
        <ArrowLeft className="size-[20px]" strokeWidth={2} />
      </button>

      {/* Title */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 text-center">
        <h2 className="text-[24px] font-bold text-[#2c3e50] mb-1">
          Your Sanctuary
        </h2>
        <p className="text-[14px] text-[#868686]">
          {completedChallenges} challenges completed
        </p>
      </div>

      {/* Unlock Info */}
      {completedChallenges < 10 && (
        <div className="absolute top-32 left-8 right-8 z-20 bg-white/90 backdrop-blur-sm rounded-[16px] p-4">
          <div className="flex items-start gap-3">
            <Award className="text-[#F5A623] flex-shrink-0" size={24} />
            <div>
              <p className="text-[14px] font-semibold text-[#2c3e50] mb-1">
                Unlock More Badges!
              </p>
              <p className="text-[12px] text-[#868686]">
                Complete {10 - completedChallenges} more challenges to unlock
                the Zen Champion badge
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Sanctuary Room */}
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{ background: atmospheres[atmosphere].bg }}
      >
        {/* Floor */}
        <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-[rgba(168,213,186,0.3)] to-transparent" />

        {/* Mascot - Evolves based on completion */}
        <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 animate-fade-in">
          <div className="relative">
            <div className="overflow-clip rounded-full size-[120px] border-4 border-white/50 shadow-2xl bg-white">
              <img
                src={imgWhatsAppImage20251109At163959D16307Ea1}
                alt="Harmony"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md z-10">
              <p className="text-[12px] font-semibold text-[#4A90E2]">
                {mascotStage === "master"
                  ? "Master Level"
                  : mascotStage === "advanced"
                  ? "Advanced"
                  : mascotStage === "growing"
                  ? "Growing"
                  : "Beginner"}
              </p>
            </div>

            {/* Achievement Badges - Positioned at compass points around mascot */}
            {badges.map((badge) => (
              <div
                key={badge.id}
                className="absolute animate-fade-in"
                style={getPositionStyles(badge.position)}
              >
                <div
                  className={`size-[60px] rounded-full flex items-center justify-center text-2xl transition-all ${
                    badge.unlocked
                      ? "bg-white border-2 border-[#A8D5BA] shadow-lg scale-100"
                      : "bg-gray-300/30 border-2 border-gray-400/30 grayscale scale-90"
                  }`}
                >
                  {badge.unlocked ? badge.icon : "🔒"}
                </div>
                <p
                  className={`text-[10px] text-center mt-1 font-medium whitespace-nowrap ${
                    badge.unlocked ? "text-[#2c3e50]" : "text-gray-500"
                  }`}
                >
                  {badge.name}
                </p>
              </div>
            ))}
          </div>

          {/* Speech Bubble */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 bg-white rounded-[16px] p-4 shadow-lg max-w-[200px] z-20">
            <p className="text-[12px] text-[#2c3e50] text-center">
              {mascotStage === "master"
                ? "You're a wellness master! 🌟"
                : mascotStage === "advanced"
                ? "Amazing progress! Keep it up! ✨"
                : mascotStage === "growing"
                ? "You're doing great! 💚"
                : "Welcome to your sanctuary! 🌱"}
            </p>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white transform rotate-45" />
          </div>
        </div>

        {/* Atmosphere Controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 bg-white/80 backdrop-blur-sm rounded-[100px] p-2 shadow-lg">
          {(Object.keys(atmospheres) as Array<keyof typeof atmospheres>).map(
            (key) => (
              <button
                key={key}
                onClick={() => setAtmosphere(key)}
                className={`px-4 py-2 rounded-[100px] text-[12px] font-semibold transition-all ${
                  atmosphere === key
                    ? "bg-[#4A90E2] text-white"
                    : "text-[#868686] hover:bg-white"
                }`}
              >
                {atmospheres[key].label}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
