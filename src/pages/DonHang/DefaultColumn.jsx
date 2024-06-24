import React, { useRef } from 'react'
import { formatCurrency } from '#/lib/formatCurrency'

const DefaultColumn = (props) => {
  const { getValue, row, column, table } = props

  const { giaBan, giaNhap, soLuong } = row.original

  function removeComma(item) {
    return parseFloat(String(item).replace(/,/g, ''))
  }

  const newGiaBan = removeComma(giaBan)
  const newGiaNhap = removeComma(giaNhap)
  const newSoLuong = parseFloat(String(soLuong).replace(/,/g, '.'))

  const convertData = (column) => {
    switch (column.id) {
      case 'stt':
        return row.index + 1
      case 'giaNhap':
        console.log(newGiaNhap)
        return formatCurrency(newGiaNhap)
      case 'giaBan':
        return formatCurrency(newGiaBan)
      case 'soLuong':
        return parseFloat(String(getValue()).replace(/,/g, '.'))
      case 'thanhTienBanHang':
        return formatCurrency(Math.round(parseFloat(newGiaBan) * parseFloat(newSoLuong)))
      case 'thanhTienNhapHang':
        return formatCurrency(Math.round(parseFloat(newGiaNhap) * parseFloat(newSoLuong)))
      case 'loiNhuan':
        return formatCurrency(Math.round(parseFloat(newGiaBan) * parseFloat(newSoLuong) - parseFloat(newGiaNhap) * parseFloat(newSoLuong)))
      case 'thanhToan':
        return getValue() ? 'Đã thanh toán' : 'Chưa thanh toán'
    }
    return getValue()
  }

  const initialValue = convertData(column)
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue)
  const inputRef = useRef(null)

  const handleInputFocus = () => {
    if (inputRef.current) {
      inputRef.current.select()
    }
  }

  // When the input is blurred, we'll call our table meta's updateData function
  const onBlur = () => {
    table.options.meta.updateData(row.index, column.id, value)
  }

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return (
    <>
      <input
        id={column.id == 'loiNhuan' ? (newGiaBan * newSoLuong - newGiaNhap * newSoLuong >= 0 ? `${column.id}-gain` : `${column.id}-loss`) : column.id}
        style={{ width: '100%' }}
        value={value || ''}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        ref={inputRef}
        onFocus={handleInputFocus}
      />
    </>
  )
}

export default DefaultColumn
