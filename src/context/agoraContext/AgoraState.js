import AgoraContext from "./agoraContext";
import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const AgoraState = (props)=>{
    const APP_ID = "6e05fa2b5015440e80c0e836d64fc8b9";
    const token = null;

    const config = {mode:'rtc', codec:'vp8', appId: APP_ID, token:token};
    const useClient = createClient(config);
    const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
    const channelName = "main";
    return (
        <AgoraContext.Provider value={{ config, useClient, useMicrophoneAndCameraTracks, channelName}}>
          {props.children}
        </AgoraContext.Provider>
      )
}

export default AgoraState;