import './App.css'
import Sidebar from './components/Sidebar';
import Viewport from './components/Viewport';

const App = () => {
  return (
    <div className="App grid grid-cols-12 h-screen">
      <Sidebar/>
      <Viewport/>
    </div>
  )
}

export default App;