import { useEffect, useState } from "react";
import { flagConvertor } from "./functions";
import useInput from "./hook/useInput";

function CurrencyExchangeUI() {
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [result, setResult] = useState(null);

  const currentValue = useInput(1);
  useEffect(() => {
    if (
      !currentValue.value ||
      toCurrency === fromCurrency
    ) {
      setResult(null);
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(() => {
      fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`, {
        signal: controller.signal,
      })
        .then((res) => res.json())
        .then((data) => {
          setResult(currentValue.value * data.rates[toCurrency]);
        })
        .catch((err) => console.log(err));
    }, 500);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [currentValue.value, toCurrency, fromCurrency]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        🌍 Currency Exchange
      </h2>

      <div className="flex items-center justify-between gap-4">
        <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            From
          </label>
          <div className="flex items-center border rounded-lg px-3 py-2 gap-2">
            <img
              src={`https://flagcdn.com/w40/${flagConvertor(fromCurrency)}.png`}
              alt={fromCurrency}
              className="w-6 h-4"
            />
            <select
              className="flex-1 bg-transparent outline-none"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="JPY">JPY</option>
              <option value="CAD">CAD</option>
              <option value="AUD">AUD</option>
              <option value="CHF">CHF</option>
              <option value="CNY">CNY</option>
              <option value="SEK">SEK</option>
              <option value="NZD">NZD</option>
              <option value="INR">INR</option>
              <option value="AED">AED</option>
              <option value="TRY">TRY</option>
              <option value="RUB">RUB</option>
              <option value="BRL">BRL</option>
              <option value="ZAR">ZAR</option>
            </select>
          </div>
        </div>

        <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            To
          </label>
          <div className="flex items-center border rounded-lg px-3 py-2 gap-2">
            <img
              src={`https://flagcdn.com/w40/${flagConvertor(toCurrency)}.png`}
              alt={toCurrency}
              className="w-6 h-4"
            />
            <select
              className="flex-1 bg-transparent outline-none"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="JPY">JPY</option>
              <option value="CAD">CAD</option>
              <option value="AUD">AUD</option>
              <option value="CHF">CHF</option>
              <option value="CNY">CNY</option>
              <option value="SEK">SEK</option>
              <option value="NZD">NZD</option>
              <option value="INR">INR</option>
              <option value="AED">AED</option>
              <option value="TRY">TRY</option>
              <option value="RUB">RUB</option>
              <option value="BRL">BRL</option>
              <option value="ZAR">ZAR</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Amount
        </label>
        <input
          type="number"
          placeholder="Enter amount"
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          min="0"
          {...currentValue}
        />
      </div>

      <div className="text-center bg-blue-50 border border-blue-200 rounded-xl py-4">
        <p className="text-gray-600 text-sm">Conversion Result:</p>
        <p className="text-xl font-semibold text-blue-600">
          {currentValue.value || 0} {fromCurrency} ={" "}
          {result ? result.toFixed(4) : "--"} {toCurrency}
        </p>
      </div>
    </div>
  );
}

export default CurrencyExchangeUI;
