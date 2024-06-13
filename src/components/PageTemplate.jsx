import Footer from './Footer/Footer'
import Navbar from './Navbar/Navbar'

import '../index.css'

const PageTemplate = ({ body }) => {
  return (
    <div className="w-ful h-[100vh]  p-2">
      <div className="flex h-full w-full flex-col items-center justify-between rounded-lg bg-[#252525]">
        <div className="w-full p-2">
          <Navbar />
        </div>
        <main className="h-[80%] w-full p-2">
          <div className="max-h-[100%] w-full overflow-y-scroll rounded-3xl bg-white p-2">{body}</div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default PageTemplate
