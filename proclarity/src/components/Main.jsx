import { useEffect, useState } from "react";
import "../App.css"
import TaskManager from "./TaskManager";
import Tasks from "./Tasks";


const Main = () => {
    const [openModal, setOpenModal] = useState(false);
    const [tasks, setTasks] = useState(() => {
        return JSON.parse(localStorage.getItem("tasks")) || [];
    });
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    return (
        <div className="main col-span-10 py-4 rounded-lg shadow-lg m-2 lg:ms-0 bg-emerald-50 h-[calc(100vh-88px)] dark:bg-slate-800 dark:text-emerald-100 overflow-y-auto">
            {!openModal && !tasks.length && <div className="flex flex-col items-center justify-self-center justify-center text-center">
                <img src="./images/logo.png" alt="welcome" className="w-24 h-24 mb-4" />
                <h1 className="text-2xl text-slate-700 font-semibold mb-2 dark:text-emerald-100">Welcome to <span className="font-bold text-slate-600 dark:text-slate-100">Pro</span><span className="font-normal text-slate-600 dark:text-slate-100">Clarity</span></h1>
                <p className="text-slate-700 mb-5 dark:text-emerald-100">Boost your productivity and stay organized effortlessly.</p>
                <button onClick={() => setOpenModal(true)} className="bg-emerald-500 text-slate-100 px-4 py-2 rounded-lg shadow hover:bg-emerald-600 transition-colors duration-200 cursor-pointer dark:bg-emerald-700">Create Your First Task</button>
            </div>}
            {(openModal || editingTask) && <TaskManager tasks={tasks} setTasks={setTasks} setOpenModal={setOpenModal} editingTask={editingTask} setEditingTask={setEditingTask} />}
            {!openModal && tasks.length != 0 && !editingTask &&<Tasks tasks={tasks} setTasks={setTasks}  editingTask={editingTask} setEditingTask={setEditingTask} setOpenModal={setOpenModal} openModal={openModal}/>}
        </div >
    )
}

export default Main;