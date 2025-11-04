import "../App.css";

const Header = () => {
    return (
        <>
            <header className="header bg-emerald-50 w-[full-8px] m-2 ms-0 mb-0 rounded-lg shadow-lg flex justify-between items-center p-4 h-16 text-slate-600" >   
                <h1 className="text-xl font-semibold mb-0">Dashboard</h1>
                <div className="flex gap-4 items-center">
                    <input type="text" placeholder="Search" className="border border-emerald-400 rounded-full px-4 py-1 w-64 focus:outline-none focus:ring-0"/>
                    <h4 className="mb-0 font-medium">Gladdy</h4>
                    <img src="/images/user.jpg" alt="user" className="header-user rounded-full w-8 h-8 mt-1"/>
                </div>
            </header>
        </>
    );
}

export default Header;