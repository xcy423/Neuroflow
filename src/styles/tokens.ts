// ─── NeuroFlow Design System Tokens ───────────────────────────────────────────
// Single source of truth for all spacing, sizing, and shadow values.
// Import and use these instead of hard-coding values in components.

export const spacing = {
  // Page-level layout
  pageTop: 60,          // px — top padding for every screen
  pageLeft: 32,         // px — left padding for every screen
  pageRight: 32,        // px — right padding for every screen
  pageBottom: 32,       // px — bottom padding for every screen

  // Card list
  cardGap: 20,          // px — vertical gap between cards in a list

  // Card internals
  cardPadding: 16,      // px — internal padding inside each card
  cardRadius: 16,       // px — border-radius for cards
  cardIconSize: 38,     // px — min-width of the icon thumbnail inside a card

  // Inline element spacing
  gapXS: 2,            // px
  gapSM: 4,            // px
  gapMD: 8,            // px
  gapLG: 12,           // px
  gapXL: 16,           // px
} as const;

// Inline style helpers (use these in style={{}} props)
export const pageLayout = {
  paddingLeft: spacing.pageLeft,
  paddingRight: spacing.pageRight,
} as const;

export const shadows = {
  card: "0px 0px 2px 0px white, 0px 0px 12px 0px rgba(44,62,80,0.12)",
  cardInner: "inset 0px 0px 4px 0px rgba(44,62,80,0.24)",
  tabActive: "0px 2px 4px rgba(0,0,0,0.08)",
} as const;

export const colors = {
  bg: "#fcfcfc",
  offWhite: "#ecf0f1",
  lighterGray: "#e2e6e7",
  main: "#2c3e50",
  blue: "#4a90e2",
  green: "#a8d5ba",
  orange: "#f5a623",
  muted: "#80646f",
} as const;

export const typography = {
  cardTitle: { fontSize: 16, fontWeight: 700 },
  cardCategory: { fontSize: 14, fontWeight: 600 },
  cardMeta: { fontSize: 14, fontWeight: 500 },
  cardTimestamp: { fontSize: 12, fontWeight: 700 },
  cardDescription: { fontSize: 12, fontWeight: 500 },
} as const;
