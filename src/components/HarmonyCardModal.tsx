/**
 * HarmonyCardModal.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Full-screen modal that presents a personalised Tarot-style "Harmony Card"
 * after the user submits a Mood Log.
 *
 * Animation sequence:
 *   Entrance  → overlay fades in; card slides up from bottom + scales 0.9 → 1.0
 *               with a spring/bounce for a magical, grounded feel.
 *   Flip      → tap anywhere on the card to rotate 180° along the Y-axis.
 *               Front face hides, back face reveals (backface-visibility: hidden).
 *   Exit      → "Got it" button (or X icon) flips card back to front (if needed),
 *               then card scales to 0.9 + slides down, overlay fades out.
 *
 * Dependencies: framer-motion (already in project as "motion/react")
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HARMONY_CARDS, type CardType } from "../data/harmonyCards";

// ── Duration constants ────────────────────────────────────────────────────────
/** How long the Y-axis flip takes (ms). Must match the transition duration below. */
const FLIP_DURATION_MS = 700;

// ── Props ─────────────────────────────────────────────────────────────────────
interface HarmonyCardModalProps {
  /** Whether the modal is currently visible. Drives AnimatePresence. */
  isOpen: boolean;
  /** Which of the 5 card configurations to display. */
  cardType: CardType;
  /** Called when the user dismisses the modal (after all exit animations). */
  onClose: () => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export default function HarmonyCardModal({
  isOpen,
  cardType,
  onClose,
}: HarmonyCardModalProps) {
  // Tracks whether the card is showing its back face
  const [isFlipped, setIsFlipped] = useState(false);

  // Reset to front face whenever a new card opens (in case of rapid re-open)
  useEffect(() => {
    if (isOpen) setIsFlipped(false);
  }, [isOpen]);

  const card = HARMONY_CARDS[cardType];

  // ── Exit handlers ────────────────────────────────────────────────────────
  /**
   * Flip the card back to front first (if currently showing the back),
   * then call onClose after the flip animation completes so the exit slide
   * starts from the front face — giving a satisfying "close the card" feel.
   */
  const dismiss = useCallback(() => {
    if (isFlipped) {
      setIsFlipped(false);
      setTimeout(onClose, FLIP_DURATION_MS - 50); // tiny overlap feels smoother
    } else {
      onClose();
    }
  }, [isFlipped, onClose]);

  // Stop propagation so clicking the "Got it" button doesn't also flip the card
  const handleGotItClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      dismiss();
    },
    [dismiss],
  );

  const [gradientStart, gradientEnd] = card.gradientColors;

  return (
    /**
     * AnimatePresence watches isOpen; when it becomes false it plays the
     * exit variants on every child keyed inside, then unmounts them.
     */
    <AnimatePresence>
      {isOpen && (
        // ── Overlay ────────────────────────────────────────────────────────
        <motion.div
          key="harmony-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          // Sit above MoodInputModal (z-50) but below any alerts
          className="fixed inset-0 z-[60] flex items-center justify-center"
          style={{
            background: "rgba(18, 20, 28, 0.78)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        >
          {/* ── Close button (top-right X) ──────────────────────────────── */}
          <motion.button
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ delay: 0.35, duration: 0.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={dismiss}
            aria-label="Close Harmony Card"
            className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.22)" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M1 1L13 13M13 1L1 13" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </motion.button>

          {/* ── Subtitle above card ──────────────────────────────────────── */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.25, duration: 0.3 }}
            className="absolute"
            style={{
              top: "clamp(64px, 12vh, 100px)",
              fontSize: "12px",
              color: "rgba(255,255,255,0.55)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontWeight: 600,
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            Your Harmony Card
          </motion.p>

          {/* ── Card wrapper — entrance / exit slide + scale ─────────────── */}
          <motion.div
            key={`card-${cardType}`}
            initial={{ y: "55%", scale: 0.88, opacity: 0.5 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: "55%", scale: 0.88, opacity: 0 }}
            transition={{
              // Spring gives the magical bounce on entry and a snappy exit
              type: "spring",
              damping: 20,
              stiffness: 260,
              mass: 0.95,
            }}
            onClick={() => setIsFlipped((f) => !f)}
            style={{
              // 2 : 3 aspect ratio card, constrained so it fits all screen sizes
              width: "min(300px, 82vw)",
              aspectRatio: "2 / 3",
              maxHeight: "72vh",
              // The perspective must wrap the rotating element, not be on it
              perspective: "1200px",
              cursor: "pointer",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {/* ── 3-D flip container ─────────────────────────────────────── */}
            {/*
             * rotateY drives the flip.
             * transformStyle: "preserve-3d" ensures children render in 3-D space.
             * Both faces use backfaceVisibility: "hidden" so only the correct
             * face is visible at each point in the rotation.
             */}
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{
                duration: FLIP_DURATION_MS / 1000,
                ease: [0.23, 1, 0.32, 1], // easeOutExpo — buttery smooth flip
              }}
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
                transformStyle: "preserve-3d",
              }}
            >
              {/* ════════════════════════════════════════════════════════════
                  FRONT FACE
              ════════════════════════════════════════════════════════════ */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  // Hide when rotated past 90° so this face disappears cleanly
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  borderRadius: "28px",
                  overflow: "hidden",
                  background: `linear-gradient(155deg, ${gradientStart} 0%, ${gradientEnd} 100%)`,
                  boxShadow: "0 28px 64px rgba(0,0,0,0.45), 0 8px 18px rgba(0,0,0,0.22)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "28px 22px 24px",
                }}
              >
                {/* Bear image — occupies the upper ~55% of the card */}
                <div
                  style={{
                    flex: "1 1 0",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: 0, // allow flex child to shrink
                  }}
                >
                  <img
                    src={card.imageSrc}
                    alt={`${card.title} bear`}
                    draggable={false}
                    style={{
                      width: "72%",
                      height: "100%",
                      objectFit: "contain",
                      filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.18))",
                      pointerEvents: "none",
                      userSelect: "none",
                    }}
                  />
                </div>

                {/* ── Text content area ──────────────────────────────────── */}
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "10px",
                    flexShrink: 0,
                  }}
                >
                  {/* Bold uppercase title */}
                  <h2
                    style={{
                      fontFamily: "'Georgia', 'Times New Roman', serif",
                      fontSize: "clamp(20px, 5vw, 26px)",
                      fontWeight: 800,
                      color: "#2c3e50",
                      letterSpacing: "0.07em",
                      textTransform: "uppercase",
                      textAlign: "center",
                      margin: 0,
                      lineHeight: 1.15,
                    }}
                  >
                    {card.title}
                  </h2>

                  {/* Tag pills row */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "6px",
                      justifyContent: "center",
                    }}
                  >
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          background: "rgba(255,255,255,0.58)",
                          backdropFilter: "blur(4px)",
                          WebkitBackdropFilter: "blur(4px)",
                          border: "1px solid rgba(255,255,255,0.75)",
                          borderRadius: "100px",
                          padding: "3px 10px",
                          fontSize: "10px",
                          fontWeight: 700,
                          color: "#2c3e50",
                          letterSpacing: "0.055em",
                          textTransform: "uppercase",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Supportive front description */}
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#3d5166",
                      textAlign: "center",
                      lineHeight: 1.6,
                      margin: 0,
                      padding: "0 4px",
                    }}
                  >
                    {card.frontDescription}
                  </p>

                  {/* Divider */}
                  <div style={{ width: "32px", height: "1px", background: "rgba(44,62,80,0.18)", borderRadius: "1px" }} />

                  {/* Roman numeral + app name — matches the design mockup */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                    <p style={{ fontSize: "13px", fontWeight: 700, color: "rgba(44,62,80,0.4)", margin: 0, letterSpacing: "0.05em" }}>
                      IX
                    </p>
                    <p style={{ fontSize: "9px", color: "rgba(44,62,80,0.35)", margin: 0, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                      Mindfulness Journey App
                    </p>
                  </div>

                  {/* Tap-to-flip hint */}
                  <p style={{ fontSize: "10px", color: "rgba(44,62,80,0.38)", margin: "2px 0 0", letterSpacing: "0.04em" }}>
                    Tap card to reveal your practice ›
                  </p>
                </div>
              </div>

              {/* ════════════════════════════════════════════════════════════
                  BACK FACE
                  The pre-rotated transform (rotateY 180deg) means when the
                  parent reaches 180deg the text reads correctly — NOT mirrored.
              ════════════════════════════════════════════════════════════ */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  // Pre-rotate so this face is hidden when parent is at 0° and
                  // faces forward when parent reaches 180°
                  transform: "rotateY(180deg)",
                  borderRadius: "28px",
                  overflow: "hidden",
                  // Reverse the gradient on the back for visual variety
                  background: `linear-gradient(155deg, ${gradientEnd} 0%, ${gradientStart} 100%)`,
                  boxShadow: "0 28px 64px rgba(0,0,0,0.45), 0 8px 18px rgba(0,0,0,0.22)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "32px 26px 28px",
                }}
              >
                {/* Header ornament */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "28px", height: "2px", background: "rgba(44,62,80,0.2)", borderRadius: "1px" }} />
                  <p
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "rgba(44,62,80,0.42)",
                      letterSpacing: "0.13em",
                      textTransform: "uppercase",
                      margin: 0,
                    }}
                  >
                    Your practice
                  </p>
                </div>

                {/* Action text — large, highly readable, centred */}
                <div
                  style={{
                    flex: "1 1 0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px 4px",
                    minHeight: 0,
                  }}
                >
                  <p
                    style={{
                      fontSize: "clamp(14px, 3.8vw, 17px)",
                      fontWeight: 600,
                      color: "#2c3e50",
                      textAlign: "center",
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {card.backActionText}
                  </p>
                </div>

                {/* Bottom controls */}
                <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                  {/* Primary CTA */}
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={handleGotItClick}
                    style={{
                      width: "100%",
                      padding: "15px",
                      borderRadius: "100px",
                      border: "none",
                      background: "#2c3e50",
                      color: "white",
                      fontSize: "15px",
                      fontWeight: 700,
                      cursor: "pointer",
                      letterSpacing: "0.01em",
                      boxShadow: "0 4px 16px rgba(44,62,80,0.28)",
                    }}
                  >
                    {card.backButtonLabel}
                  </motion.button>

                  {/* Flip-back hint */}
                  <p style={{ fontSize: "10px", color: "rgba(44,62,80,0.38)", margin: 0, letterSpacing: "0.04em" }}>
                    ‹ Tap card to flip back
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
