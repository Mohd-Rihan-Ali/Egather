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
            <button className='btn btn-primary'>call</button>
            <button className='btn btn-primary'>text</button>
          </div>
      </div>
      <div className="chatbox">
        <Chatbox/>
      </div>
    </div>
  )
}

export default MeetingRoom
