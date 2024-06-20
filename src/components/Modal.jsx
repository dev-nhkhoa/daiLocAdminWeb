function Modal({ children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex w-full max-w-md flex-col gap-1 rounded bg-white p-8 shadow-lg">{children}</div>
    </div>
  )
}

export default Modal
