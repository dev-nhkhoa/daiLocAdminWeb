import useDonHangStore from '#/hooks/useDonHangStore'
import { useState } from 'react'
import DonHangButton from '../DonHang/DonHangButton'
import Modal from '#/components/Modal'

function Settings() {
  const { listDonHang, setListDonHang } = useDonHangStore()

  const [isOpenImportWindow, setOpenImportWindow] = useState(false)

  function backupDataFunc() {
    if (listDonHang.length === 0) {
      alert('Không có dữ liệu để sao lưu, vui lòng vào trang đơn hàng trước để lấy dữ liệu.')
      return
    }
    const jsonData = JSON.stringify(listDonHang)

    const downloadLink = document.createElement('a')
    downloadLink.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(jsonData))
    downloadLink.setAttribute('download', `backup-${new Date().toISOString().split('T')[0]}.json`)

    document.body.appendChild(downloadLink)

    downloadLink.click()

    document.body.removeChild(downloadLink)
  }

  function importDataFunc() {
    const file = document.querySelector('input[type="file"]').files[0]
    if (!file) {
      alert('Vui lòng chọn file')
      return
    }

    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = function (e) {
      const data = e.target.result
      const jsonData = JSON.parse(data)

      if (!Array.isArray(jsonData)) {
        alert('File không hợp lệ')
        return
      }

      setListDonHang(jsonData)
      alert('Import thành công')
      setOpenImportWindow(false)
    }
  }

  return (
    <>
      {isOpenImportWindow && (
        <Modal>
          <p className="font-mono font-bold">Import data</p>
          <div className="flex items-center gap-3">
            <p>Chọn file:</p>
            <input type="file" accept=".json" />
          </div>

          <DonHangButton title="Import" handleFunction={() => importDataFunc()} />
          <DonHangButton title="Đóng" handleFunction={() => setOpenImportWindow(false)} />
        </Modal>
      )}
      <p className="font-mono text-3xl font-bold">Settings</p>
      <div className="flex gap-3">
        <DonHangButton title="Export data" handleFunction={() => backupDataFunc()} />
        <DonHangButton title="Import data" handleFunction={() => setOpenImportWindow(true)} />
      </div>
    </>
  )
}

export default Settings
