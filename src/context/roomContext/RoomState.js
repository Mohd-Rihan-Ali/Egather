import {
  useEffect,
  useState,
  useReducer,
} from "react";
import { useNavigate } from "react-router-dom";
import socketIOClient from "socket.io-client";
import Peer from "peerjs";
import { v4 as uuidV4 } from "uuid";
import { peersReducer } from "./peerReducer";
import { addPeerAction, removePeerAction } from "./peerActions";
import RoomContext from "./roomContext";

const WS = "http://localhost:8000";
const ws = socketIOClient(WS);

const RoomState = (props)=>{
  const navigate = useNavigate();
  const [me, setMe] = useState(); // for setting up the peer id
  const [peers, dispatch] = useReducer(peersReducer, {}); // 'peers' is basically our state
  // for getting the media devices
  const [stream, setStream] = useState();

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
    ws.on("user-disconnected", removePeer);
  }, []);

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
      <RoomContext.Provider value={{ ws, me, stream, peers }}>
      {props.children}
    </RoomContext.Provider>
      )
}

export default RoomState;