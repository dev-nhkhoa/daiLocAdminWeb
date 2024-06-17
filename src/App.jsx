import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

//pages
import { AuthProvider, listProtectedComponent } from './hooks/useAuth'
import { ProtectedRoute } from './components/ProtectedRoute.jsx'
import Dashboard from '#/pages/Dashboard/Dashboard'
import Login from '#/pages/Login/Login'
import PageTemplate from '#/components/PageTemplate'

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
