import axios from 'axios'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { backendURL } from '../package.json'

//pages
import { AuthProvider } from './hooks/useAuth'
import { ProtectedRoute } from './components/ProtectedRoute.jsx'
import Dashboard from '#/pages/Dashboard/Dashboard'
import QuanLyDonHang from '#/pages/QuanLyDonHang/QuanLyDonHang'
import DonHang from '#/pages/DonHang/DonHang'
import Login from '#/pages/Login/Login'
import PageTemplate from '#/components/PageTemplate'

export const api = axios.create({ baseURL: backendURL })

const listProtectedComponent = [
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/quan-ly-don-hang', element: <QuanLyDonHang /> },
  { path: 'quan-ly-don-hang/don-hang/:donHangId', element: <DonHang /> },
]

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<PageTemplate body={<Dashboard />} />} />
        <Route path="/login" element={<Login />} />
        {listProtectedComponent.map((item, index) => (
          <Route
            key={index}
            path={item.path}
            element={
              <ProtectedRoute>
                <PageTemplate body={item.element} />
              </ProtectedRoute>
            }
          />
        ))}
      </Routes>
    </AuthProvider>
  </BrowserRouter>
)
