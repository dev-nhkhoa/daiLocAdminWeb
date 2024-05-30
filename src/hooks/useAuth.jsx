/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from './useLocalStorage'
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null)
  const navigate = useNavigate()

  const login = async (data) => {
    setUser(data)
    console.log('hi')

    navigate('/dashboard')
  }

  const logout = () => {
    setUser(null)
    navigate('/', { replace: true })
  }

  const value = useMemo(() => ({ user, login, logout }), [login, logout, user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext)
}
