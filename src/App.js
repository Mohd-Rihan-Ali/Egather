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
import RoomState from './context/roomContext/RoomState';
import MainStreamState from './context/mainStreamContext/MainStreamState';
import CreateNewMeeting from './components/CreateNewMeeting';
function App() {
  return (
    <div className="App backg-black">
     <BrowserRouter>
        <MainStreamState>
     <RoomState>
      <Routes>
        <Route element={<WithNav/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About />}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/join" element={<Join/>}/>
        <Route path="/createRoom" element={<CreateNewMeeting/>}/>
        <Route path="/login" element={<Login/>}/>
        </Route>
        <Route element={<WithoutNav/>}>
        <Route path="/meet/:roomId" element={<MeetingRoom/>}/>         
        </Route>
      </Routes>
      </RoomState>
        </MainStreamState>
    </BrowserRouter>
    </div>
  );
}

export default App;
