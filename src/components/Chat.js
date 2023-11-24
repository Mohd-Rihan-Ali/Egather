import React from 'react'
import '../styles/Chat.css';
const Chat = ({chat, name}) => {
     
  return (
    <div className='chat'>
      <div className='username'>{name}</div>
           <div className="message">{chat}</div>
    </div>
  )
}

export default Chat
