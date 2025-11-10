import { motion } from "motion/react";
import { useState } from "react";

interface DynamicIslandAnnotationProps {
  show?: boolean;
}

export default function DynamicIslandAnnotation({ show = false }: DynamicIslandAnnotationProps) {
  const [isVisible, setIsVisible] = useState(show);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Dynamic Island Representation (iPhone 14/15 Pro) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute top-0 left-1/2 -translate-x-1/2"
      >
        {/* Dynamic Island Shape */}
        <div className="relative">
          <div 
            className="bg-black/90 rounded-[30px] shadow-2xl"
            style={{
              width: "126px",
              height: "37px",
              marginTop: "11px",
            }}
          />
          
          {/* Annotation Label */}
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute top-[60px] left-1/2 -translate-x-1/2 whitespace-nowrap"
          >
            <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-lg">
              Dynamic Island
            </div>
            <div className="w-px h-6 bg-purple-600 mx-auto" />
          </motion.div>
        </div>
      </motion.div>

      {/* Safe Area Top Boundary - 80px */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute left-0 right-0"
        style={{ top: "80px" }}
      >
        <div className="relative">
          {/* Horizontal Line */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-green-500 to-transparent" />
          
          {/* Left Label */}
          <div className="absolute left-4 -top-4 bg-green-500 text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-lg">
            80px Clearance
          </div>
          
          {/* Right Label */}
          <div className="absolute right-4 -top-4 bg-green-500 text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-lg">
            Content Starts Here ✓
          </div>
        </div>
      </motion.div>

      {/* Content Safe Zone Highlight */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ delay: 0.4 }}
        className="absolute inset-0 bg-green-500"
        style={{ 
          top: "80px",
          bottom: "90px", // Account for bottom nav
        }}
      />

      {/* Bottom Navigation Safe Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute left-0 right-0 bottom-0"
      >
        <div className="relative" style={{ height: "90px" }}>
          {/* Top boundary of bottom nav */}
          <div className="absolute top-0 left-0 right-0">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            <div className="absolute left-4 -top-4 bg-blue-500 text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-lg">
              Bottom Nav Zone
            </div>
          </div>
          
          {/* Safe area for home indicator */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-blue-500/10" />
          <div className="absolute bottom-2 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-lg">
            Home Indicator Safe Area
          </div>
        </div>
      </motion.div>

      {/* Measurement Arrows - Left Side */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className="absolute left-2 top-0"
        style={{ height: "80px" }}
      >
        {/* Vertical line */}
        <div className="relative h-full w-px bg-purple-400">
          {/* Top arrow */}
          <div className="absolute -top-1 -left-1">
            <div className="w-2 h-2 border-t-2 border-l-2 border-purple-400 rotate-45" />
          </div>
          
          {/* Bottom arrow */}
          <div className="absolute -bottom-1 -left-1">
            <div className="w-2 h-2 border-b-2 border-l-2 border-purple-400 -rotate-45" />
          </div>
          
          {/* Label */}
          <div className="absolute top-1/2 -translate-y-1/2 left-3 bg-purple-400 text-white px-2 py-0.5 rounded text-[9px] font-bold whitespace-nowrap shadow-lg">
            80px
          </div>
        </div>
      </motion.div>

      {/* Widget Spacing Indicators - Right Side */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
        className="absolute right-2 top-[200px]"
      >
        <div className="flex flex-col items-end gap-1">
          <div className="bg-orange-500 text-white px-2 py-1 rounded text-[9px] font-bold shadow-lg">
            28px between widgets
          </div>
          <div className="w-px h-7 bg-orange-500 mx-auto" />
        </div>
      </motion.div>

      {/* Toggle Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        onClick={() => setIsVisible(false)}
        className="absolute top-[100px] right-4 bg-red-500 text-white px-3 py-2 rounded-full text-[11px] font-bold shadow-xl pointer-events-auto z-[10000] hover:bg-red-600 active:scale-95 transition-all"
      >
        Hide Annotations ✕
      </motion.button>

      {/* Info Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="absolute bottom-[110px] left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl pointer-events-auto"
      >
        <h3 className="font-bold text-[#2c3e50] mb-2">🎯 Safe Area Guidelines</h3>
        <div className="space-y-1 text-[11px] text-[#868686]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-purple-500" />
            <span>Dynamic Island: 37px × 126px (11px from top)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500" />
            <span>Content safe zone: Starts at 80px from top</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-orange-500" />
            <span>Widget spacing: 28px vertical gap</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500" />
            <span>Bottom nav: 70px + safe area inset</span>
          </div>
        </div>
      </motion.div>

      {/* Corner Device Indicators */}
      <div className="absolute top-2 left-2 bg-white/90 rounded px-2 py-1 text-[9px] font-bold text-[#2c3e50] shadow">
        iPhone 14 Pro
      </div>
      <div className="absolute top-2 right-2 bg-white/90 rounded px-2 py-1 text-[9px] font-bold text-[#2c3e50] shadow">
        390 × 844px
      </div>
    </div>
  );
}
