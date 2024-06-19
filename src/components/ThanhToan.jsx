import { useState } from 'react'

import DonHangButton from '#/pages/DonHang/DonHangButton'
import { formatCurrency, resetString } from '#/lib/formatCurrency'
import { generateThanhToanLog } from '#/lib/generateTemplate'
import useDonHangStore from '#/hooks/useDonHangStore'

function ThanhToanLog({ listThanhToan, handleFunc, closeFunc }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-bold">Lịch sử thanh toán</p>
      {/* Hiển thị danh sách thanh toán tại đây */}
      <table>
        <thead>
          <tr>
            <th>Ngày thanh toán</th>
            <th>Số tiền</th>
            <th>Ghi chú</th>
            <th>Tương tác</th>
          </tr>
        </thead>
        <tbody>
          {listThanhToan.map((item, index) => (
            <tr key={index}>
              <td>{item.ngayThanhToan}</td>
              <td>{formatCurrency(item.soTien)}</td>
              <td>{item.ghiChu}</td>
              <td>
                <DonHangButton
                  title="Xóa"
                  handleFunction={() => {
                    if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
                      handleFunc((oldList) => oldList.filter((_, i) => i !== index))
                    }
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-auto flex gap-2 self-end">
        <DonHangButton title="Đóng" handleFunction={() => closeFunc(false)} />
      </div>
    </div>
  )
}

function ThanhToan({ closeFunc, donHang, handleFunc, listThanhToan }) {
  const [money, setMoney] = useState('')
  const [isOpenLog, setOpenLog] = useState(false)
  const { updateListDonHang } = useDonHangStore()

  const total = donHang.listSanPham.reduce((acc, curr) => acc + curr.giaBan * curr.soLuong, 0)

  function thanhToanFunc() {
    if (resetString(money) === '') {
      alert('Vui lòng nhập số tiền thanh toán')
      return
    }
    const newDonHang = {
      ...donHang,
      thanhToan: [[...donHang.thanhToan], generateThanhToanLog(parseFloat(resetString(money)))],
    }
    updateListDonHang(newDonHang)
    handleFunc((thanhToanLog) => [...thanhToanLog, generateThanhToanLog(parseFloat(resetString(money)))])

    localStorage.setItem(`donHang-${donHang.donHangId}`, JSON.stringify(newDonHang))

    alert('Đã ghi nhận thanh toán')
    closeFunc(false)
  }

  function thanhToanAllFunc() {
    const newDonHang = {
      ...donHang,
      thanhToan: [
        [...donHang.thanhToan],
        generateThanhToanLog(parseFloat(donHang.listSanPham.reduce((acc, curr) => acc + curr.giaBan * curr.soLuong, 0))),
      ],
    }
    updateListDonHang(newDonHang)
    handleFunc((thanhToanLog) => [
      ...thanhToanLog,
      generateThanhToanLog(parseFloat(donHang.listSanPham.reduce((acc, curr) => acc + curr.giaBan * curr.soLuong, 0))),
    ])

    localStorage.setItem(`donHang-${donHang.donHangId}`, JSON.stringify(newDonHang))

    alert('Đã ghi nhận thanh toán')
    closeFunc(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex w-full max-w-md flex-col gap-1 rounded bg-white p-8 shadow-lg">
        <p className="font-mono font-bold">Thanh toán</p>
        <div className="mt-4 flex justify-center gap-3">
          <p>Nhập số tiền:</p>
          <input placeholder="1.000.000đ" className="border-black" onChange={(e) => setMoney(e.target.value)} value={formatCurrency(money)} />
        </div>
        <div className="mt-auto flex gap-2 self-end">
          {!isNaN(total) ? (
            <>
              {total - donHang.thanhToan.reduce((acc, curr) => acc + curr.soTien, 0) > 0 && (
                <>
                  <DonHangButton title="Ghi nhận thanh toán" handleFunction={() => thanhToanFunc()} />
                  <DonHangButton title="Xác nhận Thanh toán đủ" handleFunction={() => thanhToanAllFunc()} />
                </>
              )}
            </>
          ) : (
            <p className="text-black">Vui lòng điền kiểm tra lại thông tin</p>
          )}
          <DonHangButton title="Xóa thanh toán" handleFunction={() => setOpenLog(true)} />
          <DonHangButton title="Đóng" handleFunction={() => closeFunc(false)} />
        </div>
        {isOpenLog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="rounded bg-white p-8 shadow-lg">
              <ThanhToanLog listThanhToan={listThanhToan} closeFunc={setOpenLog} handleFunc={handleFunc} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ThanhToan
