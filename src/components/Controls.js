import React, { useContext } from 'react';
import { useState } from 'react';
import RoomContext from '../context/roomContext/roomContext';
import { useNavigate } from 'react-router-dom';

const Controls = (props) => {
  const {stream} = props;
  const [trackState, setTrackState] = useState({video:true, audio:true});
  const { ws, shareScreen} = useContext(RoomContext);
  const navigate = useNavigate();

  const mute = async(type)=>{
      if(type==="audio"){
        stream.getAudioTracks()[0].enabled = !trackState.audio;
        setTrackState((ps)=>{
          return {...ps, audio:!ps.audio};
        });
      }
      else if(type==="video"){
        stream.getVideoTracks()[0].enabled = !trackState.video;
        setTrackState((ps)=>{
          return {...ps, video:!ps.video};
        });
      }
  }

  const leaveChannel = async ()=>{
     ws.emit("user-leaves");
     navigate('/')
  }

  return (
    <div>
      <button className='btn text-white' onClick={()=>mute("audio")}>
      {trackState.audio?<i className="fa-solid fa-microphone fa-xl mx-2" style={{'color': '#ffffff'}}></i>
      :<i className="fa-solid fa-microphone-slash fa-xl mx-2" style={{'color': '#ffffff'}}></i>}
      <div>Audio</div>
      </button>
      <button className='btn text-white' onClick={()=>mute("video")}>
          {trackState.video?<i className="fa-solid fa-video fa-xl mx-2" style={{'color': '#ffffff'}}></i>
          :<i className="fa-solid fa-video-slash fa-xl mx-2" style={{'color': '#ffffff'}}></i>}
          <div>Video</div>
      </button>
            <button className="btn mx-2 text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
            <i className="fa-solid fa-users-line fa-xl" style={{'color': '#ffffff'}}></i>
           <div>Participants</div> 
</button>
<button className='btn mx-2 text-white' onClick={shareScreen}>
<i className="fa-solid fa-display fa-xl" style={{'color': '#ffffff'}}></i>
<div>Share Screen</div>
</button>
<button className="btn mx-2 text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">     <i className="fa-regular fa-message fa-xl" style={{'color': '#ffffff'}}></i>
<div>Chat</div>
</button>
            <button className='btn btn-danger mx-2' onClick={()=>leaveChannel()}>Leave Meet</button>
    </div>
  )
}

export default Controls
