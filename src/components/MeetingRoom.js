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
          <div className="options bg-dark">
             <Controls stream={stream}/>
          </div>
      </div>


<div className="offcanvas offcanvas-end bg-dark" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
  <div className="offcanvas-header">
    <h5 className="text-light" id="offcanvasRightLabel">Group Chat</h5>
    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body">
  <Chatbox/>
  </div>
</div>

<div className="offcanvas offcanvas-start bg-dark" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
  <div className="offcanvas-header">
    <h5 className="offcanvas-title text-light" id="offcanvasExampleLabel">Participants</h5>
    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body">
   ...
  </div>
</div>
    </div>
  )
}

export default MeetingRoom
