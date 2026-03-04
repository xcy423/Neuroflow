import { motion } from "motion/react";
import { RotateCcw } from "lucide-react";

interface DemoControlsProps {
  onResetDay: () => void;
}

export function DemoControls({ onResetDay }: DemoControlsProps) {
  return (
    <motion.div
      className="fixed top-4 right-4 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <button
        onClick={onResetDay}
        className="bg-white/90 backdrop-blur-sm border-2 border-[#4A90E2] text-[#4A90E2] px-3 py-2 rounded-xl shadow-lg flex items-center gap-2 text-sm hover:bg-white transition-colors"
        title="Reset to simulate first entry of the day"
      >
        <RotateCcw className="w-4 h-4" />
        Reset Day
      </button>
    </motion.div>
  );
}
