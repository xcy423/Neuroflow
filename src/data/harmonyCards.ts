/**
 * harmonyCards.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * MOCK DATA for the 5 Harmony Card types that appear after a mood log.
 *
 * Each card contains all content needed for both the Front face and Back face
 * of the 3D flip card UI.
 *
 * Bear image assignments (swap out via imageSrc if you get new Figma exports):
 *   anchor   → meditating bear on cushion
 *   momentum → bear reading a book
 *   cocoon   → bear wrapped in blanket (drained/resting pose)
 *   release  → bear arms raised high (crushing-it/releasing pose)
 *   spark    → energized/curious bear
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ── Bear character images ─────────────────────────────────────────────────────
// These resolve from the Figma asset hashes bundled in /src/assets/
// The two "card-exclusive" hashes (f737671, 95c42c7) are the new poses
// supplied as attachments; update the path if the file hash ever changes.

import bearAnchorImg    from "../assets/f737671982c10b6c31a2ae6a892f5a8283a19e9a.png"; // meditating on cushion
import bearMomentumImg  from "../assets/95c42c7e0690d226fa0fba3f3608cd43fa7da972.png"; // reading a book
import bearCocoonImg    from "../assets/71d2e20f8f76af16ab89c71d15e53ecbbc180be0.png"; // drained → resting/blanket
import bearReleaseImg   from "../assets/000885b7c4e9d58a4aae5da67f617c7a43aa4705.png"; // arms raised / crushing it
import bearSparkImg     from "../assets/505ee940af5e200221c143f10602c6167666e596.png"; // energized / curious

// ── Types ────────────────────────────────────────────────────────────────────

export type CardType = "anchor" | "momentum" | "cocoon" | "release" | "spark";

export interface HarmonyCard {
  id: CardType;
  /** Bold uppercase title shown on front face */
  title: string;
  /** Two-stop gradient: [topColor, bottomColor] used as the card background */
  gradientColors: [string, string];
  /** Path to the 2D bear character image centred on the card front */
  imageSrc: string;
  /** Small pill labels shown below the title on the front face */
  tags: string[];
  /** Supportive 1–2 sentence copy on the front face */
  frontDescription: string;
  /** Concrete micro-action shown in large text on the back face */
  backActionText: string;
  /** Label for the primary CTA button on the back face */
  backButtonLabel: string;
}

// ── Card Definitions ─────────────────────────────────────────────────────────

