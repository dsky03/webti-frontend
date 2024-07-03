import ResultChart from 'Components/ResultChart';
import Result from 'Components/Result';
import TerminalBox from 'Components/TerminalBox';
import { useState } from 'react';

function ResultPage() {
  const [showChart, setShowChart] = useState<boolean>(false);

  return (
    <TerminalBox>
      <Result onSubmit={() => setShowChart(true)} />
      {showChart && <ResultChart />}
    </TerminalBox>
  );
}

export default ResultPage;
