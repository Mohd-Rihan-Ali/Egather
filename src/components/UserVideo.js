import React from 'react';
import { AgoraVideoPlayer } from 'agora-rtc-react';
import '../styles/UserVideo.css';
const UserVideo = (props) => {
  const {track} = props;
  return (
      <AgoraVideoPlayer videoTrack={track} style={{height: '130px', width: '250px'}}></AgoraVideoPlayer>
  )
}

export default UserVideo
