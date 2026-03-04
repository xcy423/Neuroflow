import { motion } from "motion/react";
import { Plus } from "lucide-react";

interface FloatingActionButtonProps {
  onClick: () => void;
}

export function FloatingActionButton({ onClick }: FloatingActionButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="fixed right-6 bottom-28 w-14 h-14 bg-[#A8D5BA] rounded-full shadow-lg flex items-center justify-center z-30"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div
        animate={{ rotate: [0, 90, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Plus className="w-7 h-7 text-white" />
      </motion.div>
      
      {/* Pulse animation */}
      <motion.div
        className="absolute inset-0 bg-[#A8D5BA] rounded-full -z-10"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.7, 0, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.button>
  );
}
