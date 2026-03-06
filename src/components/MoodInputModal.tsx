import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import bearImg from "../assets/a6e30b99b1b5110ddc2504b6f21c7a9407ff4343.png";

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

// Waveform bar heights (px) for the connector between adjacent bears
// Index = distance from selected bear (0 = closest to selected, 1 = next, 2 = outermost)
const WAVE_BARS = [26.4, 16.8, 7.2] as const;

interface MoodInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (mood: string, drivers?: string[], note?: string) => void;
}

// Bear images are assigned after import declarations
// Colors ordered left-to-right: Crushing It → Fuzzy/Foggy
// The "bar color" between two bears interpolates toward the selected bear's color
const ENERGY_LEVELS = [
  { id: "crushing",  label: "Crushing It", color: "#F5A623", bear: bearCrushing  },
  { id: "energized", label: "Energized",   color: "#D3A558", bear: bearEnergized },
  { id: "balanced",  label: "Balanced",    color: "#C5A570", bear: bearBalanced  },
  { id: "low",       label: "Low Energy",  color: "#BAA582", bear: bearLow       },
  { id: "drained",   label: "Drained",     color: "#868686", bear: bearDrained   },
];

const DRIVER_GROUPS = [
  {
    id: "work",
    label: "Work / Hustle",
    suboptions: ["Deadlines", "Client Feedback", "Meetings", "Context-Switching"],
  },
  {
    id: "physical",
    label: "Physical Health",
    suboptions: ["Bad Sleep", "Too much caffeine", "Skipped meal", "Good workout"],
  },
  {
    id: "life",
    label: "Life",
    suboptions: ["Socializing", "Isolation", "Financial stress", "Personal win"],
  },
  {
    id: "sleep",
    label: "Sleep",
    suboptions: ["Poor sleep", "Good sleep", "Insomnia", "Oversleeping"],
  },
  {
    id: "relationships",
    label: "Relationships",
    suboptions: ["Conflict", "Support", "Loneliness", "Deep connection"],
  },
  {
    id: "nutrition",
    label: "Nutrition",
    suboptions: ["Skipped meals", "Ate well", "Too much junk", "Stayed hydrated"],
  },
];

