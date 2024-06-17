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

export default useDonHangStore
