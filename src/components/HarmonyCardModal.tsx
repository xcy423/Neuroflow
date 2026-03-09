/**
 * HarmonyCardModal.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Full-screen modal presenting a personalised "Harmony Card" after a mood log.
 *
 * Structure
 * ─────────
 *  HarmonyCardModal          — portal entry point, overlay, close button
 *    └─ card scene wrapper   — entrance/exit slide + scale animation
 *        └─ FlipContainer    — 3-D Y-axis flip (preserve-3d)
 *            ├─ CardFront    — bear image, title, tags, description
 *            └─ CardBack     — micro-action text, CTA button
 *
 * Styling
 * ───────
 *  All type scales, colours and shadows follow the home screen design tokens
 *  (src/styles/tokens.ts) so the card feels native to the rest of the app.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { HARMONY_CARDS, type CardType, type HarmonyCard } from "../data/harmonyCards";
import { colors, shadows } from "../styles/tokens";

// ── Constants ─────────────────────────────────────────────────────────────────

/** Duration of the Y-axis card flip in milliseconds. */
const FLIP_MS = 650;

/** Cubic-bezier easeOutExpo for a buttery smooth flip. */
const FLIP_EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

interface CardFaceProps {
  card: HarmonyCard;
  onGotIt: (e: React.MouseEvent) => void;
}

