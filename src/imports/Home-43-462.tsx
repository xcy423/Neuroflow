import svgPaths from "./svg-hm5b1qddzs";
import img from "figma:asset/6f9556f595abd7625507fcafbe4580f443721a2f.png";
import img1 from "figma:asset/352d9f9fae606db62e48e15296173040c4a16a9a.png";
import imgWhatsAppImage20251109At163959D16307Ea1 from "figma:asset/a6e30b99b1b5110ddc2504b6f21c7a9407ff4343.png";

function Frame17() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[12px] h-[54.476px] items-center justify-center overflow-clip px-[24px] py-[3px] relative rounded-[100px] shadow-[0px_3px_0px_0px_#dfdfdf] shrink-0">
      <div className="relative shrink-0 size-[24px]" data-name="Component 3">
        <div className="absolute aspect-[22.5/22.5] left-[16.67%] right-[8.33%] top-1/2 translate-y-[-50%]" data-name="Vector">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path d={svgPaths.p9390b00} fill="var(--fill-0, #2C3E50)" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-end leading-[0] not-italic relative shrink-0 text-[#2c3e50] text-[14px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">Good Morning</p>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[9.05%_9.05%_0.78%_12.5%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 29">
        <g id="Group">
          <g id="Vector">
            <mask fill="white" id="path-1-inside-1_43_480">
              <path clipRule="evenodd" d={svgPaths.p2facdb00} fillRule="evenodd" />
            </mask>
            <path clipRule="evenodd" d={svgPaths.p2facdb00} fill="var(--fill-0, #2C3E50)" fillRule="evenodd" />
            <path d={svgPaths.p1535f000} fill="var(--stroke-0, #2C3E50)" mask="url(#path-1-inside-1_43_480)" />
          </g>
          <path clipRule="evenodd" d={svgPaths.p26d50c40} fill="var(--fill-0, #2C3E50)" fillRule="evenodd" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Frame5() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center pl-0 pr-[8px] py-0 relative rounded-[100px] shrink-0">
      <div className="relative shrink-0 size-[32px]" data-name="Component 3">
        <Group />
      </div>
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end relative shrink-0">
      <div className="relative rounded-[100px] shrink-0 size-[40px]">
        <div className="overflow-clip relative rounded-[inherit] size-[40px]">
          <div className="absolute h-[108.75px] left-[-53.75px] top-[-27.5px] w-[95px]" data-name="image 16">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img} />
          </div>
          <div className="absolute left-[-5px] size-[97.5px] top-[-26.25px]" data-name="image 15">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img1} />
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#f5a623] border-solid inset-0 pointer-events-none rounded-[100px]" />
      </div>
      <div className="relative rounded-[100px] shrink-0 size-[40px]">
        <div className="overflow-clip relative rounded-[inherit] size-[40px]">
          <div className="absolute h-[108.75px] left-[-53.75px] top-[-27.5px] w-[95px]" data-name="image 16">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img} />
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#a8d5ba] border-solid inset-0 pointer-events-none rounded-[100px]" />
      </div>
      <Frame5 />
    </div>
  );
}

