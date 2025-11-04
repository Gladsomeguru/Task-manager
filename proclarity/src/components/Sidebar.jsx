import { useState } from 'react'
import '../App.css'
import './Sidebar.css'
import { FaChartBar, FaHome, FaSignOutAlt, FaTasks, FaUser, FaUsers } from 'react-icons/fa'


const Sidebar = () => {

    const [active, setActive] = useState("dashboard");

    const navItems = [
        { id: "dashboard", name: "Dashboard", icon: <FaHome /> },
        { id: "tasks", name: "Tasks", icon: <FaTasks /> },
        { id: "teams", name: "Teams", icon: <FaUsers /> },
        { id: "analytics", name: "Analytics", icon: <FaChartBar /> },
    ]

    return (
        <div className="sidebar bg-emerald-500 col-span-2 h-[-12px] text-slate-100 flex flex-col rounded-lg shadow-lg m-2">
            <div className='flex flex-row gap-2 items-center border-b border-emerald-400 p-4'>
                <img src="/images/logo.png" alt="logo" className='side-logo' />
                <h3 className='text-xl font-normal'><span className='font-bold'>Pro</span>Clarity</h3>
            </div>
            <nav className='flex flex-col m-4'>
                {navItems.map((item) => (
                    <a href="#" key={item.id} onClick={() => setActive(item.id)}
                        className={`flex items-center gap-4 p-2 px-4 rounded-lg 
                            ${active == item.id ? "bg-emerald-100 text-slate-700 hover:bg-emerald-200" :
                                "hover:bg-emerald-200 hover:text-slate-700 transition-colors duration-300 ease-in-out"
                            }`}>{item.icon}{item.name}</a>
                ))}
            </nav>
            <div className="border-t border-emerald-400 pt-4 mt-auto">
                <a href="#" className="flex items-center gap-2 p-2 px-4 mx-4 rounded-lg hover:bg-emerald-300 hover:text-slate-700 transition-colors duration-200"><FaUser /> Profile</a>
                <a href="#" className="flex items-center gap-2 p-2 px-4 mx-4 mb-4 rounded-lg hover:bg-emerald-300 hover:text-slate-700 transition-colors duration-200"><FaSignOutAlt /> Logout</a>
            </div>
        </div>
    )
}

export default Sidebar;