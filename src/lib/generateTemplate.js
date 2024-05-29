import { v4 as uuidv4 } from 'uuid'
import { formattedDate } from './date'

function generateSanPhamTemplate() {
  return {
    sanPhamId: uuidv4(),
    tenSanPham: '',
    soLuong: '',
    giaNhap: '',
    giaBan: '',
    ghiChu: 'tests',
  }
}

function generateDonHangTemplate(donHangId) {
  return {
    donHangId: `DL-${parseInt(donHangId) + 1}`,
    tenKhachHang: '',
    soDienThoai: '',
    diaChi: '',
    ngayTaoDon: formattedDate(),
    thanhToan: false,
    ngayThanhToan: null,
    listSanPham: [generateSanPhamTemplate()],
  }
}

export { generateDonHangTemplate, generateSanPhamTemplate }
