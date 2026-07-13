const { useState, useMemo } = React;

export function CurrencyConverter() {
  const currencies = [
    'USD',
    'EUR',
    'GBP',
    'JPY'
  ];

  const rates = {
    'USD': 1,
    'EUR': 0.92,
    'GBP': 0.78,
    'JPY': 156.7
  };

  const [amount, setAmount]  = useState(1);
  const [convertFrom, setConvertfrom]  = useState('USD');
  const [convertTo, setConvertTo]  = useState('EUR');

  const baseAmount = useMemo(
    () => { return Number(amount) / rates[convertFrom]}, [amount, convertFrom]
  );
 
 return <div>
 <h1>Currency Converter</h1>
 <h3>Conversion</h3>
 <input type="number" min="1" value={amount} onChange={(e) => setAmount(e.target.value)}/>
 <h3>Start Currency:</h3>
 <select value={convertFrom} onChange={(e) => setConvertfrom(e.target.value)}>
{
  currencies.map(
    (currency) =><option key={currency} value={currency}>{currency}</option>
  )
}
 </select>
 <h3>Target Currency:</h3>
 <select value={convertTo} onChange={(e) => setConvertTo(e.target.value)}>
{
  currencies.map(
    (currency) => <option key={currency} value={currency}>{currency}</option>
  )
}
 </select>
<h2>Converted Amount:{(baseAmount * rates[`${convertTo}`]).toFixed(2)} {convertTo}</h2>
 </div>
}
