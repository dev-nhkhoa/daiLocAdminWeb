import { useParams } from 'react-router-dom'
import { formatCurrency, resetString } from '#/lib/formatCurrency'
import { getDateArr } from '#/lib/handleThings'

import logo from '../../../asset/images/logo.png'

import '#/index.css'

const ExportGiaoHang = () => {
  const { donHangId } = useParams()
  const donHangLoader = JSON.parse(localStorage.getItem(`donHang-${donHangId}`))

  const date = getDateArr()
  const totalDonHang = donHangLoader.listSanPham.reduce(
    (acc, sanPham) => acc + parseFloat(resetString(sanPham.giaBan)) * parseFloat(resetString(sanPham.soLuong)),
    0
  )

  return (
    <div className="m-3 flex flex-col items-center justify-center">
      <div className="flex w-[100vw] items-center justify-between ">
        <div className="px-5">
          <img src={logo} alt="đại lộc logo" className="h-[100px] w-[200px]" />
        </div>
        <div style={{ width: '65%' }}>
          <h5 className="font-mono">CỬA HÀNG TRANG TRÍ NỘI THẤT ĐẠI LỘC</h5>
          <h5 className="font-mono">Địa chỉ: 28, 14E Bình Hưng Hòa B, Bình Tân, TPHCM</h5>
          <h5 className="font-mono">Sđt & Zalo: 0932 481 842</h5>
        </div>
      </div>
      {/* bảng báo giá */}
      <h2 className="font-mono text-2xl font-bold text-red-700">PHIẾU GIAO HÀNG</h2>

      <div className="flex w-full items-center justify-start">
        <div>
          <h5 className="font-mono">
            Kính gửi: Anh/Chị <b>{donHangLoader.tenKhachHang}</b>
          </h5>
          <h5 className="font-mono">
            Địa chỉ công trình: <b>{donHangLoader.diaChi}</b>
          </h5>
          <h5 className="font-mono">
            Số điện thoại: <b>{donHangLoader.soDienThoai}</b>
          </h5>
        </div>
      </div>

      <div>
        <table style={{ width: '90vw' }}>
          <thead>
            <tr>
              <th>STT</th>
              <th style={{ width: '40%' }}>Tên sản phẩm</th>
              <th>Đơn vị</th>
              <th>Đơn giá</th>
              <th>Số lượng</th>
              <th>Thành tiền</th>
              <th>Ghi Chú</th>
            </tr>
          </thead>
          <tbody>
            {donHangLoader.listSanPham.map((sanPham, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td style={{ textAlign: 'left' }}>{sanPham.tenHangHoa}</td>
                <td>{sanPham.donVi}</td>
                <td>{formatCurrency(resetString(sanPham.giaBan))}</td>
                <td>{sanPham.soLuong}</td>
                <td>{formatCurrency(resetString(sanPham.giaBan) * resetString(sanPham.soLuong))}</td>
                <td>{sanPham.ghiChu}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={5} className="text-left font-mono text-lg font-bold text-red-600">
                Tổng cộng:
              </td>
              <td className="bg-green-400 text-center font-mono text-lg font-bold text-red-800">{formatCurrency(totalDonHang)}</td>
            </tr>
          </tfoot>
        </table>
        <h5 className="pr-20 text-right font-mono">
          Thứ {date[0]}, ngày {date[1]} tháng {date[2]} năm {date[3]}
        </h5>
        <div className="flex justify-between px-[130px] ">
          <h5 className="font-mono font-semibold">Người giao hàng</h5>
          <h5 className="font-mono font-semibold">Người nhận hàng</h5>
        </div>
        <div className="flex justify-between px-[170px] ">
          <h5 className="font-mono italic">Ký tên</h5>
          <h5 className="font-mono italic">Ký tên</h5>
        </div>
      </div>
    </div>
  )
}

export default ExportGiaoHang
