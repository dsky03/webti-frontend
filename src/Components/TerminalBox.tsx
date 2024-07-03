export interface Props {
  children: React.ReactNode;
  isBlue?: boolean;
}

const TerminalBox = ({ children, isBlue }: Props) => {
  return (
    <>
      {/* tailwind : rgb값 -> hex값으로 변환 */}
      {/* 상단 바 */}
      <div className="m-2 mb-0 p-4 h-8 bg-[#2b2b2b] rounded-t-lg flex items-center font-[DungGeunMo]">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <span className="text-white text-sm ml-auto">cmd</span>
      </div>
      <div
        className={
          !isBlue
            ? 'terminal bg-black text-white font-[DungGeunMo] border-2 border-[#2b2b2b] rounded-b-lg p-5 m-2 mt-0'
            : 'terminal bg-[#2B2299] text-white font-[DungGeunMo] border-2 border-[#2b2b2b] rounded-b-lg p-5 m-2 mt-0'
        }
      >
        {children}
      </div>
    </>
  );
};

export default TerminalBox;
