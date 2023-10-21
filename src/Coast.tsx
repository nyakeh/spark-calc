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
  const [monthlyContribution, setMonthlyContribution] = useState(500);

  const reCalculate = (event: any) => {
    event.preventDefault();
    alert(`investedAssets: ${investedAssets}`)
  }

  return (
    <div>
      <section className='App-main'>
        <h2>Coast FI &#128293; Calculator</h2>
        <Line options={options} data={data} />
        <p>You're on track to have <span>£328,167</span> at retirement. If you take <span>£26,000</span> per year, this will last until age <span>90</span>.</p>
      </section>

      <section className='App-main'>
        <form onSubmit={reCalculate}>
          <label>Invested Assets: 
            <input type='number' value={investedAssets} onChange={e => setInvestedAssets(Number(e.target.value))} />
          </label>
          <label>Age: 
            <input type='number' value={age} onChange={e => setAge(Number(e.target.value))} />
          </label>
          <label>Monthly Contribution: 
            <input type='number' value={monthlyContribution} onChange={e => setMonthlyContribution(Number(e.target.value))} />
          </label>
          <input type="submit" />
        </form>
      </section>
    </div>
  );
}

export default Coast;