export const HARMONY_CARDS: Record<CardType, HarmonyCard> = {
  // ── 1. The Anchor ──────────────────────────────────────────────────────────
  // Triggered by: high stress, overwhelm, financial pressure, context-switching
  anchor: {
    id: "anchor",
    title: "The Anchor",
    gradientColors: ["#B8D4E8", "#F5F0C8"], // light blue → pale yellow
    imageSrc: bearAnchorImg,
    tags: ["Stability", "Calm", "Grounding"],
    frontDescription:
      "When everything feels like it's shifting, it's time to find your footing. You are more rooted than you think.",
    backActionText:
      "Press both feet firmly into the floor. Feel the ground hold you. Take 3 slow breaths and name 3 things you can see right now.",
    backButtonLabel: "I'm grounded",
  },

  // ── 2. The Momentum ────────────────────────────────────────────────────────
  // Triggered by: energized mood, study, personal wins, deep connection
  momentum: {
    id: "momentum",
    title: "The Momentum",
    gradientColors: ["#A8D8B0", "#F5F0C8"], // mint green → pale yellow
    imageSrc: bearMomentumImg,
    tags: ["Progress", "Growth", "Focus"],
    frontDescription:
      "You're in a powerful rhythm. Every small step you take is compounding into something remarkable. Keep moving.",
    backActionText:
      "Write down the one next tiny step toward your goal — not the whole staircase, just the next step. Then take it within the next 5 minutes.",
    backButtonLabel: "Let's go",
  },

  // ── 3. The Cocoon ──────────────────────────────────────────────────────────
  // Triggered by: low mood, drained, poor sleep, isolation, loneliness
  cocoon: {
    id: "cocoon",
    title: "The Cocoon",
    gradientColors: ["#C8B8E8", "#F4C8D0"], // lavender → pale pink
    imageSrc: bearCocoonImg,
    tags: ["Rest", "Comfort", "Quiet"],
    frontDescription:
      "Rest isn't retreat — it's the quiet courage to let yourself recharge. Something beautiful is taking shape inside this stillness.",
    backActionText:
      "Find a cozy corner, wrap yourself in something soft, and let yourself do absolutely nothing for 10 minutes. No screen, no task. Just warmth.",
    backButtonLabel: "Rest now",
  },

  // ── 4. The Release ─────────────────────────────────────────────────────────
  // Triggered by: frustration, conflict, meetings, client feedback, low energy
  release: {
    id: "release",
    title: "The Release",
    gradientColors: ["#A8D4D0", "#F8D8B8"], // light teal → pale orange
    imageSrc: bearReleaseImg,
    tags: ["Stress Relief", "Mindfulness", "Breathwork"],
    frontDescription:
      "A moment to breathe, let go, and find lightness. Take this time to stretch, exhale tension, and connect with your calm within.",
    backActionText:
      "Raise your arms above your head like you're reaching for the sky. Then let them drop. Exhale hard through your mouth — three times. Feel that tension leave.",
    backButtonLabel: "Releasing now",
  },

  // ── 5. The Spark ───────────────────────────────────────────────────────────
  // Triggered by: default / boredom / curiosity / undefined state
  spark: {
    id: "spark",
    title: "The Spark",
    gradientColors: ["#C0E8B8", "#F5F0C8"], // light green → pale yellow
    imageSrc: bearSparkImg,
    tags: ["Intuition", "Curiosity"],
    frontDescription:
      "Something in you is searching for a new signal. Follow that quiet pull — it's your intuition lighting the way toward something fresh.",
    backActionText:
      "Pick up the one thing you've been curious about but haven't tried yet. Spend just 5 minutes exploring it — a search, a sketch, a song. Let curiosity lead.",
    backButtonLabel: "I'm curious",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// MOCK LOGIC
// Determines which card to show based on mood + driver inputs.
// In production, replace this function body with a real LLM/rules API call.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * A dummy state variable that demonstrates how the UI changes per card type.
 * Override this constant directly in development to preview any card design.
 *
 * @example
 *   // In dev: change to "cocoon" | "anchor" | "momentum" | "spark" | "release"
 *   export const DEMO_CARD_OVERRIDE: CardType | null = "cocoon";
 */
export const DEMO_CARD_OVERRIDE: CardType | null = null;

/**
 * handleSubmitMoodLog
 * ─────────────────────────────────────────────────────────────────────────────
 * Mock function that maps a mood log submission to one of the 5 card types.
 * Uses simple keyword matching — no ML or backend required for the demo.
 *
 * @param mood     - The energy level id (crushing | energized | balanced | low | drained)
 * @param drivers  - Array of selected driver labels / sub-option labels
 * @param note     - Optional free-text journal note
 * @returns        - The CardType to display
 */
export function handleSubmitMoodLog(
  mood: string,
  drivers: string[] = [],
  note: string = "",
): CardType {
  // Allow a hard-coded override for demo/design previews
  if (DEMO_CARD_OVERRIDE !== null) return DEMO_CARD_OVERRIDE;

  // Build one lowercase string to pattern-match against
  const combined = [mood, ...drivers, note].join(" ").toLowerCase();

  // ── High stress / overwhelm → The Anchor ────────────────────────────────
  if (
    combined.includes("deadline") ||
    combined.includes("overwhelm") ||
    combined.includes("stress") ||
    combined.includes("context-switching") ||
    combined.includes("financial")
  ) {
    return "anchor";
  }

  // ── Energized / study / progress / wins → The Momentum ──────────────────
  if (
    mood === "crushing" ||
    mood === "energized" ||
    combined.includes("workout") ||
    combined.includes("personal win") ||
    combined.includes("deep connection") ||
    combined.includes("focus")
  ) {
    return "momentum";
  }

  // ── Low mood / exhaustion → The Cocoon ──────────────────────────────────
  if (
    mood === "drained" ||
    combined.includes("poor sleep") ||
    combined.includes("insomnia") ||
    combined.includes("bad sleep") ||
    combined.includes("skipped meal") ||
    combined.includes("isolation") ||
    combined.includes("loneliness")
  ) {
    return "cocoon";
  }

  // ── Frustration / conflict / stuck → The Release ─────────────────────────
  if (
    mood === "low" ||
    combined.includes("conflict") ||
    combined.includes("client feedback") ||
    combined.includes("meetings") ||
    combined.includes("too much caffeine")
  ) {
    return "release";
  }

  // ── Default (boredom / curiosity / balanced) → The Spark ─────────────────
  return "spark";
}
