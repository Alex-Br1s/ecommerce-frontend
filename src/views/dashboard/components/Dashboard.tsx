import { Routes, Route } from "react-router-dom"
import DashboardSidebar from "./DashboardSidebar"
import DashboardProductScreen from "../screens/DashboardProductScreen"
import DashboardCategories from "../DashboardCategories/DashboardCategories"
import DashboardUsers from "../DashboardUsers/DashboardUsers"
import useDarkModeStore from "../../../store/useDarkModeStore"
import { MdWbSunny } from "react-icons/md";
import { BsFillMoonStarsFill } from "react-icons/bs";


const Dashboard = () => {

  const isDark = useDarkModeStore(state => state.isDark)
  const setMode = useDarkModeStore(state => state.setMode)

  return (
    <section className="flex w-full min-h-full overflow-y-hidden dark:bg-[#121212] bg-[#eee]">
      <DashboardSidebar />
      <div className="flex-1">
      <button className="text-2xl" onClick={setMode}>{isDark ? <MdWbSunny className="text-yellow-500" /> : <BsFillMoonStarsFill className="text-sky-900"/>}</button>
        <Routes>
          <Route path='users' element={<DashboardUsers />} />
          <Route path='products' element={<DashboardProductScreen />} />
          <Route path='categories' element={<DashboardCategories />} />
        </Routes>
      </div>

    </section>
  )
}

export default Dashboard