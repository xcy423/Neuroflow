# 🎯 Emotionally Intelligent Wellness Platform - Interactive Prototype Guide

## 📱 Overview
A comprehensive mobile wellness app prototype for Hong Kong's urban professionals (aged 20-40) featuring AI-driven mental and physical health support with Harmony, an intelligent wellness companion.

---

## 🎨 Design System

### Color Palette
- **Soft Blue**: `#4A90E2` - Primary buttons, headers, progress indicators
- **Mint Green**: `#A8D5BA` - Secondary accents, progress fills, success states
- **Light Blue**: `#E8F4FD` - Backgrounds, input fields, hover states
- **Orange**: `#F5A623` - Energy indicators, warnings, attention elements
- **Purple**: `#9B7FDB` - Mascot gradient accent

### Typography
- **Font Family**: Inter (system fallback: sans-serif)
- **Font Sizes**: Managed via globals.css (DO NOT override with Tailwind classes)

### Device Specs
- **Target Device**: iPhone 14
- **Dimensions**: 390x844px
- **Responsive Range**: iPhone SE (320px) to iPhone Pro Max (440px)

---

## 🌟 Key Features & Interactions

### 1. 🏞️ Enhanced Sanctuary Room

#### Access
- **Trigger**: Tap floating Harmony mascot (bottom-right, sticky across all screens)
- **Animation**: Full-screen fade-in transition

#### Evolving Atmosphere
The sanctuary background evolves based on user's wellness score:

| Wellness Score | Atmosphere | Visual Characteristics |
|---------------|-----------|----------------------|
| 0-39 | Dawn | Dark gradients, minimal plants (0), low light (30%) |
| 40-59 | Emerging | Blue-gray gradients, 2 plants, moderate light (50%) |
| 60-79 | Growing | Sky blue gradients, 4 plants, bright light (80%) |
| 80-100 | Blooming | Golden-blue gradients, 6 plants, full light (100%) |

#### Visual Elements
- **Floating Harmony**: Center-top position with gentle floating animation (3s loop)
- **Decorative Plants**: 🌿 emoji positioned progressively from left to right
- **Floor Gradient**: Semi-transparent green gradient at bottom 40%
- **Glow Effect**: Radial blur around Harmony for ethereal feel

#### Controls
- **Close Button**: Top-left, rounded white button with back arrow
- **Voice Mode Toggle**: Top-right, toggles hands-free interaction

---

### 2. 💬 AI Chatbot Interface

#### Layout
- **Position**: Bottom 50% of screen, rounded top corners (24px)
- **Background**: White with 95% opacity, backdrop blur effect
- **Components**:
  - Chat history (scrollable)
  - Voice transcript preview (conditional)
  - Input area (persistent at bottom)

#### Chat Messages
##### User Messages
- **Alignment**: Right-aligned
- **Background**: `#4A90E2` (Soft Blue)
- **Text Color**: White
- **Border Radius**: 16px with bottom-right corner at 4px

##### Harmony Responses
- **Alignment**: Left-aligned
- **Background**: `#E8F4FD` (Light Blue)
- **Text Color**: `#2c3e50`
- **Border Radius**: 16px with bottom-left corner at 4px

#### AI Response Logic
Harmony provides contextual responses based on keywords:

| User Query Keywords | Response Type | Suggested Action |
|-------------------|--------------|-----------------|
| "stress", "anxious", "anxiety" | Breathing exercises recommendation | → Meditation basics course |
| "sleep", "tired" | Sleep quality improvement | → Sleep Meditation course |
| "energy", "workout" | Energy boost suggestion | → Morning Energy Boost challenge |
| "challenge" | Challenge progress update | → 7-Day Mindfulness challenge |
| "progress", "score" | Wellness score feedback | No action (motivational only) |
| "thanks", "thank you" | Gratitude acknowledgment | No action |
| Default | General assistance offer | No action |

#### Suggestion Cards
When Harmony suggests a course/challenge, displays:
- **Icon**: 📚 (courses) or 🎯 (challenges)
- **Title**: Course/Challenge name
- **Action Button**: "Start Course" or "Join Challenge" with 3D shadow effect

#### Typing Indicator
- **Animation**: Three dots pulsing sequentially
- **Color**: `#4A90E2`
- **Timing**: 0.6s duration, staggered by 0.2s

---

### 3. 🎙️ Voice Input System

#### Activation
- **Button**: Microphone icon, circular (44px), positioned between input and send
- **States**:
  - **Inactive**: White background, blue icon
  - **Active (Listening)**: Orange background (`#F5A623`), white icon with pulse animation

#### Speech Recognition Flow
1. **Tap Mic** → Starts listening
2. **Listening State** → Microphone pulses (1s loop, scale 1-1.2)
3. **Transcript Preview** → Shows real-time transcription in blue box above input
4. **Auto-Send** → On speech pause (final result) OR manual tap
5. **Error Handling** → Fallback alert: "Voice recognition not supported. Please type."

