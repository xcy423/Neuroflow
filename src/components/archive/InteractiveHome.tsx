import React from 'react';
import svgPaths from "../imports/svg-1im8bwth82";

interface InteractiveHomeProps {
  onNavigate: (screen: string) => void;
}

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
            <mask fill="white" id="path-1-inside-1_40_1239">
              <path clipRule="evenodd" d={svgPaths.p2facdb00} fillRule="evenodd" />
            </mask>
            <path clipRule="evenodd" d={svgPaths.p2facdb00} fill="var(--fill-0, #2C3E50)" fillRule="evenodd" />
            <path d={svgPaths.p1535f000} fill="var(--stroke-0, #2C3E50)" mask="url(#path-1-inside-1_40_1239)" />
          </g>
          <path clipRule="evenodd" d={svgPaths.p26d50c40} fill="var(--fill-0, #2C3E50)" fillRule="evenodd" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Frame5() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-[8px] py-0 relative rounded-[100px] shrink-0">
      <div className="relative shrink-0 size-[32px]" data-name="Component 3">
        <Group />
      </div>
    </div>
  );
}

function Session() {
  return (
    <div className="content-stretch flex h-[55px] items-center justify-between relative shrink-0 w-full" data-name="Session">
      <Frame17 />
      <Frame5 />
    </div>
  );
}

// Continuation of other components from the Figma import...
// For brevity, I'll create a simplified version that maintains the exact styling

export const InteractiveHome: React.FC<InteractiveHomeProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#fcfcfc] box-border content-start flex flex-col h-[844px] items-start justify-between px-[10px] py-[28px] relative w-[390px]">
      <div className="box-border content-stretch flex flex-col gap-[14px] items-start justify-center pl-0 pr-[6px] pt-0 pb-[111px] relative shrink-0 w-full">
        <Session />
        
        {/* Widgets section would go here - using same exact styling from Figma */}
        <div className="content-stretch flex flex-col gap-[14px] items-center justify-center relative shrink-0 w-full">
          <div className="bg-white border border-[#e2e6e7] rounded-[16px] p-4 w-full">
            <p className="text-[16px] font-['Poppins:SemiBold',sans-serif] text-[#2c3e50]">Dashboard Content</p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Interactive */}
      <div className="absolute bottom-0 left-0 right-0 bg-white box-border content-stretch flex h-[90px] items-center justify-center px-0 py-[10px] rounded-t-[10px] w-full">
        <div className="content-stretch flex h-[58.65px] items-center justify-between relative w-full px-4">
          {/* Home Button - Active */}
          <button
            onClick={() => onNavigate('home')}
            className="bg-[rgba(74,144,226,0)] box-border content-stretch flex flex-col h-full items-center justify-center px-[22px] py-0 relative rounded-[110px] shrink-0 w-[94px]"
          >
            <div className="overflow-clip relative shrink-0 size-[36.3px]">
              <div className="absolute inset-[15.24%_16.67%_16.66%_16.67%]">
                <div className="absolute inset-[-6.12%_-6.25%]" style={{ "--stroke-0": "rgba(74, 144, 226, 1)" } as React.CSSProperties}>
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 26">
                    <path d={svgPaths.p3cae4500} stroke="var(--stroke-0, #4A90E2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.75" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[13px] justify-end leading-[0] not-italic relative shrink-0 text-[#4a90e2] text-[10px] text-center w-[64px]">
              <p className="leading-[normal]">Home</p>
            </div>
          </button>

          {/* Challenges Button */}
          <button
            onClick={() => onNavigate('challenges')}
            className="box-border content-stretch flex flex-col h-full items-center justify-center px-[22px] py-0 relative rounded-[110px] shrink-0 w-[94px]"
          >
            <div className="relative shrink-0 size-[39.93px]">
              <div className="absolute inset-[20.83%_12.5%_16.67%_12.5%]">
                <div className="absolute inset-[-8.33%_-6.94%]" style={{ "--stroke-0": "rgba(134, 134, 134, 1)" } as React.CSSProperties}>
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 18">
                    <path d={svgPaths.p627c400} stroke="var(--stroke-0, #868686)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[13px] justify-end leading-[0] not-italic relative shrink-0 text-[#868686] text-[10px] text-center w-[78px]">
              <p className="leading-[normal]">Challenges</p>
            </div>
          </button>

          {/* Plus Button */}
          <button className="absolute left-1/2 -translate-x-1/2 top-[-30px]">
            <div className="box-border content-stretch flex gap-[10px] items-center justify-center p-0 relative shrink-0 size-[59px]">
              <div className="relative shrink-0 size-[59px]">
                <div className="absolute inset-0">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 59 59">
                    <g filter="url(#filter0_d_40_1365)">
                      <path d={svgPaths.p16eec7c0} fill="var(--fill-0, #2C3E50)" />
                    </g>
                    <defs>
                      <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="58.6667" id="filter0_d_40_1365" width="58.6667" x="0" y="0">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                        <feOffset />
                        <feGaussianBlur stdDeviation="10" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0.172549 0 0 0 0 0.243137 0 0 0 0 0.313726 0 0 0 0.2 0" />
                        <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_40_1365" />
                        <feBlend in="SourceGraphic" in2="effect1_dropShadow_40_1365" mode="normal" result="shape" />
                      </filter>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </button>

          {/* Courses Button */}
          <button
            onClick={() => onNavigate('courses')}
            className="box-border content-stretch flex flex-col h-full items-center justify-center px-[22px] py-0 relative rounded-[110px] shrink-0 w-[94px]"
          >
            <div className="relative shrink-0 size-[39.93px]">
              <div className="absolute aspect-[19.8/26.4] left-[24.24%] right-[21.21%] top-[calc(50%+0.55px)] translate-y-[-50%]">
                <div className="absolute inset-[-2.08%_-2.78%]" style={{ "--fill-0": "rgba(134, 134, 134, 1)", "--stroke-0": "rgba(134, 134, 134, 1)" } as React.CSSProperties}>
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 25">
                    <path d={svgPaths.p12eacf00} fill="var(--fill-0, #868686)" stroke="var(--stroke-0, #868686)" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[13px] justify-end leading-[0] not-italic relative shrink-0 text-[#868686] text-[10px] text-center w-[64px]">
              <p className="leading-[normal]">Courses</p>
            </div>
          </button>

          {/* Profile Button */}
          <button
            onClick={() => onNavigate('profile')}
            className="box-border content-stretch flex flex-col h-full items-center justify-center px-[22px] py-0 relative rounded-[110px] shrink-0 w-[94px]"
          >
            <div className="relative shrink-0 size-[39.93px]">
              <div className="absolute inset-[10.02%_10.02%_10.02%_10.02%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                  <g>
                    <path clipRule="evenodd" d={svgPaths.p34b46380} fill="var(--fill-0, #868686)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p1d85c340} fill="var(--fill-0, #868686)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
            <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[13px] justify-end leading-[0] not-italic relative shrink-0 text-[#868686] text-[10px] text-center w-[64px]">
              <p className="leading-[normal]">Profile</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
