import { useState } from "react";
import MainStreamContext from "./mainStreamContext";

const MainStreamState = (props)=>{
    const [mainStream, setMainStream] = useState(null);
    const [streamReady, setStreamReady] = useState(false);
    return (
        <MainStreamContext.Provider value={{mainStream, setMainStream, streamReady, setStreamReady}}>
          {props.children}
        </MainStreamContext.Provider>
      )
}

export default MainStreamState;