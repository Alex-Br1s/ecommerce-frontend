import { useState,/*  useEffect  */} from "react";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { MdOutlineCategory } from "react-icons/md";
import { HiUsers } from "react-icons/hi2";
import { /* IoIosSearch */ IoIosMenu, IoIosClose } from "react-icons/io";
import { Link } from "react-router-dom";

const DashboardSidebar = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false)

  const closeMenu = () => {
    setIsOpenMenu(false)
  }

    // useEffect para controlar el scroll en el fondo
    /* useEffect(() => {
      if (isOpenMenu) {
        document.body.classList.add('overflow-hidden')
      } else {
        document.body.classList.remove('overflow-hidden')
      }
      // Cleanup al desmontar
      return () => document.body.classList.remove('overflow-hidden')
    }, [isOpenMenu]) */

  return (
  <div>
    <button onClick={() => setIsOpenMenu(!isOpenMenu)} className="fixed top-2 left-2 z-50 px-[3px] py-[2px] bg-gray-800 dark:bg-[#eee] text-white dark:text-[#555] rounded-md md:hidden">
      {isOpenMenu ? <IoIosClose className="text-2xl" /> : <IoIosMenu className="text-2xl" />}
    </button>
    <nav className={`bg-white dark:bg-[#1f1f1f] fixed top-0 left-0 h-screen min-w-[230px] transition-transform ${
          isOpenMenu ? "translate-x-0 z-30 shadow-lg dark:shadow-[#555]" : "-translate-x-full"
        } md:translate-x-0 md:relative md:flex md:flex-col justify-start gap-y-7`}>
        <div className="flex flex-col items-center text-center">
          <div className="mt-7">
            <img 
            className="w-20 h-20 rounded-full"
            src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" 
            alt="photo admin" />
            <p className="text-teal-500 font-medium mt-3">Alex Bris</p>
            <p className="text-gray-500 dark:text-gray-300 font-medium text-xs">Administrador</p>
          </div>
        </div>
       {/*  <div className="flex justify-center items-center gap-x-1 my-6 md:my-0">
            <input
            className="w-40 rounded-sm p-1 pl-2 text-sm border"
            type="text" 
            placeholder="Search" />
            <button className="bg-slate-400 text-xl text-white p-[4px] rounded-sm cursor-pointer"><IoIosSearch /></button>
        </div> */}
      <div className="pl-5 flex flex-col font-medium text-gray-700 dark:text-[#ccc] justify-start gap-y-5 mt-7 md:mt-0">
        <div className="flex items-center h-10 gap-x-2 hover:bg-[#eee] hover:dark:bg-[#121212]  hover:rounded-l-sm hover:pl-3 transition-all ease duration-500">
            <button className="text-xl"><TbLayoutDashboardFilled /></button>
            <Link to='/dashboard' onClick={closeMenu} className="">Dashboard</Link>
        </div>
        <div className="flex items-center h-10 gap-x-2 hover:bg-[#eee] hover:dark:bg-[#121212]  hover:rounded-l-sm hover:pl-3 transition-all ease duration-500">                                   
            <button className="text-2xl"><GiCardboardBoxClosed /></button>
            <Link to='/dashboard/products' onClick={closeMenu}>Products</Link>
        </div>
        <div className="flex items-center h-10 gap-x-2 hover:bg-[#eee] hover:dark:bg-[#121212] hover:rounded-l-sm hover:pl-3 transition-all ease duration-500">
            <button className="text-xl"><MdOutlineCategory /></button>
            <Link to='/dashboard/categories' onClick={closeMenu}>Categories</Link>
        </div>
        <div className="flex items-center h-10 gap-x-2 hover:bg-[#eee] hover:dark:bg-[#121212]  hover:rounded-l-sm hover:pl-3 transition-all ease duration-500">
            <button className="text-xl"><HiUsers /></button>
            <Link to='/dashboard/users' onClick={closeMenu}>Users</Link>
        </div>
      </div>
    </nav>
  </div>
  )
}

export default DashboardSidebar