function Session() {
  return (
    <div className="content-stretch flex h-[55px] items-center justify-between relative shrink-0 w-full" data-name="Session">
      <Frame17 />
      <Frame34 />
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-center justify-center overflow-clip relative rounded-[100px] shrink-0 size-[32px]">
      <div className="aspect-[24/24] relative shrink-0 w-full" data-name="Component 2">
        <div className="absolute inset-[8.36%_21.87%_12.2%_21.88%]" data-name="Vector">
          <div className="absolute inset-0" style={{ "--fill-0": "rgba(245, 166, 35, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 26">
              <path d={svgPaths.p20104f00} fill="var(--fill-0, #F5A623)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Sun() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[4px] items-center justify-center px-[6px] py-[4px] relative rounded-[4px] shrink-0" data-name="Sun">
      <Frame28 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-end leading-[0] not-italic relative shrink-0 text-[#2c3e50] text-[12px] text-center text-nowrap">
        <p className="leading-[normal] whitespace-pre">23 Days</p>
      </div>
    </div>
  );
}

function Frame30() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center overflow-clip p-[4px] relative rounded-[100px] shrink-0 size-[20px]" style={{ backgroundImage: "linear-gradient(90deg, rgba(245, 166, 35, 0.3) 0%, rgba(245, 166, 35, 0.3) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <div className="aspect-[24/24] relative shrink-0 w-full" data-name="Component 2">
        <div className="absolute inset-[8.36%_21.87%_12.2%_21.88%]" data-name="Vector">
          <div className="absolute inset-0" style={{ "--fill-0": "rgba(245, 166, 35, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 10">
              <path d={svgPaths.p28743a80} fill="var(--fill-0, #F5A623)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame31() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center overflow-clip p-[4px] relative rounded-[100px] shrink-0 size-[20px]" style={{ backgroundImage: "linear-gradient(90deg, rgba(245, 166, 35, 0.3) 0%, rgba(245, 166, 35, 0.3) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <div className="aspect-[24/24] relative shrink-0 w-full" data-name="Component 2">
        <div className="absolute inset-[8.36%_21.87%_12.2%_21.88%]" data-name="Vector">
          <div className="absolute inset-0" style={{ "--fill-0": "rgba(245, 166, 35, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 10">
              <path d={svgPaths.p28743a80} fill="var(--fill-0, #F5A623)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame32() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center overflow-clip p-[4px] relative rounded-[100px] shrink-0 size-[20px]" style={{ backgroundImage: "linear-gradient(90deg, rgba(245, 166, 35, 0.3) 0%, rgba(245, 166, 35, 0.3) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <div className="aspect-[24/24] relative shrink-0 w-full" data-name="Component 2">
        <div className="absolute inset-[8.36%_21.87%_12.2%_21.88%]" data-name="Vector">
          <div className="absolute inset-0" style={{ "--fill-0": "rgba(245, 166, 35, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 10">
              <path d={svgPaths.p28743a80} fill="var(--fill-0, #F5A623)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame33() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center overflow-clip p-[4px] relative rounded-[100px] shrink-0 size-[20px]" style={{ backgroundImage: "linear-gradient(90deg, rgba(245, 166, 35, 0.3) 0%, rgba(245, 166, 35, 0.3) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <div className="aspect-[24/24] relative shrink-0 w-full" data-name="Component 2">
        <div className="absolute inset-[8.36%_21.87%_12.2%_21.88%]" data-name="Vector">
          <div className="absolute inset-0" style={{ "--fill-0": "rgba(245, 166, 35, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 10">
              <path d={svgPaths.p28743a80} fill="var(--fill-0, #F5A623)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame36() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center overflow-clip p-[4px] relative rounded-[100px] shrink-0 size-[20px]" style={{ backgroundImage: "linear-gradient(90deg, rgba(245, 166, 35, 0.3) 0%, rgba(245, 166, 35, 0.3) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <div className="aspect-[24/24] relative shrink-0 w-full" data-name="Component 2">
        <div className="absolute inset-[8.36%_21.87%_12.2%_21.88%]" data-name="Vector">
          <div className="absolute inset-0" style={{ "--fill-0": "rgba(245, 166, 35, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 10">
              <path d={svgPaths.p28743a80} fill="var(--fill-0, #F5A623)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame37() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center overflow-clip p-[4px] relative rounded-[100px] shrink-0 size-[20px]" style={{ backgroundImage: "linear-gradient(90deg, rgba(245, 166, 35, 0.3) 0%, rgba(245, 166, 35, 0.3) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <div className="aspect-[24/24] relative shrink-0 w-full" data-name="Component 2">
        <div className="absolute inset-[8.36%_21.87%_12.2%_21.88%]" data-name="Vector">
          <div className="absolute inset-0" style={{ "--fill-0": "rgba(245, 166, 35, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 10">
              <path d={svgPaths.p28743a80} fill="var(--fill-0, #F5A623)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame38() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center overflow-clip p-[4px] relative rounded-[100px] shrink-0 size-[20px]" style={{ backgroundImage: "linear-gradient(90deg, rgba(245, 166, 35, 0.3) 0%, rgba(245, 166, 35, 0.3) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <div className="aspect-[24/24] relative shrink-0 w-full" data-name="Component 2">
        <div className="absolute inset-[8.36%_21.87%_12.2%_21.88%]" data-name="Vector">
          <div className="absolute inset-0" style={{ "--fill-0": "rgba(245, 166, 35, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 10">
              <path d={svgPaths.p28743a80} fill="var(--fill-0, #F5A623)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame29() {
  return (
    <div className="basis-0 content-stretch flex grow items-start justify-between min-h-px min-w-px relative rounded-[4px] shrink-0">
      <div className="box-border content-stretch flex flex-col gap-[4px] items-center justify-center px-[6px] py-[4px] relative rounded-[4px] shrink-0" data-name="Sun">
        <Frame30 />
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-end leading-[0] not-italic relative shrink-0 text-[#2c3e50] text-[8px] text-center text-nowrap">
          <p className="leading-[normal] whitespace-pre">Sun</p>
        </div>
      </div>
      <div className="box-border content-stretch flex flex-col gap-[4px] items-center justify-center px-[6px] py-[4px] relative rounded-[4px] shrink-0" data-name="Sun">
        <Frame31 />
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-end leading-[0] not-italic relative shrink-0 text-[#2c3e50] text-[8px] text-center text-nowrap">
          <p className="leading-[normal] whitespace-pre">Sun</p>
        </div>
      </div>
      <div className="box-border content-stretch flex flex-col gap-[4px] items-center justify-center px-[6px] py-[4px] relative rounded-[4px] shrink-0" data-name="Sun">
        <Frame32 />
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-end leading-[0] not-italic relative shrink-0 text-[#2c3e50] text-[8px] text-center text-nowrap">
          <p className="leading-[normal] whitespace-pre">Sun</p>
        </div>
      </div>
      <div className="box-border content-stretch flex flex-col gap-[4px] items-center justify-center px-[6px] py-[4px] relative rounded-[4px] shrink-0" data-name="Sun">
        <Frame33 />
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-end leading-[0] not-italic relative shrink-0 text-[#2c3e50] text-[8px] text-center text-nowrap">
          <p className="leading-[normal] whitespace-pre">Sun</p>
        </div>
      </div>
      <div className="box-border content-stretch flex flex-col gap-[4px] items-center justify-center px-[6px] py-[4px] relative rounded-[4px] shrink-0" data-name="Sun">
        <Frame36 />
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-end leading-[0] not-italic relative shrink-0 text-[#2c3e50] text-[8px] text-center text-nowrap">
          <p className="leading-[normal] whitespace-pre">Sun</p>
        </div>
      </div>
      <div className="box-border content-stretch flex flex-col gap-[4px] items-center justify-center px-[6px] py-[4px] relative rounded-[4px] shrink-0" data-name="Sun">
        <Frame37 />
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-end leading-[0] not-italic relative shrink-0 text-[#2c3e50] text-[8px] text-center text-nowrap">
          <p className="leading-[normal] whitespace-pre">Sun</p>
        </div>
      </div>
      <div className="box-border content-stretch flex flex-col gap-[4px] items-center justify-center px-[6px] py-[4px] relative rounded-[4px] shrink-0" data-name="Sun">
        <Frame38 />
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-end leading-[0] not-italic relative shrink-0 text-[#2c3e50] text-[8px] text-center text-nowrap">
          <p className="leading-[normal] whitespace-pre">Sun</p>
        </div>
      </div>
    </div>
  );
}

function Streak() {
  return (
    <div className="bg-white box-border content-center flex flex-wrap gap-[10px] items-center justify-center p-[16px] relative rounded-[16px] shrink-0 w-[370px]" data-name="Streak">
      <div aria-hidden="true" className="absolute border border-[#e2e6e7] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-end leading-[0] not-italic relative shrink-0 text-[#2c3e50] text-[14px] w-[338px]">
        <p className="leading-[normal]">Daily Goal</p>
      </div>
      <Sun />
      <Frame29 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex gap-[10px] items-center justify-center ml-[62.049px] mt-[41px] px-[4px] py-[2px] relative rounded-[4px]" style={{ backgroundImage: "linear-gradient(90deg, rgba(74, 144, 226, 0.5) 0%, rgba(74, 144, 226, 0.5) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-end leading-[0] not-italic relative shrink-0 text-[#4a90e2] text-[14px] text-center text-nowrap">
        <p className="leading-[normal] whitespace-pre">81%</p>
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="[grid-area:1_/_1] ml-[7.049px] mt-[7px] relative size-[115px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 115 115">
          <g id="Ellipse 6">
            <path d={svgPaths.p2153e100} fill="var(--fill-0, white)" />
            <path d={svgPaths.p2153e100} fill="var(--fill-1, #4A90E2)" fillOpacity="0.5" />
            <path d={svgPaths.p2153e100} stroke="var(--stroke-0, black)" />
          </g>
        </svg>
      </div>
      <div className="[grid-area:1_/_1] flex h-[calc(1px*((var(--transform-inner-width)*0.9961169958114624)+(var(--transform-inner-height)*0.08803948014974594)))] items-center justify-center ml-0 mt-0 relative w-[calc(1px*((var(--transform-inner-height)*0.9961169958114624)+(var(--transform-inner-width)*0.08803948014974594)))]" style={{ "--transform-inner-width": "120", "--transform-inner-height": "120" } as React.CSSProperties}>
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
      <Frame19 />
      <div className="[grid-area:1_/_1] h-[10.5px] ml-[86.299px] mt-[38px] relative w-[14.5px]">
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

function Frame7() {
  return (
    <div className="absolute content-stretch flex gap-[10px] items-center justify-center left-[185px] top-[29px] w-[154px]">
      <Group2 />
    </div>
  );
}

function Frame() {
  return (
    <div className="box-border content-stretch flex flex-col items-center justify-center leading-[0] not-italic pb-[4px] pt-0 px-0 relative shrink-0 text-center text-nowrap">
      <div className="flex flex-col font-['Poppins:SemiBold',sans-serif] justify-end mb-[-4px] relative shrink-0 text-[#4a90e2] text-[24px]">
        <p className="leading-[normal] text-nowrap whitespace-pre">6514</p>
      </div>
      <div className="flex flex-col font-['Poppins:Regular',sans-serif] justify-end mb-[-4px] relative shrink-0 text-[#868686] text-[20px]">
        <p className="leading-[normal] text-nowrap whitespace-pre">/8000</p>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="absolute box-border content-stretch flex gap-[10px] items-center justify-center left-[calc(50%+147px)] p-[6px] rounded-[100px] top-[calc(50%-56px)] translate-x-[-50%] translate-y-[-50%]" style={{ backgroundImage: "linear-gradient(90deg, rgba(74, 144, 226, 0.5) 0%, rgba(74, 144, 226, 0.5) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <div className="relative shrink-0 size-[24px]" data-name="Component 3">
        <div className="absolute inset-[8.35%_16.6%_8.42%_16.61%]" data-name="Vector">
          <div className="absolute inset-0" style={{ "--fill-0": "rgba(74, 144, 226, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 20">
              <path d={svgPaths.p38b88200} fill="var(--fill-0, #4A90E2)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col h-[180px] items-start justify-between px-[20px] py-[16px] relative rounded-[16px] shrink-0 w-[370px]">
      <div aria-hidden="true" className="absolute border border-[#e2e6e7] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="flex flex-col font-['Poppins:SemiBold',sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[#4a90e2] text-[16px] text-center text-nowrap">
        <p className="leading-[normal] whitespace-pre">Steps</p>
      </div>
      <Frame7 />
      <Frame />
      <div className="flex flex-col font-['Poppins:Regular',sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[#868686] text-[12px] text-center text-nowrap">
        <p className="leading-[normal] whitespace-pre">6 Nov 2025</p>
      </div>
      <Frame6 />
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-[12px]">
      <div className="h-[30px] rounded-[100px] shrink-0 w-full" style={{ backgroundImage: "linear-gradient(90deg, rgba(74, 144, 226, 0.5) 0%, rgba(74, 144, 226, 0.5) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} />
      <div className="h-[30px] rounded-[100px] shrink-0 w-full" style={{ backgroundImage: "linear-gradient(90deg, rgba(168, 213, 186, 0.5) 0%, rgba(168, 213, 186, 0.5) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} />
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex flex-col h-[60px] items-start justify-center relative shrink-0 w-[12px]">
      <div className="basis-0 grow min-h-px min-w-px rounded-[100px] shrink-0 w-full" style={{ backgroundImage: "linear-gradient(90deg, rgba(74, 144, 226, 0.5) 0%, rgba(74, 144, 226, 0.5) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} />
      <div className="basis-0 grow min-h-px min-w-px rounded-[100px] shrink-0 w-full" style={{ backgroundImage: "linear-gradient(90deg, rgba(168, 213, 186, 0.5) 0%, rgba(168, 213, 186, 0.5) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} />
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-[12px]">
      <div className="h-[35px] rounded-[100px] shrink-0 w-full" style={{ backgroundImage: "linear-gradient(90deg, rgba(74, 144, 226, 0.5) 0%, rgba(74, 144, 226, 0.5) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} />
      <div className="h-[35px] rounded-[100px] shrink-0 w-full" style={{ backgroundImage: "linear-gradient(90deg, rgba(168, 213, 186, 0.5) 0%, rgba(168, 213, 186, 0.5) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} />
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex flex-col h-[50px] items-start justify-center relative shrink-0 w-[12px]">
      <div className="basis-0 grow min-h-px min-w-px rounded-[100px] shrink-0 w-full" style={{ backgroundImage: "linear-gradient(90deg, rgba(74, 144, 226, 0.5) 0%, rgba(74, 144, 226, 0.5) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} />
      <div className="basis-0 grow min-h-px min-w-px rounded-[100px] shrink-0 w-full" style={{ backgroundImage: "linear-gradient(90deg, rgba(168, 213, 186, 0.5) 0%, rgba(168, 213, 186, 0.5) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} />
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex flex-col h-[80px] items-start justify-center relative shrink-0 w-[12px]">
      <div className="basis-0 grow min-h-px min-w-px rounded-[100px] shrink-0 w-full" style={{ backgroundImage: "linear-gradient(90deg, rgba(74, 144, 226, 0.5) 0%, rgba(74, 144, 226, 0.5) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} />
      <div className="basis-0 grow min-h-px min-w-px rounded-[100px] shrink-0 w-full" style={{ backgroundImage: "linear-gradient(90deg, rgba(168, 213, 186, 0.5) 0%, rgba(168, 213, 186, 0.5) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} />
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex flex-col h-[88px] items-start justify-center relative shrink-0 w-[12px]">
      <div className="basis-0 grow min-h-px min-w-px rounded-[100px] shrink-0 w-full" style={{ backgroundImage: "linear-gradient(90deg, rgba(74, 144, 226, 0.5) 0%, rgba(74, 144, 226, 0.5) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} />
      <div className="basis-0 grow min-h-px min-w-px rounded-[100px] shrink-0 w-full" style={{ backgroundImage: "linear-gradient(90deg, rgba(168, 213, 186, 0.5) 0%, rgba(168, 213, 186, 0.5) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} />
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex flex-col h-[90px] items-start justify-center relative shrink-0 w-[12px]">
      <div className="basis-0 grow min-h-px min-w-px rounded-[100px] shrink-0 w-full" style={{ backgroundImage: "linear-gradient(90deg, rgba(74, 144, 226, 0.5) 0%, rgba(74, 144, 226, 0.5) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} />
      <div className="basis-0 grow min-h-px min-w-px rounded-[100px] shrink-0 w-full" style={{ backgroundImage: "linear-gradient(90deg, rgba(168, 213, 186, 0.5) 0%, rgba(168, 213, 186, 0.5) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} />
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex flex-col h-[100px] items-start justify-center relative shrink-0 w-[12px]">
      <div className="basis-0 grow min-h-px min-w-px rounded-[100px] shrink-0 w-full" style={{ backgroundImage: "linear-gradient(90deg, rgba(74, 144, 226, 0.5) 0%, rgba(74, 144, 226, 0.5) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} />
      <div className="basis-0 grow min-h-px min-w-px rounded-[100px] shrink-0 w-full" style={{ backgroundImage: "linear-gradient(90deg, rgba(168, 213, 186, 0.5) 0%, rgba(168, 213, 186, 0.5) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} />
    </div>
  );
}

function SleepTracker() {
  return (
    <div className="h-[100px] relative shrink-0 w-full" data-name="sleep tracker">
      <div className="flex flex-row items-end size-full">
        <div className="box-border content-stretch flex h-[100px] items-end justify-between px-[16px] py-0 relative w-full">
          <Frame20 />
          <Frame21 />
          <Frame22 />
          <Frame21 />
          <Frame23 />
          <Frame21 />
          <Frame24 />
          <Frame25 />
          <Frame26 />
          {[...Array(2).keys()].map((_, i) => (
            <Frame27 key={i} />
          ))}
          <Frame26 />
        </div>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-[15.56%_14.3%_12.5%_12.5%]" data-name="Group">
      <div className="absolute inset-[-5.79%_-5.69%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
          <g id="Group">
            <path d={svgPaths.p3912a910} fill="var(--fill-0, #A8D5BA)" id="Vector" stroke="var(--stroke-0, #A8D5BA)" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p1221fb80} id="Vector_2" stroke="var(--stroke-0, #A8D5BA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="absolute box-border content-stretch flex gap-[10px] items-center justify-center left-[314px] p-[6px] rounded-[100px] top-[16px]" style={{ backgroundImage: "linear-gradient(90deg, rgba(168, 213, 186, 0.5) 0%, rgba(168, 213, 186, 0.5) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <div className="relative shrink-0 size-[24px]" data-name="Component 3">
        <Group1 />
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col h-[200px] items-start justify-between px-[20px] py-[16px] relative rounded-[16px] shrink-0 w-[370px]">
      <div aria-hidden="true" className="absolute border border-[#e2e6e7] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="flex flex-col font-['Poppins:SemiBold',sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[#2c3e50] text-[16px] text-center text-nowrap">
        <p className="leading-[normal] whitespace-pre">Sleep</p>
      </div>
      <div className="flex flex-col font-['Poppins:Regular',sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[#868686] text-[12px] text-center text-nowrap">
        <p className="leading-[normal] whitespace-pre">Sleep Score 78</p>
      </div>
      <SleepTracker />
      <div className="flex flex-col font-['Poppins:Regular',sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[#868686] text-[12px] text-center text-nowrap">
        <p className="leading-[normal] whitespace-pre">7.5 h</p>
      </div>
      <Frame8 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="bg-[rgba(49,11,1,0.2)] box-border content-stretch flex gap-[10px] items-center justify-center p-[6px] relative rounded-[100px] shrink-0">
      <div className="relative shrink-0 size-[24px]" data-name="Component 3">
        <div className="absolute inset-[15.63%_6.25%_9.39%_6.25%]" data-name="Vector">
          <div className="absolute inset-0" style={{ "--fill-0": "rgba(49, 11, 1, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 18">
              <path d={svgPaths.p38ea9b00} fill="var(--fill-0, #310B01)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="absolute content-center flex flex-wrap gap-[8px] items-center leading-[0] left-[12px] not-italic text-[#260401] top-[119px] w-[154px]">
      <div className="flex flex-col font-['Poppins:Bold',sans-serif] justify-end relative shrink-0 text-[20px] text-center text-nowrap">
        <p className="leading-[normal] whitespace-pre">73.2</p>
      </div>
      <div className="flex flex-col font-['Poppins:Light',sans-serif] justify-end relative shrink-0 text-[12px] text-center text-nowrap">
        <p className="leading-[normal] whitespace-pre">bpm</p>
      </div>
      <div className="flex flex-col font-['Poppins:Regular',sans-serif] justify-end relative shrink-0 text-[10px] w-[78px]">
        <p className="leading-[normal]">16:32 4, Nov</p>
      </div>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute h-[44.252px] left-[7px] top-[67px] w-[153px]">
      <div className="absolute inset-[-2.25%_-0.65%_-2.26%_-0.33%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 155 47">
          <g id="Group 4">
            <g id="Vector 3">
              <path d={svgPaths.p433d00} fill="url(#paint0_linear_40_1259)" />
              <path d={svgPaths.p1ba9e600} fill="#80646F" />
            </g>
            <path d={svgPaths.p14840500} id="Vector 4" stroke="var(--stroke-0, #310B01)" strokeLinecap="round" strokeWidth="2" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_40_1259" x1="0.500243" x2="153" y1="23.1212" y2="23.1212">
              <stop offset="0.653846" stopColor="#80646F" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="bg-white box-border content-start flex flex-wrap items-start justify-between p-[16px] relative rounded-[16px] shrink-0 size-[177px]">
      <div aria-hidden="true" className="absolute border border-[#e2e6e7] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="flex flex-col font-['Poppins:SemiBold',sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[#260401] text-[16px] text-center text-nowrap">
        <p className="leading-[normal] whitespace-pre">HRV</p>
      </div>
      <Frame9 />
      <Frame10 />
      <Group3 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="bg-[#e2e6e7] box-border content-stretch flex gap-[10px] items-center justify-center p-[6px] relative rounded-[100px] shrink-0">
      <div className="relative shrink-0 size-[24px]" data-name="Component 3">
        <div className="absolute inset-[8.35%_16.6%_8.42%_16.61%]" data-name="Vector">
          <div className="absolute inset-0" style={{ "--fill-0": "rgba(49, 11, 1, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 20">
              <path d={svgPaths.p38b88200} fill="var(--fill-0, #310B01)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Group4() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="[grid-area:1_/_1] ml-[4.208px] mt-[4.208px] relative size-[100px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d={svgPaths.p2ab9d900} fill="var(--fill-0, #EBEFF0)" id="Ellipse 6" />
        </svg>
      </div>
      <div className="[grid-area:1_/_1] flex h-[calc(1px*((var(--transform-inner-width)*0.9961169958114624)+(var(--transform-inner-height)*0.08803948014974594)))] items-center justify-center ml-0 mt-0 relative w-[calc(1px*((var(--transform-inner-height)*0.9961169958114624)+(var(--transform-inner-width)*0.08803948014974594)))]" style={{ "--transform-inner-width": "100", "--transform-inner-height": "100" } as React.CSSProperties}>
        <div className="flex-none rotate-[95.051deg]">
          <div className="relative size-[100px]">
            <div className="absolute bottom-0 left-0 right-[0.06%] top-[10.55%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 100 90">
                <path d={svgPaths.p38ff1d00} fill="var(--fill-0, #310B01)" id="Ellipse 5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="[grid-area:1_/_1] flex flex-col font-['Poppins:Bold',sans-serif] justify-end ml-[54.208px] mt-[58.208px] not-italic relative text-[#310b01] text-[16px] text-center text-nowrap translate-x-[-50%] translate-y-[-100%]">
        <p className="leading-[normal] whitespace-pre">6514</p>
      </div>
      <div className="[grid-area:1_/_1] flex flex-col font-['Poppins:Light',sans-serif] justify-end ml-[54.708px] mt-[74.208px] not-italic relative text-[#310b01] text-[12px] text-center text-nowrap translate-x-[-50%] translate-y-[-100%]">
        <p className="leading-[normal] whitespace-pre">/8000</p>
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="absolute content-stretch flex gap-[10px] items-center justify-center left-[12px] top-[35px] w-[154px]">
      <Group4 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="bg-white box-border content-start flex flex-wrap items-start justify-between p-[16px] relative rounded-[16px] shrink-0 size-[177px]">
      <div aria-hidden="true" className="absolute border border-[#e2e6e7] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="flex flex-col font-['Poppins:Medium',sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[#310b01] text-[12px] text-center text-nowrap">
        <p className="leading-[normal] whitespace-pre">Blood Oxygen</p>
      </div>
      <Frame14 />
      <Frame15 />
    </div>
  );
}

function Widget() {
  return (
    <div className="content-start flex flex-wrap gap-[16px] h-[747px] items-start overflow-clip relative shrink-0 w-[370px]" data-name="widget">
      <Streak />
      <Frame12 />
      <Frame11 />
      <Frame13 />
      <Frame16 />
    </div>
  );
}

function AddiBar() {
  return (
    <div className="absolute box-border content-stretch flex gap-[16px] items-center justify-end left-px px-[28px] py-0 top-[792px] w-[440px]" data-name="addi bar">
      <div className="bg-white content-stretch flex gap-[10px] items-center justify-center opacity-80 relative rounded-[100px] shrink-0 size-[60px]">
        <div aria-hidden="true" className="absolute border-2 border-[#ecf0f1] border-solid inset-0 pointer-events-none rounded-[100px] shadow-[0px_0px_4px_0px_rgba(255,255,255,0.5),0px_4px_4px_0px_rgba(177,177,177,0.25)]" />
        <div className="relative shrink-0 size-[24px]" data-name="Component 2">
          <div className="absolute inset-[12.5%]" data-name="Vector">
            <div className="absolute inset-[-119.444%]" style={{ "--stroke-0": "rgba(44, 62, 80, 1)" } as React.CSSProperties}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 61 61">
                <g filter="url(#filter0_d_43_476)" id="Vector">
                  <path d={svgPaths.p1b2d5d00} shapeRendering="crispEdges" stroke="var(--stroke-0, #2C3E50)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="61" id="filter0_d_43_476" width="61" x="0" y="0">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="10" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.172549 0 0 0 0 0.243137 0 0 0 0 0.313726 0 0 0 0.2 0" />
                    <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_43_476" />
                    <feBlend in="SourceGraphic" in2="effect1_dropShadow_43_476" mode="normal" result="shape" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white content-stretch flex gap-[10px] items-center justify-center opacity-80 relative rounded-[100px] shrink-0 size-[60px]">
        <div aria-hidden="true" className="absolute border-2 border-[#ecf0f1] border-solid inset-0 pointer-events-none rounded-[100px] shadow-[0px_0px_4px_0px_rgba(255,255,255,0.5),0px_4px_4px_0px_rgba(177,177,177,0.25)]" />
        <div className="relative shrink-0 size-[32px]" data-name="Component 2">
          <div className="absolute inset-[20.82%_20.83%_20.84%_20.83%]" data-name="Vector">
            <div className="absolute inset-[-107.143%]" style={{ "--fill-0": "rgba(44, 62, 80, 1)" } as React.CSSProperties}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 59 59">
                <g filter="url(#filter0_d_43_486)" id="Vector">
                  <path d={svgPaths.p16eec7c0} fill="var(--fill-0, #2C3E50)" />
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="58.6667" id="filter0_d_43_486" width="58.6667" x="0" y="0">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="10" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.172549 0 0 0 0 0.243137 0 0 0 0 0.313726 0 0 0 0.2 0" />
                    <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_43_486" />
                    <feBlend in="SourceGraphic" in2="effect1_dropShadow_43_486" mode="normal" result="shape" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-[rgba(74,144,226,0)] box-border content-stretch flex flex-col h-full items-center justify-center mr-[-4.4px] px-[22px] py-0 relative rounded-[110px] shrink-0 w-[94px]">
      <div className="overflow-clip relative shrink-0 size-[36.3px]" data-name="Component 2">
        <div className="absolute inset-[15.24%_16.67%_16.66%_16.67%]" data-name="Vector">
          <div className="absolute inset-[-6.12%_-6.25%]" style={{ "--stroke-0": "rgba(74, 144, 226, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 26">
              <path d={svgPaths.p3cae4500} id="Vector" stroke="var(--stroke-0, #4A90E2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.75" />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[13px] justify-end leading-[0] not-italic relative shrink-0 text-[#4a90e2] text-[10px] text-center w-[64px]">
        <p className="leading-[normal]">Home</p>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="box-border content-stretch flex flex-col h-full items-center justify-center mr-[-4.4px] px-[22px] py-0 relative rounded-[110px] shrink-0 w-[94px]">
      <div className="relative shrink-0 size-[39.93px]" data-name="Component 2">
        <div className="absolute aspect-[19.8/26.4] left-[24.24%] right-[21.21%] top-[calc(50%+0.55px)] translate-y-[-50%]" data-name="Vector">
          <div className="absolute inset-[-2.08%_-2.78%]" style={{ "--fill-0": "rgba(134, 134, 134, 1)", "--stroke-0": "rgba(134, 134, 134, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 28">
              <path d={svgPaths.p2aac9880} fill="var(--fill-0, #868686)" id="Vector" stroke="var(--stroke-0, #868686)" strokeWidth="1.1" />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[13px] justify-end leading-[0] not-italic relative shrink-0 text-[#868686] text-[10px] text-center w-[64px]">
        <p className="leading-[normal]">Course</p>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="box-border content-stretch flex flex-col h-full items-center justify-center mr-[-4.4px] px-[22px] py-0 relative rounded-[110px] shrink-0 w-[94px]">
      <div className="overflow-clip relative shrink-0 size-[33px]" data-name="Component 2">
        <div className="absolute inset-[20.83%_12.5%_16.67%_12.5%]" data-name="Vector">
          <div className="absolute inset-[-6.67%_-5.56%]" style={{ "--stroke-0": "rgba(134, 134, 134, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 24">
              <path d={svgPaths.p18109d00} id="Vector" stroke="var(--stroke-0, #868686)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.75" />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[13px] justify-end leading-[0] not-italic relative shrink-0 text-[#868686] text-[10px] text-center w-[64px]">
        <p className="leading-[normal]">Challenge</p>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="box-border content-stretch flex flex-col h-full items-center justify-center mr-[-4.4px] px-[22px] py-0 relative rounded-[110px] shrink-0 w-[94px]">
      <div className="overflow-clip relative shrink-0 size-[36.3px]" data-name="Component 2">
        <div className="absolute bottom-[20.83%] left-1/4 right-1/4 top-[16.67%]" data-name="Vector">
          <div className="absolute inset-[-6.67%_-8.33%]" style={{ "--stroke-0": "rgba(134, 134, 134, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 24">
              <path d={svgPaths.p37b5bf80} id="Vector" stroke="var(--stroke-0, #868686)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.75" />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[13px] justify-end leading-[0] not-italic relative shrink-0 text-[#868686] text-[10px] text-center w-[64px]">
        <p className="leading-[normal]">Profile</p>
      </div>
    </div>
  );
}

function Frame18() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[10px] items-center justify-center left-0 top-[870px] w-[440px]">
      <div className="bg-[rgba(255,255,255,0.8)] box-border content-stretch flex h-[64px] items-center justify-between pl-[2px] pr-[6.4px] py-[2px] relative rounded-[110px] shrink-0 w-[360px]" data-name="tool bar">
        <div aria-hidden="true" className="absolute border-2 border-[#e7e7e7] border-solid inset-0 pointer-events-none rounded-[110px] shadow-[0px_2.2px_4.4px_0px_rgba(0,0,0,0.15)]" />
        <Frame1 />
        <Frame2 />
        <Frame3 />
        <Frame4 />
      </div>
    </div>
  );
}

function GardenSpeechBubblePlainFill() {
  return (
    <div className="bg-[#fcfcfc] box-border content-stretch flex flex-col gap-[10px] items-start p-[12px] relative rounded-[8px] shrink-0" data-name="garden:speech-bubble-plain-fill-12">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black w-[269px]">
        <p className="leading-[normal]">Good to see you! Ready to check in and start your wellness journey today? 🌟</p>
      </div>
      <div className="absolute h-[76.582px] left-0 top-0 w-[293px]" data-name="Union">
        <div className="absolute inset-0" style={{ "--stroke-0": "rgba(226, 230, 231, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 293 77">
            <g id="Union">
              <mask fill="white" id="path-1-inside-1_43_466">
                <path d={svgPaths.p39509700} />
              </mask>
              <path d={svgPaths.p3cd58180} fill="var(--stroke-0, #E2E6E7)" mask="url(#path-1-inside-1_43_466)" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame35() {
  return (
    <div className="overflow-clip relative rounded-[110px] shrink-0 size-[55px]">
      <div className="absolute h-[135.3px] left-[-11px] top-[-40.7px] w-[76.106px]" data-name="WhatsApp Image 2025-11-09 at 16.39.59_d16307ea 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgWhatsAppImage20251109At163959D16307Ea1} />
      </div>
    </div>
  );
}

function SppechBubble() {
  return (
    <div className="absolute content-center flex flex-wrap gap-[24px] items-center left-[32px] top-[715px] w-[291px]" data-name="sppech bubble">
      <GardenSpeechBubblePlainFill />
      <Frame35 />
    </div>
  );
}

export default function Home() {
  return (
    <div className="bg-[#fcfcfc] relative size-full" data-name="Home">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[28px] items-start pb-[56px] pt-[70px] px-[32px] relative size-full">
          <Session />
          <Widget />
          <div className="absolute bg-gradient-to-t from-[rgba(217,217,217,0.8)] h-[288px] left-0 to-54% to-[rgba(255,255,255,0)] top-[669px] w-[440px]" />
          <AddiBar />
          <Frame18 />
          <SppechBubble />
        </div>
      </div>
    </div>
  );
}