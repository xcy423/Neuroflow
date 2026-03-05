import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
// @ts-ignore – resolved by vite alias at runtime
import bearImg from "figma:asset/a6e30b99b1b5110ddc2504b6f21c7a9407ff4343.png";

// Bear emotion images — already bundled from Figma assets, work on all devices
import bearDrainedImg   from "../assets/71d2e20f8f76af16ab89c71d15e53ecbbc180be0.png";
import bearLowImg       from "../assets/7ed7035b041b2e9e1af5382074bbb88898e185fb.png";
import bearBalancedImg  from "../assets/26a8ddd33b7fbb93d26257cc8df3e6ad63ad4ed5.png";
import bearEnergizedImg from "../assets/505ee940af5e200221c143f10602c6167666e596.png";
import bearCrushingImg  from "../assets/000885b7c4e9d58a4aae5da67f617c7a43aa4705.png";
const bearDrained   = bearDrainedImg;
const bearLow       = bearLowImg;
const bearBalanced  = bearBalancedImg;
const bearEnergized = bearEnergizedImg;
const bearCrushing  = bearCrushingImg;

interface MoodInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (mood: string, drivers?: string[], note?: string) => void;
}

// Bear images are assigned after import declarations
const ENERGY_LEVELS_DATA = [
  { id: "drained",   label: "Drained",     color: "#8D9DB6" },
  { id: "low",       label: "Low Energy",  color: "#A8A8B3" },
  { id: "balanced",  label: "Balanced",    color: "#F5C842" },
  { id: "energized", label: "Energized",   color: "#F5A623" },
  { id: "crushing",  label: "Crushing It", color: "#4A90E2" },
];

const DRIVERS = [
  "Work / Hustle",
  "Physical Health",
  "Life",
  "Sleep",
  "Relationships",
  "Nutrition",
];

const ENERGY_LEVELS = [
  { ...ENERGY_LEVELS_DATA[0], bear: bearDrained },
  { ...ENERGY_LEVELS_DATA[1], bear: bearLow },
  { ...ENERGY_LEVELS_DATA[2], bear: bearBalanced },
  { ...ENERGY_LEVELS_DATA[3], bear: bearEnergized },
  { ...ENERGY_LEVELS_DATA[4], bear: bearCrushing },
];

