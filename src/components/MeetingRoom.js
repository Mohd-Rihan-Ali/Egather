import React,{ useState, useContext, useEffect} from 'react'
import '../styles/MeetingRoom.css'
import MainStream from './MainStream';
import UserStream from './UserStream';
import Chatbox from './Chatbox';
import RoomContext from '../context/roomContext/roomContext';
import Controls from './Controls';
import { useParams } from 'react-router-dom';

const MeetingRoom = (props) => {
  const { roomId } = useParams();
  const { ws, me, stream, peers } = useContext(RoomContext);

  useEffect(() => {
    if (me){
      console.log("i emitting join-room", roomId)
      ws.emit("join-room", { roomId: roomId, peerId: me._id });
    }
  }, [roomId, me, ws]);
  return (
    <div className='Room'>
      <div className="Streams">
        <UserStream peers={peers} stream={stream}/>
          <div className="mainStream">
           <MainStream/>
          </div>
          <div className="options">
             <Controls/>
          </div>
      </div>
      <div className="chatbox">
        <Chatbox/>
      </div>
    </div>
  )
}

export default MeetingRoom
