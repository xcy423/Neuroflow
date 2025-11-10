function Frame() {
  return (
    <div className="box-border content-stretch flex gap-[12px] h-[54.476px] items-center justify-center mr-[-8px] overflow-clip px-[28px] py-[3px] relative rounded-[100px] shrink-0">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-end leading-[0] not-italic relative shrink-0 text-[#2c3e50] text-[16px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">My Challenges</p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[12px] h-[54.476px] items-center justify-center mr-[-8px] overflow-clip px-[28px] py-[3px] relative rounded-[100px] shrink-0">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-end leading-[0] not-italic relative shrink-0 text-[#2c3e50] text-[16px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">Discover</p>
      </div>
      <Component3 />
    </div>
  );
}

function Session() {
  return (
    <div className="bg-[#ecf0f1] box-border content-stretch flex items-center pl-[2px] pr-[10px] py-[2px] relative rounded-[100px] shrink-0" data-name="Session">
      <Frame />
      <Frame1 />
    </div>
  );
}

export default function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-center justify-center relative size-full">
      <Session />
    </div>
  );
}