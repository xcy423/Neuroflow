import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Trophy, BookOpen, Flame, Smile, Mic, ArrowLeft, Send } from "lucide-react";
import bgImage from "../assets/138258db41e1d9a87118bb9fee9fe093f178caa5.png";
import bearImg from "../assets/000885b7c4e9d58a4aae5da67f617c7a43aa4705.png";

type NavScreen = "home" | "sessions" | "challenges" | "profile";

interface Message {
  id: number;
  role: "user" | "harmony";
  text: string;
  time?: string;
}

interface HomeChatScreenProps {
  streakDays?: number;
  completedChallenges?: number;
  totalChallenges?: number;
  completedCourses?: number;
  totalCourses?: number;
  mood?: string;
  initialMessage?: string;
  onBack?: () => void;
  onNavigate?: (screen: NavScreen) => void;
}

interface StatBubbleProps {
  icon: React.ElementType;
  label: string;
  value: string;
  glowColor: string;
  badgeBg: string;
  left: number;
  top: number;
  delay?: number;
  onClick?: () => void;
}

function StatBubble({ icon: Icon, label, value, glowColor, badgeBg, left, top, delay = 0.3, onClick }: StatBubbleProps) {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileTap={onClick ? { scale: 0.88 } : undefined}
      whileHover={onClick ? { scale: 1.07 } : undefined}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay }}
      onClick={onClick}
      style={{
        position: "absolute",
        left,
        top,
        width: 110,
        height: 110,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.04)",
        border: "none",
        cursor: onClick ? "pointer" : "default",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        padding: 0,
        boxShadow: `inset 0 0 22px 3px ${glowColor}, 0 0 8px 1px ${glowColor}`,
        zIndex: 5,
      }}
    >
      <Icon size={22} color="white" style={{ filter: `drop-shadow(0 0 4px ${glowColor})` }} />
      <span style={{ color: "white", fontSize: 11, fontWeight: 600, fontFamily: "Raleway, sans-serif", textShadow: `0 0 4px ${glowColor}`, textAlign: "center", lineHeight: 1.2 }}>
        {label}
      </span>
      <div style={{ background: badgeBg, borderRadius: 20, padding: "3px 10px", boxShadow: `0 0 4px 0 ${glowColor}` }}>
        <span style={{ color: "white", fontSize: 11, fontWeight: 600, fontFamily: "Raleway, sans-serif" }}>{value}</span>
      </div>
    </motion.button>
  );
}

function getTimeLabel() {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes().toString().padStart(2, "0");
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `Today ${h12}:${m}${ampm}`;
}

const HARMONY_RESPONSES = [
  "Hey, I heard you. That's a lot to carry right now — but you've gotten through tough moments before, and I'm here with you. Want to break it down together? 🍃",
  "That sounds really overwhelming. Let's take a breath first. 🧘 Your feelings are valid. What feels most urgent to tackle right now?",
  "I've got you. One step at a time — let's figure this out together. What's weighing on you the most right now?",
  "Thank you for sharing that with me. It takes courage to speak up when things feel heavy. Let's work through this together. 💛",
  "I hear you. It sounds like you're doing your best in a really tough situation. Let's make a small plan to help you feel more in control. 📋",
];

