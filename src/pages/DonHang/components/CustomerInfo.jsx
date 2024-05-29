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
      <input
        type="text"
        value={data}
        className="w-[400px] text-left"
        onChange={(e) =>
          input((oldState) => {
            switch (title) {
              case 'Tên Khách Hàng':
                return { ...oldState, tenKhachHang: e.target.value }
              case 'Số Điện Thoại':
                return { ...oldState, soDienThoai: e.target.value }
              case 'Địa chỉ công trình':
                return { ...oldState, diaChi: e.target.value }
            }
          })
        }
      />
    </div>
  )
}
export { CustomerInput, CustomerText }
