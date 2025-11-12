import { useRef, useEffect } from "react";

interface SwipeNavigationConfig {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  threshold?: number;
  velocityThreshold?: number;
  preventDefaultTouchMove?: boolean;
}

interface TouchData {
  startX: number;
  startY: number;
  startTime: number;
  currentX: number;
  currentY: number;
}

export function useSwipeNavigation({
  onSwipeLeft,
  onSwipeRight,
  threshold = 100, // Minimum swipe distance in pixels
  velocityThreshold = 0.5, // Minimum swipe velocity (pixels/ms)
  preventDefaultTouchMove = false,
}: SwipeNavigationConfig) {
  const touchData = useRef<TouchData | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Touch Events
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchData.current = {
        startX: touch.clientX,
        startY: touch.clientY,
        startTime: Date.now(),
        currentX: touch.clientX,
        currentY: touch.clientY,
      };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchData.current) return;

      const touch = e.touches[0];
      touchData.current.currentX = touch.clientX;
      touchData.current.currentY = touch.clientY;

      const deltaX = Math.abs(touch.clientX - touchData.current.startX);
      const deltaY = Math.abs(touch.clientY - touchData.current.startY);

      // If horizontal movement is greater than vertical, prevent default to avoid scrolling conflict
      if (deltaX > deltaY && preventDefaultTouchMove) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = () => {
      if (!touchData.current) return;

      const deltaX = touchData.current.currentX - touchData.current.startX;
      const deltaY = touchData.current.currentY - touchData.current.startY;
      const deltaTime = Date.now() - touchData.current.startTime;

      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);
      const velocity = absDeltaX / deltaTime;

      // Only trigger swipe if:
      // 1. Horizontal movement is greater than vertical movement (it's a horizontal swipe)
      // 2. Either the distance threshold OR velocity threshold is met
      const isHorizontalSwipe = absDeltaX > absDeltaY;
      const meetsDistanceThreshold = absDeltaX > threshold;
      const meetsVelocityThreshold = velocity > velocityThreshold;

      if (isHorizontalSwipe && (meetsDistanceThreshold || meetsVelocityThreshold)) {
        if (deltaX > 0) {
          // Swipe right (previous page)
          onSwipeRight();
        } else {
          // Swipe left (next page)
          onSwipeLeft();
        }
      }

      touchData.current = null;
    };

    // Mouse Events (for desktop testing)
    let isMouseDown = false;

    const handleMouseDown = (e: MouseEvent) => {
      isMouseDown = true;
      touchData.current = {
        startX: e.clientX,
        startY: e.clientY,
        startTime: Date.now(),
        currentX: e.clientX,
        currentY: e.clientY,
      };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseDown || !touchData.current) return;

      touchData.current.currentX = e.clientX;
      touchData.current.currentY = e.clientY;
    };

    const handleMouseUp = () => {
      if (!isMouseDown || !touchData.current) return;

      isMouseDown = false;

      const deltaX = touchData.current.currentX - touchData.current.startX;
      const deltaY = touchData.current.currentY - touchData.current.startY;
      const deltaTime = Date.now() - touchData.current.startTime;

      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);
      const velocity = absDeltaX / deltaTime;

      const isHorizontalSwipe = absDeltaX > absDeltaY;
      const meetsDistanceThreshold = absDeltaX > threshold;
      const meetsVelocityThreshold = velocity > velocityThreshold;

      if (isHorizontalSwipe && (meetsDistanceThreshold || meetsVelocityThreshold)) {
        if (deltaX > 0) {
          onSwipeRight();
        } else {
          onSwipeLeft();
        }
      }

      touchData.current = null;
    };

    // Add event listeners
    element.addEventListener("touchstart", handleTouchStart, { passive: true });
    element.addEventListener("touchmove", handleTouchMove, { passive: !preventDefaultTouchMove });
    element.addEventListener("touchend", handleTouchEnd, { passive: true });
    element.addEventListener("mousedown", handleMouseDown);
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseup", handleMouseUp);

    // Cleanup
    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchmove", handleTouchMove);
      element.removeEventListener("touchend", handleTouchEnd);
      element.removeEventListener("mousedown", handleMouseDown);
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseup", handleMouseUp);
    };
  }, [onSwipeLeft, onSwipeRight, threshold, velocityThreshold, preventDefaultTouchMove]);

  return elementRef;
}
