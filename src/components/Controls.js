import React from 'react';
import AgoraContext from '../context/agoraContext/agoraContext';
import { useContext } from 'react';
import { useState } from 'react';

const Controls = (props) => {
  const context = useContext(AgoraContext);
  const {useClient} = context;
  const client = useClient();
  const {localTracks, setStart, setInCall} = props;
  const [trackState, setTrackState] = useState({video:true, audio:true});

  const mute = async(type)=>{
      if(type==="audio"){
        await localTracks[0].setEnabled(!trackState.audio);
        setTrackState((ps)=>{
          return {...ps, audio:!ps.audio};
        });
      }
      else if(type==="video"){
        await localTracks[1].setEnabled(!trackState.video);
        console.log("iamclosign my video", localTracks[1], client.uid)
        setTrackState((ps)=>{
          return {...ps, video:!ps.video};
        });
      }
  }

  const leaveChannel = async ()=>{
    await client.leave();
    client.removeAllListeners();
   if(trackState.audio) localTracks[0].close();
   if(trackState.video) localTracks[1].close();
    setStart(false);
    setInCall(false);
  }

  return (
    <div>
      <button className='btn' onClick={()=>mute("audio")}>
      {trackState.audio?<i class="fa-solid fa-microphone fa-2xl mx-2" style={{'color': '#ffffff'}}></i>
      :<i class="fa-solid fa-microphone-slash fa-2xl mx-2" style={{'color': '#ffffff'}}></i>}
      </button>
      <button className='btn' onClick={()=>mute("video")}>
          {trackState.video?<i class="fa-solid fa-video fa-2xl mx-2" style={{'color': '#ffffff'}}></i>
          :<i class="fa-solid fa-video-slash fa-2xl mx-2" style={{'color': '#ffffff'}}></i>}
      </button>
            <button className='btn btn-danger mx-3' onClick={()=>leaveChannel()}>Leave Meet</button>
    </div>
  )
}

export default Controls
