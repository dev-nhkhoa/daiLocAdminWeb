import React from 'react'

const CustomerText = ({ title, data }) => {
  return (
    <div className="flex gap-2">
      <p className="font-bold">{title}:</p>
      <p>{data}</p>
    </div>
  )
}

const CustomerInput = ({ title, data, input }) => {
  return (
    <div className="flex gap-2">
      <p className="font-bold">{title}:</p>
      <input type="text" value={data} className="w-[400px] text-left" onChange={(e) => input(e.target.value)} />
    </div>
  )
}

const CustomerInfo = React.memo(function CustomerInfo({
  customerName,
  customerPhone,
  customerAddress,
  createdDate,
  isThanhToan,
  donHangId,
  setCustomerName,
  setCustomerPhone,
  setCustomerAddress,
}) {
  return (
    <>
      <CustomerText title="Ngày Tạo Đơn" data={createdDate} />
      <CustomerText title="Mã Đơn Hàng" data={donHangId} />
      <CustomerText title="Tình Trạng Thanh Toán" data={isThanhToan == true ? 'Đã thanh toán' : 'Chưa thanh toán'} />
      <CustomerInput title="Tên Khách Hàng" data={customerName} input={setCustomerName} />
      <CustomerInput title="Số Điện Thoại" data={customerPhone} input={setCustomerPhone} />
      <CustomerInput title="Địa chỉ công trình" data={customerAddress} input={setCustomerAddress} />
    </>
  )
})

export default CustomerInfo