export default function HomeChatScreen({
  streakDays = 7,
  completedChallenges = 6,
  totalChallenges = 12,
  completedCourses = 4,
  totalCourses = 10,
  mood = "Good",
  initialMessage,
  onBack,
  onNavigate,
}: HomeChatScreenProps) {
  const [chatInput, setChatInput] = useState("");
  const [chatMode, setChatMode] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [harmonyTyping, setHarmonyTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const msgId = useRef(0);
  const didAutoSend = useRef(false);

  // Auto-send the initial message that came from the bubble
  useEffect(() => {
    if (initialMessage && !didAutoSend.current) {
      didAutoSend.current = true;
      const userMsg: Message = { id: ++msgId.current, role: "user", text: initialMessage, time: getTimeLabel() };
      setMessages([userMsg]);
      setChatMode(true);
      setHarmonyTyping(true);
      setTimeout(() => {
        setHarmonyTyping(false);
        const response = HARMONY_RESPONSES[Math.floor(Math.random() * HARMONY_RESPONSES.length)];
        setMessages((prev) => [...prev, { id: ++msgId.current, role: "harmony", text: response }]);
      }, 1400);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (chatMode) {
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  }, [messages, chatMode]);

  const handleSend = () => {
    const text = chatInput.trim();
    if (!text) return;
    setChatInput("");

    const userMsg: Message = { id: ++msgId.current, role: "user", text, time: getTimeLabel() };
    setMessages((prev) => [...prev, userMsg]);

    if (!chatMode) {
      setChatMode(true);
    }

    // Harmony "typing" delay then respond
    setHarmonyTyping(true);
    setTimeout(() => {
      setHarmonyTyping(false);
      const response = HARMONY_RESPONSES[Math.floor(Math.random() * HARMONY_RESPONSES.length)];
      setMessages((prev) => [...prev, { id: ++msgId.current, role: "harmony", text: response }]);
    }, 1400);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        overflow: "hidden",
        background: "linear-gradient(180deg, #0d1b2e 0%, #0f2240 40%, #112a4a 70%, #0d1b2e 100%)",
      }}
    >
      {/* Galaxy background */}
      <img
        src={bgImage}
        alt=""
        style={{
          position: "absolute",
          left: "50%",
          top: "-10%",
          transform: "translateX(-50%)",
          width: "220%",
          height: "auto",
          objectFit: "cover",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
          opacity: 0.45,
        }}
      />

      {/* Bottom gradient */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: 180,
          background: "linear-gradient(to top, rgba(10,22,40,0.95) 0%, rgba(10,22,40,0) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Back button */}
      {onBack && (
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          style={{
            position: "absolute",
            top: 56,
            left: 20,
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.15)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 20,
          }}
        >
          <ArrowLeft size={20} color="white" />
        </motion.button>
      )}

      {/* ═══════════════════════════════════════════════
          IDLE MODE — Bear + Stat Bubbles
      ═══════════════════════════════════════════════ */}
      <AnimatePresence>
        {!chatMode && (
          <motion.div
            key="idle"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ position: "absolute", inset: 0, zIndex: 2 }}
          >
            {/* Badge notification banner */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              style={{
                position: "absolute",
                left: 33,
                top: 100,
                right: 33,
                height: 80,
                borderRadius: 20,
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "0 16px",
                overflow: "hidden",
                boxShadow: "0 0 12px 0 rgba(255,255,255,0.5), inset 0 0 4px 0 rgba(255,255,255,0.3)",
                zIndex: 10,
              }}
            >
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#4a90e2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 0 6px 1px rgba(255,255,255,0.5)" }}>
                <Trophy size={18} color="white" />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1, minWidth: 0 }}>
                <span style={{ color: "white", fontSize: 14, fontWeight: 700, fontFamily: "Raleway, sans-serif" }}>Unlock More Badges</span>
                <span style={{ color: "white", fontSize: 12, fontWeight: 400, fontFamily: "Raleway, sans-serif", lineHeight: 1.3 }}>
                  Complete 5 more challenges to unlock Gold Champion 🏅
                </span>
              </div>
            </motion.div>

            {/* Warm radial glow behind bear */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "38%",
                transform: "translate(-50%, -50%)",
                width: 420,
                height: 420,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(255,180,80,0.18) 0%, rgba(255,140,40,0.08) 45%, rgba(0,0,0,0) 70%)",
                pointerEvents: "none",
                zIndex: 1,
              }}
            />

            {/* Bear */}
            <motion.img
              src={bearImg}
              alt="Harmony"
              initial={{ scale: 0.88, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 140, damping: 16 }}
              style={{
                position: "absolute",
                width: 380,
                height: 420,
                objectFit: "contain",
                left: "calc(50% - 190px)",
                top: 220,
                zIndex: 4,
                pointerEvents: "none",
                userSelect: "none",
                filter: "drop-shadow(0 8px 32px rgba(255,160,50,0.35)) drop-shadow(0 0 60px rgba(255,140,30,0.2))",
              }}
            />

            {/* Challenges bubble */}
            <StatBubble
              icon={Trophy}
              label="Challenges:"
              value={`${completedChallenges}/${totalChallenges}`}
              glowColor="#4a90e2"
              badgeBg="rgba(74,144,226,0.5)"
              left={165}
              top={248}
              delay={0.35}
              onClick={onNavigate ? () => onNavigate("challenges") : undefined}
            />

            {/* Sessions bubble */}
            <StatBubble
              icon={BookOpen}
              label="Sessions:"
              value={`${completedCourses}/${totalCourses}`}
              glowColor="#a8d5ba"
              badgeBg="rgba(168,213,186,0.5)"
              left={14}
              top={328}
              delay={0.45}
              onClick={onNavigate ? () => onNavigate("sessions") : undefined}
            />

            {/* Mood bubble — not clickable */}
            <StatBubble
              icon={Smile}
              label="Mood:"
              value={mood}
              glowColor="rgba(245,166,35,0.65)"
              badgeBg="rgba(245,166,35,0.22)"
              left={320}
              top={328}
              delay={0.45}
            />

            {/* Streak bubble */}
            <StatBubble
              icon={Flame}
              label="Streak:"
              value={`${streakDays} days`}
              glowColor="rgba(255,255,255,0.75)"
              badgeBg="rgba(252,252,252,0.4)"
              left={62}
              top={585}
              delay={0.55}
              onClick={onNavigate ? () => onNavigate("home") : undefined}
            />

            {/* Speech bubble */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.65, type: "spring", stiffness: 300, damping: 22 }}
              style={{
                position: "absolute",
                left: 258,
                top: 546,
                zIndex: 6,
                filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.2))",
              }}
            >
              <div style={{ position: "absolute", top: -9, left: 22, width: 0, height: 0, borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderBottom: "10px solid rgba(255,255,255,0.96)" }} />
              <div style={{ width: 162, minHeight: 66, borderRadius: 16, background: "rgba(255,255,255,0.96)", padding: "12px 14px", display: "flex", alignItems: "center" }}>
                <span style={{ color: "#1a1a1a", fontSize: 12, fontWeight: 600, fontFamily: "Raleway, sans-serif", lineHeight: 1.4 }}>
                  You are doing great today! 🍃
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════
          CHAT MODE — Messages
      ═══════════════════════════════════════════════ */}
      <AnimatePresence>
        {chatMode && (
          <motion.div
            key="chat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 3,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Bear avatar — small at top */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: 60,
                flexShrink: 0,
              }}
            >
              <img
                src={bearImg}
                alt="Harmony"
                style={{
                  width: 160,
                  height: 160,
                  objectFit: "contain",
                  filter: "drop-shadow(0 6px 20px rgba(255,160,50,0.4))",
                }}
              />
            </div>

            {/* Messages scroll area */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "0 20px 16px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {messages.map((msg) => (
                <div key={msg.id}>
                  {/* Timestamp above user messages */}
                  {msg.role === "user" && msg.time && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        textAlign: "center",
                        color: "white",
                        fontSize: 13,
                        fontWeight: 600,
                        fontFamily: "Raleway, sans-serif",
                        marginBottom: 6,
                        marginTop: 8,
                      }}
                    >
                      {msg.time}
                    </motion.div>
                  )}

                  {/* Message bubble */}
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 28 }}
                    style={{
                      padding: "14px 16px",
                      borderRadius: 20,
                      maxWidth: "100%",
                      background: msg.role === "user"
                        ? "rgba(255,255,255,0.2)"
                        : "rgba(217,217,217,0.8)",
                      boxShadow: "0 0 12px 0 rgba(255,255,255,0.5), inset 0 0 4px 0 rgba(255,255,255,0.3)",
                    }}
                  >
                    <span
                      style={{
                        color: msg.role === "user" ? "white" : "#1a1a1a",
                        fontSize: 12,
                        fontWeight: 600,
                        fontFamily: "Raleway, sans-serif",
                        lineHeight: 1.55,
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {msg.text}
                    </span>
                  </motion.div>
                </div>
              ))}

              {/* Harmony typing indicator */}
              <AnimatePresence>
                {harmonyTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    style={{
                      padding: "12px 16px",
                      borderRadius: 20,
                      background: "rgba(217,217,217,0.7)",
                      display: "inline-flex",
                      alignSelf: "flex-start",
                      gap: 4,
                      alignItems: "center",
                    }}
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                        style={{ width: 7, height: 7, borderRadius: "50%", background: "#555" }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════
          CHAT INPUT BAR — always visible
      ═══════════════════════════════════════════════ */}
      <style>{`.harmony-chat-input::placeholder { color: rgba(255,255,255,0.6); }`}</style>
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        style={{
          position: "absolute",
          left: 20,
          bottom: 20,
          right: 20,
          height: 60,
          borderRadius: 100,
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          display: "flex",
          alignItems: "center",
          padding: "0 8px 0 20px",
          gap: 8,
          boxShadow: "0 0 12px 0 rgba(255,255,255,0.5), inset 0 0 4px 0 rgba(255,255,255,0.3)",
          zIndex: 20,
        }}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Ask Harmony anything..."
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="harmony-chat-input"
          style={{
            background: "transparent",
            border: "none",
            outline: "none",
            color: "white",
            fontSize: 14,
            fontWeight: 600,
            fontFamily: "Raleway, sans-serif",
            flex: 1,
            minWidth: 0,
          }}
        />
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleSend}
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: chatInput.trim() ? "#4a90e2" : "rgba(74,144,226,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            border: "none",
            cursor: "pointer",
            boxShadow: "0 0 8px 2px rgba(74,144,226,0.45)",
            transition: "background 0.2s",
          }}
        >
          {chatInput.trim() ? <Send size={18} color="white" /> : <Mic size={20} color="white" />}
        </motion.button>
      </motion.div>
    </div>
  );
}