export default function MoodInputModal({
  isOpen,
  onClose,
  onSubmit,
}: MoodInputModalProps) {
  const [selectedEnergy, setSelectedEnergy] = useState("crushing");
  const [selectedDrivers, setSelectedDrivers] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const micPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const selectedEnergyObj = ENERGY_LEVELS.find((e) => e.id === selectedEnergy)!;
  const selectedIndex = ENERGY_LEVELS.findIndex((e) => e.id === selectedEnergy);

  const toggleDriver = (driver: string) => {
    setSelectedDrivers((prev) =>
      prev.includes(driver) ? prev.filter((d) => d !== driver) : [...prev, driver]
    );
  };

  const handleSubmit = () => {
    onSubmit(selectedEnergy, selectedDrivers, note);
    setSelectedEnergy("crushing");
    setSelectedDrivers([]);
    setNote("");
  };

  const handleMicPressStart = useCallback(() => {
    micPressTimer.current = setTimeout(() => setIsRecording(true), 300);
  }, []);

  const handleMicPressEnd = useCallback(() => {
    if (micPressTimer.current) clearTimeout(micPressTimer.current);
    setIsRecording(false);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-end justify-center">
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="bg-white w-full max-w-[440px] overflow-y-auto max-h-[92vh] flex flex-col items-center"
        style={{
          borderRadius: "60px 60px 0 0",
          border: "2px solid #E2E6E7",
          boxShadow: "0 0 2px 0 #FFF, 0 0 12px 0 rgba(44, 62, 80, 0.12)",
          padding: "120px 28px 20px 28px",
          gap: "24px",
        }}
      >
        {/* ── Drag Handle ── */}
        <div className="flex justify-center w-full">
          <div className="w-[40px] h-[4px] rounded-full bg-[#d0d5d8]" />
        </div>

        {/* ── Harmony Bear + Speech Bubble ── */}
        <div className="flex items-end gap-3 w-full">
          {/* Bear */}
          <div className="flex-shrink-0 w-[80px] h-[80px]">
            <img
              src={bearImg}
              alt="Harmony the bear"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Speech bubble */}
          <div
            className="relative flex-1 px-4 py-3"
            style={{ background: "#f0f4f8", borderRadius: "4px 16px 16px 16px" }}
          >
            {/* Tail pointing left toward bear */}
            <div
              className="absolute -left-[8px] bottom-[14px] w-0 h-0"
              style={{
                borderTop: "8px solid transparent",
                borderBottom: "0px solid transparent",
                borderRight: "8px solid #f0f4f8",
              }}
            />
            <p className="text-[14px] font-semibold text-[#2c3e50] leading-snug">
              Hey! It's Harmony here,{"\n"}how are you today?
            </p>
          </div>
        </div>

        {/* ── Inner Card ── */}
        <div
          className="w-full flex flex-col"
          style={{
            borderRadius: "16px",
            background: "#FCFCFC",
            boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.10)",
            padding: "16px 12px",
            gap: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >

        {/* ── Energy Section ── */}
        <div className="w-full">
          <p className="text-[16px] font-bold text-[#2c3e50] mb-4">
            How's your energy right now?
          </p>

          {/* Mood Slider Row */}
          <div className="flex items-center justify-between mb-3">
            {ENERGY_LEVELS.map((level, i) => {
              const isSelected = level.id === selectedEnergy;
              const size = isSelected ? 52 : 36;
              const isFilled = i <= selectedIndex;
              return (
                <div key={level.id} className="flex items-center">
                  {/* Connector dots before this item (except first) */}
                  {i > 0 && (
                    <div className="flex items-center gap-[3px] mx-[2px]">
                      {[0, 1, 2].map((dot) => (
                        <div
                          key={dot}
                          className="w-[4px] h-[4px] rounded-full"
                          style={{ background: isFilled ? selectedEnergyObj.color : "#d0d5d8" }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Icon bubble */}
                  <motion.button
                    animate={{ width: size, height: size }}
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    onClick={() => setSelectedEnergy(level.id)}
                    className="flex-shrink-0 rounded-full flex items-center justify-center overflow-hidden select-none p-[3px]"
                    style={{
                      background: isSelected
                        ? `radial-gradient(circle, ${level.color}35 0%, ${level.color}15 100%)`
                        : "#ecf0f1",
                      boxShadow: isSelected
                        ? `0px 0px 0px 3px ${level.color}60, 0px 4px 12px ${level.color}40`
                        : "none",
                    }}
                  >
                    <img
                      src={level.bear}
                      alt={level.label}
                      className="w-full h-full object-contain"
                      draggable={false}
                    />
                  </motion.button>
                </div>
              );
            })}
          </div>

          {/* Selected Label Pill */}
          <div className="flex justify-center">
            <motion.div
              key={selectedEnergyObj.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="px-5 py-[6px] rounded-full text-white text-[14px] font-semibold"
              style={{ background: selectedEnergyObj.color }}
            >
              {selectedEnergyObj.label}
            </motion.div>
          </div>
        </div>

        {/* ── Drivers Section ── */}
        <div className="w-full">
          <p className="text-[16px] font-bold text-[#2c3e50] mb-3">
            What's driving this?{" "}
            <span className="font-normal text-[#868686] text-[14px]">
              (Select more than one)
            </span>
          </p>
          <div className="flex flex-wrap gap-[10px]">
            {DRIVERS.map((driver) => {
              const active = selectedDrivers.includes(driver);
              return (
                <button
                  key={driver}
                  onClick={() => toggleDriver(driver)}
                  className="px-4 py-[7px] rounded-full text-[13px] font-medium border transition-all"
                  style={{
                    borderColor: active ? "#4A90E2" : "#c8cdd1",
                    background: active ? "#4A90E2" : "transparent",
                    color: active ? "#fff" : "#2c3e50",
                  }}
                >
                  {driver}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Journal / Voice Section ── */}
        <div className="w-full">
          <p className="text-[16px] font-bold text-[#2c3e50] mb-3">
            Anything you want to jot down?
          </p>

          <div className="rounded-[16px] overflow-hidden" style={{ background: "#f0f4f8" }}>
            {/* Text area */}
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="[Type it out...] / [Hold to Record Voice Journal]"
              className="w-full px-4 pt-4 pb-2 bg-transparent text-[13px] text-[#2c3e50] placeholder:text-[#a0a8b0] resize-none focus:outline-none"
              style={{ minHeight: "70px" }}
            />

            {/* Mic button */}
            <div className="flex justify-center pb-4 pt-1">
              <motion.button
                onPointerDown={handleMicPressStart}
                onPointerUp={handleMicPressEnd}
                onPointerLeave={handleMicPressEnd}
                animate={
                  isRecording
                    ? {
                        boxShadow: [
                          "0px 0px 0px 0px #4A90E240",
                          "0px 0px 0px 12px #4A90E220",
                          "0px 0px 0px 0px #4A90E240",
                        ],
                      }
                    : { boxShadow: "0px 0px 0px 0px #4A90E240" }
                }
                transition={{ repeat: Infinity, duration: 1 }}
                className="w-[52px] h-[52px] rounded-full flex items-center justify-center transition-colors"
                style={{ background: isRecording ? "#3A80D2" : "#4A90E2" }}
              >
                {/* Mic icon */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <rect x="9" y="2" width="6" height="12" rx="3" fill="white" />
                  <path
                    d="M5 11C5 14.866 8.13401 18 12 18M12 18C15.866 18 19 14.866 19 11M12 18V22M8 22H16"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>
            </div>

            {/* Recording waveform indicator */}
            <AnimatePresence>
              {isRecording && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center justify-center gap-2 pb-3"
                >
                  <div className="flex gap-[4px] items-end h-[16px]">
                    {[0, 1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ height: ["6px", "16px", "6px"] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.12 }}
                        className="w-[3px] rounded-full"
                        style={{ background: "#4A90E2" }}
                      />
                    ))}
                  </div>
                  <span className="text-[12px] text-[#4A90E2] font-medium">
                    Recording…
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        </div>{/* end inner card */}

        {/* ── Footer Buttons ── */}
        <div className="flex gap-3 w-full">
          <button
            onClick={onClose}
            className="flex-1 py-[14px] rounded-[100px] text-[15px] font-semibold text-[#2c3e50]"
            style={{ background: "#e2e6e8" }}
          >
            Close
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-[14px] rounded-[100px] text-[15px] font-semibold text-white"
            style={{ background: "#2c3e50" }}
          >
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
}
