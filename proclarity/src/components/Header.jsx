import { useEffect, useState } from "react";
import "../App.css";
import { FaBars, FaMoon, FaSun } from "react-icons/fa";

const Header = ({ isOpen, setIsOpen }) => {
    const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");

    useEffect(() => {
        if (darkMode) {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.removeAttribute("data-theme");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);


    return (
        <>
            <header className="header bg-emerald-50 w-[full-8px] m-2 lg:ms-0 mb-0 rounded-lg shadow-md flex justify-between items-center p-4 h-16 text-slate-600 dark:bg-slate-800 dark:text-emerald-100" >
                <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}><FaBars className="text-xl" /></button>
                <h1 className="text-xl font-semibold mb-0">Dashboard</h1>
                <input type="text" placeholder="Search" id="searchbar" className="hidden lg:inline border border-emerald-400 rounded-full px-4 py-1 w-64 focus:outline-none focus:ring-1 focus:ring-emerald-500 
                    dark:border-slate-500" />
                <div className="flex gap-4 items-center">
                    <button onClick={() => setDarkMode(!darkMode)} className="text-xl text-emerald-500 hover:text-emerald-400 transition-colors cursor-pointer dark:text-emerald-300">{darkMode ? <FaSun /> : <FaMoon />}</button>
                    <h4 className="mb-0 font-medium hidden lg:block">Gladdy</h4>
                    <img src="./images/user.jpg" alt="user" className="header-user rounded-full w-8 h-8 mt-1" />
                </div>
            </header>
        </>
    );
}

export default Header;