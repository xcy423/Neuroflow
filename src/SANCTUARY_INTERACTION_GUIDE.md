# 🏞️ Sanctuary Interaction Flow Guide

## Overview
The Enhanced Sanctuary screen now features a **two-state design** that preserves the badge system and atmosphere controls while providing seamless access to the AI chatbot.

---

## 🎯 Default State (Sanctuary View)

### Visual Elements
- **Background**: Selectable atmosphere (Dawn, Day, Dusk, Night)
- **Mascot**: Harmony positioned at bottom-center with level badge
- **Speech Bubble**: Context-aware greeting based on completion level
- **Badges**: Wall-mounted achievement badges (4 total)
  - 🌱 First Step (1+ challenges)
  - ⚔️ Wellness Warrior (2+ challenges)
  - 🧠 Mind Master (5+ challenges)
  - 🏆 Zen Champion (10+ challenges)
- **Atmosphere Controls**: Bottom pill selector (Dawn/Day/Dusk/Night)
- **Unlock Info**: Progress card showing next badge requirement (if < 10 challenges)
- **Compact Input Bar**: Bottom of screen with placeholder text

### Layout Positions
```
┌─────────────────────────────┐
│  [Back]  Your Sanctuary     │
│                              │
│  [Unlock Info Card]          │
│                              │
│   🌱        ⚔️               │
│        [Harmony]             │
│  🧠         🏆               │
│                              │
│                              │
│  [Dawn|Day|Dusk|Night]       │
│  [Ask Harmony anything...]   │
└─────────────────────────────┘
```

### Compact Input Bar
- **Appearance**: White rounded rectangle with shadow
- **Placeholder**: "Ask Harmony anything... e.g., 'How can I reduce stress today?'"
- **Icon**: Microphone icon on right
- **Interaction**: Tap anywhere → Expands to Chat Mode

---

## 💬 Chat Mode (Expanded View)

### Trigger
User taps the compact input bar at the bottom

### Visual Transition
1. **Badges fade out** (0.3s opacity + scale animation)
2. **Atmosphere controls fade out** (0.3s)
3. **Mascot transforms**:
   - From: Bottom-center, large (120px)
   - To: Top-center, smaller (100px), floating animation
4. **Speech bubble disappears**
5. **Title disappears**
6. **Unlock info card fades out**
7. **Chat interface slides up** (0.4s spring animation)

### Chat Interface Layout
```
┌─────────────────────────────┐
│  [Back]                      │
│                              │
│       [Floating Harmony]     │
│        (animated float)      │
│                              │
│ ┌─────────────────────────┐ │
│ │ Harmony  ● Online  [↓]  │ │
│ ├─────────────────────────┤ │
│ │                         │ │
│ │  [Chat Messages]        │ │
│ │  • User (right, blue)   │ │
│ │  • Harmony (left, LB)   │ │
│ │  • Typing indicator     │ │
│ │                         │ │
│ ├─────────────────────────┤ │
│ │ [Listening preview]     │ │
│ │ [Input] [Mic] [Send]    │ │
│ └─────────────────────────┘ │
└─────────────────────────────┘
```

