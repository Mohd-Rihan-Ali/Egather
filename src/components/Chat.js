import React from 'react'
import '../styles/Chat.css';
const Chat = ({chat}) => {
     
  return (
    <div className='chat'>
      <div className='username'>User</div>
           <div className="message">{chat}</div>
    </div>
  )
}

export default Chat
