import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

interface Annotation {
  id: string;
  x: number;
  y: number;
  label: string;
  description: string;
  step: number;
}

interface AnnotationOverlayProps {
  annotations: Annotation[];
  isVisible: boolean;
  onClose: () => void;
  title?: string;
}

export default function AnnotationOverlay({
  annotations,
  isVisible,
  onClose,
  title = "Interactive Features",
}: AnnotationOverlayProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
    >
      {/* Annotations */}
      <div className="relative size-full">
        <AnimatePresence>
          {annotations.map((annotation, index) => (
            <motion.div
              key={annotation.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.15, type: "spring" }}
              className="absolute"
              style={{
                left: `${annotation.x}%`,
                top: `${annotation.y}%`,
              }}
            >
              {/* Pulsing Circle */}
              <div className="relative">
                <motion.div
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4A90E2]"
                />
                
                {/* Step Number */}
                <div className="relative w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4A90E2] border-4 border-white shadow-lg flex items-center justify-center">
                  <span className="text-white font-bold text-[18px]">{annotation.step}</span>
                </div>

                {/* Label Callout */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 + 0.3 }}
                  className="absolute top-14 left-1/2 -translate-x-1/2 bg-white rounded-[12px] p-3 shadow-xl min-w-[180px] max-w-[220px]"
                >
                  <p className="text-[14px] font-bold text-[#2c3e50] mb-1">
                    {annotation.label}
                  </p>
                  <p className="text-[11px] text-[#868686]">
                    {annotation.description}
                  </p>
                  
                  {/* Arrow pointing to circle */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white transform rotate-45" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Header */}
        <div className="absolute top-6 left-0 right-0 px-6">
          <div className="bg-white/95 backdrop-blur-sm rounded-[16px] p-4 shadow-lg max-w-md mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[18px] font-bold text-[#2c3e50] mb-1">
                  {title}
                </h3>
                <p className="text-[12px] text-[#868686]">
                  Tap the numbered circles to explore
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-[#ecf0f1] flex items-center justify-center hover:bg-[#d9d9d9] transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4 text-[#2c3e50]" />
              </button>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-6 left-0 right-0 px-6">
          <div className="bg-white/95 backdrop-blur-sm rounded-[16px] p-4 shadow-lg max-w-md mx-auto">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#4A90E2] flex items-center justify-center text-white font-bold text-[12px]">
                  1
                </div>
                <span className="text-[11px] text-[#2c3e50]">Interactive Element</span>
              </div>
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-8 h-8 rounded-full bg-[#4A90E2]/30 flex items-center justify-center"
                >
                  <div className="w-4 h-4 rounded-full bg-[#4A90E2]" />
                </motion.div>
                <span className="text-[11px] text-[#2c3e50]">Animation Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