#### Voice Mode Toggle
- **Location**: Top-right of sanctuary
- **Behavior**: Enables hands-free interaction (future enhancement)
- **Visual**: Blue when active, white/transparent when inactive

#### Browser Compatibility
- **Supported**: Chrome, Edge (WebKit Speech Recognition API)
- **Fallback**: Alert message directing to text input

---

### 4. 👆 Tap-to-Reveal Button Interaction

#### Flow
1. **Initial State**: Course/Challenge card shows NO button
2. **First Tap**: Card receives haptic feedback (10ms vibration)
3. **Button Reveal**: Fade-in animation (0.2s), button appears with 3D shadow
4. **Card Elevation**: Shadow increases from subtle to prominent
5. **Timer Start**: 3-second countdown begins
6. **Second Tap** (on button): Haptic feedback (20ms), navigate to session detail
7. **Auto-Fade**: If no second tap, button fades out after 3 seconds

#### 3D Button Effect
```css
/* Normal State */
background: #4a90e2
border-radius: 8px
shadow: 0px 4px 0px 0px #477baf

/* Pressed State */
transform: translateY(2px)
shadow: 0px 2px 0px 0px #477baf
```

#### Visual Affordance
- **Inactive Card**: Subtle inset shadow
- **Active Card**: Elevated shadow with blue tint (0.25 opacity)
- **Hover**: Scale 1.01 (desktop/tablet)
- **Tap**: Scale 0.99

---

### 5. 📲 Session Detail Screens

#### Course Session Screen
**Components**:
- **Header**: Back button + Course title
- **Progress Card**: 
  - Session number (e.g., "2 / 8")
  - Circular progress indicator
  - Progress bar with gradient fill
- **Guidelines Section**: 
  - Numbered list (animated entrance, staggered by 0.1s)
  - Blue circular badges for numbers
- **Timer Display**: 
  - Large circular container with play icon
  - Duration text (e.g., "10 min")
- **Action Button**: "Start Session" with gradient background

#### Challenge Detail Screen
**Components**:
- **Header**: Back button + Challenge title
- **Progress Card**: 
  - Day counter (e.g., "Day 4 / 7")
  - Circular progress indicator
  - Progress bar with gradient fill
- **Today's Tasks Section**:
  - Interactive checklist items
  - Light blue background on each item
  - Empty circles (ready to check off)
- **Stats Grid**:
  - Current Streak (flame icon)
  - Days Completed (checkmark icon)
- **Community Preview**: Avatar circles + participant count
- **Action Button**: "Complete Today's Tasks" with gradient background

---

## 🔄 Complete User Flows

### Flow 1: Sanctuary Chat Interaction
```
Home Screen
  ↓ [Tap Harmony mascot]
Sanctuary Opens (full-screen)
  ↓ [Type or speak query]
Harmony Responds
  ↓ [If suggestion included]
Course/Challenge Suggestion Card
  ↓ [Tap action button]
Navigate to Session Detail
  ↓ [Tap "Start Session"]
Activity begins
```

### Flow 2: Course Discovery & Enrollment
```
Courses Tab
  ↓ [Tap course card]
Button Reveals (3-second timer starts)
  ↓ [Tap "Continue Course" or "Join Now"]
Course Session Detail Screen
  ↓ [Review guidelines]
Tap "Start Session"
  ↓
Course Timer/Activity Screen
```

### Flow 3: Voice Query with Wellness Suggestion
```
Sanctuary Screen
  ↓ [Tap microphone icon]
Listening Mode (mic pulses)
  ↓ [Speak: "How can I reduce stress?"]
Transcription Preview Appears
  ↓ [Auto-send on pause]
User Message Sent
  ↓ [1-2s delay]
Harmony Types (typing indicator)
  ↓
Response with Meditation Course Suggestion
  ↓ [Tap "Start Course"]
Navigate to Meditation Session
```

---

## 🎭 Animation Specifications

### Entrance Animations
- **Sanctuary Open**: Opacity 0→1, duration 0.3s
- **Chat Bubbles**: Opacity 0→1, translateY 10→0, duration 0.3s
- **Button Reveal**: Opacity 0→1, translateY 10→0, duration 0.2s
- **Guidelines**: Staggered entrance (0.1s delay per item)

### Looping Animations
- **Harmony Float**: translateY 0→-10→0, duration 3s, easeInOut, infinite
- **Mascot Pulse**: scale 1→1.2→1, opacity 0.5→0→0.5, duration 2s, infinite
- **Mic Listening**: scale 1→1.2→1, duration 1s, infinite
- **Typing Dots**: scale 1→1.2→1, duration 0.6s, staggered 0.2s, infinite

### Interaction Animations
- **Button Press**: scale 0.98, translateY 2px
- **Card Hover**: scale 1.01
- **Card Tap**: scale 0.99

