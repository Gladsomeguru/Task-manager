import { useState } from 'react'
import '../App.css'
import './Sidebar.css'
import { FaChartBar, FaCloudSun, FaHome, FaSignOutAlt, FaTasks, FaTimes, FaUser, FaUsers } from 'react-icons/fa'


const Sidebar = ({isOpen,setIsOpen}) => {

    const [active, setActive] = useState("dashboard");

    const navItems = [
        { id: "dashboard", name: "Dashboard", icon: <FaHome /> },
        { id: "tasks", name: "Tasks", icon: <FaTasks /> },
        { id: "teams", name: "Teams", icon: <FaUsers /> },
        { id: "analytics", name: "Analytics", icon: <FaChartBar /> },
    ]

    return (
        <div className={`sidebar bg-gray-700 col-span-2 lg:w-auto w-full lg:h-auto h-full text-slate-100 flex flex-col 
        lg:rounded-lg shadow-lg lg:m-2 m-0 dark:bg-gray-700 lg:static fixed top-0 left-0 transition-transform duration-300'
        ${isOpen? 'translate-x-0' : '-translate-x-full z-50'} lg:translate-x-0 `}>
            <div className='flex flex-row gap-2 items-center p-4'>
                <img src="./images/logo.png" alt="logo" className='side-logo'/>
                <h3 className='text-xl font-normal'><span className='font-bold'>Pro</span>Clarity</h3>
                <button className='lg:hidden ms-auto cursor-pointer' onClick={()=>setIsOpen(!isOpen)}><FaTimes className='text-xl'/></button>
            </div>
            <nav className='flex flex-col m-4'>
                {navItems.map((item) => (
                    <a href="#" key={item.id} onClick={() => setActive(item.id)}
                        className={`flex items-center gap-4 p-2 px-4 rounded-lg 
                            ${active == item.id ? "bg-gray-100 text-slate-700 hover:bg-gray-200" :
                                "hover:bg-gray-200 hover:text-slate-700 transition-colors duration-300 ease-in-out"
                            }`}>{item.icon}{item.name}</a>
                ))}
            </nav>
            <div className="pt-4 mt-auto">
                <a href="#" className="flex items-center gap-2 p-2 px-4 mx-4 rounded-lg hover:bg-gray-300 hover:text-slate-700 transition-colors duration-200"><FaUser /> Profile</a>
                <a href="#" className="flex items-center gap-2 p-2 px-4 mx-4 mb-4 rounded-lg hover:bg-gray-300 hover:text-slate-700 transition-colors duration-200"><FaSignOutAlt /> Logout</a>
            </div>
        </div>
    )
}

export default Sidebar;