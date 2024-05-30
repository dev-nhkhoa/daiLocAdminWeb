const DonHangButton = ({ title, handleFunction }) => {
  return (
    <button className="rounded-lg bg-black px-2 py-1 text-white hover:bg-slate-600" onClick={handleFunction}>
      {title}
    </button>
  )
}

export default DonHangButton
