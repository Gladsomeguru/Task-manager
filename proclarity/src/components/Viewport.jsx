import "../App.css";
import Header from "./Header";
import Main from "./Main";
import { useOutletContext } from 'react-router-dom';

const Viewport = () => {
    const { isOpen, setIsOpen } = useOutletContext();
    return (
        <div className="viewport lg:col-span-10 col-span-12 flex flex-col"> 
            <Header setIsOpen={setIsOpen} isOpen={isOpen} currentPage="Tasks"/>
            <Main/>
        </div>
    )
}   

export default Viewport;