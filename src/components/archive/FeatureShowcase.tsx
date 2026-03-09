import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, Mic, Hand, Sparkles, ArrowRight, X } from "lucide-react";

interface Feature {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  demo: React.ReactNode;
}

interface FeatureShowcaseProps {
  onClose: () => void;
}

export default function FeatureShowcase({ onClose }: FeatureShowcaseProps) {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  const features: Feature[] = [
    {
      id: "sanctuary",
      icon: <Sparkles className="w-6 h-6" />,
      title: "Sanctuary Room",
      description: "Your personal wellness space that evolves with your progress",
      demo: (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#2c3e50]" />
            <p className="text-[12px] text-[#868686]">Dawn (Score 0-39)</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#667eea]" />
            <p className="text-[12px] text-[#868686]">Emerging (Score 40-59)</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#87CEEB]" />
            <p className="text-[12px] text-[#868686]">Growing (Score 60-79)</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#FFDAB9]" />
            <p className="text-[12px] text-[#868686]">Blooming (Score 80-100)</p>
          </div>
        </div>
      ),
    },
    {
      id: "chatbot",
      icon: <MessageCircle className="w-6 h-6" />,
      title: "AI Chatbot",
      description: "Harmony provides personalized wellness guidance based on your data",
      demo: (
        <div className="space-y-3">
          <div className="bg-[#4A90E2] text-white rounded-[16px] rounded-br-[4px] px-4 py-3 ml-auto max-w-[80%]">
            <p className="text-[12px]">How can I reduce stress today?</p>
          </div>
          <div className="bg-[#E8F4FD] text-[#2c3e50] rounded-[16px] rounded-bl-[4px] px-4 py-3 max-w-[80%]">
            <p className="text-[12px]">Your HRV suggests breathing exercises could help. Try the Meditation basics course!</p>
          </div>
        </div>
      ),
    },
    {
      id: "voice",
      icon: <Mic className="w-6 h-6" />,
      title: "Voice Input",
      description: "Speak naturally and watch your words appear in real-time",
      demo: (
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-[#E8F4FD] rounded-[12px]">
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-10 h-10 rounded-full bg-[#F5A623] flex items-center justify-center flex-shrink-0"
            >
              <Mic className="w-5 h-5 text-white" />
            </motion.div>
            <div className="flex-1">
              <p className="text-[11px] text-[#4A90E2] font-semibold mb-1">Listening...</p>
              <p className="text-[12px] text-[#2c3e50]">"How can I improve my sleep?"</p>
            </div>
          </div>
          <p className="text-[11px] text-[#868686] text-center">Auto-sends when you finish speaking</p>
        </div>
      ),
    },
    {
      id: "tap-reveal",
      icon: <Hand className="w-6 h-6" />,
      title: "Tap-to-Reveal",
      description: "Cards show action buttons only when you tap them",
      demo: (
        <div className="space-y-3">
          <div className="text-center mb-3">
            <p className="text-[11px] text-[#868686] mb-2">First Tap → Button appears</p>
            <motion.div
              animate={{ scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mx-auto w-16 h-16 rounded-full bg-[#4A90E2] flex items-center justify-center text-white font-bold text-[12px]"
            >
              TAP
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#4a90e2] text-white py-2 px-4 rounded-[8px] font-bold text-[12px] shadow-[0px_4px_0px_0px_#477baf] text-center"
          >
            Continue Course
          </motion.div>
          <p className="text-[11px] text-[#868686] text-center">Auto-fades after 3 seconds</p>
        </div>
      ),
    },
  ];

  return (
    <div className="fixed inset-0 z-[90] bg-[#fcfcfc]">
      <div className="size-full overflow-y-auto pb-24">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#fcfcfc]/95 backdrop-blur-sm border-b border-[#e2e6e7]/30 px-6 py-4">
          <div className="flex items-center justify-between max-w-md mx-auto">
            <div>
              <h2 className="text-[20px] font-bold text-[#2c3e50] mb-1">
                Feature Showcase
              </h2>
              <p className="text-[12px] text-[#868686]">
                Explore interactive capabilities
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white border border-[#e2e6e7] shadow-sm flex items-center justify-center hover:bg-[#E8F4FD] transition-all"
            >
              <X className="w-5 h-5 text-[#2c3e50]" />
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="px-6 pt-6 max-w-md mx-auto">
          <div className="grid gap-4 mb-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  onClick={() => setActiveFeature(activeFeature === feature.id ? null : feature.id)}
                  className="w-full text-left bg-white rounded-[16px] border border-[#e2e6e7] shadow-sm hover:shadow-md transition-all overflow-hidden"
                >
                  {/* Feature Header */}
                  <div className="p-5 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4A90E2] to-[#5BA0F2] flex items-center justify-center text-white flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[16px] font-bold text-[#2c3e50] mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-[13px] text-[#868686] leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                    <motion.div
                      animate={{ rotate: activeFeature === feature.id ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="w-5 h-5 text-[#4A90E2]" />
                    </motion.div>
                  </div>

                  {/* Demo Area */}
                  <AnimatePresence>
                    {activeFeature === feature.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 border-t border-[#e2e6e7]/30 pt-4">
                          <div className="bg-[#fcfcfc] rounded-[12px] p-4">
                            {feature.demo}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            ))}
          </div>

          {/* Interaction Flow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-[#4A90E2] to-[#5BA0F2] rounded-[16px] p-6 shadow-lg mb-6"
          >
            <h3 className="text-[16px] font-bold text-white mb-4">
              📱 Complete User Flow
            </h3>
            <div className="space-y-3">
              {[
                "Tap Harmony → Sanctuary opens with evolving atmosphere",
                "Type or speak your wellness question",
                "Harmony responds with personalized suggestion",
                "Tap suggested course → Card reveals button → Navigate to session",
                "Start your wellness activity!",
              ].map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/20 text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-[13px] text-white flex-1 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Technical Specs */}
          <div className="bg-white rounded-[16px] border border-[#e2e6e7] shadow-sm p-5 mb-6">
            <h3 className="text-[16px] font-bold text-[#2c3e50] mb-4">
              ⚙️ Technical Highlights
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#A8D5BA] mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-[13px] font-semibold text-[#2c3e50] mb-1">
                    Web Speech API
                  </p>
                  <p className="text-[11px] text-[#868686]">
                    Real-time voice recognition with fallback to text
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#4A90E2] mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-[13px] font-semibold text-[#2c3e50] mb-1">
                    Motion Animations
                  </p>
                  <p className="text-[11px] text-[#868686]">
                    Spring-based animations for natural feel
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#F5A623] mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-[13px] font-semibold text-[#2c3e50] mb-1">
                    Haptic Feedback
                  </p>
                  <p className="text-[11px] text-[#868686]">
                    Subtle vibrations enhance touch interactions
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#9B7FDB] mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-[13px] font-semibold text-[#2c3e50] mb-1">
                    Responsive Design
                  </p>
                  <p className="text-[11px] text-[#868686]">
                    320px to 440px, adapts without distortion
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
