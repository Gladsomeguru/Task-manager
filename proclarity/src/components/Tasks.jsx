import { useEffect, useState } from "react";
import { FaEllipsisV, FaRegCalendar } from "react-icons/fa";
import { AiOutlineClose, AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import { CiFilter } from "react-icons/ci";


const Tasks = ({ tasks, setTasks, editingTask, setEditingTask, setOpenModal, openModal }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [filterOptions, setFilterOptions] = useState({
        applied_filter: "All",
        all: true,
        pending: false,
        inProgress: false,
        completed: false
    });
    const [filterApplied, setFilterApplied] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const [allTasks, setAllTasks] = useState([]);


    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest(".menu-button") && !e.target.closest(".menu-dropdown")) {
                setShowMenu(false);
                setSelectedTaskId(null);
                setShowFilterMenu(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);



    useEffect(() => {
        setAllTasks(tasks);
    }, [tasks]);

    const toggleMenu = (id) => {
        setSelectedTaskId(id);
        setShowMenu(!showMenu);
    }

    const toggleFilterMenu = () => {
        setShowFilterMenu(!showFilterMenu);
    }

    const deleteTask = (id) => {
        const updatedTasks = tasks.filter(task => task.id != id);
        setTasks(updatedTasks);
    };

    const editTask = (id) => {
        const taskToEdit = tasks.find(task => task.id === id);
        setEditingTask(taskToEdit);
    }

    const handleChange = (e) => {
        const { name, checked } = e.target;
        setFilterOptions({
            ...filterOptions,
            all: false,
            pending: false,
            inProgress: false,
            completed: false,
            [name]: checked,
            applied_filter: name === "all" ? "All" : name === "pending" ? "Pending" : name === "inProgress" ? "In Progress" : "Completed"
        });
        filterTasks();
        if (name === "all") {
            setFilterApplied(false);
        } else {
            setFilterApplied(true);
        }
    }

    useEffect(() => {
        filterTasks();
    }, [searchTerm, filterOptions]);


    const filterTasks = () => {
        const filteredTasks = tasks.filter(task => {
            // Search match
            const matchesSearch =
                searchTerm === '' ||
                task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                task.description.toLowerCase().includes(searchTerm.toLowerCase());

            // Filter match
            const matchesFilter =
                filterOptions.all ||
                (task.status === 'Pending' && filterOptions.pending) ||
                (task.status === 'In Progress' && filterOptions.inProgress) ||
                (task.status === 'Completed' && filterOptions.completed);

            return matchesSearch && matchesFilter;
        });

        setAllTasks(filteredTasks);
    };


    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
    };


    const addTaskButton = (
        <button
            onClick={() => setOpenModal(true)}
            className="bg-emerald-500 text-slate-100 p-4 py-1 rounded-lg shadow hover:bg-emerald-600 
      transition-colors duration-200 cursor-pointer 
      dark:bg-emerald-700 flex flex-row items-center 
      justify-center gap-2 h-fit lg:w-auto w-full">
            <AiOutlinePlus />
            <span>Add Task</span>
        </button>
    );

    let emptyMessage = "";

    if (filterApplied && searchTerm && allTasks.length === 0) {
        emptyMessage = "No tasks match your search and filter criteria.";
    } else if (filterApplied && allTasks.length === 0) {
        emptyMessage = "No tasks match the selected filter.";
    } else if (searchTerm && allTasks.length === 0) {
        emptyMessage = "No tasks match your search.";
    } else if (!filterApplied && !searchTerm && allTasks.length === 0) {
        emptyMessage = "No tasks available. Please add a task.";
    }

    return (
        <>
            <div className="flex items-center px-4 lg:gap-2 gap-4 flex-wrap lg:mb-0 pb-4">
                {!openModal && tasks.length !== 0 && !editingTask && (
                    <div className="hidden lg:block">{addTaskButton}</div>
                )}
                <div className="flex gap-2 lg:ms-auto flex-wrap w-full lg:w-auto">
                    <form className="ms-auto text-gray-800 bg-white dark:bg-slate-800 flex grow items-center gap-1 dark:text-emerald-100 cursor-pointer p-2 py-1 border border-emerald-300 outline-emerald-300 rounded-lg focus-within:outline-2 dark:border-slate-600 dark:outline-slate-600 box-border">
                        <input type="text" placeholder="Search tasks..." value={searchTerm} onChange={handleSearchChange} className="w-full focus:outline-none" />{!searchTerm ? <AiOutlineSearch /> : <AiOutlineClose onClick={() => setSearchTerm('')} />}
                    </form>
                    <div className="relative">
                        <button className="menu-button ms-auto text-gray-800 bg-white dark:bg-slate-800 flex items-center gap-1 dark:text-emerald-100 
                        cursor-pointer p-2 py-1 border border-emerald-300 rounded-lg outline-emerald-300 hover:outline-2 
                        dark:border-slate-600 dark:outline-slate-600 box-border h-full"
                            onClick={toggleFilterMenu}>
                            <CiFilter />
                            <span className="text-sm font-light">{filterOptions.applied_filter}</span>
                        </button>
                        {showFilterMenu && <form className="menu-dropdown absolute right-0 top-full mt-2 w-max bg-white shadow-md rounded-lg border border-emerald-300 z-10 overflow-hidden dark:bg-slate-800 dark:border-slate-600">
                            <ul className="text-sm text-slate-700 dark:text-emerald-100">
                                <li className="px-4 py-2 hover:bg-gray-100 flex items-center dark:hover:bg-slate-600 cursor-pointer"
                                    onClick={() => handleChange({ target: { name: "all", checked: true } })}>
                                    <input type="radio" id="all" name="status" className="me-2 pointer-events-none [color-scheme:light] dark:[color-scheme:dark]" checked={filterOptions.all} onChange={() => { return }} />
                                    <label htmlFor="all" className="cursor-pointer select-none">All</label>
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-100 flex items-center dark:hover:bg-slate-600 cursor-pointer"
                                    onClick={() => handleChange({ target: { name: "pending", checked: true } })}>
                                    <input type="radio" id="pending" name="status" className="me-2 pointer-events-none [color-scheme:light] dark:[color-scheme:dark]" checked={filterOptions.pending} onChange={() => { return }} />
                                    <label htmlFor="pending" className="cursor-pointer select-none">Pending</label>
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-100 flex dark:hover:bg-slate-600 cursor-pointer"
                                    onClick={() => handleChange({ target: { name: "inProgress", checked: true } })}>
                                    <input type="radio" id="in-progress" name="status" className="me-2 cursor-pointer bg-white [color-scheme:light] dark:[color-scheme:dark]" checked={filterOptions.inProgress} onChange={() => { return }} />
                                    <label htmlFor="in-progress" className="cursor-pointer">In Progress</label>
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-100 flex dark:hover:bg-slate-600 cursor-pointer"
                                    onClick={() => handleChange({ target: { name: "completed", checked: true } })}>
                                    <input type="radio" id="completed" name="status" className="me-2 cursor-pointer [color-scheme:light] dark:[color-scheme:dark]" checked={filterOptions.completed} onChange={() => { return }} />
                                    <label htmlFor="completed" className="cursor-pointer">Completed</label>
                                </li>
                            </ul>
                        </form>}

                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:max-h-[calc(100vh-170px)]  max-h-[calc(100vh-218px)]
            p-4 lg:px-4 lg:pb-2 py-0 overflow-y-auto">
                {allTasks.map((task) => (
                    <div key={task.id} className={`rounded-lg w-full max-w-md bg-white dark:bg-slate-900 shadow-md border-0 border-r-6 w-full lg:1/5
                ${task.status === "Completed" ? "border-green-500 dark:border-green-800" : task.status === "In Progress" ? "border-yellow-300" : "border-red-500 dark:border-red-800"}`}>
                        <div className="flex flex-col gap-2 rounded-lg p-4 h-full">
                            <div className=" flex flex-row gap-2 items-end">
                                <h2 className="text-lg font-semibold w-fit mb-0 text-gray-700 dark:text-slate-300 rounded-lg">{task.title}</h2>
                                <p className="text-sm font-medium text-gray-500 dark:text-slate-400 cursor-default text-nowrap" title={`Priority: ${task.priority} `}>&bull; {task.priority}</p>
                                <div className="relative flex items-center ms-auto mb-auto mt-2">
                                    <button onClick={(e) => { e.stopPropagation(); toggleMenu(task.id) }} className="menu-button ms-auto cursor-pointer text-emerald-600 dark:text-slate-400" >
                                        <FaEllipsisV />
                                    </button>
                                    {showMenu && selectedTaskId == task.id && (
                                        <div className="menu-dropdown absolute right-0 top-full mt-2 w-32 bg-white shadow-md rounded-lg border border-emerald-300 z-10 overflow-hidden dark:bg-slate-800 dark:border-slate-600">
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
                            <div className="flex flex-row gap-2 mt-auto justify-between">
                                <div className="flex flex-row gap-1 items-center bg-gray-100 dark:bg-slate-700 p-2 py-1 rounded-lg text-gray-500 dark:text-slate-300 cursor-default" title={`Due Date: ${task.dueDate ? new Date(task.dueDate)
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
                                    ${task.status === "Completed" ? "bg-green-500 dark:bg-green-700 text-white dark:text-white" : task.status === "In Progress" ?
                                        "bg-yellow-300 dark:bg-yellow-300" :
                                        "text-white bg-red-500 dark:bg-red-800 dark:text-black dark:text-white"}`} title={`Status: ${task.status}`}>
                                    <p className="text-xs font-medium text-nowrap">{task.status}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
                }
                {emptyMessage && (
                    <p className="text-center text-gray-500 dark:text-gray-400 col-span-full">
                        {emptyMessage}
                    </p>
                )}
            </div>
            <div className="lg:hidden flex justify-center m-4 mb-0">{!openModal && tasks.length !== 0 && !editingTask && addTaskButton}</div>
        </>
    )
}

export default Tasks;
