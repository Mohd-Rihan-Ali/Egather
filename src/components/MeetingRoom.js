import React from 'react'
import '../styles/MeetingRoom.css'
import MainStream from './MainStream';
import UserStream from './UserStream';
import Chatbox from './Chatbox';
const MeetingRoom = () => {
  return (
    <div className='Room'>
      <div className="Streams">
          {/* <div className="userStreams">
          <UserStream/>
          <UserStream/>
          <UserStream/>
          <UserStream/>
          </div> */}
          <UserStream/>
          <div className="mainStream">
             <MainStream/>
          </div>
          <div className="options">
          <i className="fa-solid fa-microphone fa-2xl mx-2" style={{'color': '#ffffff'}}></i>
          <i className="fa-solid fa-video fa-2xl mx-2" style={{'color': '#ffffff'}}></i>
            <button className='btn btn-danger mx-2'>Leave Meet</button>
          </div>
      </div>
      <div className="chatbox">
        <Chatbox/>
      </div>
    </div>
  )
}

export default MeetingRoom
