import React from 'react';
import { useState } from 'react';

const Controls = (props) => {
  const {stream} = props;
  const [trackState, setTrackState] = useState({video:true, audio:true});

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
    
  }

  return (
    <div>
      <button className='btn' onClick={()=>mute("audio")}>
      {trackState.audio?<i className="fa-solid fa-microphone fa-2xl mx-2" style={{'color': '#ffffff'}}></i>
      :<i className="fa-solid fa-microphone-slash fa-2xl mx-2" style={{'color': '#ffffff'}}></i>}
      </button>
      <button className='btn' onClick={()=>mute("video")}>
          {trackState.video?<i className="fa-solid fa-video fa-2xl mx-2" style={{'color': '#ffffff'}}></i>
          :<i className="fa-solid fa-video-slash fa-2xl mx-2" style={{'color': '#ffffff'}}></i>}
      </button>
            <button className="btn mx-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
            <i class="fa-solid fa-users-line fa-2xl" style={{'color': '#ffffff'}}></i>
</button>
<button className="btn mx-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">     <i className="fa-regular fa-message fa-2xl" style={{'color': '#ffffff'}}></i></button>
            <button className='btn btn-danger mx-2' onClick={()=>leaveChannel()}>Leave Meet</button>
    </div>
  )
}

export default Controls
