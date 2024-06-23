/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from './useLocalStorage'
import axios from 'axios'
import useDonHangStore from './useDonHangStore'
import { generateDonHangTemplate } from '#/lib/generateTemplate'

const AuthContext = createContext()

export const api = axios.create({ baseURL: import.meta.env.VITE_BACKEND_URL })

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = useLocalStorage('user', null)
  const [isWakeUp, setWakeUp] = useState(false)

  const { listDonHang, setListDonHang } = useDonHangStore()

  useEffect(() => {
    async function apiWakeUp() {
      try {
        const wakeUp = await api.get('/')
        if (wakeUp.status === 200) {
          console.log('API is running!')
          for (let i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i).includes('donHang')) {
              console.log(localStorage.key(i))
              localStorage.removeItem(localStorage.key(i))
            }
          }
          setWakeUp(true)
        }
      } catch (error) {
        console.log(error)
        alert('API is not running!')
      }
    }
    apiWakeUp()
  }, [])

  useEffect(() => {
    async function initialDonHang() {
      try {
        if (listDonHang.length > 0) return
        const response = await api.get('/danh-sach-don-hang')
        if (response.data.length === 0) {
          const template = generateDonHangTemplate(0)
          setListDonHang([template])
          localStorage.setItem(`donHang-${template.donHangId}`, JSON.stringify(template))
          return
        }
        setListDonHang(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    initialDonHang()
  }, [listDonHang.length, setListDonHang])

  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user])

  const login = async (data) => {
    setUser(data)
    navigate('/dashboard')
  }

  const logout = () => {
    setUser(null)
    navigate('/', { replace: true })
  }

  const value = useMemo(() => ({ user, login, logout }), [login, logout, user])
  return <AuthContext.Provider value={value}>{isWakeUp ? <>{children}</> : <p>Đang kết nối api...</p>}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
