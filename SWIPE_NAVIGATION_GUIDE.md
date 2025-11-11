# Swipe Gesture Navigation - Implementation Guide

## Overview
Your app now has **native iOS-like swipe navigation** that allows users to navigate between pages by swiping horizontally. This provides an intuitive, mobile-first user experience.

---

## 🎯 Features Implemented

### ✅ Swipe Gestures
- **Swipe Right-to-Left** → Next page (e.g., Home → Courses)
- **Swipe Left-to-Right** → Previous page (e.g., Courses → Home)

### ✅ Page Order
```
Home → Courses → Challenges → Profile
```

### ✅ Smart Detection
- **Horizontal vs. Vertical** - Only horizontal swipes trigger navigation
- **Distance Threshold** - Must swipe at least 100px to navigate
- **Velocity Threshold** - Fast swipes (0.3 px/ms) work even with shorter distance
- **Scrolling Protection** - Vertical scrolling won't accidentally trigger navigation

### ✅ Smooth Animations
- **Framer Motion** powered slide transitions
- **300ms duration** for smooth, responsive feel
- **Easing curve** optimized for iOS-like motion
- **Direction-aware** - Pages slide from appropriate direction

### ✅ Cross-Platform Support
- **Touch Events** - Works on phones and tablets
- **Mouse Events** - Works in desktop browsers for testing

---

## 🔧 How It Works

### 1. Custom Hook: `useSwipeNavigation`
Located in: `src/hooks/useSwipeNavigation.ts`

This hook handles all the swipe detection logic:

```typescript
const swipeRef = useSwipeNavigation({
  onSwipeLeft: handleSwipeLeft,   // Called when user swipes left
  onSwipeRight: handleSwipeRight, // Called when user swipes right
  threshold: 100,                 // Minimum distance in pixels
  velocityThreshold: 0.3,         // Minimum velocity (px/ms)
});
```

**What it tracks:**
- Touch/mouse start position (X, Y)
- Touch/mouse current position
- Swipe start time
- Swipe velocity
- Swipe direction

**Decision Logic:**
```
if (horizontal_movement > vertical_movement) {
  if (distance > 100px OR velocity > 0.3 px/ms) {
    if (deltaX > 0) {
      // Swipe right → Previous page
    } else {
      // Swipe left → Next page
    }
  }
}
```

### 2. Page Navigation Functions

```typescript
const handleSwipeLeft = () => {
  // Swipe left = go to next page
  const currentIndex = pageOrder.indexOf(currentScreen);
  if (currentIndex < pageOrder.length - 1) {
    setSwipeDirection("left");
    setCurrentScreen(pageOrder[currentIndex + 1]);
  }
};

const handleSwipeRight = () => {
  // Swipe right = go to previous page
  const currentIndex = pageOrder.indexOf(currentScreen);
  if (currentIndex > 0) {
    setSwipeDirection("right");
    setCurrentScreen(pageOrder[currentIndex - 1]);
  }
};
```

### 3. Animation System

Uses **Framer Motion's AnimatePresence** with custom variants:

```typescript
const pageVariants = {
  enter: (direction) => ({
    x: direction === "left" ? "100%" : "-100%",  // Start off-screen
    opacity: 0,
  }),
  center: {
    x: 0,           // Center position
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction === "left" ? "-100%" : "100%",  // Exit opposite direction
    opacity: 0,
  }),
};
```

**Visual Flow:**
```
Swipe Left (Next Page):
┌────────┐         ┌────────┐         ┌────────┐
│ Home   │  -->    │        │  -->    │Courses │
│ (exit  │         │        │         │ (enter │
│  left) │         │        │         │  left) │
└────────┘         └────────┘         └────────┘

Swipe Right (Previous Page):
┌────────┐         ┌────────┐         ┌────────┐
│Courses │  <--    │        │  <--    │ Home   │
│ (exit  │         │        │         │ (enter │
│ right) │         │        │         │ right) │
└────────┘         └────────┘         └────────┘
```

---

## 🎨 User Experience

### Preventing Accidental Navigation

**Problem:** How do we differentiate between scrolling and swiping?

**Solution:**
```typescript
const isHorizontalSwipe = absDeltaX > absDeltaY;
```

- If horizontal movement > vertical movement → It's a swipe
- If vertical movement > horizontal movement → It's scrolling
- Only horizontal swipes trigger navigation

### Edge Cases Handled

