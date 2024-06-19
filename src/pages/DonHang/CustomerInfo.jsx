import { formatCurrency } from '#/lib/formatCurrency'
import React from 'react'

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
  thanhToan,
  donHangId,
  setCustomerName,
  setCustomerPhone,
  setCustomerAddress,
  listSanPham,
}) {
  return (
    <>
      <CustomerText title="Ngày Tạo Đơn" data={createdDate} />
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
