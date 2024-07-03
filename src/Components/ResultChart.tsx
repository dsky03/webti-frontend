import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getStatistics } from 'util/api/api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
    order: number;
  }[];
}

interface DataItem {
  result: string;
  count: number;
  matchCount: number;
}

// 페이크 타임
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// 차트
const ResultChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await delay(1500);
        const response = await getStatistics();
        if (response.success !== 'true') {
          throw new Error('Failed to fetch statistics');
        }
        const data = response.data;
        console.log(data);
        const labels = data.map((item: DataItem) => item.result);
        const counts = data.map((item: DataItem) => item.count);
        const matchCounts = data.map((item: DataItem) => item.matchCount);

        setChartData({
          labels,
          datasets: [
            {
              label: ' 총횟수',
              data: counts,
              backgroundColor: 'LightSkyBlue',
              borderColor: 'grey',
              borderWidth: 2,
              order: 1,
            },
            {
              label: '일치 횟수',
              data: matchCounts,
              backgroundColor: 'LightYellow',
              borderColor: 'grey',
              borderWidth: 2,
              order: 0,
            },
          ],
        });
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { color: '#00ff00' },
        grid: { color: 'grey' },
        stacked: true,
      },
      y: {
        ticks: { color: '#00ff00' },
        grid: { color: 'grey' },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        labels: { color: '#00ff00' },
      },
    },
    layout: {
      padding: { left: 40, right: 40, top: 20, bottom: 20 },
    },
  };

  return (
    <>
      {chartData ? (
        <>
          <p className="text-2xl mb-5">다른 사용자의 결과</p>
          <p>&gt;&gt;&gt; 결과는 한 시간마다 갱신됩니다.</p>
          <Bar data={chartData} options={options} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default ResultChart;
