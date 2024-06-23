import { Pie } from 'react-chartjs-2'

function PieChart({ chartData, title }) {
  return (
    <>
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: title,
            },
          },
        }}
      />
    </>
  )
}
export default PieChart
