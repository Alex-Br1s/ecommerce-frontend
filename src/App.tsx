import { BrowserRouter, Routes, Route} from "react-router-dom"
import Dashboard from "./components/dashboard/Dashboard"

function App() {

  return (
  <BrowserRouter>
  <Routes>
    <Route path="/dashboard/*" element={<Dashboard />}/>
  </Routes>
  </BrowserRouter>
  )
}

export default App
