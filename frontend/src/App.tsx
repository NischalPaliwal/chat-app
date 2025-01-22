import { AfterJoin } from "./components/AfterJoin"
import { BeforeJoin } from "./components/BeforeJoin"

function App() {
  return (
    <div className="flex items-center justify-center bg-black min-h-screen">
      <div className='h-[500px] w-[500px] border border-slate-300 bg-gray-800 rounded-lg shadow-lg shadow-slate-500 p-4'>
        <AfterJoin />
      </div>
    </div>
  )
}

export default App
