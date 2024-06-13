/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from './useLocalStorage'
import { api } from '#/App'
const AuthContext = createContext()

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
          setWakeUp(true)
        }
      } catch (error) {
        console.log('API is not running!')
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

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext)
}
