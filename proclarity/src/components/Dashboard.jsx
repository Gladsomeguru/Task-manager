import { useEffect, useState } from 'react';
import Header from './Header';
import { useOutletContext } from 'react-router-dom';
import Calendar from 'react-calendar';
import "../App.css";
import { GiCoffeeCup, GiTrophyCup } from "react-icons/gi";



const Dashboard = () => {
    const { isOpen, setIsOpen } = useOutletContext();
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    let pendingTasks = tasks.filter(task => task.status == "Pending");
    let inProgressTasks = tasks.filter(task => task.status == "In Progress");
    let completedTasks = tasks.filter(task => task.status == "Completed");

    const today = new Date();
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(today.getDate() + 7);

    const dueSoon = tasks.filter(
        t => new Date(t.dueDate) >= today && new Date(t.dueDate) <= oneWeekFromNow && t.status !== "Completed"
    );

    dueSoon.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    const overdue = tasks.filter(
        t => new Date(t.dueDate) < today && t.status !== "Completed"
    );


    return (
        <div className="viewport lg:col-span-10 col-span-12 flex flex-col h-full overflow-hidden">
            <Header setIsOpen={setIsOpen} isOpen={isOpen} currentPage="Dashboard" />
            <div className="main col-span-10 p-4 rounded-lg shadow-lg m-2 lg:ms-0 max-h-[calc(100vh-88px)] bg-emerald-50 dark:bg-slate-800 
            dark:text-emerald-100 overflow-y-auto">
                <div className='grid lg:grid-cols-4 grid-cols-2 gap-4 lg:grid-rows-[auto_1fr] lg:h-[calc(100vh-120px)]'>
                    <div className='flex flex-col bg-white dark:bg-slate-900 p-4 rounded-lg shadow-md border-r-6 border-gray-500 dark:border-gray-300'>
                        <h2 className='text-lg text-gray-700 dark:text-slate-300 font-semibold'>Total Tasks</h2>
                        <div className='text-4xl text-end font-medium text-gray-800 dark:text-slate-100 mt-auto'>
                            {tasks.length}</div>
                    </div>
                    <div className='flex flex-col bg-white dark:bg-slate-900 p-4 rounded-lg shadow-md border-r-6 border-red-500 dark:border-red-800'>
                        <h2 className='text-lg text-gray-700 dark:text-slate-300 font-semibold'>Pending</h2>
                        <div className='text-4xl text-end font-medium text-gray-800 dark:text-slate-100 mt-auto'>{pendingTasks.length}</div>
                    </div>
                    <div className='flex flex-col bg-white dark:bg-slate-900 p-4 rounded-lg shadow-md border-r-6 border-yellow-300'>
                        <h2 className='text-lg text-gray-700 dark:text-slate-300 font-semibold'>In Progress</h2>
                        <div className='text-4xl text-end font-medium text-gray-800 dark:text-slate-100 mt-auto'>{inProgressTasks.length}</div>
                    </div>
                    <div className='flex flex-col bg-white dark:bg-slate-900 p-4 rounded-lg shadow-md border-r-6 border-green-500 dark:border-green-800'>
                        <h2 className='text-lg text-gray-700 dark:text-slate-300 font-semibold'>Completed</h2>
                        <div className='text-4xl text-end font-medium text-gray-800 dark:text-slate-100 mt-auto'>{completedTasks.length}</div>
                    </div>
                    <div className='bg-white dark:bg-slate-900 p-4 rounded-lg shadow-md col-span-2
                    overflow-y-hidden min-h-fit flex flex-col'>
                        <div className='flex items-center justify-between mb-4 gap-2'>
                            <h2 className='text-lg text-gray-700 dark:text-slate-300 font-semibold mb-0'>Upcoming tasks</h2>
                            <p className='text-lg me-auto mb-0 bg-gray-200 dark:bg-slate-700 px-2 rounded-lg text-gray-700 dark:text-slate-300 
                             font-medium'>{dueSoon.length}</p>
                            {/* <p className='text-sm text-slate-400'>Tasks due within next 7 days</p> */}
                        </div>
                        {dueSoon.length != 0 ? (
                            <ul className="space-y-2 h-[calc(100%-40px)] overflow-y-auto pe-2">
                                {dueSoon.map(task => (
                                    <li key={task.id} className="flex items-center justify-between bg-white border dark:bg-slate-800 dark:border-0 p-2 rounded-lg">
                                        <p className="font-medium text-gray-700 dark:text-slate-300">{task.title}</p>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            Due {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        ) : <div className='flex flex-col grow items-center justify-center'>
                            {/* <p className='text-gray-500 dark:text-slate-300'>No upcoming deadline 🎉</p> */}
                            <GiCoffeeCup className='text-9xl self-center items-self-center text-gray-300 dark:text-gray-600'/>
                            <p className='text-center text-gray-500'>All caught up! Time to enjoy that coffee break.</p>
                            </div>}
                    </div>

                    <div className='bg-white dark:bg-slate-900 p-4 rounded-lg shadow-md col-span-2 border-r-6 border-red-500
                    dark:border-red-800 overflow-y-hidden min-h-full flex flex-col'>
                        <div className='flex items-center justify-between mb-4 gap-2'>
                            <h2 className='text-lg text-gray-700 dark:text-slate-300 font-semibold mb-0'>Overdue tasks</h2>
                            <p className='text-lg me-auto mb-0 bg-red-500 text-gray-100 dark:text-gray-200
                            dark:bg-red-700 px-2 rounded-lg font-medium'>{overdue.length}</p>
                        </div>
                        {overdue.length != 0 ? (
                            <ul className="space-y-2 h-[calc(100%-40px)] overflow-y-auto pe-2 ">
                                {overdue.map(task => (
                                    <li key={task.id} className="flex items-center justify-between bg-white border dark:bg-slate-800 dark:border-0 p-2 rounded-lg">
                                        <p className="font-medium text-gray-700 dark:text-slate-300">{task.title}</p>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            Due {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        ) : <div className='flex flex-col grow items-center justify-center'>
                            {/* <p className='text-gray-500 dark:text-slate-300'>No upcoming deadline 🎉</p> */}
                            <GiTrophyCup className='text-9xl self-center items-self-center text-gray-300 dark:text-gray-600'/>
                            <p className='text-center text-gray-500'>All tasks on time — you're winning the productivity game!</p>
                            </div>}
                    </div>
                    {/* <div className='bg-white dark:bg-slate-900 p-4 rounded-lg shadow-md col-span-2 row-span-auto lg:block hidden'>
                        <Calendar className="text-gray-700 dark:text-slate-300" />
                    </div>
                    <div className='bg-white dark:bg-slate-900 p-4 rounded-lg shadow-md col-span-2 row-span-auto lg:hidden block'>
                        <Calendar className="text-gray-700 dark:text-slate-300" />
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Dashboard;