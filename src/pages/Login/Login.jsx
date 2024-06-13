import { api } from '#/App'
import { useAuth } from '#/hooks/useAuth'
import { useState } from 'react'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { login } = useAuth()

  async function handleAdminLogin(e) {
    e.preventDefault()
    if (username === '' || password === '') {
      alert('Vui lòng nhập tài khoản và mật khẩu!')
      return
    }
    try {
      const loginRequest = await api.get('/login', {
        params: {
          username: username,
          password: password,
        },
      })
      if (loginRequest.status === 200) {
        login(loginRequest.data)
      } else if (loginRequest.status === 401) {
        alert('Tài khoản hoặc mật khẩu không đúng!')
      } else {
        alert('Đã có lỗi xảy ra!')
      }
    } catch (error) {
      alert('Tài khoản hoặc mật khẩu không đúng!')
    }
  }

  return (
    <div className="flex h-[100vh] w-full flex-col items-center justify-center">
      <h4 className="pb-4 text-center">Đăng Nhập</h4>
      {/* login form */}
      <form className="flex flex-col gap-2" onSubmit={handleAdminLogin}>
        {/* username */}
        <div className="flex w-[300px] items-center justify-between">
          <h5>Tài khoản</h5>
          <input
            className="rounded-md border-2 border-solid border-black"
            type="text"
            placeholder="tài khoản"
            onChange={(e) => {
              setUsername(e.target.value)
            }}
          />
        </div>
        {/* password */}
        <div className="flex w-[300px] items-center justify-between">
          <h5>Mật khẩu</h5>
          <input
            className="rounded-md border-2 border-solid border-black"
            type="password"
            placeholder="mật khẩu"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </div>
        {/* login button */}
        <button type="submit" className="rounded-md bg-slate-600 font-mono text-white">
          Đăng nhập
        </button>
      </form>
    </div>
  )
}

export default Login
