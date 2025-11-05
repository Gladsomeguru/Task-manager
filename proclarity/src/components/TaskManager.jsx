import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { LiaTimesSolid  } from "react-icons/lia";

const TaskManager = ({ tasks, setTasks, setOpenModal }) => {
    const [taskInput, setTaskInput] = useState({
        title: "",
        description: "",
        priority: "Low",
        dueDate: ""
    });

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks"));
        if (storedTasks) {
            setTasks(storedTasks);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskInput({ ...taskInput, [name]: value });
    }

    const createTask = () => {
        const newTask = {
            id: Date.now(),
            ...taskInput,
            completed: false
        };

        setTasks([...tasks, newTask]);
        setTaskInput({
            title: "",
            description: "",
            priority: "Low",
            dueDate: ""
        });
        setOpenModal(false);

    }


    return (
        <>
            <form className="flex flex-col gap-2 text-slate-700 mx-auto bg-emerald-100 p-4 rounded-lg shadow-lg dark:text-emerald-100 md:w-3/5 dark:bg-slate-900">
                <div className="flex flex-row justify-between items-center">
                    <h2 className="text-xl font-semibold">Fill in the task details</h2>
                    <button type="button" onClick={() => setOpenModal(false)} className="text-xl font-normal text-slate-700 hover:text-slate-700 dark:text-emerald-100
                dark:hover:text-emerald-300 cursor-pointer"><LiaTimesSolid /></button>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" value={taskInput.title} onChange={handleChange} className="border border-slate-500 rounded-lg p-2 bg-emerald-100 dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" value={taskInput.description} onChange={handleChange} className="border border-slate-500 rounded-lg p-2 bg-emerald-100 dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="priority">Priority</label>
                    <select name="priority" id="priority" value={taskInput.priority} onChange={handleChange} className="border border-slate-500 rounded-lg p-2  bg-emerald-100 text-slate-700 dark:bg-slate-900 dark:text-emerald-100 focus:outline-none focus:ring-1 focus:ring-emerald-500">
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="due-date">Due Date</label>
                    <input name="dueDate" id="due-date" type="date" value={taskInput.dueDate} onChange={handleChange} className="border border-slate-500 rounded-lg p-2 text-slate-700 bg-emerald-100 dark:text-emerald-100 dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
                </div>
                <button type="button" onClick={createTask} className="mt-1 bg-emerald-500 text-slate-100 px-4 py-2 
                rounded-lg shadow hover:bg-emerald-600 transition-colors duration-200 
                cursor-pointer dark:bg-emerald-700">Create</button>
            </form>

        </>
    )
}

export default TaskManager;