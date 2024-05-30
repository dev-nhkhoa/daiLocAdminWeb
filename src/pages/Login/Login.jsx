import { useAuth } from '#/hooks/useAuth'

const Login = () => {
  const { login } = useAuth()

  function handleAdminLogin(e) {
    e.preventDefault()
    login('admin')
    console.log('test')
  }

  return (
    <div className="flex h-[100vh] w-full flex-col items-center justify-center">
      <h4 className="pb-4 text-center">Đăng Nhập</h4>
      {/* login form */}
      <form className="flex flex-col gap-2" onSubmit={handleAdminLogin}>
        {/* username */}
        <div className="flex w-[300px] items-center justify-between">
          <h5>Tài khoản</h5>
          <input className="rounded-md border-2 border-solid border-black" type="text" placeholder="tài khoản" />
        </div>
        {/* password */}
        <div className="flex w-[300px] items-center justify-between">
          <h5>Mật khẩu</h5>
          <input className="rounded-md border-2 border-solid border-black" type="password" placeholder="mật khẩu" />
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
