import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import Join from './components/Join';
import WithNav from './components/WithNav';
import WithoutNav from './components/WithoutNav';
import MeetingRoom from './components/MeetingRoom';
function App() {
  return (
    <div className="App backg-black">
     <BrowserRouter>
      <Routes>
        <Route element={<WithNav/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About />}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/join" element={<Join/>}/>
        <Route path="/login" element={<Login/>}/>
        </Route>
        <Route element={<WithoutNav/>}>
        <Route path="/meet" element={<MeetingRoom/>}/>         
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
