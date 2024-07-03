import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

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
  }[];
}

interface DataItem {
  result: string;
  count: number;
  matchCount: number;
}

// 페이크 타임
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const ResultChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      await delay(1500);
      fetch("/statistics.json")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const labels = data.data.map((item: DataItem) => item.result);
          const counts = data.data.map((item: DataItem) => item.count);
          const matchCounts = data.data.map(
            (item: DataItem) => item.matchCount
          );

          setChartData({
            labels,
            datasets: [
              {
                label: "결과",
                data: counts,
                backgroundColor: "darkgray",
                borderColor: "white",
                borderWidth: 1,
              },
              {
                label: "정확도",
                data: matchCounts,
                backgroundColor: "gray",
                borderColor: "white",
                borderWidth: 1,
              },
            ],
          });
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { color: "#00ff00" },
        grid: { color: "grey" },
      },
      y: {
        ticks: { color: "#00ff00" },
        grid: { color: "grey" },
      },
    },
    plugins: {
      legend: {
        labels: { color: "#00ff00" },
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
          <p>다른 사용자의 결과</p>
          <p>결과는 한 시간 마다 갱신됩니다.</p>
          <Bar data={chartData} options={options} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default ResultChart;
