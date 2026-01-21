import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      //text: 'Chart.js Horizontal Bar Chart',
    },
  },
};

const labels = ['HP','ATTACK','DEFENSE','S. ATTACK','S. DEFENSE','SPEED'];


export function Charts({statssend}){
//statssend es un array con los datos de pokeapi
if(!statssend){
    return;
}

const data = {
  labels,
  datasets: [
    {
      label: 'Pokemon stats',
      data: statssend,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

    return(
        <Bar options={options} data={data} />
    );
}