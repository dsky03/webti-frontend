import React, { useEffect, useState } from "react";
import { getQuestions, Question, UserAnswer } from "util/api/api";
import TypingEffect from "./TypingEffect";
import { Link } from "react-router-dom";

function QuestionBox() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const [answer, setAnswer] = useState<UserAnswer>({
    EXTROVERSION: 0,
    INTROVERSION: 0,
    SENSING: 0,
    INTUITION: 0,
    THINKING: 0,
    FEELING: 0,
    JUDGING: 0,
    PERCEIVING: 0,
  });

  // 질문 fetch
  useEffect(() => {
    const fetch = async () => {
      const res = await getQuestions();
      if (res?.success !== "true") {
        // 예외 처리
      }
      console.log(res.data);
      setQuestions(res.data);
    };
    fetch();
  }, []);

  const next = () => {
    setCurrentIndex(currentIndex + 1);
    setShowAnswer(false);
  };

  const submitAnswer = async (answer: UserAnswer) => {
    throw new Error("Function not implemented.");
  };

  if (questions.length === 0) {
    return (
      <div className="box shadow-[16px_16px_0_0_black] bg-black text-black m-4 w-fit mx-auto p-2 transition-colors">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="box shadow-[16px_16px_0_0_black] bg-gray-300 text-black m-5 w-fit mx-auto p-2 transition-colors min-w-96">
        <h1 className="border-2 border-black p-4 py-3 border-double ">
          Question: <br />
          <TypingEffect
            text={questions[currentIndex].question}
            speed={25}
            onComplete={() => setShowAnswer(true)}
          />
        </h1>
        <br />
        {showAnswer && (
          <>
            Answer&gt; <br />
            <ul className="flex flex-col gap-5 py-8 w-fit mx-auto">
              {questions[currentIndex].options.map((opt, idx) => (
                <button
                  key={idx}
                  className="px-2 bg-blue-700 text-white w-fit"
                  onClick={() => {
                    setAnswer({
                      ...answer,
                      [opt.personalityType]:
                        answer[opt.personalityType] + opt.score,
                    });
                    if (currentIndex < questions.length - 1) {
                      next();
                    } else {
                      // 결과 페이지로 이동
                      submitAnswer(answer);
                    }
                  }}
                >
                  <TypingEffect text={opt.answer} speed={25} />
                </button>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}

export default QuestionBox;
