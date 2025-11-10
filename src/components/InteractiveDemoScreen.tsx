import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";

interface InteractiveDemoScreenProps {
  onStartDemo: () => void;
}

export default function InteractiveDemoScreen({ onStartDemo }: InteractiveDemoScreenProps) {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const features = [
    {
      id: "sanctuary",
      title: "🏞️ Sanctuary Room",
      description: "Tap Harmony mascot → Full-screen sanctuary with evolving atmosphere",
      highlights: ["Dim to blooming plants based on progress", "Floating Harmony with welcoming pose"],
    },
    {
      id: "chatbot",
      title: "💬 AI Chatbot Interface",
      description: "Chat with Harmony at the bottom of sanctuary",
      highlights: ["Empathetic responses tied to user data", "Wellness suggestions (courses/challenges)"],
    },
    {
      id: "voice",
      title: "🎙️ Voice Input",
      description: "Microphone icon for speech-to-text",
      highlights: ["Listening animation with pulse effect", "Auto-transcription preview", "Fallback to text on error"],
    },
    {
      id: "tap-reveal",
      title: "👆 Tap-to-Reveal Buttons",
      description: "Course/Challenge cards with hidden action buttons",
      highlights: ["First tap reveals button with fade-in", "3D button effect with shadow", "Auto-fade after 3 seconds"],
    },
    {
      id: "responsive",
      title: "📱 Fully Responsive",
      description: "Works across all device sizes",
      highlights: ["iPhone SE to Pro Max support", "No overlapping content", "Smooth transitions"],
    },
  ];

  return (
    <div className="bg-gradient-to-br from-[#E8F4FD] via-white to-[#A8D5BA]/20 relative size-full overflow-hidden">
      <div className="size-full overflow-y-auto pb-24 px-6 pt-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-[28px] font-bold text-[#2c3e50] mb-3">
            Emotionally Intelligent
            <br />
            Wellness Platform
          </h1>
          <p className="text-[14px] text-[#868686] max-w-[300px] mx-auto">
            Interactive mobile prototype with AI-driven mental and physical health support
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[16px] p-5 shadow-sm border border-[#e2e6e7]"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-[16px] font-bold text-[#2c3e50] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-[13px] text-[#868686] mb-3">
                    {feature.description}
                  </p>
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-2">
                {feature.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#A8D5BA] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </div>
                    <p className="text-[12px] text-[#2c3e50] flex-1">{highlight}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Design System */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-[16px] p-5 shadow-sm border border-[#e2e6e7] mb-8"
        >
          <h3 className="text-[16px] font-bold text-[#2c3e50] mb-4">🎨 Design System</h3>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#4A90E2]" />
              <span className="text-[11px] text-[#868686]">#4A90E2<br />Soft Blue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#A8D5BA]" />
              <span className="text-[11px] text-[#868686]">#A8D5BA<br />Mint Green</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#E8F4FD]" />
              <span className="text-[11px] text-[#868686]">#E8F4FD<br />Light Blue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#F5A623]" />
              <span className="text-[11px] text-[#868686]">#F5A623<br />Orange</span>
            </div>
          </div>

          <div className="bg-[#fcfcfc] rounded-[12px] p-3">
            <p className="text-[11px] text-[#868686] mb-2">Typography: Inter</p>
            <p className="text-[11px] text-[#868686]">Device: iPhone 14 (390x844px)</p>
          </div>
        </motion.div>

        {/* Interaction Flows */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-br from-[#4A90E2] to-[#5BA0F2] rounded-[16px] p-5 shadow-lg mb-8"
        >
          <h3 className="text-[16px] font-bold text-white mb-4">🔄 Key Interaction Flows</h3>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white/20 text-white text-[12px] font-bold flex items-center justify-center">1</div>
              <p className="text-[12px] text-white flex-1">Tap Harmony → Sanctuary opens</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white/20 text-white text-[12px] font-bold flex items-center justify-center">2</div>
              <p className="text-[12px] text-white flex-1">Type or speak query → AI response</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white/20 text-white text-[12px] font-bold flex items-center justify-center">3</div>
              <p className="text-[12px] text-white flex-1">Tap course card → Button reveals → Navigate</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white/20 text-white text-[12px] font-bold flex items-center justify-center">4</div>
              <p className="text-[12px] text-white flex-1">Voice mode → Mic pulses → Auto-transcribe</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Start Demo Button */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent">
        <motion.button
          onClick={onStartDemo}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-[#4A90E2] to-[#5BA0F2] text-white py-4 rounded-[16px] font-bold text-[16px] shadow-lg flex items-center justify-center gap-2"
        >
          Start Interactive Demo
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}
