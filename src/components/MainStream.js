import React, { useContext } from 'react';
import { AgoraVideoPlayer } from 'agora-rtc-react';
import '../styles/MainStream.css';
import MainStreamContext from '../context/mainStreamContext/mainStreamContext';

const MainStream = () => {
  const mainStreamcontext = useContext(MainStreamContext);
  const {mainStream} = mainStreamcontext;
  console.log(mainStream);
  return (
           <div className="mainVideo">
      <AgoraVideoPlayer videoTrack={mainStream} style={{height: '100%', width: '100%'}}></AgoraVideoPlayer>
    </div>
  )
}

export default MainStream
