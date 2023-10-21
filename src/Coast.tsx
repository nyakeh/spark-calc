import './App.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
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
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

function Coast() {
  return (
    <section className='App-main'>
      <h2>Coast FI &#128293; Calculator</h2>
      <Line options={options} data={data} />
    </section>
  );
}

export default Coast;
