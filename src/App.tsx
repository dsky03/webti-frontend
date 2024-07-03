import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css"; // 일단은 사용...
import QuestionPage from "Pages/QuestionPage";
import Terminal from "Pages/Terminal";
import ResultPage from "Pages/ResultPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Terminal />} />
        <Route path="/question" element={<QuestionPage />} />
        <Route path="/result" element={<ResultPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
