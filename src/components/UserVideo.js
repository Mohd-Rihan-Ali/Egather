import React, { useContext, useEffect, useRef } from 'react';
import MainStreamContext from '../context/mainStreamContext/mainStreamContext';
import '../styles/UserVideo.css';
const UserVideo = (props) => {
  const mainStreamcontext = useContext(MainStreamContext);
  const {setMainStream} = mainStreamcontext;
  const {stream} = props;
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current) videoRef.current.srcObject = stream;
  }, [stream]);
  let handleClick = (track1)=>{
         setMainStream(track1);
  }
  return (
      <video className='userVideo' ref={videoRef} autoPlay onClick={()=>handleClick(stream)}/>
  )
}

export default UserVideo
