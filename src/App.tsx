import { useEffect } from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Dashboard from "./components/dashboard/Dashboard"
import useDarkModeStore from "./store/useDarkModeStore";

function App() {

  const isDark = useDarkModeStore((state) => state.isDark);

  useEffect(() => {
    // Aplica la clase dark al cargar la pagina según el valor en la store
    if (isDark) document.body.classList.add('dark');

    else document.body.classList.remove('dark'); 
  }, [isDark]);

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
