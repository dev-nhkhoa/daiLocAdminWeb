import { v4 as uuidv4 } from 'uuid'
import { formattedDate } from './date'

function generateSanPhamTemplate() {
  return {
    sanPhamId: uuidv4(),
    tenSanPham: '',
    soLuong: '',
    giaNhap: '',
    giaBan: '',
    ghiChu: '',
  }
}

function generateDonHangTemplate(donHangId) {
  return {
    donHangId: `DL-${parseInt(donHangId) + 1}`,
    tenKhachHang: '',
    soDienThoai: '',
    diaChi: '',
    ngayTaoDon: formattedDate(),
    thanhToan: [],
    listSanPham: [generateSanPhamTemplate()],
  }
}

function generateThanhToanLog(soTien, ghiChu) {
  return {
    ngayThanhToan: formattedDate(),
    soTien: soTien || 0,
    ghiChu: ghiChu,
  }
}

export { generateDonHangTemplate, generateSanPhamTemplate, generateThanhToanLog }
