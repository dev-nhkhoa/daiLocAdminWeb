import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

//pages
import { AuthProvider } from './hooks/useAuth'
import { ProtectedRoute } from './components/ProtectedRoute.jsx'
import Dashboard from '#/pages/Dashboard/Dashboard'
import Login from '#/pages/Login/Login'
import PageTemplate from '#/components/PageTemplate'
import QuanLyDonHang from './pages/QuanLyDonHang/QuanLyDonHang'
import ExportBaoGia from './pages/Export/ExportBaoGia'
import ExportGiaoHang from './pages/Export/ExportGiaoHang'
import DonHang from './pages/DonHang/DonHang'
import Settings from './pages/Settings/Settings'

const listProtectedComponent = [
  { path: '/dashboard', element: <PageTemplate body={<Dashboard />} /> },
  { path: '/settings', element: <PageTemplate body={<Settings />} /> },
  { path: '/quan-ly-don-hang', element: <PageTemplate body={<QuanLyDonHang />} /> },
  { path: '/export/bao-gia/:donHangId', element: <PageTemplate body={<ExportBaoGia />} /> },
  { path: '/export/giao-hang/:donHangId', element: <ExportGiaoHang /> },
  { path: 'quan-ly-don-hang/don-hang/:donHangId', element: <PageTemplate body={<DonHang />} /> },
]

ReactDOM.createRoot(document.getElementById('root')).render(
  // todo:
  // - thống kê đơn giản
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<PageTemplate body={<Dashboard />} />} />
        <Route path="/login" element={<Login />} />
        {listProtectedComponent.map((item, index) => (
          <Route key={index} path={item.path} element={<ProtectedRoute>{item.element}</ProtectedRoute>} />
        ))}
      </Routes>
    </AuthProvider>
  </BrowserRouter>
)