export default function MoodInputModal({
  isOpen,
  onClose,
  onSubmit,
}: MoodInputModalProps) {
  const [selectedEnergy, setSelectedEnergy] = useState("crushing");
  const [expandedDrivers, setExpandedDrivers] = useState<Set<string>>(new Set());
  const [selectedSubOptions, setSelectedSubOptions] = useState<Record<string, string[]>>({});
  const [note, setNote] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const micPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const selectedEnergyObj = ENERGY_LEVELS.find((e) => e.id === selectedEnergy)!;
  const selectedIndex = ENERGY_LEVELS.findIndex((e) => e.id === selectedEnergy);

  // Update selection based on pointer X position on the slider row
  const updateFromPointer = useCallback((clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const idx = Math.round(ratio * (ENERGY_LEVELS.length - 1));
    setSelectedEnergy(ENERGY_LEVELS[idx].id);
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedDrivers((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleSubOption = (driverId: string, sub: string) => {
    setSelectedSubOptions((prev) => {
      const current = prev[driverId] ?? [];
      const next = current.includes(sub)
        ? current.filter((s) => s !== sub)
        : [...current, sub];
      return { ...prev, [driverId]: next };
    });
  };

  const handleSubmit = () => {
    const selected: string[] = [];
    for (const group of DRIVER_GROUPS) {
      if (expandedDrivers.has(group.id)) {
        const subs = selectedSubOptions[group.id] ?? [];
        if (subs.length > 0) selected.push(...subs);
        else selected.push(group.label);
      }
    }
    onSubmit(selectedEnergy, selected, note);
    // Close the modal — App.tsx will open the Harmony Card after the exit anim
    onClose();
    setSelectedEnergy("crushing");
    setExpandedDrivers(new Set());
    setSelectedSubOptions({});
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
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="bg-white w-full max-w-[440px] flex flex-col"
        style={{
          borderRadius: "60px 60px 0 0",
          border: "2px solid #E2E6E7",
          boxShadow: "0 0 2px 0 #FFF, 0 0 12px 0 rgba(44, 62, 80, 0.12)",
          maxHeight: "75vh",
          overflow: "hidden",
        }}
      >
        {/* ── Scrollable content ── */}
        <div style={{ overflowY: "auto", flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "120px 28px 24px 28px", gap: "24px" }}>

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

          {/* Mood Slider Row — draggable
              Fixed height (72px) reserves space for the largest bear so the
              surrounding layout never shifts. Connectors use flex:1 so every
              gap between bears is exactly equal regardless of their content. */}
          <div
            ref={sliderRef}
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              height: "72px",        // fixed → no layout shift on selection change
              cursor: "grab",
              userSelect: "none",
              touchAction: "none",
              marginBottom: "4px",
            }}
            onPointerDown={(e) => {
              isDragging.current = true;
              (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
              updateFromPointer(e.clientX);
            }}
            onPointerMove={(e) => {
              if (!isDragging.current) return;
              updateFromPointer(e.clientX);
            }}
            onPointerUp={() => { isDragging.current = false; }}
            onPointerCancel={() => { isDragging.current = false; }}
          >
            {ENERGY_LEVELS.flatMap((level, i) => {
              const isSelected  = level.id === selectedEnergy;
              const isActive    = i <= selectedIndex;
              const bubbleSize  = isSelected ? 57.6 : 33.6;
              const bearSize    = isSelected ? 38.4 : 24;
              const bubbleBg    = isActive ? level.color : "#868686";

              // connector between bear[i-1] and bear[i]
              const connectorColor  = i <= selectedIndex ? selectedEnergyObj.color : "#868686";
              const spansSel        = i > 0 && (selectedIndex === i - 1 || selectedIndex === i);
              const toLeft          = i > 0 && i - 1 < selectedIndex;
              const barsOrdered     = toLeft
                ? [...WAVE_BARS].reverse()  // short→mid→tall (approaching selected from left)
                : WAVE_BARS;               // tall→mid→short (leaving selected to right)

              const connector = i > 0 ? (
                <div
                  key={`conn-${i}`}
                  style={{
                    flex: 1,               // all connectors share remaining space equally
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "stretch",
                    gap: "2.4px",
                  }}
                >
                  {spansSel
                    ? barsOrdered.map((h, bi) => (
                        <div
                          key={bi}
                          style={{
                            width: "7.2px",
                            height: `${h}px`,
                            background: connectorColor,
                            borderRadius: "100px",
                            flexShrink: 0,
                          }}
                        />
                      ))
                    : [0, 1].map((dot) => (
                        <div
                          key={dot}
                          style={{
                            width: "7.2px",
                            height: "7.2px",
                            background: connectorColor,
                            borderRadius: "100px",
                            flexShrink: 0,
                          }}
                        />
                      ))}
                </div>
              ) : null;

              const bear = (
                <motion.button
                  key={level.id}
                  animate={{ width: bubbleSize, height: bubbleSize }}
                  transition={{ type: "spring", damping: 22, stiffness: 320 }}
                  onClick={() => setSelectedEnergy(level.id)}
                  style={{
                    flexShrink: 0,
                    borderRadius: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "4.8px",
                    background: bubbleBg,
                    boxShadow: isSelected
                      ? `0px 0px 0px 3px ${level.color}60, 0px 4px 12px ${level.color}50`
                      : "none",
                    userSelect: "none",
                  }}
                >
                  <motion.img
                    animate={{ width: bearSize, height: bearSize }}
                    transition={{ type: "spring", damping: 22, stiffness: 320 }}
                    src={level.bear}
                    alt={level.label}
                    style={{ flexShrink: 0, objectFit: "cover", borderRadius: "50%", pointerEvents: "none", display: "block" }}
                    draggable={false}
                  />
                </motion.button>
              );

              return connector ? [connector, bear] : [bear];
            })}
          </div>

          {/* Selected Label Pill */}
          <div className="flex justify-center mt-[14px]">
            <motion.div
              key={selectedEnergyObj.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="rounded-full text-white text-[14px] font-semibold"
              style={{
                background: selectedEnergyObj.color,
                paddingLeft: "9.6px",
                paddingRight: "9.6px",
                paddingTop: "2.4px",
                paddingBottom: "2.4px",
              }}
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
          {/* flex-wrap container — all pills are flat siblings so they wrap naturally
              without forcing expanded groups onto their own dedicated rows */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "flex-start" }}>
            {DRIVER_GROUPS.flatMap((group) => {
              const isExpanded = expandedDrivers.has(group.id);
              const subSel = selectedSubOptions[group.id] ?? [];

              const parentPill = (
                <button
                  key={group.id}
                  onClick={() => toggleExpand(group.id)}
                  style={{
                    background: isExpanded ? "#4A90E2" : "#FCFCFC",
                    border: `1px solid ${isExpanded ? "#ECF0F1" : "#868686"}`,
                    borderRadius: "20px",
                    padding: "4px 8px",
                    color: isExpanded ? "#ECF0F1" : "#868686",
                    fontSize: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  {group.label}
                </button>
              );

              if (!isExpanded) return [parentPill];

              const subPills = group.suboptions.map((sub) => {
                const subActive = subSel.includes(sub);
                return (
                  <button
                    key={`${group.id}-${sub}`}
                    onClick={() => toggleSubOption(group.id, sub)}
                    style={{
                      background: subActive ? "#4A90E2" : "#E2E6E7",
                      border: "1px solid #4A90E2",
                      borderRadius: "20px",
                      padding: "4px 8px",
                      color: subActive ? "#ECF0F1" : "#4A90E2",
                      fontSize: "12px",
                      fontWeight: 700,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    {sub}
                  </button>
                );
              });

              // Spacer after last sub-option to visually separate groups
              const spacer = (
                <div
                  key={`${group.id}-spacer`}
                  style={{ flexBasis: "100%", height: "0px", margin: "0" }}
                />
              );

              return [parentPill, ...subPills, spacer];
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

        </div>{/* end scrollable content */}

        {/* ── Footer Buttons — sticky, always visible ── */}
        <div
          style={{
            flexShrink: 0,
            padding: "12px 16px",
            borderTop: "1px solid #E2E6E7",
            background: "#fff",
          }}
        >
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
        </div>
      </motion.div>
    </div>
  );
}
