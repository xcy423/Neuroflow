import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Send, Mic, Award } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "harmony";
  timestamp: Date;
  suggestion?: {
    type: "course" | "challenge";
    title: string;
    action: string;
  };
}

interface EnhancedSanctuaryScreenProps {
  completedChallenges: number;
  wellnessScore: number;
  onClose: () => void;
}

export default function EnhancedSanctuaryScreen({
  completedChallenges,
  wellnessScore,
  onClose,
}: EnhancedSanctuaryScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Welcome to your personal sanctuary! I'm Harmony, your wellness companion. How can I support you today?",
      sender: "harmony",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState("");
  const [isChatMode, setIsChatMode] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [atmosphere, setAtmosphere] = useState<"dawn" | "day" | "dusk" | "night">("day");
  const [showSpeechBubble, setShowSpeechBubble] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Hide speech bubble after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpeechBubble(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  // Atmosphere styles based on selected atmosphere
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

  // Badges configuration - positioned to orbit around center at clock positions
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
  const getBadgePosition = (position: "top" | "right" | "bottom" | "left") => {
    const distance = 100; // Distance from mascot center
    const badgeSize = 60;
    const mascotSize = 120;

    switch (position) {
      case "top":
        return {
          top: -(distance + badgeSize / 2),
          left: mascotSize / 2 - badgeSize / 2,
        };
      case "right":
        return {
          top: mascotSize / 2 - badgeSize / 2,
          left: mascotSize + distance - 30, // Moved 30px to the left
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

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        setVoiceTranscript(interimTranscript || finalTranscript);

        if (finalTranscript) {
          setInputText(finalTranscript);
          setIsListening(false);
          if (recognitionRef.current) {
            recognitionRef.current.stop();
          }
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
        setVoiceTranscript("");
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const toggleVoiceInput = () => {
    if (isListening) {
      // Stop listening
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      setVoiceTranscript("");
    } else {
      // Start listening
      if (recognitionRef.current) {
        setIsListening(true);
        setVoiceTranscript("");
        recognitionRef.current.start();
      } else {
        alert("Voice recognition is not supported in your browser. Please type your message.");
      }
    }
  };

  const generateHarmonyResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    let responseText = "";
    let suggestion = undefined;

    if (lowerMessage.includes("stress") || lowerMessage.includes("anxious") || lowerMessage.includes("anxiety")) {
      responseText = "I notice you're experiencing stress. Your HRV data suggests that breathing exercises could help. Would you like to try a guided meditation?";
      suggestion = {
        type: "course" as const,
        title: "Meditation basics",
        action: "Start Course",
      };
    } else if (lowerMessage.includes("sleep") || lowerMessage.includes("tired")) {
      responseText = "Quality sleep is so important! Based on your wellness score, I recommend trying our Sleep Meditation course to improve your rest.";
      suggestion = {
        type: "course" as const,
        title: "Sleep Meditation",
        action: "Start Course",
      };
    } else if (lowerMessage.includes("energy") || lowerMessage.includes("workout")) {
      responseText = "Great! I see you're ready to boost your energy. How about joining the Morning Energy Boost challenge?";
      suggestion = {
        type: "challenge" as const,
        title: "Morning Energy Boost",
        action: "Join Challenge",
      };
    } else if (lowerMessage.includes("challenge")) {
      responseText = "You've completed " + completedChallenges + " challenges so far! Ready to take on a new one? The 7-Day Mindfulness challenge is popular.";
      suggestion = {
        type: "challenge" as const,
        title: "7-Day Mindfulness",
        action: "Join Challenge",
      };
    } else if (lowerMessage.includes("progress") || lowerMessage.includes("score")) {
      responseText = `Your wellness score is ${wellnessScore}/100. That's ${wellnessScore >= 80 ? "excellent" : wellnessScore >= 60 ? "good" : "a great start"}! Keep up the consistency and you'll see even more improvement. 🌟`;
    } else if (lowerMessage.includes("thanks") || lowerMessage.includes("thank you")) {
      responseText = "You're so welcome! I'm always here to support your wellness journey. Remember, every small step counts! 💚";
    } else {
      responseText = "I'm here to help with your wellness journey! You can ask me about managing stress, improving sleep, finding energy, or tracking your progress. What would you like to explore?";
    }

    return {
      id: Date.now().toString(),
      text: responseText,
      sender: "harmony",
      timestamp: new Date(),
      suggestion,
    };
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setVoiceTranscript("");

    // Simulate Harmony typing
    setIsTyping(true);

    // Generate and add Harmony response after delay
    setTimeout(() => {
      const harmonyResponse = generateHarmonyResponse(inputText);
      setMessages((prev) => [...prev, harmonyResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#fcfcfc] overflow-hidden"
    >
      {/* Sanctuary Background */}
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{ background: atmospheres[atmosphere].bg }}
      >
        {/* Floor with gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-[rgba(168,213,186,0.3)] to-transparent" />

        {/* Mascot - Evolves based on completion */}
        <AnimatePresence>
          {!isChatMode && (
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="relative">
                <div className="overflow-clip rounded-full size-[120px] border-4 border-white/50 shadow-2xl bg-white">
                  <img
                    src="https://i.postimg.cc/Jy5SJ4G0/image.png"
                    alt="Harmony"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md z-10">
                  <p className={`text-[12px] font-semibold ${atmosphere === "night" ? "text-white" : "text-[#4A90E2]"}`}>
                    {mascotStage === "master"
                      ? "Master Level"
                      : mascotStage === "advanced"
                      ? "Advanced"
                      : mascotStage === "growing"
                      ? "Growing"
                      : "Beginner"}
                  </p>
                </div>

                {/* Achievement Badges - Positioned around mascot */}
                {badges.map((badge, index) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      x: [0, 3, -3, 0],
                      y: [0, -3, 3, 0],
                    }}
                    transition={{ 
                      duration: 0.3,
                      x: {
                        duration: 8 + index * 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                      y: {
                        duration: 7 + index * 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                    className="absolute"
                    style={getBadgePosition(badge.position)}
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
                        badge.unlocked 
                          ? atmosphere === "night" ? "text-white" : "text-[#2c3e50]"
                          : "text-gray-500"
                      }`}
                    >
                      {badge.name}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Speech Bubble - Disappears after 3 seconds */}
              <AnimatePresence>
                {showSpeechBubble && (
                  <motion.div 
                    initial={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="absolute -top-24 left-1/2 -translate-x-1/2 bg-white rounded-[16px] p-4 shadow-lg max-w-[200px]"
                  >
                    <p className={`text-[12px] text-center ${atmosphere === "night" ? "text-white" : "text-[#2c3e50]"}`}>
                      {mascotStage === "master"
                        ? "You're a wellness master! 🌟"
                        : mascotStage === "advanced"
                        ? "Amazing progress! Keep it up! ✨"
                        : mascotStage === "growing"
                        ? "You're doing great! 💚"
                        : "Welcome to your sanctuary! 🌱"}
                    </p>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white transform rotate-45" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Harmony in Chat Mode */}
        <AnimatePresence>
          {isChatMode && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 100 }}
              transition={{ duration: 0.4, type: "spring" }}
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-[15%] left-1/2 -translate-x-1/2"
              >
                <div className="relative">
                  <div className="overflow-clip rounded-full size-[100px] border-4 border-white/70 shadow-2xl bg-gradient-to-br from-[#FFA07A] to-[#9B7FDB]">
                    <img
                      src="https://i.postimg.cc/Jy5SJ4G0/image.png"
                      alt="Harmony"
                      className="w-full h-full object-cover scale-150"
                    />
                  </div>

                  {/* Glow effect */}
                  <div
                    className="absolute inset-0 rounded-full blur-xl opacity-50"
                    style={{
                      background: "radial-gradient(circle, rgba(168,213,186,0.6) 0%, transparent 70%)",
                    }}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Atmosphere Controls - Hidden in chat mode */}
        <AnimatePresence>
          {!isChatMode && (
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-[100px] left-1/2 -translate-x-1/2 flex gap-2 bg-white/80 backdrop-blur-sm rounded-[100px] p-2 shadow-lg z-10"
            >
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
            </motion.div>
          )}
        </AnimatePresence>

        {/* Unlock Info - Hidden in chat mode */}
        <AnimatePresence>
          {!isChatMode && completedChallenges < 10 && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-20 left-8 right-8 bg-white/90 backdrop-blur-sm rounded-[16px] p-4 z-20"
            >
              <div className="flex items-start gap-3">
                <Award className={atmosphere === "night" ? "text-white" : "text-[#F5A623]"} size={24} />
                <div>
                  <p className={`text-[14px] font-semibold mb-1 ${atmosphere === "night" ? "text-white" : "text-[#2c3e50]"}`}>
                    Unlock More Badges!
                  </p>
                  <p className={`text-[12px] ${atmosphere === "night" ? "text-gray-200" : "text-[#868686]"}`}>
                    Complete {10 - completedChallenges} more challenges to unlock
                    the Zen Champion badge
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 left-6 z-50 size-[44px] rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-all"
      >
        <ArrowLeft className="size-[20px] text-[#2c3e50]" />
      </button>

      {/* Title - Hidden in chat mode */}
      <AnimatePresence>
        {!isChatMode && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-6 left-1/2 -translate-x-1/2 z-20 text-center"
          >
            <h2 className={`text-[24px] font-bold mb-1 ${atmosphere === "night" ? "text-white" : "text-[#2c3e50]"}`}>
              Your Sanctuary
            </h2>
            <p className={`text-[14px] ${atmosphere === "night" ? "text-gray-200" : "text-[#868686]"}`}>
              {completedChallenges} challenges completed
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compact Input Bar - Default State */}
      <AnimatePresence>
        {!isChatMode && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-3 z-20"
          >
            <button
              onClick={() => setIsChatMode(true)}
              className="w-full bg-white/95 backdrop-blur-md rounded-[20px] px-5 py-4 shadow-lg flex items-center gap-3 hover:shadow-xl transition-all"
            >
              <div className="flex-1 text-left">
                <p className={`text-[14px] ${atmosphere === "night" ? "text-gray-300" : "text-[#868686]"}`}>
                  Ask Harmony anything... e.g., "How can I reduce stress today?"
                </p>
              </div>
              <Mic className="size-[20px] text-[#4A90E2] flex-shrink-0" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Chat Interface - Expanded State */}
      <AnimatePresence>
        {isChatMode && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.4, type: "spring", damping: 25 }}
            className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md rounded-t-[24px] shadow-2xl flex flex-col"
            style={{ height: "55%" }}
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#e2e6e7]/30">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-[#FFA07A] to-[#9B7FDB] flex items-center justify-center">
                  <img
                    src="https://i.postimg.cc/Jy5SJ4G0/image.png"
                    alt="Harmony"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-[14px] font-bold text-[#2c3e50]">Harmony</p>
                  <p className="text-[11px] text-[#A8D5BA]">● Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsChatMode(false)}
                className="text-[#868686] hover:text-[#2c3e50] transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M15 10L5 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M9 6L5 10L9 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto px-5 pt-4 pb-4 space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] ${
                  message.sender === "user"
                    ? "bg-[#4A90E2] text-white rounded-[16px] rounded-br-[4px]"
                    : "bg-[#E8F4FD] text-[#2c3e50] rounded-[16px] rounded-bl-[4px]"
                } px-4 py-3 shadow-sm`}
              >
                <p className="text-[14px] leading-relaxed">{message.text}</p>
                
                {/* Suggestion Card */}
                {message.suggestion && (
                  <div className="mt-3 p-3 bg-white rounded-[12px] border border-[#4A90E2]/20">
                    <p className="text-[12px] font-semibold text-[#4A90E2] mb-2">
                      {message.suggestion.type === "course" ? "📚 Recommended Course" : "🎯 Recommended Challenge"}
                    </p>
                    <p className="text-[13px] text-[#2c3e50] mb-3">{message.suggestion.title}</p>
                    <button className="w-full bg-[#4a90e2] text-white py-2 rounded-[8px] text-[12px] font-bold shadow-[0px_4px_0px_0px_#477baf] active:translate-y-[2px] active:shadow-[0px_2px_0px_0px_#477baf] transition-all">
                      {message.suggestion.action}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-[#E8F4FD] text-[#2c3e50] rounded-[16px] rounded-bl-[4px] px-4 py-3 shadow-sm">
                <div className="flex gap-1">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    className="w-2 h-2 bg-[#4A90E2] rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    className="w-2 h-2 bg-[#4A90E2] rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    className="w-2 h-2 bg-[#4A90E2] rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          )}

              <div ref={messagesEndRef} />
            </div>

            {/* Voice Transcript Preview */}
            <AnimatePresence>
              {isListening && voiceTranscript && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-5 pb-2"
                >
                  <div className="bg-[#E8F4FD] rounded-[12px] px-4 py-2 border border-[#4A90E2]/30">
                    <p className="text-[12px] text-[#4A90E2] mb-1 font-semibold">Listening...</p>
                    <p className="text-[13px] text-[#2c3e50]">{voiceTranscript}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input Area */}
            <div className="px-5 pb-5 pt-3 border-t border-[#e2e6e7]/30">
              <div className="flex items-end gap-2">
                {/* Text Input */}
                <div className="flex-1 bg-[#E8F4FD] rounded-[20px] px-4 py-3 flex items-center gap-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 bg-transparent outline-none text-[14px] text-[#2c3e50] placeholder:text-[#868686]"
                    autoFocus
                  />
                </div>

                {/* Voice Input Button */}
                <motion.button
                  onClick={toggleVoiceInput}
                  whileTap={{ scale: 0.95 }}
                  className={`size-[44px] rounded-full flex items-center justify-center shadow-md transition-all ${
                    isListening
                      ? "bg-[#F5A623] text-white"
                      : "bg-white text-[#4A90E2] hover:bg-[#E8F4FD]"
                  }`}
                >
                  {isListening ? (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <Mic className="size-[20px]" />
                    </motion.div>
                  ) : (
                    <Mic className="size-[20px]" />
                  )}
                </motion.button>

                {/* Send Button */}
                <motion.button
                  onClick={handleSendMessage}
                  whileTap={{ scale: 0.95 }}
                  disabled={!inputText.trim()}
                  className={`size-[44px] rounded-full flex items-center justify-center shadow-md transition-all ${
                    inputText.trim()
                      ? "bg-[#4A90E2] text-white hover:bg-[#3A80D2]"
                      : "bg-[#ecf0f1] text-[#868686]"
                  }`}
                >
                  <Send className="size-[20px]" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
