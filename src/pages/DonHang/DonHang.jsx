import { useEffect, useMemo, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import DonHangButton from './DonHangButton'
import { generateSanPhamTemplate } from '#/lib/generateTemplate'
import useDonHangStore, { getDonHang } from '#/hooks/useDonHangStore'
import { api } from '#/hooks/useAuth'
import Table from './Table'
import CustomerInfo from './CustomerInfo'

const DonHang = () => {
  const { donHangId } = useParams()
  const navigate = useNavigate()

  const { updateListDonHang } = useDonHangStore()

  const donHang = useMemo(() => {
    return localStorage.getItem(`donHang-${donHangId}`)
      ? JSON.parse(localStorage.getItem(`donHang-${donHangId}`)).donHangId === donHangId
        ? JSON.parse(localStorage.getItem(`donHang-${donHangId}`))
        : getDonHang(donHangId)
      : getDonHang(donHangId)
  }, [donHangId])

  const [customerName, setCustomerName] = useState(donHang.tenKhachHang || '')
  const [customerPhone, setCustomerPhone] = useState(donHang.soDienThoai || '')
  const [customerAddress, setCustomerAddress] = useState(donHang.diaChi || '')
  const [createdDate, setCreatedDate] = useState(donHang.ngayTaoDon || '')
  const [isThanhToan, setThanhToan] = useState(donHang.thanhToan || false)
  const [listSanPham, setListSanPham] = useState(donHang.listSanPham || [])

  useEffect(() => {
    const newDonHang = {
      ...donHang,
      tenKhachHang: customerName,
      soDienThoai: customerPhone,
      diaChi: customerAddress,
      ngayTaoDon: createdDate,
      thanhToan: isThanhToan,
      listSanPham: listSanPham,
    }

    const intervalId = setInterval(() => {
      saveData()
    }, 1000)

    function saveData() {
      localStorage.setItem(`donHang-${donHangId}`, JSON.stringify(newDonHang))
      updateListDonHang(newDonHang)
    }

    return () => clearInterval(intervalId)
  })

  // function handle click buttons
  function addNewRow() {
    setListSanPham((oldListSanPham) => [...oldListSanPham, { ...generateSanPhamTemplate() }])
  }

  async function handleSaveDonHang() {
    const dbList = await api.get('/danh-sach-don-hang')

    try {
      if (dbList.data.filter((item) => item.donHangId === donHangId).length > 0) {
        await api.put(`/don-hang/${donHangId}`, { data: donHang })
      } else {
        await api.post('/don-hang', { data: donHang })
      }
      alert('Lưu thành công')
    } catch (error) {
      console.log(error)
    }
    localStorage.removeItem(`donHang-${donHangId}`)
  }

  return (
    <>
      <h1 className="text-left font-mono text-2xl font-bold">Đơn hàng:</h1>
      <div className="flex flex-col gap-1">
        <CustomerInfo
          customerName={customerName}
          customerPhone={customerPhone}
          customerAddress={customerAddress}
          isThanhToan={isThanhToan}
          donHangId={donHangId}
          setCustomerName={setCustomerName}
          setCustomerAddress={setCustomerAddress}
          setCustomerPhone={setCustomerPhone}
          createdDate={createdDate}
        />
      </div>
      <div className="pt-2">
        <Table listSanPham={listSanPham} setListSanPham={setListSanPham} />
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          paddingTop: '16px',
        }}
      >
        <div style={{ display: 'flex', gap: 2 }}>
          <DonHangButton title="Thêm 1 dòng" handleFunction={addNewRow} />
          <DonHangButton title="Lưu đơn hàng" handleFunction={handleSaveDonHang} />
          <DonHangButton title="Xuất file báo giá" handleFunction={async () => navigate(`../export/bao-gia/${donHang.donHangId}`)} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <DonHangButton title="Xuất file giao hàng" handleFunction={() => navigate(`../export/giao-hang/${donHang.donHangId}`)} />
          <DonHangButton
            title="Ghi nhận thanh toán"
            handleFunction={() => {
              setThanhToan(true)
              alert('Đã ghi nhận thanh toán')
            }}
          />
        </div>
      </div>
    </>
  )
}

export default DonHang
