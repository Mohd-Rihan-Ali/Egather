import React, { useContext, useEffect, useRef } from 'react';
import '../styles/MainStream.css';
import MainStreamContext from '../context/mainStreamContext/mainStreamContext';

const MainStream = () => {
  const mainStreamcontext = useContext(MainStreamContext);
  const {mainStream} = mainStreamcontext;
  console.log(mainStream);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.srcObject = mainStream;
  }, [mainStream]);
  return (
            <video  className="mainVideo" ref={videoRef} autoPlay muted />
  )
}

export default MainStream
