import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Send, X } from "lucide-react";

interface HarmonyBubbleProps {
  onSend: (text: string) => void;
}

export default function HarmonyBubble({ onSend }: HarmonyBubbleProps) {
  const [expanded, setExpanded] = useState(false);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleExpand = () => {
    setExpanded(true);
    setTimeout(() => inputRef.current?.focus(), 80);
  };

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    setExpanded(false);
    onSend(text);
  };

  const handleCollapse = () => {
    setExpanded(false);
    setInput("");
  };

  return (
    /* Outer wrapper: full-width, zero-height anchor — doesn't block taps */
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 82,
        height: 52,
        zIndex: 45,
        pointerEvents: "none",
      }}
    >
      <style>{`.harmony-bubble-input::placeholder { color: rgba(100,100,120,0.55); }`}</style>

      <AnimatePresence mode="wait">
        {!expanded ? (
          /* ── Collapsed pill ── */
          <motion.button
            key="pill"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0, x: 10 }}
            transition={{ type: "spring", stiffness: 340, damping: 26 }}
            onClick={handleExpand}
            style={{
              pointerEvents: "auto",
              position: "absolute",
              right: 16,
              bottom: 0,
              height: 46,
              borderRadius: 100,
              background: "linear-gradient(135deg, #4a90e2 0%, #7b6ff0 100%)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 7,
              padding: "0 18px 0 14px",
              boxShadow:
                "0 4px 18px rgba(74,144,226,0.5), 0 2px 8px rgba(0,0,0,0.12)",
            }}
          >
            <Sparkles size={15} color="white" />
            <span
              style={{
                color: "white",
                fontSize: 13,
                fontWeight: 700,
                fontFamily: "Raleway, sans-serif",
                letterSpacing: 0.2,
                whiteSpace: "nowrap",
              }}
            >
              Ask Harmony
            </span>
          </motion.button>
        ) : (
          /* ── Expanded input bar ── */
          <motion.div
            key="input"
            initial={{ scaleX: 0.45, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ scaleX: 0.45, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            style={{
              pointerEvents: "auto",
              position: "absolute",
              left: 16,
              right: 16,
              bottom: 0,
              height: 52,
              borderRadius: 100,
              background: "rgba(255,255,255,0.97)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              display: "flex",
              alignItems: "center",
              padding: "0 8px 0 18px",
              gap: 8,
              transformOrigin: "right center",
              boxShadow:
                "0 4px 24px rgba(74,144,226,0.28), 0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <Sparkles size={15} color="#4a90e2" style={{ flexShrink: 0 }} />
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask Harmony anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
                if (e.key === "Escape") handleCollapse();
              }}
              className="harmony-bubble-input"
              style={{
                flex: 1,
                minWidth: 0,
                background: "transparent",
                border: "none",
                outline: "none",
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "Raleway, sans-serif",
                color: "#1a1a1a",
              }}
            />
            <AnimatePresence mode="wait">
              {input.trim() ? (
                <motion.button
                  key="send"
                  initial={{ scale: 0.7 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.7 }}
                  whileTap={{ scale: 0.88 }}
                  onClick={handleSend}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "#4a90e2",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "0 2px 8px rgba(74,144,226,0.5)",
                  }}
                >
                  <Send size={15} color="white" />
                </motion.button>
              ) : (
                <motion.button
                  key="close"
                  initial={{ scale: 0.7 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.7 }}
                  whileTap={{ scale: 0.88 }}
                  onClick={handleCollapse}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "#f0f0f4",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <X size={16} color="#888" />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
