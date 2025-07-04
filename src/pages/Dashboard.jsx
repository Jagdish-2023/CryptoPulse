import { useEffect, useState } from "react";
const baseURL = import.meta.env.VITE_SERVER_URL;

import CryptoCard from "../components/CryptoCard";
import CryptoLivePriceChart from "../components/CryptoLivePriceChart";
import Navbar from "../components/Navbar";
import CryptoPriceHistoryChart from "../components/CryptoPriceHistoryChart";

const cryptoSymbols = [
  "BTCUSDT",
  "ETHUSDT",
  "BNBUSDT",
  "XRPUSDT",
  "ADAUSDT",
  "SOLUSDT",
  "DOGEUSDT",
  "DOTUSDT",
  "SUIUSDT",
  "LTCUSDT",
];

const handlePricesReportDownload = () => {
  window.open(`${baseURL}/api/download-prices-report`, "_blank");
};

const handleCryptoHistoryDownload = (symbol) => {
  window.open(`${baseURL}/api/download-history-report/${symbol}`, "_blank");
};

const Dashboard = () => {
  const [prices, setPrices] = useState({});
  const [selectedCrypto, setSelectedCrypto] = useState("BTCUSDT");

  const handleCryptoSelect = (e) => {
    setSelectedCrypto(e.target.value);
  };

  useEffect(() => {
    const streamURL = `wss://stream.binance.com:9443/stream?streams=${cryptoSymbols
      .map((s) => s.toLowerCase() + "@ticker")
      .join("/")}`;

    const socket = new WebSocket(streamURL);
    socket.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      const symbol = parsedData.data.s;
      const price = parsedData.data.c;
      setPrices((prev) => ({ ...prev, [symbol]: price }));
    };
    return () => socket.close();
  }, []);

  return (
    <>
      <Navbar />
      <main className="container my-5 bg-body text-body">
        <h1 className="h4 text-center">Dashboard</h1>

        <section className="d-flex flex-column mt-5 gap-1">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="h5">
              Live Crypto Prices{" "}
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/color/24/youtube-live.png"
                alt="youtube-live"
              />
            </h2>
            <button
              className="btn btn-sm btn-primary"
              onClick={() => handlePricesReportDownload()}
            >
              Download Live Prices Report
            </button>
          </div>

          <div className="row">
            {cryptoSymbols.map((symbol) => (
              <CryptoCard key={symbol} name={symbol} price={prices[symbol]} />
            ))}
          </div>
        </section>

        <section className="d-flex flex-column mt-5 gap-2">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <select
                id="crypto-symbol-select"
                className="form-select"
                onChange={handleCryptoSelect}
                value={selectedCrypto}
              >
                {cryptoSymbols.map((symbol) => (
                  <option key={symbol} value={symbol}>
                    {symbol}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="btn btn-sm btn-primary"
              onClick={() => handleCryptoHistoryDownload(selectedCrypto)}
            >
              Download 24h History Report
            </button>
          </div>

          <CryptoLivePriceChart
            symbol={selectedCrypto}
            livePrice={prices[selectedCrypto]}
          />
        </section>

        <section className="mt-4">
          <CryptoPriceHistoryChart coinId={selectedCrypto} />
        </section>
      </main>
    </>
  );
};

export default Dashboard;
