import ResultChart from 'Components/ResultChart';
import Result from 'Components/Result';
import TerminalBox from 'Components/TerminalBox';

function ResultPage() {
  return (
    <TerminalBox>
      <Result />
      <ResultChart></ResultChart>
    </TerminalBox>
  );
}

export default ResultPage;
