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
    title: "The Ground",
    gradientColors: ["#8FB8D8", "#D8C8A8"], // steel blue → warm sand
    imageSrc: bearAnchorImg,
    tags: ["Stability", "Calm", "Grounding"],
    frontDescription:
      "You're carrying a lot right now — pressure, noise, and weight from all directions. This is your invitation to stop, plant your feet, and remember you are still here.",
    backActionText:
      "Press both feet firmly into the floor. Feel the ground hold you. Take 3 slow breaths and name 3 things you can see right now. You don't have to solve everything today.",
    backButtonLabel: "I'm grounded",
  },

  // ── 2. The Drive ───────────────────────────────────────────────────────────
  // Triggered by: energized mood, study, personal wins, deep connection
  momentum: {
    id: "momentum",
    title: "The Drive",
    gradientColors: ["#F0B84A", "#C8E890"], // warm amber → fresh lime
    imageSrc: bearMomentumImg,
    tags: ["Progress", "Energy", "Flow"],
    frontDescription:
      "Something clicked. You're moving with purpose today — the wins are stacking and the feeling is real. Don't let this momentum go to waste.",
    backActionText:
      "Capture it: write down the one thing you accomplished today that actually mattered to you. Then name the single next step you want to keep this energy going. Go.",
    backButtonLabel: "Keeping the drive",
  },

  // ── 3. The Haven ───────────────────────────────────────────────────────────
  // Triggered by: low mood, drained, poor sleep, isolation, loneliness
  cocoon: {
    id: "cocoon",
    title: "The Haven",
    gradientColors: ["#A890D8", "#F0B8CC"], // soft violet → blush rose
    imageSrc: bearCocoonImg,
    tags: ["Rest", "Comfort", "Renewal"],
    frontDescription:
      "Your body and mind are asking for one thing right now: a safe place to land. You don't need to push through today. Rest is the most honest thing you can give yourself.",
    backActionText:
      "Find a cozy corner, wrap yourself in something soft, and let yourself do absolutely nothing for 10 minutes. No screen, no task, no output. Just warmth and your own breath.",
    backButtonLabel: "Taking shelter",
  },

  // ── 4. The Exhale ──────────────────────────────────────────────────────────
  // Triggered by: frustration, conflict, meetings, client feedback, low energy
  release: {
    id: "release",
    title: "The Exhale",
    gradientColors: ["#78C8C0", "#F8C4A0"], // teal → warm peach
    imageSrc: bearReleaseImg,
    tags: ["Tension Release", "Breathwork", "Let Go"],
    frontDescription:
      "You've been bracing against something — friction, frustration, or just too many things happening at once. Before you do anything else, you need to breathe it out.",
    backActionText:
      "Raise your arms above your head like you're reaching for the sky. Then let them drop. Exhale hard through your mouth — three full times. With every exhale, something leaves. Let it.",
    backButtonLabel: "I exhaled",
  },

  // ── 5. The Flicker ─────────────────────────────────────────────────────────
  // Triggered by: default / boredom / curiosity / undefined state
  spark: {
    id: "spark",
    title: "The Flicker",
    gradientColors: ["#90D8B8", "#A8C8F4"], // seafoam → periwinkle blue
    imageSrc: bearSparkImg,
    tags: ["Curiosity", "Intuition", "Wonder"],
    frontDescription:
      "You're in an open space today — not weighed down, not flying high. Something small is flickering at the edge of your attention. Follow it. It knows something you don't yet.",
    backActionText:
      "Pick up the one thing you've been curious about but haven't tried yet. Spend just 5 minutes exploring it — a search, a sketch, a song, a walk. Let curiosity lead without expecting a destination.",
    backButtonLabel: "Following the flicker",
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
