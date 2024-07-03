import React from 'react';
import QuestionBox from 'Components/QuestionBox';

// 임의 페이지
function QuestionPage() {
  return (
    //<div className="terminal w-screen h-screen text-white font-[DungGeunMo] ">
    <div className="terminal bg-[#2B2299] text-white font-[DungGeunMo] border-2 rounded-md p-5 m-2">
      <header className="flex flex-row justify-between bg-gray-300 text-black w-full px-1 text-xl">
        <span className="left">WEBTI v1.0</span>
        <span className="right"></span>
      </header>
      <QuestionBox />
    </div>
  );
}

export default QuestionPage;