// ── CardFront ─────────────────────────────────────────────────────────────────
/** Front face — bear image, title, tag pills, supportive description. */
function CardFront({ card }: Pick<CardFaceProps, "card">) {
  const [gradientStart, gradientEnd] = card.gradientColors;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        borderRadius: 28,
        overflow: "hidden",
        background: `linear-gradient(155deg, ${gradientStart} 0%, ${gradientEnd} 100%)`,
        boxShadow: "0 24px 60px rgba(0,0,0,0.32), 0 6px 16px rgba(0,0,0,0.16)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "28px 20px 22px",
      }}
    >
      {/* Bear character — upper ~55% of the card */}
      <div
        style={{
          flex: "1 1 0",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 0,
        }}
      >
        <img
          src={card.imageSrc}
          alt={card.title}
          draggable={false}
          style={{
            width: "68%",
            height: "100%",
            objectFit: "contain",
            filter: "drop-shadow(0 6px 16px rgba(0,0,0,0.14))",
            pointerEvents: "none",
            userSelect: "none",
          }}
        />
      </div>

      {/* Text block — lower ~45%, pinned by flexShrink:0 */}
      <div
        style={{
          flexShrink: 0,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        {/* Title — sans-serif to match home screen widget titles */}
        <h2
          style={{
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif",
            fontSize: 20,
            fontWeight: 700,
            color: colors.main,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            textAlign: "center",
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          {card.title}
        </h2>

        {/* Tag pills — style matches app chip elements */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, justifyContent: "center" }}>
          {card.tags.map((tag) => (
            <span
              key={tag}
              style={{
                background: "rgba(255,255,255,0.65)",
                border: "1px solid rgba(255,255,255,0.85)",
                borderRadius: 100,
                padding: "3px 10px",
                fontSize: 10,
                fontWeight: 600,
                color: colors.main,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Supportive description — cardDescription token (12px 500) */}
        <p
          style={{
            fontSize: 12,
            fontWeight: 500,
            color: colors.main,
            opacity: 0.7,
            textAlign: "center",
            lineHeight: 1.6,
            margin: 0,
            padding: "0 4px",
          }}
        >
          {card.frontDescription}
        </p>

        {/* Thin divider */}
        <div style={{ width: 28, height: 1, background: "rgba(44,62,80,0.15)", borderRadius: 1, marginTop: 2 }} />

        {/* Tap hint */}
        <p style={{ fontSize: 10, color: "rgba(44,62,80,0.4)", margin: 0, letterSpacing: "0.04em" }}>
          Tap to reveal your practice ›
        </p>
      </div>
    </div>
  );
}

// ── CardBack ──────────────────────────────────────────────────────────────────
/**
 * Back face — micro-action text and CTA button.
 * Pre-rotated 180° so it is hidden at 0° and forward-facing at 180°.
 */
function CardBack({ card, onGotIt }: CardFaceProps) {
  const [gradientStart, gradientEnd] = card.gradientColors;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: "rotateY(180deg)", // hidden at 0°, visible at 180°
        borderRadius: 28,
        overflow: "hidden",
        background: `linear-gradient(155deg, ${gradientEnd} 0%, ${gradientStart} 100%)`,
        boxShadow: "0 24px 60px rgba(0,0,0,0.32), 0 6px 16px rgba(0,0,0,0.16)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "28px 22px 24px",
      }}
    >
      {/* Header label */}
      <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <div style={{ width: 28, height: 2, background: "rgba(44,62,80,0.18)", borderRadius: 1 }} />
        <p style={{ fontSize: 10, fontWeight: 700, color: "rgba(44,62,80,0.45)", letterSpacing: "0.12em", textTransform: "uppercase", margin: 0 }}>
          Your practice
        </p>
      </div>

      {/* Action text — flex:1 centres it vertically in the available space */}
      <div style={{ flex: "1 1 0", display: "flex", alignItems: "center", justifyContent: "center", padding: "18px 2px", minHeight: 0 }}>
        <p
          style={{
            fontSize: "clamp(14px, 3.6vw, 17px)",
            fontWeight: 600,
            color: colors.main,
            textAlign: "center",
            lineHeight: 1.72,
            margin: 0,
          }}
        >
          {card.backActionText}
        </p>
      </div>

      {/* CTA + flip-back hint — flexShrink:0 pins to the bottom */}
      <div style={{ flexShrink: 0, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onGotIt}
          style={{
            width: "100%",
            padding: 14,
            borderRadius: 100,
            border: "none",
            background: colors.main,
            color: "white",
            fontSize: 15,
            fontWeight: 700,
            cursor: "pointer",
            letterSpacing: "0.01em",
            boxShadow: shadows.card,
          }}
        >
          {card.backButtonLabel}
        </motion.button>
        <p style={{ fontSize: 10, color: "rgba(44,62,80,0.38)", margin: 0, letterSpacing: "0.04em" }}>
          ‹ Tap card to flip back
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────

interface HarmonyCardModalProps {
  /** Controls visibility; drives AnimatePresence. */
  isOpen: boolean;
  /** Which of the 5 card configs to show. */
  cardType: CardType;
  /** Called once all exit animations finish. */
  onClose: () => void;
}

export default function HarmonyCardModal({ isOpen, cardType, onClose }: HarmonyCardModalProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Always start on the front face when a new card opens
  useEffect(() => {
    if (isOpen) setIsFlipped(false);
  }, [isOpen]);

  const card = HARMONY_CARDS[cardType];

  /**
   * If showing the back face, flip back to front first so the exit animation
   * always begins from the front — feels like physically closing a card.
   */
  const dismiss = useCallback(() => {
    if (isFlipped) {
      setIsFlipped(false);
      setTimeout(onClose, FLIP_MS - 60); // slight overlap keeps it fluid
    } else {
      onClose();
    }
  }, [isFlipped, onClose]);

  const handleGotIt = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation(); // don't also trigger the flip toggle on the parent
      dismiss();
    },
    [dismiss],
  );

  /**
   * Portal renders directly on document.body so the overlay is never trapped
   * inside a Framer Motion stacking context. The bottom nav and mascot are
   * therefore always underneath it, regardless of their z-index values.
   */
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        // ── Overlay — dim but not opaque so the home screen shows faintly ──
        <motion.div
          key="harmony-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          // Semi-dark overlay covers the full viewport (including areas outside
          // the 440px app container). The CSS filter on the app container adds
          // blur on top of this so everything behind is dim + soft.
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
          style={{ background: "rgba(0,0,0,0.52)" }}
        >
          {/* Close button — top-right corner, visible on dark overlay */}
          <motion.button
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.75 }}
            transition={{ delay: 0.28, duration: 0.2 }}
            whileTap={{ scale: 0.88 }}
            onClick={dismiss}
            aria-label="Close Harmony Card"
            className="absolute top-6 right-5"
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.18)",
              border: "1.5px solid rgba(255,255,255,0.55)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
              <path d="M1.5 1.5L13.5 13.5M13.5 1.5L1.5 13.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </motion.button>

          {/* Label above the card */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ delay: 0.18, duration: 0.25 }}
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.13em",
              textTransform: "uppercase",
              marginBottom: 18,
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            Your Harmony Card
          </motion.p>

          {/* Card scene — entrance/exit spring animation */}
          <motion.div
            key={`card-${cardType}`}
            initial={{ y: "52%", scale: 0.88, opacity: 0.4 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: "52%", scale: 0.88, opacity: 0 }}
            transition={{ type: "spring", damping: 22, stiffness: 270, mass: 0.9 }}
            onClick={() => setIsFlipped((f) => !f)}
            style={{
              width: "min(290px, 80vw)",
              aspectRatio: "2 / 3",
              maxHeight: "70vh",
              perspective: 1200, // perspective on the wrapper, not the rotating child
              cursor: "pointer",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {/* 3-D flip container */}
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: FLIP_MS / 1000, ease: FLIP_EASE }}
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
                transformStyle: "preserve-3d",
              }}
            >
              <CardFront card={card} />
              <CardBack card={card} onGotIt={handleGotIt} />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

