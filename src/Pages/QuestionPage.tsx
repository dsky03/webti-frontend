import React from 'react';
import QuestionBox from 'Components/QuestionBox';
import TerminalBox from 'Components/TerminalBox';

// 임의 페이지
function QuestionPage() {
  return (
    <TerminalBox isBlue>
      <header className="flex flex-row justify-between bg-gray-300 text-black w-full px-1 text-xl">
        <span className="left">WEBTI v1.0</span>
        <span className="right"></span>
      </header>
      <QuestionBox />
    </TerminalBox>
  );
}

export default QuestionPage;
