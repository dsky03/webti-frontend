import React, { useState, useEffect } from "react";

interface TypingEffectProps {
  text: string; // 출력할 테스트
  speed?: number; // 타이핑 속도 (기본값은 40ms)
  onComplete?: () => void; // 타이핑 완료 -> 콜백
}

const TypingEffect: React.FC<TypingEffectProps> = ({
  text,
  speed = 40,
  onComplete,
}) => {
  const [displayedText, setDisplayedText] = useState<string>(""); // 화면에 표시되는 텍스트
  const [index, setIndex] = useState<number>(0); // 텍스트의 인덱스

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text[index]); //한 글자씩 추가
        setIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(typingInterval); //인터벌 카운트 제거
        if (onComplete) onComplete(); // 콜백
      }
    }, speed);

    return () => clearInterval(typingInterval); // 언마운트 시 인터벌 제거
  }, [index, text, speed, onComplete]);

  return <pre>{displayedText}</pre>;
};

export default TypingEffect;
