/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from './useLocalStorage'
import axios from 'axios'

const AuthContext = createContext()

export const api = axios.create({ baseURL: import.meta.env.VITE_BACKEND_URL })

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = useLocalStorage('user', null)
  const [isWakeUp, setWakeUp] = useState(false)

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
