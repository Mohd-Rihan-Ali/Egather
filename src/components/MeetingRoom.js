import React,{ useState, useContext, useEffect} from 'react'
import '../styles/MeetingRoom.css'
import MainStream from './MainStream';
import UserStream from './UserStream';
import Chatbox from './Chatbox';
import AgoraContext from '../context/agoraContext/agoraContext';
import MainStreamContext from '../context/mainStreamContext/mainStreamContext';
import Controls from './Controls';

const MeetingRoom = (props) => {
   const {setInCall} = props;
   const [users, setUsers] = useState([]);
   const [start, setStart] = useState(false);
   const context = useContext(AgoraContext);
   const {joinRoomInit,joinStream, localTracks, ready} = context;
   const mainStreamcontext = useContext(MainStreamContext);
   const {streamReady} = mainStreamcontext;

   useEffect(()=>{
        joinRoomInit();
        joinStream();
   }, [joinRoomInit, joinStream]);
  return (
    <div className='Room'>
      <div className="Streams">
         {start && localTracks &&  <UserStream users={users} tracks={localTracks}/>}
          <div className="mainStream">
            {streamReady &&  <MainStream/>}
          </div>
          <div className="options">
             {ready && localTracks && (<Controls tracks={localTracks} setStart={setStart} setInCall={setInCall}/>)}
          </div>
      </div>
      <div className="chatbox">
        <Chatbox/>
      </div>
    </div>
  )
}

export default MeetingRoom
