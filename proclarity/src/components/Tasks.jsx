import { useEffect, useState } from "react";
import { FaTrash, FaTrashAlt } from "react-icons/fa";

const Tasks = ({ tasks, setTasks }) => {
    
    
    const deleteTask = (id) => {
        const updatedTasks = tasks.filter(task => task.id != id);
        setTasks(updatedTasks);
    };

    return (
        <div className="flex flex-col flex-wrap justify-start gap-4 m-h-full md:w-1/4 w-2/4">
            {tasks.map((task) => (
                <div key={task.id} className="rounded-lg p-4 w-full max-w-md bg-white shadow-md dark:bg-slate-900 relative">
                    <h2 className="text-xl font-semibold mb-2 text-emerald-800 dark:text-slate-300">{task.title}</h2>
                    <p className="text-emerald-700 dark:text-slate-500">{task.description}</p>
                    <button onClick={() => deleteTask(task.id)} className="text-red-400 absolute top-4 right-4 cursor-pointer"><FaTrashAlt /></button>
                </div>
            ))
            }
        </div>
    )
}

export default Tasks;