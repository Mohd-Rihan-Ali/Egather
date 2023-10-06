import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { useState } from 'react';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import Join from './components/Join';
import WithNav from './components/WithNav';
import WithoutNav from './components/WithoutNav';
import MeetingRoom from './components/MeetingRoom';
import AgoraState from './context/agoraContext/AgoraState';
import MainStreamState from './context/mainStreamContext/MainStreamState';
function App() {
  const [inCall, setInCall] = useState(false);
  return (
    <div className="App backg-black">
      <AgoraState>
        <MainStreamState>
     <BrowserRouter>
      <Routes>
        <Route element={<WithNav/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About />}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/join" element={<Join setInCall={setInCall}/>}/>
        <Route path="/login" element={<Login/>}/>
        </Route>
        <Route element={<WithoutNav/>}>
        <Route path="/meet/:roomId" element={<MeetingRoom setInCall={setInCall}/>}/>         
        </Route>
      </Routes>
    </BrowserRouter>
        </MainStreamState>
      </AgoraState>
    </div>
  );
}

export default App;
