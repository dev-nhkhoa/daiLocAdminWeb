import { Line } from 'react-chartjs-2'

function getLabels(option) {
  switch (option) {
    case 'day':
    case 'last-day':
    case 'week':
    case 'last-week':
    case 'month':
    case 'last-month':
    case 'year':
    case 'last-year':
      return Array.from({ length: 12 }, (_, i) => i + 1)
    default:
      return Array.from({ length: 12 }, (_, i) => i + 1)
  }
}

export function LineChart({ title, chartData, option }) {
  const labels = getLabels(option)

  const data = {
    labels,
    datasets: [
      {
        label: 'Lợi nhuận',
        data: chartData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
      },
    },
  }

  return <Line options={options} data={data} />
}

export default LineChart
