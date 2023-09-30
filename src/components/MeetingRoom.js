import React,{ useState, useContext, useEffect} from 'react'
import '../styles/MeetingRoom.css'
import MainStream from './MainStream';
import UserStream from './UserStream';
import Chatbox from './Chatbox';
import AgoraContext from '../context/agoraContext/agoraContext';
import Controls from './Controls';

const MeetingRoom = (props) => {
   const {setInCall} = props;
   const [users, setUsers] = useState([]);
   const [start, setStart] = useState(false);
   const context = useContext(AgoraContext);
   const {config, useClient, useMicrophoneAndCameraTracks, channelName} = context;
   const client = useClient();
   const {ready, tracks} = useMicrophoneAndCameraTracks();

   useEffect(()=>{
       let init = async (name)=>{
            client.on("user-published", async(user, mediaType)=>{
               await client.subscribe(user, mediaType);
               if(mediaType === "video"){
                // setting up users state
                setUsers((prevUsers) => {
                  return [...prevUsers, user]
                });
               }
               if(mediaType === "audio"){
                   user.audioTrack.play();
               }
            });
            
            client.on("user-unpublished", (user, mediaType)=>{
                   if(mediaType === "audio"){
                    //removing the audio track but before we will check that it exists or not
                    if(user.audioTrack) user.audioTrack.stop();
                   }  
                   if(mediaType === "video"){
                       setUsers((prevUsers)=>{
                          return prevUsers.filter((User)=> User.uid!==user.uid);
                       })
                   }
            });

            client.on("user-left", (user)=>{
              setUsers((prevUsers)=>{
                return prevUsers.filter((User)=> User.uid!==user.uid);
             })
            });
            
            try {
                 await client.join(config.appId, name, config.token, null);
            } catch (error) {
                console.log(error);
            }

            if(tracks) await client.publish([tracks[0], tracks[1]]);
            setStart(true);
       };

       if(ready && tracks){
        try{
          init(channelName);
        }catch(error){
          console.log(error);
        }
       }
   }, [channelName, client, ready, tracks]);
  return (
    <div className='Room'>
      <div className="Streams">
         {start && tracks &&  <UserStream users={users} tracks={tracks}/>}
          <div className="mainStream">
             <MainStream/>
          </div>
          <div className="options">
             {ready && tracks && (<Controls tracks={tracks} setStart={setStart} setInCall={setInCall}/>)}
          </div>
      </div>
      <div className="chatbox">
        <Chatbox/>
      </div>
    </div>
  )
}

export default MeetingRoom
