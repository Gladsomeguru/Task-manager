import { FaEllipsisV, FaTrashAlt } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { useState } from "react";

const Tasks = ({ tasks, setTasks }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    const toggleMenu = (id) => {
        setSelectedTaskId(id);
        setShowMenu(!showMenu);
    }

    const deleteTask = (id) => {
        const updatedTasks = tasks.filter(task => task.id != id);
        setTasks(updatedTasks);
    };

    return (
        <div className="flex flex-col flex-wrap justify-start gap-4 m-h-[400px] md:w-1/4 w-2/4">
            {tasks.map((task) => (
                <div key={task.id} className="rounded-lg w-full max-w-md border border-emerald-200 bg-emerald-100 shadow-md dark:bg-slate-900 dark:border-slate-700">
                    <div className="flex flex-row gap-2 m-4 pb-4 border-b border-slate-300 dark:border-slate-700">
                        <p className="mb-0 bg-teal-800 w-fit p-1 px-3 rounded-lg text-sm font-medium">
                            {task.priority}
                        </p>
                        <p className="mb-0 bg-emerald-800 w-fit p-1 px-3 rounded-lg text-sm">
                            {task.status}
                        </p>
                        <div className="relative flex items-center ms-auto">
                            <button onClick={() => toggleMenu(task.id)} className="ms-auto cursor-pointer text-emerald-700 dark:text-slate-500 " >
                                <FaEllipsisV />
                            </button>
                            {showMenu && selectedTaskId==task.id && (
                                <div className="absolute right-0 top-full mt-2 w-32 bg-white shadow-md rounded-lg border border-gray-200 z-10 overflow-hidden dark:bg-slate-800 dark:border-slate-700">
                                    <ul className="text-sm text-slate-700 dark:text-emerald-100">
                                        <li
                                            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-600 cursor-pointer"
                                            onClick={() => {
                                                setShowMenu(false);
                                            }}
                                        >
                                            Edit
                                        </li>
                                        <li
                                            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-600 cursor-pointer"
                                            onClick={() => {
                                                deleteTask(task.id);
                                                setShowMenu(false);
                                            }}
                                        >
                                            Delete
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 rounded-lg p-4 pt-0">
                        <h2 className="text-md font-semibold mb-0 text-emerald-800 dark:text-slate-200">{task.title}</h2>
                        <p className="text-sm text-emerald-800 dark:text-slate-400 mb-0">{task.description}</p>
                        <div className="flex flex-row gap-1 items-center me-auto text-emerald-700 bg-emerald-200 dark:bg-slate-800  p-2 rounded-lg dark:text-slate-400" title="Due Date">
                            <CiCalendar className="text-lg" />
                            <p className="text-sm font-medium">{task.dueDate}</p>
                        </div>
                    </div>
                </div>
            ))
            }
        </div>
    )
}

export default Tasks;