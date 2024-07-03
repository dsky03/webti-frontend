import ResultChart from 'Components/ResultChart';
import Result from 'Components/Result';
import TerminalBox from 'Components/TerminalBox';
import { useState } from 'react';

function ResultPage() {
  const [showChart, setShowChart] = useState<boolean>(() => {
    const response = localStorage.getItem('answer_response');
    return response === 'yes' || response === 'no';
  });

  return (
    <TerminalBox>
      <Result onSubmit={() => setShowChart(true)} />
      {showChart && <ResultChart />}
    </TerminalBox>
  );
}

export default ResultPage;
