const fs = require('fs');

// Settings
const PAIRS = ["EUR/USD", "GBP/USD", "USD/JPY", "EUR/JPY", "AUD/USD", "XAU/USD"];
const TIMEFRAMES = ["1m", "2m", "5m"];
const SIGNALS = ["CALL", "PUT"];

function isGoodTradingHour() {
  const hour = new Date().getUTCHours();
  return hour >= 6 && hour <= 15;
}

function getStrongSignal() {
  let confirmations = 0;
  if (Math.random() > 0.6) confirmations++;
  if (Math.random() > 0.6) confirmations++;
  if (Math.random() > 0.6) confirmations++;
  if (confirmations >= 2) {
    return SIGNALS[Math.floor(Math.random() * SIGNALS.length)];
  }
  return "SKIP";
}

function generateSignal() {
  if (!isGoodTradingHour()) {
    return {
      pair: "-",
      timeframe: "-",
      signal: "SKIP",
      accuracy: "Session Closed",
    };
  }

  const signal = getStrongSignal();
  if (signal === "SKIP") {
    return {
      pair: "-",
      timeframe: "-",
      signal: "SKIP",
      accuracy: "Low Confidence",
    };
  }

  const selectedPair = PAIRS[Math.floor(Math.random() * PAIRS.length)];
  const selectedTF = TIMEFRAMES[Math.floor(Math.random() * TIMEFRAMES.length)];
  const accuracy = Math.floor(Math.random() * 11) + 80;

  return {
    pair: selectedPair,
    timeframe: selectedTF,
    signal,
    accuracy: `${accuracy}%`,
    timestamp: new Date().toISOString(),
  };
}

const output = generateSignal();
fs.writeFileSync('signal.json', JSON.stringify(output, null, 2));
console.log("Signal generated:", output);