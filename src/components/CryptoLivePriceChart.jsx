import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const CryptoLivePriceChart = ({ symbol, livePrice }) => {
  const [labels, setLabels] = useState([]);
  const [dataPoints, setDataPoints] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setLabels((prev) => [...prev.slice(-19), now.toLocaleTimeString()]);
      setDataPoints((prev) => [...prev.slice(-19), parseFloat(livePrice)]);
    }, 2000);

    return () => clearInterval(interval);
  }, [livePrice]);

  const chartData = {
    labels,
    datasets: [
      {
        label: `${symbol} Live Price`,
        data: dataPoints,
        fill: false,
        borderColor: "#007bff",
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="h5 card-title">
          {symbol} Price Chart (Live){" "}
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/color/24/youtube-live.png"
            alt="youtube-live"
          />
        </h2>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default CryptoLivePriceChart;
