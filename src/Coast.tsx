import './App.css';
import { Chart as ChartJS, CategoryScale, LinearScale,PointElement, LineElement, Title, Tooltip, Filler, Legend } from 'chart.js';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Net worth growth',
    },
  },
};

const labels = ['2023', '2025', '2027', '2029', '2031', '2033', '2035', '2037', '2039', '2041', '2043', '2045'];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Net worth',
      data: [100,4000,12000,20000,29000,36000,44000,53000,65000,71000,80000,96000],
      borderColor: 'rgb(145, 163, 121)',
      backgroundColor: 'rgba(145, 163, 121, 0.3)',
    },
  ],
};

function Coast() {
  const [investedAssets, setInvestedAssets] = useState(0);
  const [age, setAge] = useState(30);
  const [annualExpenses , setAnnualExpenses] = useState(17000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  
  const [retirementAge, setRetirementAge] = useState(55);
  const [interestRate, setInterestRate] = useState(7);
  const [inflationRate, setInflationRate] = useState(2);
  const [safeWithdrawalRate, setSafeWithdrawalRate] = useState(4);
  
  const [initialAssets, setInitialAssets] = useState(0);
  const [yearsToRetirement, setYearsToRetirement] = useState(0);
  const [retirementNetWorth, setRetirementNetWorth] = useState(425000);
  const [safeWithdrawalAmount, setSafeWithdrawalAmount] = useState(17000);
  const [todayCoastFigure, setTodayCoastFigure] = useState(78306);
  const [initialSumCompounded, setInitialSumCompounded] = useState(0);
  
  const reCalculate = (event: any) => {
    event.preventDefault();
    setInitialAssets(investedAssets);

    let fireNumber = annualExpenses * 25;
    let rate = ((interestRate - inflationRate) / 100) + 1;
    let years = retirementAge - age;
    setYearsToRetirement(years);
    setInitialSumCompounded(investedAssets * (Math.pow(rate, years)));
    setTodayCoastFigure(fireNumber / (Math.pow(rate, years)));
    
    let annualContribution = monthlyContribution * 12;
    let futureValue = 0;
    let tempYearValue = investedAssets;
    for (let i = 0; i < years; i++) {
      futureValue = tempYearValue * Math.pow(rate, 1);
      tempYearValue = futureValue + annualContribution;
    }
    setRetirementNetWorth(tempYearValue);
    setSafeWithdrawalAmount(tempYearValue / (100 / safeWithdrawalRate))
  }

  return (
    <div>
      <section className='App-main'>
        <h2>Coast FI &#129518; Calculator</h2>
        <Line options={options} data={data} />
        <p>You're on track to have <span>£{retirementNetWorth.toFixed(0)}</span> at retirement. You can take <span>£{safeWithdrawalAmount.toFixed(0)}</span> per year.</p>
        <p>To coast today you'd need <span>£{todayCoastFigure.toFixed(0)}</span> invested</p>
        {initialSumCompounded > 1 && <p>Your initial <span>£{initialAssets.toFixed(0)}</span> will grow to <span>£{initialSumCompounded.toFixed(0)}</span> over the <span>yearsToRetirement</span> years till retirement age</p>}
      </section>

      <section className='App-main'>
        <div className='Coast-circle'>
          <form onSubmit={reCalculate} className='Coast-form'>
            <label>Invested Assets: 
              <input type='number' value={investedAssets} onChange={e => setInvestedAssets(Number(e.target.value))} />
            </label>
            <label>Age: 
              <input type='number' value={age} onChange={e => setAge(Number(e.target.value))} />
            </label>
            <label>Annual Expenses: 
              <input type='number' value={annualExpenses} onChange={e => setAnnualExpenses(Number(e.target.value))} />
            </label>
            <label>Monthly Contribution: 
              <input type='number' value={monthlyContribution} onChange={e => setMonthlyContribution(Number(e.target.value))} />
            </label>
            <input type="submit" value='Calculate' />
          </form>
        </div>
      </section>
    </div>
  );
}

export default Coast;
