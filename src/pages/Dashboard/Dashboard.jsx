import { useState } from 'react'
import PieChart from '#/components/Charts/PieChart'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LineElement, PointElement, LinearScale, Title } from 'chart.js'
import useDonHangStore from '#/hooks/useDonHangStore'
import { getDateRange } from '#/lib/handleThings'
import DonHangButton from '../DonHang/DonHangButton'
import { calcProfit, getThanhToanData } from '#/lib/analystThings'
import LineChart from '#/components/Charts/LineChart'
import { formatCurrency } from '#/lib/formatCurrency'

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const Dashboard = () => {
  const { listDonHang } = useDonHangStore()

  const [option, setOption] = useState('year')
  const [profitList, setProfitList] = useState(() => {
    const yearNow = new Date().getFullYear()

    let profitList = []
    for (let i = 0; i < 12; i++) {
      const startDate = new Date(yearNow, i, 1).toISOString().split('T')[0]
      const endDate = new Date(yearNow, i + 1, 0).toISOString().split('T')[0]
      profitList.push(calcProfit(listDonHang, startDate, endDate))
    }
    return profitList
  })
  const [endDate, setEndDate] = useState(getDateRange(option)[1])
  const [startDate, setStartDate] = useState(getDateRange(option)[0])

  const [chartData, setChartData] = useState(getThanhToanData(startDate, endDate, listDonHang))

  return (
    <>
      <h2 className="pb-3 text-left font-mono text-2xl font-bold">Dashboard:</h2>
      <div className="flex justify-end p-1">
        <select
          name="select-date"
          onChange={(e) => {
            setOption(e.target.value)
            const dateRange = getDateRange(e.target.value)
            setStartDate(dateRange[0])
            setEndDate(dateRange[1])
            setChartData(getThanhToanData(dateRange[0], dateRange[1], listDonHang))
          }}
        >
          <option value="day">Ngày</option>
          <option value="week">Tuần này</option>
          <option value="last-week">Tuần trước</option>
          <option value="month">tháng này</option>
          <option value="last-month">tháng trước</option>
          <option value="year">Năm nay</option>
          <option value="last-year">Năm ngoái</option>
        </select>
        <DonHangButton
          title="Xác nhận"
          handleFunction={() => {
            const dateRange = getDateRange(option)
            setStartDate(dateRange[0])
            setEndDate(dateRange[1])
            setChartData(getThanhToanData(dateRange[0], dateRange[1], listDonHang))
          }}
        />
      </div>
      <div className="w-full rounded-md border border-black py-5">
        <div className="flex gap-2">
          <div className="max-w[250px] flex max-h-[250px] flex-col items-center justify-center">
            <PieChart chartData={chartData} title="Thanh toán" />
          </div>
          <div className="max-w[250px] flex max-h-[250px] flex-col items-center justify-center">
            <p>Lợi nhuận ước tính: {formatCurrency(calcProfit(listDonHang, startDate, endDate))}đ</p>
            <LineChart option={option} chartData={profitList} title="Lợi nhuận trong Năm" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
