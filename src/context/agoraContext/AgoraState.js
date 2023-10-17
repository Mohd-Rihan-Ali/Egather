import { useState } from "react";
import AgoraContext from "./agoraContext";

const AgoraState = (props)=>{
    const APP_ID = "6e05fa2b5015440e80c0e836d64fc8b9";

    let uid = sessionStorage.getItem('uid')
    if(!uid){
      uid = String(Math.floor(Math.random() * 10000))
      sessionStorage.setItem('uid', uid)
    }

    let token = null;
    let client;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let roomId = urlParams.get('room');

    if(!roomId){
        roomId = 'main'
    }

    let localTracks = [];
    let remoteUsers = {};
    const [ready, setReady] = useState(false);

    let joinRoomInit = async ()=>{
         client = AgoraRTC.createClient({mode:'rtc', codec:'vp8'});
         await client.join(APP_ID, roomId, token, uid)
    }

    let joinStream = async () =>{
      localTracks = await AgoraRTC.createMicrophoneAndCameraTracks()
      setReady(true);
    }

    return (
        <AgoraContext.Provider value={{joinRoomInit, joinStream, localTracks, ready}}>
          {props.children}
        </AgoraContext.Provider>
      )
}

export default AgoraState;