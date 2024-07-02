import React from "react";
import "../App.css";
import ResultChart from "Components/ResultChart";

function ResultPage() {
  return (
    <div className="terminal bg-black text-white font-mono border-2 rounded-md p-5 m-2">
      <ResultChart></ResultChart>
    </div>
  );
}

export default ResultPage;
