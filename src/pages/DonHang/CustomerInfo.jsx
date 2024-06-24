import { formatCurrency } from '#/lib/formatCurrency'
import React, { useState } from 'react'
import DonHangButton from './DonHangButton'
import Modal from '#/components/Modal'

const CustomerText = ({ title, data }) => {
  return (
    <div className="flex gap-2">
      <p className="font-mono font-bold">{title}:</p>
      <p className="font-mono">{data}</p>
    </div>
  )
}

const CustomerInput = ({ title, data, input }) => {
  return (
    <div className="flex gap-2">
      <p className="font-mono font-bold">{title}:</p>
      <input type="text" value={data} className="w-[400px] text-left font-mono" onChange={(e) => input(e.target.value)} />
    </div>
  )
}

const CustomerInfo = React.memo(function CustomerInfo({
  customerName,
  customerPhone,
  customerAddress,
  createdDate,
  setCreatedDate,
  thanhToan,
  donHangId,
  setCustomerName,
  setCustomerPhone,
  setCustomerAddress,
  listSanPham,
}) {
  const [date, setDate] = useState()
  const [isEditDate, setEditDate] = useState(false)

  function saveDate() {
    console.log(date)
    if (date == undefined) {
      alert('Vui lòng chọn ngày tạo đơn')
      return
    }
    const newDate = date.split('T')
    const dayMonthYear = newDate[0].split('-').reverse().join('/')
    const hourMinute = newDate[1]

    const editedDate = `${hourMinute} ${dayMonthYear}`

    setCreatedDate(editedDate)
    alert('Đã lưu ngày tạo đơn')
  }

  return (
    <>
      {isEditDate && (
        <Modal>
          <p className="font-mono font-bold">Chỉnh sửa ngày tạo đơn</p>
          <input type="datetime-local" onChange={(e) => setDate(e.target.value)} />
          <DonHangButton title="Lưu" handleFunction={saveDate} />
          <DonHangButton title="Đóng" handleFunction={() => setEditDate(false)} />
        </Modal>
      )}
      <div className="flex items-center gap-2">
        <CustomerText title="Ngày Tạo Đơn" data={createdDate} />
        <DonHangButton title="chỉnh sửa" handleFunction={() => setEditDate(true)} />
      </div>
      <CustomerText title="Mã Đơn Hàng" data={donHangId} />
      <div className="flex gap-2">
        <p className="font-mono font-bold">Tình trạng thanh toán:</p>
        <p className={`font-mono font-bold text-green-700`}>
          {thanhToan.reduce((acc, curr) => acc + curr.soTien, 0) === 0
            ? 'Chưa thanh toán'
            : thanhToan.reduce((acc, curr) => acc + curr.soTien, 0) === listSanPham.reduce((acc, curr) => acc + curr.giaBan * curr.soLuong, 0)
              ? 'Đã thanh toán đủ'
              : `Đã thanh toán ${formatCurrency(thanhToan.reduce((acc, curr) => acc + curr.soTien, 0))}đ`}
        </p>
      </div>
      <CustomerInput title="Tên Khách Hàng" data={customerName} input={setCustomerName} />
      <CustomerInput title="Số Điện Thoại" data={customerPhone} input={setCustomerPhone} />
      <CustomerInput title="Địa chỉ công trình" data={customerAddress} input={setCustomerAddress} />
    </>
  )
})

export default CustomerInfo