1. **At First Page** - Swiping right does nothing
2. **At Last Page** - Swiping left does nothing
3. **Short Swipes** - Must meet distance OR velocity threshold
4. **Diagonal Swipes** - Only trigger if horizontal component dominates
5. **Accidental Touches** - Tiny movements don't trigger navigation

---

## 📱 Testing the Feature

### On Mobile/Tablet:
1. **Open the app on your phone**
2. **Start on Home page**
3. **Swipe left (finger moves right-to-left)** → Goes to Courses
4. **Swipe right (finger moves left-to-right)** → Goes back to Home
5. **Try fast swipes** - Short but fast swipes should work
6. **Try scrolling** - Vertical scrolling shouldn't trigger page change

### On Desktop (Browser):
1. **Open in browser at** `http://localhost:3001`
2. **Click and drag left** → Next page
3. **Click and drag right** → Previous page
4. **Use mouse wheel to scroll** - Scrolling works normally

---

## 🎛️ Customization Options

### Adjust Swipe Sensitivity

In `App.tsx`, modify the hook configuration:

```typescript
const swipeRef = useSwipeNavigation({
  onSwipeLeft: handleSwipeLeft,
  onSwipeRight: handleSwipeRight,
  
  // Distance threshold (pixels)
  threshold: 100,        // Default: 100
                        // Lower = more sensitive
                        // Higher = less sensitive
  
  // Velocity threshold (pixels/millisecond)
  velocityThreshold: 0.3, // Default: 0.3
                         // Lower = easier fast swipes
                         // Higher = need faster swipes
});
```

### Adjust Animation Speed

In `App.tsx`, modify the transition:

```typescript
const pageTransition = {
  type: "tween" as const,
  ease: [0.25, 0.1, 0.25, 1] as const,
  duration: 0.3,  // Default: 0.3 seconds
                 // Lower = faster (0.2)
                 // Higher = slower (0.5)
};
```

### Change Page Order

In `App.tsx`, modify the page order array:

```typescript
// Current order
const pageOrder: Screen[] = ["home", "courses", "challenges", "profile"];

// Custom order (add/remove/reorder)
const pageOrder: Screen[] = ["home", "courses", "profile", "challenges"];
```

---

## 🐛 Troubleshooting

### Issue: Swipe not working on mobile
**Solution:** Make sure you're testing on an actual device or using browser dev tools in mobile mode

### Issue: Scrolling triggers page navigation
**Solution:** The hook should prevent this, but if it happens, increase the threshold:
```typescript
threshold: 150, // Increased from 100
```

### Issue: Hard to swipe to next page
**Solution:** Lower the thresholds:
```typescript
threshold: 75,            // Easier distance
velocityThreshold: 0.2,  // Easier velocity
```

### Issue: Animation feels laggy
**Solution:** Reduce animation duration:
```typescript
duration: 0.2,  // Faster animation
```

### Issue: Pages disappear during transition
**Check:** Make sure `AnimatePresence` has `mode="wait"`

---

## 🔮 Future Enhancements (Optional)

### 1. Visual Swipe Indicator
Show how far the user has swiped:
```typescript
// Track drag position and show a visual indicator
const [dragX, setDragX] = useState(0);

// Show progress bar at top of screen
<div style={{ width: `${(dragX / threshold) * 100}%` }} />
```

### 2. Haptic Feedback
Add vibration when page changes (mobile only):
```typescript
if (window.navigator.vibrate) {
  window.navigator.vibrate(10); // Light haptic
}
```

### 3. Page Preview
Show a peek of the next page while swiping:
```typescript
// Use pan gesture with motion.div to show partial next page
```

### 4. Custom Swipe Areas
Allow swipe only on specific screen areas:
```typescript
// Attach swipeRef only to specific div instead of whole screen
```

---

## 📊 Performance Notes

- **Lightweight** - Only tracks events when actively swiping
- **Debounced** - Doesn't trigger multiple navigations from one swipe
- **GPU Accelerated** - Uses transform (x) instead of position for smooth 60fps
- **Memory Efficient** - Properly cleans up event listeners

---

## ✨ Summary

Your app now has:
✅ Native iOS-like swipe navigation
✅ Smart horizontal/vertical detection
✅ Smooth 300ms transitions
✅ Works on touch and mouse
✅ Edge case protection
✅ Customizable thresholds
✅ Beautiful animations

**Try it out:** Swipe between Home, Courses, Challenges, and Profile! 🎉
