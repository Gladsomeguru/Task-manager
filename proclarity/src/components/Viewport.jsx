import "../App.css";
import Header from "./Header";
import Main from "./Main";

const Viewport = () => {
    return (
        <div className="viewport col-span-10 flex flex-col"> 
            <Header/>
            <Main/>
        </div>
    )
}   

export default Viewport;