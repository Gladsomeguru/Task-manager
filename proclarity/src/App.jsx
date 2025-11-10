import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Viewport from "./components/Viewport";
import "./App.css";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="App grid grid-cols-12 h-screen bg-emerald-100 dark:bg-slate-900 dark:text-emerald-100">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="lg:col-span-10 col-span-12">
        <Outlet context={{ isOpen, setIsOpen }} />
      </div>
    </div>
  );
};

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "tasks", element: <Viewport /> },
        { path: "dashboard", element: <Dashboard /> },
      ],
    },
  ],
  { basename: "/Proclarity" }
);

const App = () => <RouterProvider router={router} />;

export default App;
