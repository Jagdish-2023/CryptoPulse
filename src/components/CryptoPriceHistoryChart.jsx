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

const CryptoPriceHistoryChart = ({ coinId = "BTCUSDT" }) => {
  const [labels, setLabels] = useState([]);
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    async function fetchHistory() {
      const res = await fetch(
        `https://api.binance.com/api/v3/klines?symbol=${coinId}&interval=1h&limit=24`
      );
      const data = await res.json();

      const labels = data.map((item) =>
        new Date(item[0]).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );

      const prices = data.map((item) => parseFloat(item[4]));

      setLabels(labels);
      setPrices(prices);
    }

    fetchHistory();
  }, [coinId]);

  const chartData = {
    labels,
    datasets: [
      {
        label: `${coinId.toUpperCase()} - 24h History`,
        data: prices,
        fill: false,
        borderColor: "green",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h2 className="h5 text-success">
          {coinId.toUpperCase()} - 24 Hour History
        </h2>
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default CryptoPriceHistoryChart;
