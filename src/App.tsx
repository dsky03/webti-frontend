import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css"; // 일단은 사용...
import QuestionPage from "Pages/QuestionPage";
import TypingEffect from "Components/TypingEffect";
import Dropdown from "Components/DropDown";

function Terminal() {
  const [input, setInput] = useState<string>(""); // 사용자 입력
  const [content, setContent] = useState<Array<JSX.Element>>([]); // 출력할 콘텐츠
  const [inputEnabled, setInputEnabled] = useState<boolean>(false); // 입력 동안 키보드 이벤트 막기
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (inputEnabled) {
      setInput(e.target.value); // 입력값 업데이트
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (inputEnabled && e.key === "Enter") {
      const trimmedInput = input.trim().toLowerCase(); // 대소문자 구분 X
      if (trimmedInput === "start") {
        navigate("/question"); // 설문 조사 시작
      } else if (trimmedInput === "about") {
        setInputEnabled(false); // 입력 막고 about 출력
        setContent((prevContent) => [
          ...prevContent,
          <p>&gt;&gt;&gt; {input}</p>,
          <TypingEffect
            key={prevContent.length + 1}
            text={aboutText}
            speed={20}
            onComplete={() => setInputEnabled(true)}
          />,
        ]);
      } else if (trimmedInput === "clear") {
        // 초기값 제외하고 다 지우기
        setContent([
          <TypingEffect
            key={0}
            text={initialText}
            speed={20}
            onComplete={() => setInputEnabled(true)}
          />,
        ]);
      } else {
        // echo
        setContent((prevContent) => [
          ...prevContent,
          <p>&gt;&gt;&gt; {input}</p>,
          <TypingEffect
            key={prevContent.length}
            text={`${input}`}
            speed={20}
          />,
        ]);
      }
      setInput("");
    }
  };

  const handleCommand = (command: string) => {
    const trimmedInput = command.trim().toLowerCase();
    if (trimmedInput === "start") {
      navigate("/question");
    } else if (trimmedInput === "about") {
      setInputEnabled(false);
      setContent((prevContent) => [
        ...prevContent,
        <p>&gt;&gt;&gt; {command}</p>,
        <TypingEffect
          key={prevContent.length + 1}
          text={aboutText}
          speed={20}
          onComplete={() => setInputEnabled(true)}
        />,
      ]);
    } else if (trimmedInput === "clear") {
      setContent([
        <TypingEffect
          key={0}
          text={initialText}
          speed={20}
          onComplete={() => setInputEnabled(true)}
        />,
      ]);
    } else {
      setContent((prevContent) => [
        ...prevContent,
        <p>&gt;&gt;&gt; {command}</p>,
        <TypingEffect
          key={prevContent.length}
          text={`${command}`}
          speed={20}
        />,
      ]);
    }
    setInput("");
  };

  const initialText = `
Webti에 오신 것을 환영합니다.
Webti는 설문조사를 통해서 사용자의 적성이 프론트엔드인지 백엔드인지 검사합니다.
-----------------------------------------------------------------------
help
start : Start Webti
about : Information about the project or developer
clear : clears the terminal screen
-----------------------------------------------------------------------
`;

  const aboutText = `
Team-Name: meot-ppo
Email: dsky03@naver.com
GitHub: https://github.com/team-meot-ppo
Interesting: backend, frontend
Update: 2024/06/26
`;

  // 초기 텍스트 로드
  React.useEffect(() => {
    setContent([
      <TypingEffect
        key={0}
        text={initialText}
        speed={10}
        onComplete={() => setInputEnabled(true)}
      />,
    ]);
  }, [initialText]);

  return (
    <div className="terminal bg-black text-white font-mono">
      <div className="absolute top-2 left-2">
        <Dropdown onCommand={handleCommand} />
      </div>
      {/* 제목 */}
      <pre className="ascii-art m-0 p-0">
        {`
          _____                    _____                    _____                _____                    _____
         /\\    \\                  /\\    \\                  /\\    \\              /\\    \\                  /\\    \\
        /::\\____\\                /::\\    \\                /::\\    \\            /::\\    \\                /::\\    \\
       /:::/    /               /::::\\    \\              /::::\\    \\           \\:::\\    \\               \\:::\\    \\
      /:::/   _/___            /::::::\\    \\            /::::::\\    \\           \\:::\\    \\               \\:::\\    \\
     /:::/   /\\    \\          /:::/\\:::\\    \\          /:::/\\:::\\    \\           \\:::\\    \\               \\:::\\    \\
    /:::/   /::\\____\\        /:::/__\\:::\\    \\        /:::/__\\:::\\    \\           \\:::\\    \\               \\:::\\    \\
   /:::/   /:::/    /       /::::\\   \\:::\\    \\      /::::\\   \\:::\\    \\          /::::\\    \\              /::::\\    \\
  /:::/   /:::/   _/___    /::::::\\   \\:::\\    \\    /::::::\\   \\:::\\    \\        /::::::\\    \\    ____    /::::::\\    \\
 /:::/___/:::/   /\\    \\  /:::/\\:::\\   \\:::\\    \\  /:::/\\:::\\   \\:::\\ ___\\      /:::/\\:::\\    \\  /\\   \\  /:::/\\:::\\    \\
|:::|   /:::/   /::\\____\\/:::/__\\:::\\   \\:::\\____\\/:::/__\\:::\\   \\:::|    |    /:::/  \\:::\\____\\/::\\   \\/:::/  \\:::\\____\\
|:::|__/:::/   /:::/    /\\:::\\   \\:::\\   \\::/    /\\:::\\   \\:::\\  /:::|____|   /:::/    \\::/    /\\:::\\  /:::/    \\::/    /
 \\:::\\/:::/   /:::/    /  \\:::\\   \\:::\\   \\/____/  \\:::\\   \\:::\\/:::/    /   /:::/    / \\/____/  \\:::\\/:::/    / \\/____/
  \\::::::/   /:::/    /    \\:::\\   \\:::\\    \\       \\:::\\   \\::::::/    /   /:::/    /            \\::::::/    /
   \\::::/___/:::/    /      \\:::\\   \\:::\\____\\       \\:::\\   \\::::/    /   /:::/    /              \\::::/____/
    \\:::\\__/:::/    /        \\:::\\   \\::/    /        \\:::\\  /:::/    /    \\::/    /                \\:::\\    \\
     \\::::::::/    /          \\:::\\   \\/____/          \\:::\\/:::/    /      \\/____/                  \\:::\\    \\
      \\::::::/    /            \\:::\\    \\               \\::::::/    /                                 \\:::\\    \\
       \\::::/    /              \\:::\\____\\               \\::::/    /                                   \\:::\\____\\
        \\::/____/                \\::/    /                \\::/____/                                     \\::/    /
         ~~                       \\/____/                  ~~                                            \\/____/
        `}
      </pre>
      {/* key 값을 이용해서 콘텐츠 출력 */}
      <div className="content">
        {content.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
      {/* 입력창 출력 */}
      {inputEnabled && (
        <div className="commands mt-4">
          <p>
            &gt;&gt;&gt;{" "}
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              className="bg-black text-white outline-none"
              autoFocus
            />
          </p>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Terminal />} />
        {/* 임의로 만든 것임 */}
        <Route path="/question" element={<QuestionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
