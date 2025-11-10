import svgPaths from "./svg-crqz6vj79k";

function Frame() {
  return (
    <div className="absolute box-border content-stretch flex gap-[10px] items-center justify-center left-[62.05px] px-[4px] py-[2px] rounded-[4px] top-[41px]" style={{ backgroundImage: "linear-gradient(90deg, rgba(74, 144, 226, 0.5) 0%, rgba(74, 144, 226, 0.5) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-end leading-[0] not-italic relative shrink-0 text-[#4a90e2] text-[14px] text-center text-nowrap">
        <p className="leading-[normal] whitespace-pre">81%</p>
      </div>
    </div>
  );
}

function Percentage() {
  return (
    <div className="absolute contents left-[62.05px] top-[38px]" data-name="percentage">
      <Frame />
      <div className="absolute h-[10.5px] left-[86.3px] top-[38px] w-[14.5px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 11">
          <g id="Vector 6">
            <path d={svgPaths.p3b01e280} fill="var(--fill-0, white)" />
            <path d={svgPaths.p3b01e280} fill="var(--fill-1, #4A90E2)" fillOpacity="0.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default function Ring() {
  return (
    <div className="relative size-full" data-name="ring">
      <div className="absolute left-[7.05px] size-[115px] top-[7px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 115 115">
          <g id="Ellipse 6">
            <path d={svgPaths.p2153e100} fill="var(--fill-0, white)" />
            <path d={svgPaths.p2153e100} fill="var(--fill-1, #4A90E2)" fillOpacity="0.5" />
            <path d={svgPaths.p2153e100} stroke="var(--stroke-0, black)" />
          </g>
        </svg>
      </div>
      <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.9961169958114624)+(var(--transform-inner-height)*0.08803948014974594)))] items-center justify-center left-0 top-0 w-[calc(1px*((var(--transform-inner-height)*0.9961169958114624)+(var(--transform-inner-width)*0.08803948014974594)))]" style={{ "--transform-inner-width": "120", "--transform-inner-height": "120" } as React.CSSProperties}>
        <div className="flex-none rotate-[95.051deg]">
          <div className="relative size-[120px]">
            <div className="absolute bottom-0 left-0 right-[0.23%] top-[11.57%]" style={{ "--fill-0": "rgba(236, 240, 241, 1)", "--stroke-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 120 107">
                <g id="Ellipse 5">
                  <path d={svgPaths.p2d995880} fill="var(--fill-0, #ECF0F1)" />
                  <path d={svgPaths.p2d995880} fill="url(#paint0_linear_40_1253)" fillOpacity="0.8" />
                  <path d={svgPaths.p2d995880} stroke="var(--stroke-0, black)" />
                </g>
                <defs>
                  <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_40_1253" x1="1.68096e-05" x2="120" y1="46.1201" y2="46.1201">
                    <stop stopColor="#4A90E2" />
                    <stop offset="1" stopColor="#A8D5BA" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Percentage />
    </div>
  );
}