import { useEffect, useState } from "react";
import { FaEllipsisV, FaRegCalendar } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { CiFilter, CiSearch } from "react-icons/ci";


const Tasks = ({ tasks, setTasks, editingTask, setEditingTask, setOpenModal, openModal }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest(".menu-button") && !e.target.closest(".menu-dropdown")) {
                setShowMenu(false);
                setSelectedTaskId(null);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const toggleMenu = (id) => {
        setSelectedTaskId(id);
        setShowMenu(!showMenu);
    }

    const deleteTask = (id) => {
        const updatedTasks = tasks.filter(task => task.id != id);
        setTasks(updatedTasks);
    };

    const editTask = (id) => {
        const taskToEdit = tasks.find(task => task.id === id);
        setEditingTask(taskToEdit);
    }

    return (
        <>
            <div className="flex items-center px-4 lg:gap-2 gap-4 flex-wrap">
                {!openModal && tasks.length !== 0 && !editingTask &&
                    < button onClick={() => setOpenModal(true)} className="bg-emerald-500 text-slate-100 p-4 py-1 rounded-lg shadow hover:bg-emerald-600 
                        transition-colors duration-200 cursor-pointer 
                        dark:bg-emerald-700 flex flex-row items-center 
                        justify-center gap-2 h-fit"><AiOutlinePlus />
                        <span>Add Task</span></button>}
                {/* 
                <div className="flex bg-red-500 items-center px-2 py-1 rounded-lg text-gray-800 dark:bg-red-500 dark:text-gray-900 gap-2 cursor-pointer">
                    <span>Pending</span>
                    <p className="bg-gray-50 text-sm px-1 rounded-md">12</p>
                </div>
                <div className="flex bg-yellow-300 items-center px-2 py-1 rounded-lg text-gray-800 dark:bg-yellow-300 dark:text-gray-900 gap-2">
                    <span>In Progress</span>
                    <p className="bg-gray-50 text-sm px-1 rounded-md">5</p>
                </div>
                <div className="flex bg-yellow-300 items-center px-2 py-1 rounded-lg text-gray-800 dark:bg-yellow-300 dark:text-gray-900 gap-2">
                    <span>Completed</span>
                    <p className="bg-gray-50 text-sm px-1 rounded-md">8</p>
                </div> */}

                <div className="flex gap-2 lg:ms-auto flex-wrap w-full lg:w-auto">
                    <form className="ms-auto text-gray-800 flex grow items-center gap-1 dark:text-emerald-100 cursor-pointer p-2 py-1 border border-emerald-300 outline-emerald-300 rounded-lg focus-within:outline-2 dark:border-slate-600 dark:outline-slate-600 box-border">
                        <input type="text" placeholder="Search tasks..." className="w-full focus:outline-none" /><CiSearch />
                    </form>
                    <p className="ms-auto text-gray-800 flex items-center gap-1 dark:text-emerald-100 cursor-pointer p-2 py-1 border border-emerald-300 rounded-lg outline-emerald-300 hover:outline-2 dark:border-slate-600 dark:outline-slate-600 box-border">
                        <CiFilter />
                        <span>Filter</span>
                    </p>
                </div>

            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 lg:max-h-[calc(100%-50px)] max-h-[calc(100%-100px)] p-4 overflow-y-auto">
                {tasks.map((task) => (
                    <div key={task.id} className={`rounded-lg w-full max-w-md bg-white dark:bg-slate-900 shadow-md border-0 border-r-6 w-full md:1/5 hover:scale-[1.04] hover:shadow-lg transition-all ease-in-out duration-300
                ${task.status === "Completed" ? "border-green-500 dark:border-green-800" : task.status === "In Progress" ? "border-yellow-300 dark:border-yellow-300" : "border-red-500 dark:border-red-800"}`}>
                        <div className="flex flex-col gap-2 rounded-lg p-4 h-full">
                            <div className=" flex flex-row gap-2 items-center">
                                <h2 className="text-lg font-semibold mb-0 text-gray-700 dark:text-gray-300 rounded-lg">{task.title}</h2>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 cursor-default" title={`Priority: ${task.priority} `}>&bull; {task.priority}</p>
                                <div className="relative flex items-center ms-auto">
                                    <button onClick={(e) => { e.stopPropagation(); toggleMenu(task.id) }} className="menu-button ms-auto cursor-pointer text-emerald-600 dark:text-slate-400 " >
                                        <FaEllipsisV />
                                    </button>
                                    {showMenu && selectedTaskId == task.id && (
                                        <div className="menu-dropdown absolute right-0 top-full mt-2 w-32 bg-white shadow-md rounded-lg border border-gray-200 z-10 overflow-hidden dark:bg-slate-800 dark:border-slate-700">
                                            <ul className="text-sm text-slate-700 dark:text-emerald-100">
                                                <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-600 cursor-pointer"
                                                    onClick={() => { setShowMenu(false); editTask(task.id); }}>
                                                    Edit
                                                </li>
                                                <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-600 cursor-pointer"
                                                    onClick={() => {
                                                        deleteTask(task.id);
                                                        setShowMenu(false);
                                                    }}>
                                                    Delete
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <p className="text-sm text-emerald-800 dark:text-slate-400 mb-2">{task.description}</p>
                            <div className="flex flex-row gap-2 mt-auto">
                                <div className="flex flex-row gap-1 items-center bg-gray-100 dark:bg-slate-700 p-2 py-1 rounded-lg text-gray-800 dark:text-slate-300 cursor-default" title={`Due Date: ${task.dueDate ? new Date(task.dueDate)
                                    .toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
                                    .replace(',', '') : 'No due date'}`}>
                                    <FaRegCalendar className="z-0 text-xs opacity-75" />
                                    <p className="text-xs font-medium text-nowrap">{task.dueDate
                                        ? new Date(task.dueDate)
                                            .toLocaleDateString('en-US', { month: 'short', day: '2-digit' })
                                            .replace(',', '')
                                        : 'No due date'}</p>
                                </div>
                                <div className={`flex flex-row flex-wrap gap-1 items-center p-2 py-1 rounded-lg text-black cursor-default
                                    ${task.status === "Completed" ? "bg-green-500 dark:bg-green-700 text-white dark:text-gray-100" : task.status === "In Progress" ? 
                                    "bg-yellow-300 dark:bg-yellow-300" : 
                                    "text-white bg-red-500 dark:bg-red-800 dark:text-black dark:text-white"}`} title={`Status: ${task.status}`}>
                                    <p className="text-xs font-medium text-nowrap">{task.status}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
                }
            </div>
        </>
    )
}

export default Tasks;



// <div key={task.id} className="rounded-lg w-full max-w-md border border-emerald-200 bg-white shadow-md dark:bg-slate-900 dark:border-slate-700">
//     <div className="flex flex-row gap-2 m-4 pb-4 border-b border-slate-300 dark:border-slate-700">
//         <p className="mb-0 bg-teal-800 w-fit p-1 px-3 rounded-lg text-sm font-medium">
//             {task.priority}
//         </p>
//         <p className="mb-0 bg-emerald-800 w-fit p-1 px-3 rounded-lg text-sm">
//             {task.status}
//         </p>
//         <div className="relative flex items-center ms-auto">
//             <button onClick={() => toggleMenu(task.id)} className="menu-button ms-auto cursor-pointer text-emerald-700 dark:text-slate-400 " >
//                 <FaEllipsisV />
//             </button>
//             {showMenu && selectedTaskId == task.id && (
//                 <div className="menu-dropdown absolute right-0 top-full mt-2 w-32 bg-white shadow-md rounded-lg border border-gray-200 z-10 overflow-hidden dark:bg-slate-800 dark:border-slate-700">
//                     <ul className="text-sm text-slate-700 dark:text-emerald-100">
//                         <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-600 cursor-pointer"
//                             onClick={() => { setShowMenu(false); editTask(task.id); }}>
//                             Edit
//                         </li>
//                         <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-600 cursor-pointer"
//                             onClick={() => {
//                                 deleteTask(task.id);
//                                 setShowMenu(false);
//                             }}>
//                             Delete
//                         </li>
//                     </ul>
//                 </div>
//             )}
//         </div>
//     </div>

//     <div className="flex flex-col gap-2 rounded-lg p-4 pt-0">
//         <h2 className="text-md font-semibold mb-0 text-emerald-800 dark:text-slate-200">{task.title}</h2>
//         <p className="text-sm text-emerald-800 dark:text-slate-400 mb-0">{task.description}</p>
//         <div className="flex flex-row gap-1 items-center me-auto text-emerald-700 bg-emerald-100 dark:bg-slate-800  p-2 rounded-lg dark:text-slate-400" title="Due Date">
//             <FaRegCalendar />
//             <p className="text-sm font-medium">{task.dueDate
//                 ? new Date(task.dueDate)
//                     .toLocaleDateString('en-US', { month: 'short', day: '2-digit' })
//                     .replace(',', '')
//                 : 'No due date'}</p>
//         </div>
//     </div>
// </div>