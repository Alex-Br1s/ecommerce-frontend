import { Routes, Route } from "react-router-dom"
import DashboardSidebar from "./DashboardSidebar"
import DashboardUsers from "./DashboardUsers"
import DashboardProducts from "./DashboardProducts"


const Dashboard = () => {
  return (
    <section className="flex w-full h-screen">
      <DashboardSidebar />

      <div className="flex-1">
        <Routes>
          <Route path='users' element={<DashboardUsers />} />
          <Route path='products' element={<DashboardProducts />} />
        </Routes>
      </div>

    </section>
  )
}

export default Dashboard