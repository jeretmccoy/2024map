import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function OutcomeFrequencyChart({ outcomes = [] }) { // Default to empty array
  // Step 1: Calculate frequencies and sort values
  const frequencyMap = outcomes.reduce((acc, outcome) => {
    acc[outcome] = (acc[outcome] || 0) + 1;
    return acc;
  }, {});

  const sortedOutcomes = Object.keys(frequencyMap)
    .map(Number)
    .sort((a, b) => a - b);

  const frequencies = sortedOutcomes.map(value => frequencyMap[value]);

  // Calculate the number of outcomes over 270
  const nums_over_270 = outcomes.filter(outcome => outcome > 270).length;
  const total_outcomes = outcomes.length;
  const fraction = total_outcomes > 0 ? (nums_over_270 / total_outcomes).toFixed(2) : '0.00';

  // Step 2: Configure the chart data
  const data = {
    labels: sortedOutcomes, // Unique, sorted outcomes on the x-axis
    datasets: [
      {
        label: 'Frequency',
        data: frequencies,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Step 3: Configure the chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
      title: {
        display: true,
        text: `${nums_over_270} / ${total_outcomes} = ${fraction}`, // Dynamic title
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Frequency',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Outcome Value',
        },
      },
    },
    // Custom plugin to draw a line at y = 270
    plugins: [
      {
        id: 'lineAt270',
        beforeDraw: (chart) => {
          const { ctx, scales } = chart;
          const yValue = scales.y.getPixelForValue(270);
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(scales.x.left, yValue);
          ctx.lineTo(scales.x.right, yValue);
          ctx.strokeStyle = 'red';
          ctx.lineWidth = 2;
          ctx.setLineDash([5, 5]); // Dashed line
          ctx.stroke();
          ctx.restore();
        },
      },
    ],
  };

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <Bar data={data} options={options} />
    </div>
  );
}

export default OutcomeFrequencyChart;
