import { useEffect, useMemo, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import DonHangButton from './DonHangButton'
import { generateSanPhamTemplate } from '#/lib/generateTemplate'
import useDonHangStore from '#/hooks/useDonHangStore'
import { api } from '#/hooks/useAuth'
import Table from './Table'
import CustomerInfo from './CustomerInfo'
import ThanhToan from '#/components/ThanhToan'

const DonHang = () => {
  const { donHangId } = useParams()
  const navigate = useNavigate()

  const { updateListDonHang } = useDonHangStore()
  const listDonHang = useDonHangStore((state) => state.listDonHang)

  const donHang = useMemo(() => {
    return localStorage.getItem(`donHang-${donHangId}`)
      ? JSON.parse(localStorage.getItem(`donHang-${donHangId}`)).donHangId === donHangId
        ? JSON.parse(localStorage.getItem(`donHang-${donHangId}`))
        : listDonHang.find((donHang) => donHang.donHangId === donHangId)
      : listDonHang.find((donHang) => donHang.donHangId === donHangId)
  }, [donHangId, listDonHang])

  const createdDate = donHang.ngayTaoDon
  const [customerName, setCustomerName] = useState(donHang.tenKhachHang || '')
  const [customerPhone, setCustomerPhone] = useState(donHang.soDienThoai || '')
  const [customerAddress, setCustomerAddress] = useState(donHang.diaChi || '')
  const [thanhToanLog, setThanhToanLog] = useState(donHang.thanhToan || [])
  const [listSanPham, setListSanPham] = useState(donHang.listSanPham || [])

  const [isOpenThanhToan, setOpenThanhToan] = useState(false)

  useEffect(() => {
    const newDonHang = {
      ...donHang,
      tenKhachHang: customerName,
      soDienThoai: customerPhone,
      diaChi: customerAddress,
      ngayTaoDon: createdDate,
      thanhToan: thanhToanLog,
      listSanPham: listSanPham,
      createdDate: createdDate,
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
      {isOpenThanhToan && <ThanhToan closeFunc={setOpenThanhToan} donHang={donHang} handleFunc={setThanhToanLog} listThanhToan={thanhToanLog} />}
      <h1 className="text-left font-mono text-2xl font-bold">Đơn hàng:</h1>
      <div className="flex flex-col gap-1">
        <CustomerInfo
          customerName={customerName}
          customerPhone={customerPhone}
          customerAddress={customerAddress}
          thanhToan={thanhToanLog}
          donHangId={donHangId}
          setCustomerName={setCustomerName}
          setCustomerAddress={setCustomerAddress}
          setCustomerPhone={setCustomerPhone}
          createdDate={createdDate}
          listSanPham={listSanPham}
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
          <DonHangButton title="Ghi nhận thanh toán" handleFunction={() => setOpenThanhToan(true)} />
        </div>
      </div>
    </>
  )
}

export default DonHang
