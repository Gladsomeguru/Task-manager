import { useEffect, useState } from 'react';
import Header from './Header';
import { useOutletContext } from 'react-router-dom';
import Calendar from 'react-calendar';
import "../App.css";

const Dashboard = () => {
    const { isOpen, setIsOpen } = useOutletContext();
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    console.log(tasks)
    let pendingTasks = tasks.filter(task => task.status == "Pending");
    let inProgressTasks = tasks.filter(task => task.status == "In Progress");
    let completedTasks = tasks.filter(task => task.status == "Completed");

    const today = new Date();
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(today.getDate() + 7);

    const dueSoon = tasks.filter(
        t => new Date(t.dueDate) >= today && new Date(t.dueDate) <= oneWeekFromNow
    );

    const overdue = tasks.filter(
        t => new Date(t.dueDate) < today && t.status !== "Completed"
    );



    return (
        <div className="viewport lg:col-span-10 col-span-12 flex flex-col h-full overflow-hidden">
            <Header setIsOpen={setIsOpen} isOpen={isOpen} currentPage="Dashboard" />
            <div className="main col-span-10 p-4 rounded-lg shadow-lg m-2 lg:ms-0 h-full bg-emerald-50 dark:bg-slate-800 dark:text-emerald-100 overflow-y-auto">
                <div className='grid lg:grid-cols-4 grid-cols-2 gap-4'>
                    <div className='bg-white dark:bg-slate-900 p-4 rounded-lg shadow-md border-r-6 border-gray-500 dark:border-gray-300'>
                        <h2 className='text-xl text-gray-700 dark:text-slate-300 font-semibold mb-4'>Total Tasks</h2>
                        <div className='text-4xl text-end font-medium text-gray-800 dark:text-slate-100'>{tasks.length}</div>
                    </div>
                    <div className='bg-white dark:bg-slate-900 p-4 rounded-lg shadow-md border-r-6 border-red-500 dark:border-red-800'>
                        <h2 className='text-xl text-gray-700 dark:text-slate-300 font-semibold mb-4'>Pending</h2>
                        <div className='text-4xl text-end font-medium text-gray-800 dark:text-slate-100'>{pendingTasks.length}</div>
                    </div>
                    <div className='bg-white dark:bg-slate-900 p-4 rounded-lg shadow-md border-r-6 border-yellow-300'>
                        <h2 className='text-xl text-gray-700 dark:text-slate-300 font-semibold mb-4'>In Progress</h2>
                        <div className='text-4xl text-end font-medium text-gray-800 dark:text-slate-100'>{inProgressTasks.length}</div>
                    </div>
                    <div className='bg-white dark:bg-slate-900 p-4 rounded-lg shadow-md border-r-6 border-green-500 dark:border-green-800'>
                        <h2 className='text-xl text-gray-700 dark:text-slate-300 font-semibold mb-4'>Completed</h2>
                        <div className='text-4xl text-end font-medium text-gray-800 dark:text-slate-100'>{completedTasks.length}</div>
                    </div>
                    <div className='bg-white dark:bg-slate-900 p-4 rounded-lg shadow-md col-span-2'>
                        <div className='flex items-center justify-between mb-4 gap-2'>
                            <h2 className='text-xl text-gray-700 dark:text-slate-300 font-semibold mb-0'>Upcoming tasks</h2>
                            <p className='me-auto mb-0 bg-gray-200 dark:bg-slate-700 px-2 rounded-lg text-gray-700 dark:text-slate-300  font-medium'>{dueSoon.length}</p>
                            {/* <p className='text-sm text-slate-400'>Tasks due within next 7 days</p> */}
                        </div>
                        {dueSoon.length != 0 ? (
                            <ul className="space-y-2">
                                {dueSoon.map(task => (
                                    <li key={task.id} className="flex items-center justify-between bg-white border dark:bg-slate-800 dark:border-0 p-2 rounded-lg">
                                        <p className="font-medium text-gray-700 dark:text-slate-300">{task.title}</p>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            Due {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        ) : <p className='text-gray-500 dark:text-slate-300'>No upcoming deadline 🎉</p>}
                    </div>
                    <div className='bg-white dark:bg-slate-900 p-4 rounded-lg shadow-md col-span-2 border-r-6 border-red-500 dark:border-red-800'>
                        <div className='flex items-center justify-between mb-4 gap-2'>
                            <h2 className='text-xl text-gray-700 dark:text-slate-300 font-semibold mb-0'>Overdue tasks</h2>
                            <p className='me-auto mb-0 bg-gray-200 dark:bg-slate-700 px-2 rounded-lg text-gray-700 dark:text-slate-300  font-medium'>{overdue.length}</p>
                            {/* <p className='text-sm text-slate-400'>Tasks due within next 7 days</p> */}
                        </div>
                        {overdue.length != 0 ? (
                            <ul className="space-y-2">
                                {overdue.map(task => (
                                    <li key={task.id} className="flex items-center justify-between bg-white border dark:bg-slate-800 dark:border-0 p-2 rounded-lg">
                                        <p className="font-medium text-gray-700 dark:text-slate-300">{task.title}</p>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            Due {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        ) : <p className='text-gray-500 dark:text-slate-300'>No over due tasks 👏</p>}
                    </div>
                    <div className='bg-white dark:bg-slate-900 p-4 rounded-lg shadow-md col-span-2'>
                        <Calendar className="text-gray-700"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;