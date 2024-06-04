import React, { useState, useEffect } from 'react';
import './App.css';
import CustomSelect from './CustomSelect';

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [fromAmount, setFromAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState(null);
  const [toCurrency, setToCurrency] = useState(null);
  const [conversionResult, setConversionResult] = useState(null);

  useEffect(() => {
    fetch('https://interview.switcheo.com/prices.json')
      .then(response => response.json())
      .then(data => {
        setCurrencies(data);
      })
      .catch(error => console.error('Error fetching currency data:', error));
  }, []);

  useEffect(() => {
    if (fromAmount && fromCurrency && toCurrency) {
      const fromData = currencies.find(item => item.currency === fromCurrency.value);
      const toData = currencies.find(item => item.currency === toCurrency.value);

      if (fromData && toData) {
        const result = (parseFloat(fromAmount) / fromData.price) * toData.price;
        setConversionResult(result);
      } else {
        setConversionResult(null);
      }
    } else {
      setConversionResult(null);
    }
  }, [fromAmount, fromCurrency, toCurrency, currencies]);

  const uniqueCurrencies = [...new Set(currencies.map(item => item.currency))];
  const currencyOptions = uniqueCurrencies.map(currency => ({
    value: currency,
    label: currency
  }));

  return (
    <div className="App">
      <main>
        <h2>Convert your cryptocurrency</h2>
        <form>
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="from-amount">From Amount</label>
              <input
                type="text"
                id="from-amount"
                name="from-amount"
                placeholder="Amount"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="from-currency">Currency</label>
              <CustomSelect
                options={currencyOptions}
                onChange={setFromCurrency}
                value={fromCurrency}
              />
            </div>
          </div>
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="to-amount">To Amount</label>
              <input
                type="text"
                id="to-amount"
                name="to-amount"
                placeholder="Amount"
                value={conversionResult ? conversionResult.toFixed(6) : ''}
                readOnly
              />
            </div>
            <div className="input-group">
              <label htmlFor="to-currency">Currency</label>
              <CustomSelect
                options={currencyOptions}
                onChange={setToCurrency}
                value={toCurrency}
              />
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

export default App;
