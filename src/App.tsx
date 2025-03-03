import { BrowserRouter, Routes, Route} from "react-router-dom"
import Dashboard from "./views/dashboard/components/Dashboard"

function App() {

  return (
  <div className="overflow-x-hidden">
    <BrowserRouter>
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />}/>
    </Routes>
    </BrowserRouter>
  </div>
  )
}

export default App
