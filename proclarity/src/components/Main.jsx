import { use, useEffect, useState } from "react";
import "../App.css"
import TaskManager from "./TaskManager";
import Tasks from "./Tasks";
import { AiOutlinePlus } from "react-icons/ai";

const Main = () => {
    const [openModal, setOpenModal] = useState(false);
    const [tasks, setTasks] = useState(() => {
        return JSON.parse(localStorage.getItem("tasks")) || [];
    });

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);




    return (
        <div className="main col-span-10 p-4 rounded-lg shadow-lg m-2 lg:ms-0 h-full bg-emerald-50 dark:bg-slate-800 dark:text-emerald-100 overflow-y-auto">
            {!openModal && !tasks.length && <div className="flex flex-col items-center justify-self-center justify-center h-full text-center">
                <img src="./images/logo.png" alt="welcome" className="w-24 h-24 mb-4" />
                <h1 className="text-2xl text-slate-700 font-semibold mb-2 dark:text-emerald-100">Welcome to <span className="font-bold text-slate-600 dark:text-slate-100">Pro</span><span className="font-normal text-slate-600 dark:text-slate-100">Clarity</span></h1>
                <p className="text-slate-700 mb-5 dark:text-emerald-100">Boost your productivity and stay organized effortlessly.</p>
                <button onClick={() => setOpenModal(true)} className="bg-emerald-500 text-slate-100 px-4 py-2 rounded-lg shadow hover:bg-emerald-600 transition-colors duration-200 cursor-pointer dark:bg-emerald-700">Create Your First Task</button>
            </div>}
            {openModal && <TaskManager tasks={tasks} setTasks={setTasks} setOpenModal={setOpenModal} />}
            {!openModal && tasks.length != 0 && <Tasks tasks={tasks} setTasks={setTasks} />}
            {!openModal && tasks.length!==0 && < button onClick={() => setOpenModal(true)} className="bg-emerald-500 text-slate-100 px-4 py-2 mt-4 rounded-lg shadow hover:bg-emerald-600 
            transition-colors duration-200 cursor-pointer dark:bg-emerald-700 flex flex-row items-center gap-2"><span>Create Task</span><AiOutlinePlus/></button>}
        </div >
    )
}

export default Main;