import { resetString } from './formatCurrency'
import { reverseDate } from './handleThings'

function calcProfit(listDonHang, startDate, endDate) {
  return listDonHang.reduce((acc, donHang) => {
    const createdDate = Date.parse(reverseDate(donHang.createdDate.split(' ')[1]))

    const startDateObj = Date.parse(reverseDate(startDate))
    const endDateObj = Date.parse(reverseDate(endDate))

    if (!(parseFloat(createdDate) >= parseFloat(startDateObj) && parseFloat(createdDate) <= parseFloat(endDateObj))) return acc
    return (
      acc +
      donHang.listSanPham.reduce((acc, sanPham) => {
        return (
          acc +
          (parseFloat(resetString(sanPham.giaBan)) * parseFloat(resetString(sanPham.soLuong)) -
            parseFloat(resetString(sanPham.giaNhap)) * parseFloat(resetString(sanPham.soLuong)))
        )
      }, 0)
    )
  }, 0)
}

function getTotal(listDonHang, startDate, endDate) {
  return listDonHang.reduce((acc, donHang) => {
    const createdDate = Date.parse(reverseDate(donHang.createdDate.split(' ')[1]))

    const startDateObj = Date.parse(reverseDate(startDate))
    const endDateObj = Date.parse(reverseDate(endDate))

    if (!(parseFloat(createdDate) >= parseFloat(startDateObj) && parseFloat(createdDate) <= parseFloat(endDateObj))) return acc
    return (
      acc +
      donHang.listSanPham.reduce((acc, sanPham) => {
        return acc + parseFloat(resetString(sanPham.giaBan)) * parseFloat(resetString(sanPham.soLuong))
      }, 0)
    )
  }, 0)
}

function getPaidTotal(listDonHang, startDate, endDate) {
  return listDonHang.reduce((acc, donHang) => {
    const createdDate = Date.parse(reverseDate(donHang.createdDate.split(' ')[1]))

    const startDateObj = Date.parse(reverseDate(startDate))
    const endDateObj = Date.parse(reverseDate(endDate))

    if (!(parseFloat(createdDate) >= parseFloat(startDateObj) && parseFloat(createdDate) <= parseFloat(endDateObj))) return acc
    return (
      acc +
      donHang.thanhToan.reduce((acc, thanhToan) => {
        return acc + parseFloat(resetString(thanhToan.soTien))
      }, 0)
    )
  }, 0)
}

function getThanhToanData(startDate, endDate, listDonHang) {
  const total = getTotal(listDonHang, startDate, endDate)
  const paidTotal = getPaidTotal(listDonHang, startDate, endDate)

  return {
    labels: ['Đã thanh toán', 'Chưa thanh toán'],
    datasets: [
      {
        label: 'Total',
        data: [paidTotal, total - paidTotal],
        backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  }
}

export { getThanhToanData, calcProfit }
