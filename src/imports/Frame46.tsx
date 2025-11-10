export default function Frame() {
  return (
    <div className="bg-white relative rounded-[100px] size-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center justify-center overflow-clip px-[28px] py-[3px] relative size-full">
          <Component3 />
          <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-end leading-[0] not-italic relative shrink-0 text-[#2c3e50] text-[16px] text-nowrap">
            <p className="leading-[normal] whitespace-pre">My Challenges</p>
          </div>
        </div>
      </div>
    </div>
  );
}