### Chat Header
- **Avatar**: Small gradient circle (H)
- **Name**: "Harmony"
- **Status**: "● Online" in green (#A8D5BA)
- **Minimize Button**: Down arrow icon → Returns to default state

### Chat Features
- **Message History**: Scrollable, auto-scroll to latest
- **User Messages**: Right-aligned, blue background (#4A90E2)
- **Harmony Messages**: Left-aligned, light blue background (#E8F4FD)
- **Suggestion Cards**: Embedded recommendations with 3D buttons
- **Typing Indicator**: Three pulsing dots while Harmony responds
- **Voice Transcript**: Preview box shows speech-to-text in real-time
- **Input Field**: Focused automatically when chat opens

---

## 🎙️ Voice Input Flow

### In Default State
Tap compact input bar → Opens chat mode → Can then use voice

### In Chat Mode
1. **Tap microphone icon** → Starts listening
2. **Listening state**:
   - Icon background turns orange (#F5A623)
   - Pulsing animation (scale 1→1.2→1, 1s loop)
   - Transcript preview appears above input
3. **Speaking**: Real-time transcription displays
4. **Pause detected** → Auto-sends message
5. **Manual send**: Tap mic again or tap send button

### Fallback
If Web Speech API unavailable:
- Alert: "Voice recognition not supported. Please type."
- Input remains available for text entry

---

## 🔄 Return to Default State

### Triggers
- **Tap minimize button** (down arrow in chat header)
- **Smooth reverse transition**:
  1. Chat interface slides down (0.4s)
  2. Mascot shrinks and moves to bottom-center
  3. Badges fade in (0.3s)
  4. Atmosphere controls fade in (0.3s)
  5. Title reappears
  6. Compact input bar appears

### State Preservation
- **Chat history**: Preserved (messages remain if chat reopened)
- **Atmosphere selection**: Maintained
- **Badge progress**: Real-time updates

---

## 🎨 Animation Specifications

### Default → Chat Mode
```javascript
Badges: opacity 1→0, scale 1→0.8, duration 0.3s
Atmosphere: opacity 1→0, y 0→20, duration 0.3s
Mascot: y bottom-25% → top-15%, scale 120px→100px, duration 0.4s spring
Chat: y 100% → 0, duration 0.4s spring (damping 25)
Title: opacity 1→0, duration 0.3s
```

### Chat Mode → Default
```javascript
Chat: y 0 → 100%, duration 0.4s spring
Mascot: y top-15% → bottom-25%, scale 100px→120px, duration 0.4s spring
Badges: opacity 0→1, scale 0.8→1, duration 0.3s
Atmosphere: opacity 0→1, y 20→0, duration 0.3s
Title: opacity 0→1, duration 0.3s
```

### Floating Harmony (Chat Mode Only)
```javascript
y: [0, -10, 0]
duration: 3s
repeat: Infinity
ease: easeInOut
```

---

## 🎯 Key Interaction Patterns

### Pattern 1: Quick Question
```
Default State → Tap input → Chat opens → Type/speak → Get response → Minimize
```

### Pattern 2: Extended Conversation
```
Default State → Tap input → Chat opens → Multiple exchanges → Suggested action → Tap suggestion button → Navigate to course/challenge
```

### Pattern 3: Badge Progress Check
```
Default State → View badges → Check unlock info → Tap input → Ask Harmony about progress → Get motivational response
```

### Pattern 4: Atmosphere Exploration
```
Default State → Change atmosphere (Dawn/Day/Dusk/Night) → Experience visual changes → Optionally chat with Harmony about mood
```

---

## 📱 Responsive Behavior

### iPhone SE (320px)
- Compact input text size: 13px
- Mascot size: 100px (default), 80px (chat)
- Badge size: 50px
- Chat height: 50% of screen

### iPhone 14 (390px)
- Compact input text size: 14px
- Mascot size: 120px (default), 100px (chat)
- Badge size: 60px
- Chat height: 55% of screen

### iPhone Pro Max (440px)
- Compact input text size: 14px
- Mascot size: 140px (default), 110px (chat)
- Badge size: 70px
- Chat height: 55% of screen

---

## ✨ User Experience Benefits

### Why Two States?

1. **Badge Visibility**: Users can see their achievements without entering chat
2. **Atmosphere Control**: Change mood/ambiance independently of chat
3. **Reduced Cognitive Load**: Clear separation between "explore" and "interact"
4. **Progressive Disclosure**: Chat features revealed only when needed
5. **Context Preservation**: Both views maintain user progress and state

### Design Principles

- **Glanceable**: Default state shows progress at a glance
- **Accessible**: One tap to engage with AI companion
- **Reversible**: Easy to return to sanctuary view
- **Delightful**: Smooth transitions create cohesive experience
- **Focused**: Chat mode eliminates distractions for conversation

---

## 🧪 Testing Scenarios

### Scenario 1: First-Time Visitor
- [ ] Sees "Beginner" level on mascot
- [ ] Only 1-2 badges unlocked (if any)
- [ ] Unlock info card visible
- [ ] Compact input prompts engagement

### Scenario 2: Advanced User
- [ ] "Advanced" or "Master" level displayed
- [ ] Multiple badges unlocked and visible
- [ ] Atmosphere reflects progress (brighter)
- [ ] Chat responses reference achievements

### Scenario 3: Voice Interaction
- [ ] Tap input → Chat opens
- [ ] Tap mic → Listening starts
- [ ] Speak → Transcript appears
- [ ] Pause → Message sends
- [ ] Response includes suggestion

### Scenario 4: State Transitions
- [ ] Default → Chat: Smooth animations
- [ ] Chat → Default: Elements restore correctly
- [ ] Badges reappear in correct positions
- [ ] Atmosphere selection maintained
- [ ] No visual glitches

---

## 🔧 Technical Implementation

### State Management
```typescript
isChatMode: boolean           // Controls view state
atmosphere: "dawn"|"day"|"dusk"|"night"  // Background selection
messages: Message[]           // Chat history
isListening: boolean          // Voice input state
voiceTranscript: string       // Real-time transcription
```

### Key Functions
- `setIsChatMode(true)`: Expand to chat
- `setIsChatMode(false)`: Return to default
- `handleSendMessage()`: Process user input
- `toggleVoiceInput()`: Start/stop listening
- `generateHarmonyResponse()`: AI logic

---

**Last Updated**: November 10, 2025  
**Version**: 2.0.0  
**Component**: `/components/EnhancedSanctuaryScreen.tsx`
