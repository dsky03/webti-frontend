import "../App.css";
import ResultChart from "Components/ResultChart";
import Result from "Components/Result";

function ResultPage() {
  return (
    <>
      {/* 상단 바 */}
      <div className="m-2 mb-0 p-4 h-8 bg-[#2b2b2b] rounded-t-lg flex items-center font-mono">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <span className="text-white text-sm ml-auto">cmd</span>
      </div>
      <div className="terminal bg-black text-white font-mono border-2 border-[#2b2b2b] rounded-b-lg p-5 m-2 mt-0">
        <Result />
        <ResultChart></ResultChart>
      </div>
    </>
  );
}

export default ResultPage;
