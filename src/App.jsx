import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

//pages
import Dashboard from './pages/Dashboard/Dashboard'
import Login from './pages/Login/Login'
import QuanLyDonHang from './pages/QuanLyDonHang/QuanLyDonHang'
import DonHang from './pages/DonHang/DonHang'
import ExportBaoGia from './pages/Export/ExportBaoGia/ExportBaoGia'

import PageTemplate from './components/PageTemplate'
import axios from 'axios'
import Initial from './components/Initial'

export const api = axios.create({ baseURL: 'http://localhost:3000/api/v1/' })

const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    element: <PageTemplate body={<Dashboard />} />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <PageTemplate body={<Dashboard />} />,
  },
  {
    path: '/quan-ly-don-hang',
    element: <PageTemplate body={<QuanLyDonHang />} />,
  },
  {
    path: '/quan-ly-don-hang/don-hang/:donHangId',
    element: <PageTemplate body={<DonHang />} />,
  },
  {
    path: '/don-hang/tao-don-moi',
    element: <PageTemplate body={<DonHang taoDonMoi />} />,
  },
  {
    path: '/export/bao-gia/:donHangId',
    element: <ExportBaoGia />,
  },
  {
    path: '/export/giao-hang/:donHangId',
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Initial>
    <RouterProvider router={router} />
  </Initial>
)
