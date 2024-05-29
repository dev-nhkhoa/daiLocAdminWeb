import { create } from 'zustand'

const donHangStore = create((set) => ({
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
  const listDonHang = donHangStore((state) => state.listDonHang)
  return listDonHang.find((donHang) => donHang.donHangId === id)
}

function getLatestDonHangId() {
  const listDonHang = donHangStore((state) => state.listDonHang)

  return String(listDonHang[listDonHang.length - 1].donHangId).split('-')[1]
}

export default donHangStore
export { getDonHang, getLatestDonHangId }
