import React, { useContext } from 'react';
import { AgoraVideoPlayer } from 'agora-rtc-react';
import MainStreamContext from '../context/mainStreamContext/mainStreamContext';
import '../styles/UserVideo.css';
const UserVideo = (props) => {
  const mainStreamcontext = useContext(MainStreamContext);
  const {setMainStream} = mainStreamcontext;
  const {track} = props;
  let handleClick = (track1)=>{
         setMainStream(track1);
  }
  return (
    <div className='userVideo' onClick={()=>handleClick(track)}>
      <AgoraVideoPlayer videoTrack={track} style={{height: '100%', width: '250px'}}></AgoraVideoPlayer>
    </div>
  )
}

export default UserVideo
