import {
  useEffect,
  useState,
  useReducer,
  useContext,
} from "react";
import { useNavigate } from "react-router-dom";
import socketIOClient from "socket.io-client";
import Peer from "peerjs";
import { v4 as uuidV4 } from "uuid";
import { peersReducer } from "./peerReducer";
import { addPeerAction, removePeerAction } from "./peerActions";
import RoomContext from "./roomContext";
import MainStreamContext from "../mainStreamContext/mainStreamContext";

const WS = "http://localhost:8000";
const ws = socketIOClient(WS);

const RoomState = (props)=>{
  const navigate = useNavigate();
  const [me, setMe] = useState(); // for setting up the peer id
  const [peers, dispatch] = useReducer(peersReducer, {}); // 'peers' is basically our state
  // for getting the media devices
  const [stream, setStream] = useState();
  const mainStreamcontext = useContext(MainStreamContext);
  const {setMainStream, setStreamReady} = mainStreamcontext;
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [screenSharingId, setScreenSharingId] = useState("")

  const enterRoom = ({ roomId }) => {
    navigate(`/meet/${roomId}`);
    console.log(roomId);
  };
  const getUsers = ({ participants }) => {
    console.log(participants);
  };

  const removePeer = (peerId) => {
    dispatch(removePeerAction(peerId));
  };

  const handleMessage = (message) =>{
    console.log("following message received", message);
      setMessages((ps)=>{
        return [...ps, message];
      }) 
  };

  const switchStream = (stream) =>{
    setStream(stream)
    setScreenSharingId(me?.id || "");
    Object.values(me?.connections).forEach((connection)=>{
      const videoTrack = stream?.getTracks().find(track => track.kind === 'video')
      connection[0].peerConnection.getSenders()[1].replaceTrack(videoTrack).catch(err=>{console.log(err)})
})
  }
  const shareScreen = () =>{
    if(screenSharingId){
          navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(switchStream)
    }
    else navigator.mediaDevices.getDisplayMedia({}).then(switchStream);
  }

  useEffect(() => {
    const meId = uuidV4();

    const peer = new Peer(meId);
    setMe(peer);

    // this try-catch block is for getting the video-audio
    try {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          console.log("iamrunning")
          console.log(stream)
          setStream(stream);
        });
    } catch (error) {
      console.log(error);
    }

    ws.on("room-created", enterRoom);
    ws.on("get-users", getUsers);
    ws.on('createMessage', handleMessage);
    ws.on("user-disconnected", removePeer);
    ws.on("user-shared-screen", (peerId) => setScreenSharingId(peerId));
    ws.on("user-stopped-sharing", ()=>setScreenSharingId(""));

    return ()=>{         
    ws.off("room-created", enterRoom);
    ws.off("get-users", getUsers);
    ws.off('createMessage', handleMessage);
    ws.off("user-disconnected", removePeer);
    ws.off("user-shared-screen", (peerId) => setScreenSharingId(peerId));
    ws.off("user-stopped-sharing", ()=>setScreenSharingId(""));
    }
  }, []);

  useEffect(()=>{
   if (screenSharingId){
    ws.emit("start-sharing", {peerId: screenSharingId, roomId});
    const screenSharingVideo = screenSharingId === me?.id ? stream : peers[screenSharingId]?.stream;
    setMainStream(screenSharingVideo);
    setStreamReady(true);
   }
   else{
        ws.emit("stop-sharing", roomId);
        setMainStream(stream);
        setStreamReady(true);
    }
  }, [screenSharingId])

  // for checking and getting the user and it's media stream
  useEffect(() => {
    if (!me) return;
    if (!stream) return;

    // for every new user who will join we will call him/her and wil pass stream to him/her
    // listening
    // initiating the call and sending our stream

    // our user who just joined, will make a event listner and will dispatch the stream of the user

    ws.on("user-joined", ({ peerId }) => {
      setTimeout(connectToNewUser,2000,peerId)
    });

    const connectToNewUser = (peerId) => {
     console.log("iamcalling", peerId);
      const call = me.call(peerId, stream);
      call.on("stream", (peerStream) => {
        dispatch(addPeerAction(peerId, peerStream));
      });
}

    // every user who calls us, we will listen to the call event and will answer with our own stream
    // answering to the peers call and also sending our stream
    me.on("call", (call) => {
      console.log("calliscommingfrom", call.peer);
      call.answer(stream);
      call.on("stream", (peerStream) => {
        dispatch(addPeerAction(call.peer, peerStream));
      });
    });
  }, [me, stream]);

  console.log({ peers });

    return (
      <RoomContext.Provider value={{ ws, me, stream, peers, messages, setMessages,shareScreen, screenSharingId, setRoomId}}>
      {props.children}
    </RoomContext.Provider>
      )
}

export default RoomState;