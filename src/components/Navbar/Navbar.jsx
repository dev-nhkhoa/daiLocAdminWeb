import { Link } from 'react-router-dom'

const NavbarBtn = ({ title }) => {
  return <button className="rounded-lg px-1 py-1 text-black hover:bg-black hover:text-white">{title}</button>
}

const Navbar = () => {
  return (
    <div className="flex w-[inherit] items-center justify-between rounded-3xl border-2 border-solid border-black bg-white px-4 py-2">
      <div className="flex gap-1">
        <h5 className="text-black">Đại Lộc Admin Web</h5>
      </div>
      <div className="flex gap-4">
        <Link to="/">
          <NavbarBtn title="Trang chủ" />
        </Link>
        <Link to="/quan-ly-don-hang">
          <NavbarBtn title="Đơn Hàng" />
        </Link>
        <Link to="/settings">
          <NavbarBtn title="Cài Đặt" />
        </Link>
      </div>
    </div>
  )
}

export default Navbar