---

## 📐 Responsive Breakpoints

### Small (320px - 374px) - iPhone SE
- Reduce padding: 16px → 12px
- Font sizes: 14px → 13px (system handles via globals.css)
- Stack stat cards vertically
- Reduce mascot size: 56px → 48px

### Medium (375px - 389px) - iPhone 12/13/14
- Standard spacing: 20px padding
- Default font sizes
- Two-column stat cards

### Large (390px - 440px) - iPhone 14 Pro Max
- Increased padding: 20px → 24px
- More whitespace between elements
- Larger touch targets

---

## 🎮 Interactive Demo Features

### Clickable Hotspots
1. **Harmony Mascot** (bottom-right) → Opens Sanctuary
2. **Course/Challenge Cards** → Reveals action button
3. **Action Buttons** → Navigates to session detail
4. **Microphone Icon** → Activates voice input
5. **Send Button** → Submits chat message
6. **Close Button** → Exits Sanctuary

### State Management
- **Active Card ID**: Tracks which card shows button
- **Listening State**: Controls mic animation & transcription
- **Messages Array**: Stores chat history
- **Typing State**: Shows/hides typing indicator
- **Selected Course/Challenge**: Determines which detail screen to show

---

## 🎨 Export Specifications

### High-Resolution PNG Exports
- **Resolution**: 2x (780x1688px for iPhone 14)
- **Format**: PNG-24 with transparency
- **Screens to Export**:
  1. Home Screen (with mascot visible)
  2. Courses Tab (with revealed button)
  3. Challenges Tab (with revealed button)
  4. Sanctuary (Dawn atmosphere)
  5. Sanctuary (Blooming atmosphere)
  6. Sanctuary Chat (example conversation)
  7. Course Session Detail
  8. Challenge Detail with Tasks

### Annotation Overlays
Include text annotations showing:
- Tap targets (circles with numbers)
- Interaction flows (arrows between elements)
- Animation timings (e.g., "Fade in 0.2s")
- State changes (e.g., "Button reveals on first tap")

---

## 🛠️ Technical Implementation Notes

### Key Technologies
- **React**: UI component library
- **Motion (Framer Motion)**: Animation library
- **Tailwind CSS v4**: Utility-first styling
- **Lucide React**: Icon library
- **Web Speech API**: Voice recognition

### Performance Optimizations
- **Lazy Loading**: Delay component mount until needed
- **Memoization**: Prevent unnecessary re-renders of chat messages
- **Debouncing**: Voice transcript updates
- **Virtual Scrolling**: For long chat histories (future enhancement)

### Accessibility Considerations
- **ARIA Labels**: All interactive elements
- **Keyboard Navigation**: Tab order follows visual flow
- **Screen Reader**: Announces new chat messages
- **Haptic Feedback**: Optional (user can disable in OS settings)
- **Voice Alternative**: Text input always available

---

## 📝 Testing Checklist

### Core Interactions
- [ ] Tap Harmony mascot → Sanctuary opens
- [ ] Type chat message → Send → Harmony responds
- [ ] Tap microphone → Speak → Auto-transcribe → Send
- [ ] Tap course card → Button reveals → Tap button → Navigate
- [ ] Button auto-fades after 3 seconds
- [ ] Close Sanctuary → Returns to previous screen
- [ ] Voice mode toggle changes state

### Responsive Behavior
- [ ] Works on 320px width (iPhone SE)
- [ ] Works on 390px width (iPhone 14)
- [ ] Works on 440px width (Pro Max)
- [ ] No horizontal scrolling
- [ ] Bottom nav doesn't overlap content
- [ ] Mascot doesn't overlap nav

### Edge Cases
- [ ] Voice recognition unsupported → Shows alert
- [ ] Empty chat input → Send button disabled
- [ ] Long chat history → Scrolls properly
- [ ] Long Harmony response → Wraps correctly
- [ ] Multiple rapid taps → Prevents duplicate navigation

---

## 🎯 Future Enhancements

1. **Persistent Chat History**: Save conversations to localStorage
2. **Voice Synthesis**: Harmony speaks responses aloud
3. **Real-time HRV Integration**: Pull actual health data
4. **Multi-language Support**: Cantonese, Mandarin, English
5. **Dark Mode**: Sanctuary night theme
6. **Badge Animations**: Unlock celebrations
7. **Social Features**: Share progress with friends
8. **Offline Mode**: Downloaded courses available offline

---

## 📞 Support & Documentation

For questions or issues with the interactive prototype:
- Refer to component JSDoc comments
- Check `/guidelines/Guidelines.md` for general design principles
- Review Figma imports in `/imports/` directory
- Test in Chrome/Edge for full feature support

---

**Last Updated**: November 10, 2025  
**Version**: 1.0.0  
**Platform**: Mobile Web (PWA-ready)
