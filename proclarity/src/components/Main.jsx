import "../App.css"

const Main = () => {
    return (
        <div className="main col-span-10 p-4 rounded-lg shadow-lg m-2 md:ms-0 h-full bg-emerald-50 dark:bg-slate-800 dark:text-emerald-100">
            <div className="flex flex-col items-center justify-self-center justify-center h-full text-center">
                <img src="./images/logo.png" alt="welcome" className="w-24 h-24 mb-4" />
                <h1 className="text-2xl text-slate-700 font-semibold mb-2 dark:text-emerald-100">Welcome to <span className="font-bold text-slate-600 dark:text-slate-100">Pro</span><span className="font-normal">Clarity</span></h1>
                <p className="text-slate-700 mb-5 dark:text-emerald-100">Boost your productivity and stay organized effortlessly.</p>
                <button className="bg-emerald-500 text-slate-100 px-4 py-2 rounded-lg shadow hover:bg-emerald-600 transition-colors duration-200 cursor-pointer dark:bg-emerald-700">Create Your First Task</button>
            </div>

        </div>
    )
}

export default Main;