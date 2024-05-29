import { api } from '#/App'
import donHangStore from '#/lib/zustand/ListDonHangStore'
import { useEffect, useState } from 'react'

function Initial({ children }) {
  const [isInit, setInit] = useState(false)
  const [error, setError] = useState(false)

  const setListDonHang = donHangStore((state) => state.setListDonHang)

  useEffect(() => {
    async function initialize() {
      setInit(true)

      try {
        const response = await api.get('/danh-sach-don-hang')
        setListDonHang(response.data)
      } catch (error) {
        setError(error.message)
      } finally {
        setInit(false)
      }
    }

    initialize()
  }, [setListDonHang])

  return (
    <>
      {isInit && (
        <div className="flex items-center justify-center">
          <p className="text-2xl font-bold">Đang tải file...</p>
        </div>
      )}
      {!isInit && !error ? <>{children}</> : <p>{error}</p>}
    </>
  )
}

export default Initial
