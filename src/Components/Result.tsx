import React, { useEffect, useState } from 'react';
import {
  postAnswers,
  submitAnswer,
  SurveyData,
  UserAnswer,
} from 'util/api/api';
import TypingEffect from './TypingEffect';

export interface Props {
  onSubmit: () => void;
}

const Result: React.FC<Props> = ({ onSubmit }: Props) => {
  const [surveyData, setSurveyData] = useState<SurveyData | null>(null);
  const [typingCompleted, setTypingCompleted] = useState(false);

  const [input, setInput] = useState<string>(''); // 사용자 입력
  const [inputEnabled, setInputEnabled] = useState<boolean>(false); // 입력 동안 키보드 이벤트 막기

  const [isSubmited, setSubmited] = useState<boolean>(false); // 결과 제출 여부

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (inputEnabled) {
      setInput(e.target.value); // 입력값 업데이트
    }
  };

  // 결과 가져오기
  useEffect(() => {
    if (!localStorage.getItem('answer')) {
      return;
    }
    const answer = JSON.parse(localStorage.getItem('answer')!) as UserAnswer;
    postAnswers(answer)
      .then((data) => {
        setSurveyData(data.data);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (inputEnabled && e.key === 'Enter') {
      const trimmedInput = input.trim().toLowerCase(); // 대소문자 구분 X
      if (trimmedInput === 'yes' || trimmedInput === 'no') {
        submitAnswer(surveyData!.mbtiType, trimmedInput === 'yes');
        setSubmited(true);
        onSubmit();
      }
    }
  };

  if (!surveyData) {
    return <p>Loading...</p>;
  }

  // 결과 text
  const resultText = `\nYour webti result : \n${surveyData.result}\n\n`;

  return (
    <div className="survey-result mb-20">
      <TypingEffect
        text={resultText}
        speed={20}
        onComplete={() => setTypingCompleted(true)}
      />
      {typingCompleted && (
        <div className="result-content">
          <img
            className="result-image"
            src={surveyData.imageDto.url}
            alt="result-image"
          />
          <div className="description-box break-all">
            <TypingEffect
              text={surveyData.description}
              speed={20}
              onComplete={() => setInputEnabled(true)}
            />
          </div>
        </div>
      )}
      {inputEnabled && (
        <div className="commands mt-4">
          <p>결과가 만족스러운가요? yes/no</p>
          {!isSubmited ? (
            <p>
              &gt;&gt;&gt;{' '}
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                className="bg-black text-white outline-none"
                autoFocus
              />
            </p>
          ) : (
            <>
              <p>&gt;&gt;&gt; {input}</p>
              <p>{input}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Result;
