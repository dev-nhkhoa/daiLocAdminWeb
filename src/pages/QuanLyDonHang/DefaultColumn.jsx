import React from 'react'
import { formatCurrency } from '#/lib/formatCurrency'

/* eslint-disable react/prop-types */
const DefaultColumn = (props) => {
  const { getValue, row, column } = props

  const convertData = (column) => {
    switch (column.id) {
      case 'stt':
        return row.index + 1
      case 'donGiaNhapHang':
      case 'donGiaBanHang':
      case 'thanhTienNhapHang':
      case 'thanhTienBanHang':
        return formatCurrency(getValue())
      case 'loiNhuan':
        return formatCurrency(row.original.thanhTienBanHang - row.original.thanhTienNhapHang)
      case 'thanhToan':
        return getValue().reduce((acc, curr) => acc + curr.soTien, 0) === 0
          ? 'Chưa thanh toán'
          : getValue().reduce((acc, curr) => acc + curr.soTien, 0) ===
              row.original.listSanPham.reduce((acc, curr) => acc + curr.giaBan * curr.soLuong, 0)
            ? 'Đã thanh toán đủ'
            : `Đã thanh toán ${formatCurrency(getValue().reduce((acc, curr) => acc + curr.soTien, 0))}đ`

      // return formatCurrency(getValue().reduce((acc, curr) => acc + curr.soTien, 0))
    }
    return getValue()
  }

  const initialValue = convertData(column)
  const [value, setValue] = React.useState(initialValue)

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return <p>{value}</p>
}

export default DefaultColumn
