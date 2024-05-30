import { create } from 'zustand'

const useDonHangStore = create((set) => ({
  listDonHang: [],
  setListDonHang: (listDonHang) => set({ listDonHang: [...listDonHang] }),
  updateListDonHang: (donHang) => {
    set((state) => {
      const index = state.listDonHang.findIndex((item) => item.donHangId === donHang.donHangId)
      state.listDonHang[index] = donHang
      return { listDonHang: [...state.listDonHang] }
    })
  },
  addDonHang: (donHang) => set((state) => ({ listDonHang: [...state.listDonHang, { ...donHang }] })),
  removeDonHang: (donHangId) => set((state) => ({ listDonHang: state.listDonHang.filter((donHang) => donHang.donHangId !== donHangId) })),
}))

function getDonHang(id) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const listDonHang = useDonHangStore((state) => state.listDonHang)
  return listDonHang.find((donHang) => donHang.donHangId === id)
}

function getLatestDonHangId() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const listDonHang = useDonHangStore((state) => state.listDonHang)

  return String(listDonHang[listDonHang.length - 1].donHangId).split('-')[1]
}

export default useDonHangStore
export { getDonHang, getLatestDonHangId }
